import { Plus } from "lucide-react";
import AvatarStack from "../../../shared/components/AvatarStack";
import Button from "../../../shared/components/Button";
import { getProjectColor } from "../../projects/constants";
import { STATUSES } from "../constants";

export default function BoardHeader({ project, tasks, members, owner, isOwner, onAdd, onMembers }) {
  const total = tasks.length;
  const count = (status) => tasks.filter((t) => t.status === status).length;
  const color = getProjectColor(project.color);

  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="w-full max-w-xl">
        <div className="flex items-center gap-4">
          <span className={`grid size-12 shrink-0 place-items-center rounded-2xl font-display text-xl font-extrabold text-white ${color.tile}`}>
            {project.name.charAt(0).toUpperCase()}
          </span>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{project.name}</h1>
        </div>
        {project.description && <p className="mt-3 text-ink/70">{project.description}</p>}
        <p className="mt-2 text-sm text-ink/60">
          {total ? `${count("completed")} of ${total} tasks completed` : "No tasks yet"}
        </p>
        {!isOwner && owner && (
          <p className="mt-1 text-sm text-ink/60">Owned by {owner.name}. You can update the status of tasks assigned to you.</p>
        )}
        {total > 0 && (
          <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-surface ring-1 ring-ink/10" role="img" aria-label="Task progress by status">
            {STATUSES.map((s) => (
              <div key={s.value} className={`${s.bar} transition-all duration-500`} style={{ width: `${(count(s.value) / total) * 100}%` }} />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={onMembers}>
          <AvatarStack users={members} /> Members ({members.length})
        </Button>
        {isOwner && (
          <Button onClick={onAdd}>
            <Plus size={18} /> New task
          </Button>
        )}
      </div>
    </header>
  );
}
