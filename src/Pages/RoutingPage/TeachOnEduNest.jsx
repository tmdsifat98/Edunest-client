import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useUserRole from "../../hooks/useUserRole";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const TeachOnEduNest = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role, isLoading } = useUserRole();

  useEffect(() => {
    document.title = "Twach on EduNest";
  }, []);

  const {
    data,
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["studentRoutine", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teachOnEduNest?email=${user.email}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [photoLoading, setPhotoLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setPhotoLoading(true);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
        formData
      );
      setImageUrl(res.data.data.display_url);
    } catch (err) {
      console.error("Image Upload Failed:", err);
    } finally {
      setPhotoLoading(false);
    }
  };

  const handleAgainSubmit = () => {
    axiosSecure
      .patch("/teachers-resubmit", { email: user.email })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire(
            "Success!",
            "Your request submitted again for review",
            "success"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Something went wrong!", "error");
      });
  };

  const onSubmit = async (data) => {
    try {
      const teacherData = {
        ...data,
        email: user.email,
        image:
          imageUrl ||
          user?.photoURL ||
          "https://i.ibb.co/Rk2y0f77/default.webp",
        createdAt: new Date().toISOString(),
        status: "pending",
      };
      console.log(teacherData);
      const res = await axiosSecure.post("/teachers", teacherData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Your request has been submitted.", "success");
        reset();
        setImageUrl("");
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", `${error.response.data.message}`, "error");
    }
  };
  if (loading || dataLoading) {
    return <LoadingSpinner />;
  }
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (role === "teacher") {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-400px)] text-center w-full">
        <div className="flex justify-center mb-4">
          <FaChalkboardTeacher className="w-16 h-16 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          You're Already a Teacher
        </h2>
        <p className="text-gray-600 dark:text-gray-200 mb-4 lg:w-1/4">
          You’ve already registered as a teacher. Please visit your dashboard to
          manage your classes and students.
        </p>
        <a href="/dashboard" className="btn btn-primary text-black mt-3">
          Go to Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-400px)] flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-6 text-primary text-center">
          Teach on EduNest? Fill the form below
        </h2>
      <div className="max-w-5xl mx-auto bg-base-100 p-6 dark:bg-gray-800 shadow rounded lg:mt-15">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          <div className="flex justify-center items-center gap-3">
            <div className="relative w-16 h-16 tooltip" data-tip="Upload image">
              {photoLoading ? (
                <div className="w-20 h-20 rounded-full border-4 border-dashed border-gray-400 animate-spin"></div>
              ) : (
                <img
                  src={imageUrl || user?.photoURL}
                  alt="Upload Profile"
                  className="w-16 h-16 object-cover rounded-full border dark:border-gray-600"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
          {/* Experience */}
          <div>
            <label className="label">Experience</label>
            <select
              defaultValue={data.experience}
              {...register("experience", {
                required: "Experience is required",
              })}
              className="select select-bordered w-full dark:bg-gray-700"
            >
              <option value="">Select your experience level</option>
              <option value="beginner">Beginner</option>
              <option value="midLevel">Mid-level</option>
              <option value="experienced">Experienced</option>
            </select>
            {errors.experience && (
              <span className="text-red-500">{errors.experience.message}</span>
            )}
          </div>
          {/* Name */}
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              defaultValue={user?.displayName}
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full dark:bg-gray-700"
              placeholder="Enter your name"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="label">Title</label>
            <input
              type="text"
              defaultValue={data.title}
              {...register("title", { required: "Title is required" })}
              className="input input-bordered w-full dark:bg-gray-700"
              placeholder="Make a title"
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              readOnly
              defaultValue={user?.email || ""}
              className="input input-bordered w-full dark:bg-gray-700"
            />
          </div>

          {/* Category */}
          <div>
            <label className="label">Category</label>
            <select
              defaultValue={data?.category}
              {...register("category", { required: "Category is required" })}
              className="select select-bordered w-full dark:bg-gray-700"
            >
              <option value="">Select your category</option>
              <option value="web-development">Web Development</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="graphics-design">Graphics Design</option>
              <option value="video-editing">Video Editing</option>
              <option value="data-analysis">Data Analysis</option>
            </select>
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </div>
          <div className="md:col-span-2">
            {data.status === "pending" ? (
              <button
                type="button"
                className="btn bg-gray-600 w-full mt-3 text-white"
              >
                Submission under Review
              </button>
            ) : data.status === "rejected" ? (
              <button
                type="button"
                onClick={handleAgainSubmit}
                className="btn btn-primary w-full mt-3 text-black"
              >
                Request to another
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary w-full mt-3 text-black"
              >
                Submit For Review
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeachOnEduNest;
