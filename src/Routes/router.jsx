import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import Dashboard from "../Layouts/Dashboard";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import TeachOnEduNest from "../Pages/RoutingPage/TeachOnEduNest";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import TeacherRequest from "../Pages/Dashboard/Admin/TeacherRequest";
import Users from "../Pages/Dashboard/Admin/Users";
import MyProfile from "../Pages/Dashboard/Admin/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "/teachOnEduNest", Component: TeachOnEduNest },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      { index: true, Component: DashboardHome },
      {
        path: "teacherRequest",
        element: (
          <AdminRoute>
            <TeacherRequest />
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
        loader: () => fetch(`${import.meta.env.VITE_serverUrl}/total-users/count`),
      },
      {
        path: "profile",
        element: (
          <AdminRoute>
            <MyProfile />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: SignUp,
      },
    ],
  },
]);

export default router;
