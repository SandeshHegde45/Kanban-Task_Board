import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ArrowRightLeft, Bell, ClipboardCheck, UserMinus, UserPlus } from "lucide-react";
import IconButton from "../../../shared/components/IconButton";
import { timeAgo } from "../../../shared/utils/date";
import { markAllRead, markRead, selectMyNotifications } from "../notificationSlice";

const icons = {
  "member-added": UserPlus,
  "member-removed": UserMinus,
  "task-assigned": ClipboardCheck,
  progress: ArrowRightLeft,
};

export default function NotificationBell() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((s) => s.auth.user?.id);
  const items = useSelector(selectMyNotifications);
  const unread = items.filter((n) => !n.read).length;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPress = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onPress);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPress);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openItem = (n) => {
    dispatch(markRead(n.id));
    setOpen(false);
    if (n.projectId) navigate(`/projects/${n.projectId}`);
  };

  return (
    <div ref={ref} className="relative">
      <IconButton label={unread ? `Notifications, ${unread} unread` : "Notifications"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <Bell size={18} />
      </IconButton>
      {unread > 0 && (
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold leading-4 text-white">
          {unread}
        </span>
      )}

      {open && (
        <div className="pop-in absolute right-0 top-full z-40 mt-3 w-80 max-w-[85vw] overflow-hidden rounded-3xl bg-surface shadow-2xl ring-1 ring-ink/10">
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
            <h2 className="font-display text-lg font-extrabold">Notifications</h2>
            {unread > 0 && (
              <button type="button" onClick={() => dispatch(markAllRead(userId))} className="text-xs font-semibold underline underline-offset-4">
                Mark all as read
              </button>
            )}
          </div>
          <ul className="max-h-96 overflow-y-auto">
            {items.length === 0 && <li className="px-5 py-10 text-center text-sm text-ink/50">You're all caught up.</li>}
            {items.slice(0, 20).map((n) => {
              const Icon = icons[n.type] ?? Bell;
              return (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => openItem(n)}
                    className={`flex w-full items-start gap-3 px-5 py-3 text-left transition hover:bg-ink/10 ${n.read ? "" : "bg-ink/5"}`}
                  >
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-mist text-ink/70"><Icon size={16} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm">{n.message}</span>
                      <span className="mt-0.5 block text-xs text-ink/50">{timeAgo(n.createdAt)}</span>
                    </span>
                    {!n.read && <span aria-label="Unread" className="mt-2 size-2 shrink-0 rounded-full bg-rose-500" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
