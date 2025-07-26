import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import passwordReducer from "../features/password/passwordSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    password: passwordReducer,
  },
});

export default store;
