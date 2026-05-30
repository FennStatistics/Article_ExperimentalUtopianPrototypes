# Data Preparation Guide - 3_prepareData.qmd

## Overview

The Quarto file `3_prepareData.qmd` integrates three data sources into a single comprehensive dataset:

1. **Survey Questionnaires** - Participant responses from `data/results_survey/`
2. **Audio Transcripts** - Converted speech-to-text from `outputs/audio_transcripts/`
3. **Sentiment Analysis** - Overall and window-level sentiment from `outputs/sentiment_analysis/`

**Final Output**: One row per participant with all metadata integrated.

---

## Workflow Overview

### Step 1: Load Raw Survey Data
- Recursively scans `data/results_survey/` for all `data.txt` files
- Parses JSON-formatted JATOS data
- Saves as `outputs/raw/study.rds` and `outputs/raw/study.jsonl`

### Step 2: Create Questionnaire with Filtering
- Combines all survey records into single dataframe
- Creates ID counter: `dat$ID <- cumsum(dat$sender == "Greetings"...)`
- **Identifies incomplete records**: Keeps only participants with `N == max(N)` records
- **Handles test ID "111"** (test data):
  - If multiple runs exist: keeps ONLY the most recent by timestamp
  - Removes duplicates from raw data
  - Marks as removed if still incomplete after filtering
- Generates filtering report: `data_survey_summary.csv`
  - Total records before/after
  - Number of incomplete records removed
  - Number of test ID duplicates removed
  - Final participant count

### Step 3: Add Transcripts
- Loads all JSON transcript files from `outputs/audio_transcripts/`
- Matches to questionnaire by participant ID
- **Mapping**:
  - `audio_missing_utopia` → column `text_missingUtopia`
  - `audio_ranking_explanation` → column `text_rankingUtopias`
- **Multiple transcripts per type**: Keeps ONLY the most recent (by timestamp)
- Fills missing transcripts with `NA`

### Step 4: Add Overall Sentiment
- Loads `overall_sentiment_and_embedding_YYYYMMDD_HHMMSS.csv`
- Adds columns:
  - `sentiment_label` (positive, negative, neutral)
  - `sentiment_score` (0-1 confidence)
  - `num_windows` (number of text windows analyzed)

### Step 5: Add Window-Level Sentiment
- Loads `window_sentiments_YYYYMMDD_HHMMSS.csv`
- Dynamically creates columns: `window_0_sentimentLabel`, `window_1_sentimentLabel`, ..., `window_N_sentimentLabel`
- Where N = maximum window index found in sentiment data
- Fills each window column with the sentiment label for that window
- Missing windows: `NA`

### Step 6: Save Final Dataset
- **combined_data.rds** - R native format
- **combined_data.csv** - Comma-separated values
- **combined_data.xlsx** - Excel format
- **data_survey_summary.csv** - Filtering statistics report

---

## Control Variables

Edit at the top of the document:

```r
createRawFiles <- TRUE  # Set to FALSE to skip raw file creation (use cached study.rds)
VERBOSE <- TRUE         # Set to FALSE to suppress detailed progress messages
```

---

## Special Handling: Test ID "111"

The dataset contains test data with participant ID "111" collected multiple times during development.

**Logic**:
1. Detect if "111" appears in multiple participant ID slots
2. For each occurrence:
   - Extract all records for that ID
   - Find most recent by `$timestamp` field
   - Remove all other records
3. After deduplication, check if the remaining "111" has complete records
4. If complete: include in final dataset
5. If incomplete: remove entirely and log in summary

**Filtering Report** shows:
- How many test ID "111" duplicates were removed
- Whether final "111" record (if any) was included

---

## Questionnaire Type Function

The `questionnairetype()` function converts JATOS array data to classical 2D dataframe:

**Input**: Raw JATOS data where some columns are lists/nested structures
**Output**: One row per participant with specified columns extracted

**Features**:
- Handles both numeric and character columns
- Converts lists to concatenated strings (with " - " separator)
- Respects column type (notNumeric list)

---

## Data Filtering Process

### Record Count Distribution

Before filtering:
```
ID    N
1    45    ← 45 records per participant (max)
2    45
3    45
...
15   23    ← Incomplete (< 45)
16   38    ← Incomplete
...
```

After filtering:
```
ID    N
1    45    ✓ Kept
2    45    ✓ Kept
3    45    ✓ Kept
...
15   REMOVED (incomplete)
16   REMOVED (incomplete)
...
```

### Summary Report (data_survey_summary.csv)

| Step | Value | Details |
|------|-------|---------|
| 1. Starting Records | 315 | Total records from data.txt files |
| 2. After Removing Test ID '111' Duplicates | 310 | 5 test ID duplicates removed |
| 3. Records Removed (Incomplete) | 120 | Records with N < max_N (45) |
| 4. Final Participants | 8 | Unique participant IDs |
| 5. Questionnaire Dimensions | 8 x 145 | Final combined dataset |

---

## Transcript Matching

### File Naming Convention

Transcripts follow pattern: `{id_person}_{type}_{timestamp}_transcript.json`

Example:
- `111_audio_missing_utopia_1779750864225_transcript.json`
- `111_audio_ranking_explanation_1779750598029_transcript.json`
- `cc33_audio_missing_utopia_1779175920347_transcript.json`

### Matching Logic

1. Extract participant ID from questionnaire: `PROLIFIC_PID` (e.g., "111")
2. Search transcript filenames for exact prefix match: `grepl("111", filename)`
3. Separate by type:
   - Contains "audio_missing_utopia" → `text_missingUtopia` column
   - Contains "audio_ranking_explanation" → `text_rankingUtopias` column
4. If multiple transcripts of same type:
   - Extract timestamp from filename or JSON metadata
   - Keep ONLY most recent (highest timestamp)
   - Log how many were deduplicated

### Example

Participant "111" has 3 missing_utopia transcripts with timestamps:
- 1779750864225 (keep - most recent)
- 1779276727208
- 1779758141170

Final output: `text_missingUtopia = transcript from 1779750864225`

---

## Sentiment Data Integration

### Overall Sentiment (overall_sentiment_and_embedding_YYYYMMDD_HHMMSS.csv)

Columns:
- `json_file`: Reference to transcript file (e.g., "111_audio_missing_utopia_1779750864225_transcript")
- `sentiment_label`: "positive", "negative", or "neutral"
- `sentiment_score`: Float 0.0-1.0 (confidence score)
- `num_windows`: Integer count of text windows analyzed

### Window-Level Sentiment (window_sentiments_YYYYMMDD_HHMMSS.csv)

Columns:
- `json_file`: Reference to transcript (same as above)
- `window_index`: Integer 0, 1, 2, ..., N
- `window_text`: Text snippet for that window
- `sentiment_label`: Sentiment for that specific window
- `sentiment_score`: Confidence score for that window

### Dynamic Column Creation

After loading window_sentiments, calculate max window index:
```
max_window_idx = max(all window_index values)
```

Then create columns:
```
window_0_sentimentLabel
window_1_sentimentLabel
window_2_sentimentLabel
...
window_N_sentimentLabel    (where N = max_window_idx)
```

### Example

For participant "111" with 7 windows of text:
```
window_0_sentimentLabel = "neutral"
window_1_sentimentLabel = "neutral"
window_2_sentimentLabel = "positive"
window_3_sentimentLabel = "neutral"
window_4_sentimentLabel = "neutral"
window_5_sentimentLabel = "negative"
window_6_sentimentLabel = "neutral"
window_7_sentimentLabel = NA  (if max_window_idx > 6)
```

---

## Output Files

### combined_data.rds
- R native binary format
- Preserves data types perfectly
- Recommended for analysis in R
- Load with: `readRDS("combined_data.rds")`

### combined_data.csv
- Text format, portable across software
- Use for sharing or import to other tools
- Load with: `read.csv("combined_data.csv")` in R

### combined_data.xlsx
- Excel format
- Includes multiple sheets if needed (future versions)
- Load with: `readxl::read_excel("combined_data.xlsx")`

### data_survey_summary.csv
- Filtering and quality control report
- Shows exactly what was removed and why
- Useful for documentation and reproducibility

---

## Running the Document

### Option 1: In RStudio
1. Open `3_prepareData.qmd` in RStudio
2. Click "Render" button
3. Output appears as HTML report + saved files

### Option 2: Command Line (with Quarto CLI)
```bash
cd /path/to/01_dataPreperation
quarto render 3_prepareData.qmd
```

### Option 3: Source in R Script
```r
setwd("/path/to/01_dataPreperation")
source("3_prepareData.qmd")  # Note: May need to extract R code first
```

---

## Troubleshooting

### Issue: "No data.txt files found"
**Solution**: Check that `data/results_survey/` exists with nested structure:
```
data/results_survey/
├── study_result_17079/
│   └── comp-result_26888/
│       └── data.txt
├── study_result_17074/
│   └── comp-result_26883/
│       └── data.txt
...
```

### Issue: "Some participants have no transcripts"
**Expected**: This is normal. Transcripts are only created for audio files that exist. Check:
- Are transcripts in `outputs/audio_transcripts/`?
- Do participant IDs match exactly?
- Are timestamps being extracted correctly?

### Issue: "Filtering removes all participants"
**Check**:
1. Run just the "combine and prepare" section
2. Look at `table(tmp$N)` - what's the max count?
3. Are there many incomplete IDs?
4. Try reducing filtering criteria (comment out filtering, keep all)

### Issue: "No sentiment files found"
**Expected**: Sentiment analysis is optional. If not run yet:
1. Run audio transcription first (outputs transcripts)
2. Run sentiment analysis on those transcripts
3. Then run this data preparation

The code gracefully handles missing sentiment files (fills with NA).

---

## Data Dictionary (Output Columns)

### From Survey Data
- `PROLIFIC_PID`: Participant ID (unique key)
- `sociodemo_*`: Demographic variables
- `PUR_*`: Scale items (Personalization Utility Rating)
- `AIAS_*`: Scale items (AI Attitude Scale)
- `PTTA_*`: Scale items (AI-Specific Threat Appraisal)
- `feedback_*`: Attention checks, feedback

### From Transcripts
- `text_missingUtopia`: Full transcript of "What utopian element is missing?" response
- `text_rankingUtopias`: Full transcript of ranking explanation response

### From Sentiment Analysis
- `sentiment_label`: Overall sentiment label (positive/negative/neutral)
- `sentiment_score`: Overall sentiment confidence (0-1)
- `num_windows`: Number of text windows analyzed
- `window_0_sentimentLabel`, `window_1_sentimentLabel`, ...: Per-window sentiment

---

## Example Analysis After Preparation

Once data is loaded:

```r
# Load combined data
data <- readRDS("outputs/questionnaire/combined_data.rds")

# Check data structure
dim(data)  # 8 rows x 145 columns
head(data)

# Analyze sentiment
table(data$sentiment_label)
# neutral  positive  negative
#       4         3         1

# Text analysis on transcripts
nchar(data$text_missingUtopia)
```

---

## Contact & Support

For issues or improvements, see TRANSCRIPTION_WORKFLOW.md and audio transcription documentation.

Questions about data preparation logic? Check the code comments in each section of 3_prepareData.qmd.
