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
      If no error message appears, use the record button (red dot) below to test your microphone.
      Click the record button again to stop recording, then listen to your recording.
      You can repeat this test as often as needed.
      Click <kbd>Continue</kbd> when your microphone test works.
    </section>

    <section id="interface">
      <div id="controls">
        <button id="recBtn" disabled>&#x2B24;</button>
        <button id="retryMicBtn" type="button" style="display:none; margin-left: 0.5rem;">Request microphone access again</button>
      </div>
    </section>
    <div class="audio-status-center">
      <div id="clips"><i>Note: your recording preview will appear here.</i></div>
      <div id="errorMessage" style="display:none; margin-top: 0.75rem; color: #c62828;"></div>
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

const feedbackAudio1Text = `
<header>
  <h2>Audio feedback 1: Explain your ranking</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <section>
      Please explain why you ranked some future societies higher and others lower.
    </section>
    <section style="margin-top: 0.5rem;">
      Click the record button to start. Click it again to stop. You can re-record.
    </section>

    <section id="audio1-interface" style="margin-top: 1rem;">
      <div id="audio1-controls">
        <button id="audio1RecBtn" disabled>&#x2B24;</button>
        <button id="audio1RetryMicBtn" type="button" style="display:none; margin-left: 0.5rem;">Request microphone access again</button>
      </div>
      <div class="audio-status-center">
        <div id="audio1Clips" style="margin-top: 0.75rem;"><i>Note: your latest recording will appear here.</i></div>
        <div id="audio1ErrorMessage" style="display:none; margin-top: 0.75rem; color: #c62828;"></div>
      </div>
    </section>
  </div>
</main>

<form id="audio1-form"></form>

<footer class="content-vertical-center content-horizontal-right">
  You can only continue after recording an answer:&nbsp;
  <button id="audio1Continue" type="submit" form="audio1-form">Continue &rarr;</button>
</footer>
`;

const feedbackAudio2Text = `
<header>
  <h2>Audio feedback 2: Missing utopia</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <section>
      Please describe a type of utopia you feel is missing from the presented set and explain what matters most about it.
    </section>
    <section style="margin-top: 0.5rem;">
      Click the record button to start. Click it again to stop. You can re-record.
    </section>

    <section id="audio2-interface" style="margin-top: 1rem;">
      <div id="audio2-controls">
        <button id="audio2RecBtn" disabled>&#x2B24;</button>
        <button id="audio2RetryMicBtn" type="button" style="display:none; margin-left: 0.5rem;">Request microphone access again</button>
      </div>
      <div class="audio-status-center">
        <div id="audio2Clips" style="margin-top: 0.75rem;"><i>Note: your latest recording will appear here.</i></div>
        <div id="audio2ErrorMessage" style="display:none; margin-top: 0.75rem; color: #c62828;"></div>
      </div>
    </section>
  </div>
</main>

<form id="audio2-form"></form>

<footer class="content-vertical-center content-horizontal-right">
  You can only continue after recording an answer:&nbsp;
  <button id="audio2Continue" type="submit" form="audio2-form">Continue &rarr;</button>
</footer>
`;

let testAudioRecorder = null;
let testAudioStream = null;
let testAudioChunks = [];
let testAudioClipUrl = null;
let hasTestRecording = false;
let testRecordingStartTime = null;

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
    testAudioRecorder = new MediaRecorder(testAudioStream);
    testAudioChunks = [];

    testAudioRecorder.ondataavailable = function (evt) {
      if (evt.data && evt.data.size > 0) testAudioChunks.push(evt.data);
    };

    testAudioRecorder.onstop = function () {
      const blob = new Blob(testAudioChunks, { type: testAudioRecorder.mimeType || "audio/webm" });
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
      testRecordingStartTime = null;
      $("#continue").show();
    };

    if (!recBtn) return;
    recBtn.disabled = false;
    recBtn.onclick = function (event) {
      event.preventDefault();
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
      if (!hasTestRecording) {
        setErrorText("errorMessage", "Please complete at least one successful test recording before continuing.");
        throw new Error("Microphone test not completed");
      }
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
      recorder = new MediaRecorder(stream);
      chunks = [];

      recorder.ondataavailable = function (evt) {
        if (evt.data && evt.data.size > 0) chunks.push(evt.data);
      };

      recorder.onstop = async function () {
        const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
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

        study.options.datastore.set(`${opts.keyPrefix}_prompt`, opts.prompt);
        study.options.datastore.set(`${opts.keyPrefix}_audio`, audioData);
        study.options.datastore.set(`${opts.keyPrefix}_audio_length`, audioData.length);
        if (audioBlob) {
          study.options.datastore.set(`${opts.keyPrefix}_audio_mime`, audioBlob.type || "audio/webm");
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
            audio_mime: audioBlob ? audioBlob.type || "audio/webm" : "audio/webm",
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

const FeedbackAudio1Placeholder_htmlForm = createSingleAudioForm({
  title: "Audio Feedback 1",
  content: feedbackAudio1Text,
  recBtnId: "audio1RecBtn",
  retryBtnId: "audio1RetryMicBtn",
  clipsId: "audio1Clips",
  errorId: "audio1ErrorMessage",
  continueSelector: "#audio1Continue",
  keyPrefix: "audio_ranking_explanation",
  prompt: "Please explain why you ranked some future societies higher and others lower.",
});

const FeedbackAudio2Placeholder_htmlForm = createSingleAudioForm({
  title: "Audio Feedback 2",
  content: feedbackAudio2Text,
  recBtnId: "audio2RecBtn",
  retryBtnId: "audio2RetryMicBtn",
  clipsId: "audio2Clips",
  errorId: "audio2ErrorMessage",
  continueSelector: "#audio2Continue",
  keyPrefix: "audio_missing_utopia",
  prompt: "Please describe a type of utopia you feel is missing from the presented set and explain what matters most about it.",
});
