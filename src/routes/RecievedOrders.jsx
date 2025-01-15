import { useState } from "react";
import ProjectOrdersList from "../ui/orders/ProjectOrdersList";
import SideBarOrdersFilter from "../ui/orders/SideBarOrdersFilter";
import { CiFilter } from "react-icons/ci";

const RecievedOrders = () => {
  const [isOpen, setIsOpen] = useState(false);
  function toggleMenu() {
    setIsOpen(!isOpen);
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
          <ProjectOrdersList />
        </section>
      </section>
    </section>
  );
};

export default RecievedOrders;
