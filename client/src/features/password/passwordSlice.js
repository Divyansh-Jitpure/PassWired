import { createSlice } from "@reduxjs/toolkit";
import { fetchAllPasswords } from "./passwordThunks";

// Initial state for the password slice
const initialState = {
  sheetState: false, // Controls visibility of the sheet/modal
  appPinState: false, // Controls app pin state
  allPasswords: [], // Stores all fetched passwords
  status: "idle", // Status of async operations
  error: null, // Stores error messages
};

// Create the password slice
const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    // Toggles the sheet/modal state
    setSheetState: (state) => {
      state.sheetState = !state.sheetState;
    },
    // Toggles the app pin state
    setAppPinState: (state) => {
      state.appPinState = !state.appPinState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handles pending state for fetching passwords
      .addCase(fetchAllPasswords.pending, (state) => {
        state.status = "loading";
      })
      // Handles fulfilled state and updates passwords
      .addCase(fetchAllPasswords.fulfilled, (state, action) => {
        state.allPasswords = action.payload;
      })
      // Handles rejected state and sets error
      .addCase(fetchAllPasswords.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { setSheetState, setAllPasswords, setAppPinState } =
  passwordSlice.actions;
export default passwordSlice.reducer;
