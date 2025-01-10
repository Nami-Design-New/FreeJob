import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";


import { Provider } from "react-redux";
import store from "./redux/store.js";

/*---------- main styles ------------*/
import "./assets/styles/main.css";
/*---------- bootstrap ------------*/

import { ToastContainer } from "react-toastify";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </StrictMode>
);
