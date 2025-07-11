import React, { useEffect, useState } from "react";
import { IoEye, IoEyeOff, IoLockOpenOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { MdOutlineEmail } from "react-icons/md";
import loginLottie from "../../assets/loginLotie.json";
import SocialLogin from "./SocialLogin";
import Lottie from "lottie-react";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import { useForm } from "react-hook-form";

const Login = () => {
  const { logInUser } = useAuth();
  const axiosLocal = useAxiosLocal();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, password }) => {
    logInUser(email, password)
      .then(async (res) => {
        const name = res.user.displayName;
        await axiosLocal.post("/users", { email, name }).then((res) => {
          if (res.data.insertedId || res.data.modifiedCount) {
            navigate(location.state?.from || "/");
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Login successful!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a valid email or password",
        });
      });
  };

  useEffect(() => {
    document.title = "ACS FS | Login";
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center md:gap-20 items-center min-h-[calc(100vh-64px)]">
      <div className="z-10 w-11/12 backdrop-blur-sm p-8 rounded shadow-2xl md:max-w-md transition-colors duration-500">
        <h2 className="text-3xl font-bold font-playfair text-center dark:text-white mb-6">
          Please Log in!
        </h2>

        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <label className="block mb-1 font-semibold text-gray-600 dark:text-gray-300">
              Email
            </label>
            <div className="w-full flex gap-2 justify-between items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white">
              <MdOutlineEmail />
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="flex-1 border-0 outline-0 bg-transparent"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 font-semibold text-gray-600 dark:text-gray-300">
              Password
            </label>
            <div className="w-full flex gap-2 justify-between items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white">
              <IoLockOpenOutline />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="flex-1 border-0 outline-0 bg-transparent"
              />
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <IoEyeOff size={19} /> : <IoEye size={19} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-5">
            <button type="submit" className="w-full btn btn-primary text-black">
              Log In
            </button>
          </div>
        </form>

        <p className="mt-2 dark:text-gray-200">
          Don't have any account?{" "}
          <Link className="text-blue-700 hover:underline" to="/auth/signup">
            Sign Up
          </Link>
        </p>

        <div className="divider">OR</div>
        <SocialLogin />
      </div>

      <div>
        <Lottie animationData={loginLottie} />
      </div>
    </div>
  );
};

export default Login;
