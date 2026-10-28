import { createSlice } from "@reduxjs/toolkit";
import { listUsers } from "../auth/authService";
import { registerUser } from "../auth/authSlice";

// Directory of every account on this device: { id, name, email }.
const usersSlice = createSlice({
  name: "users",
  initialState: listUsers(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.push(payload);
    });
  },
});

export default usersSlice.reducer;
