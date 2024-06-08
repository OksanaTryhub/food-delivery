import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/auth-api";

export const adminSignup = createAsyncThunk(
  "authAdmin/signup",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.signupAdmin(data);
      return result;
    } catch ({ response }) {
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
      console.log(response);
      return rejectWithValue(response);
    }
  }
);

export const adminLogout = createAsyncThunk(
  "authAdmin/logout",
  async (token, { rejectWithValue }) => {
    try {
      const result = await api.logout(token);
      return result;
    } catch ({ response }) {
      console.log(response);
      return rejectWithValue(response);
    }
  }
);

export const adminCurrent = createAsyncThunk(
  "authAdmin/current",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { authAdmin } = getState();
      const result = await api.getCurrentAdmin(authAdmin.token);
      return result;
    } catch ({ response }) {
      console.log(response);
      return rejectWithValue(response);
    }
  }
);
