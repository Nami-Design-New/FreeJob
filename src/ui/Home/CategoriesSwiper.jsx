import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CategoryCard from "../cards/CategoryCard";
import useCategoriesList from "../../hooks/categories/useCategories";
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
  { id: "8", title: "Logo Design", imageUrl: "https://placehold.co/80" },
  { id: "9", title: "Logo Design", imageUrl: "https://placehold.co/80" },
  { id: "10", title: "Logo Design", imageUrl: "https://placehold.co/80" },
];

export default function CategoriesSwiper() {
  // const { data: categories, error, isLoading } = useCategoriesList();
  console.log(categories);

  return (
    <div className="swiper_cntainer">
      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          425: {
            slidesPerView: 2,
          },
          575: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
      >
        {categories.map((item) => (
          <SwiperSlide key={item.id} style={{ height: "250px" }}>
            <CategoryCard title={item.title} imageUrl={item.imageUrl} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
