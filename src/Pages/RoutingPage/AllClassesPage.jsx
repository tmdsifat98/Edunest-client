import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner";

const AllClassesPage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["approvedClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes-home?status=approved");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className=" w-9/12 mx-auto">
      <h1 className="text-5xl font-semibold text-center my-7">All Classes</h1>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="bg-base-100 shadow rounded-xl overflow-hidden border border-base-300"
          >
            <img
              src={cls.image}
              alt={cls.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-bold text-primary">{cls.title}</h2>
              <p className="text-sm text-gray-500">By: {cls.name}</p>
              <p className="text-sm">{cls.description.slice(0, 80)}...</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-success">৳ {cls.price}</span>
                <span className="text-info">
                  Enrolled: {cls.enrolledCount || 0}
                </span>
              </div>
              <button className="btn btn-primary btn-sm w-full mt-2">
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClassesPage;
