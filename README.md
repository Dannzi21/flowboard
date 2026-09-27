# Flowboard

A focused Kanban board for small projects.

A small, approachable portfolio project built with HTML, CSS, and modern JavaScript. No dependencies, API keys, or account required. The ready-to-open HTML is included.

## Features

- Create and edit tasks with three priority levels.
- Move tasks between To do, In progress, and Done using keyboard-friendly controls.
- Search, filter, delete, and undo the most recent deletion.
- Responsive layouts, labeled forms, visible keyboard focus, and local browser storage.
- Optional sample data; the app starts empty.

## Quick preview

Download `public/index.html` and open it in a modern browser. The styling and app code are embedded, so this single file works on its own. For reliable browser storage and PWA installation, use the local server below.

## Run locally

Install Node.js 22 or newer, then run:

```sh
git clone https://github.com/Dannzi21/flowboard.git
cd flowboard
npm start
```

Open **http://localhost:3000**. No `npm install` is needed. Stop the server with Ctrl+C. To run multiple projects together, set the `PORT` environment variable to a different number for each server.

## Tests

```sh
npm test
```

Tests use Node’s built-in runner. GitHub Actions runs them on pushes and pull requests.

## Project structure

- `public/index.html` — semantic page structure
- `public/styles.css` — responsive visual design
- `public/app.js` — events, rendering, and UI state
- `public/domain.js` — testable business rules
- `public/common.js` — storage and safe text rendering
- `test/domain.test.js` — meaningful edge-case tests
- `server.mjs` — a minimal local development server

## How it works

Tasks are plain objects with stable IDs. Pure functions handle filtering and status changes; the UI saves the resulting array after each change.

User text is escaped before HTML rendering. Saved data is validated before use. Storage errors are surfaced in the interface.

## Data and limitations

Data stays in localStorage for this browser and origin. There is no backend, login, cloud sync, or analytics. Clearing browser data deletes records. Different devices do not share records, and simultaneous tabs are not synchronized. The local server binds to your own computer only and is intended for development.

## Put it online

Deploy the contents of `public/` to any static HTTPS host. All asset links are relative, so subdirectory hosting works too. Do not deploy `server.mjs` as a production backend.

## Make it your own

- Add due dates and sorting.
- Add drag-and-drop while preserving the accessible status dropdown.

Read the tests alongside `domain.js` to understand the rules before extending them.

## Development note

Created with AI assistance as a learning and portfolio starter. Review, customize, and understand the code before presenting it in an interview.

## Editing the design or behavior

Edit `public/styles.css`, `public/app.js`, `public/common.js`, or `public/domain.js`, then run `npm run build` to refresh the embedded assets in `public/index.html`. The build uses Node only and preserves the page markup. Run `npm test` after changing behavior.
