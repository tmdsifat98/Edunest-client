import React from "react";
import Banner from "./Sections/Banner";
import Partners from "./Sections/Partners";
import PopularClasses from "./Sections/PopularClasses";
import TeacherFeedback from "./Sections/TeacherFeedback";
import WebStats from "./Sections/WebStats";
import TeacherInspire from "./Sections/TeacherInspire";

const Home = () => {
  return (
    <div>
      <section>
        <Banner />
      </section>
      <section>
        <Partners />
      </section>
      <section>
        <PopularClasses />
      </section>
      <section>
        <TeacherInspire />
      </section>
      <section>
        <WebStats />
      </section>
      <section>
        <TeacherFeedback />
      </section>
    </div>
  );
};

export default Home;
