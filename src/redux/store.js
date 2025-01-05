import { configureStore } from "@reduxjs/toolkit";
import authModalReducer from "./slices/authModalSlice";
const store = configureStore({
  reducer: {
    authModal: authModalReducer,
  },
});
export default store;
