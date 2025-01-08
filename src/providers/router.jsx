import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../routes/Home";
import Projects from "../routes/Projects";
import Sections from "../routes/Sections";
import Services from "../routes/Services";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/sections",
        element: <Sections />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      { path: "/projects", element: <Projects /> },
    ],
  },
]);
