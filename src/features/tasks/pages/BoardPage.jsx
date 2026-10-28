import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { ArrowLeft, ClipboardList, FolderX, Plus, SearchX } from "lucide-react";
import Button from "../../../shared/components/Button";
import EmptyState from "../../../shared/components/EmptyState";
import Modal from "../../../shared/components/Modal";
import UserMenu from "../../auth/components/UserMenu";
import FilterBar from "../../filters/components/FilterBar";
import { resetFilters } from "../../filters/filterSlice";
import MembersModal from "../../projects/components/MembersModal";
import { isOwner as checkOwner } from "../../projects/permissions";
import BoardHeader from "../components/BoardHeader";
import TaskColumn from "../components/TaskColumn";
import TaskForm from "../components/TaskForm";
import { STATUSES } from "../constants";
import { sortTasks } from "../taskSort";
import { createTask, saveTask } from "../taskThunks";

export default function BoardPage() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const me = useSelector((s) => s.auth.user);
  const users = useSelector((s) => s.users);
  // Only members can open a project; everyone else sees "not found".
  const project = useSelector((s) => s.projects.find((p) => p.id === projectId && p.memberIds.includes(s.auth.user?.id)));
  const allTasks = useSelector((s) => s.tasks);
  const { search, priority, status, assignee, sort } = useSelector((s) => s.filters);
  const [modal, setModal] = useState(null); // { task?, status? }
  const [showMembers, setShowMembers] = useState(false);

  // Filters belong to one board; start fresh when leaving it.
  useEffect(() => () => { dispatch(resetFilters()); }, [dispatch, projectId]);

  const tasks = useMemo(() => allTasks.filter((t) => t.projectId === projectId), [allTasks, projectId]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const matches = tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(query) &&
        (priority === "all" || t.priority === priority) &&
        (status === "all" || t.status === status) &&
        (assignee === "all" || t.assigneeId === me?.id)
    );
    return sortTasks(matches, sort);
  }, [tasks, search, priority, status, assignee, sort, me?.id]);

  if (!project) {
    return (
      <main className="mx-auto max-w-7xl space-y-16 px-4 py-10 sm:px-8">
        {/* Keep the menu here so people still see why (e.g. "removed you from…"). */}
        <div className="flex justify-end"><UserMenu /></div>
        <EmptyState icon={FolderX} title="Project not found" text="It may have been deleted, or you're not a member.">
          <Link to="/projects" className="rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-on-ink">Back to projects</Link>
        </EmptyState>
      </main>
    );
  }

  const isOwner = checkOwner(project, me);
  const owner = users.find((u) => u.id === project.ownerId);
  const members = project.memberIds.map((id) => users.find((u) => u.id === id)).filter(Boolean);
  const columns = status === "all" ? STATUSES : STATUSES.filter((s) => s.value === status);
  const closeModal = () => setModal(null);
  const openNew = (statusValue = "todo") => setModal({ status: statusValue });

  const handleSave = (data) => {
    const clean = { ...data, title: data.title.trim(), description: data.description.trim(), assigneeId: data.assigneeId || null };
    dispatch(modal.task ? saveTask({ ...clean, id: modal.task.id }) : createTask({ ...clean, projectId }));
    closeModal();
  };

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-8">
      <div className="flex items-center justify-between">
        <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-sm font-semibold ring-1 ring-ink/10 transition hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-ink">
          <ArrowLeft size={16} /> All projects
        </Link>
        <UserMenu />
      </div>

      <BoardHeader project={project} tasks={tasks} members={members} owner={owner} isOwner={isOwner} onAdd={() => openNew()} onMembers={() => setShowMembers(true)} />

      {tasks.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No tasks in this project yet"
          text={isOwner ? "Add your first task and it will show up in the Todo column." : "The project owner hasn't added any tasks yet."}
        >
          {isOwner && <Button onClick={() => openNew()}><Plus size={18} /> Create your first task</Button>}
        </EmptyState>
      ) : (
        <>
          <FilterBar />
          {filtered.length === 0 ? (
            <EmptyState icon={SearchX} title="No matching tasks" text="Try a different title or loosen the filters.">
              <Button variant="ghost" onClick={() => dispatch(resetFilters())}>Clear filters</Button>
            </EmptyState>
          ) : (
            <div className={`grid gap-5 ${columns.length === 1 ? "max-w-xl" : "md:grid-cols-3"}`}>
              {columns.map((col) => (
                <TaskColumn
                  key={col.value}
                  status={col}
                  tasks={filtered.filter((t) => t.status === col.value)}
                  canAdd={isOwner}
                  onAdd={openNew}
                  onEdit={(task) => setModal({ task })}
                />
              ))}
            </div>
          )}
        </>
      )}

      {modal && (
        <Modal title={modal.task ? "Edit task" : "New task"} onClose={closeModal}>
          <TaskForm task={modal.task} members={members} defaultStatus={modal.status} onSubmit={handleSave} onCancel={closeModal} />
        </Modal>
      )}
      {showMembers && <MembersModal project={project} canManage={isOwner} onClose={() => setShowMembers(false)} />}
    </main>
  );
}
