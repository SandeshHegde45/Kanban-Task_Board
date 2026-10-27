const KEY = "kanban-notifications";

export const loadNotifications = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
};

export const saveNotifications = (notifications) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(notifications));
  } catch {
    /* storage full or blocked: notifications stay in memory */
  }
};
