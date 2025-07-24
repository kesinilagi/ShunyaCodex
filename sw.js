// sw.js (di folder ROOT aplikasi Anda) - VERSI BARU DENGAN IMPROVED OFFLINE CACHING
// === PERUBAHAN PENTING: Ganti nama cache setiap kali ada perubahan pada daftar urlsToCache atau logika SW ===
const CACHE_NAME = 'the-path-v4'; 

const urlsToCache = [
  '/', 
  '/index.html',
  '/script.js', 
  '/manifest.json',
  '/sw.js', 
  '/offline.html', // Pastikan Anda memiliki file offline.html di root proyek Anda

  // Ikon aplikasi (pastikan path ini sesuai dengan struktur folder Anda)
  '/icons/icon192x192.png', 
  '/icons/icon512x512.png',
  '/icons/icon-maskable-192x192.png',
  '/icons/icon-maskable-512x512.png',
  '/icons/Coverijo.png', 
  '/icons/lilin.png', 

  // CDN Assets (pastikan ini di-cache)
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/react@17/umd/react.development.js',
  'https://unpkg.com/react-dom@17/umd/react.development.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js',

  // URL Audio (daftar semua URL audio yang lengkap)
  // Periksa kembali URL ini satu per satu. Pastikan tidak ada spasi di nama file kecuali sudah di-encode.
  // URL ini juga harus lengkap (absolute path) atau relatif dari root SW.
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/suara%20ruang%20afirmasi%208d.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/AfirmasiPelepasanPanning3d.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawatnariyahbowl.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/GamelanAmbient.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/AngelAbundance.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/SingingBowl.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/RuralAmbient.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Clearing.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Afirmasi.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Gratitude.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/PendahuluanIA.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/PelepasanEmosiIslamic.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawatmunjiyatbowl.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/SholawatNA8d.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/SholawatFRWA8d.mp3',
    'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/lyra.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/LoaRejeki.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/LoaJodoh.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/LoaPromil.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/LoaHutang.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/LoaSembuh.mp3', // PASTIKAN NAMA FILE SUDAH BENAR, TANPA SPASI
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Allahumainneaudzubika.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Allahumafinne.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/yahayyyaqayy.mp3.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/NabiYunus.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Hasbiyallah.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Allahumayafarijal.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Allahumaurdud.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Allahumasahla.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Allahumaqanni.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Surah2627.mp3',

  // URL Gambar dari asetgambar (pastikan semua gambar LoA Codex juga terdaftar)
  'https://raw.githubusercontent.com/kesinilagi/asetgambar/main/doabg.jpg',
  'https://raw.githubusercontent.com/kesinilagi/asetgambar/main/rezeki.jpg', 
  'https://raw.githubusercontent.com/kesinilagi/asetgambar/main/jodoh.jpg', 
  'https://raw.githubusercontent.com/kesinilagi/asetgambar/main/promil.jpg', 
  'https://raw.githubusercontent.com/kesinilagi/asetgambar/main/hutang.jpg', 
  'https://raw.githubusercontent.com/kesinilagi/asetgambar/main/kesembuhan.jpg',
];

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching all app shell and static assets.');
        // Gunakan Promise.allSettled untuk toleransi kegagalan caching individual
        return Promise.allSettled(
          urlsToCache.map(url => {
            return cache.add(url).catch(error => {
              console.warn(`[Service Worker] Failed to cache: ${url}, Error: ${error}`);
            });
          })
        ).then(results => {
          results.filter(r => r.status === 'rejected').forEach(r => console.error(r.reason));
          console.log('[Service Worker] All cache attempts settled. Some may have failed.');
          // Pastikan fallback page selalu di-cache
          return cache.add(FALLBACK_URL).catch(error => {
              console.error(`[Service Worker] Failed to cache fallback URL ${FALLBACK_URL}: ${error}`);
          });
        });
      })
      .then(() => self.skipWaiting()) // Langsung aktifkan Service Worker baru
      .catch(error => {
        console.error('[Service Worker] Install failed:', error);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Jika ada di cache, langsung sajikan
        }

        // Jika tidak ada di cache, coba dari network
        return fetch(event.request)
          .then((networkResponse) => {
            // Hanya cache respons yang valid dan bisa di-cache
            // type 'basic' untuk same-origin, 'cors' untuk cross-origin (CDN, GitHub raw)
            if (!networkResponse || networkResponse.status !== 200 || 
                (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')) {
              console.log(`[Service Worker] Not caching response for ${event.request.url} (status: ${networkResponse.status}, type: ${networkResponse.type})`);
              return networkResponse;
            }
            
            // Periksa apakah request URL ada di urlsToCache, jika tidak, mungkin tidak perlu di cache
            // Ini untuk mencegah caching aset yang tidak diinginkan secara otomatis
            if (urlsToCache.includes(event.request.url) || urlsToCache.includes(event.request.url.replace(self.location.origin, ''))) { // Cek both absolute and relative path
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME)
                    .then((cache) => {
                        cache.put(event.request, responseToCache);
                        console.log(`[Service Worker] Cached new response for: ${event.request.url}`);
                    })
                    .catch(error => {
                        console.error(`[Service Worker] Failed to put ${event.request.url} in cache:`, error);
                    });
            } else {
                console.log(`[Service Worker] Not caching: ${event.request.url} (not in predefined list)`);
            }
            
            return networkResponse;
          })
          .catch(() => {
            // Ini menangani kasus jika network fetch gagal (misalnya offline)
            // Dan request adalah untuk halaman (navigate) atau aset vital yang harusnya ada
            console.error('[Service Worker] Fetch failed, attempting fallback:', event.request.url);
            // Untuk permintaan navigasi (HTML pages), berikan offline.html
            if (event.request.mode === 'navigate') {
              return caches.match(FALLBACK_URL);
            }
            // Untuk aset lain (gambar, audio, CSS) yang gagal dari cache dan network
            // Anda bisa mengembalikan placeholder atau gagal saja
            return new Response(null, { status: 503, statusText: 'Service Unavailable (Offline)' });
          });
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating new service worker...');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim()) // Mengklaim kontrol atas halaman yang ada
    .catch(error => {
      console.error('[Service Worker] Activation failed:', error);
    })
  );
});

// Event listener untuk memperbarui Service Worker secara langsung
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
        console.log('[Service Worker] Skip waiting triggered by client.');
    }
});
