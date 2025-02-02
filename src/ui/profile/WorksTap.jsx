import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { deleteWork } from "../../services/apiWorks";
import WorkCard from "../cards/worksCard";
import ShowAll from "../ShowAll";
import AddWorkModal from "./AddWorkModal";
import ConfirmationModal from "./ConfirmationModal";
import WorkViewModal from "./WorkViewModal";

export default function WorksTap({ works, isMyAccount }) {
  const { t } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAddWorkModal, setShowAddWorkModal] = useState(false);
  const [showWorkViewModal, setShowWorkViewModal] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [targetWork, setTargetWork] = useState(null);
  const queryClient = useQueryClient();
  const lang = useSelector((state) => state.language.lang);
  const onDeleteModalShow = (id) => {
    setShowConfirmation(true);
    setTargetId(id);
  };

  const onEditModalShow = (work) => {
    setShowAddWorkModal(true);
    setTargetWork(work);
  };

  const onViewModalShow = (work) => {
    setShowWorkViewModal(true);
    setTargetWork(work);
  };

  const handleDelete = async () => {
    try {
      await deleteWork(targetId, queryClient);
      toast.success(t("profile.workDeletedSuccessfully"));
    } catch (error) {
      toast.error(t("profile.errorDeletingWork"));
      throw new Error(error.message);
    } finally {
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <div className="services-container">
        <>
          {" "}
          <ShowAll show={true} sectionName={t("profile.myWorks")} />{" "}
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
            {" "}
            {isMyAccount && (
              <SwiperSlide
                style={{
                  height: "auto",
                  width: "auto",
                }}
              >
                <button
                  onClick={() => setShowAddWorkModal(true)}
                  className="add-service"
                >
                  {t("profile.addWork")}
                  <img src={"/images/plus.png"} alt="add service" />
                </button>
              </SwiperSlide>
            )}
            {works?.length === 0 ? (
              <SwiperSlide
                style={{
                  height: "auto",
                  width: "auto",
                }}
              >
                <div className="noDataFound">
                  <h4>{t("profile.noWorksFound")}</h4>
                </div>
              </SwiperSlide>
            ) : (
              <>
                {works?.map((work) => (
                  <SwiperSlide
                    style={{
                      height: "auto",
                      width: "auto",
                    }}
                    key={work.id}
                  >
                    <WorkCard
                      canEdit={isMyAccount}
                      work={work}
                      onEditModalShow={onEditModalShow}
                      onDeleteModalShow={onDeleteModalShow}
                      // onViewModalShow={onViewModalShow}
                    />
                  </SwiperSlide>
                ))}
              </>
            )}
          </Swiper>
          {/* <div className="services_grid">
                {works?.map((work) => (
                  <WorkCard
                    canEdit={isMyAccount}
                    key={work.id}
                    work={work}
                    onEditModalShow={onEditModalShow}
                    onDeleteModalShow={onDeleteModalShow}
                    onViewModalShow={onViewModalShow}
                  />
                ))}
              </div> */}
        </>
      </div>

      <ConfirmationModal
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        type="delete"
        eventFun={handleDelete}
        buttonText={t("profile.delete")}
        text={t("profile.areYouSureYouWantToDelete")}
      />
      <AddWorkModal
        targetWork={targetWork}
        setTargetWork={setTargetWork}
        showModal={showAddWorkModal}
        setShowModal={setShowAddWorkModal}
      />
      {/* <WorkViewModal
        showModal={showWorkViewModal}
        setShowModal={setShowWorkViewModal}
        targetWork={targetWork}
        setTargetWork={setTargetWork}
      /> */}
    </>
  );
}
