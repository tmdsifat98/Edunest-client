import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import useAxiosLocal from "../../../hooks/useAxiosLocal";
import StarRatings from "react-star-ratings";

const TeacherFeedback = () => {
  const axiosLocal = useAxiosLocal();

  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["teacherFeedbacks"],
    queryFn: async () => {
      const res = await axiosLocal.get("/teacher-feedbacks");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="my-24 px-4 lg:px-0 w-11/12 lg:w-9/12 mx-auto">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        What Our Students Say
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination, Autoplay]}
        className="feedback-swiper"
      >
        {feedbacks.map((fb) => (
          <SwiperSlide key={fb._id}>
            <div
              key={fb._id}
              className="bg-white dark:bg-gray-800 p-4 w-full mb-3 rounded-xl shadow-md"
            >
              <div className="flex gap-2 mt-3 ml-2">
                <img
                  src={fb.image}
                  alt={fb.givenBy}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{fb.givenBy}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {new Date(fb.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <h2 className="font-semibold text-xl mt-4 pl-3">{fb.title}</h2>
              <div className="ml-6 mt-1">
                <div className="flex items-center gap-1">
                <StarRatings
                  rating={fb.rating}
                  starRatedColor="#f5b901"
                  numberOfStars={5}
                  starDimension="25px"
                  starSpacing="2px"
                  name="rating"
                />{" "}
                <p className="mt-1">({fb.rating})</p>
              </div>
                <p className="text-gray-600 line-clamp-2 h-15 dark:text-gray-300 mt-2 bg-gray-200 dark:bg-gray-600 p-2 rounded-lg">
                  {fb.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TeacherFeedback;
