import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosLocal from "../../../hooks/useAxiosLocal";
import Image from "../../../assets/stats.png";
import CountUp from "react-countup";

const WebStats = () => {
  const axiosLocal = useAxiosLocal();

  const { data: stats = {} } = useQuery({
    queryKey: ["websiteStats"],
    queryFn: async () => {
      const res = await axiosLocal.get("/stats");
      return res.data;
    },
  });

  return (
    <div className="py-12">
      <div className="w-7/12 mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-700 shadow-md p-6 rounded-xl text-center">
            <h2 className="text-3xl font-bold text-primary">
              <CountUp
                end={stats.totalUsers}
                duration={4.5}
                separator=","
                enableScrollSpy
                scrollSpyOnce={false}
              />
            </h2>
            <p className="text-gray-500 mt-2">Total Users</p>
          </div>
          <div className="bg-white dark:bg-gray-700 shadow-md p-6 rounded-xl text-center">
            <h2 className="text-3xl font-bold text-secondary">
              <CountUp
                end={stats.totalClasses}
                duration={4.5}
                separator=","
                enableScrollSpy
                scrollSpyOnce={false}
              />
            </h2>
            <p className="text-gray-500 mt-2">Total Classes</p>
          </div>
          <div className="bg-white dark:bg-gray-700 shadow-md p-6 rounded-xl text-center col-span-full">
            <h2 className="text-3xl font-bold text-accent">
              <CountUp
                end={stats.totalEnrollment}
                duration={4.5}
                separator=","
                enableScrollSpy
                scrollSpyOnce={false}
              />
            </h2>
            <p className="text-gray-500 mt-2">Total Enrollments</p>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="flex justify-center">
          <img
            src={Image}
            alt="Website Stats"
            className="w-full max-w-sm rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default WebStats;
