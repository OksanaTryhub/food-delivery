import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/food-api.js";

export const fetchFood = createAsyncThunk(
  "food/fetchAllFood",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getAllFood();
      return data;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

export const fetchAddFoodItem = createAsyncThunk(
  "food/addFoodItem",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.addFoodItem(data);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

export const fetchDeleteFoodItem = createAsyncThunk(
  "food/deleteFoodItem",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.deleteFoodItem(id);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

export const fetchUpdateFoodItem = createAsyncThunk(
  "food/updateFoodItem",
  async ({ id, ...rest }, { rejectWithValue }) => {
    try {
      const result = await api.updateFoodItem(id, rest);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);
