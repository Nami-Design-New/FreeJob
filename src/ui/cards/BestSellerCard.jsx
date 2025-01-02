import React from "react";
import { FaFile, FaUsers } from "react-icons/fa";

export default function BestSellerCard({ item }) {
  return (
    <section className="best_seller_card">
      <h3>{item?.title || "10 second 3D video designer wanted"}</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error fugiat
        doloremque exercitationem maxime necessitatibus architecto accusamus
        vero ipsam quae perspiciatis corporis, quisquam quia autem, deleniti
        possimus hic eligendi, repellat harum!
      </p>
      <div className="service_owner">
        <div className="image_user_container">
          <img src="https://placehold.co/48" />
        </div>
        <div className="service_owner_info">
          <h4>John Doe</h4>
          <div className="stats d-flex gap-1 ">
            <div className="gap-1  d-flex align-items-center justify-content-center">
              <FaFile />
              <span>3 months and 20 days ago</span>
            </div>
            <div className="gap-1 d-flex align-items-center justify-content-center">
              <FaUsers />
              <span>2</span>
              Offers
            </div>
          </div>
        </div>
      </div>{" "}
    </section>
  );
}