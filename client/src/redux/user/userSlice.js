import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: "No error",
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      if (state) {
        state.loading = true;
      }
    },
    signInSuccess: (state, action) => {
      if (state) {
        state.currentUser = action.payload;
        state.loading = false;
      }
    },
    signInFailure: (state, action) => {
      if (state) {
        state.error = action.payload;
        state.loading = false;
      }
    },
    updateUserStart: (state) => {
      if (state) {
        state.loading = true;
      }
    },
    updateUserSuccess: (state, action) => {
      if (state) {
        state.currentUser = action.payload;
        state.loading = false;
      }
    },
    updateUserFailure: (state, action) => {
      if (state) {
        state.error = action.payload;
        state.loading = false;
      }
    },
    deleteUserStart: (state) => {
      if (state) {
        state.loading = true;
      }
    },
    deleteUserSuccess: (state) => {
      if (state) {
        state.currentUser = null;
        state.loading = false;
      }
    },
    deleteUserFailure: (state, action) => {
      if (state) {
        state.error = action.payload;
        state.loading = false;
      }
    },
    signOutStart: (state) => {
      if (state) {
        state.loading = true;
      }
    },
    signOutSuccess: (state) => {
      if (state) {
        state.currentUser = null;
        state.loading = false;
      }
    },
    signOutFailure: (state, action) => {
      if (state) {
        state.error = action.payload;
        state.loading = false;
      }
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutFailure,
  signOutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
