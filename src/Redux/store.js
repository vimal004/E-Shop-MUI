import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./Slices/modeSlice";

export const store = configureStore({
  mode: modeSlice,
});
