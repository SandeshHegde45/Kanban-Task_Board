import { useState } from "react";
import { useDispatch } from "react-redux";
import { Plus } from "lucide-react";
import IconButton from "../../../shared/components/IconButton";
import TaskCard from "./TaskCard";
import { changeTaskStatus } from "../taskThunks";

export default function TaskColumn({ status, tasks, canAdd, onAdd, onEdit }) {
  const dispatch = useDispatch();
  const [isOver, setIsOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const id = e.dataTransfer.getData("text/plain");
    if (id) dispatch(changeTaskStatus({ id, status: status.value })); // the thunk checks permission
  };

  return (
    <section
      aria-label={status.label}
      onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
      onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setIsOver(false); }}
      onDrop={handleDrop}
      className={`flex min-h-64 flex-col rounded-[28px] p-4 transition ${status.column} ${isOver ? "ring-2 ring-ink ring-offset-2 ring-offset-mist" : ""}`}
    >
      <header className="mb-4 flex items-center justify-between px-1">
        <h2 className="flex items-center gap-2 font-display text-lg font-extrabold">
          <span className={`size-2.5 rounded-full ${status.dot}`} />
          {status.label}
          <span className="rounded-full bg-surface/70 px-2 py-0.5 font-sans text-xs font-semibold">{tasks.length}</span>
        </h2>
        {canAdd && (
          <IconButton label={`Add task to ${status.label}`} onClick={() => onAdd(status.value)} className="bg-surface/70">
            <Plus size={18} />
          </IconButton>
        )}
      </header>

      <div className="flex flex-1 flex-col gap-3">
        {tasks.length ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} onEdit={onEdit} />)
        ) : (
          <p className="grid flex-1 place-items-center rounded-[18px] border-2 border-dashed border-ink/15 p-6 text-center text-sm text-ink/50">
            No tasks here.
          </p>
        )}
      </div>
    </section>
  );
}
