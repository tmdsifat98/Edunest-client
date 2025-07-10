import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

const Banner = () => {
  const slides = [
    {
      title: "Code Your Way to Innovation",
      description:
        " Start from logic building to real-world software projects. Learn C, Python, JavaScript and more with expert guidance.",
      btn: "",
    },
    {
      title: " Design That Speaks Loud",
      description:
        " Unleash your creativity with real-world projects in Photoshop, Illustrator & Canva. Turn ideas into stunning visuals.",
      btn: "",
    },
    {
      title: "Master the Art of Visual Storytelling",
      description:
        "Learn cinematic editing, transitions, color grading, and effects with industry-level tools like Premiere Pro & DaVinci Resolve",
      btn: "",
    },
    {
      title: "Build the Web from Scratch",
      description:
        " Learn HTML, CSS, JavaScript, and modern frameworks to create responsive, dynamic, and professional websites.",
      btn: "",
    },
  ];
  return (
    <div>
      <Swiper
         loop={true}
        speed={1000}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`w-full banner-bg-${
                index + 1
              } h-96 flex justify-center items-center lg:h-[700px]`}
            >
              <div className="text-white font-bold text-center lg:space-y-6 ">
                <h2 className="text-3xl lg:text-6xl font-playfair mb-7 lg:mb-5 text-center">
                  {slide.title}
                </h2>
                <p className="text-gray-200 w-3/4 mx-auto mb-6 font-normal lg:font-semibold">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
