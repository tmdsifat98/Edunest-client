import React from "react";
import { useNavigate, useParams } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { parcelId } = useParams();

  const {
    data: parcelInfo,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["parcelData", parcelId],
    enabled: !!parcelId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${parcelId}`);
      return res.data;
    },
  });
  if (!parcelId) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <h2 className="text-2xl font-bold text-red-500">
          Invalid payment request.
        </h2>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/dashboard/myParcels")}
        >
          Back to My Parcels
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

  if (!parcelInfo) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <h2 className="text-2xl font-bold text-red-500">
          No parcel data found.
        </h2>
        <button className="btn btn-primary mt-4" onClick={() => navigate("/dashboard/myParcels")}>
          Back to My Parcels
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-base-100 dark:bg-gray-800 shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-primary">Payment Summary</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded space-y-2">
          <p>
            <strong>Parcel Type:</strong>{" "}
            {parcelInfo.parcelType === "document" ? "Document" : "Non-Document"}
          </p>
          <p>
            <strong>Weight:</strong>{" "}
            {parcelInfo.weight ? `${parcelInfo.weight} kg` : "-"}
          </p>
          <p>
            <strong>Delivery:</strong>{" "}
            {parcelInfo.delivery_destination === "within"
              ? "Within City"
              : "Outside City"}
          </p>
          <p>
            <strong>Tracking ID:</strong> {parcelInfo.tracking_id}
          </p>
          <p>
            <strong>Amount to Pay:</strong>{" "}
            <span className="text-green-500 font-semibold">
              ৳{parcelInfo.charge}
            </span>
          </p>
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={parcelInfo.charge} parcelId={parcelId} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;