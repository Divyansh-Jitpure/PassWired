import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";
import { setCredentials } from "./authSlice";

// Async thunk for user login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      // Send login request to API
      const res = await API.post("/auth/login", { email, password });

      const accessToken = res.data.accessToken;

      // Set Authorization header for future requests
      API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // Store credentials in Redux state
      thunkAPI.dispatch(
        setCredentials({
          accessToken,
          user: res.data.user,
        }),
      );

      // Return response data
      return res.data;
    } catch (err) {
      // Handle error and return rejection
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Login Failed!!",
      );
    }
  },
);

// Async thunk for user logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    // Send logout request to API
    const res = await API.post("/auth/logout");

    // Return response data
    return res.data;
  } catch (err) {
    // Handle error and return rejection
    return thunkAPI.rejectWithValue(
      err.response?.data?.error || "Logout Failed!!",
    );
  }
});

// Async thunk for setting application PIN
export const setAppPin = createAsyncThunk(
  "auth/setPin",
  async (payload, thunkAPI) => {
    try {
      // Send set PIN request to API
      const res = await API.post("/auth/setpin", payload);

      // Return response data
      return res.data;
    } catch (err) {
      // Handle error and return rejection
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to set pin!!",
      );
    }
  },
);
