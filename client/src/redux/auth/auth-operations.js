import { createAsyncThunk } from "@reduxjs/toolkit";
import { signup, login } from "../../api/auth-api";

export const userSignup = createAsyncThunk(
  "authUser/signup",
  async (data, { rejectWithValue }) => {
    try {
      const result = await signup(data);
      return result;
    } catch ({ response }) {
      // authErrorMessage(response);
      console.log(response);
      return rejectWithValue(response);
    }
  }
);

export const userLogin = createAsyncThunk(
  "authUser/login",
  async (data, { rejectWithValue }) => {
    try {
      const result = await login(data);
      return result;
    } catch ({ response }) {
      // authErrorMessage(response);
      console.log(response);
      return rejectWithValue(response);
    }
  }
);
