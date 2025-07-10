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
import TeacherRoute from "./TeacherRoute";
import AddClass from "../Pages/Dashboard/Teacher/AddClass";
import MyClasses from "../Pages/Dashboard/Teacher/MyClasses";

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
        loader: () =>
          fetch(`${import.meta.env.VITE_serverUrl}/total-users/count`),
      },
      {
        path: "addClass",
        element: (
          <TeacherRoute>
            <AddClass />
          </TeacherRoute>
        ),
        loader: () =>
          fetch(`${import.meta.env.VITE_serverUrl}/total-users/count`),
      },
      {
        path: "myClass",
        element: (
          <TeacherRoute>
            <MyClasses />
          </TeacherRoute>
        ),
      },
      {
        path: "profile",
        element: <MyProfile />,
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
