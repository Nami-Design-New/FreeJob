import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import App from "./App.jsx";
import "./utils/i18n.js";

const queryClient = new QueryClient();

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "./assets/styles/all.min.css";
import "./assets/styles/main.css";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <ToastContainer autoClose={2000} />
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);
