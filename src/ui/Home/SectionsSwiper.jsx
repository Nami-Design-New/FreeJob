import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SectionCard from "../cards/SectionCard";
import ShowAll from "../ShowAll";
import { useTranslation } from "react-i18next";
import useCategoriesList from "../../hooks/categories/useCategoriesList";
import DataLoader from "../DataLoader";

export default function SectionsSwiper() {
  const { categories, isLoading } = useCategoriesList();
  const { t } = useTranslation();
  return (
    <>
      <div className="">
        <ShowAll sectionName={t("navbar.categories")} to="/sections" />
      </div>
      {isLoading ? (
        <div className="d-flex align-items-center-justify-content-center">
          <DataLoader />
        </div>
      ) : (
        <Swiper
          spaceBetween={16}
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
            <SwiperSlide key={item.id} style={{ height: "auto" }}>
              <SectionCard section={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
