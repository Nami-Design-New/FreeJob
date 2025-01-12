import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ServiceCard from "./../../ui/cards/ServiceCard";
import { useSelector } from "react-redux";

export default function SimilarServices({ services }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  return (
    <section className="mb-5 container pt-0" style={{ padding: "0 16px" }}>
      <div className="container">
        <div className="row_head" data-aos="fade-up">
          <h6>{t("addService.SimilarServices")}</h6>
        </div>
        <Swiper
          spaceBetween={12}
          slidesPerView={4}
          observeSlideChildren={true}
          observer={true}
          updateOnWindowResize={true}
          speed={1000}
          loop={true}
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="mainSliderContainer w-100"
          breakpoints={{
            992: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
            350: {
              slidesPerView: 1,
            },
          }}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          {services?.map((service) => (
            <SwiperSlide key={service.id}>
              <ServiceCard service={service} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
