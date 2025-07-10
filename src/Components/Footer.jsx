import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdCall, MdEmail } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router";
import { GrSend } from "react-icons/gr";
import Swal from "sweetalert2";
import Logo from "./Logo";

const Footer = () => {
  const handleText = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Message successfully sent!",
      showConfirmButton: false,
      timer: 1500,
    });
    e.target.reset();
  };
  return (
    <footer className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-300 py-8 mt-12">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-x-36 items-start text-start lg:text-center">
        <div className="lg:flex flex-col justify-start items-center gap-3">
          <Link to="/">
            <Logo />
          </Link>
          <p className="w-2/3 mt-2 lg:mt-0">
            EduNest is your all-in-one education platform.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-1">Useful Links</h3>
          <ul>
            <li>
              <Link to="/termsAndCondition" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacyPolicy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/refundPolicy" className="hover:underline">
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-1">Contact Us</h3>
          <p className="flex gap-1 items-center">
            <FaHouse /> <span>Cox's Bazar, Chittagong</span>
          </p>
          <p className="flex items-center gap-1">
            <MdEmail /> tmdsifat98@gmail.com
          </p>
          <p className="flex items-center gap-1">
            <MdCall /> +880 1521730173
          </p>
        </div>

        <div className="lg:flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-3">Follow Us on</h3>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/Sifat.tarafder.5/"
              target="_blank"
            >
              <FaFacebook
                size={23}
                className="text-blue-600 hover:text-blue-500 transition"
              />
            </a>
            <a href="https://x.com/SifatTarafder98" target="_blank">
              <FaTwitter
                size={23}
                className="text-sky-600 hover:text-sky-500 transition"
              />
            </a>
            <a href="https://www.instagram.com/sifat_trf98/" target="_blank">
              <FaInstagram
                size={23}
                className="text-pink-600 hover:text-pink-500 transition"
              />
            </a>
            <a href="https://www.youtube.com/@s3tgamer427" target="_blank">
              <FaYoutube
                size={26}
                className="text-red-600 hover:text-red-500 transition"
              />
            </a>
          </div>
          <form
            onSubmit={handleText}
            className="border w-44 border-gray-400 mt-2 rounded pl-2 flex items-center"
          >
            <input
              placeholder="Write message"
              className="bg-transparent text-sm w-11/12 border-none outline-0"
              type="text"
              required
            />
            <button className="btn btn-primary text-black rounded-l-none py-2 px-4 cursor-pointer">
              <GrSend />
            </button>
          </form>
        </div>
      </div>
      <img
        className="w-11/12 lg:w-10/12 mx-auto mt-6"
        src="https://www.nexushand.com/wp-content/uploads/2024/11/Payment-Banner_Jul24_V1-05-2048x67.png"
        alt=""
      />
      <div className="text-center mt-10 text-sm text-gray-600 dark:text-gray-400 border-t-2 pt-7">
        © 2025 EduNest | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
