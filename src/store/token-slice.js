import { createSlice } from "@reduxjs/toolkit";

const intialTokenState = {
  idToken: localStorage.getItem("tokenId") || "",
  userLoggedIn: !!localStorage.getItem("tokenId"),
  email: localStorage.getItem("email"),
};
const tokenSlice = createSlice({
  name: "token",
  initialState: intialTokenState,
  reducers: {
    addToken(state, action) {
      state.idToken = action.payload;
      state.userLoggedIn = true;
      localStorage.setItem("tokenId", action.payload);
    },
    removeToken(state, action) {
      state.idToken = "";
      state.userLoggedIn = false;
      localStorage.removeItem("tokenId");
    },
    addEmail(state, action) {
      state.email = action.payload;
      localStorage.setItem("email", action.payload);
    },
    removeEmail(state, action) {
      state.email = "";
      localStorage.removeItem("email");
    },
  },
});

export const tokenAction = tokenSlice.actions;

export default tokenSlice.reducer;
