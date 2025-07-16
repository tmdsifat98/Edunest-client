import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import Pagination from "../../../Components/Pagination";
import { useLoaderData } from "react-router";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const userCount = useLoaderData()
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;
  let pages = 0;
  //paginate calculation
  if (userCount > usersPerPage) {
    pages = userCount / usersPerPage;
  }
  const totalPages = Math.ceil(pages);

  // ✅ Fetch all pending or approved classes
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["adminClasses",currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/admin?page=${currentPage}&limit=${usersPerPage}`);
      return res.data;
    },
  });
  // ✅ Approve class
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/classes/status/${id}`, { status: "approved" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminClasses"]);
      Swal.fire("Approved", "Class has been approved", "success");
    },
  });

  // ✅ Reject class
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/classes/status/${id}`, { status: "rejected" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminClasses"]);
      Swal.fire("Rejected", "Class has been rejected", "info");
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-4xl font-bold my-6 text-center text-primary">
        All Classes
      </h2>
      <table className="table w-full text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Email</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, index) => (
            <tr key={cls._id}>
              <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
              <td>
                <div className="flex items-center justify-center">
                  <img
                    src={cls.image}
                    alt="class"
                    className="w-16 h-12 object-cover rounded"
                  />
                </div>
              </td>
              <td>{cls.title}</td>
              <td>{cls.email}</td>
              <td>{cls.description.slice(0, 40)}...</td>
              <td>
                <span
                  className={`text-sm px-2 py-[2px] rounded-lg ${
                    cls.status === "approved"
                      ? "bg-green-600 text-black"
                      : cls.status === "rejected"
                      ? "bg-red-200 text-red-600"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {cls.status}
                </span>
              </td>
              <td>
                <div className="flex items-center justify-center gap-2">
                  <button
                    disabled={cls.status !== "pending"}
                    onClick={() => approveMutation.mutate(cls._id)}
                    className="btn btn-sm btn-primary"
                  >
                    Approve
                  </button>
                  <button
                    disabled={cls.status !== "pending"}
                    onClick={() => rejectMutation.mutate(cls._id)}
                    className="btn btn-sm btn-secondary"
                  >
                    Reject
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

export default AllClasses;
