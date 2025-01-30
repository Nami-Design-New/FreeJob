import { CiFileOn } from "react-icons/ci";
import { useSelector } from "react-redux";
import {
  ORDER_STATUS_AR,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_EN,
  ORDER_STATUS_PERSENTAGE,
} from "../utils/contants";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import useServiceOrdersList from "../hooks/orders/useServiceOrdersList";
import useGetPurchases from "../hooks/orders/useGetPurchases";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  calculateExpectedEndDate,
  formatTimeDifference,
  getTimeDifference,
} from "../utils/helper";
import { updateOrder } from "../services/apiOrders";
import DataLoader from "../ui/DataLoader";
import ErrorPage from "./ErrorPage";
import useGetOrder from "../hooks/orders/useGetOrder";
import SubmitButton from "../ui/form/SubmitButton";
const order = {
  id: "5",
  title: "Songs and broadcasting application",
  price: "200",
  status: "ready",
  imageUrl: "/images/order.png",
  orderNumber: "123456",
  deliverTime: "30-12-2025",
  created_at: "30-12-2024",
  user: {
    image: "/images/user.png",
    name: "Mohamed Ahmed",
  },
};

const OrderDetails = () => {
  const lang = useSelector((state) => state.language.lang);
  const { id } = useParams();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const navigate = useNavigate();
  const { refetch: refetchOrders } = useServiceOrdersList(page);
  const { refetch: refetchPurchases } = useGetPurchases(page);
  const { data: order, isLoading } = useGetOrder(id);

  const [userType, setUserType] = useState(null);
  const [btn1Loading, setBtn1Loading] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.authedUser.user);

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

  useEffect(() => {
    if (user?.id && order?.user?.id) {
      if (user?.id === order?.user?.id) {
        setUserType("seller");
      } else {
        setUserType("buyer");
      }
    }
  }, [user?.id, order?.user?.id]);

  const handleupdateOrder = async (status) => {
    try {
      status === "canceled" ? setBtn1Loading(true) : setLoading(true);
      await updateOrder(order?.id, status, queryClient);
      
      refetchOrders();
      refetchPurchases();
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
      setBtn1Loading(false);
    }
  };

  const handleRequestRoom = () => {
    sessionStorage.setItem("request_type", "service");
    sessionStorage.setItem("request_id", order?.service?.id);
    sessionStorage.setItem(
      "owner_id",
      userType === "seller" ? order?.user?.id : user?.id
    );
    sessionStorage.setItem(
      "applied_id",
      userType === "seller" ? user?.id : order?.user?.id
    );
    navigate(`/chat`);
  };

  if (isLoading) {
    return <DataLoader />;
  }

  if (!isLoading && !order) {
    return <ErrorPage />;
  }
  return (
    <section className="container">
      <section className="row my-5  ">
        <section className=" col-lg-8  mx-auto order_details">
          <section className="order_card_details ">
            <section className="order_img">
              {" "}
              <Link to={`/services/${order?.service?.id}`} className="img">
                <img
                  className="img-fluid"
                  src={order?.service?.image}
                  alt="service"
                />
              </Link>
            </section>
            <section className="order_info">
              {" "}
              <section className="order_data">
                <h3>{order?.service?.title}</h3>
                <p className={lang === "ar" ? "ar" : ""}>{order.price}$</p>
              </section>
              <section className="d-flex  justify-content-center justify-content-md-between flex-wrap gap-3">
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
                      <CiFileOn />3 monthes and 3 days ago
                    </p>
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
            </section>
          </section>{" "}
          <div>
            <h6>{t("projects.projectDetails")}</h6>
            <p>{order.service.description}</p>
          </div>
          <ul className="order_add_info">
            <li>
              <h5>{t("recievedOrders.orderNumber")}</h5>
              <p>#{order?.id}</p>
            </li>
            <li>
              <h5>{t("recievedOrders.orderValue")}</h5>
              <p>{order.price}$</p>
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
            {" "}
            <button onClick={handleRequestRoom} className="chat">
              <i className="fa-regular fa-message-lines"></i>
            </button>{" "}
            <div className="order-buttons">
              {/* buyer */}
              {userType === "buyer" && order?.status === "new" && (
                <SubmitButton
                  loading={loading}
                  className="report-order"
                  name={t("recievedOrders.acceptOrder")}
                  icon={<i className="fa-light fa-circle-check"></i>}
                  onClick={() => handleupdateOrder("in_progress")}
                />
              )}
              {userType === "buyer" && order?.status === "in_progress" && (
                <SubmitButton
                  loading={loading}
                  className="report-order"
                  name={t("recievedOrders.readyForDelevier")}
                  icon={<i className="fa-light fa-circle-check"></i>}
                  onClick={() => handleupdateOrder("ready")}
                />
              )}
              {userType === "buyer" &&
                order?.status !== "canceled" &&
                order?.status !== "received" && (
                  <SubmitButton
                    className="cancle-order"
                    loading={btn1Loading}
                    onClick={() => handleupdateOrder("canceled")}
                    name={t("recievedOrders.cancleOrder")}
                    icon={<i className="fa-sharp fa-light fa-circle-xmark"></i>}
                  />
                )}
              {/* seller */}
              {userType === "seller" && order?.status === "ready" && (
                <SubmitButton
                  loading={loading}
                  className="report-order"
                  name={t("recievedOrders.recieve")}
                  icon={<i className="fa-light fa-circle-check"></i>}
                  onClick={() => handleupdateOrder("received")}
                />
              )}
              {userType === "seller" && order?.status === "new" && (
                <SubmitButton
                  className="cancle-order"
                  loading={btn1Loading}
                  onClick={() => handleupdateOrder("canceled")}
                  name={t("recievedOrders.cancleOrder")}
                  icon={<i className="fa-sharp fa-light fa-circle-xmark"></i>}
                />
              )}
              {userType === "seller" &&
                !order?.service?.is_rated &&
                order?.status === "received" && (
                  <SubmitButton
                    className="report-order"
                    name={t("recievedOrders.RateService")}
                    onClick={() => setShowRateModal(true)}
                  />
                )}{" "}
            </div>
          </section>
        </section>
      </section>
    </section>
  );
};

export default OrderDetails;
