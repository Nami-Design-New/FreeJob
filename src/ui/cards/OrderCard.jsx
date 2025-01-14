import { CiFileOn } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  ORDER_STATUS_AR,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_EN,
  ORDER_STATUS_PERSENTAGE,
} from "../../utils/contants";

export default function OrderCard({ order }) {
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language.lang);
  console.log(order);

  return (
    <section className="position-relative">
      <section className="order_card ">
        <section className="order_img">
          <img className="img-fluid" src={order.imageUrl} alt={order.name} />
        </section>
        <section className="order_info">
          <section className="order_data">
            <h3>{order.title}</h3>
            <p className={lang === "ar" ? "ar" : ""}>{order.price}$</p>
          </section>
          <section className="order_user">
            <section className="user_image_container">
              <img src={order.user.image} alt={order.user.name + "'s photo"} />
            </section>
            <section className="order_user_info">
              <p>{order.user.name}</p>
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
        onClick={() => navigate(order.id)}
        className={`${lang === "ar" ? "ar" : ""} order_details_button`}
      >
        Order Details
      </button>
    </section>
  );
}
