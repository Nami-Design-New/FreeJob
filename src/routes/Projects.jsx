import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import ProjectList from "../ui/projects/ProjectList";
import FilterSidebar from "../ui/servicesComponents/FilterSidebar";

export default function Projects() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <section className="container">
      <section className="sercives_container my-5">
        <section className="small_header_filter d-md-none">
          <h6>Projects</h6>
          <CiFilter className=" my-3 fs-3" onClick={toggleMenu} />
        </section>
        <FilterSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <section className="project_list">
          <ProjectList />
        </section>
      </section>
    </section>
  );
}
