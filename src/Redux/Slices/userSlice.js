import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: { clickstate: false, loggedstate: false, user: [] },
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
    setUser: (state, action) => {
      state.user.push(action.payload);
      console.log(state.user);
    },
  },
});

export const { toggleLoginModal, setLoggedIn, setLoggedOut, setUser } =
  userSlice.actions;
export default userSlice.reducer;
