import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authService from "./authService";

const makeThunk = (type, service) =>
  createAsyncThunk(type, async (data, { rejectWithValue }) => {
    try {
      return await service(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

export const registerUser = makeThunk("auth/register", authService.register);
export const loginUser = makeThunk("auth/login", authService.login);
export const logoutUser = makeThunk("auth/logout", authService.logout);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: authService.getSession(), status: "idle", error: null },
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    for (const thunk of [registerUser, loginUser]) {
      builder
        .addCase(thunk.pending, (state) => { state.status = "loading"; state.error = null; })
        .addCase(thunk.fulfilled, (state, { payload }) => { state.status = "idle"; state.user = payload; })
        .addCase(thunk.rejected, (state, { payload }) => { state.status = "idle"; state.error = payload; });
    }
    builder.addCase(logoutUser.fulfilled, (state) => { state.user = null; });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
