import React from "react";
import Banner from "./Sections/Banner";
import Partners from "./Sections/Partners";
import PopularClasses from "./Sections/PopularClasses";

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
        <PopularClasses/>
      </section>
    </div>
  );
};

export default Home;
