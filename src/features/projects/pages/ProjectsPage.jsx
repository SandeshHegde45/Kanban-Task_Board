import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FolderPlus, Plus } from "lucide-react";
import Button from "../../../shared/components/Button";
import ConfirmDialog from "../../../shared/components/ConfirmDialog";
import EmptyState from "../../../shared/components/EmptyState";
import Modal from "../../../shared/components/Modal";
import UserMenu from "../../auth/components/UserMenu";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import { selectMyProjects } from "../projectSelectors";
import { createProject, removeProject, saveProject } from "../projectThunks";

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const projects = useSelector(selectMyProjects);
  const allTasks = useSelector((s) => s.tasks);
  const projectIds = new Set(projects.map((p) => p.id));
  const tasks = allTasks.filter((t) => projectIds.has(t.projectId)); // only tasks in my projects
  const [modal, setModal] = useState(null); // { project? } for the form
  const [toDelete, setToDelete] = useState(null);

  const tasksOf = (projectId) => tasks.filter((t) => t.projectId === projectId);
  const closeModal = () => setModal(null);

  const handleSave = (data) => {
    const clean = { ...data, name: data.name.trim(), description: data.description.trim() };
    dispatch(modal.project ? saveProject({ ...clean, id: modal.project.id }) : createProject(clean));
    closeModal();
  };

  const handleDelete = () => {
    dispatch(removeProject(toDelete.id));
    setToDelete(null);
  };

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-8">
      <div className="flex justify-end">
        <UserMenu />
      </div>

      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Your projects</h1>
          <p className="mt-2 text-ink/60">
            {projects.length
              ? `${projects.length} ${projects.length === 1 ? "project" : "projects"} with ${tasks.length} ${tasks.length === 1 ? "task" : "tasks"} in total`
              : "Each project gets its own Kanban board."}
          </p>
        </div>
        <Button onClick={() => setModal({})}><Plus size={18} /> New project</Button>
      </header>

      {projects.length === 0 ? (
        <EmptyState icon={FolderPlus} title="No projects yet" text="Create a project to start adding tasks to its board.">
          <Button onClick={() => setModal({})}><Plus size={18} /> Create your first project</Button>
        </EmptyState>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} tasks={tasksOf(project.id)} onEdit={(p) => setModal({ project: p })} onDelete={setToDelete} />
          ))}
          <button
            type="button"
            onClick={() => setModal({})}
            className="grid min-h-48 place-items-center rounded-[28px] border-2 border-dashed border-ink/15 text-sm font-semibold text-ink/60 transition hover:border-ink/40 hover:text-ink focus-visible:outline-2 focus-visible:outline-ink"
          >
            <span className="flex items-center gap-2"><Plus size={18} /> New project</span>
          </button>
        </div>
      )}

      {modal && (
        <Modal title={modal.project ? "Edit project" : "New project"} onClose={closeModal}>
          <ProjectForm project={modal.project} onSubmit={handleSave} onCancel={closeModal} />
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete project?"
          text={`"${toDelete.name}" and its ${tasksOf(toDelete.id).length} tasks will be removed. This can't be undone.`}
          confirmLabel="Delete project"
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </main>
  );
}
