import { createSlice } from "@reduxjs/toolkit";
import initialState from "./auth-initialState";
import { userSignup, userLogin } from "./auth-operations";

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
      });
  },
});

export default authSlice.reducer;
