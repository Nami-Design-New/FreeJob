import ProjectOrdersList from "../ui/orders/ProjectOrdersList";
import SideBarOrdersFilter from "../ui/orders/SideBarOrdersFilter";

const RecievedOrders = () => {
  return (
    <section className="container my-5">
      <section className="row">
        <section className="col-12 col-md-3">
          <SideBarOrdersFilter />
        </section>
        <section className="col-12 col-md-9">
          <ProjectOrdersList />
        </section>
      </section>
    </section>
  );
};

export default RecievedOrders;
