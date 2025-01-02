import React from "react";
import { NavLink } from "react-router";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const categories = [
  "Programming & Tech",
  "Digital Marketing",
  "Video & Animation",
  "Writing & Translation",
  "Music & Audio",
  "Business",
  "Finance",
  "AI Services",
  "Personal Growth",
  "Personal Growth",
  "Personal Growth",
  "Personal Growth",
  "Personal Growth",
];

export default function HeaderSwiper() {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView="auto"
    >
      {categories.map((cat, index) => (
        <SwiperSlide
          key={index}
          className="Categories_Slider_item"
          style={{ width: "fit-content" }}
        >
          <NavLink>{cat}</NavLink>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
