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
      <div className="w-11/12 mx-auto grid grid-cols-2 gap-6 md:gap-x-36 items-start">
        <div className="flex flex-col lg:flex-row justify-around items-start gap-4 lg:gap-0 ">
          <div className="flex flex-col justify-start items-start gap-3">
            <Link to="/" className="flex items-center justify-center gap-2">
              <Logo />
            </Link>
            <p className="w-2/3">
              EduNest is your all-in-one education management platform.
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
        </div>
        <div className="flex flex-col lg:flex-row justify-around items-start gap-7">
          <div>
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

          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us on</h3>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/Sifat.tarafder.5/"
                target="_blank"
              >
                <FaFacebook
                  size={23}
                  className="text-[#02ebc4] hover:text-blue-500 transition"
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
              <button className="button-common py-2 px-4 cursor-pointer">
                <GrSend />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-600 dark:text-gray-400 border-t-2 pt-7">
        © 2025 EduNest | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
