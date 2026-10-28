import { migrateLegacy } from "../workspace/legacyMigration";

const KEY = "kanban-tasks";

export const loadTasks = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
    // Projects already moved to the shared format: don't migrate tasks twice.
    if (localStorage.getItem("kanban-projects")) return [];
  } catch {
    /* fall through to migration */
  }
  return migrateLegacy().tasks;
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  } catch {
    /* storage full or blocked: the app keeps working in memory */
  }
};
