import { IoClose } from "react-icons/io5";
import FilterSidebar from "../ui/servicesComponents/FilterSidebar";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useResponsiveState } from "../hooks/useResponsiveHook";
import { CiFilter } from "react-icons/ci";
import ProjectList from "../ui/projects/ProjectList";

export default function Projects() {
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
          <h1>Projects</h1>
          <button onClick={() => setFilterOpen(true)}>
            <CiFilter />
          </button>
        </section>
        <section
          className={`p-2 rounded border sidebar ${filterOpen ? "open" : ""}`}
        >
          <section className="filter_wraper">
            {filterOpen && (
              <button
                className="close-btn"
                onClick={() => setFilterOpen(false)}
              >
                <IoClose />
              </button>
            )}
            <FilterSidebar />
          </section>
        </section>
        <section className="project_list">
          <ProjectList filter={filter} />
        </section>
      </section>
    </section>
  );
}
