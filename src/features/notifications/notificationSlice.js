import { createSelector, createSlice } from "@reduxjs/toolkit";
import { loadNotifications } from "./notificationStorage";

// { id, userId (recipient), type, message, projectId?, taskId?, createdAt, read }
const notificationSlice = createSlice({
  name: "notifications",
  initialState: loadNotifications(),
  reducers: {
    addNotification: {
      reducer: (state, { payload }) => {
        state.unshift(payload);
        state.splice(200); // keep the list from growing forever
      },
      prepare: (data) => ({ payload: { ...data, id: crypto.randomUUID(), createdAt: Date.now(), read: false } }),
    },
    markRead: (state, { payload }) => {
      const item = state.find((n) => n.id === payload);
      if (item) item.read = true;
    },
    markAllRead: (state, { payload: userId }) => {
      state.forEach((n) => { if (n.userId === userId) n.read = true; });
    },
  },
});

export const { addNotification, markRead, markAllRead } = notificationSlice.actions;
export default notificationSlice.reducer;

export const selectMyNotifications = createSelector(
  [(s) => s.notifications, (s) => s.auth.user?.id],
  (notifications, userId) => notifications.filter((n) => n.userId === userId)
);
