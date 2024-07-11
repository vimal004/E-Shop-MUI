import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./Slices/modeSlice";
import userSlice from "./Slices/userSlice";

const store = configureStore({
  reducer: {
    mode: modeSlice,
    user: userSlice,
  },
});

export default store;
