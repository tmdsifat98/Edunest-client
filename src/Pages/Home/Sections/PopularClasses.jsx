import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useAxiosLocal from "../../../hooks/useAxiosLocal";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const PopularClasses = () => {
  const axiosLocal = useAxiosLocal();

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["popularClasses"],
    queryFn: async () => {
      const res = await axiosLocal.get("/popular-classes");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="my-24 w-11/12 lg:w-9/12 mx-auto">
      <h2 className="text-5xl font-bold text-center mb-8 text-primary">
        Popular Classes
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Autoplay, Pagination]}
        className="popular-swiper"
      >
        {classes.map((cls) => (
          <SwiperSlide key={cls._id}>
            <div className="bg-base-100 dark:bg-gray-800 border border-gray-200 rounded-lg p-5 shadow-md">
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-primary">
                {cls.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                By: {cls.name}
              </p>
              <p className="text-sm mb-3 line-clamp-2 h-11">{cls.description}...</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span>🎓 {cls.enrolledCount} Student(s) enrolled</span>
                <span className="text-accent">৳{cls.price}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PopularClasses;
