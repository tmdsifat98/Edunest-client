import React from "react";
import Swal from "sweetalert2";

const Newsletter = () => {
  const handleNewslatter = (e) => {
    e.preventDefault();
    Swal.fire("Success", "Successfully subscribed Edunest!", "success");
  };
  return (
    <section className=" dark:bg-gray-900 mb-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Stay Updated with EduNest
        </h2>
        <p className="text-gray-700 dark:text-gray-200 mb-8">
          Subscribe to our newsletter and never miss updates about new courses,
          events, and learning resources.
        </p>

        {/* Form */}
        <form onSubmit={handleNewslatter} className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full sm:flex-1 dark:bg-gray-800"
            required
          />
          <button
            type="submit"
            className="btn btn-primary w-full text-black sm:w-auto shadow-md"
          >
            Subscribe
          </button>
        </form>

        {/* Small note */}
        <p className="text-xs text-gray-700 dark:text-gray-200 mt-4">
          We respect your privacy 💙. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
