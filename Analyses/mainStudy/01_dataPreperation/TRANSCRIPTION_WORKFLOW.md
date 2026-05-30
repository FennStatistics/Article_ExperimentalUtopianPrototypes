# Audio Transcription Pipeline Documentation

## Overview

The rewritten `1_transcribeData.ipynb` notebook provides a complete pipeline for:
1. **Decoding base64 audio** from JSON files → audio files
2. **Transcribing audio** using Whisper (openai/whisper-large-v3-turbo)
3. **Tracking progress** with skip logic for already-processed files
4. **Generating reports** (CSV summaries and error logs)

## Workflow

### Step 1: Load Required Modules
- Core libraries: `os`, `json`, `base64`, `pandas`, `torch`, `pathlib`
- Whisper: `transformers` (AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline)
- Progress tracking: `tqdm`

### Step 2: Configure Paths
Sets up directory structure:
```
data/results_audio/              ← Input (base64 audio in JSON)
outputs/
  ├── audio_files/              ← Output (decoded audio)
  └── audio_transcripts/        ← Output (transcriptions)
```

### Step 3: Define Helper Functions
- `get_file_extension()` - Maps MIME types to file extensions
- `generate_output_filename()` - Creates consistent filenames
- `decode_base64_audio()` - Decodes base64 and saves to disk
- `get_existing_files()` - Lists existing files to skip
- `find_audio_json_files()` - Recursively finds JSON files in data directory

### Step 4: Scan for Input Files
- Finds all `.json` files in `data/results_audio/*/*/files/`
- Returns list of file paths to process

### Step 5: Decode Base64 Audio
**Key feature: Skip logic**
- Checks if output file already exists
- If yes → skips (marked as "skipped" in report)
- If no → decodes base64 and saves
- Handles errors gracefully with detailed error logging

**Output format:**
- Filename: `{id_person}_{audio_type}_{timestamp}.{extension}`
- Example: `111_audio_ranking_explanation_1779750598029.webm`

### Step 6: Initialize Whisper Model
- Loads `openai/whisper-large-v3-turbo` model
- Auto-detects CUDA if available (falls back to CPU)
- Uses appropriate dtype (float16 for GPU, float32 for CPU)

### Step 7: Transcribe Audio Files
**Key feature: Skip logic**
- Checks if transcript already exists in `outputs/audio_transcripts/`
- If yes → skips (marked as "skipped" in report)
- If no → transcribes and saves as JSON
- Each transcript includes metadata (timestamp, processing time, language, model info)

**Output format:**
```json
{
  "audio_file": "111_audio_ranking_explanation_1779750598029.webm",
  "transcript": "...",
  "language": "en",
  "processing_time_seconds": 12.5,
  "timestamp": "2026-05-30T14:23:45.123456",
  "model": "openai/whisper-large-v3-turbo"
}
```

### Step 8: Generate Summary Reports
Creates three CSV files in `outputs/`:
1. **decode_summary_YYYYMMDD_HHMMSS.csv** - Processed audio files
2. **transcription_summary_YYYYMMDD_HHMMSS.csv** - Transcribed files + processing time
3. **error_log_YYYYMMDD_HHMMSS.csv** - Errors encountered (if any)

## Input Data Structure

Expected JSON format in `data/results_audio/*/*/files/`:
```json
{
  "id_person": "111",
  "type": "audio_ranking_explanation",
  "prompt": "...",
  "audio": "base64_encoded_audio_string",
  "audio_length": 765234,
  "audio_mime": "audio/webm;codecs=opus",
  "audio_size_bytes": 764500,
  "audio_duration_seconds": 47.496
}
```

## How to Run

### Option 1: Run All Steps
Simply execute all cells in order. The notebook will:
- Decode all new audio files
- Transcribe all new audio files
- Generate reports

### Option 2: Resume/Incremental Processing
When new data arrives:
1. Add JSON files to `data/results_audio/`
2. Re-run the notebook
3. Only NEW files will be processed (skips existing ones)
4. Generates new summary reports

### Option 3: Selective Processing
You can comment out specific sections:
- Comment Step 5 to skip audio decoding
- Comment Step 7 to skip transcription
- Useful for debugging or reprocessing transcripts only

## Performance Notes

- **Whisper model size**: ~3GB (first download may take time)
- **Processing time**: ~15-30 seconds per minute of audio (varies with hardware)
- **GPU acceleration**: Highly recommended for speed
  - With CUDA: ~2-3x faster
  - Without CUDA: Falls back to CPU (slower but works)

## Output Files

### Audio Files
Location: `outputs/audio_files/`
- Format: Depends on input (typically `.webm` or `.wav`)
- Naming: `{id_person}_{type}_{timestamp}.{ext}`

### Transcripts
Location: `outputs/audio_transcripts/`
- Format: JSON with metadata
- Naming: `{audio_filename}_transcript.json`

### Reports
Location: `outputs/`
- `*_summary_*.csv`: Success metrics
- `error_log_*.csv`: Error details

## Handling Errors

### Common Issues

**Issue: GPU out of memory**
- Solution: Reduce batch_size in transcription cell (default: 24)
- Or use CPU (slower but uses less memory)

**Issue: Missing dependencies**
- Solution: Install required packages:
  ```bash
  pip install torch transformers tqdm
  ```

**Issue: Corrupted audio file**
- Solution: Check error_log CSV for details
- File will be skipped on next run

## Example Workflow

```
Day 1:
├─ Run notebook: Decodes 10 audio files, transcribes 10
├─ Output: 10 audio files, 10 transcripts, summary CSVs

Day 2 (new data arrives):
├─ Add 5 new JSON files to data/results_audio/
├─ Run notebook: 
│  ├─ Skips 10 existing audio files
│  ├─ Decodes 5 new audio files
│  ├─ Skips 10 existing transcripts
│  └─ Transcribes 5 new audio files
└─ Output: New summary CSVs with Day 2 progress
```

## Customization

### Change output directory names
Edit Step 2 "Configure Paths":
```python
AUDIO_OUTPUT_DIR = BASE_DIR / "outputs" / "custom_audio_dir"
```

### Change Whisper model
Edit Step 6 "Initialize Whisper Model":
```python
model_id = "openai/whisper-large-v3"  # More accurate, slower
# or
model_id = "openai/whisper-base"      # Faster, less accurate
```

### Change batch size for transcription
Edit Step 7, batch_size parameter:
```python
result = pipe(str(audio_file), chunk_length_s=30, batch_size=16)
```

## Dependencies Required

```
pandas
torch
transformers
tqdm
```

Install via:
```bash
pip install pandas torch transformers tqdm
```

## Contact & Support

For issues or improvements, refer to:
- Whisper docs: https://huggingface.co/docs/transformers/model_doc/whisper
- OpenAI Whisper: https://github.com/openai/whisper
