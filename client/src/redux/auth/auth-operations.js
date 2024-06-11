import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/auth-api";

export const userSignup = createAsyncThunk(
  "authUser/signup",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.signupUser(data);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response);
    }
  }
);

export const userLogin = createAsyncThunk(
  "authUser/login",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.loginUser(data);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response);
    }
  }
);

export const userLogout = createAsyncThunk(
  "authUser/logout",
  async (token, { rejectWithValue }) => {
    try {
      const result = await api.logoutUser(token);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response);
    }
  }
);

export const userCurrent = createAsyncThunk(
  "authUser/current",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { authUser } = getState();
      const result = await api.getCurrentUser(authUser.token);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);
