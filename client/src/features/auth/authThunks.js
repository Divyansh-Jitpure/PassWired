import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";
import { setCredentials } from "./authSlice";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await API.post("/auth/login", { email, password });

      const accessToken = res.data.accessToken;

      API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      thunkAPI.dispatch(
        setCredentials({
          accessToken,
          user: res.data.user,
        }),
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err || "Login Failed!!");
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await API.post("/auth/logout");

    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err || "Logout Failed!!");
  }
});
