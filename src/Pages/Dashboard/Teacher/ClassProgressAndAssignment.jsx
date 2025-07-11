import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";

const ClassProgressAndAssignment = () => {
  const { classId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    deadline: "",
    description: "",
  });

  // ✅ Query for stats
  const { data: stats = {} } = useQuery({
    queryKey: ["classStats", classId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/stats/${classId}`);
      return res.data;
    },
  });

  const createAssignment = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post("/assignments", {
        ...formData,
        classId,
        teacherEmail: user?.email,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["classStats", classId]);
      setShowModal(false);
      Swal.fire("Success", "Assignment added!", "success");
      setFormData({ title: "", deadline: "", description: "" });
    },
    onError: () => Swal.fire("Error", "Assignment creation failed", "error"),
  });

  return (
    <div className="p-4">
      <div className="mb-4 text-right">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Create Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
        <div className="bg-primary/30 p-4 rounded shadow text-center">
          <h3 className="text-lg font-bold">Total Enrollments</h3>
          <p className="text-2xl">{stats.enrollmentCount || 0}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded shadow text-center">
          <h3 className="text-lg font-bold">Total Assignments</h3>
          <p className="text-2xl">{stats.assignmentCount || 0}</p>
        </div>
        <div className="bg-pink-600/40 p-4 rounded shadow text-center">
          <h3 className="text-lg font-bold">Total Submissions</h3>
          <p className="text-2xl">{stats.submissionCount || 0}</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-600 p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">Create Assignment</h2>
            <input
              type="text"
              placeholder="Assignment Title"
              className="input input-bordered w-full dark:bg-gray-700"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <input
              type="date"
              className="input input-bordered w-full dark:bg-gray-700"
              value={formData.deadline}
              onChange={(e) =>
                setFormData({ ...formData, deadline: e.target.value })
              }
            />
            <textarea
              className="textarea textarea-bordered w-full dark:bg-gray-700"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-success"
                onClick={() => createAssignment.mutate()}
              >
                Add Assignment
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassProgressAndAssignment;
