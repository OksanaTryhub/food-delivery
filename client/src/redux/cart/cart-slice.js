import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAddItemToCart,
  fetchDecreaseCartItemQuantity,
  fetchCartData,
  fetchDeleteFromCart,
  fetchClearCart,
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
  // reducers: {
  //   addToCartLoc(state, action) {
  //     const { itemId } = action.payload;
  //     if (!state.cart[itemId]) {
  //       state.cart[itemId] = 1;
  //     } else {
  //       state.cart[itemId] += 1;
  //     }
  //     localStorage.setItem("cart", JSON.stringify(state.cart));
  //   },
  //   decreaseCartItemLoc(state, action) {
  //     const { itemId } = action.payload;
  //     if (state.cart[itemId] && state.cart[itemId] > 0) {
  //       state.cart[itemId] -= 1;
  //     }
  //     localStorage.setItem("cart", JSON.stringify(state.cart));
  //   },
  // },
  extraReducers: (builder) => {
    builder
      //ADD ITEM TO CART
      .addCase(fetchAddItemToCart.pending, (state) => {
        handlePending(state);
      })
      .addCase(fetchAddItemToCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cart = payload.updatedCart;
      })
      .addCase(fetchAddItemToCart.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })
      //DECREASE ITEM QAUNTITY
      .addCase(fetchDecreaseCartItemQuantity.pending, (state) => {
        handlePending(state);
      })
      .addCase(
        fetchDecreaseCartItemQuantity.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.cart = payload.updatedCart;
        }
      )
      .addCase(fetchDecreaseCartItemQuantity.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })
      //DELETE ITEM FROM CART
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
      //fetchClearCart
      .addCase(fetchClearCart.pending, (state) => {
        handlePending(state);
      })
      .addCase(fetchClearCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cart = payload.user.cartData;
      })
      .addCase(fetchClearCart.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })
      //FETCH CART DATA
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

// export const { addToCartLoc, decreaseCartItemLoc } = cartSlice.actions;
export default cartSlice.reducer;
