import { createSlice } from "@reduxjs/toolkit";
import { fetchFood } from "./food-operations";

const initialState = {
  food: [],
  success: false,
  loading: false,
  error: null,
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFood.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFood.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.food = action.payload;
      })
      .addCase(fetchFood.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export default foodSlice.reducer;
