# Kanban Task Board

A lightweight Kanban workflow app built with Vite + React, Redux Toolkit, React Router, and modern component-based UI design. The project is structured around multiple workspaces/projects, task management, filters, notifications, and a mock authentication flow with local persistence.

## Overview

This app lets users:

- create and manage multiple projects
- organize tasks across Kanban columns
- assign tasks to team members
- filter and sort tasks
- receive project/task notifications
- switch between light and dark themes
- persist data locally in the browser using LocalStorage

The app is designed as a frontend-focused project management dashboard and is meant to be extended with a real backend later.

## Tech Stack

- React 19
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS v4
- React Hook Form
- Lucide React
- LocalStorage-based persistence for demo data

## Features

- Project dashboard with create/edit/delete actions
- Individual Kanban board per project
- Task creation, editing, deletion, and movement between columns
- Member/assignee-aware task flows
- Filter bar for search and status-based task filtering
- Sort options for prioritized task viewing
- Notification center and unread notification tracking
- Theme toggle with light/dark mode
- Client-side auth flow (login/register mock session)
- Undo support for task deletions via toast actions
- Responsive, modern UI for desktop and smaller screens

## Project Structure

```text
src/
  app/
    store.js                   Redux store and persistence wiring
  routes/
    AppRoute.jsx               Route definitions and guards
    ProtectedRoute.jsx
    PublicRoute.jsx
  features/
    auth/                      login/register flow, mock auth service, user menu
    filters/                   filter state and filter UI
    notifications/             notifications slice and components
    projects/                  project logic, selectors, pages, cards, forms
    tasks/                     kanban board logic, task columns/cards, sorting
    theme/                     theme state and persistence
    toast/                     toast host and undo actions
    users/                     user/member data
    workspace/                 seed data and migration helpers
  shared/
    components/                reusable UI primitives
    utils/                    validation and date utilities
```

## App Behavior

- Redux keeps app state centralized and reactive.
- Tasks, projects, and notifications are saved to LocalStorage when state changes.
- The app boots with demo/project seed data on first visit.
- Auth is mocked through a local session layer in `features/auth/authService.js`.
- Each user account keeps its own task data in the browser, while shared project/task lists can be viewed across accounts on the same device.
- Project ownership and task assignment rules are enforced in thunks and mirrored in the UI.

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

This starts the Vite development server, usually at:

```text
http://localhost:5173
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Typical Usage

1. Register or log in with a local mock account.
2. Create a new project from the dashboard.
3. Open the project board and create tasks in columns like To Do, In Progress, and Done.
4. Edit task details, assign members, and move tasks across columns.
5. Use filters and sorting to focus on specific tasks.
6. Toggle dark mode from the interface as needed.

## Notes

- This is a frontend-first demonstration app.
- Authentication and persistence are intentionally simple and local to the browser.
- To connect the app to a real backend, replace the mock auth service and update the local persistence layer with API calls.

## Development Notes (from the project)

- Redux holds tasks and filters; filtered lists are derived, not stored.
- The store subscribes once and writes app data to LocalStorage on change.
- Drag and drop uses native HTML5 drag events with touch-friendly arrow controls.
- Sorting is handled through a pure helper in `features/tasks/taskSort.js`.
- Dark mode applies a `dark` class to the root HTML element and uses design tokens for theming.
- Undo actions for task deletion are implemented via a toast system.

## License

This project is a demonstration / learning project and does not include a formal production license unless added later.
