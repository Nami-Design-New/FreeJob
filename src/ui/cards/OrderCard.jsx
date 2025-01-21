import { CiFileOn } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import {
  ORDER_STATUS_AR,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_EN,
  ORDER_STATUS_PERSENTAGE,
} from "../../utils/contants";
import { useTranslation } from "react-i18next";
import { formatTimeDifference, getTimeDifference } from "../../utils/helper";

export default function OrderCard({ order }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lang = useSelector((state) => state.language.lang);
  const { t } = useTranslation();
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
    <section className="position-relative">
      <section className="order_card ">
        <section className="order_img">
          <img
            className="img-fluid"
            src={order?.service?.image}
            alt={order?.service?.title}
          />
        </section>
        <section className="order_info">
          <section className="order_data">
            <h3>{order?.service?.title}</h3>
            <p className={lang === "ar" ? "ar" : ""}>{order?.price}$</p>
          </section>
          <section className="order_user">
            <section className="user_image_container">
              <img src={order.user.image} alt={order.user.name + "'s photo"} />
            </section>
            <section className="order_user_info">
              <p>{order.user.name}</p>
              <p>
                <CiFileOn />
                {formattedTime}
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
              background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),conic-gradient(${
                ORDER_STATUS_COLORS[order?.status]
              } ${ORDER_STATUS_PERSENTAGE[order?.status]}%, white 0) `,
            }}
          ></div>
        </section>
      </section>
      <button
        onClick={() =>
          navigate(`${order.id}?page=${searchParams.get("page") || 1}`)
        }
        className={`${lang === "ar" ? "ar" : ""} order_details_button`}
      >
        {t("details")}
      </button>
    </section>
  );
}
