import { useLocation } from "react-router";
import SimilarServices from "../ui/cards/SimilarServices";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import ServiseDetailsComponent from "../ui/servicesComponents/serviceDetails/ServiseDetailsComponent";
import ServiseOwner from "../ui/servicesComponents/serviceDetails/ServiseOwner";

const services = [
  {
    id: "1",
    price: "200$",
    imageUrl: "https://placehold.co/313",
    name: "Songs and live broadcast application for PC",
    category: "Programming /Desktop",
    rate: "3",
    user: {
      imageUrl: "https://placehold.co/48",
      name: "Ahmed Mohamed",
      servicesNo: "2",
      clients: "2",
    },
  },
  {
    id: "2",
    price: "200$",
    imageUrl: "https://placehold.co/250",
    name: "Songs and live broadcast application for PC",
    category: "Programming /Desktop",
    rate: "3",
    user: {
      imageUrl: "https://placehold.co/48",
      name: "Ahmed Mohamed",
      servicesNo: "2",
      clients: "2",
    },
  },
  {
    id: "3",
    price: "200$",
    imageUrl: "https://placehold.co/250",
    name: "Songs and live broadcast application for PC",
    category: "Programming /Desktop",
    rate: "3",
    user: {
      imageUrl: "https://placehold.co/48",
      name: "Ahmed Mohamed",
      servicesNo: "2",
      clients: "2",
    },
  },
  {
    id: "4",
    price: "200$",
    imageUrl: "https://placehold.co/250",
    name: "Songs and live broadcast application for PC",
    category: "Programming /Desktop",
    rate: "3",
    user: {
      imageUrl: "https://placehold.co/48",
      name: "Ahmed Mohamed",
      servicesNo: "2",
      clients: "2",
    },
  },
];

export default function ServiceDetails() {
  const { pathname } = useLocation();
  const segments = pathname
    .split("/")
    .filter((segment) => segment === "services");

  return (
    <section className="service_details_page">
      <section className="header_container ">
        <section className="container-md ">
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
        <section className="row ">
          <SimilarServices services={services} />
        </section>
      </section>
    </section>
  );
}
