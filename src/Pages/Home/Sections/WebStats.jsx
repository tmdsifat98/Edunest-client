import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosLocal from "../../../hooks/useAxiosLocal";
import Image from "../../../assets/stats.png";
import CountUp from "react-countup";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { MdHowToReg } from "react-icons/md";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const WebStats = () => {
  const axiosLocal = useAxiosLocal();

  const { data: stats = {},isLoading } = useQuery({
    queryKey: ["websiteStats"],
    queryFn: async () => {
      const res = await axiosLocal.get("/stats");
      return res.data;
    },
  });
  if(isLoading){
    return <LoadingSpinner/>
  }

  return (
    <div className="my-24">
      <div className="w-11/12 lg:w-9/12 lg:px-24 mx-auto flex flex-col md:flex-row rounded-xl bg-gradient-to-tr lg:bg-gradient-to-l from-primary to-secondary items-center justify-center gap-10 py-3 pt-14 lg:pt-5">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-6 lg:px-16 md:w-3/4 lg:w-full">
          <div className="backdrop-blur-xs shadow-lg p-6 rounded-xl text-center">
            <div className="w-fit mx-auto text-black">
              <FaUser size={26} />
            </div>
            <p className="text-gray-800 mt-2">Total Users</p>
            <h2 className="text-3xl font-bold text-black">
              <CountUp
                end={stats.totalUsers}
                duration={4.5}
                separator=","
                enableScrollSpy
                scrollSpyOnce={false}
              />
            </h2>
          </div>
          <div className="backdrop-blur-xs shadow-lg p-6 rounded-xl text-center">
            <div className="w-fit mx-auto text-black">
              <PiChalkboardTeacherFill size={35} />
            </div>
            <p className="text-gray-800 mt-2">Total Classes</p>
            <h2 className="text-3xl font-bold text-black">
              <CountUp
                end={stats.totalClasses}
                duration={4.5}
                separator=","
                enableScrollSpy
                scrollSpyOnce={false}
              />
            </h2>
          </div>
          <div className="backdrop-blur-xs col-span-full shadow-lg p-6 rounded-xl text-center">
            <div className="w-fit mx-auto text-black">
              <MdHowToReg size={35} />
            </div>
            <p className="text-gray-800 mt-2">Total Enrollments</p>
            <h2 className="text-3xl font-bold text-black">
              <CountUp
                end={stats.totalEnrollment}
                duration={4.5}
                separator=","
                enableScrollSpy
                scrollSpyOnce={false}
              />
            </h2>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="mx-auto md:w-1/2 lg:w-full">
          <img src={Image} alt="Website Stats" />
        </div>
      </div>
    </div>
  );
};

export default WebStats;
