import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllFood } from "../../api/food-api";

export const fetchFood = createAsyncThunk(
  "food/foodList",
  async (_, thunkAPI) => {
    try {
      console.log("FETCHFOOD");
      const response = await getAllFood();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
