import React from "react";
import { Link } from "react-router-dom";
import ServiceCard from "../ui/cards/ServiceCard";

export default function MyServices({ isMyAccount }) {
  return (
    <></>
    // <div className="services_grid">
    //   {isMyAccount && (
    //     <Link to="/add-service" className="add-service">
    //       {t("profile.addService")}
    //       <img src={"/images/plus.png"} alt="add service" />
    //     </Link>
    //   )}
    //   {services?.map((service) => (
    //     <ServiceCard
    //       key={service.id}
    //       canEdit={isMyAccount}
    //       service={service}
    //       handleDelete={handleDelete}
    //       showPending={true}
    //     />
    //   ))}
    // </div>
  );
}
