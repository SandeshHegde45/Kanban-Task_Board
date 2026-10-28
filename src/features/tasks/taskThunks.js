import { addNotification } from "../notifications/notificationSlice";
import { canProgress, isOwner } from "../projects/permissions";
import { showToast } from "../toast/toastSlice";
import { STATUSES } from "./constants";
import { addTask, deleteTask, moveTask, restoreTask, updateTask } from "./taskSlice";

// Every task change goes through here, so the rules live in one place:
// owners manage tasks, assignees move the tasks assigned to them.

const notifyAssignee = (dispatch, actor, project, task, previousAssigneeId) => {
  if (task.assigneeId && task.assigneeId !== previousAssigneeId && task.assigneeId !== actor.id) {
    dispatch(addNotification({
      userId: task.assigneeId,
      type: "task-assigned",
      projectId: project.id,
      taskId: task.id,
      message: `${actor.name} assigned you "${task.title}" in ${project.name}`,
    }));
  }
};

export const createTask = (data) => (dispatch, getState) => {
  const state = getState();
  const project = state.projects.find((p) => p.id === data.projectId);
  if (!isOwner(project, state.auth.user)) return;

  const action = addTask(data);
  dispatch(action);
  notifyAssignee(dispatch, state.auth.user, project, action.payload, null);
};

export const saveTask = (data) => (dispatch, getState) => {
  const state = getState();
  const previous = state.tasks.find((t) => t.id === data.id);
  const project = previous && state.projects.find((p) => p.id === previous.projectId);
  if (!isOwner(project, state.auth.user)) return;

  dispatch(updateTask(data));
  notifyAssignee(dispatch, state.auth.user, project, { ...previous, ...data }, previous.assigneeId);
};

// Delete right away, then offer a few seconds to take it back.
export const removeTask = (id) => (dispatch, getState) => {
  const state = getState();
  const index = state.tasks.findIndex((t) => t.id === id);
  if (index === -1) return;
  const task = state.tasks[index];
  if (!isOwner(state.projects.find((p) => p.id === task.projectId), state.auth.user)) return;

  dispatch(deleteTask(id));
  dispatch(showToast({
    message: `Deleted "${task.title}"`,
    action: restoreTask({ task, index }), // puts it back in its old position
  }));
};

export const changeTaskStatus = ({ id, status }) => (dispatch, getState) => {
  const state = getState();
  const actor = state.auth.user;
  const task = state.tasks.find((t) => t.id === id);
  const project = task && state.projects.find((p) => p.id === task.projectId);
  if (!task || task.status === status || !canProgress(project, task, actor)) return;

  dispatch(moveTask({ id, status }));
  // Let the owner know when a teammate moves a task forward.
  if (!isOwner(project, actor)) {
    const label = STATUSES.find((s) => s.value === status).label;
    dispatch(addNotification({
      userId: project.ownerId,
      type: "progress",
      projectId: project.id,
      taskId: id,
      message: `${actor.name} moved "${task.title}" to ${label}`,
    }));
  }
};
