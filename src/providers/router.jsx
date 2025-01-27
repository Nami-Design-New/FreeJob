import { createBrowserRouter, Outlet } from "react-router-dom";
import { Suspense } from "react";
import RootLayout from "../Layout/RootLayout";
import Home from "../routes/Home";
import Categories from "../routes/Categories";
import SubCategories from "../routes/SubCategories";
import Sections from "../routes/Sections";
import Services from "../routes/Services";
import ServiceDetails from "../routes/ServiceDetails";
import Projects from "../routes/Projects";
import AddService from "../routes/AddService";
import AddBankAccount from "../routes/AddBankAccount";
import Carts from "../routes/Carts";
import Purchases from "../routes/Purchases";
import EditProfile from "../routes/EditProfile";
import VerifyPhone from "../routes/VerifyPhone";
import VerifyIdentity from "../routes/VerifyIdentity";
import OrderDetails from "../routes/OrderDetails";
import RecievedOrders from "../routes/RecievedOrders";
import Terms from "../routes/Terms";
import Notifications from "../routes/Notifications";
import Freelancers from "../routes/Freelancers";
import ProjectsOrders from "../routes/ProjectsOrders";
import Privacy from "../routes/Privacy";
import AddProject from "../routes/AddProject";
import AboutPreview from "../routes/AboutPreview";
import Complaints from "../routes/Complaints";
import MyCollections from "../routes/MyCollections";
import MyCollection from "../routes/MyCollection";
import BestFreeLancers from "../routes/BestFreeLancers";
import ErrorPage from "../routes/ErrorPage";
import Blogs from "../routes/Blogs";
import MyBids from "../routes/MyBids";
import Balance from "../routes/Balance";
import Chats from "../routes/Chats";
import Profile from "../routes/Profile";
import ProjectDetails from "../routes/ProjectDetails";
import Contact from "../routes/Contact";
import About from "../routes/About";
import DataLoader from "../ui/DataLoader";
import Portfolios from "../routes/Portfolios";
import BlogDetails from "../routes/BlogDetails";
import MyBidDetails from "../routes/MyBidDetails";
import CommunityPosts from "../routes/CommunityPosts";
import ProtectionProvider from "./ProtectionProvider";
import ManageAccounts from "../routes/ManageAccounts";
import ProjectsOrdersDetails from "../routes/ProjectsOrdersDetails";
import CommunitySubjectDetails from "../routes/CommunitySubjectDetails";
import MyServices from "../routes/MyServices";

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
      { path: "/services/:id/:title", element: <ServiceDetails /> },
      { path: "/projects", element: <Projects /> },
      { path: "/projects/:title", element: <ProjectDetails /> },
      { path: "/profile/:id", element: <Profile /> },
      { path: "/community/:name", element: <CommunityPosts /> },
      {
        path: "/community/:name/:title/:id",
        element: <CommunitySubjectDetails />,
      },
      { path: "/freelancers", element: <BestFreeLancers /> },
      { path: "/portfolios", element: <Portfolios /> },
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
            path: "/projects-orders/:title",
            element: <ProjectsOrdersDetails />,
          },
          { path: "/profile", element: <Profile /> },
          { path: "/chat", element: <Chats /> },
          { path: "/edit-profile", element: <EditProfile /> },
          { path: "/verify-phone", element: <VerifyPhone /> },
          { path: "/my-collections", element: <MyCollections /> },
          { path: "/my-collections/:id", element: <MyCollection /> },
          { path: "/bids", element: <MyBids /> },
          { path: "/bids/:id", element: <MyBidDetails /> },
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
