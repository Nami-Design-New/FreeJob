import { createBrowserRouter, Outlet } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../routes/Home";
import AddBankAccount from "../routes/AddBankAccount";
import AddService from "../routes/AddService";
import Carts from "../routes/Carts";
import Sections from "../routes/Sections";
import ProtectedRoute from "../ui/ProtectedRoute";
import ProjectDetails from "../routes/ProjectDetails";
import Purchases from "../routes/Purchases";
import Categories from "../routes/Categories";
import EditProfile from "../routes/EditProfile";
import VerifyPhone from "../routes/VerifyPhone";
import ForgetPassword from "../routes/ForgetPassword";
import VerifyIdentity from "../routes/VerifyIdentity";
import OrderDetails from "../routes/OrderDetails";
import RecievedOrders from "../routes/RecievedOrders";
import Terms from "../routes/Terms";
import Notifications from "../routes/Notifications";
import Freelancers from "../routes/Freelancers";
import Projects from "../routes/Projects";
import ServiceDetails from "../routes/ServiceDetails";
import Services from "../routes/Services";
import ProjectsOrders from "../routes/ProjectsOrders";
import ProjectsOrdersDetails from "../routes/ProjectsOrdersDetails";
import Privacy from "../routes/Privacy";
import AddProject from "../routes/AddProject";
import AboutPreview from "../routes/AboutPreview";
import SubCategories from "../routes/SubCategories";
import Complaints from "../routes/Complaints";
import MyCollections from "../routes/MyCollections";
import MyCollection from "../routes/MyCollection";
import BestFreeLancers from "../routes/BestFreeLancers";
import ErrorPage from "../routes/ErrorPage";
import Blogs from "../routes/Blogs";
import BlogDetails from "../routes/BlogDetails";
import Portfolios from "../routes/Portfolios";
import CommunityPosts from "../routes/CommunityPosts";
import CommunitySubjectDetails from "../routes/CommunitySubjectDetails";
import MyBids from "../routes/MyBids";
import Balance from "../routes/Balance";
import ManageAccounts from "../routes/ManageAccounts";
import MyBidDetails from "../routes/MyBidDetails";
import Profile from "../routes/Profile";
import Chats from "../routes/Chats";
import Contact from "../routes/Contact";
import About from "../routes/About";
import { Suspense } from "react";
import DataLoader from "../ui/DataLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // main routes
      { path: "/", element: <Home />, index: true },
      { path: "*", element: <ErrorPage /> },

      // auth routes
      { path: "/forget-password", element: <ForgetPassword /> },

      // category routes
      { path: "/categories", element: <Categories /> },
      { path: "/categories/:id", element: <SubCategories /> },

      // sections routes
      { path: "/sections", element: <Sections /> },
      // { path: "/sections/:id", element: <SubCategories /> },

      // Protected Routes
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<DataLoader />}>
              <Outlet />
            </Suspense>
          </ProtectedRoute>
        ),
        children: [
          // service routes
          { path: "/add-service", element: <AddService /> },
          { path: "/edit-service/:id", element: <AddService /> },
          { path: "/cart", element: <Carts /> },
          { path: "/purchases", element: <Purchases /> },
          { path: "/purchases/:id", element: <OrderDetails /> },
          { path: "/recieved-orders", element: <RecievedOrders /> },
          { path: "/recieved-orders/:id", element: <OrderDetails /> },

          // project routes
          { path: "/add-project", element: <AddProject /> },
          { path: "/edit-project/:id", element: <AddProject /> },
          { path: "/projects-orders", element: <ProjectsOrders /> },
          { path: "/projects-orders/:id", element: <ProjectsOrdersDetails /> },

          // profile routes
          { path: "/profile", element: <Profile /> },
          { path: "/edit-profile", element: <EditProfile /> },
          { path: "/verify-phone", element: <VerifyPhone /> },
          { path: "/my-collections", element: <MyCollections /> },
          { path: "/my-collections/:id", element: <MyCollection /> },
          { path: "/chat", element: <Chats /> },
          { path: "/bids", element: <MyBids /> },
          { path: "/bids/:id", element: <MyBidDetails /> },
          { path: "/verify-identity", element: <VerifyIdentity /> },
          { path: "/notifications", element: <Notifications /> },
          { path: "/freelancers", element: <Freelancers /> },
          { path: "/balance", element: <Balance /> },
          { path: "/manage-accounts", element: <ManageAccounts /> },
          { path: "/add-bank-account", element: <AddBankAccount /> },

          // support routes
          { path: "/complaints-suggestions", element: <Complaints /> },
        ],
      },

      // service routes
      { path: "/services", element: <Services /> },
      { path: "/services/:id/:title", element: <ServiceDetails /> },

      // project routes
      { path: "/projects", element: <Projects /> },
      { path: "/projects/:title", element: <ProjectDetails /> },

      // profile routes
      { path: "/profile/:id", element: <Profile /> },

      // community routes
      { path: "/community/:name", element: <CommunityPosts /> },
      { path: "/community/:name/:id", element: <CommunitySubjectDetails /> },

      // freelancers routes
      { path: "/freelancers", element: <BestFreeLancers /> },
      { path: "/portfolios", element: <Portfolios /> },

      // support routes
      { path: "/contact", element: <Contact /> },

      // landing routes
      { path: "/about/:id", element: <About /> },
      { path: "/about/preview/:id", element: <AboutPreview /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/blogs/:id", element: <BlogDetails /> },
      { path: "/privacy-policy", element: <Privacy /> },
      { path: "/terms-conditions", element: <Terms /> },
    ],
  },
]);
