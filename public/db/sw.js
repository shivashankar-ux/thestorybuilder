const CACHE_NAME = "sb-console-shell-v2";
const SHELL_URLS = [
  "/db/manifest.json",
  "/db/icon-192.png",
  "/db/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_URLS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Never cache Supabase API/auth traffic or our own invite/reminder endpoints - always go live.
  if (url.hostname.endsWith("supabase.co") || url.pathname.startsWith("/api/")) {
    return;
  }

  if (event.request.method !== "GET") return;

  // The app shell HTML itself: always go to the network first so a fixed bug
  // is never masked by an old cached page. Only fall back to cache if offline.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // CDN libraries + static assets: stale-while-revalidate so they load instantly, then update in the background.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
