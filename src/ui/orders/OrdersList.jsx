import React from "react";
import OrderCard from "../cards/OrderCard";

const orderListItems = [
  {
    id: "1",
    title: "Songs and broadcasting application",
    price: "200",
    status: "deleiverd",
    imageUrl: "./images/order.png",
    user: {
      image: "./images/user.png",
      name: "Mohamed Ahmed",
    },
  },
  {
    id: "2",
    title: "Songs and broadcasting application",
    price: "200",
    status: "canceled",
    imageUrl: "./images/order.png",
    user: {
      image: "./images/user.png",
      name: "Mohamed Ahmed",
    },
  },
  {
    id: "3",
    title: "Songs and broadcasting application",
    price: "200",
    status: "new",
    imageUrl: "./images/order.png",
    user: {
      image: "./images/user.png",
      name: "Mohamed Ahmed",
    },
  },
];

export default function OrdersList() {
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