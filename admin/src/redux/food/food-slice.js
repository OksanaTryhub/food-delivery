import { createSlice } from "@reduxjs/toolkit";

import {
  fetchFood,
  fetchAddFoodItem,
  fetchDeleteFoodItem,
  fetchUpdateFoodItem,
} from "./food-operations";

const initialState = {
  items: [],
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
      .addCase(fetchAddFoodItem.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      })
      .addCase(fetchDeleteFoodItem.pending, (store) => {
        store.loading = true;
      })
      .addCase(fetchDeleteFoodItem.fulfilled, (store, { payload }) => {
        store.loading = false;
        const index = store.items.findIndex((item) => item.id === payload);
        store.items.splice(index, 1);
      })
      .addCase(fetchDeleteFoodItem.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      })
      .addCase(fetchUpdateFoodItem.pending, (store) => {
        store.loading = true;
      })
      .addCase(fetchUpdateFoodItem.fulfilled, (store, { payload }) => {
        store.loading = false;
        const index = store.items.findIndex((item) => item.id === payload._id);
        store.items[index] = payload.updatedItem;
      })
      .addCase(fetchUpdateFoodItem.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      });
  },
});

export default foodSlice.reducer;
