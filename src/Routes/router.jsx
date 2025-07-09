import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import Dashboard from "../Layouts/Dashboard";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import TeachOnEduNest from "../Pages/RoutingPage/TeachOnEduNest";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [{ index: true, Component: Home },
      {path:"/teachOnEduNest",Component:TeachOnEduNest}
    ],
  },
  { path: "/dashboard", Component: Dashboard, children: [
    {index: true, Component:DashboardHome}]
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
