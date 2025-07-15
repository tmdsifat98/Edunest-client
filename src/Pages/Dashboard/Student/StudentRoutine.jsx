import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const StudentRoutine = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  // fetch existing routine
  const { data: routine, isLoading } = useQuery({
    queryKey: ["studentRoutine", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/routines?email=${user.email}`);
      return res.data;
    },
  });

  // mutation for saving routine
  const mutation = useMutation({
    mutationFn: async (routineData) => {
      if (routine?._id) {
        return axiosSecure.put(`/routines/${routine._id}`, routineData);
      } else {
        return axiosSecure.post("/routines", routineData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["studentRoutine", user?.email]);
      Swal.fire("Success", "Routine saved successfully!", "success");
      setIsEditing(false);
    },
    onError: () => {
      Swal.fire("Error", "Failed to save routine.", "error");
    },
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: routine || {},
  });

  const onSubmit = (data) => {
    const routineData = {
      ...data,
      email: user?.email,
      createdAt: new Date().toISOString(),
    };
    mutation.mutate(routineData);
  };

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="w-11/12 lg:w-full mx-auto mt-8 bg-base-100 dark:bg-gray-800 shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">My Routine</h2>

      {routine && !isEditing ? (
        <div className="space-y-2">
          <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded">{routine.content}</pre>
          <p>Last updated at {new Date(routine.createdAt).toLocaleString() }</p>
          <button
            className="btn btn-primary text-black" 
            onClick={() => {
              setIsEditing(true);
              reset(routine);
            }}
          >
            Update Routine
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <textarea
            {...register("content", { required: true })}
            rows={8}
            placeholder="Enter your routine (e.g., Morning to Night:ReactJs Afternoon:Javascript...)"
            className="textarea textarea-bordered w-full dark:bg-gray-700"
          />
          <button
            type="submit"
            className="btn btn-primary text-black"
          >
            {routine ? "Update Routine" : "Save Routine"}
          </button>
          {routine && (
            <button
              type="button"
              className="btn btn-secondary btn-outline ml-2 mb-4 "
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default StudentRoutine