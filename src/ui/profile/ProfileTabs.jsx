import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import useGetUserProjects from "../../hooks/projects/useGetUserProjects";
import useUserServices from "../../hooks/services/useUserServices";
import useGetWorks from "../../hooks/works/useGetWorks";
import { deleteService } from "../../services/apiServices";
import ProjectCard from "../cards/ProjectCard";
import ShowAll from "../ShowAll";
import ServiceCard from "./../cards/ServiceCard";
import DataLoader from "./../DataLoader";
import CertificatesTab from "./CertificatesTab";
import ConfirmationModal from "./ConfirmationModal";
import WorksTap from "./WorksTap";

function ProfileTabs({ user, isMyAccount }) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [serviceId, setServiceId] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data: services } = useUserServices(user?.id);
  const { data: myProjects, isLoading } = useGetUserProjects(user?.id);
  const { data: works } = useGetWorks(user?.id);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const lang = useSelector((state) => state.language.lang);
  const handleDelete = (id) => {
    setShowConfirmation(true);
    setServiceId(id);
  };

  const handleDeleteService = async () => {
    setLoading(true);
    try {
      await deleteService(serviceId, queryClient);
      toast.success(t("addService.serviceDeleted"));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setShowConfirmation(false);
    }
  };
  return (
    <>
      <div className="_item">
        <div className="user_about">
          <>
            <div className="about_title">
              <h6>{t("profile.aboutMe")}</h6>
              {isMyAccount && user?.about && (
                <Link to="/edit-profile">
                  <FaEdit />
                  {t("profile.edit")}
                </Link>
              )}
            </div>{" "}
            {user?.about ? (
              <p>{user?.about}</p>
            ) : (
              <p className="fs-4">{t("profile.noAbout")}</p>
            )}
          </>
        </div>

        {/* my certificates */}
        <div className="tab_item">
          <h6>{t("profile.myCertificates")}</h6>
          <CertificatesTab user={user} isMyAccount={isMyAccount} />
        </div>

        {/* services */}
        <div className="services-container">
          <>
            <ShowAll sectionName={t("profile.services")} show={true} />

            <Swiper
              slidesPerView={4}
              speed={1000}
              spaceBetween={20}
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
              {isMyAccount && (
                <SwiperSlide
                  style={{
                    height: "auto",
                    width: "auto",
                  }}
                >
                  <Link to="/add-service" className="add-service">
                    {t("profile.addService")}
                    <img src={"/images/plus.png"} alt="add service" />
                  </Link>
                </SwiperSlide>
              )}

              {services?.length === 0 ? (
                <SwiperSlide style={{ height: "auto", width: "auto" }}>
                  <div className="noDataFound">
                    <h4>{t("profile.noService")}</h4>
                  </div>{" "}
                </SwiperSlide>
              ) : (
                <>
                  {services?.map((service) => (
                    <SwiperSlide
                      style={{ height: "auto", width: "auto" }}
                      key={service.id}
                    >
                      <ServiceCard
                        canEdit={isMyAccount}
                        service={service}
                        handleDelete={handleDelete}
                        showPending={true}
                      />
                    </SwiperSlide>
                  ))}
                </>
              )}
            </Swiper>
          </>
        </div>
        {/* my works */}
        <div className="tab_item">
          <WorksTap works={works} isMyAccount={isMyAccount} />
        </div>
        {/* projects */}
        <div className="services-container">
          {" "}
          <ShowAll show={true} sectionName={t("profile.projects")} />
          {isMyAccount && (
            <Link to="/add-project" className="add-project">
              <img src={"/images/plus.png"} alt="add service" />
              {t("routes.add-project")}
            </Link>
          )}{" "}
          {isLoading ? (
            <DataLoader />
          ) : (
            <div className="projects_wrapper">
              {myProjects?.length === 0 ? (
                <div className="noDataFound">
                  <h4>{t("profile.noProjects")}</h4>
                </div>
              ) : (
                <>
                  {" "}
                  {myProjects?.map((project) => (
                    <ProjectCard
                      key={project?.id}
                      project={project}
                      isProfile={true}
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        eventFun={handleDeleteService}
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        loading={loading}
        text={t("profile.areYouSureWantToDeleteThisService")}
        buttonText={t("profile.deleteService")}
      />
    </>
  );
}

export default ProfileTabs;
