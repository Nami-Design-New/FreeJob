import { configureStore } from "@reduxjs/toolkit";
import authModalReduce from "./slices/authModalSlice";
import languageReduser from "./slices/languageSlice";
import authedUserReducer from "./slices/authedUserSlice";
import cartReduser from "./slices/cartSlice";
const store = configureStore({
  reducer: {
    authModal: authModalReduce,
    authedUser: authedUserReducer,
    language: languageReduser,
    cart: cartReduser,
  },
});
export default store;
