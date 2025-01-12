import { Suspense, lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router";
import RootLayout from "../Layout/RootLayout";
import ProtectedRoute from "../ui/ProtectedRoute";
import Sections from "../routes/Sections";
import AddService from "../routes/AddService";
import Cart from "../routes/Carts";
import Carts from "../routes/Carts";

// Lazy-loaded components
const Home = lazy(() => import("../routes/Home"));
const About = lazy(() => import("../routes/About"));
const Contact = lazy(() => import("../routes/Contact"));
const Chats = lazy(() => import("../routes/Chats"));

const Profile = lazy(() => import("../routes/Profile"));
const ProjectDetails = lazy(() => import("../routes/ProjectDetails"));
const Purchases = lazy(() => import("../routes/Purchases"));
const Categories = lazy(() => import("../routes/Categories"));
const EditProfile = lazy(() => import("../routes/EditProfile"));
// const AddService = lazy(() => import("../routes/AddService"));
const VerifyPhone = lazy(() => import("../routes/VerifyPhone"));
const ForgetPassword = lazy(() => import("../routes/ForgetPassword"));
const VerifyIdentity = lazy(() => import("../routes/VerifyIdentity"));
const OrderDetails = lazy(() => import("../routes/OrderDetails"));
const RecievedOrders = lazy(() => import("../routes/RecievedOrders"));
const Terms = lazy(() => import("../routes/Terms"));
const Notifications = lazy(() => import("../routes/Notifications"));
const Freelancers = lazy(() => import("../routes/Freelancers"));
const Projects = lazy(() => import("../routes/Projects"));
const ServiceDetails = lazy(() => import("../routes/ServiceDetails"));
const Services = lazy(() => import("../routes/Services"));
const ProjectsOrders = lazy(() => import("../routes/ProjectsOrders"));
const ProjectsOrdersDetails = lazy(() =>
  import("../routes/ProjectsOrdersDetails")
);
const Privacy = lazy(() => import("../routes/Privacy"));
const AddProject = lazy(() => import("../routes/AddProject"));
const AboutPreview = lazy(() => import("../routes/AboutPreview"));
const SubCategories = lazy(() => import("../routes/SubCategories"));
const Complaints = lazy(() => import("../routes/Complaints"));
const MyCollections = lazy(() => import("../routes/MyCollections"));
const MyCollection = lazy(() => import("../routes/MyCollection"));
const BestFreeLancers = lazy(() => import("../routes/BestFreeLancers"));
const ErrorPage = lazy(() => import("../routes/ErrorPage"));
const Blogs = lazy(() => import("../routes/Blogs"));
const BlogDetails = lazy(() => import("../routes/BlogDetails"));
const Portfolios = lazy(() => import("../routes/Portfolios"));
const CommunityPosts = lazy(() => import("../routes/CommunityPosts"));
const CommunitySubjectDetails = lazy(() =>
  import("../routes/CommunitySubjectDetails")
);
const MyBids = lazy(() => import("../routes/MyBids"));
const Balance = lazy(() => import("../routes/Balance"));
const ManageAccounts = lazy(() => import("../routes/ManageAccounts"));
const MyBidDetails = lazy(() => import("../routes/MyBidDetails"));

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
            <Suspense fallback={<div>Loading...</div>}>
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

          // support routes
          { path: "/complaints-suggestions", element: <Complaints /> },
        ],
      },

      // service routes
      { path: "/services", element: <Services /> },
      { path: "/services/:id", element: <ServiceDetails /> },

      // project routes
      { path: "/projects", element: <Projects /> },
      { path: "/projects/:id", element: <ProjectDetails /> },

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
