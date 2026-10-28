import {
  BookOpen,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Code2,
  FolderKanban,
  Globe2,
  HeartHandshake,
  Megaphone,
  Palette,
  Rocket,
} from "lucide-react";

export const PROJECT_COLORS = [
  { value: "periwinkle", label: "Periwinkle", tile: "bg-[#6b7de8]" },
  { value: "amber", label: "Amber", tile: "bg-[#e8a317]" },
  { value: "emerald", label: "Emerald", tile: "bg-[#2fae74]" },
  { value: "rose", label: "Rose", tile: "bg-[#f0647a]" },
  { value: "sky", label: "Sky", tile: "bg-[#3aa7e0]" },
  { value: "violet", label: "Violet", tile: "bg-[#9a6bf0]" },
];

export const PROJECT_ICONS = [
  { value: "folder-kanban", label: "Kanban board", Icon: FolderKanban },
  { value: "briefcase", label: "Business", Icon: BriefcaseBusiness },
  { value: "rocket", label: "Launch", Icon: Rocket },
  { value: "code", label: "Development", Icon: Code2 },
  { value: "palette", label: "Design", Icon: Palette },
  { value: "megaphone", label: "Marketing", Icon: Megaphone },
  { value: "chart", label: "Analytics", Icon: ChartNoAxesCombined },
  { value: "globe", label: "Website", Icon: Globe2 },
  { value: "book-open", label: "Documentation", Icon: BookOpen },
  { value: "heart-handshake", label: "Teamwork", Icon: HeartHandshake },
];

export const getProjectColor = (value) => PROJECT_COLORS.find((c) => c.value === value) ?? PROJECT_COLORS[0];
export const getProjectIcon = (value) => PROJECT_ICONS.find((icon) => icon.value === value) ?? PROJECT_ICONS[0];
