// public/service-worker.js
const CACHE_NAME = 'loa-codex-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Tambahkan semua aset penting aplikasi Anda di sini
  // Misalnya CSS, JavaScript yang di-build, gambar, font, dll.
  // Jika Anda menggunakan Create React App, aset-aset ini biasanya di-generate di folder build/static/
  // Namun, untuk PWA yang di-deploy dari folder public/, Anda harus mengidentifikasi aset secara manual atau menggunakan tool seperti Workbox.
  
  // Contoh aset statis:
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/icon-maskable-192x192.png',
  '/icons/icon-maskable-512x512.png',

  // Audio (jika ingin offline, ini bisa sangat besar)
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/suara%20ruang%20afirmasi%208d.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Afirmasi%20Pelepasan%20Panning%203d.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat%20nariyah%20bowl.mp3',
  // ... tambahkan semua URL audio lainnya yang penting
  // Perhatikan bahwa untuk aset dari CDN (raw.githubusercontent.com),
  // cachingnya harus diatur dengan hati-hati (misal, strategi cache-first).

  // Gambar Default
  'https://raw.githubusercontent.com/kesinilagi/asetgambar/main/doabg.jpg',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Coverijo.png',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/lilin.png'
  // ... tambahkan semua URL gambar default lainnya
];

// Event: Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event: Fetch (Saat browser meminta resource)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Jika tidak ada di cache, fetch dari network
        return fetch(event.request).then(
          (response) => {
            // Cek apakah kita menerima response yang valid
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // Penting: Clone the response. A response is a stream
            // and can only be consumed once. We must clone it so that
            // both the browser and the cache can consume it.
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
    );
});

// Event: Activate (Ketika service worker baru mengambil alih)
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Hapus cache lama
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
