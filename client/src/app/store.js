import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

// Example: import your reducers here
// import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    // user: userReducer,
    // Add your reducers here
    auth: authReducer,
  },
  // middleware, devTools, and other options can be customized here
});

export default store;
