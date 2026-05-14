# AGENTS.md

Scope: whole repository.

## Repo shape (non-obvious)
- The active code lives in two places: `Online Study Files/pretestVignettes/` (lab.js browser experiment) and `Analyses/` (Quarto + R).
- There is no root task runner or CI config (no `package.json`, `Makefile`, `.github/workflows/`, `.pre-commit-config.yaml`, or `opencode.json`).

## Verified commands
- Run the browser study from repo root:
  - `python3 -m http.server 8000`
  - Open `http://localhost:8000/Online%20Study%20Files/pretestVignettes/index.html`
- Render Quarto files from repo root:
  - `quarto render "Analyses/pretestVignettes/01_dataPreperation/DS_dataPrep.qmd"`
  - `quarto render "Analyses/pretestVignettes/02_dataAnalysis/ds_dataAnalysis.qmd"`
  - `quarto render "Analyses/mainStudy/01_dataPreperation/dynamicScript.qmd"`
  - `quarto render "Analyses/mainStudy/02_dataAnalysis/dynamicScript.qmd"`

## Study wiring (easy to break)
- `Online Study Files/pretestVignettes/index.html` script order matters: globals/content/phases/paradata load before `study.js`.
- `Online Study Files/pretestVignettes/src/js/globals.js` defines `localTesting` and `Required_Testing`; phase files expect these globals.
- Keep JATOS guards as `!localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function"` (used across `study.js` and phase files).
- `Online Study Files/pretestVignettes/study.js` is the composition entrypoint; `lab.flow.Sequence` order is the actual participant flow.

## Analysis quirks
- Main-study `.qmd` files use `setwd(...)` and relative jumps (for example `setwd("../01_dataPreperation/outputs")`), so path resolution is sensitive to execution context.

## Data/artifact hygiene
- `.gitignore` excludes `**/study visual traps`; edits under `Online Study Files/pretestVignettes/study visual traps/` will not show in normal `git status`.
- Avoid committing generated analysis outputs or exported data unless explicitly requested.

## File-format trap
- `README.md` is UTF-16 LE with CRLF. If you must edit it, preserve encoding and line endings.
