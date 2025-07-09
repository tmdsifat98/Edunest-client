import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useDebounce from "../../../hooks/useDebounce";
import NoDataFound from "../../Extra/NoDataFound";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  // ✅ Fetch all users initially
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
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
        className="input input-bordered lg:w-1/2 ml-8 mb-4"
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
                        user.role === "admin" ? "cursor-not-allowed bg-gray-300" : "cursor-pointer bg-primary"
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
    </div>
  );
};

export default Users;
