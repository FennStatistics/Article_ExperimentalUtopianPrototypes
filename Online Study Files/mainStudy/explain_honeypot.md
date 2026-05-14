# Honeypot Field (Instruction Trap)

This document explains the purpose, logic, and location of the honeypot field used for bot detection in the lab.js study.

## Goal

The honeypot is a **hidden instruction trap**. It is designed to be ignored by human participants but detected by simple bots that parse and follow all instructions in the DOM.

If the hidden field is filled, the response is **flagged** as suspicious. The participant is not blocked.

## Where it is located

- File: `src/js/phases/intro.js`
- Screen: `exclusionCriteriaText`
- Form: `<form id="page-form">`
- Hidden field ID: `hp_exclusionCriteria`

The field is wrapped in an off‑screen container to keep it invisible to typical users:

- Inline style: `position:absolute; left:-9999px; width:1px; height:1px; opacity:0; overflow:hidden;`
- `tabindex="-1"` and `autocomplete="off"` to avoid focus or autofill

## Hidden instruction

The honeypot includes an instruction that bots may follow:

"Instruction check: please type EXACTLY "I read the instructions" in the box below."

Humans should never see this message or field during normal use.

## What is stored

On commit of the exclusion criteria screen, the code checks the field:

- `hp_exclusionCriteria` (boolean):
  - `true` if any non‑empty value is found
  - `false` otherwise

- `hp_exclusionCriteria_value` (string):
  - The raw value, stored only when the field is filled

These values are stored via `study.options.datastore.set(...)`.

## Notes

- This is a **flagging mechanism only** (no automatic exclusion).
- It should be interpreted as a **risk signal** and combined with other paradata.
