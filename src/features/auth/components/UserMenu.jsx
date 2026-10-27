import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import Avatar from "../../../shared/components/Avatar";
import IconButton from "../../../shared/components/IconButton";
import NotificationBell from "../../notifications/components/NotificationBell";
import ThemeToggle from "../../theme/components/ThemeToggle";
import { logoutUser } from "../authSlice";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  return (
    <div className="flex items-center gap-2 rounded-full bg-surface py-1.5 pl-1.5 pr-2 ring-1 ring-ink/10 sm:gap-3">
      <Avatar user={user} />
      <span className="hidden text-sm leading-tight sm:block">
        <span className="block font-semibold">{user.name}</span>
        <span className="block text-xs text-ink/50">{user.email}</span>
      </span>
      <NotificationBell />
      <ThemeToggle />
      <IconButton label="Log out" onClick={() => dispatch(logoutUser())}>
        <LogOut size={18} />
      </IconButton>
    </div>
  );
}
