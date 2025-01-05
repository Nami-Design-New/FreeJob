// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import CategoryCard from "../cards/CategoryCard";
import { Pagination } from "swiper/modules";
const categories = [
  {
    id: "1",
    title: "3D Industrial Design",
    imageUrl: "https://placehold.co/80",
  },
  {
    id: "2",
    title: "E-commerce Website Development",
    imageUrl: "https://placehold.co/80",
  },
  { id: "3", title: "Email Marketing", imageUrl: "https://placehold.co/80" },
  { id: "4", title: "Press Releases", imageUrl: "https://placehold.co/80" },
  { id: "5", title: "Logo Design", imageUrl: "https://placehold.co/80" },
  { id: "6", title: "Logo Design", imageUrl: "https://placehold.co/80" },
  { id: "7", title: "Logo Design", imageUrl: "https://placehold.co/80" },
];

export default function CategoriesSwiper() {
  return (
    <div className="swiper_cntainer">
      <Swiper spaceBetween={20} slidesPerView="auto">
        {categories.map((item) => (
          <SwiperSlide key={item.id} style={{ width: "16rem" }}>
            <CategoryCard title={item.title} imageUrl={item.imageUrl} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
