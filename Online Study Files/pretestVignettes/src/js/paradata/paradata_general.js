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