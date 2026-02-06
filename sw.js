const CACHE_NAME = 'vaktia-update-v10'; // Vendos një emër që nuk e ke përdorur kurrë
const assets = [
  '/',
  '/index.html',
  '/icon-v1.svg', // Shto emrin e ri këtu
  '/manifest.json'
];

// Instalimi dhe Cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Duke ruajtur asetet në cache...');
      return cache.addAll(assets);
    })
  );
});

// Aktivizimi dhe pastrimi i cache-it të vjetër
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Strategjia e marrjes së të dhënave (Network First për API, Cache First për skedarët)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});

// LOGJIKA PËR NJOFTIME (Notifications)
self.addEventListener('push', e => {
  const data = e.data.json();
  const options = {
    body: data.body,
    icon: '/logo.svg', // Ikona që rregulluam
    badge: '/logo.svg',
    vibrate: [100, 50, 100],
    data: { url: '/' }
  };
  e.waitUntil(self.registration.showNotification(data.title, options));
});
