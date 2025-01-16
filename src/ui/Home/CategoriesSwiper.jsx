import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CategoryCard from "../cards/CategoryCard";
import useCategoriesList from "../../hooks/categories/useCategories";
import DataLoader from "../DataLoader";

export default function CategoriesSwiper() {
  const { categories, isLoading, error } = useCategoriesList();

  return (
    <div className="swiper_cntainer">
      {isLoading ? (
        <DataLoader />
      ) : (
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
              <CategoryCard category={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
