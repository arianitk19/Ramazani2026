const CACHE_NAME = 'vaktia-2026-v1';
const assets = [
  '/',
  '/index.html',
  '/ushqimishpirtit.html',
  '/settings.html',
  '/logo.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
