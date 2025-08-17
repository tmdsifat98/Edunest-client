import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner";
import NoDataFound from "../Extra/NoDataFound";
import { Link } from "react-router";

const categories = [
  "All",
  "Web Development",
  "Digital Marketing",
  "Graphics Design",
  "Video Editing",
  "Data Analysis",
];
const AllClassesPage = () => {
  const axiosSecure = useAxiosSecure();
  const [cat, setCat] = useState("All");

  const [sort, setSort] = useState("");

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["approvedClasses", cat, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/classes-home?status=approved&category=${cat}&sort=${sort}`
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    document.title = " All Classes || EduNest";
  }, []);
  return (
    <div className="lg:w-5/6 mx-auto">
      <h1 className="text-5xl font-semibold text-center my-7">All Classes</h1>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-6 mt-6 mb-8 sticky top-18">
        {/* Category buttons */}
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setCat(category)}
            className={`px-5 py-1 rounded-full transition-colors duration-300 capitalize cursor-pointer
      ${
        cat === category
          ? "bg-primary text-white dark:text-black"
          : "bg-gray-200 dark:bg-gray-600 text-black dark:text-white"
      }`}
          >
            {category}
          </button>
        ))}

        {/* Sorting Dropdown */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered select-sm dark:bg-gray-700"
        >
          <option disabled value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : classes.length < 1 ? (
        <NoDataFound message="Opps! No classes found with this category" />
      ) : (
        <div className=" min-h-[calc(100vh-500px)]">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes.map((cls) => (
              <div
                key={cls._id}
                className="bg-base-100 flex flex-col dark:bg-gray-800 shadow rounded-xl overflow-hidden border border-base-300"
              >
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 pb-0 space-y-2 flex-1">
                  <h2 className="text-xl font-bold text-primary">
                    {cls.title}
                  </h2>
                  <p className="text-sm text-gray-500">By: {cls.name}</p>
                  <p className="text-sm line-clamp-3 h-16">{cls.description}</p>
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-success">৳ {cls.price}</span>
                    <span className="text-info">
                      Enrolled: {cls.enrolledCount || 0}
                    </span>
                  </div>
                </div>
                <Link to={`/class/${cls._id}`} className="p-3">
                  <button className="btn btn-primary btn-sm text-black w-full mt-2 flex-none">
                    View more
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllClassesPage;
