// sw.js (di folder ROOT aplikasi Anda)
const CACHE_NAME = 'loa-codex-cache-v1'; // Ubah versi cache jika ada perubahan aset
const urlsToCache = [
  '/', // Root URL aplikasi Anda
  '/index.html',
  '/script.js', // Penting: cache file JavaScript utama Anda
  '/manifest.json',
  '/sw.js', // Cache service worker itu sendiri

  // Ikon aplikasi (pastikan path ini sesuai dengan struktur folder Anda)
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/icon-maskable-192x192.png',
  '/icons/icon-maskable-512x512.png',

  // CDN Assets (ini cenderung stabil, jadi bisa di-cache)
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/react@17/umd/react.development.js',
  'https://unpkg.com/react-dom@17/umd/react.development.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js',

  // URL Audio (Anda harus DAFTARKAN SEMUA URL AUDIO yang ingin tersedia offline)
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
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/loa%20sembuh.mp3',
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

  // URL Gambar (Anda harus DAFTARKAN SEMUA URL GAMBAR default yang ingin tersedia offline)
  'https://raw.githubusercontent.com/kesinilagi/asetgambar/main/doabg.jpg',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Coverijo.png',
  'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/lilin.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Pastikan semua aset tercantum dan dapat diakses.
        // Jika ada URL yang gagal di-cache, seluruh Promise.all akan gagal.
        // Anda mungkin ingin menambahkan .catch() di sini untuk logging error caching.
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Failed to cache during install:', error);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          (response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              // Untuk permintaan lintas-origin (seperti GitHub raw), type-nya akan 'cors' atau 'opaque'.
              // Kita tetap perlu meng-cache-nya jika itu adalah aset vital.
              // Jika response.type === 'opaque', Anda tidak bisa memeriksa response.status.
              // Untuk aset dari CDN atau raw.githubusercontent.com, type akan 'cors'.
              // Ini adalah bagian yang tricky untuk caching aset eksternal.
              // Strategi Cache-First with Network Fallback (di atas) bekerja dengan baik
              // untuk aset yang sudah terdaftar di urlsToCache.
              
              // Jika ini permintaan yang tidak terdaftar di urlsToCache,
              // dan bukan dari cache, langsung kembalikan response dari network.
              return response; 
            }
            
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        ).catch(error => {
          // Tangani kasus ketika fetch gagal (misal, offline)
          console.error('Fetch failed for:', event.request.url, error);
          // Anda bisa mengembalikan halaman offline khusus di sini jika ada
          // return caches.match('/offline.html'); 
        });
      })
    );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
