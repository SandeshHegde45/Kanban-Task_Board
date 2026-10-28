import { useDispatch, useSelector } from "react-redux";
import { CalendarDays, ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import Avatar from "../../../shared/components/Avatar";
import IconButton from "../../../shared/components/IconButton";
import { formatDate, getDueState } from "../../../shared/utils/date";
import { canProgress, isOwner } from "../../projects/permissions";
import { STATUSES, getPriority } from "../constants";
import { changeTaskStatus, removeTask } from "../taskThunks";

const dueStyles = {
  overdue: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  today: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  upcoming: "bg-ink/5 text-ink/60",
  done: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
};

export default function TaskCard({ task, onEdit }) {
  const dispatch = useDispatch();
  const me = useSelector((s) => s.auth.user);
  const project = useSelector((s) => s.projects.find((p) => p.id === task.projectId));
  const assignee = useSelector((s) => s.users.find((u) => u.id === task.assigneeId));

  const canManage = isOwner(project, me); // edit, delete
  const canMove = canProgress(project, task, me); // drag and arrows

  const index = STATUSES.findIndex((s) => s.value === task.status);
  const prev = STATUSES[index - 1];
  const next = STATUSES[index + 1];
  const priority = getPriority(task.priority);
  const isDone = task.status === "completed";
  const due = isDone ? "done" : getDueState(task.dueDate);
  const dueLabel = due === "overdue" ? `Overdue ${formatDate(task.dueDate)}` : due === "today" ? "Due today" : formatDate(task.dueDate);
  const move = (s) => dispatch(changeTaskStatus({ id: task.id, status: s.value }));

  return (
    <article
      draggable={canMove}
      onDragStart={(e) => e.dataTransfer.setData("text/plain", task.id)}
      className={`rounded-[18px] bg-surface p-4 shadow-sm ring-1 ring-ink/5 transition hover:shadow-md ${canMove ? "cursor-grab active:cursor-grabbing" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${priority.chip}`}>
          <span className={`size-1.5 rounded-full ${priority.dot}`} />
          {priority.label}
        </span>
        {canManage && (
          <div className="flex text-ink/40">
            <IconButton label="Edit task" onClick={() => onEdit(task)}><Pencil size={16} /></IconButton>
            <IconButton label="Delete task" onClick={() => dispatch(removeTask(task.id))} className="hover:text-rose-600!"><Trash2 size={16} /></IconButton>
          </div>
        )}
      </div>

      <h3 className={`mt-3 font-display text-lg font-extrabold leading-snug ${isDone ? "text-ink/50 line-through decoration-ink/30" : ""}`}>
        {task.title}
      </h3>
      {task.description && <p className="mt-1 line-clamp-2 text-sm text-ink/60">{task.description}</p>}

      {assignee && (
        <div className="mt-3 flex items-center gap-2 text-xs text-ink/60">
          <Avatar user={assignee} className="size-5 text-[10px]" />
          {assignee.id === me.id ? "Assigned to you" : assignee.name}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${dueStyles[due]}`}>
          <CalendarDays size={13} /> {dueLabel}
        </span>
        {canMove && (
          <div className="flex gap-1 text-ink/50">
            {prev && <IconButton label={`Move to ${prev.label}`} onClick={() => move(prev)} className="ring-1 ring-ink/10"><ChevronLeft size={16} /></IconButton>}
            {next && <IconButton label={`Move to ${next.label}`} onClick={() => move(next)} className="ring-1 ring-ink/10"><ChevronRight size={16} /></IconButton>}
          </div>
        )}
      </div>
    </article>
  );
}
