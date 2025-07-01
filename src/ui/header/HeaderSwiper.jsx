import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useCategoriesList from "./../../hooks/categories/useCategoriesList";
import ChooseCategoryPath from "../modals/ChooseCategoryPath";
import "swiper/css";

export default function HeaderSwiper() {
  const lang = useSelector((state) => state.language.lang);
  const { categories } = useCategoriesList();
  const [show, setShow] = useState(false);
  const handleCloseModal = () => setShow(false);
  const handleOpenModal = () => setShow(true);
  const [id, setId] = useState();

  function handleOnClick(id) {
    setId(id);
    handleOpenModal();
  }

  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView="auto"
        dir={lang === "en" ? "ltr" : "rtl"}
      >
        {categories?.map((cat) => {
          return (
            <SwiperSlide
              key={cat.id}
              className="Categories_Slider_item"
              style={{ width: "fit-content" }}
            >
              <button onClick={() => handleOnClick(cat.id)}>{cat?.name}</button>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <ChooseCategoryPath
        show={show}
        close={handleCloseModal}
        params={`categories=${id}`}
      />
    </>
  );
}
