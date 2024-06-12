import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAddToCart,
  fetchDeleteFromCart,
  fetchCartData,
} from "./cart-operations";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || {},
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
  reducers: {
    addToCartLoc(state, action) {
      const { itemId } = action.payload;
      if (!state.cart[itemId]) {
        state.cart[itemId] = 1;
      } else {
        state.cart[itemId] += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    deleteFromCartLoc(state, action) {
      const { itemId } = action.payload;
      if (state.cart[itemId] && state.cart[itemId] > 0) {
        state.cart[itemId] -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
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

export const { addToCartLoc, deleteFromCartLoc } = cartSlice.actions;
export default cartSlice.reducer;
