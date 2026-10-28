// Before v1.5.0 every account kept its own private projects and tasks
// (kanban-projects:<userId>, kanban-tasks:<userId>). Projects are now shared,
// so those per-user lists are merged once into the common lists.
const read = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

// Old sample ids were identical for every user, so make them unique per user.
const scoped = (id, userId) => (id.startsWith("seed-") || id.startsWith("default-") ? `${id}-${userId}` : id);

export const migrateLegacy = () => {
  const userIds = new Set();
  for (let i = 0; i < localStorage.length; i += 1) {
    const match = localStorage.key(i).match(/^kanban-(?:projects|tasks):(.+)$/);
    if (match) userIds.add(match[1]);
  }

  const projects = [];
  const tasks = [];
  userIds.forEach((userId) => {
    const savedTasks = read(`kanban-tasks:${userId}`);
    const legacyProject = { id: "default-project", name: "My tasks", description: "Tasks from before projects existed.", color: "periwinkle", createdAt: 1 };
    const savedProjects = read(`kanban-projects:${userId}`) ?? (savedTasks ? [legacyProject] : []);

    savedProjects.forEach((p) => projects.push({ ...p, id: scoped(p.id, userId), ownerId: userId, memberIds: [userId] }));
    (savedTasks ?? []).forEach((t) =>
      tasks.push({ ...t, id: scoped(t.id, userId), projectId: scoped(t.projectId ?? "default-project", userId), assigneeId: null })
    );
  });
  return { projects, tasks };
};
