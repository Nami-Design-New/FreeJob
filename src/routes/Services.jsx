import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { useSearchParams } from "react-router";
import FilterSidebar from "../ui/servicesComponents/FilterSidebar";
import ServicesList from "../ui/servicesComponents/ServicesList";
import { useTranslation } from "react-i18next";

export default function Services() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  const [searchParams] = useSearchParams();
  let filter = {
    searchQuery: searchParams.get("search") || "",
    selectedSections: searchParams.get("sections")
      ? searchParams.get("sections").split(",")
      : [],
    selectedSkill: searchParams.get("skill") || "",
    priceRange: [
      parseInt(searchParams.get("priceMin")) || 0,
      parseInt(searchParams.get("priceMax")) || 1000,
    ],
    deliveryDuration: [
      parseInt(searchParams.get("deliveryMin")) || 1,
      parseInt(searchParams.get("deliveryMax")) || 360,
    ],
  };

  return (
    <section className="container">
      <section className="sercives_container my-5">
        <section className="small_header_filter d-md-none">
          <h6>{t("routes.services")}</h6>
          <CiFilter className=" my-3 fs-3" onClick={toggleMenu} />
        </section>
        <section>
          <FilterSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </section>

        <ServicesList filter={filter} />
      </section>
    </section>
  );
}
