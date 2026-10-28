import { Routes, Route, Link, Navigate } from "react-router";
import { SearchX } from "lucide-react";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ProjectsPage from "../features/projects/pages/ProjectsPage";
import BoardPage from "../features/tasks/pages/BoardPage";
import EmptyState from "../shared/components/EmptyState";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-4">
      <EmptyState icon={SearchX} title="Page not found" text="This page doesn't exist.">
        <Link to="/" className="rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-on-ink">
          Back to projects
        </Link>
      </EmptyState>
    </main>
  );
}

export default function AppRoute() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<BoardPage />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
