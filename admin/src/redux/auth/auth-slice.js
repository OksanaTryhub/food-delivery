import { createSlice } from "@reduxjs/toolkit";
import initialState from "./auth-initialState";
import { adminSignup, adminLogin } from "./auth-operations";

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
        const { user, token } = payload;
        state.loading = false;
        state.admin = user;
        state.token = token;
        state.isLogin = true;
      })
      .addCase(adminSignup.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })
      .addCase(adminLogin.pending, (state) => {
        handlePending(state);
      })
      .addCase(adminLogin.fulfilled, (state, { payload }) => {
        const { user, token } = payload;
        state.loading = false;
        state.admin = user;
        state.token = token;
        state.isLogin = true;
      })
      .addCase(adminLogin.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      });
  },
});

export default authSlice.reducer;
