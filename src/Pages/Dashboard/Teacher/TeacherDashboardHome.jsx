import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import TeacherEarning from "./TeacherEarning";
import { FaChalkboard, FaTasks, FaUsers } from "react-icons/fa";

const TeacherDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: summary = {} } = useQuery({
    queryKey: ["teacherStats"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher/stats?email=${user.email}`);
      return res.data;
    },
  });

  const summaryCards = [
    {
      title: "Total Classes",
      value: summary.totalClasses || 0,
      icon: <FaChalkboard size={24} />,
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      title: "Total Assignments",
      value: summary.totalAssignments || 0,
      icon: <FaTasks size={24} />,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Total Enrollments",
      value: summary.totalEnrollments || 0,
      icon: <FaUsers size={24} />,
      color: "bg-yellow-100 text-yellow-800",
    },
  ];
  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        Welcome to {user.displayName} sir!
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {summaryCards.map((card, i) => (
          <div
            key={i}
            className={`p-6 rounded-lg shadow-md ${card.color} flex items-center gap-4`}
          >
            {card.icon}
            <div>
              <h4 className="text-lg font-semibold">{card.title}</h4>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
      <TeacherEarning/>
    </div>
  );
};

export default TeacherDashboardHome;
