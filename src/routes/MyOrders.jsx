import { useNavigate } from "react-router";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import SideBarOrdersFilter from "../ui/orders/SideBarOrdersFilter";
import OrdersList from "../ui/orders/OrdersList";

export default function MyOrders() {
  return (
    <section>
      <section className="project_header_container ">
        <section className="container-md ">
          <DetailsHeader links={"In Progress"} />
        </section>
      </section>
      <section className="container my-5">
        <section className="row">
          <section className=" col-md-3">
            <SideBarOrdersFilter />
          </section>
          <section className=" col-md-9">
            <OrdersList />
          </section>
        </section>
      </section>
    </section>
  );
}
