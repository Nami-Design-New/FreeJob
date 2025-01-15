import { Link } from "react-router";
import SectionHeader from "../SectionHeader";
import ServiceCard from "../cards/ServiceCard";
import ShowAll from "../ShowAll";
import { useTranslation } from "react-i18next";
const popularServices = [
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
export default function PopularServices() {
  const { t } = useTranslation();
  return (
    <section className="popular_services">
      <SectionHeader
        title={t("home.bestServices")}
        description={t("home.bestServicesSubTitle")}
      />
      <ShowAll to="/services" sectionName={t("navbar.services")} />

      <div className="row g-4">
        {popularServices.map((service) => (
          <Link
            to={"/services/" + service.id}
            className=" col-md-6 col-lg-4"
            key={service.id}
          >
            <ServiceCard service={service} />{" "}
          </Link>
        ))}
      </div>
    </section>
  );
}
