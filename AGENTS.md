# AGENTS.md

Scope: whole repository.

## What this repo actually is
- Two active work areas: `Online Study Files/pretestVignettes/` (lab.js browser study) and `Analyses/` (Quarto + R scripts).
- There is no root package manager or task runner (`package.json`, `Makefile`, CI workflows, pre-commit config, and `opencode.json` are absent).

## Verified commands
- Run the study locally from repo root:
  - `python3 -m http.server 8000`
  - open `http://localhost:8000/Online%20Study%20Files/pretestVignettes/index.html`
- Render pretest analyses:
  - `quarto render "Analyses/pretestVignettes/01_dataPreperation/DS_dataPrep.qmd"`
  - `quarto render "Analyses/pretestVignettes/02_dataAnalysis/ds_dataAnalysis.qmd"`
- Render main study analyses:
  - `quarto render "Analyses/mainStudy/01_dataPreperation/dynamicScript.qmd"`
  - `quarto render "Analyses/mainStudy/02_dataAnalysis/dynamicScript.qmd"`

## Study wiring (easy to break)
- Script load order in `Online Study Files/pretestVignettes/index.html` is significant; phase/component files load before `study.js`.
- Runtime flags are in `Online Study Files/pretestVignettes/src/js/globals.js` (`localTesting`, `Required_Testing`); do not redeclare/shadow them.
- JATOS usage is guarded by `!localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function"` (used in `study.js` and phase files); keep this guard pattern when touching submission logic.
- `study.js` is the composition entrypoint (`lab.flow.Sequence` content order controls actual study flow).

## Analysis quirks
- Main-study `.qmd` scripts use `setwd("data")`, `setwd("outputs")`, and relative path jumps (for example `setwd("../01_dataPreperation/outputs")`); running from the file's own directory is the safe default.

## Data/artifact hygiene
- `**/study visual traps` is ignored in `.gitignore`; edits under `Online Study Files/pretestVignettes/study visual traps/` will not appear in normal git status.
- Avoid committing derived/bulky outputs unless explicitly requested (rendered analysis output, exported datasets, media/binaries).

## File-format trap
- `README.md` is UTF-16 LE with CRLF. If you must edit it, preserve encoding and line endings.
