import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import NoDataFound from "../Extra/NoDataFound";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { classId } = useParams();

     useEffect(() => {
      document.title = "Payment || EduNest";
    }, []);
  

  const {
    data: classInfo,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["parcelData", classId],
    enabled: !!classId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${classId}`);
      return res.data;
    },
  });
  const {
    title,
    name,
    email,
    price,
    description,
  } = classInfo || {};

  if (!classId) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <h2 className="text-2xl font-bold text-red-500">
          Invalid payment request.
        </h2>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/all-classes-page")}
        >
          Back to Classes
        </button>
      </div>
    );
  }
  if (isLoading || isPending) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!classInfo) {
    return <NoDataFound message="No payment info found" />;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-base-100 dark:bg-gray-800 shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-primary">Payment Summary</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded space-y-2">
          <p>
            <strong>Class Title:</strong>{" "}
            {title}
          </p>
          <p>
            <strong>Teacher:</strong>{" "}
            {name}
          </p>
          <p>
            <strong>Teacher's Email:</strong>{" "}
            {email}
          </p>
          <p className="line-clamp-2">
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Amount to Pay:</strong>{" "}
            <span className="text-green-500 font-semibold">
              ৳{price}
            </span>
          </p>
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={price} classId={classId} classInfo={classInfo} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
