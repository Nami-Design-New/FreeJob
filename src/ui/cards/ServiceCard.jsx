import { FaArrowRight, FaFile, FaUsers } from "react-icons/fa";
import StarsRate from "../StartRate";

export default function ServiceCard({ service }) {
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
      <div className="image_container">
        <img src={serviceImage} />
        <p className="price">Starts from: {price}</p>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <div className="service_info">
            <h3>{serviceName}</h3>
            <p>{category} </p>
          </div>
          <div className="rating">
            <StarsRate rate={rate} />
          </div>
          <div className="service_owner">
            <div className="image_user_container">
              <img src={userImage} />
            </div>
            <div className="service_owner_info">
              <h4>{username}</h4>
              <div className="stats d-flex gap-1 ">
                <div className="gap-1  d-flex align-items-center justify-content-center">
                  <FaFile />
                  <span>{servicesNo}</span>
                  services
                </div>
                <div className="gap-1 d-flex align-items-center justify-content-center">
                  <FaUsers />
                  <span>{clients}</span>
                  Clients
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
        <div>
          <button className="">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
