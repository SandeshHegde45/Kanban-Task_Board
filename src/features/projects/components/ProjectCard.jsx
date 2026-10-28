import { useSelector } from "react-redux";
import { Link } from "react-router";
import { Pencil, Trash2 } from "lucide-react";
import AvatarStack from "../../../shared/components/AvatarStack";
import IconButton from "../../../shared/components/IconButton";
import { getProjectColor } from "../constants";
import { isOwner } from "../permissions";

export default function ProjectCard({ project, tasks, onEdit, onDelete }) {
  const me = useSelector((s) => s.auth.user);
  const users = useSelector((s) => s.users);
  const members = project.memberIds.map((id) => users.find((u) => u.id === id)).filter(Boolean);

  const owner = isOwner(project, me);
  const done = tasks.filter((t) => t.status === "completed").length;
  const mine = tasks.filter((t) => t.assigneeId === me.id && t.status !== "completed").length;
  const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const color = getProjectColor(project.color);

  return (
    <article className="relative flex flex-col rounded-[28px] bg-surface p-6 shadow-sm ring-1 ring-ink/5 transition hover:shadow-md focus-within:ring-2 focus-within:ring-ink">
      <div className="flex items-start justify-between">
        <span className={`grid size-12 place-items-center rounded-2xl font-display text-xl font-extrabold text-white ${color.tile}`}>
          {project.name.charAt(0).toUpperCase()}
        </span>
        <div className="relative z-10 flex items-center gap-1 text-ink/40">
          {owner ? (
            <>
              <IconButton label="Edit project" onClick={() => onEdit(project)}><Pencil size={16} /></IconButton>
              <IconButton label="Delete project" onClick={() => onDelete(project)} className="hover:text-rose-600!"><Trash2 size={16} /></IconButton>
            </>
          ) : (
            <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-ink/60">Member</span>
          )}
        </div>
      </div>

      <h2 className="mt-4 font-display text-xl font-extrabold">
        {/* The link stretches over the whole card; the action buttons sit above it. */}
        <Link to={`/projects/${project.id}`} className="outline-none after:absolute after:inset-0 after:rounded-[28px]">
          {project.name}
        </Link>
      </h2>
      <p className="mt-1 line-clamp-2 min-h-10 text-sm text-ink/60">{project.description || "No description"}</p>

      <div className="mt-5">
        <div className="h-2 overflow-hidden rounded-full bg-mist">
          <div className={`h-full rounded-full transition-all duration-500 ${color.tile}`} style={{ width: `${percent}%` }} />
        </div>
        <p className="mt-2 text-xs text-ink/60">{tasks.length ? `${done} of ${tasks.length} tasks done` : "No tasks yet"}</p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <AvatarStack users={members} />
        {mine > 0 && (
          <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
            {mine} assigned to you
          </span>
        )}
      </div>
    </article>
  );
}
