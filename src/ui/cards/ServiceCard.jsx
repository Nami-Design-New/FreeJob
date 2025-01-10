import { FaArrowRight, FaFile, FaUsers } from "react-icons/fa";
import StarsRate from "../StartRate";
import { useSelector } from "react-redux";

export default function ServiceCard({ service }) {
  const lang = useSelector((state) => state.language.lang);
  const {
    imageUrl: serviceImage,
    price,
    name: serviceName,
    category,
    rate,
    user: { imageUrl: userImage, name: username, servicesNo, clients },
  } = service;

  return (
    <section className="service_card">
      <section className="image_container ">
        <img src={serviceImage} />
        <p className={`price  ${lang === "ar" ? "ar" : ""} `}>
          Starts from: {price}
        </p>
      </section>
      <section className="d-flex align-items-center justify-content-between">
        <section>
          <section className="service_info">
            <h3>{serviceName}</h3>
            <p>{category} </p>
          </section>
          <section className="rating">
            <StarsRate rate={rate} />
          </section>
          <section className="service_owner">
            <section className="image_user_container">
              <img src={userImage} />
            </section>
            <section className="service_owner_info">
              <h4>{username}</h4>
              <section className="stats d-flex gap-1 ">
                <section className="gap-1  d-flex align-items-center justify-content-center">
                  <FaFile />
                  <span>{servicesNo}</span>
                  services
                </section>
                <section className="gap-1 d-flex align-items-center justify-content-center">
                  <FaUsers />
                  <span>{clients}</span>
                  Clients
                </section>
              </section>
            </section>
          </section>{" "}
        </section>
        <section>
          <button className="">
            <FaArrowRight />
          </button>
        </section>
      </section>
    </section>
  );
}
