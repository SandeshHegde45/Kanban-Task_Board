import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../auth/authSlice";
import { deleteProject } from "../projects/projectSlice";

// One toast at a time: { id, message, action }. `action` is a plain Redux
// action (serialisable), dispatched when the user presses Undo.
const toastSlice = createSlice({
  name: "toast",
  initialState: null,
  reducers: {
    showToast: {
      reducer: (_, { payload }) => payload,
      prepare: (data) => ({ payload: { ...data, id: Date.now() } }),
    },
    hideToast: () => null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, () => null)
      // The task's project is gone, so there is nothing left to restore into.
      .addCase(deleteProject, () => null);
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
