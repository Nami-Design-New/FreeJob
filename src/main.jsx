import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./providers/router.jsx";
import "./utils/i18n.js";

import { Provider } from "react-redux";
import store from "./redux/store.js";

/*---------- main styles ------------*/
import "./assets/styles/main.css";
/*---------- bootstrap ------------*/

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer } from "react-toastify";
import ToTopOnNavigation from "./utils/ToTopOnNavigation.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />

      <App />
    </Provider>
  </StrictMode>
);
