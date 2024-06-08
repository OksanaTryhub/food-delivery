import { createSlice } from "@reduxjs/toolkit";

import {
  fetchFood,
  fetchAddFoodItem,
  fetchDeleteFoodItem,
} from "./food-operations";

const initialState = {
  items: [],
  // success: false,
  loading: false,
  error: null,
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchFood.pending, (store) => {
        store.loading = true;
      })
      .addCase(fetchFood.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.items = payload.data;
      })
      .addCase(fetchFood.rejected, (store) => {
        store.loading = false;
        store.error = true;
      })
      .addCase(fetchAddFoodItem.pending, (store) => {
        store.loading = true;
      })
      .addCase(fetchAddFoodItem.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.items.push(payload);
      })
      .addCase(fetchAddFoodItem.rejected, (store) => {
        store.loading = false;
        store.error = true;
      })
      .addCase(fetchDeleteFoodItem.pending, (store) => {
        store.loading = true;
      })
      .addCase(fetchDeleteFoodItem.fulfilled, (store, { payload }) => {
        store.loading = false;
        const index = store.items.findIndex((item) => item.id === payload);
        store.items.splice(index, 1);
      })
      .addCase(fetchDeleteFoodItem.rejected, (store) => {
        store.loading = false;
        store.error = true;
      });
  },
});

export default foodSlice.reducer;
