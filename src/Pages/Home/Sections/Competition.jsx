import React, { useState } from "react";
import prize from "../../../assets/prize.png";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Competition = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: count = 0, refetch } = useQuery({
    queryKey: ["registrationCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/competition-registrations/count");
      return res.data.count;
    },
  });
  const { data: competitor = {} } = useQuery({
    queryKey: ["competotor"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/competition-registrations?email=${user.email}`
      );
      return res.data;
    },
  });

  const handleRegister = async () => {
    if (!user?.email) {
      Swal.fire("Login Required", "Please login to register.", "warning");
      return;
    }

    try {
      const payload = {
        name: user.displayName,
        email: user.email,
      };

      const res = await axiosSecure.post("/competition-registrations", payload);

      if (res.data.insertedId || res.data.message === "Already Registered") {
        Swal.fire("Success", "You are successfully registered!", "success");
        setIsRegistered(true);
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", `${err.response.data.message}`, "error");
    }
  };

  const handleErr = () => {
    Swal.fire("Error", "You have already registered", "error");
  };

  return (
    <section className="w-11/12 lg:w-9/12 mx-auto px-6 lg:px-24 pb-0 md:pb-6 pt-14 bg-gradient-to-b lg:bg-gradient-to-r from-secondary to-primary text-white rounded-lg shadow-lg my-24 flex flex-col md:flex-row">
      <div className="md:w-3/4">
        <h2 className="text-3xl font-bold mb-3">
          Join Our Exciting Hackathon! Win Big Prizes!
        </h2>

        <p className="mb-4 text-lg font-medium md:w-3/4">
          Participate in our upcoming hackathon and showcase your coding skills.
          Stand a chance to win a{" "}
          <strong className="text-red-600">৳30,000 cash prize</strong>,
          exclusive goodies, and a certificate of excellence. Open for all skill
          levels!
        </p>

        <ul className="mb-6 list-disc pl-6 space-y-1">
          <li>
            <strong>Date:</strong> September 20 - September 25
          </li>
          <li>
            <strong>Theme:</strong> Innovative Tech Solutions
          </li>
          <li>
            <strong>Registration Deadline:</strong> July 15
          </li>
          <li>
            <strong>Prizes:</strong> Cash, Gadgets, Internships
          </li>
        </ul>
        <div className="flex flex-wrap items-center gap-6">
          {user ? (
            competitor.email === user.email ? (
              <button
                onClick={handleErr}
                className="btn bg-gray-400 border-none"
              >
                Already Registered
              </button>
            ) : (
              <button
                onClick={handleRegister}
                disabled={competitor.email === user.email}
                className={`px-6 py-2 rounded-md font-semibold transition ${
                  isRegistered
                    ? "bg-gray-400 cursor-not-allowed text-black"
                    : "bg-primary text-black"
                }`}
              >
                Register Now
              </button>
            )
          ) : (
            <Link to="/auth/login" className="btn btn-primary text-black">
              Login to perticipate
            </Link>
          )}

          <div className="btn btn-primary text-black btn-outline">
            Total Registrations: {count}
          </div>
        </div>
      </div>
      <img className="h-96 md:w-1/4 lg:w-1/2" src={prize}  />
    </section>
  );
};

export default Competition;
