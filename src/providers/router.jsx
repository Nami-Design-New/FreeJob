import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../routes/Home";
import Projects from "../routes/Projects";
import Sections from "../routes/Sections";
import Services from "../routes/Services";
import AddService from "../routes/AddService";
import Profile from "../routes/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile", element: <Profile /> },
      {
        path: "/sections",
        element: <Sections />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      { path: "/projects", element: <Projects /> },
      { path: "add-service", element: <AddService /> },
    ],
  },
]);
