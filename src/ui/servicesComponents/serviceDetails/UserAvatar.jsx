import React from "react";
import StarsRate from "../../StartRate";
import { FaFile } from "react-icons/fa";

export default function UserAvatar({ user }) {
  return (
    <section className="user_rating_avatar">
      <section>
        <img className="user_img img-fluid" src={user.imageUrl} />
      </section>
      <section className="user_info">
        <h6>{user.name}</h6>
        <p>
          <FaFile /> 3 monthes and 20 days ago
        </p>
        <StarsRate rate={user.rate} />
      </section>
    </section>
  );
}
