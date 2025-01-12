import { useLocation, useNavigate } from "react-router";
import SimilarServices from "../ui/cards/SimilarServices";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import ServiseDetailsComponent from "../ui/servicesComponents/serviceDetails/ServiseDetailsComponent";
import ServiseOwner from "../ui/servicesComponents/serviceDetails/ServiseOwner";
import ServiceRating from "../ui/servicesComponents/serviceDetails/ServiceRating";

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

const servicesRates = [
  {
    id: "1",
    name: "Programming /Desktop",

    description:
      "Guinrank tool has recently proven its superiority as the best SEO tool for writing articles with artificial intelligence. We all know that content is the basis of leadership.",
    user: {
      name: "Mahmod Ahmed",
      date: 3 - 10 - 2024,
      rate: "3",
      imageUrl: "https://placehold.co/58",
    },
  },
  {
    id: "2",
    name: "Programming /Desktop",

    description:
      "Guinrank tool has recently proven its superiority as the best SEO tool for writing articles with artificial intelligence. We all know that content is the basis of leadership.",
    user: {
      name: "Mahmod Ahmed",
      date: 3 - 10 - 2024,
      rate: "3",
      imageUrl: "https://placehold.co/58",
    },
  },
  {
    id: "3",
    name: "Programming /Desktop",

    description:
      "Guinrank tool has recently proven its superiority as the best SEO tool for writing articles with artificial intelligence. We all know that content is the basis of leadership.",
    user: {
      name: "Mahmod Ahmed",
      date: 3 - 10 - 2024,
      rate: "3",
      imageUrl: "https://placehold.co/58",
    },
  },
  {
    id: "4",
    name: "Programming /Desktop",

    description:
      "Guinrank tool has recently proven its superiority as the best SEO tool for writing articles with artificial intelligence. We all know that content is the basis of leadership.",
    user: {
      name: "Mahmod Ahmed",
      date: 3 - 10 - 2024,
      rate: "3",
      imageUrl: "https://placehold.co/58",
    },
  },
];

export default function ServiceDetails() {
  const navigate = useNavigate();
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
            <button
              onClick={() => navigate("/profile")}
              className="go_profile_btn"
            >
              Go to Profile
            </button>
          </section>
          <section className="row g-2  rating_container">
            <h6 className="header_rate">Service Rates</h6>
            {servicesRates.map((service) => (
              <section key={service.id} className="col-md-6 ">
                {<ServiceRating item={service} />}
              </section>
            ))}
          </section>
          <SimilarServices services={services} />
        </section>
      </section>
    </section>
  );
}
