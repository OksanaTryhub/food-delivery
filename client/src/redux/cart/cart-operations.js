import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./../../api/cart-api";

export const fetchAddToCart = createAsyncThunk(
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

export const fetchDeleteFromCart = createAsyncThunk(
  "cart/delete",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.deleteFromCart(id);
      return result;
    } catch ({ response }) {
      rejectWithValue(response.data);
    }
  }
);

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
