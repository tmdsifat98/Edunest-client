import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
import error from "../../assets/errorpage.png";

const ErrorPage = () => {
  useEffect(() => {
    document.title = "Lodgify | Error";
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img className="h-96" src={error} alt="" />
      <Link to="/">
        <button className="flex items-center gap-2 btn btn-primary text-black mt-8">
          <FaArrowLeft />
          Back to home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
