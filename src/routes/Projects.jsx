import { IoClose } from "react-icons/io5";
import FilterSidebar from "../ui/servicesComponents/FilterSidebar";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useResponsiveState } from "../hooks/useResponsiveHook";
import { CiFilter } from "react-icons/ci";
import ProjectList from "../ui/projects/ProjectList";

export default function Projects() {
  const [isOpen, setIsOpen] = useState(false);
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
        {" "}
        <section className="small_header_filter d-md-none">
          <h6>Services</h6>
          <CiFilter className=" my-3 fs-3" onClick={toggleMenu} />
        </section>
        <FilterSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <section className="project_list">
          <ProjectList filter={filter} />
        </section>
      </section>
    </section>
  );
}
