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
        <div id="audio2ErrorMessage" style="display:none; margin-top: 0.75rem;"></div>
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

const rankingWithAudioText = `
<header>
  <h2>Rank and explain your ranking</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <section>
      This step has two parts: first rank all future societies, then record a short explanation of your reasoning.
    </section>
    <section style="margin-top: 0.5rem;">
      Drag societies from the left list into the right list and arrange them from 1 (least preferred) to 7 (most preferred).
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
        Please move all 7 societies to the right list.
      </div>
      <div id="rankingLockWrap" style="margin-top: 12px; display: none;">
        <p style="margin: 0 0 8px 0;">Looks good? You can still reorder before locking.</p>
        <button id="rankingLockBtn" type="button">Lock ranking and continue to audio</button>
      </div>
    </section>

    <section id="combinedAudioSection" style="margin-top: 1rem; display: none;">
      <p>Great. Your ranking is locked. Please record a short explanation of why you ranked the societies this way.</p>
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
  <button id="rankingAudioContinue" type="submit" form="ranking-audio-form">Continue &rarr;</button>
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
      const $continue = $("#rankingAudioContinue");
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
          self._recorder = new MediaRecorder(self._stream);
          self._chunks = [];

          self._recorder.ondataavailable = function (evt) {
            if (evt.data && evt.data.size > 0) self._chunks.push(evt.data);
          };

          self._recorder.onstop = async function () {
            const blob = new Blob(self._chunks, { type: self._recorder.mimeType || "audio/webm" });
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
            $("#rankingAudioContinue").show();
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

      const prompt = "Please explain why you ranked some future societies higher and others lower.";
      study.options.datastore.set("audio_ranking_explanation_prompt", prompt);
      study.options.datastore.set("audio_ranking_explanation_audio", this._audioData);
      study.options.datastore.set("audio_ranking_explanation_audio_length", this._audioData.length);
      if (this._audioBlob) {
        study.options.datastore.set("audio_ranking_explanation_audio_mime", this._audioBlob.type || "audio/webm");
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
          audio_mime: this._audioBlob ? this._audioBlob.type || "audio/webm" : "audio/webm",
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
