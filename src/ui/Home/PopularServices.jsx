import { Link } from "react-router";
import SectionHeader from "../SectionHeader";
import ServiceCard from "../cards/ServiceCard";
import ShowAll from "../ShowAll";
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
  return (
    <section className="popular_services">
      <SectionHeader
        title="Most popular services"
        description="Most viewed and best selling services ever"
      />
      <ShowAll to="/services" sectionName="Services" />

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
