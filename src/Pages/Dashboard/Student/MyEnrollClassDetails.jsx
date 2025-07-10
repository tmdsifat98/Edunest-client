import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import NoDataFound from "../../Extra/NoDataFound";
import TeacherEvaluation from "./TeacherEvoluation";

const MyEnrollClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [submissions, setSubmissions] = useState({});
  const [showModal, setShowModal] = useState(false);

  const { data: assignments = [], isLoading } = useQuery({
    queryKey: ["classAssignments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/${id}`);
      return res.data;
    },
  });

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
        <button className="btn btn-primary">Teaching Evaluation Report</button>
      </div>
      <h2 className="text-4xl font-bold text-primary mb-4">Assignments</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : assignments.length === 0 ? (
        <NoDataFound message="No assignment found at this moment" />
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-center table-zebra">
            <thead>
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
                <tr key={assignment._id}>
                  <td>{index + 1}</td>
                  <td>{assignment.title}</td>
                  <td>{assignment.description}</td>
                  <td>{new Date(assignment.deadline).toLocaleDateString()}</td>
                  <td className="flex flex-col md:flex-row gap-2 items-center justify-center">
                    <input
                      type="text"
                      placeholder="Paste document link"
                      className="input input-bordered input-sm"
                      value={submissions[assignment._id] || ""}
                      onChange={(e) =>
                        handleChange(assignment._id, e.target.value)
                      }
                    />
                    <button
                      onClick={() => handleSubmit(assignment._id)}
                      className="btn btn-sm btn-primary"
                    >
                      Submit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
