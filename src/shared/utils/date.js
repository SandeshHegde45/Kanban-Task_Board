// Local YYYY-MM-DD (what <input type="date"> uses).
export const toInputDate = (date = new Date()) => {
  const shifted = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return shifted.toISOString().slice(0, 10);
};

export const formatDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString(undefined, { day: "numeric", month: "short" });

export const getDueState = (value) => {
  const today = toInputDate();
  if (value < today) return "overdue";
  if (value === today) return "today";
  return "upcoming";
};

export const timeAgo = (timestamp) => {
  const seconds = Math.round((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
};
