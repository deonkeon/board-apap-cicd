import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const join = createAsyncThunk("user/join", async (user, thunkAPI) => {
  try {
    const response = await axios.post(`/user/join`, user);

    return response.data.item;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  try {
    const response = await axios.post(`/user/login`, user);

    return response.data.item;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.errorCode);
  }
});

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`/user/logout`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
      },
    });

    return response.data.item;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.errorCode);
  }
});
