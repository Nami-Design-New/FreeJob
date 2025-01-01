import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },
]);
