import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

export const fetchAllPasswords = createAsyncThunk(
  "password/fetchAllPasswords",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/passwords/allPwds");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data?.error || "Failed to fetch passwords!",
      );
    }
  },
);
