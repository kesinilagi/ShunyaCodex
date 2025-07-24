// sw.js (di folder ROOT aplikasi Anda) - VERSI BARU DENGAN IMPROVED CACHING STRATEGY
const CACHE_NAME = 'the-path-v3'; // === PERUBAHAN PENTING: Ganti nama cache ke versi baru dan unik ===
// Nama cache harus berubah SETIAP KALI Anda melakukan perubahan pada daftar urlsToCache

const urlsToCache = [
  '/', 
  '/index.html',
  '/script.js', 
  '/manifest.json',
  '/sw.js', 
  '/offline.html', // === BARU: Tambahkan halaman offline jika Anda membuatnya ===

  // Ikon aplikasi (pastikan path ini sesuai dengan struktur folder Anda)
  '/icons/icon192x192.png', // Perbaiki nama file jika di sw.js sebelumnya salah
  '/icons/icon512x512.png', // Perbaiki nama file jika di sw.js sebelumnya salah
  '/icons/icon-maskable-192x192.png',
  '/icons/icon-maskable-512x512.png',
  '/icons/Coverijo.png', // Pastikan gambar cover juga di-cache
  '/icons/lilin.png', // Pastikan gambar lilin juga di-cache

  // CDN Assets (ini cenderung stabil, jadi bisa di-cache)
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/react@17/umd/react.development.js',
  'https://unpkg.com/react-dom@17/umd/react-dom.development.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js',

  // URL Audio (Anda harus DAFTARKAN SEMUA URL AUDIO yang ingin tersedia offline)
  // Periksa kembali URL ini, pastikan semua ejaan dan huruf besar/kecil sudah benar
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/suara%20ruang%20afirmasi%208d.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Afirmasi%20Pelepasan%20Panning%203d.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat%20nariyah%20bowl.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Gamelan%20Ambient.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Angel%20Abundance.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Singing%20Bowl.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Rural%20Ambient.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Clearing.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Afirmasi.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Gratitude.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Pendahuluan%20IA.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Pelepasan%20Emosi%20Islamic.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat%20munjiyat%20bowl.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat%20Nuril%20Anwar%20bowl%208d.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat%20Futuh%20Rizq%20wal%20Afiyah%20bowl%208d.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Doa%201%20Milyar_Sholawat%203x.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Love%20release.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/DOA%20Afiyah%20(1).mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/lyra.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Loa%20Rejeki.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Loa%20Jodoh.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Loa%20Promil.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Loa%20Hutang.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/loa%20sembuh.mp3', // Perbaiki spasi jika ada
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Allahuma%20inne%20audzubika.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Allahuma%20finne.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/ya%20hayy%20ya%20qayy.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Nabi%20Yunus%20Perut%20Ikan%20Paus.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Hasbiyallah.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Allahuma%20ya%20farijal.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Allahuma%20urdud.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Allahuma%20sahla.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Allahuma%20qanni.mp3',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Surah%20Ali%20Imran%20ayat%2026-27%208D(1).mp3',

  // URL Gambar (pastikan semua gambar yang mungkin muncul di-cache)
  'https://raw.githubusercontent.com/kesinilagi/asetgambar/main/doabg.jpg', // Gambar background default LoA Codex
  'https://raw.githubusercontent.com/kesinilagi/asetgambar/main/rezeki.jpg', // Contoh gambar LoA rezeki
  'https://raw.githubusercontent.com/kesinilagi/asetgambar/main/jodoh.jpg', // Contoh gambar LoA jodoh
  'https://raw.githubusercontent.com/kesinilagi/asetgambar/main/promil.jpg', // Contoh gambar LoA promil
  'https://raw.githubusercontent.com/kesinilagi/asetgambar/main/hutang.jpg', // Contoh gambar LoA hutang
  'https://raw.githubusercontent.com/kesinilagi/asetgambar/main/kesembuhan.jpg' // Contoh gambar LoA kesembuhan
];

// === BARU: Default fallback untuk offline page ===
const FALLBACK_URL = '/offline.html'; // Pastikan Anda memiliki file offline.html di root proyek Anda

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching all app shell and static assets.');
        // === PERBAHAN PENTING: Gunakan Promise.allSettled untuk toleransi kegagalan ===
        // Ini akan mencoba cache semua URL, tetapi jika ada yang gagal, yang lain tetap di-cache.
        return Promise.allSettled(
          urlsToCache.map(url => {
            return cache.add(url).catch(error => {
              console.warn(`[Service Worker] Failed to cache: ${url}, Error: ${error}`);
              // Jangan re-throw error di sini agar Promise.allSettled tidak gagal total
            });
          })
        ).then(results => {
          results.filter(r => r.status === 'rejected').forEach(r => console.error(r.reason));
          console.log('[Service Worker] All cache attempts settled. Some may have failed.');
          // === BARU: Pastikan fallback page selalu di-cache ===
          return cache.add(FALLBACK_URL).catch(error => {
              console.error(`[Service Worker] Failed to cache fallback URL ${FALLBACK_URL}: ${error}`);
          });
        });
      })
      .then(() => self.skipWaiting()) // === BARU: Langsung aktifkan Service Worker baru ===
      .catch(error => {
        console.error('[Service Worker] Install failed:', error);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Hanya tangani request navigasi (untuk offline page fallback)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match(event.request) // Coba dari cache
        .then((response) => {
          return response || fetch(event.request); // Jika tidak di cache, coba dari network
        })
        .catch(() => {
          // Jika network dan cache gagal (offline), sajikan halaman fallback
          console.log('[Service Worker] Offline, serving fallback page.');
          return caches.match(FALLBACK_URL);
        })
    );
  } else {
    // Untuk aset lain (gambar, CSS, JS, audio), gunakan strategi Cache-First
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response; // Jika ada di cache, langsung sajikan dari cache
          }
          // Jika tidak ada di cache, coba dari network dan cache hasilnya
          return fetch(event.request)
            .then((networkResponse) => {
              // Hanya cache respons yang valid
              if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && networkResponse.type !== 'cors' && networkResponse.type !== 'opaque') {
                return networkResponse;
              }
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              return networkResponse;
            })
            .catch((error) => {
              console.error('[Service Worker] Fetch failed for asset:', event.request.url, error);
              // Jika fetch gagal (misalnya offline), Anda bisa mencoba fallback lain
              // atau hanya biarkan request gagal jika itu bukan aset penting.
            });
        })
    );
  }
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
    .then(() => self.clients.claim()) // === BARU: Mengklaim kontrol atas halaman yang ada ===
    .catch(error => {
      console.error('[Service Worker] Activation failed:', error);
    })
  );
});

// === BARU: Event listener untuk memperbarui Service Worker secara langsung ===
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
        console.log('[Service Worker] Skip waiting triggered by client.');
    }
});
