import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CiFilter } from "react-icons/ci";
import FilterSidebar from "../ui/servicesComponents/FilterSidebar";
import ServicesList from "../ui/servicesComponents/ServicesList";

export default function Services() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <section className="container">
      <section className="sercives_container my-5">
        <section className="small_header_filter d-md-none">
          <h6>{t("routes.services")}</h6>
          <CiFilter className=" my-3 fs-3" onClick={toggleMenu} />
        </section>
        <section>
          <FilterSidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            type="services"
          />
        </section>
        <ServicesList />
      </section>
    </section>
  );
}
