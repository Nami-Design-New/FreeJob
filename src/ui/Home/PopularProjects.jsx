import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useGetLatestProjects from "../../hooks/projects/useGetLatestProjects";
import ProjectCard from "../cards/ProjectCard";
import DataLoader from "../DataLoader";
import SectionHeader from "../SectionHeader";

export default function PopularProjects() {
  const { data: latestProjects, isLoading, error } = useGetLatestProjects();
  const lang = useSelector((state) => state.language.lang);

  const { t } = useTranslation();
  return (
    <div className="popular_projects">
      <SectionHeader
        title={t("home.bestProjects")}
        description={t("home.bestProjectsSubTitle")}
      />
      <div className="row mt-5">
        {isLoading ? (
          <DataLoader />
        ) : (
          <Swiper
            spaceBetween={15}
            slidesPerView={2}
            speed={1000}
            loop={true}
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="mainSliderContainer"
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              786: {
                slidesPerView: 2,
              },
            }}
            style={{ padding: "30px", height: "100%" }}
          >
            {latestProjects.map((project) => (
              <SwiperSlide key={project.id} style={{ height: "100%" }}>
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
