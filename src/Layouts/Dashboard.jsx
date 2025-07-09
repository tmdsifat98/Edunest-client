import React, { useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";
import "../App.css";
import {
  FaArrowLeft,
  FaChalkboardTeacher,
  FaClipboardList,
  FaHome,
  FaPlusSquare,
  FaTable,
  FaUserGraduate,
  FaUserShield,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import Logo from "../Components/Logo";
import useUserRole from "../hooks/useUserRole";

const Dashboard = () => {
  const { logOut } = useAuth();
  const { role, isLoading: roleLoading } = useUserRole();

  const handleLogout = () => {
    logOut()
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

  const links = (
    <>
      <NavLink
        to="/dashboard"
        end
        className="flex gap-3 py-2 items-center pl-4 text-md"
      >
        <FaHome />
        Home
      </NavLink>
      {!roleLoading && role === "user" && (
        <>
          <NavLink
            to="/dashboard/beATeacher"
            className="flex gap-3 py-2 items-center pl-4"
          >
            <FaChalkboardTeacher />
            Be a Teacher
          </NavLink>
        </>
      )}

      {/* {!roleLoading && role === "teacher" && (
        <>
          <NavLink
            to="/dashboard/addClass"
            className="flex gap-3 py-2 items-center pl-4"
          >
            <FaPlusSquare />
            Add Class
          </NavLink>
          <NavLink
            to="/dashboard/addLiveClasses"
            className="flex gap-3 py-2 items-center pl-4"
          >
            <FaPlusSquare />
            Add Live Class
          </NavLink>
          <NavLink
            to="/dashboard/myClasses"
            className="flex gap-3 py-2 items-center pl-4"
          >
            <FaTable />
            My Classes
          </NavLink>
          <NavLink
            to="/dashboard/uploadTestPaper"
            className="flex gap-3 py-2 items-center pl-4"
          >
            <FaTable />
            Upload Test Paper
          </NavLink>
        </>
      )} */}

      {!roleLoading && role === "admin" && (
        <>
          <div className="flex flex-col gap-2">
            <NavLink
              to="/dashboard/teacherRequest"
              className="flex items-center gap-2 px-4 py-2"
            >
              <FaClipboardList className="text-lg" />
              <span>Teacher Request</span>
            </NavLink>

            <NavLink
              to="/dashboard/allUsers"
              className="flex items-center gap-2 px-4 py-2"
            >
              <FaChalkboardTeacher className="text-lg" />
              <span>All Users</span>
            </NavLink>

            <NavLink
              to="/dashboard/allClasses"
              className="flex items-center gap-2 px-4 py-2"
            >
              <FaUserGraduate className="text-lg" />
              <span>All Classes</span>
            </NavLink>

            <NavLink
              to="/dashboard/profile"
              className="flex items-center gap-2 px-4 py-2"
            >
              <FaUserShield className="text-lg" />
              <span>Profile</span>
            </NavLink>
          </div>
        </>
      )}
    </>
  );
  useEffect(() => {
    document.title = "EduNest || Dashboard";
  }, []);
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
          <div className="mx-2 flex-1 px-2 text-2xl font-bold">Dashboard</div>
        </div>
        <div className="px-6 py-4 min-h-screen">
          <Outlet />
        </div>
      </div>
      <section className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-gray-100 min-h-full w-80 p-0 dark:bg-gray-700 dark:text-gray-100">
          <Link to="/" className="bg-gray-300 dark:bg-gray-700 py-3 px-12">
            <Logo />
          </Link>
          {links}
          <button
            onClick={handleLogout}
            className="btn fixed bottom-1 w-full  btn-primary text-black border-none"
          >
            <FaArrowLeft /> Logout
          </button>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
