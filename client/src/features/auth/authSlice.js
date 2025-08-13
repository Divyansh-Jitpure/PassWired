import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../../features/auth/authThunks";

// Initial state for authentication slice
const initialState = {
  accessToken: "", // JWT or access token for authenticated requests
  user: null, // User object after login
  showPinModal: false, // Controls visibility of PIN modal
  showEditModal: false, // Controls the trigger to open Edit modal
  runFunction: false, // Flag to trigger a function after PIN entry
  pendingAction: null, // Stores pending action requiring PIN
  targetPasswordId: null, // ID of password item for pending action
  showPwdChangeModal: false,
  showPinChangeModal: false,
  showDeleteAccountModal: false,
  activeTheme:
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches),
};

// Create authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set access token and user after login
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    // Show or hide the PIN modal
    setShowPinModal: (state, action) => {
      state.showPinModal = action.payload.pinModalState;
    },
    // Show or hide the Edit modal
    setShowEditModal: (state, action) => {
      state.showEditModal = action.payload;
    },
    setShowChangePwdModal: (state, action) => {
      state.showPwdChangeModal = action.payload;
    },
    setShowChangePinModal: (state, action) => {
      state.showPinChangeModal = action.payload;
    },
    setShowDeleteAccountModal: (state, action) => {
      state.showDeleteAccountModal = action.payload;
    },
    toggleTheme: (state, action) => {
      state.activeTheme = action.payload;
      if (state.activeTheme) {
        localStorage.theme = "dark";
      } else {
        localStorage.theme = "light";
      }
    },
    // Store pending action and target password ID
    setPendingAction: (state, action) => {
      state.pendingAction = action.payload.action;
      state.targetPasswordId = action.payload.id;
    },
    // Trigger function and hide PIN modal
    setRunFunction: (state, action) => {
      state.runFunction = action.payload;
      state.showPinModal = false;
    },
    // Clear pending action and target password ID
    clearPendingAction: (state) => {
      state.pendingAction = null;
      state.targetPasswordId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle successful logout
      .addCase(logout.fulfilled, (state) => {
        state.accessToken = null;
        state.user = null;
      })
      // Handle logout error
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const {
  setCredentials,
  setShowPinModal,
  setPendingAction,
  setRunFunction,
  clearPendingAction,
  setShowEditModal,
  setShowChangePwdModal,
  setShowChangePinModal,
  setShowDeleteAccountModal,
  toggleTheme,
} = authSlice.actions;
export default authSlice.reducer;
