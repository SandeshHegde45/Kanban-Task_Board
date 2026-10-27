# Kanban Task Board (v1.5.0)

Vite + React, Tailwind CSS v4, React Router, React Hook Form, Redux Toolkit, lucide-react.

## Run
    npm install
    npm run dev

## Structure
    src/
      app/store.js                  Redux store + LocalStorage sync
      routes/                       AppRoute (route table), ProtectedRoute, PublicRoute
      features/users/               directory of accounts (for members and assignees)
      features/notifications/       slice, NotificationBell, announceUnread
      features/workspace/           seed data + one-time legacy migration
      features/toast/               toastSlice + ToastHost (undo)
      features/theme/               themeSlice, storage, ThemeToggle
      features/projects/            projectSlice, storage, ProjectsPage, ProjectCard, ProjectForm
      features/auth/                authService (mock backend), authSlice, Login/Register pages, UserMenu
      shared/                       Button, IconButton, Modal, EmptyState, SegmentedControl, date utils
      features/tasks/               slice, storage, constants, BoardPage (/projects/:projectId), TaskColumn, TaskCard, TaskForm, BoardHeader
      features/filters/             slice + FilterBar

## Decisions
- Redux holds tasks and filters. Filtered lists are derived with useMemo, never stored.
- The store subscribes once and writes tasks to LocalStorage on change.
- Drag and drop uses native HTML5 events. Arrow buttons cover touch devices.
- First visit shows sample tasks; after that LocalStorage is the source of truth.
- Auth is a LocalStorage mock in `features/auth/authService.js`. Replace its four functions (`register`, `login`, `logout`, `getSession`) with API calls and nothing else changes.
- Tasks are stored per user id, so two accounts on one browser never see each other's boards.
- Tasks carry a `projectId`. Projects and tasks are two slices; deleting a project is handled by the task slice via `extraReducers`.
- Undo: `removeTask` (a thunk) deletes the task, then shows a toast whose `action` is a plain `restoreTask` action holding the task and its index. Only one toast shows at a time.
- Dark mode: a `dark` class on `<html>` swaps CSS variables; components use `ink`, `mist` and `surface` tokens. A small inline script in `index.html` sets the class before first paint.
- Sorting: `sortTasks` (features/tasks/taskSort.js) is a pure function applied after filtering. The chosen sort lives in the filters slice, so it survives clearing filters and switching projects, but not a page refresh.
- Collaboration is a LocalStorage mock: projects, tasks and notifications are shared lists, so every account on the same browser can collaborate. Syncing across devices needs a real backend.
- Rules (owner manages, assignee moves their own tasks) are enforced in the thunks (`taskThunks`, `projectThunks`) and mirrored in the UI by hiding controls. With a backend the same checks must also run on the server.
