import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
