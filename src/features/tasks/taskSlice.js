import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../auth/authSlice";
import { deleteProject, removeMember } from "../projects/projectSlice";
import { seedTasks } from "../workspace/seed";
import { loadTasks } from "./taskStorage";

// Task: { id, projectId, title, description, priority, status, dueDate, assigneeId, createdAt }
const taskSlice = createSlice({
  name: "tasks",
  initialState: loadTasks(),
  reducers: {
    addTask: {
      reducer: (state, { payload }) => {
        state.unshift(payload);
      },
      prepare: (data) => ({ payload: { ...data, id: crypto.randomUUID(), createdAt: Date.now() } }),
    },
    updateTask: (state, { payload }) => {
      const index = state.findIndex((t) => t.id === payload.id);
      if (index !== -1) state[index] = { ...state[index], ...payload };
    },
    deleteTask: (state, { payload }) => state.filter((t) => t.id !== payload),
    restoreTask: (state, { payload: { task, index } }) => {
      if (!state.some((t) => t.id === task.id)) state.splice(Math.min(index, state.length), 0, task);
    },
    moveTask: (state, { payload: { id, status } }) => {
      const task = state.find((t) => t.id === id);
      if (task) task.status = status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.unshift(...seedTasks(payload.id));
      })
      // Deleting a project removes its tasks too.
      .addCase(deleteProject, (state, { payload }) => state.filter((t) => t.projectId !== payload))
      // Someone leaving a project leaves their tasks unassigned.
      .addCase(removeMember, (state, { payload: { projectId, userId } }) => {
        state.forEach((t) => {
          if (t.projectId === projectId && t.assigneeId === userId) t.assigneeId = null;
        });
      });
  },
});

export const { addTask, updateTask, deleteTask, restoreTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
