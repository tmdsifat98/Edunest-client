import React from "react";
import teacher from "../../../assets/inspire.jpg";
import { Link } from "react-router";

const TeacherInspire = () => {
  return (
    <section className="my-24 px-4 lg:px-0">
      <div className="lg:w-9/12 w-11/12 mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2">
          <img
            src={teacher}
            alt="Join as a Teacher"
            className="w-full rounded-xl shadow-xl"
          />
        </div>

        <div className="w-full lg:w-1/2 space-y-2">
          <h2 className="text-5xl font-bold text-primary">
            Inspire. Educate. Make an Impact.
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Join our platform and become a part of a growing community of
            passionate educators. Share your knowledge, change lives, and shape
            the future — one class at a time.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Whether you're a coding wizard, a design expert, or a passionate
            academic — we welcome teachers from all backgrounds to contribute
            and earn doing what they love.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Empower the next generation of learners by sharing your skills and
            real-world experience. You have the power to make learning
            accessible and exciting.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Inspire minds, create change, and leave a legacy through education —
            because teaching is not just a job, it's a mission.
          </p>
          <Link to="/teachOnEduNest">
            <button className="btn btn-primary mt-3">Become a Teacher</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeacherInspire;
