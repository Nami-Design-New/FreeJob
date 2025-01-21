import { useState } from "react";
import InProgressOrdersList from "../ui/orders/InProgressOrdersList";
import SideBarOrdersFilter from "../ui/orders/SideBarOrdersFilter";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { CiFilter } from "react-icons/ci";
import useProjectsOrdersList from "../hooks/projects/useProjectsOrdersList";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";

const ProjectsOrders = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, data: projectsOrdersList } = useProjectsOrdersList();
  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  return (
    <section>
      <section className="project_header_container ">
        <section className="container-md ">
          <DetailsHeader links={"In Progress"} />
        </section>
      </section>
      <section className="container my-5">
        <section className="small_header_filter d-md-none">
          <h6>Inprogress</h6>
          <CiFilter className=" my-3 fs-3" onClick={toggleMenu} />
        </section>
        <section className="row">
          <section className=" col-lg-3">
            <SideBarOrdersFilter isOpen={isOpen} setIsOpen={setIsOpen} />
          </section>
          <section className=" col-lg-9">
            {isLoading ? (
              <DataLoader />
            ) : projectsOrdersList.data.length > 0 ? (
              <InProgressOrdersList projectsOrdersList={projectsOrdersList} />
            ) : (
              <EmptyData>
                <p>You have no in-progress orders at the moment.</p>
              </EmptyData>
            )}
          </section>
        </section>
      </section>
    </section>
  );
};

export default ProjectsOrders;
