// Owners manage the project. Assignees handle progress on their own tasks.
export const isOwner = (project, user) => Boolean(project && user) && project.ownerId === user.id;

export const canProgress = (project, task, user) =>
  isOwner(project, user) || (Boolean(task && user) && task.assigneeId === user.id);
