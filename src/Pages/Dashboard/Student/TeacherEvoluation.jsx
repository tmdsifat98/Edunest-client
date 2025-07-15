import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import StarRatings from "react-star-ratings";

const TeacherEvaluation = ({ setShowModal, uniqueClass }) => {
  const axiosSecure = useAxiosSecure();
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useAuth();

  const handleTERSubmit = async () => {
    if (!description || rating === 0) {
      return Swal.fire(
        "Warning",
        "Please provide both feedback and rating.",
        "warning"
      );
    }

    try {
      const payload = {
        description,
        rating,
        teacherEmail: uniqueClass.email,
        classId: uniqueClass._id,
        title: uniqueClass.title,
        givenBy: user?.displayName,
        image: user?.photoURL,
      };

      await axiosSecure.post("/evaluation", payload);
      Swal.fire("Thanks!", "Your evaluation has been submitted.", "success");
      setShowModal(false);
      setDescription("");
      setRating(0);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit evaluation.", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <h3 className="text-lg font-bold mb-4 text-center text-primary">
          Teaching Evaluation
        </h3>

        <label className="block mb-2 font-medium">Your Feedback</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full mb-4 dark:bg-gray-700"
          placeholder="Write your thoughts..."
        />

        <label className="block mb-2 font-medium">Rating</label>

        <StarRatings
          rating={rating}
          starRatedColor="#f5b901"
          changeRating={(newRating) => setRating(newRating)}
          numberOfStars={5}
          name="userRating"
          starDimension="30px"
          starSpacing="5px"
        />
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="btn btn-outline btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary text-black"
            onClick={handleTERSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherEvaluation;
