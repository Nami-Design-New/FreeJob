import { CiFileOn } from "react-icons/ci";
import { useSelector } from "react-redux";

import useGetProject from "../hooks/projects/useGetProject";
import {
  ORDER_STATUS_AR,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_EN,
  ORDER_STATUS_PERSENTAGE,
} from "../utils/contants";
import DataLoader from "../ui/DataLoader";
import {
  calculateDate,
  calculateExpectedEndDate,
  formatTimeDifference,
  getTimeDifference,
} from "../utils/helper";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../ui/form/SubmitButton";
import { useState } from "react";
import { updateProject } from "../services/apiProjects";
import { useQueryClient } from "@tanstack/react-query";

export default function ProjectsOrdersDetails() {
  const lang = useSelector((state) => state.language.lang);
  const user = useSelector((state) => state.authedUser.user);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: order, isLoading } = useGetProject();
  const timeDifference = getTimeDifference(order?.created_at);
  const startTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  let expectedEndDate = calculateExpectedEndDate(
    order?.created_at,
    order?.days
  );

  const handleCreateRoom = () => {
    sessionStorage.setItem("request_type", "project");
    sessionStorage.setItem("request_id", order?.id);
    sessionStorage.setItem("owner_id", user?.id);
    sessionStorage.setItem("applied_id", order?.user?.id);
    navigate(`/chat`);
  };
  const [btn1Loading, setBtn1Loading] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const quryClient = useQueryClient();
  const lang = useSelector((state) => state.language.lang);
  const handleupdateProject = async (status) => {
    try {
      status === "canceled" ? setBtn1Loading(true) : setLoading(true);
      await updateProject(project?.id, status, quryClient);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
      setBtn1Loading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <DataLoader />
      ) : (
        <section className="container">
          <section className="row my-5  ">
            <section className=" col-lg-8  mx-auto order_details">
              <section className="order_card_details ">
                <section className="order_img">
                  <img
                    className="img-fluid"
                    src={order.image}
                    alt={order.name}
                  />
                </section>
                <section className="order_info">
                  <section className="order_data">
                    <h3>{order.title}</h3>
                    <p className={lang === "ar" ? "ar" : ""}>{order.price}$</p>
                  </section>
                  <section className="order_user">
                    <section className="user_image_container">
                      <img
                        src={order.user.image}
                        alt={order.user.name + "'s photo"}
                      />
                    </section>
                    <section className="order_user_info">
                      <p>{order.user.name}</p>
                      <p>
                        <CiFileOn />
                        {calculateDate(order.user.created_at)}
                      </p>
                    </section>
                  </section>
                </section>
                <section className="order_status">
                  <p>
                    {" "}
                    {lang === "ar"
                      ? ORDER_STATUS_AR[order?.status]
                      : ORDER_STATUS_EN[order?.status]}
                  </p>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow={ORDER_STATUS_PERSENTAGE[order?.status]}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{
                      background: `radial-gradient(closest-side, #F1FFFA 79%, transparent 80% 100%),conic-gradient(${
                        ORDER_STATUS_COLORS[order?.status]
                      } ${ORDER_STATUS_PERSENTAGE[order?.status]}%, white 0) `,
                    }}
                  ></div>
                </section>
              </section>
              <ul className="order_add_info">
                <li>
                  <h5>{t("recievedOrders.orderNumber")}</h5>
                  <p>#{order?.id}</p>
                </li>
                <li>
                  <h5>{t("recievedOrders.orderValue")}:</h5>
                  <p>{order.price}</p>
                </li>
                <li>
                  <h5>{t("recievedOrders.orderDate")}</h5>
                  <p>{startTime}</p>
                </li>
                <li>
                  <h5>{t("recievedOrders.expectedDeliveryDate")}</h5>
                  <p>{expectedEndDate}</p>
                </li>
              </ul>
              <section className="buttons_container">
                <button onClick={handleCreateRoom} className="add ">
                  Chat Now
                </button>
                <div className="col-lg-9 order-buttons">
                  {user?.id !== order?.user_id &&
                    order?.status === "in_progress" && (
                      <SubmitButton
                        loading={loading}
                        className="report-order"
                        name={t("recievedOrders.readyForDelevier")}
                        icon={<i className="fa-light fa-circle-check"></i>}
                        onClick={() => handleupdateProject("ready")}
                      />
                    )}
                  {user?.id === order?.user_id && order?.status === "ready" && (
                    <SubmitButton
                      loading={loading}
                      className="report-order"
                      name={t("recievedOrders.recieve")}
                      icon={<i className="fa-light fa-circle-check"></i>}
                      onClick={() => handleupdateProject("received")}
                    />
                  )}
                </div>
              </section>
            </section>
          </section>
        </section>
      )}{" "}
      <AddRateModal
        order={project}
        showModal={showRateModal}
        setShowModal={setShowRateModal}
      />
    </>
  );
}
