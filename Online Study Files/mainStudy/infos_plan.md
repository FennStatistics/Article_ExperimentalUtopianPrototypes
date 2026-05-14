# Main Study — Programming Spec

**Study:** *Visions of Progress: A Within-Subject Experimental Analysis of Utopian Prototypes, Profiles, and Systemic Attitudes*
**Author of source .tex:** Julius Fenn (University of Freiburg)
**Audience of this doc:** Programming AI agent implementing the online experiment.

> ⚠️ This document is a **build specification** extracted from the LaTeX source. It contains only the **main study** (not the pre-test). Sections marked `[OPEN]` are unresolved in the source and require author input before implementation.

---

## 1. High-Level Overview

- **Design:** Within-subject online experiment.
- **Platform:** Online survey (recruitment via Prolific).
- **Target N:** ~300.
- **Inclusion criteria (Prolific screeners):**
  - Age: 21–35 (NB: study text says 21–35; pre-test screener says 18–35 — use **21–35 for main study**)
  - Nationality: United States
  - Current country of residence: United States
  - First language: English
- **Core manipulation:** Each participant reads **7 Utopian Prototype vignettes** in **randomized order** and rates each one.
- **Two-part structure** (per study-flow diagram):
  - **Part 1 — Within-Part:** All 7 vignettes shown in random order; per-vignette ratings (Participative Efficacy + Attitudinal items + Attribute items).
  - **Part 2 — Between-Part:** Ordering Task → Audio Feedback (ranking) → Audio Feedback (missing utopia) → Scales → Demographics.
- **Data structure:** Hierarchical / multilevel.
  - **L1 (vignette-level, repeated within participant):** Participative Efficacy + Attitudinal items + Attribute ratings.
  - **L2 (participant-level, one per person):** Ranking, audio responses, scales, demographics.

---

## 2. Study Flow (Top-Level Sequence)

Order is **fixed** unless explicitly noted as randomized. Reflects the study-flow diagram (Within-Part → Between-Part).

| # | Block | Type | Notes |
|---|-------|------|-------|
| 1 | Welcome screen + informed consent | Static + checkbox | Must consent to proceed |
| **— Part 1: Within-Part —** | | | |
| 2 | **Vignette loop (×7)** — Reading + per-vignette ratings | Repeated within-subject | **Randomized order** of 7 prototypes |
| **— Part 2: Between-Part —** | | | |
| 3 | **Ordering Task** — rank 7 prototypes | Single screen | 1 = least preferred, 7 = most preferred |
| 4 | **Feedback Task (Audio) #1** — explain ranking | Audio recording | Open response |
| 5 | **Feedback Task (Audio) #2** — missing utopia | Audio recording | Open response |
| 6 | **Scales** | Multiple Likert scales | L2 measures |
| 7 | **Demographics** | Final questions | Age, gender, religiosity, left–right, education, current & dream job |
| 8 | Debrief / completion code | Static | Return to Prolific |

---

## 3. Part 1 — Within-Part: Vignette Loop (L1, repeated 7×)

### 3.1 The 7 Utopian Prototypes (stimuli)

All 7 are presented to every participant in **fully randomized order**.
Vignette texts are matched on length, narrative structure, readability, and descriptive scope; they differ only in content.

> **[OPEN]** Final vignette texts are pending (`appendix:finalUtopiaProto` in source is empty). Implementation must accept the 7 texts as configurable assets.

| ID | Label | Key Factors |
|----|-------|-------------|
| `futurist` | Futurist Utopia | Science/innovation, technological advancement, rational planning, optimization of material well-being, progress orientation |
| `ai_centered` | AI-Centered Utopia | AI governance/decision-making, algorithmic optimization, efficiency, reduced human bias, large-scale complexity management |
| `primitivist` | Primitivist (Arcadian) Utopia | Minimal technology, sufficiency, harmony with nature, small-scale communities, low institutionalization |
| `modern_green` | Modern Green Utopia | Ecological sustainability, selective/green tech, moderation, economic security/low poverty, long-term human–nature balance |
| `religious` | Religious (Millennial) Utopia | Transcendent authority, religious norms, spiritual transformation, moral order grounded in faith |
| `institutional` | Institutional (Law-Based) Utopia | Formal institutions, rule of law, external behavioral regulation, enforceable sanctions, stability |
| `moral_anarchic` | Moral Commonwealth (Anarchic) Utopia | Intrinsic morality/altruism, internalized regulation, voluntary cooperation, low coercion, minimal formal authority |

### 3.2 Per-Vignette Procedure

For each vignette `v` in the randomized sequence:

1. **Reading task**
   - Display vignette `v` text.
   - No time limit (recommend a minimum read-time gate, e.g. ≥10 s, before "Next" enables) — **[OPEN]** confirm with author.

2. **Closed evaluation** — three blocks, all **7-point Likert** (1 = *strongly disagree*, 7 = *strongly agree*):
   - **(a)** Attitudinal items (3 items)
   - **(b)** Participative Efficacy (4 items)
   - **(c)** Attributes of Utopia (8 items)
   - Recommend presenting in the order (a) → (b) → (c). Item order **within** each block: **[OPEN]** randomize or fixed — confirm.

#### 3.2.1 Attitudinal items toward the depicted society (3 items) — L1 ✅ Verbatim

New items capturing personal endorsement, anticipated life satisfaction in the society, and support for change toward it.

| Code | Item |
|------|------|
| `att_live_in` | I would like to live in a society like this. |
| `att_satisfying_life` | I can imagine having a satisfying life in this society. |
| `att_support_change` | I would support societal changes toward this kind of future. |

- Scoring: keep as 3 separate items (do not pre-aggregate). Optional composite `attitude_mean_<vignette_id>` for analysis.

#### 3.2.2 Participative Efficacy (4 items) — L1 ✅ Verbatim

Source: Fernando et al. (2020), based on van Zomeren et al. (2013).
Original van Zomeren et al. (2013) item template (for reference; not displayed to participants):
*"I believe that I, as an individual, can contribute greatly so that (students), as a group, can (stop the financial cuts to higher education)."*

| Code | Item |
|------|------|
| `pe1` | Ordinary people like me can play a part in bringing about this kind of society. |
| `pe2` | This kind of society can be realized through the actions of ordinary individuals like me. |
| `pe3` | Ordinary people can help realize this version of society. |
| `pe4` | Ordinary people are needed to realize this version of society. |

- Scoring: mean of the 4 items per vignette → `pe_mean_<vignette_id>`.
- Expected reliability: α ≈ .94 (Fernando et al., 2020).

#### 3.2.3 Attributes of Utopia (8 single-item indicators) — L1

Source: Lizzio-Wilson et al. (2025). Each item is a single Likert rating capturing one attribute.

| Code | Attribute | Item stem suggestion |
|------|-----------|----------------------|
| `att_utopian` | utopian | "This society is utopian." |
| `att_desirable` | desirable | "This society is desirable." |
| `att_ideal` | ideal | "This society is ideal." |
| `att_beneficial` | beneficial for the greater good | "This society is beneficial for the greater good." |
| `att_imaginative` | imaginative | "This society is imaginative." |
| `att_innovative` | innovative | "This society is innovative." |
| `att_creative` | creative | "This society is creative." |
| `att_possible` | possible | "This society is possible." |

- 7-point Likert as above.
- Stored per vignette: `att_<attr>_<vignette_id>`.

> **[OPEN]** Exact wording of the 8 attribute items not given verbatim in source — confirm with author or use the wording in Lizzio-Wilson et al. (2025).

### 3.3 Data captured per vignette

For each participant × vignette: order of presentation (1–7), reading time, 3 attitudinal items, 4 PE items, 8 attribute items.

---

## 4. Part 2 — Ordering Task (L2)

- **Format:** Drag-and-drop (or equivalent) ranking of all 7 prototypes.
- **Anchors:** 1 = "the society/world I'd **least** like to live in"; 7 = "the society/world I'd **most** like to live in".
- **Constraint:** Each rank used exactly once (forced ranking, no ties).
- **Storage:** `rank_<vignette_id>` ∈ {1..7}.

---

## 5. Part 2 — Audio Feedback #1: Ranking Explanation (L2)

- **Format:** In-browser audio recording.
- **Prompt:** Brief audio response explaining ranking, focusing on key reasons why some prototypes were preferred over others.
- **[OPEN]** Recommended duration cap (suggest 60–120 s) — confirm.
- **Storage:** audio file + auto-transcript if available.

---

## 6. Part 2 — Audio Feedback #2: Missing Utopia Elicitation (L2)

- **Format:** In-browser audio recording.
- **Prompt:** Describe any additional type of utopia not represented in the presented set — outline core features and explain which aspect is especially meaningful/important.
- **Storage:** audio file + auto-transcript if available.

---

## 7. Part 2 — Scales (L2)

All scales are **participant-level** (one set of responses per participant), administered **after** the vignette and audio tasks.
Default Likert scale = **7-point** (1 = *strongly disagree*, 7 = *strongly agree*) unless noted.

> **[OPEN]** Source text explicitly states: *"CONTINUE HERE - update set of possible measures"* and *"decide on a final set of scales"*. The list below is the **maximal candidate set** in the source. Implementation should treat each scale as an independently toggleable module.

> **[OPEN]** Full item wording for most scales is not in the .tex — only construct descriptions. Implementation must source the official item lists from the cited papers (citations included below).

### 7.1 Scale Inventory

| # | Scale | Construct | Source | Status |
|---|-------|-----------|--------|--------|
| 7.2 | Need for Chaos (NFC) | Desire to disrupt/destroy existing social order | Arceneaux et al. (2021) | Candidate |
| 7.3 | Need for Chaos — Violence (ARIS-adapted) | Activism vs. radicalism intentions, utopia-framed | Moskalenko & McCauley (2009), adapted | **Verbatim items provided (Table 1)** |
| 7.4 | Satisfaction With Life Scale (SWLS) | Global cognitive life satisfaction | Diener et al. (1985) | Candidate (5 items) |
| 7.5 | Generic Job Satisfaction Scale (GJSS) | Overall job satisfaction | Macdonald & Macintyre (1997) | Candidate (10 items) |
| 7.6 | Environmental Cognitive Alternatives Scale (ECAS) | Imaginability of positive human–nature alternatives | Wright et al. (2020) | Candidate (10 items, single factor) |
| 7.7 | System Justification Scale (8-item, US version) | Endorsement of fairness/legitimacy of US social order | Kay & Jost (2003) | Candidate (8 items, 2 reverse-keyed) |
| 7.8 | Utopianism / Anti-utopianism Scale | Dispositional pro/anti utopian thinking | Fernando et al. (2018) | Candidate (2 subscales) |
| 7.9 | "Pia's scales" | Unknown | — | **[OPEN]** — placeholder only in source |
| 7.10 | Collective Action (pro-environmental behavior intentions) | Behavioral intentions over next 12 months | Adapted from Bain et al. (2016) | Candidate (10 items, α ≈ .94) |

---

### 7.2 Need for Chaos (NFC)

- **Construct:** Characteristic adaptation reflecting desire for "new beginnings" via destruction of social/political order.
- **Source:** Arceneaux, Gulzar & Vogt (2021).
- **Format:** Multi-item Likert battery (validated in 4-country surveys: US, UK, CA, AU).
- **Dimensionality:** Continuous, unidimensional; LPA-derived 4 profiles (incl. Rebuilders vs. High Chaos).
- **Use in this study:** Distinguish *Builder* (high NFC + constructive utopianism) vs. *Nihilist* (high NFC + low constructive utopianism) profiles.
- **[OPEN]** Item list — pull from Arceneaux et al. (2021).

---

### 7.3 Need for Chaos — Violence (ARIS-adapted) ✅ Verbatim items

- **Source:** Moskalenko & McCauley (2009), adapted to utopia framing.
- **Two subscales:** Activism (AIS, legal/nonviolent) and Radicalism (RIS, illegal/violent).
- **Scale:** 7-point Likert agreement (assume; confirm).
- **Stem for all items:** *"Thinking about the future society I would most like to live in…"*

#### Activism Intentions (AIS-adapted) — 4 items

| Code | Item |
|------|------|
| `ais1` | I would join or belong to an organization that works to promote this kind of society. |
| `ais2` | I would donate money to organization that works towards this kind of society. |
| `ais3` | I would volunteer my time (e.g., write petitions, distribute flyers, recruit people, etc.) for an organization that promote this kind of society. |
| `ais4` | I would travel for one hour to join in a public rally, protest, or demonstration in support of an organization supporting this kind of society. |

#### Radicalism Intentions (RIS-adapted) — 4 items

| Code | Item |
|------|------|
| `ris1` | I would continue to support an organization that works toward this kind of society even if the organization sometimes breaks the law. |
| `ris2` | I would continue to support an organization that works toward this kind of society even if the organization sometimes resorts to violence. |
| `ris3` | I would participate in a public protest in support of this kind of society even if I thought the protest might turn violent. |
| `ris4` | I would attack police or security forces if I saw them beating people who were supporting this kind of society. |

- **Note:** ARIS items are written here at the **participant level** but reference "the future society I would most like to live in" — which is determined by the participant's Task 2 ranking. **[OPEN]** Confirm: should these items be presented (a) once globally (referencing the participant's #7-ranked utopia), or (b) repeated per-prototype as L1 items? The source places them in L2 (Section "Scales (L2)") → treat as **L2, asked once**.
- Expected reliabilities (original ARIS): AIS α ≈ .86–.89; RIS α ≈ .83–.84.

---

### 7.4 Satisfaction With Life Scale (SWLS)

- **Source:** Diener, Emmons, Larsen & Griffin (1985).
- **Items:** 5 items, single-factor, 7-point Likert.
- **Expected reliability:** α ≈ .87.
- **[OPEN]** Item list — pull from Diener et al. (1985). Standard items widely available.
- **Decision in source:** Newer measure by Margolis et al. (2019) "not needed" → use original 5-item SWLS.

---

### 7.5 Generic Job Satisfaction Scale (GJSS)

- **Source:** Macdonald & Macintyre (1997).
- **Items:** 10 items, unidimensional, Likert.
- **Expected reliability:** α ≈ .77.
- **[OPEN]** Item list — pull from Macdonald & Macintyre (1997).
- **Note:** Should only be administered to currently employed participants — **[OPEN]** confirm conditional logic.

---

### 7.6 Environmental Cognitive Alternatives Scale (ECAS)

- **Source:** Wright, Lutz, Lockwood, Saeri, Bain (2020); see also Lutz et al. (2025).
- **Items:** 10 items, single-factor.
- **Expected reliability:** α ≈ .93.
- **[OPEN]** Item list — pull from Wright et al. (2020).

---

### 7.7 System Justification Scale (8-item, US version)

- **Source:** Kay & Jost (2003) — "System Justification–America" scale.
- **Items:** 8 items, with 2 reverse-keyed.
- **Expected reliability:** α ≈ .75–.87.
- **[OPEN]** Item list — pull from Kay & Jost (2003). Standard items widely available.
- **Caveat noted in source:** Vesper et al. (2022) reported lack of scalar invariance cross-nationally; not a concern here (US-only sample) but flag in analysis.

---

### 7.8 Utopianism and Anti-utopianism

- **Source:** Fernando et al. (2018).
- **Two subscales** (factor-analytically distinct, modestly negatively correlated):
  - **Utopianism** — positive orientation toward utopian thought. Expected α ≈ .79–.86.
    - Example items in source:
      - "I often think about what an ideal society might look like."
      - "I spend a lot of time thinking about an ideal society."
      - "It is important that people think about an ideal version of society."
  - **Anti-utopianism** — cautionary/critical beliefs about utopian thinking. Expected α ≈ .78–.82.
    - Example items in source:
      - "Dreaming about an ideal society could be dangerous."
      - "Focusing on an ideal society can have negative consequences."
      - "People shouldn't try to envision an ideal society."
- **Scale:** 7-point Likert (1 = *strongly disagree*, 7 = *strongly agree*).
- **[OPEN]** Full item list per subscale — pull from Fernando et al. (2018).

---

### 7.9 "Pia's Scales"

- **[OPEN]** Source text contains only the placeholder *"XX - Pias Scales / blub"*. No construct, items, or citation provided. Author must specify before implementation.

---

### 7.10 Collective Action (Pro-Environmental Behavior Intentions)

- **Source:** Adapted from Bain et al. (2016); used in Fernando & Prooijen (2020).
- **Items:** 10 items.
- **Format:** Likelihood rating, **1 = very unlikely, 7 = very likely**, of engaging in each behavior in the next 12 months.
- **Examples in source:**
  - "Sign a petition in support of protecting the environment."
  - "Give money to an environmental group."
- **Expected reliability:** α ≈ .94.
- **[OPEN]** Full item list — pull from Bain et al. (2016).

---

## 8. Part 2 — Demographics & Background (L2)

The source bundles standard demographics with several study-specific items.
The study-flow diagram explicitly lists: **Age, Gender, Religiosity, Left–Right Scale, Education, Current Job, Dream Job**.

### 8.1 Standard demographics

| Variable | Format |
|----------|--------|
| Age | Integer (years) |
| Gender | Single-select **[OPEN]** category list (suggest: Woman / Man / Non-binary / Prefer to self-describe / Prefer not to say) |
| **Religiosity** | **[OPEN]** Single item or short scale — confirm format. Common single-item: "How religious do you consider yourself?" on 1–7 or 0–10 scale. |
| **Left–Right political orientation** | **[OPEN]** Single item — confirm format. Common: "In political matters, people talk of 'the left' and 'the right.' Where would you place yourself on this scale?" 1 (*far left*) to 7 (*far right*), or 0–10. |
| Education | Single-select **[OPEN]** category list (suggest US standard: Less than high school / High school / Some college / Bachelor's / Master's / Doctoral / Professional) |
| Employment status | Single-select **[OPEN]** category list (used to gate GJSS) |
| Children | **Yes / No** (explicitly added per source) |

### 8.2 Training–occupation–utopia match

Source flags this as an open design point — the author considers three alternative operationalizations. Pick **one** for implementation.

**Option A — Single binary/3-level:**
- "Is your current job related to your field of study/training?" → *Yes / No / Partly*

**Option B — Single Likert:**
- "To what extent is your current job related to your field of study/training?"
  - *Not at all related / Slightly / Moderately / Strongly / Completely*

**Option C — Two-step (recommended in source, richer data):**
1. Field of training/study (free text or dropdown)
2. Current occupation / job title (free text or dropdown)
3. Relationship between training and current job: *Directly related / Indirectly related / Not related*

> **[OPEN]** Author to choose A / B / C.

### 8.3 Job-related items (separate from match)

Three distinct job constructs to collect separately:

1. **Current job** — title / category
2. **Qualification** — what they were trained for
3. **Dream job in their Utopian / dream world** — what they would do in their preferred future society

Plus:
- **Job satisfaction for current occupation** — covered by GJSS (§7.5) if administered, else single-item fallback.

### 8.4 Occupation classification schemas to support

> **[OPEN]** Author lists two possible schemas; pick one for dropdown coding.

- Germany — `KldB2010` (Klassifikation der Berufe 2010, Fassung 2020): <https://statistik.arbeitsagentur.de/DE/Navigation/Grundlagen/Klassifikationen/Klassifikation-der-Berufe/KldB2010-Fassung2020/Publikationen/Publikationen-Nav.html>
- OECD: <https://www.oecd.org/en/publications/government-at-a-glance-2025_0efd0bcd-en/full-report/classification-and-definitions-of-occupations-and-educational-levels_3721b665.html>

(Given US-only sample, US SOC may be a third option to propose to author.)

### 8.5 Other open items

- **[OPEN]** "Real behavior task: charities well known in UK?" — source notes *"ask Fernando"*. Not in scope until author clarifies; flag for later.

---

## 9. Variable Naming Conventions (suggested)

Adopt a consistent naming pattern for downstream analysis:

```
# L1 (vignette-level, 7 rows per participant)
<participant_id>, <vignette_id>, <vignette_order_position>, <read_time_ms>,
att_live_in, att_satisfying_life, att_support_change,
pe1, pe2, pe3, pe4, pe_mean,
att_utopian, att_desirable, att_ideal, att_beneficial,
att_imaginative, att_innovative, att_creative, att_possible

# L2 (participant-level, 1 row per participant)
<participant_id>,
rank_futurist, rank_ai_centered, rank_primitivist, rank_modern_green,
rank_religious, rank_institutional, rank_moral_anarchic,
audio_ranking_explanation_url, audio_missing_utopia_url,

# Scales (L2)
nfc_*, ais1..4, ris1..4,
swls1..5,
gjss1..10,
ecas1..10,
sjs1..8,
utop1..k, antiutop1..k,
ca1..10,

# Demographics
age, gender, religiosity, left_right, education, employment, children,
job_current, job_qualification, job_dream_utopia,
training_job_match_*
```

---

## 10. Implementation Checklist for the Agent

- [ ] Implement randomized presentation of 7 vignettes per participant (uniform random permutation; record order).
- [ ] Per-vignette block: render text, then 3 Attitudinal items + 4 PE items + 8 Attribute items on 7-point Likert.
- [ ] Force-rank widget for 7 prototypes (1 = least, 7 = most preferred).
- [ ] In-browser audio recording for both Feedback Tasks (with consent + max length).
- [ ] Implement scale modules (§7.2–7.10) as independently toggleable; each accepts an items file.
- [ ] Demographics block including **Religiosity** and **Left–Right Scale** (per diagram); conditional GJSS (employed only); Option C training–job match by default.
- [ ] Persist L1 + L2 data in a long-format-friendly schema (see §9).
- [ ] Prolific integration: screeners (US, English L1, age 21–35), completion code, attention checks (**[OPEN]** — number and placement).
- [ ] Resolve every **[OPEN]** flag with the author before launch.

---

## 11. Summary of Open Questions for the Author

1. Final vignette texts for the 7 prototypes (Appendix is empty in source).
2. Full item wording for: Attributes (8 items), NFC, SWLS, GJSS, ECAS, SJS, Utopianism/Anti-utopianism, Collective Action. *(PE items 1–4 and the 3 Attitudinal items are now locked in.)*
3. **"Pia's Scales"** — what are they?
4. Final decision on which scales from §7 to keep vs. drop ("decide on a final set of scales").
5. Should ARIS-adapted items reference the top-ranked utopia (post Ordering Task) globally, or be asked per-prototype?
6. ARIS response scale — 7-point Likert assumed; confirm.
7. Min read-time gating on vignettes? Item-order randomization within blocks (Attitudinal / PE / Attributes)?
8. Audio recording length caps for both Feedback Tasks.
9. Training–job match: A, B, or C?
10. Occupation classification schema for dropdowns (US SOC suggested for US-only sample).
11. **Religiosity** — single item vs. short scale; response format (1–7 vs. 0–10).
12. **Left–Right Scale** — single item; response format (1–7 vs. 0–10 vs. 11-point).
13. Attention checks: how many, where, criterion for exclusion.
14. "Charities well known in UK" real-behavior task — drop, or adapt to US charities?
15. Age range: 21–35 (main study) vs. 18–35 (pre-test) — confirm 21–35 for main study.