import { toInputDate } from "../../shared/utils/date";

const inDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return toInputDate(d);
};

// Every new account starts with one sample project it owns.
export const seedProject = (userId) => ({
  id: `seed-project-${userId}`,
  name: "Website launch",
  description: "Everything needed to ship the new marketing site.",
  color: "periwinkle",
  createdAt: 1,
  ownerId: userId,
  memberIds: [userId],
});

const tasks = [
  {
    id: "seed-1",
    title: "Design onboarding screens",
    description:
      "Wireframe the three-step welcome flow and share it for review.",
    priority: "high",
    status: "todo",
    dueDate: inDays(2),
    createdAt: 6,
  },
  {
    id: "seed-2",
    title: "Write API documentation",
    description: "Cover auth, tasks and error responses with examples.",
    priority: "medium",
    status: "todo",
    dueDate: inDays(6),
    createdAt: 5,
  },
  {
    id: "seed-3",
    title: "Fix login redirect bug",
    description: "Users land on a blank page after signing in on mobile.",
    priority: "high",
    status: "in-progress",
    dueDate: inDays(0),
    createdAt: 4,
  },
  {
    id: "seed-4",
    title: "Prepare sprint demo",
    description: "",
    priority: "low",
    status: "in-progress",
    dueDate: inDays(4),
    createdAt: 3,
  },
  {
    id: "seed-5",
    title: "Set up CI pipeline",
    description: "Run lint and tests on every pull request.",
    priority: "medium",
    status: "completed",
    dueDate: inDays(-2),
    createdAt: 2,
  },
  {
    id: "seed-6",
    title: "Create project repository",
    description: "",
    priority: "low",
    status: "completed",
    dueDate: inDays(-5),
    createdAt: 1,
  },
];

export const seedTasks = (userId) =>
  tasks.map((t) => ({
    ...t,
    id: `${t.id}-${userId}`,
    projectId: `seed-project-${userId}`,
    assigneeId: null,
  }));
