const PRIORITY_RANK = { high: 0, medium: 1, low: 2 };

const byDueDate = (a, b) => a.dueDate.localeCompare(b.dueDate); // YYYY-MM-DD sorts as text
const byPriority = (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];

// Each sort breaks ties with the other field, so the order is always predictable.
const comparers = {
  newest: (a, b) => b.createdAt - a.createdAt,
  due: (a, b) => byDueDate(a, b) || byPriority(a, b),
  priority: (a, b) => byPriority(a, b) || byDueDate(a, b),
};

export const sortTasks = (tasks, sort) => [...tasks].sort(comparers[sort] ?? comparers.newest);
