import OrderCard from "../cards/OrderCard";

const orderListItems = [
  {
    id: "1",
    title: "Songs and broadcasting application",
    price: "200",
    status: "new",
    imageUrl: "/images/order.png",
    user: {
      image: "/images/user.png",
      name: "Mohamed Ahmed",
    },
  },
  {
    id: "2",
    title: "Songs and broadcasting application",
    price: "200",
    status: "in_progress",
    imageUrl: "/images/order.png",
    user: {
      image: "/images/user.png",
      name: "Mohamed Ahmed",
    },
  },
  {
    id: "3",
    title: "Songs and broadcasting application",
    price: "200",
    status: "canceled",
    imageUrl: "/images/order.png",
    user: {
      image: "/images/user.png",
      name: "Mohamed Ahmed",
    },
  },
  {
    id: "4",
    title: "Songs and broadcasting application",
    price: "200",
    status: "received",
    imageUrl: "/images/order.png",
    user: {
      image: "/images/user.png",
      name: "Mohamed Ahmed",
    },
  },
  {
    id: "5",
    title: "Songs and broadcasting application",
    price: "200",
    status: "ready",
    imageUrl: "/images/order.png",
    user: {
      image: "/images/user.png",
      name: "Mohamed Ahmed",
    },
  },
];

export default function ProjectOrdersList() {
  return (
    <section className="row g-4">
      {orderListItems.map((order) => (
        <section key={order.id}>
          <OrderCard order={order} />
        </section>
      ))}
    </section>
  );
}
