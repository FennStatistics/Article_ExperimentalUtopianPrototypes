# Agent Guide for pretestVignettes

## Project overview
- This repo is a static lab.js study delivered by `index.html` and `study.js`.
- There is no build system or package manager in this folder.
- Core study flow lives in `study.js` and uses lab.js components and jQuery.
- Text blocks and HTML templates live in `src/js/content/texts.js`.
- Survey scale data and helper utilities live in `src/js/content/surveyScales.js`.
- Affective imagery task logic lives in `src/js/content/AIT_AT.js`.
- Styles are in `src/css/style.css` (plus vendor `src/css/toastrmin.css`).
- Additional libraries are loaded from `lib/` and `src/js/additional libraries/`.

## Build, lint, test commands
- Build: not configured (static HTML + JS).
- Lint: not configured.
- Tests: not configured.

## Run locally (manual test)
- Preferred: run a local server to avoid file:// restrictions.
- Command: `python3 -m http.server 8000`
- Open: `http://localhost:8000/index.html`
- If you must open the file directly, open `index.html`, but note browser security limits can block `fetch`.

## Running a single test or screen
- There is no automated test runner.
- To test a single screen, temporarily limit `content` in `study.js` to only the component under test.
- Alternative: keep `lab.plugins.Debug()` enabled and use its UI to skip forward.
- To test a specific vignette condition without JATOS, temporarily set `futureSocietyCondition` in `study.js`.
- Revert any temporary testing edits before finalizing changes.

## Code style and conventions
- Language: plain browser JavaScript (no bundler, no modules).
- Indentation: 2 spaces; keep existing formatting style.
- Strings: mostly double quotes; keep existing string quote style in each file.
- Semicolons are used; keep them.
- Prefer `const` and `let` for new code, but do not refactor existing `var` globals unless required.
- Keep global variables at top of files; these are relied on across scripts.
- Avoid renaming IDs, classes, or `name` fields in HTML strings unless also updating selectors.

## Imports and script order
- Script tags are ordered in `index.html` and are significant.
- `texts.js`, `surveyScales.js`, and `AIT_AT.js` are loaded before `study.js`.
- If adding new scripts, include them before `study.js` if `study.js` depends on them.
- Avoid introducing module imports; keep scripts as global browser files.

## HTML and text content rules
- Use template literals for large HTML blocks (see `src/js/content/texts.js`).
- Keep inline styles consistent with existing markup when editing text blocks.
- Preserve `id` values used by `study.js` and `AIT_AT.js` (`#continue`, `#protoAssignForm`, `#cueWord`, etc.).
- For new text blocks, add them to `textObj` in `src/js/content/texts.js` and reference from `study.js`.

## Lab.js patterns
- Components are created with `lab.html.Form`, `lab.html.Page`, or `lab.html.Screen`.
- Use `messageHandlers` with `run`, `commit`, `end`, or `epilogue` to hook behavior.
- Progress bar is updated via `numElementsCounter` and `.progress-bar` in `study.js`.
- Data is stored via `study.options.datastore.set` and exported with `exportJson()`.
- If JATOS is present, data is submitted in `commit` handlers.

## jQuery and DOM usage
- jQuery is available globally as `$` (loaded in `index.html`).
- Prefer jQuery for DOM queries and event binding to match existing code.
- Use delegated events when HTML is injected or dynamically created.
- When using jQuery UI widgets, check `$.fn` existence before calling.

## Types and data handling
- There is no TypeScript; use runtime guards and simple checks.
- Keep data structures plain (arrays and objects) for datastore export.
- Use stable keys in `study.options.datastore.set` to avoid breaking analysis scripts.

## Naming conventions
- Component variables are `PascalCase_htmlForm` or similar (`Greetings_htmlForm`).
- Helper functions are `camelCase` (`continueornot`, `shuffle`).
- Global booleans use `bool` or descriptive names (existing style).

## Error handling and user feedback
- Use `alert()` for blocking validation errors (as current code does).
- Use `toastr.warning` for non-blocking validation feedback in AIT tasks.
- Avoid throwing errors in handlers that would halt the study flow.
- When adding external requests, wrap in `try/catch` and log failures.

## Logging
- Console logging is used extensively; keep logs concise.
- Avoid removing important logs that document data submission or flow control.

## CSS conventions
- Styles are plain CSS in `src/css/style.css`.
- Keep selectors stable; many are referenced by ID from HTML strings.
- Prefer class-based styling for new components; reserve IDs for behaviors.
- Avoid introducing CSS frameworks; extend existing style file.

## Assets and external libraries
- `lib/` contains lab.js and lab.css.
- `src/js/additional libraries/` contains jatos, jQuery, jQuery UI, toastr.
- Do not upgrade or replace vendor files unless explicitly requested.

## Data privacy and external calls
- `study.js` currently calls external IP and location services.
- If editing these calls, keep user consent and study ethics in mind.
- Avoid adding new external endpoints without a clear need.

## Cursor and Copilot rules
- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` found in this repo.

## Common edit locations
- Study flow sequence: `study.js`.
- Page text and HTML templates: `src/js/content/texts.js`.
- Survey item pools: `src/js/content/surveyScales.js`.
- AIT task logic: `src/js/content/AIT_AT.js`.
- Styling: `src/css/style.css`.
