# Agent Guide (Article_ExperimentalUtopianPrototypes)

Scope: this repo contains (A) a static lab.js online study and (B) Quarto/R analysis scripts.
If you work inside the study folder, also read `Online Study Files/pretestVignettes/AGENTS.md`.

## Repo map
- `Online Study Files/pretestVignettes/`: runnable lab.js study (HTML + browser JS + CSS).
- `Online Study Files/pretestVignettes/analysis_pretestVignettes/`: pretest outputs + stored study data (treat as generated).
- `Analyses/`: Quarto (`.qmd`) + R data prep/analysis scripts.
- `Materials/`: manuscript materials, figures, and supporting docs.
- `README.md`: project overview (UTF-16 LE + CRLF; treat as special).

Related but usually not edited during this project:
- `Online Study Files/templates/`: legacy/template studies; treat as vendor/reference unless explicitly working on templates.

## Build / lint / test commands (what actually exists)
- Build: none (no bundler/package manager at repo root).
- Lint: none configured.
- Automated tests: none configured.

## Prerequisites (typical)
- Online study manual run: Python 3 (for `python3 -m http.server`); analyses: Quarto + R.
- No `package.json`, `Makefile`, or CI-driven commands are assumed in this repo.

## Online study: run locally (manual test)
Use a local server to avoid `file://` restrictions (can break `fetch`, JATOS guards, and some browser APIs).

- From repo root:
  - `python3 -m http.server 8000`
  - Open `http://localhost:8000/Online%20Study%20Files/pretestVignettes/index.html`
- Or from the study folder:
  - `cd "Online Study Files/pretestVignettes"` (manual)
  - `python3 -m http.server 8000`
  - Open `http://localhost:8000/index.html`

## Online study: "single test" (single screen/phase)
There is no test runner; treat "single test" as "run one screen/phase in the browser".

- Fast path: temporarily limit the `content` sequence in `Online Study Files/pretestVignettes/study.js` to only the component under test.
- Alternative: enable `lab.plugins.Debug()` and use its UI to skip forward.
- Condition testing: set `futureSocietyCondition` in `Online Study Files/pretestVignettes/study.js`.
- Always revert temporary local-only edits before finalizing.

## Analyses: run Quarto (manual verification)
Pretest vignette analyses:
- `quarto render "Analyses/pretestVignettes/01_dataPreperation/dynamicScript.qmd"`
- `quarto render "Analyses/pretestVignettes/02_dataAnalysis/dynamicScript.qmd"`

Main study analyses:
- `quarto render "Analyses/mainStudy/01_dataPreperation/dynamicScript.qmd"`
- `quarto render "Analyses/mainStudy/02_dataAnalysis/dynamicScript.qmd"`

"Single test": render exactly one `.qmd` file. For debugging, open the `.qmd` in RStudio and run chunks.

## Code style guidelines

### General
- Prefer small, localized changes; avoid large refactors in research code unless required.
- Do not add new build steps or dependencies unless explicitly requested.
- Paths contain spaces; quote paths in shell commands.
- Vendor/library code under `Online Study Files/**/lib/` and `Online Study Files/**/src/js/additional libraries/` should not be modified unless explicitly requested.

### JavaScript (lab.js study)
- Language: plain browser JavaScript (no TypeScript).
- Imports: no ES modules; script order in `Online Study Files/pretestVignettes/index.html` is significant (add new phase files before `study.js`).
- Formatting: 2-space indentation; semicolons; match local quote style (mostly `"`).
- Types: use runtime guards (`typeof`, null checks); do not introduce TS-style types.

Naming:
- lab.js components: `PascalCase_htmlForm` / `PascalCase_htmlScreen`.
- helpers: `camelCase`.
- booleans: `bool...` prefix or descriptive names.
- datastore keys must remain stable (update `Analyses/**` if they change).

Common entry points (study):
- `Online Study Files/pretestVignettes/index.html`: script order and library includes.
- `Online Study Files/pretestVignettes/study.js`: assembles the full `lab.flow.Sequence` and start logic.
- `Online Study Files/pretestVignettes/src/js/globals.js`: `localTesting`, `Required_Testing`.
- `Online Study Files/pretestVignettes/src/js/phases/*.js`: screen content + behavior.
- `Online Study Files/pretestVignettes/src/js/paradata/*.js`: focus/defocus + timing instrumentation.
- `Online Study Files/pretestVignettes/src/css/style.css`: study styles.

### HTML templates
- Large HTML blocks live in template literals inside `Online Study Files/pretestVignettes/src/js/phases/*.js`.
- Preserve element `id`/`name` attributes referenced by selectors, lab.js, or paradata scripts.

### Lab.js patterns
- Components are created with `lab.html.Form`, `lab.html.Page`, or `lab.html.Screen`.
- Put behavior in `messageHandlers` (`run`, `commit`, `end`, `epilogue`).
- Avoid heavy async work in `commit` (it can block transitions).
- Progress updates typically use `numElementsCounter` and `.progress-bar`; keep selectors stable.
- Store data via `study.options.datastore.set` and export with `exportJson()`.
- Prefer user-visible validation over exceptions; do not throw inside handlers.

JATOS / local testing guards:
- Guard JATOS calls with: `!localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function"`.
- Do not redeclare or shadow `localTesting` / `Required_Testing`.

### jQuery / DOM
- jQuery is global as `$`.
- Prefer delegated events for dynamic HTML.
- If calling jQuery UI plugins, guard with `if ($.fn.pluginName)`.

### Error handling / logging
- Use `alert()` for blocking validation errors when needed.
- Use `toastr.warning` for non-blocking validation (used in AIT code).
- Keep logs concise; avoid logging PII or full free-text responses.

### Data privacy
- Avoid adding new external endpoints without a clear research need and consent coverage.
- Keep any local-only external calls behind `localTesting` where appropriate.

### Data and outputs
- Raw data lives in `Online Study Files/pretestVignettes/analysis_pretestVignettes/01_dataPreperation/data/`; do not edit or commit unless explicitly requested.
- Analysis outputs live in `Online Study Files/pretestVignettes/analysis_pretestVignettes/` and `Analyses/**/outputs/`; avoid committing large derived files unless explicitly requested.

### CSS
- Plain CSS in `Online Study Files/pretestVignettes/src/css/style.css`.
- Prefer class-based styling for new UI; reserve IDs for behavior hooks.
- Avoid CSS frameworks.

### R / Quarto
- Keep work in `.qmd` files; R code in chunks.
- Follow existing package-loading conventions (often `pacman::p_load(...)`).
- This repo uses local `setwd("data")` / `setwd("outputs")` in some scripts; keep working-directory changes local and predictable.
- Put derived outputs in the local `outputs/` folders; do not commit large derived data unless explicitly requested.

## Manual QA checklist (online study)
- Consent/onboarding screens load; gating works.
- Scenario text swaps based on the condition variable(s).
- AIT loop runs; expected datastore fields populate.
- Survey scales submit without validation dead-ends.
- Ending screen behavior: local vs JATOS submission/redirect guards.

## Manual QA checklist (analyses)
- Render one target `.qmd` and confirm it completes without errors.
- Confirm outputs land in the local `outputs/` folders (avoid writing elsewhere).
- Avoid committing rendered HTML or large derived datasets unless explicitly requested.

## Repo-specific gotchas
- `README.md` is UTF-16 LE with CRLF; preserve encoding/line endings if you must edit it.
- Some repo files are binary or generated (PDFs, images, analysis outputs); do not edit them unless explicitly requested.

## Git and workspace hygiene
- You may be in a dirty worktree; do not revert unrelated user changes.
- Do not add large derived outputs (e.g., rendered HTML, exported datasets) to commits unless explicitly requested.
- Avoid history rewriting commands (`commit --amend`, force-push, hard reset) unless explicitly requested.

## Notes for agents
- If you need to edit `README.md`, use tooling that preserves UTF-16 LE + CRLF; do not silently convert to UTF-8.
- When in doubt about study behavior, verify by running locally and checking the browser console for errors.

## Cursor / Copilot rules
- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` found.
