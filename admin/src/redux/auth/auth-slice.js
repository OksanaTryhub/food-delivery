import { createSlice } from "@reduxjs/toolkit";
import initialState from "./auth-initialState";
import { adminSignup, adminLogin, adminLogout } from "./auth-operations";

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
        state.isLogin = true;
      })
      .addCase(adminLogout.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      });
  },
});

export default authSlice.reducer;
