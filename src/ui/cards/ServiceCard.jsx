import { FaArrowLeft, FaArrowRight, FaFile, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import StarsRate from "../StartRate";

export default function ServiceCard({ service }) {
  const lang = useSelector((state) => state.language.lang);
  const navigate = useNavigate();
  return (
    <section className="service_card">
      <section className="image_container ">
        <img src={service.image} />
        <p className={`price  ${lang === "ar" ? "ar" : ""} `}>
          Starts from: {service.price}$
        </p>
      </section>
      <section className="d-flex align-items-center justify-content-between">
        <section>
          <section className="service_info">
            <h3>{service.title}</h3>
            <p>{service.category.name} </p>
          </section>
          <section className="rating">
            <StarsRate rate={service.rate} /> ({service.rate})
          </section>
          <section className="service_owner">
            {/* <section className="image_user_container">
              <img src={userImage} />
            </section> */}
            <section className="service_owner_info">
              {/* <h4>{username}</h4> */}
              <section className="stats d-flex gap-1 ">
                <section className="gap-1  d-flex align-items-center justify-content-center">
                  <FaFile />
                  <span>{service.orders_coun}</span>
                  services
                </section>
                <section className="gap-1 d-flex align-items-center justify-content-center">
                  <FaUsers />
                  <span>{0}</span>
                  Clients
                </section>
              </section>
            </section>
          </section>{" "}
        </section>
        <section>
          <button
            onClick={() => navigate(`/services/${service.id}/${service.title}`)}
            className=""
          >
            {lang === "ar" ? <FaArrowLeft /> : <FaArrowRight />}
          </button>
        </section>
      </section>
    </section>
  );
}
