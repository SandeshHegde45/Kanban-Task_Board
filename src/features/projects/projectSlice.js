import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../auth/authSlice";
import { seedProject } from "../workspace/seed";
import { loadProjects } from "./projectStorage";

// Project: { id, name, description, color, createdAt, ownerId, memberIds }
const projectSlice = createSlice({
  name: "projects",
  initialState: loadProjects(),
  reducers: {
    addProject: {
      reducer: (state, { payload }) => {
        state.unshift(payload);
      },
      prepare: (data) => ({ payload: { ...data, id: crypto.randomUUID(), createdAt: Date.now() } }),
    },
    updateProject: (state, { payload }) => {
      const index = state.findIndex((p) => p.id === payload.id);
      if (index !== -1) state[index] = { ...state[index], ...payload };
    },
    deleteProject: (state, { payload }) => state.filter((p) => p.id !== payload),
    addMember: (state, { payload: { projectId, userId } }) => {
      const project = state.find((p) => p.id === projectId);
      if (project && !project.memberIds.includes(userId)) project.memberIds.push(userId);
    },
    removeMember: (state, { payload: { projectId, userId } }) => {
      const project = state.find((p) => p.id === projectId);
      if (project) project.memberIds = project.memberIds.filter((id) => id !== userId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.unshift(seedProject(payload.id));
    });
  },
});

export const { addProject, updateProject, deleteProject, addMember, removeMember } = projectSlice.actions;
export default projectSlice.reducer;
