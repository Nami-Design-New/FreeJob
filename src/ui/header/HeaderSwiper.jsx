import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useCategorieListWithSub from "../../hooks/categories/useCategorieListWithSub";
import ChooseCategoryPath from "../modals/ChooseCategoryPath";

export default function HeaderSwiper() {
  const lang = useSelector((state) => state.language.lang);
  const { isLoading, data } = useCategorieListWithSub();
  const [subCats, setSubCats] = useState([]);
  const [show, setShow] = useState(false);
  const handleCloseModal = () => setShow(false);
  const handleOpenModal = () => setShow(true);
  const [id, setId] = useState();
  function handleOnClick(id) {
    setId(id);
    handleOpenModal();
  }
  useEffect(() => {
    setSubCats(data?.flatMap((category) => category?.sub_categories));
  }, [data]);
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView="auto"
        dir={lang === "en" ? "ltr" : "rtl"}
      >
        {subCats &&
          subCats.length > 0 &&
          subCats?.map((subCat) => {
            return (
              <SwiperSlide
                key={subCat.id}
                className="Categories_Slider_item"
                style={{ width: "fit-content" }}
              >
                <button onClick={() => handleOnClick(subCat.id)}>
                  {subCat?.name}
                </button>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <ChooseCategoryPath
        show={show}
        close={handleCloseModal}
        params={`sub_categories=${id}`}
      />
    </>
  );
}
