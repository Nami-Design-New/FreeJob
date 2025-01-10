import { useLocation } from "react-router";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import ServiseDetailsComponent from "../ui/servicesComponents/serviceDetails/ServiseDetailsComponent";
import ServiseOwner from "../ui/servicesComponents/serviceDetails/ServiseOwner";

export default function ServiceDetails() {
  const { pathname } = useLocation();
  const segments = pathname
    .split("/")
    .filter((segment) => segment === "services");

  return (
    <section className="service_details_page">
      <section className="header_container ">
        <section className="container-md">
          <DetailsHeader links={segments} />
          <p>ServiceName</p>
        </section>
      </section>
      <section className="container">
        <section className="row">
          <section className="col-lg-9">
            <ServiseDetailsComponent />
          </section>
          <section className="col-lg-3">
            <ServiseOwner />
          </section>
        </section>
      </section>
    </section>
  );
}
