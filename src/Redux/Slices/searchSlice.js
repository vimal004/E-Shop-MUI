import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: { text: "", search: false },
  reducers: {
    setsearch: (state) => {
      return !state;
    },
  },
});

export const { toggleMode } = modeSlice.actions;
export default modeSlice.reducer;
