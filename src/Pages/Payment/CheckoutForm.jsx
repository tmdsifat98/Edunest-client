import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "../../App.css";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const CheckoutForm = ({ amount, classId, email }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [proccessing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    setProcessing(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setErrorMessage(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setErrorMessage("");
    }
    //make payment
    const response = await axiosSecure.post("/create-payment-intent", {
      amount,
      classId,
    });
    const result = stripe.confirmCardPayment(response.data.clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });
    result.then((result) => {
      if (result.error) {
        console.log(result.error.message);
        setErrorMessage(result.error.message);
        setProcessing(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setErrorMessage("");
          console.log("Payment successful!");
          setProcessing(false);
          // Update payment status in the database
          axiosSecure
            .patch(`/classes/enroll/${classId}`, {
              email: email,
            })
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                Swal.fire({
                  title: "Payment Successful",
                  text: "Your payment has been processed successfully.",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/dashboard/my-enroll");
              }
            })
            .catch((error) => {
              console.error("Error updating payment status:", error);
              Swal.fire({
                title: "Payment Error",
                text: "There was an error updating your payment status. Please try again later.",
                icon: "error",
                confirmButtonText: "OK",
              });
            });
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {errorMessage && <p className="text-red-500 mb-3">{errorMessage}</p>}
      <button
        type="submit"
        disabled={!stripe || proccessing}
        className="btn btn-primary text-black px-5 w-fit mx-auto mt-4"
      >
        {proccessing ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
};
export default CheckoutForm;
