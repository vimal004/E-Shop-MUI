import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: { clickstate: false, loggedstate: false },
  reducers: {
    toggleLoginModal: (state) => {
      return !state;
    },
    setLoggedIn: (state) => {
      return {
        ...state,
        loggedstate: true,
      };
    },
    setLoggedOut: (state) => {
      return {
        ...state,
        loggedstate: false,
      };
    },
  },
});

export const { toggleLoginModal, setLoggedIn, setLoggedOut } =
  userSlice.actions;
export default userSlice.reducer;
