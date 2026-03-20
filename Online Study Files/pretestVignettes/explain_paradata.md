# Paradata Overview (lab.js experiment)

This document explains, in plain language, which metadata (paradata) is collected during the lab.js study and how it is structured. It describes what is captured for quality and bot‑detection purposes. It does **not** include any participant answers.

## Where paradata is collected

- General paradata: `src/js/paradata/paradata_general.js`
- Focus/blur paradata: `src/js/paradata/paradata_focus.js`
- Stored in the lab.js datastore under `paradata_general` (and `para_defocuscount` for focus/blur).

## High‑level categories

1) Static device and browser metadata
2) Screen, viewport, and page context
3) Locale and network context
4) Behavioral telemetry (copy/paste, mouse, scroll, typing timing)
5) Focus/blur events (handled separately)

## 1) Static device and browser metadata

Collected once per session and stored as part of `paradata_general.static`:

- Timestamp of collection
- User agent string
- Platform and language settings
- Cookies enabled, online status, Do‑Not‑Track flag
- Hardware concurrency (CPU cores) and device memory
- Max touch points

## 2) Screen, viewport, and page context

Collected once per session and stored as part of `paradata_general.static`:

- Screen size and available size
- Color depth / pixel depth
- Viewport size (inner/outer width and height)
- Device pixel ratio
- Page URL, hostname, path, protocol, referrer, and document title

## 3) Locale and network context

Collected once per session and stored as part of `paradata_general.static`:

- Time zone and UTC offset
- Network connection type (if available): effective type, downlink, RTT, save‑data

IP and coarse IP‑based geolocation:

- Retrieved from `https://ipapi.co/json/` **only when `localTesting` is false**
- When `localTesting` is true, IP collection is skipped and marked as such

## 4) Behavioral telemetry (non‑answer interaction data)

Collected continuously during the study and stored as part of `paradata_general.behavior`.
Each event is tagged with the **current lab.js component title** so it can be linked to a specific screen.

### Copy and paste
- Raw copied/pasted text
- Text length
- Timestamp
- Component title
- Basic target element metadata (tag, type, id, name, class)

### Mouse movement
- Cursor x/y coordinates (sampled)
- Timestamp
- Component title

### Scroll activity
- Scroll x/y positions (sampled)
- Timestamp
- Component title

### Typing timing (no keystroke content)
- Inter‑key timing intervals only
- Summary statistics: count, mean, median, min, max

## 5) Focus/blur events (separate collector)

Handled by `src/js/paradata/paradata_focus.js` only (no duplication in general paradata):

- Number of defocus events
- Duration of each blur
- Component title at the time of blur
- Stored under `para_defocuscount`

## How this is stored

- `paradata_general` (single object) is updated periodically during the study.
- Focus/blur events are stored in `para_defocuscount` by the focus collector.

## Notes on scope

- Paradata is **behavioral metadata**, not survey answers.
- It is intended for data quality monitoring (e.g., bot/agent detection, unusual interaction patterns).
- It does not include any personal identifiers beyond the IP information collected when `localTesting` is false.
