import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import Button from "../../../shared/components/Button";
import IconButton from "../../../shared/components/IconButton";
import { hideToast } from "../toastSlice";

const DURATION = 6000;

export default function ToastHost() {
  const dispatch = useDispatch();
  const toast = useSelector((s) => s.toast);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => dispatch(hideToast()), DURATION);
    return () => clearTimeout(timer);
  }, [toast, dispatch]);

  if (!toast) return null;

  const undo = () => {
    dispatch(toast.action);
    dispatch(hideToast());
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div
        key={toast.id}
        role="status"
        className="pop-in pointer-events-auto relative flex max-w-md items-center gap-3 overflow-hidden rounded-2xl bg-ink py-3 pl-5 pr-3 text-sm text-on-ink shadow-xl"
      >
        <span className="min-w-0 flex-1 truncate">{toast.message}</span>
        {toast.action && <Button variant="ghost" className="px-3! py-1.5!" onClick={undo}>{toast.actionLabel ?? "Undo"}</Button>}
        <IconButton label="Dismiss" onClick={() => dispatch(hideToast())} className="text-on-ink/60 hover:bg-on-ink/10! hover:text-on-ink!">
          <X size={16} />
        </IconButton>
        <span className="toast-timer absolute bottom-0 left-0 h-1 w-full bg-on-ink/30" style={{ animationDuration: `${DURATION}ms` }} />
      </div>
    </div>
  );
}
