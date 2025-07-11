import React from "react";
import {
  FaBookOpen,
  FaFileAlt,
  FaHourglassHalf,
  FaCreditCard,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useStudentDashboardStats from "../../../hooks/useStudentDashboardStats";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import QuickActions from "./QuickActions";

const StudentdHome = () => {
  const { user } = useAuth();
  const { stats, isLoading } = useStudentDashboardStats();
  if(isLoading){
    return <LoadingSpinner/>
  }
  return (
    <div className="p-4 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-l from-primary to-indigo-600 text-white p-6 rounded-xl shadow">
        <h2 className="text-3xl font-bold mb-2">
          Welcome Back, {user.displayName || "Student"}!
        </h2>
        <p className="text-lg">Keep learning and stay consistent! 🚀</p>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-9/12 md:w-full mx-auto">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex items-center gap-4">
          <FaBookOpen className="text-blue-600 text-3xl" />
          <div>
            <h4 className="text-xl font-semibold">{stats.enrolledClasses}</h4>
            <p>Total Enrolled Classes</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex items-center gap-4">
          <FaFileAlt className="text-green-600 text-3xl" />
          <div>
            <h4 className="text-xl font-semibold">{stats.submittedAssignments}</h4>
            <p>Assignments Submitted</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex items-center gap-4">
          <FaHourglassHalf className="text-yellow-600 text-3xl" />
          <div>
            <h4 className="text-xl font-semibold">{stats.pendingAssignments}</h4>
            <p>Pending Assignments</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex items-center gap-4">
          <FaCreditCard className="text-purple-600 text-3xl" />
          <div>
            <h4 className="text-xl font-semibold">{stats.totalOrders}</h4>
            <p>Total Orders</p>
          </div>
        </div>
      </div>
      <h2 className="text-3xl font-semibold text-primary">Quick Actions:</h2>
      <QuickActions/>
    </div>
  );
};

export default StudentdHome;
