import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useLoaderData, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import NoDataFound from "../../Extra/NoDataFound";
import TeacherEvaluation from "./TeacherEvoluation";
import Pagination from "../../../Components/Pagination";
import useAuth from "../../../hooks/useAuth";

const MyEnrollClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {user}=useAuth()
  const [submissions, setSubmissions] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const userCount = useLoaderData();

  const usersPerPage = 10;

  let pages = 0;
  //paginate calculation
  if (userCount > usersPerPage) {
    pages = userCount / usersPerPage;
  }
  const totalPages = Math.ceil(pages);

  const { data: assignments = [], isLoading } = useQuery({
    queryKey: ["classAssignments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assignments/${id}?page=${currentPage}&limit=${usersPerPage}`
      );
      return res.data;
    },
  });
  console.log(assignments);

  const { data: uniqueClass = {} } = useQuery({
    queryKey: ["class", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${id}`);
      return res.data;
    },
  });

  const submitAssignment = useMutation({
    mutationFn: async ({ assignmentId, document }) => {
      return await axiosSecure.post("/assignment-submissions", {
        assignmentId,
        email:user.email,
        classId: id,
        document,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["classAssignments", id]);
      Swal.fire("Success!", "Assignment submitted successfully", "success");
      setSubmissions({});
    },
    onError: () => {
      Swal.fire("Error!", "You have already submitted the assignment", "error");
    },
  });

  const handleChange = (assignmentId, value) => {
    setSubmissions((prev) => ({ ...prev, [assignmentId]: value }));
  };

  const handleSubmit = (assignmentId) => {
    if (!submissions[assignmentId]) return;
    submitAssignment.mutate({
      assignmentId,
      document: submissions[assignmentId],
    });
  };

  return (
    <div className="p-4">
      <div
        onClick={() => setShowModal(true)}
        className="flex justify-end lg:mr-12 mb-5"
      >
        <button className="btn btn-primary text-black">Teaching Evaluation Report</button>
      </div>
      <h2 className="text-4xl font-bold text-primary mb-4">Assignments</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : assignments.length === 0 ? (
        <NoDataFound message="No assignment found at this moment" />
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-center">
            <thead className="dark:text-white">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Deadline</th>
                <th>Submission</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={assignment._id} >
                  <td>{index + 1}</td>
                  <td>{assignment.title}</td>
                  <td className="w-1/4">{assignment.description.slice(0,80)}...</td>
                  <td>{new Date(assignment.deadline).toLocaleDateString()}</td>
                  <td className="flex flex-col md:flex-row gap-2 items-center justify-center">
                    <input
                      type="text"
                      placeholder="Paste document link"
                      className="input input-bordered input-sm dark:bg-gray-700"
                      value={submissions[assignment._id] || ""}
                      onChange={(e) =>
                        handleChange(assignment._id, e.target.value)
                      }
                    />
                    <button
                      onClick={() => handleSubmit(assignment._id)}
                      className="btn btn-sm btn-primary text-black"
                    >
                      Submit
                    </button>
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
      )}
      {showModal && (
        <TeacherEvaluation
          uniqueClass={uniqueClass}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default MyEnrollClassDetails;
