import { addNotification } from "../notifications/notificationSlice";
import { isOwner } from "./permissions";
import { addMember, addProject, deleteProject, removeMember, updateProject } from "./projectSlice";

const read = (getState, projectId) => {
  const state = getState();
  return { actor: state.auth.user, project: state.projects.find((p) => p.id === projectId) };
};

export const createProject = (data) => (dispatch, getState) => {
  const actor = getState().auth.user;
  dispatch(addProject({ ...data, ownerId: actor.id, memberIds: [actor.id] }));
};

export const saveProject = (data) => (dispatch, getState) => {
  const { actor, project } = read(getState, data.id);
  if (isOwner(project, actor)) dispatch(updateProject(data));
};

export const removeProject = (projectId) => (dispatch, getState) => {
  const { actor, project } = read(getState, projectId);
  if (isOwner(project, actor)) dispatch(deleteProject(projectId));
};

export const addMemberToProject = ({ projectId, userId }) => (dispatch, getState) => {
  const { actor, project } = read(getState, projectId);
  if (!isOwner(project, actor)) return;
  dispatch(addMember({ projectId, userId }));
  dispatch(addNotification({
    userId,
    type: "member-added",
    projectId,
    message: `${actor.name} added you to "${project.name}"`,
  }));
};

export const removeMemberFromProject = ({ projectId, userId }) => (dispatch, getState) => {
  const { actor, project } = read(getState, projectId);
  if (!isOwner(project, actor) || userId === project.ownerId) return;
  dispatch(removeMember({ projectId, userId }));
  dispatch(addNotification({
    userId,
    type: "member-removed",
    message: `${actor.name} removed you from "${project.name}"`,
  }));
};
