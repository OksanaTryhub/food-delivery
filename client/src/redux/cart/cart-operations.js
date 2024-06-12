import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./../../api/cart-api";

export const fetchCartData = createAsyncThunk(
  "cart/cartData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getCartItems();
      return data;
    } catch ({ response }) {
      rejectWithValue(response.data);
    }
  }
);

export const fetchAddItemToCart = createAsyncThunk(
  "cart/add",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.addToCart(data);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

export const fetchDecreaseCartItemQuantity = createAsyncThunk(
  "cart/decrease-item",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.decreaseCartItem(id);
      return result;
    } catch ({ response }) {
      rejectWithValue(response.data);
    }
  }
);

export const fetchDeleteFromCart = createAsyncThunk(
  "cart/delete",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.deleteCartItem(id);
      return result;
    } catch ({ response }) {
      rejectWithValue(response.data);
    }
  }
);

export const fetchClearCart = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.clearCart();
      return result;
    } catch ({ response }) {
      rejectWithValue(response.data);
    }
  }
);

export const updateCartFromLocalStorage = createAsyncThunk(
  "cart/update-from-local",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.updateCartFromLocal(data);
      return result;
    } catch ({ response }) {
      rejectWithValue(response.data);
    }
  }
);
