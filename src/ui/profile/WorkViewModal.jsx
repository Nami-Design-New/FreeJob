import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Modal } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router";
import { calculateDate } from "../../utils/helper";
import useSearchWorks from "../../hooks/works/useSearchWorks";
import axiosInstance from "../../utils/axios";

function WorkViewModal({ showModal, setShowModal, targetWork }) {
  const { t } = useTranslation();
  const { refetch } = useSearchWorks();
  const lang = useSelector((state) => state.language.lang);
  const logged = useSelector((state) => state.authedUser.isLogged);
  const [isLike, setIsLike] = useState(targetWork?.liked);

  function truncate(inputString) {
    let truncateStringResult;
    if (inputString?.length > 35) {
      truncateStringResult = inputString.substring(0, 35) + "...";
    } else {
      truncateStringResult = inputString;
    }
    return truncateStringResult;
  }

  useEffect(() => {
    const viewWork = async () => {
      try {
        await axiosInstance.post("/user/increase_view_count", {
          id: targetWork?.id,
        });
        refetch();
      } catch (error) {
        throw new Error(error.message);
      }
    };
    if (targetWork?.id && !targetWork?.viewed) {
      viewWork();
    }
  }, [targetWork?.viewed, refetch, targetWork?.id]);

  const handleAddLike = async () => {
    try {
      const res = await axiosInstance.post("/user/addLike", {
        my_work_id: targetWork?.id,
      });
      if (res.data.code === 200) {
        setIsLike(true);
        refetch();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleRemoveLike = async () => {
    try {
      const res = await axiosInstance.post("/user/deleteLike", {
        my_work_id: targetWork?.id,
      });
      if (res.data.code === 200) {
        setIsLike(false);
        refetch();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      centered
      size="lg"
    >
      <Modal.Header className="border-0" closeButton />
      <Modal.Body className="col-12 p-2">
        <div className="work-view-modal">
          <Swiper
            spaceBetween={4}
            slidesPerView={1}
            speed={1000}
            loop={true}
            modules={[Autoplay]}
            dir={lang === "ar" ? "rtl" : "ltr"}
            className="worksViewModalSwiper"
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            {targetWork?.images &&
              targetWork?.images?.map((image) => (
                <SwiperSlide key={image.id} className="row p-0 m-0">
                  <div className="work-modal-img-box">
                    <img src={image.image} alt="work" />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="work-modal-content">
            <div className="d-flex align-items-center justify-content-between">
              <h3>{targetWork?.title}</h3>
              {logged && !targetWork?.is_my_work && (
                <>
                  {isLike ? (
                    <button
                      className="like-btn liked liked"
                      onClick={handleRemoveLike}
                    >
                      <i className="fa-sharp fa-solid fa-heart"></i>{" "}
                      {t("likeIt")}
                    </button>
                  ) : (
                    <button
                      className="like-btn can-like"
                      onClick={handleAddLike}
                    >
                      <i className="fa-sharp fa-solid fa-heart"></i>{" "}
                      {t("notLikeIt")}
                    </button>
                  )}
                </>
              )}
            </div>
            <h5>{targetWork?.description}</h5>
            <div className="modal-info-item">
              <i className="fa-solid fa-clipboard"></i>
              <Link
                target="_blank"
                to={targetWork?.link}
                className="m-0 item-value"
              >
                {truncate(targetWork?.link)}
              </Link>
            </div>
            <div className="modal-info-items">
              <div className="modal-info-item">
                <i className="fa-solid fa-calendar-days"></i>
                <p className="m-0 item-value">
                  {calculateDate(targetWork?.start_date)}
                </p>
              </div>
              <div className="modal-info-item">
                <i className="fa-solid fa-calendar-days"></i>
                <p className="m-0 item-value">
                  {calculateDate(targetWork?.end_date)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default WorkViewModal;
