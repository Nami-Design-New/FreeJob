import React from "react";
import ProjectCard from "../cards/ProjectCard";
import SectionHeader from "../SectionHeader";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import useGetLatestProjects from "../../hooks/projects/useGetLatestProjects";
import DataLoader from "../DataLoader";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function PopularProjects() {
  const { data: latestProjects, isLoading, erroe } = useGetLatestProjects();
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
                <Link to={"projects/" + project.id}>
                  <ProjectCard project={project} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
