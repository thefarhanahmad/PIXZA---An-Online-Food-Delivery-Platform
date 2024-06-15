import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../lib/features/cart/cartSlice";
import authSlice from "./features/auth/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      auth: authSlice,
    },
  });
};
