
# Agent Guide for pretestVignettes

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

## Build, lint, test commands
- Build: not configured (static HTML + JS).
- Lint: not configured.
- Tests: not configured.

## Run locally (manual test)
- Preferred: run a local server to avoid file:// restrictions.
- Command: `python3 -m http.server 8000`
- Open: `http://localhost:8000/index.html`
- Direct `file://` open can block `fetch` and JATOS logic.

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
- Current order (simplified):
  1) `lib/lab.js`
  2) `src/js/globals.js`
  3) `src/js/content/surveyScales.js`
  4) `src/js/phases/*.js`
  5) `study.js`
  6) vendor libs + CSS
- Avoid ES module imports; scripts must stay global browser JS.
- If adding a new phase file, include it before `study.js`.

## HTML and text content rules
- Use template literals for large HTML blocks inside phase files.
- Keep inline styles consistent with existing markup.
- Preserve `id` and `name` attributes used by selectors or lab.js.
- Avoid changing form `id`s and `name`s unless you update all selectors.
- Do not move text into new files unless you also update script order.

## Lab.js patterns
- Components are created with `lab.html.Form`, `lab.html.Page`, or `lab.html.Screen`.
- Use `messageHandlers` (`run`, `commit`, `end`, `epilogue`) for behavior.
- Progress bar updates use `numElementsCounter` and `.progress-bar`.
- Data is stored with `study.options.datastore.set` and exported via `exportJson()`.
- JATOS submissions happen in `commit` handlers and the ending `epilogue`.
- Avoid async work inside `commit` that can block screen transitions.
- When using `skip`, ensure the skip expression references global vars.

## AIT task specifics
- AIT globals (`AIT_cue`, `AIT_cue_visibile`, `boolSkipAffectImgInstruction`) live in `src/js/phases/ait.js`.
- Outer/inner loops are controlled by `loopOuter` and `loopInner`; edit with care.
- `updateParams_outer` stores `sucsessfulAssociations` and `unsucsessfulAssociations` to the datastore.
- Instruction text is injected via `currenText` and `#replaceInstructions`.
- Button labels and placeholders are part of the HTML strings; keep IDs stable.

## JavaScript style and formatting
- Language: plain browser JavaScript, no TypeScript.
- Indentation: 2 spaces.
- Strings: mostly double quotes; keep local file style.
- Semicolons are used; keep them.
- Prefer `const`/`let` for new code; do not refactor existing `var` globals unless required.
- Keep global variables near the top of each file.
- Avoid large refactors; follow existing patterns.
- Keep inline HTML in template literals; do not concatenate long strings.
- Avoid introducing ES6 modules or bundler assumptions.

## Naming conventions
- Component variables use `PascalCase_htmlForm` / `PascalCase_htmlScreen`.
- Helper functions use `camelCase` (e.g., `continueornot`).
- Global booleans use `bool` prefix or descriptive names.
- Data keys in datastore should stay stable.

## jQuery and DOM usage
- jQuery is available globally as `$` (loaded in `index.html`).
- Prefer jQuery for DOM queries and event binding.
- Use delegated events for dynamically injected HTML.
- When using jQuery UI widgets, check `$.fn` existence before calling.

## Types and data handling
- Use plain objects/arrays for datastore export.
- Use runtime guards instead of TS types.
- Avoid changing existing datastore keys unless analysis scripts are updated.
- When adding new fields, choose stable, snake-case or camelCase keys and document them.

## Progress and required responses
- `numElements` in `study.js` must match the number of progress-tracked screens.
- Increment `numElementsCounter` once per screen `commit`.
- `Required_Testing` toggles required survey responses; use booleans, not strings.
- Avoid mixing `required` HTML attributes and lab.js `required` flags unless needed.

## Error handling and user feedback
- Use `alert()` for blocking validation errors (existing pattern).
- Use `toastr.warning` for non-blocking validation in AIT tasks.
- Avoid throwing errors in message handlers; they can halt study flow.
- Wrap external requests in `try/catch` and log failures.
- Prefer user-visible messages in plain English; do not change HTML structure.

## Logging
- Console logs document flow and data submission.
- Keep logs concise; do not remove important submission logs.
- Avoid logging PII or full response text in production runs.

## CSS conventions
- Styles are plain CSS in `src/css/style.css`.
- Keep selectors stable; many are referenced by ID from HTML strings.
- Prefer class-based styling for new UI; reserve IDs for behavior.
- Avoid introducing CSS frameworks.

## Assets and external libraries
- `lib/` contains lab.js and lab.css.
- `src/js/additional libraries/` contains jatos, jQuery, jQuery UI, toastr.
- Do not upgrade or replace vendor files unless explicitly requested.

## Data privacy and external calls
- `src/js/phases/intro.js` includes IP/location calls.
- If editing these calls, consider consent and ethics.
- Avoid adding new external endpoints without a clear need.
- Keep external calls behind `localTesting` if they should not run locally.

## Manual QA checklist
- Consent screen loads and gating works.
- Scenario text swaps based on `futureSocietyCondition`.
- AIT loop runs and stores associations.
- Scales submit without validation issues.
- Ending screen submits and redirects (only on JATOS).

## Cursor and Copilot rules
- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` found.

## Common edit locations
- Study flow sequence: `study.js`.
- Global flags: `src/js/globals.js`.
- Text + screen logic: `src/js/phases/*.js`.
- Survey item pools: `src/js/content/surveyScales.js`.
- AIT logic: `src/js/phases/ait.js`.
- Styling: `src/css/style.css`.
