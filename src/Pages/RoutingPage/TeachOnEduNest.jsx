import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";

const TeachOnEduNest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
        formData
      );
      setImageUrl(res.data.data.display_url);
    } catch (err) {
      console.error("Image Upload Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const teacherData = {
        ...data,
        email:user.email,
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
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-base-100 dark:bg-gray-800 shadow rounded lg:mt-15">
      <h2 className="text-4xl font-bold mb-6 text-primary text-center">
        Teach on EduNest? Fill the form below
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <div className="flex justify-center items-center gap-3">
          <div className="relative w-16 h-16 tooltip" data-tip="Upload image">
            {loading ? (
              <div className="w-20 h-20 rounded-full border-4 border-dashed border-gray-400 animate-spin"></div>
            ) : (
              <img
                src={imageUrl || user.photoURL}
                alt="Profile"
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
            {...register("experience", { required: "Experience is required" })}
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
            type="text" defaultValue={user.displayName}
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
          <button
            type="submit"
            className="btn btn-primary w-full mt-3 text-black"
          >
            Submit For Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeachOnEduNest;
