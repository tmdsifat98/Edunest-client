import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { FaCheck, FaTimes } from "react-icons/fa";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch pending teacher requests
  const { data: teachers = [], isLoading } = useQuery({
    queryKey: ["pendingTeachers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teachers?status=pending");
      return res.data;
    },
  });

  // Approve teacher request
  const approveMutation = useMutation({
    mutationFn: async (teacher) => {
      // 1) Update teacher status
      await axiosSecure.patch(`/teachers/${teacher._id}`, {
        status: "approved",
      });

      // 2) Update user role
      await axiosSecure.patch(`/users/role/${teacher.email}`, {
        role: "teacher",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingTeachers"]);
      Swal.fire("Success", "Teacher approved and role updated", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to approve teacher", "error");
    },
  });

  // Reject teacher request
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/teachers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingTeachers"]);
      Swal.fire("Deleted", "Request has been rejected", "info");
    },
    onError: () => {
      Swal.fire("Error", "Failed to reject request", "error");
    },
  });

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="overflow-x-auto p-4 bg-base-100 shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-primary">All Teacher Requests</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Image</th>
            <th>Experience</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={teacher._id}>
              <td>{index + 1}</td>
              <td>{teacher.name}</td>
              <td>
                <img
                  src={teacher.image}
                  alt="teacher"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td>{teacher.experience}</td>
              <td>{teacher.title}</td>
              <td>{teacher.category}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    teacher.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : teacher.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {teacher.status}
                </span>
              </td>
              <td className="flex gap-2">
                <button
                  onClick={() => approveMutation.mutate(teacher)}
                  className="btn btn-xs btn-success flex items-center gap-1"
                >
                  <FaCheck /> Approve
                </button>
                <button
                  onClick={() => rejectMutation.mutate(teacher._id)}
                  className="btn btn-xs btn-error flex items-center gap-1"
                >
                  <FaTimes /> Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherRequest;