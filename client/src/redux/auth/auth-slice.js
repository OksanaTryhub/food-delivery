import { createSlice } from "@reduxjs/toolkit";
import initialState from "./auth-initialState";
import {
  userSignup,
  userLogin,
  userLogout,
  userCurrent,
} from "./auth-operations";

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const authSlice = createSlice({
  name: "authUser",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userSignup.pending, (state) => {
        handlePending(state);
      })
      .addCase(userSignup.fulfilled, (state, { payload }) => {
        const { user, token } = payload;
        state.loading = false;
        state.user = user;
        state.token = token;
        state.isLogin = true;
      })
      .addCase(userSignup.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })
      .addCase(userLogin.pending, (state) => {
        handlePending(state);
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        const { user, token } = payload;
        state.loading = false;
        state.user = user;
        state.token = token;
        state.isLogin = true;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })
      .addCase(userLogout.pending, (state) => {
        handlePending(state);
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.user = {};
        state.token = "";
        state.isLogin = false;
      })
      .addCase(userLogout.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })
      .addCase(userCurrent.pending, (state) => {
        handlePending(state);
      })
      .addCase(userCurrent.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token;
        state.isLogin = true;
      })
      .addCase(userCurrent.rejected, (state, { payload }) => {
        state.token = "";
        handleRejected(state, payload);
      });
  },
});

export default authSlice.reducer;
