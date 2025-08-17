import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";

const ClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  const { data: classData, isLoading } = useQuery({
    queryKey: ["class", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;

  const handlePay = () => {
    setRedirecting(true);
    setTimeout(() => {
      navigate(`/payment/${id}`);
    }, 1000);
  };

  const {
    title,
    name,
    email,
    image,
    price,
    description,
    enrolledCount = 0,
  } = classData || {};

  return (
   <div className="relative">
     <div className="max-w-4xl mx-auto p-6 bg-base-100 dark:bg-gray-800 shadow-lg rounded-xl mt-6 border border-base-300">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <img
            src={image}
            alt={title}
            className="w-full h-56 rounded-xl object-cover"
          />
          <h2 className="text-3xl font-bold text-primary">{title}</h2>
          <p className="text-gray-700 dark:text-gray-200">
            Instructor: <strong>{name}</strong>
          </p>{" "}
          <p className="text-gray-700 dark:text-gray-200">
            Email: <strong>{email}</strong>
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            Price:{" "}
            <span className="text-secondary font-semibold">৳{price}</span>
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-gray-700 dark:text-gray-200">
            Total Enrolled: <strong> {enrolledCount}</strong>
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Description: {description}
          </p>
        </div>
      </div>

      <button
        onClick={handlePay}
        className="btn btn-primary text-black w-full mt-4"
        disabled={redirecting}
      >
        {redirecting ? "Redirecting..." : "Pay & Enroll"}
      </button>
    </div>
      {redirecting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center space-y-3 w-80">
            <div className="w-10 h-10 border-4 border-blue-500 border-dotted rounded-full animate-spin mx-auto"></div>
            <h3 className="text-lg font-semibold text-gray-700">Redirecting...</h3>
            <p className="text-gray-500 text-sm">Please wait while we take you to the payment page</p>
          </div>
        </div>
      )}
   </div>
  );
};

export default ClassDetails;
