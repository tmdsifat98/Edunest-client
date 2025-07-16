import React, { useEffect } from "react";
import Banner from "./Sections/Banner";
import Partners from "./Sections/Partners";
import PopularClasses from "./Sections/PopularClasses";
import TeacherFeedback from "./Sections/TeacherFeedback";
import WebStats from "./Sections/WebStats";
import TeacherInspire from "./Sections/TeacherInspire";
import Competition from "./Sections/Competition";
import DiscountOffer from "./Sections/DiscountOffer";

const Home = () => {
     useEffect(() => {
      document.title = "Home || EduNest";
    }, []);
  
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
        <Competition/>
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
      <section>
        <DiscountOffer/>
      </section>
    </div>
  );
};

export default Home;
