const CACHE = 'trading-journal-v1';
const PRECACHE = [
  './',
  './index.html',
];

// Install: precache shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: network-first fuer CDN, cache-first fuer shell
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // CDN (React, Recharts, Babel) - network first, fallback cache
  if (url.hostname.includes('unpkg.com') || url.hostname.includes('cdnjs.cloudflare.com')) {
    e.respondWith(
      caches.open(CACHE).then(async cache => {
        const cached = await cache.match(e.request);
        if (cached) return cached;
        try {
          const resp = await fetch(e.request);
          cache.put(e.request, resp.clone());
          return resp;
        } catch {
          return new Response('Offline - CDN nicht verfuegbar', { status: 503 });
        }
      })
    );
    return;
  }

  // App-Shell - cache first
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp.ok) {
          caches.open(CACHE).then(c => c.put(e.request, resp.clone()));
        }
        return resp;
      });
    })
  );
});
