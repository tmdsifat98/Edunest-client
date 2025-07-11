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
import AllClasses from "../Pages/Dashboard/Admin/AllClasses";
import ClassProgressAndAssignment from "../Pages/Dashboard/Teacher/ClassProgressAndAssignment";
import AllClassesPage from "../Pages/RoutingPage/AllClassesPage";
import ClassDetails from "../Pages/RoutingPage/ClassDetails";
import Payment from "../Pages/Payment/Payment";
import MyEnrolls from "../Pages/Dashboard/Student/MyEnrolls";
import MyEnrollClassDetails from "../Pages/Dashboard/Student/MyEnrollClassDetails";
import ErrorPage from "../Pages/Error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "/all-classes-page", Component: AllClassesPage },
      { path: "/class/:id", Component: ClassDetails },
      { path: "/teachOnEduNest", Component: TeachOnEduNest },
      { path: "/payment/:classId", Component: Payment },
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
        loader: () => fetch(`${import.meta.env.VITE_serverUrl}/teachers-count`),
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
        path: "allClasses",
        element: (
          <AdminRoute>
            <AllClasses />
          </AdminRoute>
        ),
        loader: () =>
          fetch(`${import.meta.env.VITE_serverUrl}/classes/count/admin`),
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
        path: "myClasses",
        element: (
          <TeacherRoute>
            <MyClasses />
          </TeacherRoute>
        ),
      },
      {
        path: "myClasses/:classId",
        element: (
          <TeacherRoute>
            <ClassProgressAndAssignment />
          </TeacherRoute>
        ),
      },
      {
        path: "profile",
        element: <MyProfile />,
      },
      {
        path: "my-enroll",
        element: <MyEnrolls />,
      },
      {
        path: "my-enroll/:id",
        element: <MyEnrollClassDetails />,
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
  { path: "*", Component: ErrorPage },
]);

export default router;
