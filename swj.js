const CACHE_NAME = 'vaktia-2026-v1';
const assets = [
  '/',
  '/index.html',
  '/settings.html',
  '/ushqimishpirtit.html',
  '/manifest.json',
  '/logo.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
