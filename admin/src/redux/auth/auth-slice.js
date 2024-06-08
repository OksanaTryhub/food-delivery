import { createSlice } from "@reduxjs/toolkit";
import initialState from "./auth-initialState";
import {
  adminSignup,
  adminLogin,
  adminLogout,
  adminCurrent,
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
  name: "authAdmin",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(adminSignup.pending, (state) => {
        handlePending(state);
        state.isLogin = false;
      })
      .addCase(adminSignup.fulfilled, (state, { payload }) => {
        const { data } = payload;
        state.loading = false;
        state.admin = data.admin;
        state.token = data.token;
        state.isLogin = true;
      })
      .addCase(adminSignup.rejected, (state, { payload }) => {
        handleRejected(state, payload);
        state.isLogin = false;
        state.token = "";
      })

      .addCase(adminLogin.pending, (state) => {
        handlePending(state);
      })
      .addCase(adminLogin.fulfilled, (state, { payload }) => {
        const { data } = payload;
        state.loading = false;
        state.admin = data.admin;
        state.token = data.token;
        state.isLogin = true;
      })
      .addCase(adminLogin.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })

      .addCase(adminLogout.pending, (state) => {
        handlePending(state);
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.loading = false;
        state.admin = {};
        state.token = "";
        state.isLogin = false;
      })
      .addCase(adminLogout.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })

      .addCase(adminCurrent.pending, (state) => {
        handlePending(state);
      })
      .addCase(adminCurrent.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.admin = payload.admin;
        state.token = payload.token;
        state.isLogin = true;
      })
      .addCase(adminCurrent.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      });
  },
});

export default authSlice.reducer;
