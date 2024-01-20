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
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
