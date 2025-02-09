import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CiFilter } from "react-icons/ci";
import InProgressOrdersList from "../ui/orders/InProgressOrdersList";
import SideBarOrdersFilter from "../ui/orders/SideBarOrdersFilter";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import useProjectsOrdersList from "../hooks/projects/useProjectsOrdersList";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import CustomPagination from "../ui/CustomPagination";

const ProjectsOrders = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { isLoading, data: projectsOrdersList } = useProjectsOrdersList();
  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  return (
    <section>
      <section className="header_container ">
        <section className="container-md ">
          <DetailsHeader links={t("navbar.projectsOrders")} />
        </section>
      </section>
      <section className="container my-5">
        <section className="small_header_filter d-md-none">
          <h6>{t("navbar.projectsOrders")}</h6>
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
              <>
                <InProgressOrdersList projectsOrdersList={projectsOrdersList} />{" "}
                {projectsOrdersList && projectsOrdersList?.total > 10 && (
                  <CustomPagination
                    count={projectsOrdersList?.total}
                    pageSize={10}
                  />
                )}
              </>
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
