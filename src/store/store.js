import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./token-slice";

const store = configureStore({
  reducer: { token: tokenReducer },
});

export default store;
