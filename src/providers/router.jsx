import { Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import About from "../routes/About";
import AboutPreview from "../routes/AboutPreview";
import AddBankAccount from "../routes/AddBankAccount";
import AddProject from "../routes/AddProject";
import AddService from "../routes/AddService";
import Balance from "../routes/Balance";
import BestFreeLancers from "../routes/BestFreeLancers";
import BlogDetails from "../routes/BlogDetails";
import Blogs from "../routes/Blogs";
import Carts from "../routes/Carts";
import Categories from "../routes/Categories";
import Chats from "../routes/Chats";
import CommunityPosts from "../routes/CommunityPosts";
import CommunitySubjectDetails from "../routes/CommunitySubjectDetails";
import Complaints from "../routes/Complaints";
import Contact from "../routes/Contact";
import EditProfile from "../routes/EditProfile";
import ErrorPage from "../routes/ErrorPage";
import Freelancers from "../routes/Freelancers";
import Home from "../routes/Home";
import ManageAccounts from "../routes/ManageAccounts";
import MyBids from "../routes/MyBids";
import MyCollection from "../routes/MyCollection";
import MyCollections from "../routes/MyCollections";
import MyServices from "../routes/MyServices";
import Notifications from "../routes/Notifications";
import OrderDetails from "../routes/OrderDetails";
import PortfolioDetails from "../routes/PortfolioDetails";
import Portfolios from "../routes/Portfolios";
import Privacy from "../routes/Privacy";
import Profile from "../routes/Profile";
import ProjectDetails from "../routes/ProjectDetails";
import Projects from "../routes/Projects";
import ProjectsOrders from "../routes/ProjectsOrders";
import ProjectsOrdersDetails from "../routes/ProjectsOrdersDetails";
import Purchases from "../routes/Purchases";
import RecievedOrders from "../routes/RecievedOrders";
import Sections from "../routes/Sections";
import ServiceDetails from "../routes/ServiceDetails";
import Services from "../routes/Services";
import SubCategories from "../routes/SubCategories";
import Terms from "../routes/Terms";
import VerifyIdentity from "../routes/VerifyIdentity";
import VerifyPhone from "../routes/VerifyPhone";
import DataLoader from "../ui/DataLoader";
import ProtectionProvider from "./ProtectionProvider";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home />, index: true },
      { path: "/categories", element: <Categories /> },
      { path: "/categories/:id", element: <SubCategories /> },
      { path: "/sections", element: <Sections /> },
      { path: "/services", element: <Services /> },
      { path: "/services/:id", element: <ServiceDetails /> },
      { path: "/projects", element: <Projects /> },
      { path: "/projects/:id", element: <ProjectDetails /> },
      { path: "/profile/:id", element: <Profile /> },
      { path: "/community/:name", element: <CommunityPosts /> },
      {
        path: "/community/:name/:title/:id",
        element: <CommunitySubjectDetails />,
      },
      { path: "/freelancers", element: <BestFreeLancers /> },
      { path: "/portfolios", element: <Portfolios /> },
      { path: "/portfolios/:title", element: <PortfolioDetails /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about/:id", element: <About /> },
      { path: "/about/preview/:id", element: <AboutPreview /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/blogs/:id", element: <BlogDetails /> },
      { path: "/privacy-policy", element: <Privacy /> },
      { path: "/terms-conditions", element: <Terms /> },

      {
        path: "",
        element: (
          <ProtectionProvider>
            <Suspense fallback={<DataLoader />}>
              <Outlet />
            </Suspense>
          </ProtectionProvider>
        ),
        children: [
          { path: "/add-service", element: <AddService /> },
          { path: "/edit-service/:title", element: <AddService /> },
          { path: "/cart", element: <Carts /> },
          { path: "/purchases", element: <Purchases /> },
          { path: "/purchases/:id", element: <OrderDetails /> },
          { path: "/recieved-orders", element: <RecievedOrders /> },
          { path: "/recieved-orders/:id", element: <OrderDetails /> },
          { path: "/add-project", element: <AddProject /> },
          { path: "/edit-project/:title", element: <AddProject /> },
          { path: "/projects-orders", element: <ProjectsOrders /> },
          {
            path: "/projects-orders/:id",
            element: <ProjectsOrdersDetails />,
          },
          { path: "/profile", element: <Profile /> },
          { path: "/chat", element: <Chats /> },
          { path: "/edit-profile", element: <EditProfile /> },
          { path: "/verify-phone", element: <VerifyPhone /> },
          { path: "/my-collections", element: <MyCollections /> },
          { path: "/my-collections/:id", element: <MyCollection /> },
          { path: "/bids", element: <MyBids /> },
          // { path: "/bids/:id", element: <MyBidDetails /> },
          { path: "/verify-identity", element: <VerifyIdentity /> },
          { path: "/notifications", element: <Notifications /> },
          { path: "/freelancers", element: <Freelancers /> },
          { path: "/balance", element: <Balance /> },
          { path: "/manage-accounts", element: <ManageAccounts /> },
          { path: "/edit-bank-account/:id", element: <AddBankAccount /> },
          { path: "/add-bank-account/", element: <AddBankAccount /> },
          { path: "/complaints-suggestions", element: <Complaints /> },
          { path: "/my-services", element: <MyServices /> },
        ],
      },
    ],
  },
]);
