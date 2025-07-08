import React from "react";
import "../Pages/Dashboard/dashboard.css";
import { MdMenu } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { logOutUser } = useAuth();
  const handleLogout = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Log out successfull!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: `${err.message}`,
          showConfirmButton: true,
        });
      });
  };
  return (
    <div className="drawer lg:drawer-open dark:bg-gray-900 dark:text-gray-200">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Drawer Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full dark:bg-gray-700">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <MdMenu size={25} />
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">logo</div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-0 dark:bg-gray-700 dark:text-gray-100">
          <Link
            className="flex items-center justify-center mb-5 bg-gray-200 gap-3 py-3 dark:bg-gray-600"
            to="/"
          >
            logo
          </Link>
          <NavLink to="/dashboard">Home</NavLink>
          <NavLink to="/dashboard/stats">Overview</NavLink>
          <NavLink to="/dashboard/myTips">My Tips</NavLink>
          <button
            onClick={handleLogout}
            className="btn fixed bottom-1 w-full  bg-[#44cf44] border-none"
          >
            <FaArrowLeft /> Logout
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
