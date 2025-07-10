import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const MyEnrolls = () => {
    const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["enrolledClasses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolled-classes?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes.map((cls) => (
        <div
          key={cls._id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-base-300"
        >
          <img
            src={cls.image}
            alt={cls.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-4 space-y-2">
            <h3 className="text-xl font-bold text-primary">{cls.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Instructor: <span className="font-medium">{cls.name}</span>
            </p>
            <Link to={`/dashboard/my-enroll/${cls._id}`}>
              <button className="btn btn-sm btn-success mt-2">Continue</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyEnrolls;