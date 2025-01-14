import { Outlet } from "react-router";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import MyOrders from "../routes/MyOrders";

export default function RootLayout() {
  return (
    <>
      <Header />
      <MyOrders />
      <Footer />
    </>
  );
}
