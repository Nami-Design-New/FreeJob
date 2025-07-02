import { FaArrowLeft, FaArrowRight, FaFile, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import StarsRate from "../StartRate";
import { useTranslation } from "react-i18next";

export default function ServiceCard({ service, canEdit, handleDelete }) {
  const lang = useSelector((state) => state.language.lang);
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Link to={`/services/${service.id}`} className="w-100">
      <section className="service_card">
        <section className="image_container ">
          <img src={service.image} />
          <p className={`price  ${lang === "ar" ? "ar" : ""} `}>
            {t("services.startFrom")} {service.price}$
          </p>
        </section>
        <section className="d-flex align-items-center justify-content-between">
          <section>
            <section className="service_info">
              <h3>{service.title}</h3>
              <p>{service?.category?.name} </p>
            </section>
            <section className="rating">
              <StarsRate rate={service.rate} /> ({service.rate})
            </section>
            <section className="service_owner">
              <section className="service_owner_info">
                <section className="stats d-flex gap-1 ">
                  <section className="gap-1 d-flex align-items-center justify-content-center">
                    <FaFile />
                    <span>{service.orders_count}</span>
                    {t("navbar.services")}
                  </section>
                  <section className="gap-1  d-flex align-items-center justify-content-center">
                    <FaUsers />
                    <span>{0}</span>
                    {t("clients")}
                  </section>
                </section>
              </section>
            </section>{" "}
          </section>
          <section className="service_settings">
            <button
              onClick={() =>
                navigate(`/services/${service.id}/${service.title}`)
              }
              className=""
            >
              {lang === "ar" ? <FaArrowLeft /> : <FaArrowRight />}
            </button>
            {canEdit && (
              <div className="editService">
                <Link to={`/edit-service/${service?.title}`}>
                  <i className="fa-regular fa-file-pen"></i>
                </Link>
                <Link onClick={() => handleDelete(service?.id)}>
                  <i className="fa-regular fa-trash-can"></i>
                </Link>
              </div>
            )}
          </section>
        </section>
      </section>
    </Link>
  );
}
