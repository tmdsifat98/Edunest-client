import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDebounce from "../../../hooks/useDebounce";
import NoDataFound from "../../Extra/NoDataFound";
import { useLoaderData } from "react-router";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const userCount = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const usersPerPage =  10

   let pages = 0;
  //paginate calculation
  if (userCount > usersPerPage) {
    pages = userCount / usersPerPage;
  }
  const totalPages = Math.ceil(pages);

  // ✅ Fetch all users initially
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers",currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?page=${currentPage}&limit=${usersPerPage}`);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  // ✅ Filtered users based on debounced search
  const filteredUsers = debouncedSearch
    ? allUsers.filter((user) =>
        user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : allUsers;

  // ✅ Make admin
  const makeAdminMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/users/admin/${id}`);
      return res.data;
    },
    onSuccess: () => {
      refetch();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User has been made admin.",
        timer: 1500,
        showConfirmButton: false,
        position: "center",
      });
    },
    onError: () => {
      Swal.fire("Error", "Failed to make admin!", "error");
    },
  });

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search user by email"
        className="input input-bordered lg:w-1/2 ml-8 mb-4 dark:bg-gray-800"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : filteredUsers.length === 0 ? (
        <NoDataFound message="Opps! No users found with this email." />
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-center">
            <thead>
              <tr>
                <th>SL</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th className="hidden md:table-caption">Last logged in</th>
                <th>Role</th>
                <th>Make Admin</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <img
                        className="w-10 h-10 object-cover"
                        src={user.image}
                        alt=""
                      />
                    </div>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="hidden md:table-caption">
                    {user.lastLogIn
                      ? new Date(user.lastLogIn).toLocaleString()
                      : "Never logged in"}
                  </td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      disabled={user.role === "admin"}
                      onClick={() => makeAdminMutation.mutate(user._id)}
                      className={` ${
                        user.role === "admin"
                          ? "cursor-not-allowed bg-gray-300"
                          : "cursor-pointer bg-primary"
                      } px-4 py-2 rounded text-black`}
                    >
                      {makeAdminMutation.isLoading
                        ? "Processing..."
                        : user.role === "admin"
                        ? "Already Admin"
                        : "Make Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="btn btn-sm"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn btn-sm ${
              currentPage === i + 1 ? "btn-primary" : "btn-ghost"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="btn btn-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
