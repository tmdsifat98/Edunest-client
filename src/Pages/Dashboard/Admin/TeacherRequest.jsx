import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheck, FaTimes } from "react-icons/fa";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { useLoaderData } from "react-router";
import Pagination from "../../../Components/Pagination";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const userCount = useLoaderData();

  const usersPerPage = 10;

  let pages = 0;
  //paginate calculation
  if (userCount > usersPerPage) {
    pages = userCount / usersPerPage;
  }
  const totalPages = Math.ceil(pages);

  // Fetch pending teacher requests
  const { data: teachers = [], isLoading } = useQuery({
    queryKey: ["teachers", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `teachers?page=${currentPage}&limit=${usersPerPage}`
      );
      return res.data;
    },
  });

  // Approve teacher request
  const approveMutation = useMutation({
    mutationFn: async (teacher) => {
      await axiosSecure.patch(`/teachers/${teacher._id}`, {
        status: "approved",
      });

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

  const handleReject = async (teacher) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently reject the request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    });

    if (result.isConfirmed) {
      rejectMutation.mutate(teacher);
    }
  };

  // Reject teacher request
  const rejectMutation = useMutation({
    mutationFn: async (teacher) => {
      await axiosSecure.patch(`/teachers/${teacher._id}`, {
        status: "rejected",
        email: teacher.email,
      });
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
    return <LoadingSpinner />;
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 text-primary">
        All Teacher Requests
      </h2>
      <table className="table w-full text-center">
        <thead className=" dark:text-white">
          <tr>
            <th>SL</th>
            <th>Image</th>
            <th>Name</th>
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
              <td>
                <div className="flex items-center justify-center">
                  <img
                    src={teacher.image}
                    alt="teacher"
                    className="w-10 h-10 object-cover"
                  />
                </div>
              </td>
              <td>{teacher.name}</td>

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
              <td>
                <div className="flex gap-2 items-center justify-center">
                  <button
                    onClick={() => approveMutation.mutate(teacher)}
                    disabled={
                      teacher.status === "rejected" ||
                      teacher.status === "approved"
                    }
                    className="btn btn-xs btn-success flex items-center gap-1"
                  >
                    <FaCheck /> Approve
                  </button>
                  <button
                    onClick={() => handleReject(teacher)}
                    disabled={teacher.status === "rejected"}
                    className="btn btn-xs btn-error flex items-center gap-1"
                  >
                    <FaTimes /> Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default TeacherRequest;
