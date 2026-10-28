const KEY = "kanban-theme";

// Saved choice first, otherwise follow the operating system.
export const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    /* storage blocked: fall through to the system setting */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const saveTheme = (mode) => {
  try {
    localStorage.setItem(KEY, mode);
  } catch {
  }
};

export const applyTheme = (mode) => {
  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark");
  root.style.colorScheme = mode; // dark date pickers and scrollbars
};
