import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
  name: "modeSlice",
  initialState: false,
  reducers: {
    togglemode: (state) => {
      return !state;
    },
  },
});

export const { togglemode } = modeSlice.actions;
export default modeSlice.reducer;
