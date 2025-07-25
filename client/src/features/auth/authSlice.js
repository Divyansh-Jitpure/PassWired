import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../../features/auth/authThunks";

const initialState = {
  accessToken: "",
  user: null,
  showPinModal: false,
  runFunction: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    setShowPinModal: (state, action) => {
      state.showPinModal = action.payload.pinModalState;
    },
    setRunFunction: (state, action) => {
      state.runFunction = action.payload.runFunctionState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.accessToken = null;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setCredentials, setShowPinModal, setRunFunction } =
  authSlice.actions;
export default authSlice.reducer;
