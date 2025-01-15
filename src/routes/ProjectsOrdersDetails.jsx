import OrdersList from "../ui/orders/ProjectOrdersList";
import SideBarOrdersFilter from "../ui/orders/SideBarOrdersFilter";
import { CiFileOn } from "react-icons/ci";
import { useSelector } from "react-redux";
import {
  ORDER_STATUS_AR,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_EN,
  ORDER_STATUS_PERSENTAGE,
} from "../utils/contants";
const order = {
  id: "5",
  title: "Songs and broadcasting application",
  price: "200",
  status: "ready",
  imageUrl: "./images/order.png",
  orderNumber: "123456",
  deliverTime: "30-12-2025",
  created_at: "30-12-2024",
  user: {
    image: "./images/user.png",
    name: "Mohamed Ahmed",
  },
};
const ProjectsOrdersDetails = () => {
  const lang = useSelector((state) => state.language.lang);
  function handleChat() {
    // open chat
  }
  return (
    <section className="container">
      <section className="row my-5  ">
        <section className=" col-lg-8  mx-auto order_details">
          <section className="order_card_details ">
            <section className="order_img">
              <img
                className="img-fluid"
                src={order.imageUrl}
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
                  background: `radial-gradient(closest-side, #F1FFFA 79%, transparent 80% 100%),conic-gradient(${
                    ORDER_STATUS_COLORS[order?.status]
                  } ${ORDER_STATUS_PERSENTAGE[order?.status]}%, white 0) `,
                }}
              ></div>
            </section>
          </section>
          <ul className="order_add_info">
            <li>
              <h5>Order Number:</h5>
              <p>{order.orderNumber}</p>
            </li>
            <li>
              <h5>Order Price:</h5>
              <p>{order.price}</p>
            </li>
            <li>
              <h5>Order Date:</h5>
              <p>{order.created_at}</p>
            </li>
            <li>
              <h5>Expected Deliver Date:</h5>
              <p>{order.deliverTime}</p>
            </li>
          </ul>
          <section className="buttons_container">
            <button onClick={handleChat} className="add ">
              Chat Now
            </button>
          </section>
        </section>
      </section>
    </section>
  );
};

export default ProjectsOrdersDetails;
