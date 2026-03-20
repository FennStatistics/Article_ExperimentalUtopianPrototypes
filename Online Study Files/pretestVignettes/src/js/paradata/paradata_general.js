/*
Paradata collection (general).
Focus/blur is handled by src/js/paradata/paradata_focus.js only.
*/

(function () {
  const PARADATA_KEY = "paradata_general";
  const MOUSE_SAMPLE_MS = 250;
  const SCROLL_SAMPLE_MS = 250;
  const MAX_MOUSE_EVENTS = 10000;
  const MAX_SCROLL_EVENTS = 2000;
  const MAX_CLIPBOARD_EVENTS = 500;
  const MAX_KEY_INTERVALS = 5000;

  const state = {
    started: false,
    startTime: Date.now(),
    clipboardEvents: [],
    mouseEvents: [],
    scrollEvents: [],
    keyIntervals: [],
    lastKeyTimestamp: null,
    lastMouseSample: 0,
    lastScrollSample: 0,
    ipInfo: null,
    ipError: null,
    syncTimer: null,
  };

  const safe = (fn, fallback = null) => {
    try {
      return fn();
    } catch (e) {
      return fallback;
    }
  };

  const nowIso = () => new Date().toISOString();

  const getComponentTitle = () => {
    try {
      return study?.internals?.currentComponent?.options?.title || null;
    } catch (e) {
      return null;
    }
  };

  const getTargetMeta = (target) => {
    if (!target || !target.tagName) return null;
    return {
      tag: target.tagName,
      type: target.type || null,
      id: target.id || null,
      name: target.name || null,
      className: target.className || null,
    };
  };

  const collectStaticMetadata = () => {
    return {
      timestamp: nowIso(),
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      languages: navigator.languages,
      cookieEnabled: navigator.cookieEnabled,
      online: navigator.onLine,
      doNotTrack: navigator.doNotTrack,
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: navigator.deviceMemory || null,
      maxTouchPoints: navigator.maxTouchPoints,

      screen: {
        width: screen.width,
        height: screen.height,
        availWidth: screen.availWidth,
        availHeight: screen.availHeight,
        colorDepth: screen.colorDepth,
        pixelDepth: screen.pixelDepth,
      },

      viewport: {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
        devicePixelRatio: window.devicePixelRatio,
      },

      page: {
        url: location.href,
        hostname: location.hostname,
        pathname: location.pathname,
        protocol: location.protocol,
        referrer: document.referrer,
        title: document.title,
      },

      locale: {
        timezone: safe(() => Intl.DateTimeFormat().resolvedOptions().timeZone),
        timezoneOffset: new Date().getTimezoneOffset(),
      },

      network: navigator.connection
        ? {
            effectiveType: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink,
            rtt: navigator.connection.rtt,
            saveData: navigator.connection.saveData,
          }
        : null,

      mediaQueries: {
        prefersDarkScheme: safe(() => matchMedia("(prefers-color-scheme: dark)").matches),
        prefersReducedMotion: safe(() => matchMedia("(prefers-reduced-motion: reduce)").matches),
        prefersReducedTransparency: safe(
          () => matchMedia("(prefers-reduced-transparency: reduce)").matches,
          null
        ),
        prefersContrastMore: safe(() => matchMedia("(prefers-contrast: more)").matches, null),
        pointerCoarse: safe(() => matchMedia("(pointer: coarse)").matches),
        pointerFine: safe(() => matchMedia("(pointer: fine)").matches),
        hover: safe(() => matchMedia("(hover: hover)").matches),
      },

      features: {
        localStorage: safe(() => !!window.localStorage, false),
        sessionStorage: safe(() => !!window.sessionStorage, false),
        indexedDB: safe(() => !!window.indexedDB, false),
        serviceWorker: safe(() => !!navigator.serviceWorker, false),
        bluetooth: safe(() => !!navigator.bluetooth, false),
        usb: safe(() => !!navigator.usb, false),
        clipboard: safe(() => !!navigator.clipboard, false),
        mediaDevices: safe(() => !!navigator.mediaDevices, false),
        permissions: safe(() => !!navigator.permissions, false),
        storageManager: safe(() => !!navigator.storage, false),
        visualViewport: safe(() => !!window.visualViewport, false),
      },
    };
  };

  const handleCopy = (event) => {
    let text = event.clipboardData
      ? event.clipboardData.getData("text/plain")
      : "";
    if (!text) {
      text = safe(() => window.getSelection().toString(), "");
    }
    pushClipboardEvent("copy", text, event.target);
  };

  const handlePaste = (event) => {
    const text = event.clipboardData
      ? event.clipboardData.getData("text/plain")
      : "";
    pushClipboardEvent("paste", text, event.target);
  };

  const pushClipboardEvent = (type, text, target) => {
    if (state.clipboardEvents.length >= MAX_CLIPBOARD_EVENTS) {
      state.clipboardEvents.shift();
    }
    state.clipboardEvents.push({
      type,
      text,
      length: text ? text.length : 0,
      timestamp: nowIso(),
      component: getComponentTitle(),
      target: getTargetMeta(target),
    });
    scheduleSync();
  };

  const handleMouseMove = (event) => {
    const now = Date.now();
    if (now - state.lastMouseSample < MOUSE_SAMPLE_MS) return;
    state.lastMouseSample = now;

    if (state.mouseEvents.length >= MAX_MOUSE_EVENTS) {
      state.mouseEvents.shift();
    }
    state.mouseEvents.push({
      x: event.clientX,
      y: event.clientY,
      timestamp: nowIso(),
      component: getComponentTitle(),
    });
    scheduleSync();
  };

  const handleScroll = () => {
    const now = Date.now();
    if (now - state.lastScrollSample < SCROLL_SAMPLE_MS) return;
    state.lastScrollSample = now;

    if (state.scrollEvents.length >= MAX_SCROLL_EVENTS) {
      state.scrollEvents.shift();
    }
    state.scrollEvents.push({
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      timestamp: nowIso(),
      component: getComponentTitle(),
    });
    scheduleSync();
  };

  const handleKeyDown = (event) => {
    const now = event.timeStamp || performance.now();
    if (state.lastKeyTimestamp != null) {
      const interval = Math.max(0, now - state.lastKeyTimestamp);
      if (state.keyIntervals.length >= MAX_KEY_INTERVALS) {
        state.keyIntervals.shift();
      }
      state.keyIntervals.push(interval);
    }
    state.lastKeyTimestamp = now;
    scheduleSync();
  };

  const getKeyStats = () => {
    if (!state.keyIntervals.length) {
      return { count: 0, mean: null, median: null, min: null, max: null };
    }
    const sorted = [...state.keyIntervals].sort((a, b) => a - b);
    const count = sorted.length;
    const sum = sorted.reduce((acc, val) => acc + val, 0);
    const mean = sum / count;
    const median =
      count % 2 === 0
        ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2
        : sorted[Math.floor(count / 2)];
    return {
      count,
      mean,
      median,
      min: sorted[0],
      max: sorted[sorted.length - 1],
    };
  };

  const getSnapshot = () => {
    return {
      static: collectStaticMetadata(),
      ip: state.ipInfo,
      ipError: state.ipError,
      behavior: {
        clipboardEvents: state.clipboardEvents,
        mouseEvents: state.mouseEvents,
        scrollEvents: state.scrollEvents,
        keyStats: getKeyStats(),
      },
      meta: {
        startedAt: new Date(state.startTime).toISOString(),
        updatedAt: nowIso(),
      },
    };
  };

  const scheduleSync = () => {
    if (state.syncTimer) return;
    state.syncTimer = setTimeout(() => {
      state.syncTimer = null;
      try {
        if (typeof study !== "undefined" && study?.options?.datastore?.set) {
          study.options.datastore.set(PARADATA_KEY, getSnapshot());
        }
      } catch (e) {
        // ignore datastore errors
      }
    }, 1000);
  };

  const getIPInfo = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data;
    } catch (e) {
      return { error: e.message };
    }
  };

  const initNetwork = async () => {
    if (typeof localTesting !== "undefined" && localTesting) {
      state.ipInfo = { skipped: true, reason: "localTesting" };
      scheduleSync();
      return;
    }

    const data = await getIPInfo();
    if (data && data.error) {
      state.ipError = data.error;
    } else {
      state.ipInfo = data;
    }
    scheduleSync();
  };

  const start = () => {
    if (state.started) return;
    state.started = true;

    document.addEventListener("copy", handleCopy, true);
    document.addEventListener("paste", handlePaste, true);
    document.addEventListener("mousemove", handleMouseMove, true);
    document.addEventListener("scroll", handleScroll, true);
    document.addEventListener("keydown", handleKeyDown, true);

    initNetwork();
  };

  const stop = () => {
    if (!state.started) return;
    document.removeEventListener("copy", handleCopy, true);
    document.removeEventListener("paste", handlePaste, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
    document.removeEventListener("scroll", handleScroll, true);
    document.removeEventListener("keydown", handleKeyDown, true);
    state.started = false;
  };

  window.paradataGeneral = {
    start,
    stop,
    snapshot: getSnapshot,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
