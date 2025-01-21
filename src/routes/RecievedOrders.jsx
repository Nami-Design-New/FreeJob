import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import ProjectOrdersList from "../ui/orders/ProjectOrdersList";
import SideBarOrdersFilter from "../ui/orders/SideBarOrdersFilter";
import useServiceOrdersList from "./../hooks/orders/useServiceOrdersList";
import DataLoader from "./../ui/DataLoader";

const RecievedOrders = () => {
  const { isLoading, data: serviceOrders } = useServiceOrdersList();
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen((open) => !open);
  }
  return (
    <section className="container my-5">
      <section className="row">
        <section className="small_header_filter d-md-none">
          <h6>Received Requests</h6>
          <CiFilter className=" my-3 fs-3" onClick={toggleMenu} />
        </section>
        <section className="col-12 col-md-3">
          <SideBarOrdersFilter isOpen={isOpen} setIsOpen={setIsOpen} />
        </section>
        <section className="col-12 col-md-9">
          {isLoading ? (
            <DataLoader />
          ) : (
            <ProjectOrdersList serviceOrders={serviceOrders} />
          )}
        </section>
      </section>
    </section>
  );
};

export default RecievedOrders;
