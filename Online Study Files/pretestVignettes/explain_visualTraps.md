# Visual Perception Tasks (Visual Traps)

This document explains the purpose, structure, and data output of the **visual perception tasks** used in the lab.js study.

## Goal

The visual perception tasks are short image-based questions framed neutrally as **visual perception and reasoning**.
They are included as a standard study component and are **not described to participants as bot/AI detection**.

## Where it is located

- Phase file: `src/js/phases/visualTraps.js`
- Included in the study flow in: `study.js`
- Stimulus images: `src/static/visualTraps/`

## What participants see

- One image per screen with one multiple-choice question.
- Answer options are displayed as a **2x2 grid**.
- Items are shown in **randomized order**.

## Tasks included (6)

The following six visual tasks are shown (Shape Overload is excluded):

1) Surrounded Planets
   - Visual counting/binding task: identify the planet with a specific number of surrounding shapes.

2) Modified Cafe Wall
   - Visual illusion task: judge whether horizontal lines appear straight or slanted.

3) Colliding Oranges
   - Spatial reasoning/mental simulation task: infer which object(s) a moving circle would collide with.

4) Moving Robot
   - Spatiotemporal reasoning task: infer the most likely location of a moving robot at a later step.

5) Modified Muller-Lyer
   - Visual illusion task: judge which line appears longer.

6) Modified Ebbinghaus
   - Visual illusion task: judge which circle appears larger.

## What is stored

Responses are stored in the lab.js datastore.

Per task (by `trapId`):
- `visualTrap_<TrapId>_response`: selected option value (string)
- `visualTrap_<TrapId>_responseLabel`: selected option label (string)
- `visualTrap_<TrapId>_correct`: whether the response matches the keyed answer (boolean)
- `visualTrap_<TrapId>_rtMs`: response time in milliseconds (number)
- `visualTrap_<TrapId>_optionOrder`: the displayed option order (array of `{ value, label }`)

Across all tasks:
- `visualTrap_order`: order of tasks shown (array of `trapId`)
- `visualTrap_trials`: trial list with per-trial details (array of objects)

## Notes

- The current implementation uses a **harmonized 4-option format** across tasks.
- These measures are intended as **data-quality signals** and do not automatically block participants.
