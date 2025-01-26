import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CategoryCard from "../cards/CategoryCard";
import useCategoriesList from "../../hooks/categories/useCategoriesList";
import DataLoader from "../DataLoader";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ChooseCategoryPath from "../modals/ChooseCategoryPath";

export default function CategoriesSwiper() {
  const { categories, isLoading } = useCategoriesList();
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const handleCloseModal = () => setShow(false);
  const handleOpenModal = () => setShow(true);
  const { t } = useTranslation();
  function handleClick(id) {
    setId(id);
    handleOpenModal();
  }
  return (
    <div className="swiper_cntainer">
      {isLoading ? (
        <DataLoader />
      ) : (
        <Swiper
          spaceBetween={24}
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
            <SwiperSlide
              onClick={() => handleClick(item.id)}
              key={item.id}
              style={{ height: "auto" }}
            >
              <CategoryCard category={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}{" "}
      <ChooseCategoryPath
        show={show}
        close={handleCloseModal}
        params={`categories=${id}`}
      />
    </div>
  );
}
