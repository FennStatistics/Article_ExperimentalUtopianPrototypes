# Agent Guide for pretestVignettes

Scope: this file documents the runnable lab.js study in `Online Study Files/pretestVignettes/`.
Repo-wide conventions (Analyses, encoding gotchas, etc.) are in `AGENTS.md` at repo root.

## Project overview
- Static lab.js study delivered by `index.html` and `study.js`.
- No build system, bundler, or package manager in this folder.
- Study flow is composed in `study.js` using lab.js components defined in phase files.
- Text + UI HTML lives inside each phase file as template literals.
- AIT logic and screens are in `src/js/phases/ait.js` (no separate module file).
- Survey item pools and helper data live in `src/js/content/surveyScales.js`.
- Global flags (local testing + required responses) live in `src/js/globals.js`.
- Styles are in `src/css/style.css` (plus vendor `src/css/toastrmin.css`).
- Additional libraries load from `lib/` and `src/js/additional libraries/`.
- Analysis outputs and study data live in `analysis_pretestVignettes/`.

## Key file layout
- `index.html`: script order, library includes, base markup, progress bar.
- `src/js/globals.js`: `localTesting`, `Required_Testing` flags.
- `study.js`: global vars + `lab.flow.Sequence` assembly + start logic.
- `src/js/phases/intro.js`: consent + onboarding screens.
- `src/js/phases/scenario.js`: vignette text + condition handling.
- `src/js/phases/ait.js`: AIT instructions, task, loops, rating screen.
- `src/js/phases/scales.js`: survey scales and prototype assignment.
- `src/js/phases/ending.js`: feedback + ending/redirect.
- `src/js/paradata/paradata_focus.js`: focus/defocus tracking.
- `src/js/paradata/paradata_general.js`: general paradata (clipboard/mouse/scroll/typing timing).
- `analysis_pretestVignettes/`: analysis outputs and stored study data.

## Build, lint, test commands
- Build: not configured (static HTML + JS).
- Lint: not configured.
- Tests: not configured.

## Run locally (manual test)
- Preferred: run a local server to avoid `file://` restrictions.
- From this folder:
  - `python3 -m http.server 8000`
  - Open `http://localhost:8000/index.html`
- From repo root:
  - `python3 -m http.server 8000`
  - Open `http://localhost:8000/Online%20Study%20Files/pretestVignettes/index.html`

## Running a single test or screen
- No automated test runner.
- To test a single screen, temporarily limit `content` in `study.js` to only the component under test.
- Alternative: keep `lab.plugins.Debug()` enabled and use its UI to skip forward.
- To test a specific vignette condition locally, set `futureSocietyCondition` in `study.js`.
- Revert any temporary testing edits before finalizing changes.

## Globals and configuration
- `src/js/globals.js` defines:
  - `localTesting`: `true` locally, set to `false` on JATOS.
  - `Required_Testing`: `true` to force required responses, `false` to relax.
- JATOS calls are guarded with: `!localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function"`.
- Do not redeclare these flags elsewhere (avoid ReferenceError and shadowing).

## Script order and imports
- Script tags in `index.html` are significant.
- Phase scripts are loaded with `defer`; jQuery/JATOS/toastr are loaded as classic scripts.
- Avoid ES module imports; scripts must stay global browser JS.
- If adding a new phase file, include it before `study.js`.

## HTML and text content rules
- Use template literals for large HTML blocks inside phase files.
- Preserve `id` and `name` attributes used by selectors or lab.js.
- Avoid changing form `id`s and `name`s unless you update all selectors.

## Lab.js patterns
- Components are created with `lab.html.Form`, `lab.html.Page`, or `lab.html.Screen`.
- Use `messageHandlers` (`run`, `commit`, `end`, `epilogue`) for behavior.
- Progress bar updates use `numElementsCounter` and `.progress-bar`.
- Data is stored with `study.options.datastore.set` and exported via `exportJson()`.
- Avoid async work inside `commit` that can block screen transitions.

## AIT task specifics
- AIT globals live in `src/js/phases/ait.js`; edit with care (loops depend on shared state).
- Outer/inner loops are controlled by `loopOuter` and `loopInner`.
- `updateParams_outer` stores successful/unsuccessful associations to the datastore.
- Instruction text is injected via `currenText` and `#replaceInstructions`.

## JavaScript style and formatting
- Language: plain browser JavaScript, no TypeScript.
- Indentation: 2 spaces; semicolons are used.
- Strings: mostly double quotes; keep local file style.
- Prefer `const`/`let` for new code; do not refactor existing `var` globals unless required.

## Naming conventions
- Component variables use `PascalCase_htmlForm` / `PascalCase_htmlScreen`.
- Helper functions use `camelCase`.
- Global booleans use `bool` prefix or descriptive names.
- Datastore keys should stay stable.

## Error handling and user feedback
- Use `alert()` for blocking validation errors (existing pattern).
- Use `toastr.warning` for non-blocking validation in AIT tasks.
- Avoid throwing errors in message handlers; they can halt study flow.

## CSS conventions
- Styles are plain CSS in `src/css/style.css`.
- Keep selectors stable; some are referenced by ID from HTML strings.
- Prefer class-based styling for new UI; reserve IDs for behavior.

## Vendor libraries
- `lib/` and `src/js/additional libraries/` are vendor code; do not edit unless explicitly requested.

## Data and templates
- Raw data lives only in `analysis_pretestVignettes/01_dataPreperation/data/`; do not edit or commit raw data unless explicitly requested.
- `../templates/` is legacy/template code from an older study; treat as reference only.

## Cursor and Copilot rules
- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` found.
