const CACHE_NAME = 'vaktia-v2026-v1';
const assets = [
  '/',
  '/index.html',
  '/logo.svg',
  'https://cdn.tailwindcss.com'
];

// Instalimi
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

// Strategjia: Network First për API, Cache First për skedarët statikë
self.addEventListener('fetch', e => {
  if (e.request.url.includes('api.aladhan.com')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(res => res || fetch(e.request))
    );
  }
});

// Klikimi i njoftimit
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.openWindow('/')
  );
});
