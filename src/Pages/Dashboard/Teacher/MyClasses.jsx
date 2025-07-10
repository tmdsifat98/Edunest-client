import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const MyClasses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);

  const { data: classes = [], isLoading, refetch } = useQuery({
    queryKey: ["myClasses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes?email=${user?.email}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const updateMutation = useMutation({
    mutationFn: async (updated) => {
      const res = await axiosSecure.patch(`/classes/${updated._id}`, updated);
      return res.data;
    },
    onSuccess: () => {
      refetch();
      setShowModal(false);
      Swal.fire("Success", "Class updated successfully!", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update class", "error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/classes/${id}`),
    onSuccess: () => {
      refetch();
      Swal.fire("Deleted", "Class deleted successfully", "success");
    },
  });

  const openModal = (cls) => {
    setShowModal(true);
    reset(cls);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = (data) => {
    const updated = {
      ...data,
      price: parseFloat(data.price),
    };
    updateMutation.mutate(updated);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the class.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">My Classes</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div key={cls._id} className="card bg-base-100 shadow-lg border">
            <figure>
              <img src={cls.image} alt="Class" className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{cls.title}</h2>
              <p><b>Price:</b> ${cls.price}</p>
              <p><b>Status:</b> {cls.status}</p>
              <p className="text-sm text-gray-600">{cls.description}</p>
              <p className="text-xs text-gray-400">By: {cls.name} | {cls.email}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => openModal(cls)} className="btn text-black btn-sm btn-primary">Update</button>
                <button onClick={() => handleDelete(cls._id)} className="btn btn-sm bg-rose-600">Delete</button>
                <button className="btn btn-sm btn-outline">See Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* UPDATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
            <h3 className="text-xl font-bold mb-4 text-primary">Update Class</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <label className="label">Title</label>
                <input
                  {...register("title", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">Price</label>
                <input
                  type="number"
                  {...register("price", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea
                  {...register("description", { required: true })}
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>
              <div>
                <label className="label">Image URL</label>
                <input
                  {...register("image", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="submit" className="btn btn-success btn-sm">Save</button>
                <button onClick={closeModal} type="button" className="btn btn-ghost btn-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClasses;
