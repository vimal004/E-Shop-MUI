import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./Slices/modeSlice";

const store = configureStore({
  reducer: {
    mode: modeSlice,
  },
});

export default store;
