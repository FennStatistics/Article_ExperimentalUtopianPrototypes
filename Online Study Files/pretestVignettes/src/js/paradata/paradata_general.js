function getClientMetadata() {
  return {
    timestamp: new Date().toISOString(),
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
      pixelDepth: screen.pixelDepth
    },

    viewport: {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
      devicePixelRatio: window.devicePixelRatio
    },

    page: {
      url: location.href,
      hostname: location.hostname,
      pathname: location.pathname,
      protocol: location.protocol,
      referrer: document.referrer,
      title: document.title
    },

    locale: {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset()
    },

    network: navigator.connection
      ? {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt,
          saveData: navigator.connection.saveData
        }
      : null
  };
}

function getPreciseGeolocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          heading: position.coords.heading,
          speed: position.coords.speed
        });
      },
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}

async function getIPMetadata() {
  const res = await fetch("https://ipapi.co/json/");
  return await res.json();
}

async function collectAllMetadata() {
  const metadata = {
    client: getClientMetadata(),
    geolocation: null,
    ip: null
  };

  try {
    metadata.geolocation = await getPreciseGeolocation();
  } catch (e) {
    metadata.geolocationError = e.message;
  }

  try {
    metadata.ip = await getIPMetadata();
  } catch (e) {
    metadata.ipError = e.message;
  }

  return metadata;
}

collectAllMetadata().then(console.log);





      async function getPublicIP() {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        return data.ip;
      }
/*
      getPublicIP().then((ip) => {
        console.log("Public IP:", ip);
      });
      */

      async function getLocation() {
        // First try precise browser geolocation
        if ("geolocation" in navigator) {
          try {
            const position = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
              });
            });

            return {
              type: "browser",
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
            };
          } catch (err) {
            console.warn("Browser geolocation denied/failed, falling back to IP.");
          }
        }

        // Fallback: free IP geolocation
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        return {
          type: "ip",
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country_name,
          latitude: data.latitude,
          longitude: data.longitude,
          timezone: data.timezone,
        };
      }

      /*
      getLocation().then(location => {
        console.log(location);
      });
      */


      async function collectClientMetadata() {
  const safe = (fn, fallback = null) => {
    try {
      return fn();
    } catch {
      return fallback;
    }
  };

  const safeAsync = async (fn, fallback = null) => {
    try {
      return await fn();
    } catch {
      return fallback;
    }
  };

  const queryPermission = async (name) => {
    if (!navigator.permissions?.query) return null;
    try {
      const result = await navigator.permissions.query({ name });
      return result.state; // granted | denied | prompt
    } catch {
      return null;
    }
  };

  const getBatteryInfo = async () => {
    if (!navigator.getBattery) return null;
    try {
      const battery = await navigator.getBattery();
      return {
        charging: battery.charging,
        level: battery.level,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime
      };
    } catch {
      return null;
    }
  };

  const getStorageInfo = async () => {
    const result = {
      localStorageItems: null,
      sessionStorageItems: null,
      estimate: null,
      persisted: null
    };

    result.localStorageItems = safe(() => localStorage.length, null);
    result.sessionStorageItems = safe(() => sessionStorage.length, null);

    if (navigator.storage?.estimate) {
      result.estimate = await safeAsync(() => navigator.storage.estimate(), null);
    }

    if (navigator.storage?.persisted) {
      result.persisted = await safeAsync(() => navigator.storage.persisted(), null);
    }

    return result;
  };

  const getMediaDevicesInfo = async () => {
    if (!navigator.mediaDevices?.enumerateDevices) return null;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.map((d) => ({
        kind: d.kind,
        label: d.label || "",
        deviceId: d.deviceId || "",
        groupId: d.groupId || ""
      }));
    } catch {
      return null;
    }
  };

  const getPreciseGeolocation = async () => {
    if (!navigator.geolocation) return null;

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });

      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        speed: position.coords.speed
      };
    } catch (err) {
      return { error: err.message };
    }
  };

  const getIPGeo = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      return {
        ip: data.ip,
        version: data.version,
        city: data.city,
        region: data.region,
        regionCode: data.region_code,
        country: data.country_name,
        countryCode: data.country_code,
        countryCodeISO3: data.country_code_iso3,
        countryCapital: data.country_capital,
        countryTLD: data.country_tld,
        continentCode: data.continent_code,
        postal: data.postal,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        utcOffset: data.utc_offset,
        countryCallingCode: data.country_calling_code,
        currency: data.currency,
        currencyName: data.currency_name,
        languages: data.languages,
        org: data.org,
        asn: data.asn
      };
    } catch (err) {
      return { error: err.message };
    }
  };

  const metadata = {
    timestamp: new Date().toISOString(),

    browser: {
      userAgent: safe(() => navigator.userAgent),
      userAgentData: safe(() =>
        navigator.userAgentData
          ? {
              brands: navigator.userAgentData.brands,
              mobile: navigator.userAgentData.mobile,
              platform: navigator.userAgentData.platform
            }
          : null
      ),
      appCodeName: safe(() => navigator.appCodeName),
      appName: safe(() => navigator.appName),
      appVersion: safe(() => navigator.appVersion),
      platform: safe(() => navigator.platform),
      product: safe(() => navigator.product),
      productSub: safe(() => navigator.productSub),
      vendor: safe(() => navigator.vendor),
      vendorSub: safe(() => navigator.vendorSub),
      language: safe(() => navigator.language),
      languages: safe(() => navigator.languages),
      cookieEnabled: safe(() => navigator.cookieEnabled),
      onLine: safe(() => navigator.onLine),
      webdriver: safe(() => navigator.webdriver),
      pdfViewerEnabled: safe(() => navigator.pdfViewerEnabled),
      globalPrivacyControl: safe(() => navigator.globalPrivacyControl, null),
      javaEnabled: safe(() =>
        typeof navigator.javaEnabled === "function" ? navigator.javaEnabled() : null
      )
    },

    device: {
      hardwareConcurrency: safe(() => navigator.hardwareConcurrency, null),
      deviceMemory: safe(() => navigator.deviceMemory, null),
      maxTouchPoints: safe(() => navigator.maxTouchPoints, null)
    },

    screen: {
      width: safe(() => screen.width),
      height: safe(() => screen.height),
      availWidth: safe(() => screen.availWidth),
      availHeight: safe(() => screen.availHeight),
      colorDepth: safe(() => screen.colorDepth),
      pixelDepth: safe(() => screen.pixelDepth),
      isExtended: safe(() => screen.isExtended, null),
      orientation: safe(() =>
        screen.orientation
          ? {
              type: screen.orientation.type,
              angle: screen.orientation.angle
            }
          : null
      )
    },

    viewport: {
      innerWidth: safe(() => window.innerWidth),
      innerHeight: safe(() => window.innerHeight),
      outerWidth: safe(() => window.outerWidth),
      outerHeight: safe(() => window.outerHeight),
      devicePixelRatio: safe(() => window.devicePixelRatio),
      scrollX: safe(() => window.scrollX),
      scrollY: safe(() => window.scrollY),
      visualViewport: safe(() =>
        window.visualViewport
          ? {
              width: window.visualViewport.width,
              height: window.visualViewport.height,
              scale: window.visualViewport.scale,
              offsetLeft: window.visualViewport.offsetLeft,
              offsetTop: window.visualViewport.offsetTop,
              pageLeft: window.visualViewport.pageLeft,
              pageTop: window.visualViewport.pageTop
            }
          : null
      )
    },

    page: {
      url: safe(() => location.href),
      origin: safe(() => location.origin),
      protocol: safe(() => location.protocol),
      host: safe(() => location.host),
      hostname: safe(() => location.hostname),
      port: safe(() => location.port),
      pathname: safe(() => location.pathname),
      search: safe(() => location.search),
      hash: safe(() => location.hash),
      title: safe(() => document.title),
      referrer: safe(() => document.referrer),
      characterSet: safe(() => document.characterSet),
      contentType: safe(() => document.contentType),
      compatMode: safe(() => document.compatMode),
      dir: safe(() => document.dir),
      visibilityState: safe(() => document.visibilityState),
      hidden: safe(() => document.hidden),
      fullscreenEnabled: safe(() => document.fullscreenEnabled),
      fullscreenElement: safe(() => !!document.fullscreenElement)
    },

    locale: {
      timeZone: safe(() => Intl.DateTimeFormat().resolvedOptions().timeZone),
      locale: safe(() => Intl.DateTimeFormat().resolvedOptions().locale),
      calendar: safe(() => Intl.DateTimeFormat().resolvedOptions().calendar, null),
      numberingSystem: safe(() => Intl.DateTimeFormat().resolvedOptions().numberingSystem, null),
      hourCycle: safe(() => Intl.DateTimeFormat().resolvedOptions().hourCycle, null),
      timeZoneOffsetMinutes: new Date().getTimezoneOffset()
    },

    network: safe(() =>
      navigator.connection
        ? {
            effectiveType: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink,
            downlinkMax: navigator.connection.downlinkMax ?? null,
            rtt: navigator.connection.rtt,
            saveData: navigator.connection.saveData,
            type: navigator.connection.type ?? null
          }
        : null
    ),

    mediaQueries: {
      prefersDarkScheme: safe(() => matchMedia("(prefers-color-scheme: dark)").matches),
      prefersReducedMotion: safe(() => matchMedia("(prefers-reduced-motion: reduce)").matches),
      prefersReducedTransparency: safe(() => matchMedia("(prefers-reduced-transparency: reduce)").matches, null),
      prefersContrastMore: safe(() => matchMedia("(prefers-contrast: more)").matches, null),
      pointerCoarse: safe(() => matchMedia("(pointer: coarse)").matches),
      pointerFine: safe(() => matchMedia("(pointer: fine)").matches),
      hover: safe(() => matchMedia("(hover: hover)").matches)
    },

    history: {
      length: safe(() => history.length)
    },

    features: {
      geolocation: !!navigator.geolocation,
      localStorage: safe(() => !!window.localStorage, false),
      sessionStorage: safe(() => !!window.sessionStorage, false),
      indexedDB: safe(() => !!window.indexedDB, false),
      serviceWorker: safe(() => !!navigator.serviceWorker, false),
      bluetooth: safe(() => !!navigator.bluetooth, false),
      usb: safe(() => !!navigator.usb, false),
      share: safe(() => !!navigator.share, false),
      canShare: safe(() => !!navigator.canShare, false),
      clipboard: safe(() => !!navigator.clipboard, false),
      mediaDevices: safe(() => !!navigator.mediaDevices, false),
      permissions: safe(() => !!navigator.permissions, false),
      storageManager: safe(() => !!navigator.storage, false),
      visualViewport: safe(() => !!window.visualViewport, false)
    }
  };

  metadata.permissions = {
    geolocation: await queryPermission("geolocation"),
    notifications: await queryPermission("notifications"),
    microphone: await queryPermission("microphone"),
    camera: await queryPermission("camera"),
    clipboardRead: await queryPermission("clipboard-read"),
    clipboardWrite: await queryPermission("clipboard-write")
  };

  metadata.storage = await getStorageInfo();
  metadata.mediaDevices = await getMediaDevicesInfo();
  metadata.battery = await getBatteryInfo();
  metadata.preciseGeolocation = await getPreciseGeolocation();
  metadata.ipGeolocation = await getIPGeo();

  return metadata;
}

// usage
collectClientMetadata().then((data) => {
  console.log(data);
});