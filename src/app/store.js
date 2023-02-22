import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../pages/bookSlice";
export const store = configureStore({
  reducer: { book: bookReducer },
});
