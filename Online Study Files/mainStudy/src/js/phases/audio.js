/*
################### Audio Phases ###################
*/

const testAudioText = `
<header>
  <h2>Test your microphone</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <section>
      To test your microphone, click the record button (red dot) below and say a few words out loud.
      Click the button again to stop recording, then listen to the playback.
      You can repeat the test as often as you need.
      Click <kbd>Continue</kbd> once you can hear your recording clearly.
    </section>

    <section id="interface">
      <div id="controls">
        <button id="recBtn" disabled>&#x2B24;</button>
        <button id="retryMicBtn" type="button" style="display:none; margin-left: 0.5rem;">Request microphone access again</button>
      </div>
    </section>
    <div class="audio-status-center">
      <div id="clips"><i>Note: your recording preview will appear here.</i></div>
      <div id="errorMessage" style="display:none; margin-top: 0.75rem;"></div>
    </div>
  </div>
</main>

<form id="mic-test-form"></form>

<footer class="content-vertical-center content-horizontal-right">
  Continue unlocks after one successful test recording:&nbsp;
  <button id="continue" type="submit" form="mic-test-form">
    Continue &rarr;
  </button>
</footer>
`;

const feedbackAudio2Text = `
<header>
  <h2>Audio feedback: your missing utopia</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <section>
      Please describe a type of future society that you feel was missing from the previous presented future societies, and explain what would matters most in your future society.
    </section>
    <section style="margin-top: 0.5rem;">
      As in the microphone test you completed earlier, click the record button to start and click it again to stop. You may re-record your answer if you wish.
    </section>

    <section id="audio2-interface" style="margin-top: 1rem;">
      <div id="audio2-controls">
        <button id="audio2RecBtn" disabled>&#x2B24;</button>
        <button id="audio2RetryMicBtn" type="button" style="display:none; margin-left: 0.5rem;">Request microphone access again</button>
      </div>
      <div class="audio-status-center">
        <div id="audio2Clips" style="margin-top: 0.75rem;"><i>Note: your latest recording will appear here.</i></div>
        <div id="audio2ErrorMessage" style="display:none; margin-top: 0.75rem;"></div>
      </div>
    </section>
  </div>
</main>

<form id="audio2-form"></form>

<footer class="content-vertical-center content-horizontal-right">
  You can only continue after recording an answer:&nbsp;
  <button id="continue" type="submit" form="audio2-form">Continue &rarr;</button>
</footer>
`;

const rankingWithAudioText = `
<header>
  <h2>Rank the societies and explain your ranking</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <section>
      This step has two parts. First, rank all of the future societies. Then, record a short explanation of your reasoning.
    </section>
    <section style="margin-top: 0.5rem;">
      Drag societies from the left list into the right list. Arrange them from 1 (least preferred) to 7 (most preferred).
    </section>

    <section style="margin-top: 1rem;">
      <style>
        .ranking-columns { display: flex; gap: 20px; align-items: flex-start; }
        .ranking-column { flex: 1; }
        .ranking-column h3 { margin: 0 0 8px 0; font-size: 20px; }
        .ranking-list {
          list-style: none;
          margin: 0;
          padding: 8px;
          min-height: 620px;
          height: 620px;
          overflow-y: visible;
          border: 1px solid #bdbdbd;
          border-radius: 8px;
          background: #fafafa;
        }
        #rankingPoolCombined, #rankingTargetCombined { height: 620px; }
        .ranking-item {
          margin: 6px 0;
          padding: 10px 12px;
          border: 1px solid #d5d5d5;
          border-radius: 6px;
          background: #fff;
          cursor: move;
        }
        .ranking-rank {
          display: inline-block;
          min-width: 28px;
          font-weight: 700;
        }
        .ranking-placeholder {
          border: 2px dashed #8e8e8e;
          border-radius: 6px;
          height: 44px;
          margin: 6px 0;
          background: #f0f0f0;
        }
      </style>
      <div class="ranking-columns">
        <div class="ranking-column">
          <h3>Available societies (A-Z)</h3>
          <ul id="rankingPoolCombined" class="ranking-list"></ul>
        </div>
        <div class="ranking-column">
          <h3>Your ranking (top = 1, bottom = 7)</h3>
          <ul id="rankingTargetCombined" class="ranking-list"></ul>
        </div>
      </div>
      <div id="rankingCombinedError" style="margin-top: 10px; color: #b00020; font-weight: 600; visibility: hidden;">
         Please move all 7 societies to the right-hand list.
      </div>
      <div id="rankingLockWrap" style="margin-top: 12px; display: none;">
         <p style="margin: 0 0 8px 0;">When you are satisfied with the order, lock your ranking. You can still reorder items before locking.</p>
        <button id="rankingLockBtn" type="button">Lock ranking and continue to audio</button>
      </div>
    </section>

    <section id="combinedAudioSection" style="margin-top: 1rem; display: none;">
      <p>Your ranking is now locked. Please record a short explanation of why you ranked the societies this way. As before, click the record button to start and click it again to stop. You may re-record if needed.</p>
      <div id="audioCombinedControls">
        <button id="audioCombinedRecBtn" disabled>&#x2B24;</button>
        <button id="audioCombinedRetryMicBtn" type="button" style="display:none; margin-left: 0.5rem;">Request microphone access again</button>
      </div>
      <div class="audio-status-center">
        <div id="audioCombinedClips" style="margin-top: 0.75rem;"><i>Note: your latest recording will appear here.</i></div>
        <div id="audioCombinedErrorMessage" style="display:none; margin-top: 0.75rem;"></div>
      </div>
    </section>
  </div>
</main>

<form id="ranking-audio-form"></form>

<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="ranking-audio-form">Continue &rarr;</button>
</footer>
`;

let testAudioRecorder = null;
let testAudioStream = null;
let testAudioChunks = [];
let testAudioClipUrl = null;
let hasTestRecording = false;
let testRecordingStartTime = null;
let testDetectedSpeech = false;

const hasJatosRuntime = function () {
  return !localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function";
};

const stopStream = function (stream) {
  if (stream) stream.getTracks().forEach((track) => track.stop());
  return null;
};

const revokeObjectUrl = function (url) {
  if (url) window.URL.revokeObjectURL(url);
  return null;
};

const setElementVisible = function (id, visible, displayMode = "inline-block") {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = visible ? displayMode : "none";
};

const setErrorText = function (id, message) {
  const errorDiv = document.getElementById(id);
  if (!errorDiv) return;
  if (message) {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
  } else {
    errorDiv.textContent = "";
    errorDiv.style.display = "none";
  }
};

const formatSeconds = function (seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0.0";
  return seconds.toFixed(1);
};

const formatBytes = function (bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const blobToDataUrl = async function (blob) {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const getAudioMeta = function (blob, fallbackSeconds) {
  return {
    mime: blob.type || "audio/webm",
    sizeBytes: blob.size,
    durationSeconds: Math.max(0, fallbackSeconds || 0),
  };
};

const renderClipCard = function (blobUrl, audioMeta, labelText) {
  const clip = document.createElement("div");
  clip.style.border = "1px solid #d7dde4";
  clip.style.borderRadius = "12px";
  clip.style.padding = "0.9rem";
  clip.style.marginTop = "0.75rem";
  clip.style.background = "linear-gradient(180deg, #f9fbff 0%, #f3f7fb 100%)";

  const title = document.createElement("strong");
  title.textContent = labelText;
  clip.appendChild(title);

  const audio = document.createElement("audio");
  audio.src = blobUrl;
  audio.controls = true;
  audio.style.width = "100%";
  audio.style.marginTop = "0.5rem";
  clip.appendChild(audio);

  const stats = document.createElement("div");
  stats.style.marginTop = "0.5rem";
  stats.style.fontSize = "0.95rem";
  stats.style.color = "#2f3d4c";
  stats.textContent = `Size: ${formatBytes(audioMeta.sizeBytes)} | Approx. duration: ${formatSeconds(audioMeta.durationSeconds)} s`;
  clip.appendChild(stats);
  return clip;
};

// SAFARI/MAC FIX: Detect the best supported audio MIME type for the current browser.
// Safari only supports audio/mp4; Chrome/Firefox prefer audio/webm.
const getSupportedAudioMime = function () {
  if (typeof MediaRecorder === "undefined") return "";
  if (MediaRecorder.isTypeSupported("audio/webm")) return "audio/webm";
  if (MediaRecorder.isTypeSupported("audio/mp4")) return "audio/mp4";
  return "";
};

// SAFARI/MAC FIX: Create a MediaRecorder with an explicit, supported MIME type.
// Returns both the recorder and the negotiated MIME so callers can use it as a
// blob-type fallback in onstop (prevents Safari "Error 3" on createObjectURL).
const createSafeRecorder = function (stream) {
  const mimeType = getSupportedAudioMime();
  const options = mimeType ? { mimeType } : {};
  return { recorder: new MediaRecorder(stream, options), mimeType };
};

// Resolve the final blob MIME type, preferring what the recorder actually used,
// then the negotiated supported MIME, then a Safari-safe default.
const resolveBlobMime = function (recorder, supportedMime) {
  return (recorder && recorder.mimeType) || supportedMime || "audio/mp4";
};

const detectSpeech = async function (blob) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();

    // SAFARI FIX: Force the context to wake up
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const arrayBuffer = await blob.arrayBuffer();

    // SAFARI FIX: Callback syntax wrapped in a Promise
    const buf = await new Promise((resolve, reject) => {
      ctx.decodeAudioData(
        arrayBuffer,
        (decodedData) => resolve(decodedData),
        (error) => reject(error)
      );
    });

    ctx.close();

    const samples = buf.getChannelData(0);
    const frameLen = Math.floor(buf.sampleRate * 0.05); // 50ms frames
    const rmsValues = [];

    for (let i = 0; i < samples.length; i += frameLen) {
      let sumSq = 0;
      const end = Math.min(i + frameLen, samples.length);
      for (let j = i; j < end; j++) sumSq += samples[j] * samples[j];
      rmsValues.push(Math.sqrt(sumSq / (end - i)));
    }

    if (rmsValues.length === 0) return false;

    // 1. Sort to find the background noise floor (10th percentile of volume)
    const sortedRms = [...rmsValues].sort((a, b) => a - b);
    const maxRMS = sortedRms[sortedRms.length - 1];
    const noiseFloor = sortedRms[Math.floor(sortedRms.length * 0.1)] || 0.0001;

    // 2. Absolute silence check (microphone is likely muted or disconnected)
    if (maxRMS < 0.001) {
        console.log("Speech detection failed: Audio is completely silent.");
        return false;
    }

    // 3. Dynamic thresholding
    // We look for frames at least 2.5x louder than the background noise.
    // We cap this threshold at 0.01 so loud continuous speech doesn't become its own noise floor.
    const threshold = Math.min(noiseFloor * 2.5, 0.01);

    // 4. Count how many 50ms frames contain speech
    // Require the frame to be above the dynamic threshold AND above a strict absolute minimum (0.002)
    const activeFrames = rmsValues.filter(v => v > threshold && v > 0.002).length;

    // 5. Require at least 0.5 seconds of total speech (10 frames)
    // This allows a 1-second utterance in a 15-second recording to pass successfully.
    const speechDurationSeconds = activeFrames * 0.05;

    console.log(`Speech detection - Max RMS: ${maxRMS.toFixed(4)}, Noise Floor: ${noiseFloor.toFixed(4)}, Threshold: ${threshold.toFixed(4)}, Active speech: ${speechDurationSeconds.toFixed(2)}s`);

    return speechDurationSeconds >= 0.5;
  } catch (_e) {
    console.error("Speech detection failed:", _e);
    return false;
  }
};

const getMicErrorMessage = function (err) {
  switch (err && err.name) {
    case "NotAllowedError":
    case "PermissionDeniedError":
      return "Microphone access was denied. Please allow access and click 'Request microphone access again'.";
    case "NotFoundError":
    case "DevicesNotFoundError":
      return "No microphone was detected. Please connect a microphone and try again.";
    case "NotReadableError":
    case "TrackStartError":
      return "Microphone is currently unavailable (possibly used by another app/tab). Close other apps and try again.";
    default:
      return "Microphone access failed. Please check your browser settings and try again.";
  }
};

const submitResultDataToJatos = async function () {
  if (!hasJatosRuntime()) return;
  const resultJson = study.options.datastore.exportJson();
  await jatos.submitResultData(resultJson).catch(() => console.log("error"));
};

const advanceProgress = function () {
  numElementsCounter++;
  document.querySelector(".progress-bar").style.width = (numElementsCounter / numElements) * 100 + "%";
};

const setupMicRecorder = async function () {
  setErrorText("errorMessage", "");
  setElementVisible("retryMicBtn", false);

  const recBtn = document.getElementById("recBtn");
  if (recBtn) {
    recBtn.disabled = true;
    recBtn.classList.remove("recording");
    recBtn.onclick = null;
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setErrorText("errorMessage", "Audio recording is not supported by this browser.");
    return;
  }

  try {
    testAudioStream = stopStream(testAudioStream);
    testAudioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // SAFARI/MAC FIX: Use shared helper for MIME detection + recorder creation
    const { recorder, mimeType: supportedMime } = createSafeRecorder(testAudioStream);
    testAudioRecorder = recorder;
    testAudioChunks = [];

    testAudioRecorder.ondataavailable = function (evt) {
      if (evt.data && evt.data.size > 0) testAudioChunks.push(evt.data);
    };

    testAudioRecorder.onstop = async function () {
      // SAFARI/MAC FIX: Empty-chunks guard prevents Error 3 on empty blobs
      if (testAudioChunks.length === 0) {
        setErrorText("errorMessage", "Recording failed (no audio data). Please try again.");
        return;
      }

      const finalMimeType = resolveBlobMime(testAudioRecorder, supportedMime);
      const blob = new Blob(testAudioChunks, { type: finalMimeType });
      testAudioChunks = [];

      testAudioClipUrl = revokeObjectUrl(testAudioClipUrl);
      testAudioClipUrl = window.URL.createObjectURL(blob);

      const fallbackSeconds = testRecordingStartTime ? (Date.now() - testRecordingStartTime) / 1000 : 0;
      const audioMeta = getAudioMeta(blob, fallbackSeconds);
      const clips = document.getElementById("clips");
      if (clips) {
        clips.innerHTML = "";
        clips.appendChild(renderClipCard(testAudioClipUrl, audioMeta, "Latest recording"));
      }

      hasTestRecording = true;
      testDetectedSpeech = await detectSpeech(blob);
      testRecordingStartTime = null;

      if (testDetectedSpeech) {
        $("#continue").show();
        setErrorText("errorMessage", "");
      } else {
        setErrorText("errorMessage", "No speech detected. Please speak clearly into the microphone.");
      }
    };

    if (!recBtn) return;
    recBtn.disabled = false;
    recBtn.onclick = function (event) {
      event.preventDefault();
      setErrorText("errorMessage", "");

      if (!testAudioRecorder) return;
      if (testAudioRecorder.state === "recording") {
        testAudioRecorder.stop();
        recBtn.classList.remove("recording");
      } else {
        testAudioChunks = [];
        testRecordingStartTime = Date.now();
        testAudioRecorder.start();
        recBtn.classList.add("recording");
      }
    };
  } catch (err) {
    setErrorText("errorMessage", getMicErrorMessage(err));
    setElementVisible("retryMicBtn", true);
  }
};

const TestAudio_htmlForm = new lab.html.Form({
  title: "Microphone Test",
  content: testAudioText,
  tardy: true,
  messageHandlers: {
    prepare: function () {
      hasTestRecording = false;
      testDetectedSpeech = false;
      testAudioClipUrl = revokeObjectUrl(testAudioClipUrl);
    },
    run: function () {
      $("#continue").hide();
      setErrorText("errorMessage", "");
      const retryBtn = document.getElementById("retryMicBtn");
      if (retryBtn) {
        retryBtn.onclick = function (event) {
          event.preventDefault();
          setupMicRecorder();
        };
      }
      setupMicRecorder();
    },
    commit: function () {
      /*
      if (!hasTestRecording) {
        setErrorText("errorMessage", "Please complete at least one successful test recording before continuing.");
        throw new Error("Microphone test not completed");
      }
      if (!testDetectedSpeech) {
        setErrorText("errorMessage", "No speech was detected in your recording. Please speak clearly into the microphone and try again.");
        throw new Error("No speech detected");
      }
        */
      if (testAudioRecorder && testAudioRecorder.state === "recording") testAudioRecorder.stop();
      testAudioStream = stopStream(testAudioStream);
      study.options.datastore.set("mic_test_passed", 1);
      advanceProgress();
    },
  },
});

const createSingleAudioForm = function (opts) {
  let recorder = null;
  let stream = null;
  let chunks = [];
  let clipUrl = null;
  let hasRecording = false;
  let recordingStartTime = null;
  let audioData = null;
  let audioBlob = null;
  let durationSeconds = null;
  let supportedMime = "";

  const setupRecorder = async function () {
    setErrorText(opts.errorId, "");
    setElementVisible(opts.retryBtnId, false);
    const recBtn = document.getElementById(opts.recBtnId);
    if (recBtn) {
      recBtn.disabled = true;
      recBtn.classList.remove("recording");
      recBtn.onclick = null;
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErrorText(opts.errorId, "Audio recording is not supported by this browser.");
      return;
    }
    try {
      stream = stopStream(stream);
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // SAFARI/MAC FIX: Use shared helper for MIME detection + recorder creation
      const created = createSafeRecorder(stream);
      recorder = created.recorder;
      supportedMime = created.mimeType;
      chunks = [];

      recorder.ondataavailable = function (evt) {
        if (evt.data && evt.data.size > 0) chunks.push(evt.data);
      };

      recorder.onstop = async function () {
        // SAFARI/MAC FIX: Empty-chunks guard prevents Error 3 on empty blobs
        if (chunks.length === 0) {
          setErrorText(opts.errorId, "Recording failed (no audio data). Please try again.");
          if (recBtn) recBtn.classList.remove("recording");
          return;
        }

        // SAFARI/MAC FIX: Use negotiated MIME instead of hardcoded "audio/webm"
        const finalMimeType = resolveBlobMime(recorder, supportedMime);
        const blob = new Blob(chunks, { type: finalMimeType });
        chunks = [];
        clipUrl = revokeObjectUrl(clipUrl);
        clipUrl = window.URL.createObjectURL(blob);
        const fallbackSeconds = recordingStartTime ? (Date.now() - recordingStartTime) / 1000 : 0;
        const audioMeta = getAudioMeta(blob, fallbackSeconds);
        audioData = await blobToDataUrl(blob);
        audioBlob = blob;
        durationSeconds = audioMeta.durationSeconds;

        const clips = document.getElementById(opts.clipsId);
        if (clips) {
          clips.innerHTML = "";
          clips.appendChild(renderClipCard(clipUrl, audioMeta, "Latest recording"));
        }
        hasRecording = true;
        recordingStartTime = null;
        $(opts.continueSelector).show();
        if (recBtn) recBtn.classList.remove("recording");
      };

      if (!recBtn) return;
      recBtn.disabled = false;
      recBtn.onclick = function (event) {
        event.preventDefault();
        if (!recorder) return;
        if (recorder.state === "recording") {
          recorder.stop();
          recBtn.classList.remove("recording");
        } else {
          chunks = [];
          recordingStartTime = Date.now();
          recorder.start();
          recBtn.classList.add("recording");
        }
      };
    } catch (err) {
      setErrorText(opts.errorId, getMicErrorMessage(err));
      setElementVisible(opts.retryBtnId, true);
    }
  };

  return new lab.html.Form({
    title: opts.title,
    content: opts.content,
    tardy: true,
    messageHandlers: {
      prepare: function () {
        hasRecording = false;
        audioData = null;
        audioBlob = null;
        durationSeconds = null;
        clipUrl = revokeObjectUrl(clipUrl);
      },
      run: function () {
        $(opts.continueSelector).hide();
        setErrorText(opts.errorId, "");
        const retryBtn = document.getElementById(opts.retryBtnId);
        if (retryBtn) {
          retryBtn.onclick = function (event) {
            event.preventDefault();
            setupRecorder();
          };
        }
        setupRecorder();
      },
      commit: async function () {
        if (!hasRecording || !audioData) {
          setErrorText(opts.errorId, "Please record your answer before continuing.");
          throw new Error("Audio response missing");
        }
        if (recorder && recorder.state === "recording") recorder.stop();
        stream = stopStream(stream);

        // SAFARI/MAC FIX: Use resolved blob MIME instead of hardcoded "audio/webm"
        const blobMime = audioBlob ? (audioBlob.type || supportedMime || "audio/mp4") : (supportedMime || "audio/mp4");

        study.options.datastore.set(`${opts.keyPrefix}_prompt`, opts.prompt);
        study.options.datastore.set(`${opts.keyPrefix}_audio`, audioData);
        study.options.datastore.set(`${opts.keyPrefix}_audio_length`, audioData.length);
        if (audioBlob) {
          study.options.datastore.set(`${opts.keyPrefix}_audio_mime`, blobMime);
          study.options.datastore.set(`${opts.keyPrefix}_audio_size_bytes`, audioBlob.size);
        }
        if (durationSeconds !== null) {
          study.options.datastore.set(`${opts.keyPrefix}_audio_duration_seconds`, durationSeconds);
        }

        if (hasJatosRuntime()) {
          await submitResultDataToJatos();
          const participantId =
            study.options.datastore.state.sociodemo_pseudoID ||
            study.options.datastore.state.PROLIFIC_PID ||
            "unknown";
          const payload = {
            id_person: participantId,
            type: opts.keyPrefix,
            prompt: opts.prompt,
            audio: audioData,
            audio_length: audioData.length,
            audio_mime: blobMime,
            audio_size_bytes: audioBlob ? audioBlob.size : null,
            audio_duration_seconds: durationSeconds,
          };
          await jatos
            .uploadResultFile(payload, `${opts.keyPrefix}_${participantId}_${Date.now()}.json`)
            .catch(() => console.log("audio upload failed"));
        }

        advanceProgress();
      },
    },
  });
};

const RankingWithAudio_htmlForm = new lab.html.Form({
  title: "Ranking With Audio",
  content: rankingWithAudioText,
  tardy: true,
  messageHandlers: {
    prepare: function () {
      this._rankingLocked = false;
      this._hasRecording = false;
      this._audioData = null;
      this._audioBlob = null;
      this._durationSeconds = null;
      this._clipUrl = null;
      this._stream = null;
      this._recorder = null;
      this._chunks = [];
      this._recordingStartTime = null;
      this._supportedMime = "";
      this._rankingDndEvents = [];
      this._rankingDndStartTs = Date.now();
      this._rankingDndFirstInteractionTs = null;
      this._rankingDndMoveCount = 0;
      this._rankingDndReorderCount = 0;
    },
    run: function () {
      const self = this;
      const societies = [
        { code: "rank_ai_centered", label: "AI-Centered Utopia" },
        { code: "rank_futurist", label: "Futurist Utopia" },
        { code: "rank_institutional", label: "Institutional (Law-Based) Utopia" },
        { code: "rank_modern_green", label: "Modern Green Utopia" },
        { code: "rank_moral_anarchic", label: "Moral Commonwealth (Anarchic) Utopia" },
        { code: "rank_primitivist", label: "Primitivist (Arcadian) Utopia" },
        { code: "rank_religious", label: "Religious Utopia" },
      ];

      const $pool = $("#rankingPoolCombined");
      const $target = $("#rankingTargetCombined");
      const $error = $("#rankingCombinedError");
      const $lockWrap = $("#rankingLockWrap");
      const $continue = $("#continue");
      $continue.hide();

      $pool.empty();
      $target.empty();
      societies
        .slice()
        .sort((a, b) => a.label.localeCompare(b.label))
        .forEach((item) => {
          $pool.append(`<li class="ranking-item" data-code="${item.code}"><span class="ranking-rank"></span>${item.label}</li>`);
        });

      const updateRanksAndValidity = function () {
        $("#rankingTargetCombined .ranking-item").each(function (idx) {
          $(this).find(".ranking-rank").text(`${idx + 1}. `);
        });
        $("#rankingPoolCombined .ranking-item").find(".ranking-rank").text("");
        const valid = $("#rankingTargetCombined .ranking-item").length === 7;
        $error.css("visibility", valid ? "hidden" : "visible");
        if (!self._rankingLocked) $lockWrap.toggle(valid);
      };

      const logEvent = function (evtType, ui, fromList, toList) {
        const ts = Date.now();
        if (!self._rankingDndFirstInteractionTs) self._rankingDndFirstInteractionTs = ts;
        self._rankingDndEvents.push({
          type: evtType,
          item_code: ui.item.attr("data-code"),
          from: fromList,
          to: toList,
          to_index: ui.item.index(),
          ts,
          ms_since_start: ts - self._rankingDndStartTs,
        });
      };

      $("#rankingPoolCombined, #rankingTargetCombined").sortable({
        connectWith: ".ranking-list",
        placeholder: "ranking-placeholder",
        tolerance: "pointer",
        start: function (_event, ui) {
          ui.item.data("fromList", this.id);
        },
        receive: function (_event, ui) {
          self._rankingDndMoveCount++;
          logEvent("receive", ui, ui.item.data("fromList"), this.id);
          updateRanksAndValidity();
        },
        update: function (_event, ui) {
          if (this.id === "rankingTargetCombined" && ui.sender == null) {
            self._rankingDndReorderCount++;
            self._rankingDndMoveCount++;
            logEvent("reorder", ui, this.id, this.id);
          }
          updateRanksAndValidity();
        },
      });

      const setupCombinedRecorder = async function () {
        setErrorText("audioCombinedErrorMessage", "");
        setElementVisible("audioCombinedRetryMicBtn", false);
        const recBtn = document.getElementById("audioCombinedRecBtn");
        if (recBtn) {
          recBtn.disabled = true;
          recBtn.classList.remove("recording");
          recBtn.onclick = null;
        }
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setErrorText("audioCombinedErrorMessage", "Audio recording is not supported by this browser.");
          return;
        }
        try {
          self._stream = stopStream(self._stream);
          self._stream = await navigator.mediaDevices.getUserMedia({ audio: true });

          // SAFARI/MAC FIX: Use shared helper for MIME detection + recorder creation
          const created = createSafeRecorder(self._stream);
          self._recorder = created.recorder;
          self._supportedMime = created.mimeType;
          self._chunks = [];

          self._recorder.ondataavailable = function (evt) {
            if (evt.data && evt.data.size > 0) self._chunks.push(evt.data);
          };

          self._recorder.onstop = async function () {
            // SAFARI/MAC FIX: Empty-chunks guard prevents Error 3 on empty blobs
            if (self._chunks.length === 0) {
              setErrorText("audioCombinedErrorMessage", "Recording failed (no audio data). Please try again.");
              if (recBtn) recBtn.classList.remove("recording");
              return;
            }

            // SAFARI/MAC FIX: Use negotiated MIME instead of hardcoded "audio/webm"
            const finalMimeType = resolveBlobMime(self._recorder, self._supportedMime);
            const blob = new Blob(self._chunks, { type: finalMimeType });
            self._chunks = [];
            self._clipUrl = revokeObjectUrl(self._clipUrl);
            self._clipUrl = window.URL.createObjectURL(blob);
            const fallbackSeconds = self._recordingStartTime ? (Date.now() - self._recordingStartTime) / 1000 : 0;
            const audioMeta = getAudioMeta(blob, fallbackSeconds);
            self._audioData = await blobToDataUrl(blob);
            self._audioBlob = blob;
            self._durationSeconds = audioMeta.durationSeconds;
            const clips = document.getElementById("audioCombinedClips");
            if (clips) {
              clips.innerHTML = "";
              clips.appendChild(renderClipCard(self._clipUrl, audioMeta, "Latest recording"));
            }
            self._hasRecording = true;
            self._recordingStartTime = null;
            $("#continue").show();
            if (recBtn) recBtn.classList.remove("recording");
          };

          if (!recBtn) return;
          recBtn.disabled = false;
          recBtn.onclick = function (event) {
            event.preventDefault();
            if (!self._recorder) return;
            if (self._recorder.state === "recording") {
              self._recorder.stop();
              recBtn.classList.remove("recording");
            } else {
              self._chunks = [];
              self._recordingStartTime = Date.now();
              self._recorder.start();
              recBtn.classList.add("recording");
            }
          };
        } catch (err) {
          setErrorText("audioCombinedErrorMessage", getMicErrorMessage(err));
          setElementVisible("audioCombinedRetryMicBtn", true);
        }
      };

      const lockButton = document.getElementById("rankingLockBtn");
      if (lockButton) {
        lockButton.onclick = function () {
          const orderCodes = $("#rankingTargetCombined .ranking-item")
            .map(function () { return $(this).attr("data-code"); })
            .get();
          if (orderCodes.length !== 7) {
            document.getElementById("rankingCombinedError").style.visibility = "visible";
            return;
          }
          self._rankingLocked = true;
          $("#rankingPoolCombined, #rankingTargetCombined").sortable("disable");
          lockButton.disabled = true;
          lockButton.textContent = "Ranking locked";
          study.options.datastore.set("ranking_locked", 1);
          study.options.datastore.set("ranking_lock_ts", Date.now());
          study.options.datastore.set("ranking_lock_order", orderCodes);
          document.getElementById("combinedAudioSection").style.display = "block";
          const retryBtn = document.getElementById("audioCombinedRetryMicBtn");
          if (retryBtn) {
            retryBtn.onclick = function (event) {
              event.preventDefault();
              setupCombinedRecorder();
            };
          }
          setupCombinedRecorder();
        };
      }

      updateRanksAndValidity();
    },
    commit: async function () {
      const orderCodes = $("#rankingTargetCombined .ranking-item")
        .map(function () { return $(this).attr("data-code"); })
        .get();

      if (!this._rankingLocked || orderCodes.length !== 7) {
        document.getElementById("rankingCombinedError").style.visibility = "visible";
        throw new Error("Ranking not locked or incomplete");
      }
      if (!this._hasRecording || !this._audioData) {
        setErrorText("audioCombinedErrorMessage", "Please record your explanation before continuing.");
        throw new Error("Audio response missing");
      }

      orderCodes.forEach((code, idx) => {
        study.options.datastore.set(code, idx + 1);
      });
      study.options.datastore.set("ranking_final_order", orderCodes);
      study.options.datastore.set("ranking_dnd_events", this._rankingDndEvents);
      study.options.datastore.set("ranking_dnd_move_count", this._rankingDndMoveCount);
      study.options.datastore.set("ranking_dnd_reorder_count", this._rankingDndReorderCount);
      study.options.datastore.set(
        "ranking_dnd_duration_ms",
        this._rankingDndFirstInteractionTs ? Date.now() - this._rankingDndFirstInteractionTs : 0,
      );

      if (this._recorder && this._recorder.state === "recording") this._recorder.stop();
      this._stream = stopStream(this._stream);

      // SAFARI/MAC FIX: Use resolved blob MIME instead of hardcoded "audio/webm"
      const blobMime = this._audioBlob
        ? (this._audioBlob.type || this._supportedMime || "audio/mp4")
        : (this._supportedMime || "audio/mp4");

      const prompt = "Please explain why you ranked some future societies higher and others lower.";
      study.options.datastore.set("audio_ranking_explanation_prompt", prompt);
      study.options.datastore.set("audio_ranking_explanation_audio", this._audioData);
      study.options.datastore.set("audio_ranking_explanation_audio_length", this._audioData.length);
      if (this._audioBlob) {
        study.options.datastore.set("audio_ranking_explanation_audio_mime", blobMime);
        study.options.datastore.set("audio_ranking_explanation_audio_size_bytes", this._audioBlob.size);
      }
      if (this._durationSeconds !== null) {
        study.options.datastore.set("audio_ranking_explanation_audio_duration_seconds", this._durationSeconds);
      }

      if (hasJatosRuntime()) {
        await submitResultDataToJatos();
        const participantId =
          study.options.datastore.state.sociodemo_pseudoID ||
          study.options.datastore.state.PROLIFIC_PID ||
          "unknown";
        const payload = {
          id_person: participantId,
          type: "audio_ranking_explanation",
          prompt,
          audio: this._audioData,
          audio_length: this._audioData.length,
          audio_mime: blobMime,
          audio_size_bytes: this._audioBlob ? this._audioBlob.size : null,
          audio_duration_seconds: this._durationSeconds,
        };
        await jatos
          .uploadResultFile(payload, `audio_ranking_explanation_${participantId}_${Date.now()}.json`)
          .catch(() => console.log("audio upload failed"));
      }

      advanceProgress();
    },
  },
});

const MissingUtopiaAudio_htmlForm = createSingleAudioForm({
  title: "Audio Feedback 2",
  content: feedbackAudio2Text,
  recBtnId: "audio2RecBtn",
  retryBtnId: "audio2RetryMicBtn",
  clipsId: "audio2Clips",
  errorId: "audio2ErrorMessage",
  continueSelector: "#continue",
  keyPrefix: "audio_missing_utopia",
  prompt: "Please describe a type of utopia you feel is missing from the presented set and explain what matters most about it.",
});
