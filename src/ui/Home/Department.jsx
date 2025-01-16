import ServiceCard from "../../ui/cards/ServiceCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useSelector } from "react-redux";
import "swiper/swiper-bundle.css";
import ShowAll from "../ShowAll";

const Department = ({ category }) => {
  const lang = useSelector((state) => state.language.lang);

  return (
    <div className="container p-2">
      <ShowAll to="/services" sectionName={category?.name || "برمجة وتطوير"} />
      <div className="row mb-5 py-2">
        <Swiper
          slidesPerView={4}
          speed={1000}
          loop={true}
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="mainSliderContainer"
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            575: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
            1150: {
              slidesPerView: 4,
            },
          }}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          {category?.services?.map((service) => (
            <SwiperSlide className="p-3" key={service.id}>
              <ServiceCard service={service} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Department;
