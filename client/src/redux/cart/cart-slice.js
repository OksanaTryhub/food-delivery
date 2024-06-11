import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAddToCart,
  fetchDeleteFromCart,
  fetchCartData,
} from "./cart-operations";

const initialState = {
  cart: {},
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddToCart.pending, (state) => {
        handlePending(state);
      })
      .addCase(fetchAddToCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cart = payload.updatedCart;
      })
      .addCase(fetchAddToCart.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })
      .addCase(fetchDeleteFromCart.pending, (state) => {
        handlePending(state);
      })
      .addCase(fetchDeleteFromCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cart = payload.updatedCart;
      })
      .addCase(fetchDeleteFromCart.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })
      .addCase(fetchCartData.pending, (state) => {
        handlePending(state);
      })
      .addCase(fetchCartData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cart = payload.cartData;
      })
      .addCase(fetchCartData.rejected, (state, { payload }) => {
        state.cart = {};
        handleRejected(state, payload);
      });
  },
});

export default cartSlice.reducer;
