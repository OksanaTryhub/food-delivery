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

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchFood.pending, (state) => {
        handlePending(state);
      })
      .addCase(fetchFood.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload.data;
      })
      .addCase(fetchFood.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })
      .addCase(fetchAddFoodItem.pending, (state) => {
        handlePending(state);
      })
      .addCase(fetchAddFoodItem.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items.push(payload);
      })
      .addCase(fetchAddFoodItem.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })
      .addCase(fetchDeleteFoodItem.pending, (state) => {
        handlePending(state);
      })
      .addCase(fetchDeleteFoodItem.fulfilled, (state, { payload }) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item.id === payload);
        state.items.splice(index, 1);
      })
      .addCase(fetchDeleteFoodItem.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })
      .addCase(fetchUpdateFoodItem.pending, (state) => {
        handlePending(state);
      })
      .addCase(fetchUpdateFoodItem.fulfilled, (state, { payload }) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item.id === payload._id);
        state.items[index] = payload.updatedItem;
      })
      .addCase(fetchUpdateFoodItem.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      });
  },
});

export default foodSlice.reducer;
