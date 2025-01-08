import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { useSearchParams } from "react-router";
import FilterSidebar from "../ui/servicesComponents/FilterSidebar";
import ServicesList from "../ui/servicesComponents/ServicesList";
import { IoClose } from "react-icons/io5";
import { useResponsiveState } from "../hooks/useResponsiveHook";

export default function Services() {
  const [filterOpen, setFilterOpen] = useState(true);
  const [searchParams] = useSearchParams();
  const isMobile = useResponsiveState("(max-width: 768px)");

  useEffect(
    function () {
      if (!isMobile) {
        setFilterOpen(false);
      }
    },
    [isMobile, setFilterOpen]
  );
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
        <section className="services_header_mobile ">
          <h1>Services</h1>
          <button onClick={() => setFilterOpen(true)}>
            <CiFilter />
          </button>
        </section>
        <section
          className={`p-2 rounded border sidebar ${filterOpen ? "open" : ""}`}
        >
          <div className="filter_wraper">
            {filterOpen && (
              <button
                className="close-btn"
                onClick={() => setFilterOpen(false)}
              >
                <IoClose />
              </button>
            )}
            <FilterSidebar />
          </div>
        </section>

        <section className="services_list">
          <ServicesList filter={filter} />
        </section>
      </section>
    </section>
  );
}
