import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import InterceptorProvider from "./providers/InterceptorProvider.jsx";
import { router } from "./providers/router.jsx";
import store from "./redux/store.js";

import "./utils/i18n.js";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "./assets/styles/all.min.css";
import "./assets/styles/main.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <Provider store={store}>
      <ToastContainer autoClose={2000} />
      <InterceptorProvider>
        <RouterProvider router={router} />

        <App />
      </InterceptorProvider>
    </Provider>
  </QueryClientProvider>
);
