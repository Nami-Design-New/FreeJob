import { CiFileOn } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  ORDER_STATUS_AR,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_EN,
  ORDER_STATUS_PERSENTAGE,
} from "../../utils/contants";

export default function PurchaseCard({ purchase }) {
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language.lang);
  console.log(purchase);

  return (
    <section className="position-relative">
      <section className="order_card ">
        <section className="order_img">
          <img
            className="img-fluid"
            src={purchase.service.image}
            alt={purchase.service.title}
          />
        </section>
        <section className="order_info">
          <section className="order_data">
            <h3>{purchase.service.title}</h3>
            <p className={lang === "ar" ? "ar" : ""}>{purchase.price}$</p>
          </section>
          <section className="order_user">
            <section className="user_image_container">
              <img
                src={purchase.service.user.image}
                alt={purchase.service.user.name + "'s photo"}
              />
            </section>
            <section className="order_user_info">
              <p>{purchase.service.user.name}</p>
              <p>
                <CiFileOn />3 monthes and 3 days ago
              </p>
            </section>
          </section>
        </section>
        <section className="order_status">
          <p>
            {" "}
            {lang === "ar"
              ? ORDER_STATUS_AR[purchase?.status]
              : ORDER_STATUS_EN[purchase?.status]}
          </p>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow={ORDER_STATUS_PERSENTAGE[purchase?.status]}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{
              background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),conic-gradient(${
                ORDER_STATUS_COLORS[purchase?.status]
              } ${ORDER_STATUS_PERSENTAGE[purchase?.status]}%, white 0) `,
            }}
          ></div>
        </section>
      </section>
      <button
        onClick={() => navigate(purchase.id)}
        className={`${lang === "ar" ? "ar" : ""} order_details_button`}
      >
        Order Details
      </button>
    </section>
  );
}
