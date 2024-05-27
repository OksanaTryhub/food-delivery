import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/auth-api";

export const adminSignup = createAsyncThunk(
  "authAdmin/signup",
  async (data, { rejectWithValue }) => {
    console.log("🚀 ~ data:", data);
    try {
      const result = await api.signupAdmin(data);
      return result;
    } catch ({ response }) {
      // authErrorMessage(response);
      console.log(response);
      return rejectWithValue(response);
    }
  }
);

export const adminLogin = createAsyncThunk(
  "authAdmin/login",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.loginAdmin(data);
      return result;
    } catch ({ response }) {
      // authErrorMessage(response);
      console.log(response);
      return rejectWithValue(response);
    }
  }
);