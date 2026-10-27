import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import filterReducer from "../features/filters/filterSlice";
import notificationReducer from "../features/notifications/notificationSlice";
import { saveNotifications } from "../features/notifications/notificationStorage";
import projectReducer from "../features/projects/projectSlice";
import { saveProjects } from "../features/projects/projectStorage";
import taskReducer from "../features/tasks/taskSlice";
import { saveTasks } from "../features/tasks/taskStorage";
import themeReducer from "../features/theme/themeSlice";
import toastReducer from "../features/toast/toastSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    projects: projectReducer,
    tasks: taskReducer,
    notifications: notificationReducer,
    filters: filterReducer,
    theme: themeReducer,
    toast: toastReducer,
  },
});

// Projects, tasks and notifications are shared by everyone on this device,
// so they are saved as common lists whenever they change.
let previous = store.getState();
store.subscribe(() => {
  const state = store.getState();
  if (state.projects !== previous.projects) saveProjects(state.projects);
  if (state.tasks !== previous.tasks) saveTasks(state.tasks);
  if (state.notifications !== previous.notifications) saveNotifications(state.notifications);
  previous = state;
});
