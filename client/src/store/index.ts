import { configureStore } from "@reduxjs/toolkit";
import { dataSlice } from "./data-slice/data-slice-reducer";

export const store = configureStore({
  reducer: dataSlice.reducer,
});