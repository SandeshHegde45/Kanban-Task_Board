export const STATUSES = [
  { value: "todo", label: "Todo", column: "bg-[#e4e8fb] dark:bg-[#1b2045]", bar: "bg-[#8b9bf0]", dot: "bg-[#6b7de8]" },
  { value: "in-progress", label: "In Progress", column: "bg-[#fff0c7] dark:bg-[#2c2615]", bar: "bg-[#f5b942]", dot: "bg-[#e8a317]" },
  { value: "completed", label: "Completed", column: "bg-[#d8f3e6] dark:bg-[#12302a]", bar: "bg-[#4cc68d]", dot: "bg-[#2fae74]" },
];

export const PRIORITIES = [
  { value: "high", label: "High", dot: "bg-rose-500", chip: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300", active: "peer-checked:bg-rose-500 peer-checked:text-white" },
  { value: "medium", label: "Medium", dot: "bg-orange-500", chip: "bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300", active: "peer-checked:bg-orange-500 peer-checked:text-white" },
  { value: "low", label: "Low", dot: "bg-sky-500", chip: "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300", active: "peer-checked:bg-sky-500 peer-checked:text-white" },
];

export const getPriority = (value) => PRIORITIES.find((p) => p.value === value);
