import { Outlet } from "react-router";
import Footer from "../ui/Footer";
import Header from "../ui/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
