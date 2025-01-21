import { CiFileOn } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router";
import {
  ORDER_STATUS_AR,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_EN,
  ORDER_STATUS_PERSENTAGE,
} from "../../utils/contants";
import { TbArrowGuide } from "react-icons/tb";
import StarsRate from "../StartRate";
import {
  calculateDate,
  formatTimeDifference,
  getTimeDifference,
} from "../../utils/helper";
import { useTranslation } from "react-i18next";
export default function InProgressCard({ order }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const timeDifference = getTimeDifference(order.created_at);
  const formattedTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );
  return (
    <section className="">
      <section className="order_card">
        <section className="order_info">
          <section className="order_data_container">
            <section className="order_data">
              <h3>{order.title}</h3>
              <p className={lang === "ar" ? "ar" : ""}>{order.price}$</p>
            </section>
            <p className="time">
              <CiFileOn />
              {formattedTime}
            </p>
          </section>

          <section className="order_user">
            {" "}
            <Link to={`/profile/${order?.user?.id}`}>
              <section className="user">
                {" "}
                <section className="user_image_container">
                  <img
                    src={order?.user?.image}
                    alt={order?.user?.name + "'s photo"}
                  />
                </section>
                <section className="order_user_info">
                  <p>{order.user.name}</p> <StarsRate rate={3} />
                  <p>
                    {" "}
                    {t("projects.signUpDate")} :{" "}
                    {calculateDate(order.user.created_at)}
                  </p>
                </section>
              </section>
            </Link>
            <TbArrowGuide className="tb_arrow" />
            <Link to={`/profile/${order?.accepted_request?.user?.id}`}>
              <section className="user">
                <section className="user_image_container">
                  <img
                    src={order.user.image}
                    alt={order.user.name + "'s photo"}
                  />
                </section>
                <section className="order_user_info">
                  <p>{order.accepted_request.user.name}</p>
                  <StarsRate rate={order.accepted_request.user.rate} />
                  <p>
                    {t("projects.signUpDate")} :{" "}
                    {calculateDate(order.accepted_request.user.created_at)}
                  </p>
                </section>
              </section>
            </Link>
          </section>
        </section>
        <section className="order_details_status ">
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
                background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),conic-gradient(${
                  ORDER_STATUS_COLORS[order?.status]
                } ${ORDER_STATUS_PERSENTAGE[order?.status]}%, white 0) `,
              }}
            ></div>{" "}
          </section>
          <button
            onClick={() => navigate(`${order.title}?page=${page || 1}`)}
            className={`${lang === "ar" ? "ar" : ""} orders_details_button `}
          >
            {t("details")}
          </button>
        </section>
      </section>
    </section>
  );
}
