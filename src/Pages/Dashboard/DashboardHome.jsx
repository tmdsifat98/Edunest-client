import React from "react";
import useUserRole from "../../hooks/useUserRole";
import StudentdHome from "./Student/StudentHome";
import TeacherDashboardHome from "./Teacher/TeacherDashboardHome";
import LoadingSpinner from "../../Components/LoadingSpinner";
import AdminDashboardHome from "./Admin/AdminDashboadHome";

const DashboardHome = () => {
  const { role, isLoading } = useUserRole();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (role === "student") {
    return <StudentdHome />;
  }
  if (role === "teacher") {
    return <TeacherDashboardHome />;
  }
  return <AdminDashboardHome/>;
};

export default DashboardHome;
