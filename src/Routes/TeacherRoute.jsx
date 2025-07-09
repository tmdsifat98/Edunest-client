import React from "react";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import { Navigate } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";

const TeacherRoute = ({ children }) => {
  const { user, loading } = useAuth();
    const { role, isLoading: roleLoading } = useUserRole();

  if (loading) {
    return <LoadingSpinner/>;
  }

  if (!user) {
    return <Navigate to="/forbidden" replace />;
  }
  if (roleLoading) {
    return <LoadingSpinner/>;
  }

  if (role === "teacher") {
    return children;
  }

  return <Navigate to="/forbidden" replace />;
};

export default TeacherRoute;