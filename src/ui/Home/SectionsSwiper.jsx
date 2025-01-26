import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SectionCard from "../cards/SectionCard";
import ShowAll from "../ShowAll";
import { useTranslation } from "react-i18next";
import useCategoriesList from "../../hooks/categories/useCategoriesList";
import DataLoader from "../DataLoader";
import ChooseCategoryPath from "../modals/ChooseCategoryPath";
import { useEffect, useState } from "react";

export default function SectionsSwiper() {
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
            <SwiperSlide
              onClick={() => handleClick(item.id)}
              key={item.id}
              style={{ height: "auto" }}
            >
              <SectionCard section={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}{" "}
      <ChooseCategoryPath
        show={show}
        close={handleCloseModal}
        params={`categories=${id}`}
      />
    </>
  );
}
