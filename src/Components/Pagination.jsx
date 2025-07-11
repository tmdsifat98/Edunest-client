import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="mt-6 flex justify-center gap-2">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="btn btn-sm"
      >
        <FaArrowLeft /> Prev
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
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="btn btn-sm"
      >
        Next <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
