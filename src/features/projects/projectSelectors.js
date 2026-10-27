import { createSelector } from "@reduxjs/toolkit";

// Only projects the logged-in user belongs to.
export const selectMyProjects = createSelector(
  [(s) => s.projects, (s) => s.auth.user?.id],
  (projects, userId) => projects.filter((p) => p.memberIds.includes(userId))
);
