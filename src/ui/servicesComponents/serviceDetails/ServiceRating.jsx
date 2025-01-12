import React from "react";
import UserAvatar from "./UserAvatar";

export default function ServiceRating({ item }) {
  return (
    <section className="service_rating">
      <div className="row_head" data-aos="fade-up"></div>
      <UserAvatar user={item.user} />
      <p>{item.description}</p>
    </section>
  );
}
