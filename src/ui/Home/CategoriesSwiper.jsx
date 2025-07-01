import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import CategoryCard from "../cards/CategoryCard";
import useCategoriesList from "../../hooks/categories/useCategoriesList";
import DataLoader from "../DataLoader";
import ChooseCategoryPath from "../modals/ChooseCategoryPath";
import usePopularCategories from "../../hooks/categories/usePopularCategoris";

export default function CategoriesSwiper() {
  const { data: categories, isLoading } = usePopularCategories();
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  return (
    <div className="swiper_cntainer">
      {isLoading ? (
        <DataLoader />
      ) : (
        <Swiper
          spaceBetween={16}
          breakpoints={{
            992: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 3,
            },
            350: {
              slidesPerView: 2,
            },
          }}
        >
          {categories.map((item) => (
            <SwiperSlide
              onClick={() => handleOpenModal(item.id)}
              key={item.id}
              style={{ height: "auto", cursor: "pointer" }}
            >
              <CategoryCard category={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Render modal only if a category is selected */}
      {selectedId && (
        <ChooseCategoryPath
          show={showModal}
          close={handleCloseModal}
          params={`sub_categories=${selectedId}`}
        />
      )}
    </div>
  );
}
