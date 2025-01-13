import OrdersList from "../ui/orders/OrdersList";
import SideBarOrdersFilter from "../ui/orders/SideBarOrdersFilter";

const ProjectsOrders = () => {
  return (
    <section className="container my-5">
      <section className="row">
        <section className="col-12 col-md-3">
          <SideBarOrdersFilter />
        </section>
        <section className="col-12 col-md-9">
          <OrdersList />
        </section>
      </section>
    </section>
  );
};

export default ProjectsOrders;
