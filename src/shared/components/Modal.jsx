import { useEffect } from "react";
import { X } from "lucide-react";
import IconButton from "./IconButton";

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
        className="pop-in max-h-[92vh] w-full overflow-y-auto rounded-t-[28px] bg-surface p-6 shadow-2xl sm:max-w-lg sm:rounded-[28px]"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl font-extrabold">{title}</h2>
          <IconButton label="Close" onClick={onClose}>
            <X size={20} />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
}
