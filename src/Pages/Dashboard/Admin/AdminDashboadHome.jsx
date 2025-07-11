import React from "react";
import { FaUser, FaChalkboardTeacher, FaUserGraduate, FaBookOpen, FaMoneyBill } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import IncomeChart from "./IncomeChart";
import useAuth from "../../../hooks/useAuth";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const {user}=useAuth()

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  if(isLoading){
    return <LoadingSpinner/>
  }
  return (
    <div className="p-6 space-y-5">
      <h2 className="text-3xl font-bold text-primary mb-6">
        Welcome, {user.displayName}!(Admin)
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <StatCard icon={<FaUser />} title="Total Users" value={stats.totalUsers} />
        <StatCard icon={<FaChalkboardTeacher />} title="Teachers" value={stats.totalTeachers} />
        <StatCard icon={<FaUserGraduate />} title="Students" value={stats.totalStudents} />
        <StatCard icon={<FaBookOpen />} title="Classes" value={stats.totalClasses} />
        <StatCard icon={<FaMoneyBill />} title="Revenue" value={`৳ ${stats.totalRevenue || 0}`} />
      </div>

      {/* Quick Actions */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="btn btn-outline btn-primary w-full">Manage Users</button>
        <button className="btn btn-outline btn-secondary w-full">Manage Classes</button>
        <button className="btn btn-outline btn-info w-full">View Reports</button>
      </div>
      <IncomeChart/>
    </div>
  );
};

export default AdminDashboardHome;

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
    <div className="text-3xl text-primary">{icon}</div>
    <div>
      <p className="text-gray-600 dark:text-gray-300">{title}</p>
      <h3 className="text-xl font-bold">{value ?? 0}</h3>
    </div>
  </div>
);
