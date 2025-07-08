import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Root = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 z-[50]">
      <nav className="backdrop-blur-lg bg-black/10">
        <Navbar />
      </nav>
      <div className="-z-50 min-h-[calc(100vh-382px)]">
        <Outlet />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Root;
