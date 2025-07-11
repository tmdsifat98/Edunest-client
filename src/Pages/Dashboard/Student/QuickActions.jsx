import React from "react";
import { FaBookOpen, FaClipboardList, FaHistory, FaCertificate, FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router";

const QuickActions = () => {
  const actions = [
    {
      title: "Browse New Classes",
      icon: <FaBookOpen size={24} />,
      to: "/all-classes-page",
      bg: "bg-blue-100 text-blue-800",
    },
    {
      title: "My Enrolled Classes",
      icon: <FaClipboardList size={24} />,
      to: "/dashboard/my-enroll",
      bg: "bg-green-100 text-green-800",
    },
    {
      title: "Payment History",
      icon: <FaHistory size={22} />,
      to: "/dashboard/my-orders",
      bg: "bg-emerald-100 text-emerald-800",
    },
    {
      title: "Teach on EduNest?",
      icon: <FaChalkboardTeacher size={22} />,
      to: "/teachOnEduNest",
      bg: "bg-pink-100 text-pink-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {actions.map((action, index) => (
        <Link
          key={index}
          to={action.to}
          className={`p-5 rounded-xl shadow hover:shadow-lg transition duration-200 flex items-center gap-4 ${action.bg}`}
        >
          {action.icon}
          <span className="font-semibold">{action.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;
