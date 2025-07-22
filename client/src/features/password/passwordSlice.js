import { createSlice } from "@reduxjs/toolkit";
import API from "../../utils/api";
import { fetchAllPasswords } from "./passwordThunks";

const initialState = {
  sheetState: false,
  allPasswords: [],
  status: "idle",
  error: null,
};

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    setSheetState: (state) => {
      state.sheetState = !state.sheetState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPasswords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPasswords.fulfilled, (state, action) => {
        state.allPasswords = action.payload;
      })
      .addCase(fetchAllPasswords.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSheetState, setAllPasswords } = passwordSlice.actions;
export default passwordSlice.reducer;
