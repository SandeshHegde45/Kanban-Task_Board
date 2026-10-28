import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun } from "lucide-react";
import IconButton from "../../../shared/components/IconButton";
import { setTheme } from "../themeSlice";
import { saveTheme } from "../themeStorage";

export default function ThemeToggle({ className = "" }) {
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);
  const next = mode === "dark" ? "light" : "dark";
  const Icon = mode === "dark" ? Sun : Moon;

  const toggle = () => {
    saveTheme(next);
    dispatch(setTheme(next));
  };

  return (
    <IconButton label={`Switch to ${next} mode`} onClick={toggle} className={className}>
      <Icon size={18} />
    </IconButton>
  );
}
