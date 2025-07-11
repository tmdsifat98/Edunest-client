import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const AddClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const classData = {
      title: data.title,
      name: user.displayName,
      email: user.email,
      price: parseFloat(data.price),
      description: data.description,
      image: data.image,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/classes", classData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Class added successfully!", "success");
        reset();
        navigate("/dashboard/myClasses");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add class!", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Add a New Class
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Title */}
        <div>
          <label className="label">Class Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full dark:bg-gray-700"
          />
          {errors.title && <span className="text-red-500">{errors.title.message}</span>}
        </div>

        {/* Name (readonly) */}
        <div>
          <label className="label">Your Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700"
          />
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700"
          />
        </div>

        {/* Price */}
        <div>
          <label className="label">Price ($)</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: "Price is required" })}
            className="input input-bordered w-full dark:bg-gray-700"
          />
          {errors.price && <span className="text-red-500">{errors.price.message}</span>}
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="textarea textarea-bordered w-full dark:bg-gray-700"
          ></textarea>
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </div>

        {/* Image URL */}
        <div>
          <label className="label">Image URL</label>
          <input
            type="text"
            {...register("image", { required: "Image URL is required" })}
            className="input input-bordered w-full dark:bg-gray-700"
          />
          {errors.image && <span className="text-red-500">{errors.image.message}</span>}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
