import { migrateLegacy } from "../workspace/legacyMigration";

const KEY = "kanban-projects";

export const loadProjects = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* fall through to migration */
  }
  return migrateLegacy().projects;
};

export const saveProjects = (projects) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(projects));
  } catch {
    /* storage full or blocked: the app keeps working in memory */
  }
};
