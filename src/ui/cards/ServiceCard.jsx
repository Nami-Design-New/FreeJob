import { FaArrowRight, FaFile, FaUsers } from "react-icons/fa";
import StarsRate from "../StartRate";

export default function ServiceCard({ service }) {
  return (
    <section className="service_card">
      <div className="image_container">
        <img src="https://placehold.co/313" />
        <p className="price">Starts from: 200$</p>
      </div>
      <div className="d-flex align-items-center gap-2">
        <div>
          <div className="service_info">
            <h3>Songs and live broadcast application for PC</h3>
            <p>Programming /Desktop </p>
          </div>
          <div className="rating">
            <StarsRate rate={3} />
          </div>
          <div className="service_owner">
            <div className="image_user_container">
              <img src="https://placehold.co/48" />
            </div>
            <div className="service_owner_info">
              <h4>John Doe</h4>
              <div className="stats d-flex gap-1 ">
                <div className="gap-1  d-flex align-items-center justify-content-center">
                  <FaFile />
                  <span>2</span>
                  services
                </div>
                <div className="gap-1 d-flex align-items-center justify-content-center">
                  <FaUsers />
                  <span>2</span>
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
