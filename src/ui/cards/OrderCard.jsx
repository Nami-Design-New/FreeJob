import { CiFileOn } from "react-icons/ci";
import { useNavigate } from "react-router";

export default function OrderCard({ order }) {
  const navigate = useNavigate();
  return (
    <section className="position-relative">
      <section className="order_card ">
        <section className="order_img">
          <img className="img-fluid" src={order.imageUrl} alt={order.name} />
        </section>
        <section className="order_info">
          <section className="order_data">
            <h3>{order.title}</h3>
            <p>{order.price}$</p>
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
          <p>{order.status}</p>
        </section>
      </section>
      <button
        onClick={() => navigate(order.id)}
        className="order_details_button"
      >
        Order Details
      </button>
    </section>
  );
}
