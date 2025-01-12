import React from "react";
import UserAvatar from "./UserAvatar";

export default function ServiceRating({ service }) {
  return (
    <section className="service_rating">
      <div className="row_head" data-aos="fade-up"></div>
      <UserAvatar user={service.user} />
      <p>{service.description}</p>
    </section>
  );
}
