import ServiceCard from "../cards/ServiceCard";

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
export default function ServicesList({ filter }) {
  return (
    <>
      {services.map((service) => (
        <section key={service.id} className="service_card_filter">
          <ServiceCard service={service} />
        </section>
      ))}
    </>
  );
}
