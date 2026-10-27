export const PROJECT_COLORS = [
  { value: "periwinkle", label: "Periwinkle", tile: "bg-[#6b7de8]" },
  { value: "amber", label: "Amber", tile: "bg-[#e8a317]" },
  { value: "emerald", label: "Emerald", tile: "bg-[#2fae74]" },
  { value: "rose", label: "Rose", tile: "bg-[#f0647a]" },
  { value: "sky", label: "Sky", tile: "bg-[#3aa7e0]" },
  { value: "violet", label: "Violet", tile: "bg-[#9a6bf0]" },
];

export const getProjectColor = (value) => PROJECT_COLORS.find((c) => c.value === value) ?? PROJECT_COLORS[0];
