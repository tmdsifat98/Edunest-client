import React, { useEffect } from "react";

const AboutUs = () => {

    useEffect(()=>{
        document.title = "About Us | EduNest";
    },[])
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary dark:text-accent">
          About Us
        </h1>
        <p className="mt-3 text-lg text-base-content/70 dark:text-gray-300">
          EduNest – A Modern Nest for Learning
        </p>
      </div>

      <section className="mb-10 card bg-base-200 dark:bg-neutral shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-secondary dark:text-info mb-2">
          Our Purpose
        </h2>
        <p className="text-base-content/80 dark:text-gray-200">
          EduNest was created to make education management simple, accessible,
          and enjoyable. Here, students can easily enroll in courses, access
          resources, and teachers can create and share courses effortlessly.
        </p>
      </section>

      <section className="mb-10 card bg-base-200 dark:bg-neutral shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-secondary dark:text-info mb-2">
          Our Vision
        </h2>
        <p className="text-base-content/80 dark:text-gray-200">
          We dream of building a global nest of knowledge—where learning knows
          no boundaries, collaboration is seamless, and every learner grows at
          their own pace.
        </p>
      </section>

      <section className="mb-10 card bg-base-200 dark:bg-neutral shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-secondary dark:text-info mb-3">
          What Makes Us Unique
        </h2>
        <ul className="list-disc list-inside space-y-2 text-base-content/80 dark:text-gray-200">
          <li>Simple enrollment in just a few clicks.</li>
          <li>Teacher-friendly tools for creating and managing courses.</li>
          <li>Clean, modern, and smooth user experience.</li>
        </ul>
      </section>

      <section className="card bg-base-200 dark:bg-neutral shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-secondary dark:text-info mb-2">
          Our Promise
        </h2>
        <p className="text-base-content/80 dark:text-gray-200">
          EduNest is more than a platform—it’s a companion for learning,
          teaching, and growing together. Every learner can blossom, given the
          right nest and nurturing.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;