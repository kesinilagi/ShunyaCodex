// ===================================================================
// KODE MASTER FINAL v13 - DISempurnakan DENGAN CONTEXT API & PERBAIKAN STRUKTUR
// ===================================================================

const { useState, useEffect, useRef, createContext, useContext } = React;

// --- Context untuk State Global ---
// Ini akan menjadi "pusat data" untuk aplikasi kita.
const AppContext = createContext();

// --- FUNGSI PEMBANTU UNTUK FULLSCREEN ---
const openFullscreen = elem => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {/* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {/* IE11 */
    elem.msRequestFullscreen();
  }
};

const closeFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {/* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {/* IE11 */
    document.msExitFullscreen();
  }
};
// --- Styling Constants ---
const contentContainerClasses = "p-6 md:p-10 bg-amber-200 rounded-3xl shadow-lg animate-fade-in mb-8"; // <-- DARI bg-white MENJADI bg-stone-100
const sectionTitleClasses = "text-2xl md:text-3xl font-bold text-center text-black-800 mb-6 border-b-2 pb-2 border-black-200";
const paragraphClasses = "dynamic-paragraph text-gray-700 leading-loose mb-4 text-justify";
const highlightTextClasses = "text-blue-600 font-semibold";
const quoteClasses = "italic text-gray-600 border-l-4 border-blue-400 pl-4 py-2 my-4 text-justify";
const subHeadingClasses = "text-xl font-bold text-gray-800 mb-3 mt-6";
const arabicTextClass = "font-serif text-2xl";

// --- KOMPONEN BARU UNTUK HALAMAN KATA PENGANTAR ---
const KataPengantar = () => {
  const { setCurrentPageKey } = useContext(AppContext);

  return /*#__PURE__*/(
    React.createElement("div", { className: contentContainerClasses }, /*#__PURE__*/
    React.createElement("h4", { className: `${sectionTitleClasses} text-left` }, "\u270D\uFE0F KATA PENGANTAR"), /*#__PURE__*/
    React.createElement("p", { className: `${paragraphClasses}` }, "Selamat datang di buku ini. Sebuah peta batin yang tidak menggurui, tapi menawarkan satu kemungkinan arah pulang\u2014ke dalam. Ke tempat yang tenang di balik segala keramaian. Ke hati yang tahu meski sering diabaikan."), /*#__PURE__*/
    React.createElement("p", { className: `${paragraphClasses}` }, "Di dunia yang serba cepat, penuh notifikasi dan tagihan, kita butuh sesuatu yang tidak sekadar menenangkan\u2014tapi membebaskan. E-Book Interactive ini bukan sekedar E Book motivasi. Ia lebih seperti kawan cerita yang mau duduk bareng sambil berkata, \"Yuk, kita beresin hati pelan-pelan.\""), /*#__PURE__*/
    React.createElement("p", { className: `${paragraphClasses}` }, "Di dalamnya, Anda tidak hanya akan membaca tentang hati, akal, intuisi, atau metode Kawrooh. Anda akan diajak mengalami\u2014merenung, melepaskan, menyambung ulang. Bukan sekadar teori. ", /*#__PURE__*/React.createElement("b", null, "Ini Ebook untuk dipraktikkan, bukan hanya dikoleksi."), " Semoga setiap bab-nya membawa Anda ", /*#__PURE__*/React.createElement("b", null, "lebih dekat pada rasa tenteram, lebih jujur pada diri sendiri, lebih terbuka pada limpahan karunia-Nya,Sehingga Pintu Rejeki Terbuka, dan Hidup Penuh Keberkahan"), ". Selamat menyelami."), /*#__PURE__*/


    React.createElement("div", { className: "text-center mt-10" }, /*#__PURE__*/
    React.createElement("button", {
      onClick: () => setCurrentPageKey('daftar-isi'),
      className: "bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105" }, "Siap Untuk Kembali Ke Dalam Keberlimpahan...")), /*#__PURE__*/




    React.createElement(AuthorFootnote, null)));


};
// --- KOMPONEN YANG HILANG: CATATAN KAKI PENGARANG ---
const AuthorFootnote = () => /*#__PURE__*/
React.createElement("div", { className: "text-center mt-12 pt-4 border-t border-gray-200" }, /*#__PURE__*/
React.createElement("p", { className: "text-sm text-gray-500 italic" }, "Karya: Akasha Bayu Sasmita"));





// ### GANTI SELURUH KOMPONEN HOME ANDA DENGAN VERSI BARU INI ###
const DaftarIsi = () => {
  const { setCurrentPageKey } = useContext(AppContext);

  // Style tombol yang lama kita pindah ke sini
  const tocSectionClasses = "block w-full text-left font-bold text-lg text-black-700 p-2 rounded-lg hover:bg-black-100 transition-colors";
  const tocChapterClasses = "block w-full text-left text-gray-700 p-2 pl-4 rounded-lg hover:bg-sky-100 transition-colors";
  const tocFeatureClasses = "block w-full text-left font-bold text-xl p-2 rounded-lg hover:bg-yellow-100 transition-colors";

  return /*#__PURE__*/ (
    // div pembungkusnya sekarang kita pindah ke ChapterWrapper
    React.createElement("div", { className: contentContainerClasses }, /*#__PURE__*/
    React.createElement("h4", { className: `${sectionTitleClasses} text-left` }, "\uD83D\uDCD1 DAFTAR ISI"), /*#__PURE__*/
    React.createElement("ul", { className: "space-y-1" }, /*#__PURE__*/

    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab1'), className: tocSectionClasses }, "Bagian I: Dunia Ribut, Hati Harus Tenang"), /*#__PURE__*/
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab1'), className: tocChapterClasses }, "1. Dunia Boleh Heboh, Tapi Kita Jangan Hilang Arah")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab2'), className: tocChapterClasses }, "2. Kita Ini Mau Ke Mana Sebenarnya?")))), /*#__PURE__*/


    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab3'), className: tocSectionClasses }, "Bagian II: Membedah Dalam Diri"), /*#__PURE__*/
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab3'), className: tocChapterClasses }, "3. Hati: Singgasana Cahaya yang Terlupakan")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab4'), className: tocChapterClasses }, "4. Akal: Satpam atau Penjaga Gerbang Ilahi?")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab5'), className: tocChapterClasses }, "5. Intuisi: Bahasa Lembut yang Kita Abaikan")))), /*#__PURE__*/


    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab6'), className: tocSectionClasses }, " Bagian III: Kecerdasan Hati dan Koherensi Diri"), /*#__PURE__*/
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab6'), className: tocChapterClasses }, " 6.HeartMath dan Koherensi: Saat Hati dan Otak Berdamai")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab7'), className: tocChapterClasses }, " 7.Janin pun Tahu: Jantung Lebih Dulu dari Otak")))), /*#__PURE__*/



    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab8'), className: tocSectionClasses }, " Bagian IV: Kawrooh \u2013 Metode Menjernihkan Hati"), /*#__PURE__*/
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab8'), className: tocChapterClasses }, " 8. Kawrooh: Ilmu Melepas Tanpa Drama")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab9'), className: tocChapterClasses }, " 9. Langkah-Langkah Kawrooh (di sertakan audio contoh pelepasan emosi)")))), /*#__PURE__*/



    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab10'), className: tocSectionClasses }, " Bagian V: Praktik Inti Spiritualitas Islam"), /*#__PURE__*/
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab10'), className: tocChapterClasses }, " 10. Sholawat: Jalan Cepat Menuju Cahaya (di sertai audio sholawat pilihan)")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab11'), className: tocChapterClasses }, "11. Afirmasi, Dzikir, Doa, dan Amal Saleh: Nafas Penyerahan Diri")))), /*#__PURE__*/



    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab12'), className: tocSectionClasses }, " Bagian VI: Jalan Pulang ke Dalam"), /*#__PURE__*/
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab12'), className: tocChapterClasses }, " 12.Membersihkan Kaca Jiwa: Tazkiyatun Nafs")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab13'), className: tocChapterClasses }, "13. Praktik-Praktik Spiritual Harian")))), /*#__PURE__*/



    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab14'), className: tocSectionClasses }, " Bagian VII: Spiritualitas dan Hukum Kehidupan"), /*#__PURE__*/
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab14a'), className: tocChapterClasses }, " 14.a Law of Attraction: Versi Langit Bukan Versi Afirmasi")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab14b'), className: tocChapterClasses }, "14.b Tanda-tanda Datangnya Kelimpahan")))), /*#__PURE__*/



    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab15'), className: tocSectionClasses }, " Bagian Penutup: Kompas Kehidupan"), /*#__PURE__*/
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('bab15'), className: tocChapterClasses }, " 15. Merangkai Semua: Dari Kesadaran Menuju Kehidupan Berkah")))), /*#__PURE__*/




    React.createElement("li", { className: "pt-4" }, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('pixel-thoughts'), className: "text-yellow-600 hover:underline font-bold text-xl" }, "\u2728 Ruang Pelepasan (Lepaskan Beban)\u2728")), /*#__PURE__*/
    React.createElement("li", { className: "pt-2" }, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('affirmation-room'), className: "text-sky-500 hover:underline font-bold text-xl" }, "\u2728 Ruang Afirmasi (Isi Energi Positif)\u2728")), /*#__PURE__*/


    React.createElement("li", { className: "pt-2" }, /*#__PURE__*/React.createElement("button", { onClick: () => setCurrentPageKey('doapilihan'), className: "text-green-600 hover:underline font-bold text-xl" }, "\uD83D\uDE4F Doa-doa Pilihan (Kelapangan Rezeki dan Pelunasan Utang)"))), /*#__PURE__*/

    React.createElement(AuthorFootnote, null)));


};

// --- KOMPONEN BARU UNTUK GRAFIK JANTUNG INTERAKTIF ---
const HeartCoherenceChart = () => {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);
  // State untuk mengontrol kondisi grafik: kacau (false) atau tenang (true)
  const [isCoherent, setIsCoherent] = useState(false);

  // Fungsi untuk membuat data grafik
  const generateChartData = coherent => {
    const dataPoints = 100;
    const labels = Array.from({ length: dataPoints }, (_, i) => i);

    if (coherent) {
      // Data untuk gelombang tenang (sine wave)
      const amplitude = 10;
      const frequency = 0.1;
      return labels.map(i => amplitude * Math.sin(i * frequency) + (Math.random() * 1.5 - 0.75));
    } else {
      // Data untuk grafik kacau (random)
      return labels.map(() => Math.random() * 20 - 10);
    }
  };

  // useEffect untuk menggambar dan memperbarui grafik
  useEffect(() => {
    if (!canvasRef.current || typeof window.Chart === 'undefined') {
      console.error("Chart.js belum siap.");
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    const newData = generateChartData(isCoherent);

    // Jika chart sudah ada, update datanya dengan animasi
    if (chartInstance.current) {
      chartInstance.current.data.datasets[0].data = newData;
      chartInstance.current.data.datasets[0].borderColor = isCoherent ? 'hsl(140, 70%, 50%)' : 'hsl(5, 70%, 60%)';
      chartInstance.current.data.datasets[0].backgroundColor = isCoherent ? 'hsla(140, 70%, 50%, 0.1)' : 'hsla(5, 70%, 60%, 0.1)';
      chartInstance.current.update('smooth'); // 'smooth' adalah custom, defaultnya juga sudah bagus
    } else {
      // Jika belum ada, buat chart baru
      chartInstance.current = new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: 100 }, (_, i) => i),
          datasets: [{
            label: 'Ritme Jantung',
            data: newData,
            borderColor: isCoherent ? 'hsl(140, 70%, 50%)' : 'hsl(5, 70%, 60%)',
            backgroundColor: isCoherent ? 'hsla(140, 70%, 50%, 0.1)' : 'hsla(5, 70%, 60%, 0.1)',
            borderWidth: 2.5,
            pointRadius: 0,
            tension: 0.4,
            fill: true }] },


        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 2000, // Durasi animasi 2 detik
            easing: 'easeInOutCubic' },

          scales: {
            y: { display: false, min: -15, max: 15 },
            x: { display: false } },

          plugins: {
            legend: { display: false },
            tooltip: { enabled: false } } } });



    }
  }, [isCoherent]); // Efek ini akan berjalan setiap kali 'isCoherent' berubah

  return /*#__PURE__*/(
    React.createElement("div", { className: "my-8 p-4 md:p-6 bg-gray-50 rounded-xl shadow-inner border" }, /*#__PURE__*/
    React.createElement("div", { className: "h-48 md:h-64 relative" }, /*#__PURE__*/
    React.createElement("canvas", { ref: canvasRef })), /*#__PURE__*/

    React.createElement("div", { className: "text-center mt-4" }, /*#__PURE__*/
    React.createElement("p", { className: "mb-3 text-gray-600 italic" },
    isCoherent ?
    "Ini adalah ritme jantung saat Anda merasa damai dan bersyukur." :
    "Ini adalah ritme jantung saat Anda merasa stres atau cemas."), /*#__PURE__*/

    React.createElement("button", {
      onClick: () => setIsCoherent(prevState => !prevState),
      className: `px-6 py-2 rounded-full text-white font-semibold shadow-lg transition-all transform hover:scale-105 ${
      isCoherent ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
      }` },

    isCoherent ? "Kembali ke Mode Stres" : "Latih Ketenangan Hati"))));




};

// ### GANTI SELURUH RUANG AFIRMASI DENGAN VERSI BERSIH INI ###
const AffirmationRoom = () => {
  const { setCurrentPageKey } = useContext(AppContext);
  const [phase, setPhase] = useState('input');
  const [affirmationText, setAffirmationText] = useState('');
  const [error, setError] = useState('');
  const audioRef = useRef(null);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [rainColor, setRainColor] = useState('#38bdf8'); // Default color

  const affirmationColors = [
  { name: 'Biru Langit', hex: '#38bdf8' }, { name: 'Hijau Zamrud', hex: '#34d399' },
  { name: 'Kuning Emas', hex: '#facc15' }, { name: 'Merah Muda', hex: '#f472b6' },
  { name: 'Ungu Lavender', hex: '#a78bfa' }, { name: 'Oranye Senja', hex: '#fb923c' },
  { name: 'Putih Mutiara', hex: '#f0f9ff' }];


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleAudioEnd = () => setPhase('finished');
    const handleAudioCanPlay = () => setIsAudioReady(true);

    audio.addEventListener('canplaythrough', handleAudioCanPlay);
    audio.addEventListener('ended', handleAudioEnd);

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.removeEventListener('canplaythrough', handleAudioCanPlay);
        audio.removeEventListener('ended', handleAudioEnd);
      }
    };
  }, []);

  const handleStart = () => {
    const words = affirmationText.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {setError('Mohon masukkan afirmasi Anda.');return;}
    if (words.length > 15) {setError('Terlalu panjang! Maksimal 15 kata.');return;}

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => {
        console.error("Audio Playback Error:", e);
        setError("Gagal memutar audio. Coba refresh & izinkan autoplay jika diminta.");
      });
    }
    setError('');
    setPhase('raining');
  };

  const resetAffirmation = () => {
    if (audioRef.current) {audioRef.current.pause();audioRef.current.currentTime = 0;}
    setAffirmationText('');
    setPhase('input');
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "fixed inset-0 bg-gray-900 text-white flex flex-col justify-center items-center p-4 overflow-hidden" }, /*#__PURE__*/
    React.createElement("audio", { ref: audioRef, src: "https://raw.githubusercontent.com/kesinilagi/asetmusik/main/suara ruang afirmasi 8d.mp3", preload: "auto" }),

    phase === 'raining' && /*#__PURE__*/React.createElement(ZoomingWordBackground, { customWords: affirmationText.trim().split(/\s+/).filter(Boolean), rainColor: rainColor }),
    phase === 'raining' && /*#__PURE__*/React.createElement(AffirmationFlasher, { phrase: affirmationText, rainColor: rainColor }),
    phase === 'raining' && /*#__PURE__*/
    React.createElement("div", { className: "absolute top-4 left-4 z-20" }, /*#__PURE__*/
    React.createElement("button", { onClick: resetAffirmation, className: "bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors" }, "\u2190 Tulis Ulang")),


    phase !== 'raining' && /*#__PURE__*/React.createElement(Starfield, null), /*#__PURE__*/
    React.createElement("div", { className: "absolute top-4 right-4 z-20" }, /*#__PURE__*/
    React.createElement("button", { onClick: () => setCurrentPageKey('daftar-isi'), className: "bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors" }, "Kembali ke Daftar Isi \u2192")), /*#__PURE__*/


    React.createElement("div", { className: "relative z-10 w-full max-w-3xl text-center flex flex-col justify-center items-center" },
    phase === 'input' && /*#__PURE__*/
    React.createElement("div", { className: "animate-fade-in w-full px-4" }, /*#__PURE__*/
    React.createElement("h1", { className: "text-3xl md:text-5xl font-bold mb-4" }, "Ruang Afirmasi"), /*#__PURE__*/
    React.createElement("p", { className: "mb-6 text-gray-300" }, "Tuliskan doa atau afirmasi positif Anda (maks. 15 kata)."), /*#__PURE__*/
    React.createElement("textarea", { value: affirmationText, onChange: e => setAffirmationText(e.target.value),
      className: "w-full h-32 bg-gray-800 border border-gray-700 rounded-lg text-xl p-4 focus:outline-none focus:ring-2 focus:ring-sky-500 force-uppercase",
      placeholder: "Contoh: Rezeki berlimpah datang padaku dengan mudah dan menyenangkan..." }), /*#__PURE__*/
    React.createElement("p", { className: `text-sm mt-2 ${affirmationText.trim().split(/\s+/).filter(Boolean).length > 15 ? 'text-red-500' : 'text-gray-400'}` }, "Jumlah Kata: ",
    affirmationText.trim().split(/\s+/).filter(Boolean).length, " / 15"),

    error && /*#__PURE__*/React.createElement("p", { className: "text-red-500 mt-2" }, error), /*#__PURE__*/
    React.createElement("div", { className: "mt-6" }, /*#__PURE__*/
    React.createElement("p", { className: "text-gray-400 mb-3" }, "Pilih Warna Hujan Afirmasi:"), /*#__PURE__*/
    React.createElement("div", { className: "flex justify-center gap-3 flex-wrap" },
    affirmationColors.map((color) => /*#__PURE__*/
    React.createElement("button", { key: color.name, onClick: () => setRainColor(color.hex),
      className: `w-8 h-8 rounded-full border-2 transition-all ${rainColor === color.hex ? 'border-white scale-110' : 'border-transparent'}`,
      style: { backgroundColor: color.hex }, title: color.name })))), /*#__PURE__*/



    React.createElement("button", { onClick: handleStart, disabled: !isAudioReady,
      className: "mt-8 w-full max-w-sm bg-sky-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-sky-700 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed" },
    isAudioReady ? 'Mulai Sesi Afirmasi' : 'Memuat Audio...')),




    phase === 'finished' && /*#__PURE__*/
    React.createElement("div", { className: "animate-fade-in" }, /*#__PURE__*/
    React.createElement("h1", { className: "text-3xl md:text-5xl font-bold mb-6" }, "Sesi Selesai"), /*#__PURE__*/
    React.createElement("p", { className: "mb-8 text-gray-300" }, "Selamat Anda Sudah Siap Mengalirkan dan Menerima Energi Kelimpahan."), /*#__PURE__*/
    React.createElement("button", { onClick: resetAffirmation,
      className: "bg-sky-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-sky-700 transition-colors" }, "Afirmasi Lagi")))));







};

// --- KOMPONEN-KOMPONEN UTILITAS ---

// ### GANTI KOMPONEN INI DENGAN VERSI BARU YANG LEBIH PINTAR ###
const IntegratedAudioPlayer = ({ src, text, isLooping = false }) => {
  const audioRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Fungsi 'Sapu Bersih' dan pemutaran audio
  const togglePlay = () => {
    if (!audioRef.current) return;

    const thisAudio = audioRef.current;

    // Jika audio ini sedang berputar, hentikan saja.
    if (isPlaying) {
      thisAudio.pause();
      thisAudio.currentTime = 0;
      return; // Hentikan fungsi di sini
    }

    // --- JURUS SAPU BERSIH ---
    // Sebelum memutar, cari semua elemen audio di halaman dan hentikan.
    document.querySelectorAll('audio').forEach(otherAudio => {
      // Kita pastikan tidak menghentikan diri sendiri jika tidak perlu
      if (otherAudio !== thisAudio) {
        otherAudio.pause();
        otherAudio.currentTime = 0;
      }
    });

    // Setelah semua bersih, baru putar audio yang ini.
    thisAudio.play().catch(err => console.error("Audio Error:", err));
  };

  // Efek untuk memantau status audio
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = isLooping;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {if (!isLooping) setIsPlaying(false);};

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [src, isLooping]);

  return /*#__PURE__*/ (
    // Tombolnya sekarang menjadi flex container untuk menampung ikon dan teks
    React.createElement("div", { onClick: togglePlay, className: "flex items-center justify-center gap-4 my-4 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors" }, /*#__PURE__*/
    React.createElement("audio", { ref: audioRef, src: src, preload: "auto", className: "hidden" }), /*#__PURE__*/


    React.createElement("div", { className: "text-white" },
    isPlaying ? /*#__PURE__*/
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-10 w-10 animate-pulse text-sky-400", viewBox: "0 0 20 20", fill: "currentColor" }, /*#__PURE__*/
    React.createElement("path", { d: "M10 3.5a.5.5 0 01.5.5v12a.5.5 0 01-1 0v-12a.5.5 0 01.5-.5zM5.5 6a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8a.5.5 0 01.5-.5zM14.5 6a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8a.5.5 0 01.5-.5z" })) : /*#__PURE__*/


    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-10 w-10", viewBox: "0 0 20 20", fill: "currentColor" }, /*#__PURE__*/
    React.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z", clipRule: "evenodd" }))), /*#__PURE__*/





    React.createElement("p", { className: `text-center text-3s font-serif text-white` },
    text)));



};


// ### GANTI KOMPONEN INI DENGAN VERSI BARU YANG LEBIH PINTAR ###
const InlineAudioIcon = ({ src, isLooping = false }) => {
  const audioRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Fungsi 'Sapu Bersih' dan pemutaran audio
  const togglePlay = e => {
    e.stopPropagation(); // Mencegah klik menyebar ke elemen lain
    if (!audioRef.current) return;

    const thisAudio = audioRef.current;

    // Jika audio ini sedang berputar, hentikan saja.
    if (isPlaying) {
      thisAudio.pause();
      thisAudio.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    // --- JURUS SAPU BERSIH ---
    // Sebelum memutar, cari semua audio di halaman dan hentikan.
    document.querySelectorAll('audio').forEach(otherAudio => {
      otherAudio.pause();
      otherAudio.currentTime = 0;
    });

    // Setelah semua bersih, baru putar audio yang ini.
    thisAudio.play().catch(err => console.error("Audio Error:", err));
  };

  // Efek untuk memantau status audio dari luar
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = isLooping;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {if (!isLooping) setIsPlaying(false);};

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [src, isLooping]);

  return /*#__PURE__*/(
    React.createElement("button", { onClick: togglePlay, className: "inline-flex items-center gap-2 ml-3 text-gray-500 hover:text-blue-600 transition-colors", title: isPlaying ? "Hentikan Audio" : "Putar Audio" }, /*#__PURE__*/
    React.createElement("audio", { ref: audioRef, src: src, preload: "auto", className: "hidden" }),

    isPlaying ? /*#__PURE__*/
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 animate-pulse text-blue-500", viewBox: "0 0 20 20", fill: "currentColor" }, /*#__PURE__*/
    React.createElement("path", { d: "M10 3.5a.5.5 0 01.5.5v12a.5.5 0 01-1 0v-12a.5.5 0 01.5-.5zM5.5 6a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8a.5.5 0 01.5-.5zM14.5 6a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8a.5.5 0 01.5-.5z" })) : /*#__PURE__*/


    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", viewBox: "0 0 20 20", fill: "currentColor" }, /*#__PURE__*/
    React.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z", clipRule: "evenodd" })), /*#__PURE__*/



    React.createElement("span", { className: "text-xs font-semibold" },
    isPlaying ? 'Sedang Mendengar...' : 'Dengarkan')));



};

const Starfield = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < 500; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random(),
          speed: Math.random() * 0.2 + 0.1 });

      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return /*#__PURE__*/React.createElement("canvas", { id: "starfield", ref: canvasRef, style: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 } });
};

// --- KOMPONEN BARU UNTUK KILATAN SUBLIMINAL ---
const AffirmationFlasher = ({ phrase }) => {
  const [positionTop, setPositionTop] = useState('50%');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!phrase) return;

    const mainTimer = setInterval(() => {
      const randomTop = Math.random() * 50 + 25;
      setPositionTop(`${randomTop}%`);
      setIsVisible(true);

      const flashTimer = setTimeout(() => {
        setIsVisible(false);
      }, 200);

      return () => clearTimeout(flashTimer);
    }, 3000);

    return () => clearInterval(mainTimer);
  }, [phrase]);

  return /*#__PURE__*/(
    React.createElement("p", {
      className: "affirmation-flasher",
      style: {
        top: positionTop,
        opacity: isVisible ? 1 : 0,
        //color: rainColor,
        textShadow: `0 0 30px ` } },


    phrase.toUpperCase()));


};

// ### GANTI SELURUH PIXELTHOUGHTS ANDA DENGAN VERSI INI ###
const PixelThoughts = () => {
  const { setCurrentPageKey } = useContext(AppContext);
  const [view, setView] = useState('input');
  const [thought, setThought] = useState('');
  const [message, setMessage] = useState('');
  const [heading, setHeading] = useState('Apa yang saat ini kamu rasakan dan pikirkan?');
  const [animationClass, setAnimationClass] = useState('');
  const audioRef = useRef(null);

  // --- PERBAIKAN DI SINI: KEMBALIKAN KE STRUKTUR SEMULA ---
  const messages = [
  "Tarik napas dalam-dalam... ",
  " tahan .",

  "Perhatikan pikiran itu menyusut.\nLihatlah ia menjadi kecil dan jauh.....",

  "Ia hanyalah setitik kecil di alam semesta yang luas......",

  " hembuskan nafasmu \nbersama rasa itu",

  "Biarkan ia pergi.",

  "Menghilang di antara bintang-bintang...... \nRasakan kelegaan saat ia menghilang......",
  "  ",
  "  ",

  "Dari keheningan, aku terbuka. \nDari ketiadaan",
  " aku menerima... ",

  "Aku adalah tempat aliran rezeki-Mu mengalir... ",

  "Aku sekarang merasa lebih ringan.\nAku sekarang merasa berlimpah",

  "Aku sekarang merasa bahagia \nAku memiliki energi yang baru.",
  "Aku Sangat tenang. \nAku berkelimpahan. ",
  "Aku Sejahtera \nAllah sebaik baiknya pengurus",
  "Jalan-jalan baru terbuka. \nPertolongan datang dari arah tak kusangka. ",
  "Hatiku ringan.\nLangkahku lapang",
  "Aku mengalir bersama-Mu, ya Allah. ",
  "Aku mengalir bersama-Mu, ya Allah \nAku mengalir bersama-Mu, ya Allah",
  "Tutup dengan sholawat Tiga Kali",
  "Rasakan sampai musiknya berhenti \nNikmati momen ketenangan ini."];


  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const startMeditation = async thoughtText => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    setThought(thoughtText);
    setView('thought');

    audio.play().catch(e => console.error("Gagal memulai audio:", e));

    await sleep(100);
    setAnimationClass('recede');
    await sleep(1000);
    setView('message');

    for (let i = 0; i < messages.length; i++) {
      setMessage(messages[i]);
      // Sekarang kondisi ini akan terpenuhi
      if (messages[i] === "Biarkan ia pergi.") {
        setAnimationClass('recede vanish');
      }
      await sleep(i === messages.length - 1 ? 12000 : 5000); // Durasi per pesan disesuaikan lagi
    }

    audio.pause();
    await sleep(1000);

    setView('finished');
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      startMeditation(event.target.value.trim());
    }
  };

  const handleRestart = () => {
    setView('input');
    setThought('');
    setAnimationClass('');
    setHeading('Ada lagi yang ingin dilepaskan?');
  };

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return /*#__PURE__*/(
    React.createElement("div", { className: "fixed inset-0 bg-gray-900 text-white flex flex-col justify-center items-center p-4" }, /*#__PURE__*/

    React.createElement(Starfield, null), /*#__PURE__*/
    React.createElement("audio", { ref: audioRef, src: "https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Afirmasi Pelepasan Panning 3d.mp3", loop: true }), /*#__PURE__*/

    React.createElement("div", { className: "absolute top-4 right-4 z-10" }, /*#__PURE__*/
    React.createElement("button", { onClick: () => setCurrentPageKey('daftar-isi'), className: "bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors" }, "\u2190 Kembali ke Daftar Isi")), /*#__PURE__*/


    React.createElement("div", { className: "z-10 w-full max-w-2xl text-center flex flex-col justify-center items-center", style: { minHeight: '384px' } },

    (view === 'thought' || view === 'message' || view === 'finished') && /*#__PURE__*/
    React.createElement("div", { className: `thought-bubble ${animationClass} glowing-border flex items-center justify-center w-64 h-64 md:w-80 md:h-80 bg-white/80 rounded-full text-center p-6` }, /*#__PURE__*/
    React.createElement("span", { className: `font-extrabold text-indigo-600 break-words ${thought.length > 40 ? 'text-xl md:text-3xl' : 'text-2xl md:text-4xl'} force-uppercase` },
    thought)),




    view === 'input' && /*#__PURE__*/
    React.createElement("div", { className: "animate-fade-in" }, /*#__PURE__*/
    React.createElement("h1", { className: "text-3xl md:text-5xl font-bold mb-6" }, heading), /*#__PURE__*/
    React.createElement("input", { onKeyPress: handleKeyPress, type: "text", className: "w-full bg-gray-800 border border-gray-700 rounded-lg text-xl md:text-2xl text-center p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 force-uppercase", placeholder: "Ungkapkan Disini...." })),



    view === 'message' && /*#__PURE__*/React.createElement("p", { key: message, className: "message-fade-in text-2xl md:text-4xl font-light" }, message),

    view === 'finished' && /*#__PURE__*/
    React.createElement("div", { className: "animate-fade-in" }, /*#__PURE__*/
    React.createElement("h2", { className: "text-2xl md:text-4xl font-bold mb-8" }, "Pelepasan Selesai. Apa selanjutnya?"), /*#__PURE__*/
    React.createElement("div", { className: "flex flex-col md:flex-row gap-4 justify-center" }, /*#__PURE__*/
    React.createElement("button", { onClick: handleRestart, className: "bg-white/20 px-6 py-3 rounded-lg hover:bg-white/30 transition-colors" }, "Ada Lagi yang Mau Dilepaskan"), /*#__PURE__*/


    React.createElement("button", { onClick: () => setCurrentPageKey('affirmation-room'), className: "bg-sky-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-sky-700 transition-colors" }, "Lanjut ke Ruang Afirmasi \u2728"))))));








};



// QUOTE
const RandomQuote = () => {
  const quotes = ["Ketenangan sejati bukan berarti tanpa badai, tapi menari di tengah badai.", "Hati yang bersyukur adalah magnet bagi keajaiban.", "Lepaskan apa yang tidak bisa kau kendalikan, dan fokus pada apa yang bisa.", "Saat aku melepaskan siapa diriku, aku menjadi siapa yang seharusnya kutumbuhkan - Lao TSe", "Apa pun yang kamu lawan, akan menguat. Dan apa yang kamu tolak, akan menetap - Eckhart Tolle", "Jangan lawan perubahan yang datang. Biarkan hidup mengalir melalui dirimu - Jalaludin Rumi", "Ingatlah, hanya dengan mengingat Allah, hati menjadi tenang", "Dunia ini hanyalah bayangan. Jika kau kejar, ia akan lari.Tapi jika kau berpaling darinya, ia akan mengikutimu"];
  const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);
  return /*#__PURE__*/React.createElement("div", { className: "text-sm italic text-white/70 mt-2 text-center w-full transition-opacity duration-1000" }, "\"", quote, "\"");
};

// --- KOMPONEN HALAMAN & KONTEN ---

const ThemeSettings = () => {
  // 1. Ambil fungsi `setCurrentPageKey` dari Context
  const { themeKey, setThemeKey, themes, setCurrentPageKey } = useContext(AppContext);

  const handleThemeChange = key => {
    localStorage.setItem('ebookThemeKey', key);
    setThemeKey(key);
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: contentContainerClasses }, /*#__PURE__*/
    React.createElement("h2", { className: sectionTitleClasses }, "Pengaturan Tema"), /*#__PURE__*/
    React.createElement("p", { className: paragraphClasses }, "Pilih skema warna yang paling nyaman untuk Anda."), /*#__PURE__*/
    React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4" },
    Object.keys(themes).map(key => {
      const theme = themes[key];
      return /*#__PURE__*/(
        React.createElement("div", { key: key, className: "text-center" }, /*#__PURE__*/
        React.createElement("button", {
          onClick: () => handleThemeChange(key),
          className: `w-full h-24 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md border-4 transition-all ${
          key === themeKey ? 'border-yellow-400 scale-105' : 'border-transparent'
          } ${theme.header}` },

        theme.name)));



    })), /*#__PURE__*/



    React.createElement("div", { className: "text-center mt-10" }, /*#__PURE__*/
    React.createElement("button", {
      onClick: () => setCurrentPageKey('home'),
      className: "bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300" }, "Tutup Pengaturan"))));






};


// --- KUMPULAN KOMPONEN BAB ---
// PERBAIKAN: Semua ` ``` ` telah dihapus dari sini.

const Bab1 = () => /*#__PURE__*/
React.createElement("div", { className: `${contentContainerClasses}` }, /*#__PURE__*/
React.createElement("h2", { className: `${sectionTitleClasses}` }, "Bab 1. Dunia Boleh Heboh, Tapi Kita Jangan Hilang Arah"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Coba sejenak hentikan langkah dan amati sekeliling. Di setiap sudut, hiruk pikuk kehidupan modern begitu terasa, seolah semua berpacu dalam perlombaan tanpa garis finis. Setiap individu tampak sibuk, tergesa-gesa mengejar \"sesuatu\" yang seringkali bersifat fana dan sementara. Berbondong-bondong mereka berlomba ingin menjadi ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "viral"), " di media sosial, berharap mendapatkan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "cuan"), " instan dari tren sesaat, atau mati-matian mencari ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "validasi"), " dari dunia maya yang terus-menerus menuntut. Mereka sibuk mengkurasi citra diri yang sempurna di hadapan publik, mengejar jumlah *likes* dan *followers* seolah itulah satu-satunya ukuran keberhasilan. Namun, pernahkah kita berhenti sejenak dan bertanya: berapa banyak dari mereka yang benar-benar merasakan ketenangan dan kedamaian di lubuk hati, terlepas dari gemerlap dunia luar?"), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Ironisnya, banyak di antara mereka yang tampak \"berhasil\" di mata dunia justru menyimpan kegelisahan mendalam. Ada yang jumlah pengikutnya di media sosial mencapai ribuan, bahkan jutaan, hidup di bawah sorotan lampu publik, namun setiap malam tidur mereka diliputi kegelisahan dan kekhawatiran akan citra diri yang rentan, takut kehilangan relevansi. Ada pula yang rekening banknya begitu tebal, dipenuhi angka-angka fantastis, meraup keuntungan dari berbagai lini bisnis, namun jantung mereka rapuh, dilanda kecemasan akan investasi berikutnya atau ketakutan kehilangan kekayaan yang telah terkumpul. Lebih menyedihkan lagi, tak sedikit yang begitu gigih berusaha membahagiakan orang lain, sibuk memenuhi ekspektasi sosial dari keluarga, teman, atau bahkan lingkungan kerja, hingga lupa bagaimana rasanya bahagia itu sendiri, bahkan kehilangan koneksi dengan kebutuhan dan kebahagiaan sejati dalam diri mereka."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Kita semua hidup dalam era serba ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "instan"), ", di mana segala sesuatu bisa didapatkan dengan cepat dan mudah. Pesanan makanan sampai dalam hitungan menit, informasi melimpah dalam hitungan detik, dan konektivitas global seolah menghapus batasan ruang dan waktu. Namun, paradoksnya, justru keadaan serba cepat inilah yang sering kali membuat batin kita terasa ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "lapar"), " dan hampa. Kita merasa mendapatkan begitu banyak hal\u2014gadget terbaru, liburan mewah, pengakuan publik\u2014but at the same time, kita justru merasa kehilangan lebih banyak lagi. Kehilangan waktu untuk diri sendiri, kehilangan kualitas hubungan, dan yang terpenting, kehilangan esensi diri dalam pusaran ekspektasi."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Mengapa fenomena ini bisa terjadi? Jawabannya sederhana: karena kita terlalu sibuk melihat ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "ke luar"), ", terpaku pada apa yang orang lain miliki atau pikirkan, atau bagaimana orang lain menampilkan diri mereka, daripada ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "menengok ke dalam"), " diri sendiri. Kita terus membandingkan pencapaian, berlomba mengejar standar yang seringkali tidak realistis, dan mengejar persetujuan yang ditetapkan oleh dunia luar, tanpa pernah memberi kesempatan pada jiwa untuk bernapas, merefleksikan apa yang benar-benar penting, dan menemukan kedamaian yang otentik."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Buku ini sama sekali tidak bermaksud menyuruh Anda untuk berhenti bekerja, meninggalkan segala aktivitas duniawi, atau menjadi seorang rahib yang menyepi di puncak gunung. Bukan itu tujuannya. Sebaliknya, mari kita secara perlahan dan sadar menata ulang perspektif kita tentang hidup. Hidup ini bukan hanya soal ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "laku"), " atau tindakan yang terlihat oleh mata orang lain, tapi juga soal ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "rasa"), " yang mengalir di dalam batin kita\u2014niat, kebermaknaan, dan ketenangan. Ini bukan hanya tentang ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "hasil"), " yang bisa diukur dengan angka, tapi juga soal bagaimana hasil itu didapatkan, apakah melalui cara yang ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "halal"), " dan berkah, tanpa merugikan diri sendiri atau orang lain. Dan yang paling penting, hidup ini bukan hanya tentang ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "siapa kita di mata orang lain"), ", sejauh mana kita diakui atau dielu-elukan oleh masyarakat, tapi yang terpenting adalah ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "siapa kita saat bercermin dengan jiwa"), ", ketika kita jujur pada diri sendiri dan menyelaraskan hati nurani dengan tindakan nyata. Inilah jalan menuju kedamaian sejati, yang tak tergoyahkan oleh hebohnya dunia."));




const Bab2 = () => /*#__PURE__*/
React.createElement("div", { className: `${contentContainerClasses}` }, /*#__PURE__*/
React.createElement("h2", { className: `${sectionTitleClasses}` }, "Bab 2. Kita Ini Mau Ke Mana Sebenarnya?"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Pernahkah Anda merasakan hidup ini seperti sedang menaiki kereta api super cepat, melaju dengan kecepatan tinggi tanpa henti, namun dengan perasaan hampa karena sama sekali tidak tahu tujuan akhirnya ke mana? Di era modern ini, fenomena tersebut semakin umum terjadi. Semua orang tampak sibuk, semua tergesa-gesa dalam aktivitas sehari-hari, dari bangun pagi hingga larut malam. Namun, jika tiba-tiba kita diajukan pertanyaan sederhana, \u201CMau ke mana sih, sebenarnya, hidup ini mengarah?\u201D... sebagian besar dari kita mungkin hanya bisa menjawab, \u201CYang penting jalan aja dulu,\u201D atau \u201CIkuti arus saja,\u201D tanpa benar-benar memiliki kompas internal yang jelas."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Ya, terkadang hidup memang berjalan seperti itu: kita mengejar sesuatu yang bahkan tidak kita pahami secara mendalam, atau yang kita yakini akan membawa kebahagiaan padahal belum tentu. Kita sibuk menumpuk pencapaian demi pencapaian\u2014gelar pendidikan tinggi, posisi jabatan bergengsi, akumulasi aset materi\u2014namun kita lupa untuk mengevaluasi kembali apakah semua itu benar-benar membuat batin kita merasa damai, tenang, dan utuh, atau justru sebaliknya, makin tertekan oleh beban ekspektasi dan target yang tak berujung. Misalnya, seorang profesional muda mungkin mati-ati mengejar promosi demi promosi, hanya untuk menyadari bahwa kenaikan gaji dan posisi justru membawa lebih banyak stres dan kurangnya waktu untuk keluarga."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Ada yang berlari kencang dari bayang-bayang kemiskinan masa lalu, sehingga lupa menikmati proses hidup. Ada yang dikejar *deadline* pekerjaan yang tak ada habisnya, mengorbankan kesehatan fisik dan mental demi tuntutan karier. Ada pula yang hanya ingin diakui keberadaannya di lingkungan sosial atau profesional, terus-menerus mencari tepuk tangan dan pujian dari luar. Namun, di balik semua hiruk pikuk pengejaran itu, ada satu pertanyaan mendasar yang seringkali kita abaikan, atau bahkan sengaja kita hindari karena takut dengan jawabannya:"), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses} text-center font-bold text-xl text-blue-700` }, "\uD83D\uDC49 Apa sih tujuan saya hidup ini, sebenarnya?"), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Ini bukan sekadar visi atau daftar impian yang kita tempel di *vision board* kita, melainkan pertanyaan jujur yang keluar dari lubuk hati terdalam: apa yang sebenarnya saya cari dalam perjalanan hidup ini? Jika jawabannya hanya uang, maka setelah memiliki uang dalam jumlah yang cukup melimpah\u2026 lantas apa lagi yang akan dikejar? Apakah itu akan mengisi kekosongan batin? Jika jawabannya pengakuan atau popularitas, setelah menjadi ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "viral"), " dan dikenal banyak orang\u2026 lalu apa yang tersisa? Apakah validasi dari ribuan *likes* dan komentar itu bisa menjamin kedamaian abadi?"), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Banyak dari kita yang mengejar sesuatu hanya karena \u201Csemua orang juga begitu.\u201D Kita terjebak dalam arus kolektif, merasa harus mengikuti tren dan standar yang ditetapkan oleh lingkungan sekitar agar tidak tertinggal. Kita lupa bahwa hidup ini bukan sebuah lomba cepat-cepatan di mana yang tercepat adalah pemenangnya. Ini adalah sebuah perjalanan yang unik bagi setiap individu\u2014dan yang paling penting adalah: jalan mana yang kita pilih, yang akan membuat kita tetap utuh, seimbang, dan berintegritas di tengah berbagai godaan dunia."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Kadang, justru ketika kita berani berhenti sejenak dari hiruk pikuk, menarik diri dari kebisingan luar, dan jujur pada suara hati\u2026 barulah kita menemukan arah sejati. Arah yang tidak didikte oleh ekspektasi eksternal, melainkan berasal dari kebijaksanaan dan keinginan terdalam diri kita."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Maka, sebelum jauh melangkah lagi dan terbawa arus yang tak jelas, mari kita ambil napas dalam-dalam. Tanyakan ulang ke dalam diri dengan sepenuh hati:"), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses} text-center font-semibold text-lg text-blue-700` }, "Apakah jalan yang saya tempuh saat ini sedang mendekatkan saya pada hidup yang penuh berkah dan makna? Atau justru tanpa sadar menjauhkan saya dari kejujuran batin dan kedamaian sejati saya sendiri?"), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses} text-center font-semibold` }, "Jawabannya\u2026 hanya hati nurani Anda yang tahu dan bisa merasakannya."), /*#__PURE__*/


React.createElement(IntegratedAudioPlayer, {
  src: "https://www.dropbox.com/scl/fi/qglpp04ts3fbsdoypga6n/Pembukaan.mp3?rlkey=0n1nc9yz3sbxe6ncn8l3u21dj&st=qat24ch4&dl=1",
  text: "Dengarkan Pembukaan Bab Ini" }));





const Bab3 = () => /*#__PURE__*/
React.createElement("div", { className: `${contentContainerClasses}` }, /*#__PURE__*/
React.createElement("h2", { className: `${sectionTitleClasses}` }, "Bab 3. Hati: Singgasana Cahaya yang Terlupakan"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Dalam khazanah psikologi Islam, khususnya dalam ajaran Sufisme, kita mengenal tiga \"penghuni\" utama yang mendiami diri kita: ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Nafs"), " (sering diartikan sebagai diri, ego, atau jiwa hewani), ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Qalb"), " (hati, dalam konteks spiritual), dan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Ruh"), " (roh ilahi). Untuk memudahkannya, bayangkan diri Anda sebagai sebuah rumah berjenjang. ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Nafs"), " adalah penghuni kamar bawah tanah yang cenderung gelap dan suka bikin onar. Ia adalah bagian dari diri kita yang senantiasa menuntut kesenangan instan, cenderung egois, mudah tergoda hawa nafsu, dan seringkali menjadi sumber kemalasan. Nafs yang membisikkan untuk menunda ibadah, mudah terpancing emosi dan amarah, atau sekadar ingin rebahan berlama-lama sambil terus-menerus *scrolling* media sosial tanpa tujuan. Di atasnya, pada tingkatan yang lebih tinggi dan \"berkelas\", bersemayamlah ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Qalb"), " dan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Ruh"), " yang memancarkan cahaya serta kebijaksanaan."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Al-Ghazali, seorang ulama besar dan pemikir Islam terkemuka, dengan tegas membedakan antara hati fisik yang berfungsi memompa darah ke seluruh tubuh\u2014ranah ilmu kedokteran\u2014dan \"substansi halus\" dari ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Qalb"), ". Nah, ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Qalb"), " inilah esensi sejati kemanusiaan kita. Ia adalah pusat di mana kita bisa merasa, tahu, mengalami kesadaran mendalam, serta membedakan antara yang baik dan buruk. Dia adalah \"Bos\" sejati dalam diri kita, yang seharusnya menjadi pengendali utama. Bagi kaum Sufi, ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Qalb"), " itu bagaikan antena paling canggih dan sensitif, yang diciptakan untuk menangkap sinyal-sinyal kebenaran, ilham, dan pengetahuan spiritual langsung dari Ilahi. Tentu saja, ini bisa terjadi asalkan antenanya bersih dan terawat, tanpa \"karat\" yang disebabkan oleh tumpukan dosa, ego, dan kelalaian. Di dalam ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Qalb"), " inilah iman (", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "\u012Bm\u0101n"), "), pengetahuan spiritual mendalam (", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "ma'rifa"), "), dan konsep keesaan ilahi (", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "tauh\u012Bd"), ") bersemayam serta tumbuh subur. Tradisi Sufi bahkan menggambarkan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Qalb"), " sebagai wadah tak terbatas, sebuah cetakan suci di mana Tuhan menuangkan keberadaan, pengetahuan, cinta, dan cahaya-Nya. Ada sebuah Hadits masyhur yang menyatakan, \"hati seorang mukmin adalah singgasana Yang Maha Pengasih,\" menunjukkan betapa agungnya kedudukan hati ini. ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Qalb"), " juga yang menopang jiwa kita dengan kebijaksanaan dan cahaya spiritual, sekaligus berfungsi sebagai alat untuk memurnikan sifat-sifat buruk dan tercela. Bahkan, di sinilah wahyu ilahi bisa kita rasakan dan tangkap secara intuitif melalui ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Sirr"), ", bagian terdalam dari hati. Kata \"qalb\" sendiri secara etimologi berarti \"berbalik, berubah,\" menunjukkan bahwa hati itu sangat dinamis, selalu bisa berputar ke arah kebaikan atau sebaliknya, tergantung pilihan dan usaha kita."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Jika kita kembali ke analogi tubuh sebagai sebuah rumah, maka hati (", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Qalb"), ") adalah ruang tengahnya, atau bisa juga disebut ruang keluarga. Ini adalah tempat di mana kita kembali, tempat segala rasa dan emosi bermuara, tempat kita menemukan ketenangan dan kejernihan. Namun, di zaman sekarang yang serba cepat dan penuh distraksi, ruang vital ini seringkali ditinggalkan\u2014ia berdebu oleh berbagai distraksi digital, riuhnya informasi, dan diam oleh kesibukan yang tiada henti. Kita terlalu fokus pada tampilan luar rumah, hingga lupa membersihkan dan menghidupkan ruang tengah yang seharusnya menjadi inti."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Dalam ajaran tasawuf, hati bukanlah sekadar organ fisik yang berdetak dan memompa darah. Ia adalah ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Qalb"), "\u2014sebuah wadah spiritual, pusat kesadaran tertinggi, dan tempat di mana cahaya Ilahi bisa hadir serta menerangi jalan hidup kita. Saat hati jernih, bersih dari segala kotoran spiritual, hidup terasa terang, penuh makna, dan langkah menjadi mantap. Sebaliknya, saat hati keruh, diliputi noda dosa, iri, dengki, atau keserakahan, maka logika kita pun akan ikut buram, sulit membedakan yang hak dan batil, serta mudah tersesat."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Hati memiliki kemampuan unik untuk \"mengetahui\" tanpa harus berpikir secara logis, dan \"memahami\" tanpa harus dijelaskan secara verbal. Ia mampu menangkap kehadiran Allah SWT, merasakan arah kebenaran, dan membimbing kita menuju kebaikan. Namun\u2026 kemampuan luar biasa ini juga bisa tertutup dan tumpul. Hal ini bisa terjadi karena tumpukan dosa yang disengaja maupun tidak, karena trauma masa lalu yang tidak disembuhkan, atau karena kita terlalu sibuk mengejar duniawi yang tak pernah usai dan tak pernah bisa memuaskan sepenuhnya."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Maka, tugas kita sebagai manusia bukan hanya sekadar menjaga kesehatan fisik atau penampilan luar, tetapi yang jauh lebih esensial adalah merawat dan membersihkan ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Qalb"), " kita. Membersihkannya dari \"sampah\" spiritual seperti sifat iri hati, dengki, serakah, riya (pamer), ujub (merasa diri hebat), dan tamak. Menghidupkannya kembali dengan zikir, renungan, ibadah, dan perbuatan baik agar ia bisa berfungsi optimal sebagai penunjuk jalan menuju kebahagiaan sejati dan ridha Ilahi."), /*#__PURE__*/

React.createElement("blockquote", { className: `${quoteClasses}` }, "*\u201CKetahuilah, dalam tubuh manusia ada segumpal daging. Jika ia baik, baiklah seluruh tubuh. Jika ia rusak, rusaklah seluruh tubuh. Ketahuilah, itu adalah hati.\u201D* (HR. Bukhari dan Muslim)."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Hadits ini menegaskan bahwa segala kebaikan dan keburukan manusia bermula dari kondisi hatinya."));





const Bab4 = () => /*#__PURE__*/
React.createElement("div", { className: `${contentContainerClasses}` }, /*#__PURE__*/
React.createElement("h2", { className: `${sectionTitleClasses}` }, "Bab 4. Akal: Satpam atau Penjaga Gerbang Ilahi?"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Akal"), " kita adalah anugerah luar biasa. Dengan kecerdasannya, ia mampu menghitung dengan cepat, menyusun strategi yang kompleks, dan menciptakan inovasi-inovasi yang mengubah peradaban. Berkat akal, kita bisa membangun jembatan megah, merancang perangkat teknologi mutakhir, atau memecahkan masalah-masalah matematis yang rumit. Namun, di balik segala kehebatannya, akal juga memiliki batas dan kelemahan intrinsik. Ia bisa menjadi licik, rentan terhadap kekeliruan dalam penalaran, dan mudah sekali menjadi korban egonya sendiri, Nafs, yang telah kita bahas di bab sebelumnya."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Dalam konteks spiritual, khususnya dalam tradisi Sufi, tugas sejati akal bukanlah untuk menindas hati (", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Qalb"), "), melainkan untuk mendukung dan melindunginya. Ketika akal dan hati bersatu dalam harmoni, kita bisa berjalan lurus di jalan kebenaran. Kita dapat mengenal kebenaran hakiki tanpa tersesat oleh jerat logika semata yang kadang menjebak. Akal membutuhkan ilmu dan informasi yang benar sebagai bahan bakarnya, sementara hati memerlukan dzikir dan pengalaman spiritual mendalam sebagai nutrisinya. Akal butuh argumentasi yang kokoh dan bukti empiris, sedangkan hati membutuhkan pengalaman langsung dan intuisi. Bersama-sama, mereka membentuk kompas sejati yang tak tergoyahkan dalam mengarungi samudra kehidupan."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Imam Ja\u2019far al-Sadiq, seorang cendekiawan terkemuka dalam tradisi Islam, memperkenalkan konsep ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Aql"), " (akal) sebagai \"satpam\" atau \"penghalang\" antara ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Nafs"), " yang cenderung membuat ulah dengan dorongan negatifnya dan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Qalb"), " yang suci. Menurut beliau:"), /*#__PURE__*/

React.createElement("blockquote", { className: `${quoteClasses}` }, "*\u201CAkal itu yang dengannya Allah disembah dan dengan akal itulah surga diraih.\u201D*"), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Pernyataan ini menunjukkan betapa krusialnya peran akal dalam perjalanan spiritual dan pencapaian keberkahan. Akal yang tercerahkan akan membimbing kita pada ketaatan dan kebaikan, yang pada akhirnya mengantarkan pada ganjaran Ilahi. Namun, penting untuk dicatat bahwa jika akal tidak terhubung atau terkoordinasi dengan ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Qalb"), ", ia bisa menjelma menjadi alat manipulasi yang berbahaya. Akal yang terputus dari hati bisa sangat pintar menipu diri sendiri, mahir dalam beralasan dan mencari pembenaran untuk setiap tindakan, bahkan ketika hati nurani telah merasakan ada yang salah. Akal semacam ini menjadi pandai secara pragmatis, namun lupa akan arah pulang yang sesungguhnya menuju kedamaian dan kebenaran."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Tugas ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Aql"), " ini sangat penting: dia berfungsi menyaring dan menghalau pengaruh negatif dari ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Nafs"), " agar tidak merusak kemurnian hati. Jadi, ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Aql"), " bukanlah sumber utama pengetahuan spiritual. Sumber itu tetaplah ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Qalb"), ", karena hati lebih dekat dengan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Ruh"), " dan mampu menerima cahaya ilahi secara langsung. Akal adalah penjaga agar ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Qalb"), " tetap bersih dan reseptif terhadap pancaran Ilahi tersebut. Singkatnya, dalam psikologi Sufi, ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Qalb"), " adalah inti kesadaran manusia dan organ utama untuk pengetahuan spiritual. Jika ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Qalb"), " bersih, ia menjadi sumber kebenaran tertinggi dan koneksi langsung dengan Ilahi, jauh melampaui kemampuan analitis pikiran semata. Ini sangat mendukung mengapa hati harus diutamakan untuk pencarian kebenaran spiritual, sebab hati jujur dan sangat reseptif terhadap kehadiran ilahi. Akal? Dia penting, tapi sebagai \"asisten\" yang setia menjaga kemurnian hati."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Perdebatan filosofis Barat tentang akal (*reason*) dan emosi (*emotion*) juga menawarkan perspektif menarik yang selaras dengan pandangan Sufi. Dulu, ada aliran pemikiran yang menganggap akal sebagai raja tunggal, seperti Immanuel Kant yang menekankan peran akal murni dalam moralitas dan pengetahuan. Di sisi lain, ada juga yang menyatakan bahwa emosi adalah bosnya, seperti David Hume yang berpendapat bahwa akal hanyalah budak nafsu. Namun, dalam psikologi kognitif dan ilmu saraf modern, konsensus yang lebih kuat muncul: keduanya adalah tim kerja yang saling melengkapi."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Emosi seringkali memberikan \"alarm\" atau sinyal awal tentang suatu situasi\u2014misalnya, rasa takut memberi tahu adanya bahaya, atau rasa gembira menandakan kebahagiaan. Akal kemudian mengambil peran untuk menganalisis sinyal emosional ini, merumuskan strategi, dan mengambil keputusan yang paling rasional berdasarkan informasi yang ada. Jadi, bukan lagi soal memilih salah satu dan mengabaikan yang lain, melainkan bagaimana keduanya\u2014akal dan emosi (yang dapat dianalogikan dengan ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Qalb"), " sebagai pusat perasaan spiritual dan intuisi)\u2014bisa bekerja sama secara sinergis. Ketika akal yang cerdas didasari oleh kejernihan hati dan intuisi spiritual, keputusan yang diambil akan jauh lebih bijaksana dan membawa berkah, tidak hanya bagi diri sendiri tetapi juga bagi lingkungan sekitar."));




const Bab5 = () => /*#__PURE__*/
React.createElement("div", { className: `${contentContainerClasses}` }, /*#__PURE__*/
React.createElement("h2", { className: `${sectionTitleClasses}` }, "Bab 5. Intuisi: Bahasa Lembut yang Kita Abaikan"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Pernahkah Anda punya \"firasat\" kuat tentang sesuatu, padahal logika Anda bilang sebaliknya? Lalu, Anda mengabaikan firasat itu dan *boom!* Kejadiannya persis seperti firasat Anda. Rasanya kayak ditampar kenyataan, kan? Nah, itulah intuisi."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Intuisi itu seperti bisikan halus yang sering kita abaikan. Ia tak berteriak, tak memaksa. Tapi ia tahu. Ia hadir dalam bentuk firasat, bisikan hati, atau rasa \u201Ckayaknya gini deh\u201D\u2014dan sering kali, benar."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Intuisi itu kemampuan kita untuk tahu atau paham sesuatu tanpa perlu mikir keras atau menganalisis secara sadar. Sering disebut \"perasaan usus\" (*gut feeling*) atau insting yang membimbing keputusan cepat. Alam bawah sadar kita punya peran besar di sini. Dia itu kayak perpustakaan raksasa yang menyimpan semua pengalaman, pola, dan informasi yang pernah kita serap, bahkan yang tidak kita sadari. Dari situlah intuisi muncul, kadang tiba-tiba, kayak ide cemerlang yang muncul pas lagi mandi."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Banyak dari kita terlalu sibuk di kepala. Kita pikir semua harus masuk akal. Tapi ada bagian dari diri kita yang bisa melihat tanpa mata, bisa mendengar tanpa telinga: itulah intuisi."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Dalam tradisi Islam, intuisi sering disebut firasat orang beriman. Nabi SAW bersabda,"), /*#__PURE__*/


React.createElement("blockquote", { className: `${quoteClasses}` }, "*\u201CTakutlah terhadap firasat orang mukmin, karena ia melihat dengan cahaya Allah.\u201D* (HR. Tirmidzi)"), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Intuisi dikenal dengan berbagai istilah seperti ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "kasyf"), ", ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "ilham"), ", atau ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "firasa"), ". ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Kasyf"), " secara harfiah berarti \"terbuka tirai\" atau tersingkapnya tabir penghalang antara hamba dan Tuhannya, mengungkapkan rahasia alam gaib dan pengertian-pengertian tersembunyi."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Ilham"), " adalah pengetahuan benar yang diberikan langsung oleh Allah (*wahbi*) kepada hati seorang mukmin atau wali, yang bisa diusahakan melalui perjuangan spiritual (*muj\u0101hadah*) atau diberikan sebagai anugerah mutlak."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Kasyf"), " juga dapat diibaratkan sebagai \"wahyu\" Tuhan yang datang tiba-tiba tanpa dipikirkan, menghasilkan pemahaman instan atau \"tahu bahwa kita tahu\" (*we know that we know*). Pengetahuan ini, dalam tasawuf, dikenal sebagai ", /*#__PURE__*/React.createElement("span", { className: "highlight-text" }, "al-ilm al-khuduri"), " atau \"ilmu kehadiran\" karena hadir tanpa proses berpikir rasional. Pengalaman ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "kasyf"), " dapat terwujud melalui getaran hati, mimpi, atau penglihatan batin."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Konsep ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "kasyf"), " dan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "ilham"), " dalam Islam memberikan kerangka teologis yang melegitimasi dan mengangkat pengalaman intuisi melampaui sekadar wawasan psikologis. Ini menempatkan intuisi sebagai karunia ilahi atau buah dari perjuangan spiritual yang mendalam."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Intuisi bukan sekadar *feeling*. Ia adalah kemampuan batin yang muncul dari hati yang bersih. Jika hati penuh suara-suara dunia, intuisi tenggelam. Tapi jika hati tenang dan jernih, maka intuisi jadi penunjuk jalan yang luar biasa."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Ada teori yang bilang intuisi itu berasal dari sistem pemrosesan informasi yang cepat, otomatis, dan implisit, beda sama sistem rasional yang lambat dan butuh kontrol. Penelitian ilmiah juga sudah membuktikan bahwa intuisi melibatkan aktivitas di berbagai area otak, seperti ganglia basal, amigdala, dan korteks prefrontal. Jadi, ini bukan cuma \"perasaan\" biasa, tapi proses kognitif yang canggih."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Intuisi bisa muncul dalam berbagai bentuk: bisa berupa gambaran visual, atau \"indra intuitif\" di tubuh kita (misalnya, sensasi di perut, hati, telinga, atau hidung) yang muncul tanpa proses logis. Tapi, hati-hati ya, \"intuisi yang paling murni itu selalu benar,\" tapi yang \"tercampur dengan pikiran dan emosi Anda sendiri mungkin cuma sebagian benar atau bahkan sepenuhnya salah\". Logika juga tidak selalu akurat, kok. Berharap intuisi itu sempurna 100% tanpa latihan, itu namanya \"pemikiran magis\"."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Kadang intuisi datang dalam bentuk gelisah yang tak jelas. Kadang ia muncul sebagai ketenangan yang tidak bisa dijelaskan. Maka belajar mendengarkan intuisi adalah bagian dari perjalanan kembali ke dalam."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Latihannya? Diam. Tenang. Rileks. Dan dengarkan. Bukan dari kepala, tapi dari dalam dada."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Untuk membedakan intuisi sejati dari angan-angan atau proyeksi (alias \"baperan\" atau \"paranoid\"), ada beberapa cara:"), /*#__PURE__*/


React.createElement("ul", { className: "list-disc list-inside mb-4" }, /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Dengarkan Tubuh Anda:** Intuisi sejati sering disertai perasaan \"terbuka, rileks, gembira, koneksi, tanpa keraguan, jernih, terkejut, kagum, semangat, atau cerah.\" Ada \"rasa tahu yang mendalam.\" Kalau cuma proyeksi, biasanya hati terasa tertutup, cemas, takut, atau khawatir."), /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Fokus atau Meditasi:** Praktik ini membantu mencapai keadaan \"terpusat\" yang tenang dan waspada, sehingga intuisi tidak terganggu oleh pikiran atau emosi yang berisik."), /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Analisis Gambaran:** Tanyakan pada diri sendiri: \"Apakah ini gambaran dari masa lalu saya? Apakah saya pernah melihatnya di film/buku? Apakah ini ada hubungannya dengan ketakutan saya? Seberapa besar saya berharap ini jadi kenyataan?\" Jujur pada diri sendiri itu penting.")), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Penekanan pada penyucian diri (", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "takhalli"), " dari sifat tercela, ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "tahalli"), " dengan sifat terpuji), ketekunan dalam zikir, ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "uzlah"), " (khalwat), ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "mujahadah an-nafsi"), " (melawan hawa nafsu), dan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "istiqamah"), " (konsistensi) dalam ibadah adalah prasyarat penting untuk memperoleh ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "kasyf"), "."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Ini berarti bahwa intuisi yang benar-benar berasal dari ilahi bukanlah sekadar teknik yang dipelajari, melainkan konsekuensi dari kehidupan spiritual yang lurus dan bersih. Hal ini juga berfungsi sebagai perlindungan terhadap potensi kesesatan, seperti campur tangan jin yang dapat memfitnah atau menunjukkan hal yang sebenarnya tidak akan terjadi. Dengan demikian, keimanan yang kuat dan ibadah yang konsisten bertindak sebagai filter, memastikan sumber intuisi adalah ilahi dan bukan menyesatkan."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Kalau ada masukan intuitif yang bertentangan, jangan buru-buru ambil keputusan. Itu biasanya tanda ada proyeksi atau angan-angan yang ikut campur. Intinya, intuisi itu bukan cuma perasaan, tapi proses kognitif kompleks yang memanfaatkan alam bawah sadar dan isyarat emosional. Keandalannya bisa ditingkatkan dengan latihan dan kesadaran diri."));








const Bab6 = () => /*#__PURE__*/
React.createElement("div", { className: `${contentContainerClasses}` }, /*#__PURE__*/
React.createElement("h2", { className: `${sectionTitleClasses}` }, "Bab 6. HeartMath dan Koherensi: Saat Hati dan Otak Berdamai"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Pernahkah Anda merasa pikiran Anda seperti *browser* dengan 100 tab terbuka, semuanya berisik dan bikin pusing? Atau seperti *laptop* yang *hang* karena terlalu banyak aplikasi berjalan? Nah, itu namanya \"inkoherensi\" antara hati dan pikiran."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Sains modern ternyata setuju dengan para sufi: hati itu bukan cuma organ pompa darah. Ia punya kecerdasannya sendiri. Penelitian dari HeartMath Institute menunjukkan bahwa kita bisa dengan sengaja mengubah ritme jantung kita untuk mengirim sinyal positif ke seluruh tubuh, menyeimbangkan sistem saraf, hormonal, dan kekebalan kita."), /*#__PURE__*/


React.createElement(HeartCoherenceChart, null), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Grafik di atas mengilustrasikan perbedaan antara ritme jantung yang kacau (inkoheren) saat stres, dan ritme yang halus dan teratur (koheren) saat kita merasakan emosi positif seperti syukur atau cinta. Saat koheren, stres minggat, emosi membaik, dan fungsi otak kita jadi \"terbuka\" ke level yang lebih tinggi."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Koherensi hati ini punya dampak besar pada pikiran dan intuisi kita. Stres hilang, pikiran jadi jernih, kinerja kognitif meningkat, dan kita jadi lebih mudah mengakses panduan intuitif. Saat hati kita koheren, kita \"berpikir lebih jernih, lebih intuitif,\" dan pilihan kita jadi lebih efektif karena \"selaras dengan kebijaksanaan hati kita yang lebih dalam\"."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Ada pepatah HeartMath yang keren banget: *", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "\"Otak berpikir, tetapi hati tahu.\""), "* Ini bukan berarti otak kita bodoh, tapi hati punya jenis pengetahuan yang berbeda, yang melengkapi atau bahkan melampaui pemikiran intelektual murni. Intuisi kita jadi lebih mudah diakses saat hati, pikiran, dan emosi kita selaras dan seimbang. Jadi, kalau selama ini Anda merasa pikiran Anda berisik dan bikin bingung, mungkin saatnya mendengarkan \"konduktor\" di dada Anda!"), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Latihannya sederhana: tarik napas perlahan, fokuskan ke dada, rasakan rasa syukur atau cinta. Hanya dengan itu, ritme jantung bisa berubah. Pikiran jadi tidak grasak-grusuk. Dan kita jadi lebih bisa mendengar intuisi dan kebijaksanaan hati. Koherensi hati bukan cuma latihan emosi. Ia adalah spiritualitas dalam bentuk ilmiah."));





const Bab7 = () => /*#__PURE__*/
React.createElement("div", { className: `${contentContainerClasses}` }, /*#__PURE__*/
React.createElement("h2", { className: `${sectionTitleClasses}` }, "Bab 7. Janin pun Tahu: Jantung Lebih Dulu dari Otak"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Tahukah Anda bahwa dalam keajaiban rahim ibu, ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "jantung janin sudah mulai berdetak"), " bahkan sebelum otaknya terbentuk sempurna? Ini adalah salah satu fakta biologis yang paling mencengangkan dan penuh makna. Di minggu kelima kehamilan, sebuah organ mungil seukuran biji apel sudah memulai tugas vitalnya, memompa darah ke seluruh bakal tubuh. Detak jantung yang ritmis dan penuh kehidupan itu sudah bisa didengar, sementara sistem saraf pusat, termasuk otak, masih dalam tahap pengembangan awal, jauh dari fungsi kognitif yang kompleks."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Ini bukan soal mana yang \"lebih hebat\" atau \"lebih penting\" antara jantung dan otak. Keduanya memiliki peran krusial dalam keberlangsungan hidup. Namun, fenomena perkembangan ini menyiratkan sebuah urutan alamiah dan filosofis yang mendalam: ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "hati dulu, baru akal"), ". Kita, sebagai makhluk hidup, pada dasarnya \"digerakkan oleh rasa\" sejak detik-detik pertama keberadaan kita. Detak pertama itu adalah manifestasi kehidupan, sebuah irama primordial yang mendahului segala bentuk pikiran dan analisis."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Dari sudut pandang ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "ilmu pengetahuan (sains)"), ", jantung memang lebih dari sekadar pompa darah. Penelitian neurokardiologi modern telah menemukan bahwa jantung memiliki \"otaknya sendiri,\" yang disebut ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "sistem saraf intrinsik jantung"), ". Jaringan saraf yang kompleks ini memungkinkan jantung untuk berfungsi secara independen dari otak di kepala, bahkan memengaruhi aktivitas otak melalui komunikasi dua arah melalui ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "saraf vagus"), ". Ini adalah bukti ilmiah bahwa jantung tidak hanya merasakan secara fisik, tetapi juga memiliki semacam kecerdasan atau kemampuan 'mengetahui' dan beradaptasi. Hormon seperti *atrial natriuretic peptide* (ANP) yang diproduksi jantung juga berperan dalam pengaturan *mood* dan respons stres, menunjukkan keterkaitannya dengan kondisi emosional kita. Konsep ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "koherensi jantung-otak"), " dalam ilmu saraf juga menyoroti bagaimana irama detak jantung yang stabil dan sinkron dengan gelombang otak dapat meningkatkan kejernihan mental, intuisi, dan keseimbangan emosional."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Lebih lanjut lagi, sains modern telah memberikan bukti nyata mengenai betapa eratnya hubungan emosional ibu dan janin. Ketika seorang ibu mengalami ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "stres"), ", tubuhnya akan melepaskan hormon-hormon stres seperti ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "kortisol"), ". Hormon-hormon ini tidak hanya beredar dalam aliran darah ibu, tetapi juga dapat melewati plasenta dan mencapai janin. Akibatnya, janin pun akan mengalami peningkatan detak jantung, perubahan pola pernapasan, dan bahkan peningkatan aktivitas dalam sistem sarafnya, seolah-olah ia ikut merasakan ketidaknyamanan yang dialami ibunya. Ini menunjukkan bahwa ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "janin merespons kondisi emosional ibu"), ", bukan hanya nutrisi fisiknya. Stres kronis pada ibu bahkan dikaitkan dengan perubahan perkembangan otak janin dan risiko lebih tinggi terhadap masalah perilaku atau emosional di kemudian hari. Hal ini menegaskan bahwa \"rasa\" yang dialami ibu, baik positif maupun negatif, memiliki dampak langsung dan signifikan pada perkembangan \"rasa\" awal janin."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Dalam perspektif ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "agama dan spiritualitas"), ", khususnya dalam ajaran Islam, fenomena ini semakin menguatkan pentingnya ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Qalb"), " (hati spiritual) yang telah kita bahas di bab-bab sebelumnya. Jika sejak awal kehidupan kita dimulai dengan sebuah detak, sebuah \"rasa,\" bukan dengan pikiran atau analisis, mungkin sudah waktunya kita kembali menyadari bahwa ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "rasa"), "\u2014dalam artian intuisi, empati, ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "fitrah"), ", dan koneksi spiritual\u2014adalah dasar dari segalanya. Hati, sebagai pusat Qalb, adalah singgasana iman, pengetahuan mendalam (*ma'rifah*), dan wadah bagi cahaya Ilahi. Ia adalah organ yang paling dekat dengan Ruh, yang mampu menangkap sinyal-sinyal kebenaran spiritual jauh sebelum akal mampu memprosesnya."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Ironisnya, dalam kehidupan modern yang serba rasional dan logis, kita cenderung mengabaikan bisikan hati dan lebih mengandalkan akal semata. Kita dididik untuk berpikir kritis, menganalisis data, dan membuat keputusan berdasarkan fakta. Ini penting, tentu saja. Namun, ketika hidup mulai terasa kacau, penuh tekanan, dan kita merasa kehilangan arah, respons pertama kita seringkali adalah mencoba memecahkannya dengan akal: berpikir lebih keras, mencari solusi logis, atau merencanakan strategi baru. Padahal, seringkali yang dibutuhkan bukanlah peningkatan kapasitas akal semata\u2014melainkan ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "menenangkan dulu hatimu"), ". Karena dari sanalah semua dimulai, dari detak pertama kehidupan, dari kejernihan hati yang mampu melihat melampaui logika duniawi. Hati yang tenang akan membimbing akal menuju solusi yang lebih bijaksana dan seimbang, yang tidak hanya tepat secara logis tetapi juga membawa kedamaian spiritual."));




const Bab8 = () => /*#__PURE__*/
React.createElement("div", { className: `${contentContainerClasses}` }, /*#__PURE__*/
React.createElement("h2", { className: `${sectionTitleClasses}` }, "Bab 8. Kawrooh: Ilmu Melepas Tanpa Drama"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Pernahkah Anda merasa hidup ini seperti *game* yang levelnya susah banget, dan Anda terus-menerus *stuck* di satu titik? Atau seperti membawa ransel yang isinya batu semua, berat banget, tapi Anda gak tahu cara melepasnya? Nah, di sinilah Metode Kawrooh hadir sebagai \"cheat code\" yang halal dan berkah."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Kawrooh bukan mantra. Ia bukan metode holistik. Kawrooh adalah seni melepas yang lahir dari kesadaran. Ia sederhana tapi dalam. Ia tidak mengajari kita \u201Ccara cepat bahagia\u201D, tapi cara jujur berdamai."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "\"Kawrooh\" adalah singkatan dari ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Keep Aware On Off Heart"), ". Ini bukan sekadar akronim keren, tapi inti dari sebuah filosofi yang mendalam. Kata \"Kawruh\" sendiri dalam bahasa Jawa berarti pengetahuan atau ilmu, yang menekankan pentingnya wawasan mendalam."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Metode Kawrooh mengajarkan kita untuk melepaskan beban emosional dan mental dengan ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "ridho Ilahi"), ", sehingga kita bisa mencapai tujuan yang berkah. Ini adalah pendekatan yang fokus pada kesadaran batin dan penyerahan diri untuk meraih ketenangan dan kebahagiaan sejati."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Dalam konteks spiritual Jawa, ada \"Kawruh Begja\" dari Ki Ageng Suryomentaram. Beliau mengajarkan bahwa untuk bahagia, kita gak perlu mati-matian mengejarnya, dan penderitaan pun gak perlu dihindari. Kuncinya? Manusia hanya perlu mampu merespons atau mengatur perasaannya dalam memenuhi keinginan. Ini wawasan spiritual yang keren banget: kebahagiaan itu bukan tentang apa yang kita dapatkan, tapi bagaimana kita mengelola perasaan kita terhadap apa yang terjadi. Konsep \"tentrem\" (ketenangan batin) dalam Kawruh Jawa kontemporer juga menegaskan bahwa kebahagiaan sejati itu bukan cuma soal harta, tapi soal ketenangan pikiran dan jiwa."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Metode Kawrooh ini juga menyentuh alam bawah sadar kita. Seringkali, \"keyakinan dan perasaan yang membatasi diri\" itu tersimpan di alam bawah sadar, bikin kita gak bisa maju. Dengan \"melepaskan\" hambatan bawah sadar ini, kita bisa mengakses \"pengetahuan batin\" yang lebih dalam dan \"Diri yang tidak terbatas\" yang terhubung dengan hati. Jadi, alam bawah sadar itu bukan \"kekuatan hati\" itu sendiri, tapi semacam \"gudang\" tempat penyumbatan hati berada. Kalau gudangnya bersih, kekuatan hati kita bisa keluar maksimal."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Seringkali kita merasa berat bukan karena masalahnya besar, tapi karena kita menggenggamnya terlalu erat. Kawrooh mengajak kita untuk pelan-pelan sadar, lalu rela melepaskan. Tanpa drama. Tanpa paksaan. Tanpa *overthinking*."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Kita nggak perlu berpura-pura kuat. Tapi kita bisa belajar mengenali apa yang sedang kita tahan. Dan dari sana, kita bisa memilih: lepaskan. Serahkan. Tenangkan."), /*#__PURE__*/


React.createElement("blockquote", { className: `${quoteClasses}` }, "*\u201CBeban hidup itu seperti batu di tas punggung. Kalau sadar, bisa dilepas. Kalau nggak, ya dibawa terus sambil ngeluh.\u201D*"));





const Bab9 = () => /*#__PURE__*/
React.createElement("div", { className: `${contentContainerClasses}` }, /*#__PURE__*/
React.createElement("h2", { className: `${sectionTitleClasses}` }, "Bab 9. Langkah-Langkah Kawrooh"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Metode Kawrooh memiliki alur sederhana namun sangat mendalam, dirancang untuk membantu kita kembali terhubung dengan diri sejati dan menemukan kedamaian batin. Berikut adalah langkah-langkahnya:"), /*#__PURE__*/


React.createElement("h3", { className: `${subHeadingClasses}` }, "1. Keep Aware \u2013 Sadari Dulu"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Banyak dari kita yang tanpa sadar berlari dari perasaan sendiri. Kita mencoba mengabaikan kecemasan, menekan kemarahan, atau berpura-pura baik-baik saja padahal hati sedang terluka. Ironisnya, perasaan yang kita tolak atau coba singkirkan itu justru akan menetap, bahkan bisa mengendap dan menjadi beban yang lebih berat."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Maka, langkah pertama yang paling krusial adalah ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "menyadari"), ": *apa sih yang sedang saya rasakan sekarang?* Ini adalah momen untuk berhenti sejenak dan melakukan *scan* batin."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses} font-semibold` }, "Bagaimana cara mengakses perasaan Anda?"), /*#__PURE__*/
React.createElement("ul", { className: "list-disc list-inside mb-4" }, /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Ambil jeda sejenak.** Berhenti dari aktivitas apa pun yang sedang Anda lakukan, bahkan hanya untuk beberapa detik. Tarik napas dalam-dalam, hembuskan perlahan."), /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Perhatikan sensasi fisik.** Di mana Anda merasakan emosi itu di tubuh Anda? Apakah ada ketegangan di bahu? Perut terasa mual? Dada terasa sesak? Tangan dingin atau berkeringat? Sensasi fisik seringkali menjadi petunjuk pertama tentang apa yang sedang terjadi di dalam diri."), /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Identifikasi emosi yang muncul.** Berikan nama pada perasaan itu. Apakah Anda sedang merasa ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "takut"), " (mungkin takut akan masa depan yang belum jelas)? Merasa ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "iri"), " (melihat pencapaian orang lain)? Merasa ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "malu"), " (karena kesalahan masa lalu)? Merasa ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "bingung"), " (dengan pilihan hidup)? Atau mungkin ada rasa ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "ketakutan yang tidak beralasan"), " (padahal kejadiannya belum terjadi dan mungkin tidak akan pernah terjadi)? Atau ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "rasa bersalah"), " atau ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "penyesalan"), " yang belum terselesaikan (padahal peristiwa itu sudah lewat dan tidak bisa diubah)?"), /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Jangan melabeli \"buruk\" atau \"baik\".** Penting sekali untuk tidak menghakimi perasaan yang muncul. Ini bukan tentang menjadi \"orang baik\" atau \"orang buruk\" karena merasakan sesuatu. Ini hanyalah tentang mengenali dan menerima keberadaan perasaan tersebut. Anggap saja Anda sedang mengamati cuaca dalam diri; Anda tidak mengatakan hujan itu \"buruk\" atau cerah itu \"baik\", Anda hanya mencatat bahwa \"sekarang sedang hujan\" atau \"sekarang sedang cerah\". Begitu pula dengan emosi, cukup kenali: \"Oh, saya sedang merasa cemas.\"")), /*#__PURE__*/


React.createElement("h3", { className: `${subHeadingClasses}` }, "2. On Heart \u2013 Hadapi Tanpa Menghakimi"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Setelah menyadari dan mengenali perasaan, langkah selanjutnya adalah membuka ruang bagi perasaan itu untuk hadir di hati Anda, tanpa perlawanan dan tanpa penghakiman. Rasakan sensasi emosi itu di dada atau bagian tubuh lain tempat ia bermanifestasi. Jangan buru-buru menganalisis, mencari penyebab, atau mencoba menyelesaikannya saat itu juga."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Praktikkan ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "mindfulness"), " atau kesadaran penuh. Ini melibatkan fokus total pada momen sekarang, tanpa memikirkan masa lalu atau masa depan. Caranya adalah dengan mengamati napas Anda yang masuk dan keluar, merasakan sensasi tubuh (seperti duduk atau berdiri), dan menyaksikan pikiran-pikiran yang muncul di benak Anda *tanpa berusaha mengubahnya atau bereaksi terhadapnya*. Dengan mengamati, Anda mulai menciptakan jarak yang sehat antara diri Anda sebagai pengamat dan beban-beban emosional atau pikiran tersebut. Anda akan sadar, \"Oh, ini cuma pikiran cemas, bukan diri saya yang cemas,\" atau \"Ini hanya rasa takut yang lewat, bukan saya yang takut itu.\" Ini seperti Anda melihat awan di langit; Anda tahu itu awan, Anda bisa melihat bentuk dan pergerakannya, tapi Anda bukan awan itu. Anda adalah langit yang luas dan tak terbatas, yang menyaksikan awan datang dan pergi."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Dalam proses kesadaran ini, setelah memberi ruang pada perasaan, mulailah secara perlahan mengidentifikasi hal-hal kecil yang patut disyukuri dalam hidup Anda. Mungkin hari ini Anda masih bisa bernapas lega, masih bisa menikmati secangkir kopi hangat, atau masih bisa melihat indahnya matahari terbit. Rasa syukur adalah fondasi yang sangat kuat untuk melepaskan beban emosional dan pikiran negatif, karena ia secara efektif menggeser fokus dari kekurangan dan keterbatasan menuju kelimpahan dan anugerah. Ini seperti menyalakan lampu kecil di ruangan yang gelap gulita; perlahan-lahan, dengan hadirnya cahaya syukur, kegelapan akan berkurang dan menghilang."), /*#__PURE__*/



React.createElement("h3", { className: `${subHeadingClasses}` }, "3. Off Heart \u2013 Lepaskan dengan Izin dan Ikhlas"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Setelah Anda cukup hadir dan mengenali perasaan tersebut, kini saatnya memberi izin pada diri untuk melepaskan. Proses pelepasan ini bisa melalui berbagai cara, seperti dengan mengatur napas, doa, dzikir, atau menulis. Salah satu cara sederhana adalah dengan mengakui secara jujur perasaan atau pikiran yang selama ini membatasi Anda, kemudian secara sadar dan sengaja memilih untuk melepaskannya. Bayangkan beban itu seperti Anda memegang kentang panas. Semakin lama Anda menggenggamnya, ia akan terasa semakin panas dan menyakitkan. Lepaskan saja!"), /*#__PURE__*/



React.createElement("p", { className: `${paragraphClasses}` }, "Daripada terus-menerus mencoba mengendalikan atau melawan perasaan-perasaan tersebut, fokuslah pada konsep ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "penyerahan"), ". Serahkan segala kekhawatiran, ketakutan, atau keinginan untuk mengendalikan hasil di luar batas kendali Anda. Penyerahan ini bukan berarti Anda menjadi pasif atau malas-malasan; justru sebaliknya, Anda menjadi *powerful* karena bersandar pada kekuatan tak terbatas yang ada di luar diri Anda."), /*#__PURE__*/


React.createElement("h4", { className: "text-lg font-bold text-gray-700 mt-4 mb-2" }, "\u2022 Menyerahkan Hasil dan Tidak Membatasi Kehendak Ilahi"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Sadari bahwa tidak semua hal dalam hidup berada sepenuhnya dalam kendali Anda. Setelah melakukan upaya terbaik yang Anda bisa, serahkan hasilnya kepada Tuhan Yang Maha Esa. Ini adalah bentuk ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "kepercayaan yang mendalam"), " yang ada kekuatan yang lebih besar yang mengatur segala sesuatu dengan hikmah-Nya. Jangan membatasi diri Anda dengan asumsi atau kekhawatiran manusiawi, sebab kehendak Ilahi itu tidak terbatas. Seringkali kita berkata, \"Ah, mana mungkin saya bisa begini,\" atau \"Rezeki saya cuma segini.\" Padahal, Allah bisa memberikan rezeki dan jalan keluar dari arah yang tidak disangka-sangka. Percayalah pada kemungkinan tak terhingga yang bisa datang dari-Nya. Ini ibarat Anda memesan makanan di restoran bintang lima. Anda tidak perlu tahu bagaimana koki menyiapkan hidangan itu; Anda hanya perlu percaya bahwa makanan terbaik akan segera tiba."), /*#__PURE__*/


React.createElement("h4", { className: "text-lg font-bold text-gray-700 mt-4 mb-2" }, "\u2022 Membangun Rasa Percaya dan Penerimaan"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Kembangkanlah rasa percaya yang tulus bahwa apa pun yang terjadi dalam hidup Anda adalah yang terbaik untuk Anda, sesuai dengan rencana dan ketentuan Ilahi. Penerimaan semacam ini bukanlah sikap pasif yang menyerah tanpa usaha, melainkan penerimaan aktif yang justru membebaskan Anda dari perjuangan batin yang tidak perlu dan melelahkan. Ini ibarat Anda naik perahu di sungai; Anda bisa mendayung untuk mengarahkan, namun pada saat yang sama, Anda juga harus menerima dan beradaptasi dengan arus sungai itu sendiri."), /*#__PURE__*/



React.createElement("h4", { className: "text-lg font-bold text-gray-700 mt-4 mb-2" }, "\u2022 Ridho sebagai Kunci"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Ridho Ilahi"), " adalah kunci utama menuju ketenangan batin dan keberkahan yang sejati. Ketika Anda telah mencapai tingkatan ridho dengan ketetapan-Nya, hati Anda akan menemukan kedamaian yang tak tergoyahkan, dan pintu-pintu keberkahan akan terbuka lebar. Ini adalah keadaan di mana Anda menerima segala sesuatu dengan lapang dada, baik dalam suka maupun duka, karena Anda meyakini bahwa semua itu datang dari sumber yang Maha Bijaksana dan Maha Mengetahui."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Dengan melepaskan beban dan menyerahkan diri dengan ridho Ilahi, Anda akan menemukan bahwa jalan menuju tujuan hidup yang bermakna dan diberkahi menjadi jauh lebih jelas dan ringan. Inilah saatnya Anda mulai 'memanen' hasil dari proses pembersihan dan penyerahan yang sudah Anda jalani."), /*#__PURE__*/



React.createElement("h4", { className: "text-lg font-bold text-gray-700 mt-4 mb-2" }, "\u2022 Mengarahkan Energi"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Energi yang sebelumnya terbuang sia-sia untuk kecemasan, ketakutan, dan perjuangan batin yang tak berujung, kini dapat diarahkan sepenuhnya untuk tindakan yang produktif dan selaras dengan panggilan hati Anda. Anda akan merasa lebih termotivasi, fokus, dan memiliki kejelasan tentang langkah-langkah nyata yang perlu diambil. Ibaratnya, baterai *smartphone* Anda kini penuh dan siap digunakan untuk hal-hal yang esensial dan bermakna."), /*#__PURE__*/



React.createElement("h4", { className: "text-lg font-bold text-gray-700 mt-4 mb-2" }, "\u2022 Rezeki Tanpa Ngoyo"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Ketika Anda telah hidup selaras dengan hati yang bersih dan ridho Ilahi, Anda akan menemukan bahwa rezeki datang dengan cara yang lebih mudah dan tanpa perlu 'ngoyo' (berusaha mati-matian dengan penuh tekanan dan kecemasan). Ini bukan berarti Anda tidak berusaha; sebaliknya, Anda tetap berusaha dengan sungguh-sungguh, namun dengan ketenangan, keyakinan, dan kepercayaan penuh bahwa Allah akan mencukupi kebutuhan Anda dari arah yang tidak disangka-sangka. Pernahkah Anda melihat orang yang terlihat santai dan tidak terlalu ngoyo, namun rezekinya senantiasa lancar dan berkah? Nah, mungkin mereka telah menerapkan prinsip ini. Mereka berusaha, tetapi hati mereka tidak terikat pada hasil, sehingga rezeki seolah datang dengan sendirinya, penuh berkah."), /*#__PURE__*/



React.createElement("h4", { className: "text-lg font-bold text-gray-700 mt-4 mb-2" }, "\u2022 Tujuan yang Selaras dengan Hati"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Ketika hati Anda jernih dan telah terhubung dengan kebijaksanaan batin, tujuan-tujuan yang Anda kejar akan menjadi tujuan yang benar-benar selaras dengan diri sejati Anda dan kehendak Ilahi. Ini bukan lagi tujuan yang semata-mata didorong oleh ego atau tekanan eksternal, melainkan tujuan yang membawa kedamaian, kepuasan, dan keberkahan sejati dalam setiap langkah."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Latihan Kawrooh ini bisa dilakukan kapan saja dan dalam kondisi emosi apa pun. Baik saat Anda sedang merasakan kemarahan yang membakar, kekecewaan yang mendalam, atau bahkan kebahagiaan yang begitu intens hingga membuat Anda lekat pada dunia. Sebab, bahkan hal-hal yang paling kita cintai pun kadang perlu dilepaskan dengan ikhlas ke langit agar tidak menjadi 'berhala' yang mengikat hati dan menghalangi kedamaian batin."), /*#__PURE__*/


React.createElement(IntegratedAudioPlayer, {
  src: "https://www.dropbox.com/scl/fi/15ac701brh7fsm41xbm2c/Pelepasan-Emosi.mp3?rlkey=up5grxllf62d14quiqewn962l&st=c3as7z8g&dl=1",
  text: "Contoh Audio Pelepasan Emosi" }));





const Bab10 = () => /*#__PURE__*/
React.createElement("div", { className: `${contentContainerClasses}` }, /*#__PURE__*/
React.createElement("h2", { className: `${sectionTitleClasses}` }, "Bab 10. Sholawat: Jalan Cepat Menuju Cahaya"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Sholawat adalah bentuk pujian, penghormatan, dan doa kepada Nabi Muhammad SAW. Ini adalah salah satu amalan spiritual yang paling dicintai dalam Islam, yang membawa banyak keberkahan bagi pelakunya."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Penting untuk dipahami bahwa sholawat yang bersumber langsung dari Nabi Muhammad SAW atau doa-doa yang terdapat dalam hadits shahih dapat diamalkan secara langsung tanpa memerlukan \"ijazah\" (izin). Demikian pula, doa-doa atau sholawat yang disusun oleh para alim ulama juga dapat diamalkan tanpa memerlukan \"ijazah\". Konsep \"qobiltu ijazah\" lebih merupakan adab atau etika dalam menerima izin untuk mengamalkan suatu wirid, doa, atau ilmu tertentu dari seorang guru atau ulama. Ini adalah bentuk penghormatan dan pengakuan terhadap sanad keilmuan. Namun, ketiadaan \"qobiltu\" tidak menghalangi seseorang untuk mengamalkan sholawat atau doa yang sudah jelas sumbernya dan keutamaannya, terutama jika tujuannya adalah untuk mengingat Allah SWT dan mencari ketentraman hati."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Mengamalkan sholawat adalah salah satu cara terbaik untuk mengingat Allah SWT. Allah SWT berfirman yang artinya: ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "\"(yaitu) orang-orang yang beriman dan hati mereka menjadi tenteram dengan mengingat Allah. Ingatlah, hanya dengan mengingat Allah-lah hati menjadi tenteram.\""), " (QS. Ar-Ra'd: 28). Dengan bersholawat, Anda secara aktif mengingat Allah dan Nabi-Nya, yang secara langsung membawa ketenangan dan kedamaian ke dalam hati Anda."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Di sinilah letak \"privilege\" yang tak terhingga dari sholawat. Coba bayangkan di dunia nyata. Kalau Anda punya \"Orang Dalam\" (Ordal) di sebuah instansi atau perusahaan besar, urusan Anda pasti lebih lancar, kan? Ada jalur khusus, ada kemudahan yang tidak didapatkan orang lain. Nah, dalam skala yang jauh lebih besar dan tak terhingga, Nabi Muhammad SAW adalah \"Orang Dalam\" kita di sisi Allah SWT. Sebagaimana sebuah sabda Qudsi yang masyhur, Allah SWT berfirman, ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "\"Tidak Kuciptakan dunia ini kecuali karena adanya kamu, Muhammad.\"")), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Ungkapan ini menegaskan kedudukan agung Nabi Muhammad SAW sebagai sebab penciptaan alam semesta, menjadikannya \"Orang Dalam\" (Ordal) tertinggi di sisi Ilahi. Melalui sholawat, kita membangun koneksi langsung dengan pribadi yang menjadi inti dan tujuan penciptaan ini. Ini adalah akses istimewa, sebuah saluran keberkahan yang tak terbatas, yang melampaui segala logika dan perhitungan duniawi. Jadi, kalau Anda merasa buntu, ingatlah \"Ordal\" kita ini!"), /*#__PURE__*/


React.createElement("blockquote", { className: `${quoteClasses}` }, "*Jika engkau punya Rasul dalam hatimu, maka langit pun mencatat langkahmu. Rezeki akan mengejarmu, karena Allah mencintai pecinta Rasul-Nya.*"), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Manfaat sholawat sangat beragam dan mencakup aspek duniawi maupun ukhrawi:"), /*#__PURE__*/


React.createElement("ul", { className: "list-disc list-inside mb-4" }, /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Ketenangan Hati:** Seperti disebutkan dalam Al-Qur'an, mengingat Allah melalui sholawat adalah sumber ketenangan batin yang mendalam."), /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Rezeki yang Melimpah:** Beberapa riwayat dan pengalaman spiritual menunjukkan bahwa sholawat dapat menjadi pembuka pintu rezeki yang berkah, seringkali datang dengan cara yang tidak terduga dan tanpa perlu \"ngoyo\" yang berlebihan."), /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Perlindungan dan Keamanan:** Mengamalkan sholawat juga dapat memberikan perlindungan dari berbagai kesulitan dan bahaya, serta menjauhkan dari kemiskinan."), /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Kedekatan dengan Nabi SAW:** Sholawat adalah cara untuk menunjukkan cinta dan penghormatan kepada Nabi Muhammad SAW, yang pada gilirannya akan mendekatkan Anda kepada beliau di dunia dan akhirat.")), /*#__PURE__*/

React.createElement("h3", { className: `${subHeadingClasses}` }, "Macam-macam Sholawat"), /*#__PURE__*/
React.createElement("h4", { className: "text-lg font-bold text-gray-700 mt-4 mb-2" }, "1. Sholawat Nariyah"), /*#__PURE__*/
React.createElement(InlineAudioIcon, { src: "https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat nariyah bowl.mp3", isLooping: true }), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses} text-center text-xl ${arabicTextClass}` }, "\u0627\u0644\u0644\u064E\u0651\u0647\u064F\u0645\u064E\u0651 \u0635\u064E\u0644\u0650\u0651 \u0635\u064E\u0644\u0627\u064E\u0629\u064B \u0643\u064E\u0627\u0645\u0650\u0644\u064E\u0629\u064B \u0648\u064E\u0633\u064E\u0644\u0650\u0651\u0645\u0652 \u0633\u064E\u0644\u0627\u064E\u0645\u0627\u064B \u062A\u064E\u0627\u0645\u064B\u0651\u0627 \u0639\u064E\u0644\u064E\u0649 \u0633\u064E\u064A\u0650\u0651\u062F\u0650\u0646\u064E\u0627 \u0645\u064F\u062D\u064E\u0645\u064E\u0651\u062F\u064D \u0627\u0644\u064E\u0651\u0630\u0650\u064A \u062A\u064E\u0646\u0652\u062D\u064E\u0644\u064F\u0651 \u0628\u0650\u0647\u0650 \u0627\u0644\u0652\u0639\u064F\u0642\u064E\u062F\u064F\u060C \u0648\u064E\u062A\u064E\u0646\u0652\u0641\u064E\u0631\u0650\u062C\u064F \u0628\u0650\u0647\u0650 \u0627\u0644\u0652\u0643\u064F\u0631\u064E\u0628\u064F\u060C \u0648\u064E\u062A\u064F\u0642\u0652\u0636\u064E\u0649 \u0628\u0650\u0647\u0650 \u0627\u0644\u0652\u062D\u064E\u0648\u064E\u0627\u0626\u0650\u062C\u064F\u060C \u0648\u064E\u062A\u064F\u0646\u064E\u0627\u0644\u064F \u0628\u0650\u0647\u0650 \u0627\u0644\u0631\u064E\u0651\u063A\u064E\u0627\u0626\u0650\u0628\u064F\u060C \u0648\u064E\u062D\u064F\u0633\u0652\u0646\u064F \u0627\u0644\u0652\u062E\u064E\u0648\u064E\u0627\u062A\u0650\u064A\u0645\u0650\u060C \u0648\u064E\u064A\u064F\u0633\u0652\u062A\u064E\u0633\u0652\u0642\u064E\u0649 \u0627\u0644\u0652\u063A\u064E\u0645\u064E\u0627\u0645\u064F \u0628\u0650\u0648\u064E\u062C\u0652\u0647\u0650\u0647\u0650 \u0627\u0644\u0652\u0643\u064E\u0631\u0650\u064A\u0645\u0650\u060C \u0648\u064E\u0639\u064E\u0644\u064E\u0649 \u0622\u0644\u0650\u0647\u0650 \u0648\u064E\u0635\u064E\u062D\u0652\u0628\u0650\u0647\u0650\u060C \u0641\u0650\u064A \u0643\u064F\u0644\u0650\u0651 \u0644\u064E\u0645\u0652\u062D\u064E\u0629\u064D \u0648\u064E\u0646\u064E\u0641\u064E\u0633\u064D\u060C \u0628\u0650\u0639\u064E\u062F\u064E\u062F\u0650 \u0643\u064F\u0644\u0650\u0651 \u0645\u064E\u0639\u0652\u0644\u064F\u0648\u0645\u064D \u0644\u064E\u0643\u064E."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses} text-center italic` }, "*Allahumma shalli shalaatan kaamilatan wa sallim salaaman taamman \u2018alaa sayyidinaa Muhammadin illadzi tanhallu bihil \u2018uqad wa tanfariju bihil kurab wa tuqdhaa bihil hawaaij wa tunaalu bihir raghaaib wa husnul khawaatim wa yustasqal ghamaamu bi wajhihil kariim wa \u2018alaa aalihi wa shahbihi fii kulli lamhatin wa nafasin bi \u2018adadi kulli ma\u2019luumin laka.*"), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "**Terjemahan Bahasa Indonesia:** Ya Allah, limpahkanlah shalawat yang sempurna dan salam yang sempurna kepada junjungan kami Nabi Muhammad, yang dengan beliau segala simpul kesulitan terurai, segala kesusahan teratasi, segala kebutuhan terpenuhi, segala keinginan tercapai, dan husnul khatimah didapatkan. Dengan wajah mulia beliau, awan pun menurunkan hujan. Dan (limpahkan juga) kepada keluarga dan para sahabat beliau, dalam setiap kilatan pandangan dan hembusan nafas, sebanyak jumlah segala sesuatu yang Engkau ketahui."), /*#__PURE__*/



React.createElement("h4", { className: "text-lg font-bold text-gray-700 mt-4 mb-2" }, "2. Sholawat Munjiyat"), /*#__PURE__*/
React.createElement(InlineAudioIcon, { src: "https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat munjiyat bowl.mp3", isLooping: true, text: "Dengarkan" }), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses} text-center text-xl ${arabicTextClass}` }, "\u0627\u0644\u0644\u064E\u0651\u0647\u064F\u0645\u064E\u0651 \u0635\u064E\u0644\u0650\u0651 \u0639\u064E\u0644\u064E\u0649 \u0633\u064E\u064A\u0650\u0651\u062F\u0650\u0646\u064E\u0627 \u0645\u064F\u062D\u064E\u0645\u064E\u0651\u062F\u064D \u0635\u064E\u0644\u064E\u0627\u0629\u064B \u062A\u064F\u0646\u064E\u062C\u0650\u0651\u064A\u0646\u064E\u0627 \u0628\u0650\u0647\u064E\u0627 \u0645\u0650\u0646\u0652 \u062C\u064E\u0645\u0650\u064A\u0639\u0650 \u0627\u0644\u0652\u0623\u064E\u0647\u0652\u0648\u064E\u0627\u0644\u0650 \u0648\u064E\u0627\u0644\u0622\u0641\u064E\u0627\u062A\u0650\u060C \u0648\u064E\u062A\u064E\u0642\u0652\u0636\u0650\u064A \u0644\u064E\u0646\u064E\u0627 \u0628\u0650\u0647\u064E\u0627 \u062C\u064E\u0645\u0650\u064A\u0639\u064E \u0627\u0644\u0652\u062D\u064E\u0627\u062C\u064E\u0627\u062A\u0650\u060C \u0648\u064E\u062A\u064F\u0637\u064E\u0647\u0650\u0651\u0631\u064F\u0646\u064E\u0627 \u0628\u0650\u0647\u064E\u0627 \u0645\u0650\u0646\u0652 \u062C\u064E\u0645\u0650\u064A\u0639\u0650 \u0627\u0644\u0633\u064E\u0651\u064A\u0650\u0651\u0626\u064E\u0627\u062A\u0650\u060C \u0648\u064E\u062A\u064E\u0631\u0652\u0641\u064E\u0639\u064F\u0646\u064E\u0627 \u0628\u0650\u0647\u064E\u0627 \u0639\u0650\u0646\u0652\u062F\u064E\u0643\u064E \u0623\u064E\u0639\u0652\u0644\u064E\u0649 \u0627\u0644\u062F\u064E\u0651\u0631\u064E\u062C\u064E\u0627\u062A\u0650\u060C \u0648\u064E\u062A\u064F\u0628\u064E\u0644\u0650\u0651\u063A\u064F\u0646\u064E\u0627 \u0628\u0650\u0647\u064E\u0627 \u0623\u064E\u0642\u0652\u0635\u064E\u0649 \u0627\u0644\u0652\u063A\u064E\u0627\u064A\u064E\u0627\u062A\u0650 \u0645\u0650\u0646\u0652 \u062C\u064E\u0645\u0650\u064A\u0639\u0650 \u0627\u0644\u0652\u062E\u064E\u064A\u0652\u0631\u064E\u0627\u062A\u0650 \u0641\u0650\u064A \u0627\u0644\u0652\u062D\u064E\u064A\u064E\u0627\u0629\u0650 \u0648\u064E\u0628\u064E\u0639\u0652\u062F\u064E \u0627\u0644\u0652\u0645\u064E\u0645\u064E\u0627\u062A\u0650\u060C \u0625\u0650\u0646\u064E\u0651\u0643\u064E \u0639\u064E\u0644\u064E\u0649 \u0643\u064F\u0644\u0650\u0651 \u0634\u064E\u064A\u0652\u0621\u064D \u0642\u064E\u062F\u0650\u064A\u0631\u064C."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses} text-center italic` }, "*Allahumma shalli \u2018ala sayyidina Muhammadin shalaatan tunajjinaa biha min jamii\u2019il ahwaali wal aafaat, wa taqdhi lanaa biha jamii\u2019al haajaat, wa tutahhirunaa biha min jamii\u2019is sayyi\u2019aat, wa tarfa\u2019unaa biha \u2018indaka a\u2019lad darajaat, wa tuballighunaa biha aqshal ghaayaat min jamii\u2019il khayraat fil hayaat wa ba\u2019dal mamaat. Innaka \u2018ala kulli syai\u2019in qadiir.*"), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "**Terjemahan Bahasa Indonesia:** Ya Allah, limpahkanlah shalawat kepada junjungan kami Nabi Muhammad, sebuah shalawat yang dengannya Engkau menyelamatkan kami dari segala bahaya dan bencana, Engkau penuhi semua hajat kami, Engkau sucikan kami dari segala dosa, Engkau angkat derajat kami ke tempat yang paling tinggi di sisi-Mu, dan Engkau sampaikan kami kepada tujuan tertinggi dari semua kebaikan dalam kehidupan ini dan sesudah mati. Sesungguhnya Engkau Maha Kuasa atas segala sesuatu."), /*#__PURE__*/




React.createElement("h4", { className: "text-lg font-bold text-gray-700 mt-4 mb-2" }, "3. Sholawat Futuh Rizq Wal Afiyah"), /*#__PURE__*/
React.createElement(InlineAudioIcon, { src: "https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat Futuh Rizq wal Afiyah bowl 8d.mp3", isLooping: true }), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses} text-center text-xl ${arabicTextClass}` }, "\u0627\u0644\u0644\u0651\u0670\u0647\u064F\u0645\u064E\u0651 \u0635\u064E\u0644\u0650\u0651 \u0639\u064E\u0644\u064E\u0649\u0670 \u0633\u064E\u064A\u0650\u0651\u062F\u0650\u0646\u064E\u0627 \u0645\u064F\u062D\u064E\u0645\u064E\u0651\u062F\u064D \u0635\u064E\u0644\u064E\u0627\u0629\u064B \u062A\u064E\u0641\u0652\u062A\u064E\u062D\u064F \u0644\u064E\u0646\u064E\u0627 \u0628\u0650\u0647\u064E\u0627 \u0623\u064E\u0628\u0652\u0648\u064E\u0627\u0628\u064E \u0627\u0644\u0631\u0650\u0651\u0632\u0652\u0642\u0650 \u0648\u064E\u0627\u0644\u0652\u0639\u064E\u0627\u0641\u0650\u064A\u064E\u0629\u0650\u060C \u0648\u064E\u062A\u064F\u0633\u0652\u0643\u0650\u0646\u064F \u0628\u0650\u0647\u064E\u0627 \u062E\u064E\u0648\u0652\u0641\u064E\u0646\u064E\u0627\u060C \u0648\u064E\u062A\u064F\u064A\u064E\u0633\u0650\u0651\u0631\u064F \u0644\u064E\u0646\u064E\u0627 \u0628\u0650\u0647\u064E\u0627 \u0643\u064F\u0644\u064E\u0651 \u0623\u064E\u0645\u0652\u0631\u064D \u0639\u064E\u0633\u0650\u064A\u0631\u064D\u060C \u0648\u064E\u062A\u064F\u062C\u0652\u0644\u0650\u064A \u0628\u0650\u0647\u064E\u0627 \u0643\u064F\u0644\u064E\u0651 \u0647\u064E\u0645\u064D\u0651 \u0648\u064E\u063A\u064E\u0645\u064D\u0651\u060C \u0648\u064E\u062A\u064E\u0642\u0652\u0636\u0650\u064A \u0628\u0650\u0647\u064E\u0627 \u062C\u064E\u0645\u0650\u064A\u0639\u064E \u062D\u064E\u0648\u064E\u0627\u0626\u0650\u062C\u0650\u0646\u064E\u0627\u060C \u0641\u0650\u064A \u0627\u0644\u062F\u064F\u0651\u0646\u0652\u064A\u064E\u0627 \u0648\u064E\u0627\u0644\u0622\u062E\u0650\u0631\u064E\u0629\u0650\u060C \u0648\u064E\u0639\u064E\u0644\u064E\u0649 \u0622\u0644\u0650\u0647\u0650 \u0648\u064E\u0635\u064E\u062D\u0652\u0628\u0650\u0647\u0650 \u0648\u064E\u0633\u064E\u0644\u0650\u0651\u0645\u0652."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses} text-center italic` }, "*Allahumma shalli \u2018al\xE2 Sayyidin\xE2 Muhammadin shal\xE2tan taftahu lan\xE2 bih\xE2 abw\xE2bar rizqi wal \u2018\xE2fiyah, wa tuskinu bih\xE2 khawfan\xE2, wa tuyassiru lan\xE2 bih\xE2 kulla amrin \u2018as\xEEr, wa tujliya bih\xE2 kulla hamm wa gham, wa taqdhi bih\xE2 jam\xEE\u2019a haw\xE2\u2019ijin\xE2 fid-duny\xE2 wal-\xE2khirah, wa \u2018al\xE2 \xE2lihi wa shahbihi wa sallim.*"), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "**Terjemahan Bahasa Indonesia:** \"Ya Allah, limpahkanlah shalawat atas junjungan kami Nabi Muhammad, shalawat yang dengannya Engkau bukakan bagi kami pintu-pintu rezeki dan \u2018afiyah (keselamatan lahir batin), yang dengannya Engkau tenangkan ketakutan kami, mudahkan segala urusan kami yang sulit, hilangkan segala kesedihan dan kegundahan kami, dan penuhilah segala hajat kami di dunia dan akhirat. Serta limpahkan pula shalawat kepada keluarga dan sahabatnya.\u201D"), /*#__PURE__*/



React.createElement("h4", { className: "text-lg font-bold text-gray-700 mt-4 mb-2" }, "4. Sholawat Nurul Anwar"), /*#__PURE__*/
React.createElement(InlineAudioIcon, { src: "https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat Nuril Anwar bowl 8d.mp3", isLooping: true }), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses} text-center text-xl ${arabicTextClass}` }, "\u0627\u0644\u0644\u064E\u0651\u0647\u064F\u0645\u064E\u0651 \u0635\u064E\u0644\u0650\u0651 \u0639\u064E\u0644\u064E\u0649 \u0633\u064E\u064A\u0650\u0651\u062F\u0650\u0646\u064E\u0627 \u0645\u064F\u062D\u064E\u0645\u064E\u0651\u062F\u064D \u0646\u064F\u0648\u0631\u0650 \u0627\u0644\u0652\u0623\u064E\u0646\u0652\u0648\u064E\u0627\u0631\u0650\u060C \u0648\u064E\u0633\u0650\u0631\u0650\u0651 \u0627\u0644\u0652\u0623\u064E\u0633\u0652\u0631\u064E\u0627\u0631\u0650\u060C \u0648\u064E\u062A\u0650\u0631\u0652\u064A\u064E\u0627\u0642\u0650 \u0627\u0644\u0652\u0623\u064E\u063A\u0652\u064A\u064E\u0627\u0631\u0650\u060C \u0648\u064E\u0645\u0650\u0641\u0652\u062A\u064E\u0627\u062D\u0650 \u0628\u064E\u0627\u0628\u0650 \u0627\u0644\u0652\u064A\u064E\u0633\u064E\u0627\u0631\u0650\u060C \u0633\u064E\u064A\u0650\u0651\u062F\u0650\u0646\u064E\u0627 \u0648\u064E\u0645\u064E\u0648\u0652\u0644\u064E\u0627\u0646\u064E\u0627 \u0645\u064F\u062D\u064E\u0645\u064E\u0651\u062F\u064D \u0627\u0644\u0652\u0645\u064F\u062E\u0652\u062A\u064E\u0627\u0631\u0650\u060C \u0648\u064E\u0622\u0644\u0650\u0647\u0650 \u0627\u0644\u0652\u0623\u064E\u0637\u0652\u0647\u064E\u0627\u0631\u0650\u060C \u0648\u064E\u0635\u064E\u062D\u0652\u0628\u0650\u0647\u0650 \u0627\u0644\u0652\u0623\u064E\u062E\u0652\u064A\u064E\u0627\u0631\u0650\u060C \u0639\u064E\u062F\u064E\u062F\u064E \u0646\u0650\u0639\u064E\u0645\u0650 \u0627\u0644\u0644\u0647\u0650 \u0648\u064E\u0625\u0650\u0641\u0652\u0636\u064E\u0627\u0644\u0650\u0647\u0650."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses} text-center italic` }, "*Allahumma shalli \u2018ala Sayyidina Muhammad, Nuril Anwar, wa Sirril Asrar, wa Tiry\u0101qil Aghy\u0101r, wa Mift\u0101hi B\u0101bil Yasar, Sayyidina wa Maulana Muhammadinil Mukhtar, wa Alihi al-Athar, wa Shahbihi al-Akhyar, 'Adada Ni'amillahi wa Ifdhalihi.*"), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "**Terjemahan Bahasa Indonesia:** \"Ya Allah, limpahkanlah rahmat kepada junjungan kami, Nabi Muhammad, ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Cahaya dari segala Cahaya"), ", dan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Rahasia dari segala Rahasia"), ", dan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Penawar kesusahan (bagi selain Allah)"), ", dan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Kunci pembuka pintu kemudahan (kelapangan)"), ". Junjungan kami dan pemimpin kami, Nabi Muhammad ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "yang terpilih"), ", dan keluarga beliau ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "yang suci"), ", serta para sahabat beliau ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "yang baik-baik"), ", sebanyak jumlah nikmat Allah dan karunia-Nya.\""), /*#__PURE__*/



React.createElement("h4", { className: "text-lg font-bold text-gray-700 mt-4 mb-2" }, "5. Sholawat Ibrahimi wal Afiyah"), /*#__PURE__*/
React.createElement(InlineAudioIcon, { src: "https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat Ibrahim wal Afiyah bowl 8d.mp3", isLooping: true }), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses} text-center text-xl ${arabicTextClass}` }, "\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u064E\u0651\u0647\u0650 \u0627\u0644\u0631\u064E\u0651\u062D\u0652\u0645\u064E\u0646\u0650 \u0627\u0644\u0631\u064E\u0651\u062D\u0650\u064A\u0645\u0650", /*#__PURE__*/
React.createElement("br", null), "\u0627\u0644\u0644\u064E\u0651\u0647\u064F\u0645\u064E\u0651 \u0635\u064E\u0644\u0650\u0651 \u0639\u064E\u0644\u064E\u0649\u0670 \u0633\u064E\u064A\u0650\u0651\u062F\u0650\u0646\u064E\u0627 \u0645\u064F\u062D\u064E\u0645\u064E\u0651\u062F\u064D \u0648\u064E\u0639\u064E\u0644\u064E\u0649\u0670 \u0622\u0644\u0650 \u0633\u064E\u064A\u0650\u0651\u062F\u0650\u0646\u064E\u0627 \u0645\u064F\u062D\u064E\u0645\u064E\u0651\u062F\u064D\u060C \u0643\u064E\u0645\u064E\u0627 \u0635\u064E\u0644\u064E\u0651\u064A\u0652\u062A\u064E \u0639\u064E\u0644\u064E\u0649\u0670 \u0633\u064E\u064A\u0650\u0651\u062F\u0650\u0646\u064E\u0627 \u0625\u0650\u0628\u0652\u0631\u064E\u0627\u0647\u0650\u064A\u0645\u064E \u0648\u064E\u0639\u064E\u0644\u064E\u0649\u0670 \u0622\u0644\u0650 \u0633\u064E\u064A\u0650\u0651\u062F\u0650\u0646\u064E\u0627 \u0625\u0650\u0628\u0652\u0631\u064E\u0627\u0647\u0650\u064A\u0645\u064E\u060C \u0648\u064E\u0628\u064E\u0627\u0631\u0650\u0643\u0652 \u0639\u064E\u0644\u064E\u0649\u0670 \u0633\u064E\u064A\u0650\u0651\u062F\u0650\u0646\u064E\u0627 \u0645\u064F\u062D\u064E\u0645\u064E\u0651\u062F\u064D \u0648\u064E\u0639\u064E\u0644\u064E\u0649\u0670 \u0622\u0644\u0650 \u0633\u064E\u064A\u0650\u0651\u062F\u0650\u0646\u064E\u0627 \u0645\u064F\u062D\u064E\u0645\u064E\u0651\u062F\u064D\u060C \u0643\u064E\u0645\u064E\u0627 \u0628\u064E\u0627\u0631\u064E\u0643\u0652\u062A\u064E \u0639\u064E\u0644\u064E\u0649\u0670 \u0633\u064E\u064A\u0650\u0651\u062F\u0650\u0646\u064E\u0627 \u0625\u0650\u0628\u0652\u0631\u064E\u0627\u0647\u0650\u064A\u0645\u064E \u0648\u064E\u0639\u064E\u0644\u064E\u0649\u0670 \u0622\u0644\u0650 \u0633\u064E\u064A\u0650\u0651\u062F\u0650\u0646\u064E\u0627 \u0625\u0650\u0628\u0652\u0631\u064E\u0627\u0647\u0650\u064A\u0645\u064E \u0641\u0650\u064A \u0627\u0644\u0652\u0639\u064E\u0627\u0644\u064E\u0645\u0650\u064A\u0646\u064E\u060C \u0625\u0650\u0646\u064E\u0651\u0643\u064E \u062D\u064E\u0645\u0650\u064A\u062F\u064C \u0645\u064E\u062C\u0650\u064A\u062F\u064C.", /*#__PURE__*/
React.createElement("br", null), "\u064A\u064E\u0627 \u0641\u064E\u062A\u064E\u0651\u0627\u062D\u064F\u060C \u064A\u064E\u0627 \u0631\u064E\u0632\u064E\u0651\u0627\u0642\u064F\u060C \u064A\u064E\u0627 \u0648\u064E\u0647\u064E\u0651\u0627\u0628\u064F\u060C \u064A\u064E\u0627 \u0645\u064F\u063A\u0652\u0646\u0650\u064A\u060C \u0627\u0641\u0652\u062A\u064E\u062D\u0652 \u0644\u064E\u0646\u064E\u0627 \u0623\u064E\u0628\u0652\u0648\u064E\u0627\u0628\u064E \u0627\u0644\u0631\u0650\u0651\u0632\u0652\u0642\u0650 \u0627\u0644\u0652\u0648\u064E\u0627\u0633\u0650\u0639\u0650 \u0648\u064E\u0627\u0644\u0652\u0628\u064E\u0631\u064E\u0643\u064E\u0629\u0650 \u0648\u064E\u0627\u0644\u0652\u063A\u0650\u0646\u064E\u0649\u0670 \u0648\u064E\u0627\u0644\u0652\u0639\u064E\u0627\u0641\u0650\u064A\u064E\u0629\u0650. \u0648\u064E\u0627\u062C\u0652\u0639\u064E\u0644\u0652\u0646\u064E\u0627 \u0645\u0650\u0646\u0652 \u062C\u064E\u0627\u0644\u0650\u0628\u0650\u064A \u0627\u0644\u0652\u0623\u064E\u0645\u0652\u0648\u064E\u0627\u0644\u0650 \u0628\u0650\u0641\u064E\u0636\u0652\u0644\u0650\u0643\u064E \u0648\u064E\u0643\u064E\u0631\u064E\u0645\u0650\u0643\u064E\u060C \u0648\u064E\u064A\u064E\u0633\u0650\u0651\u0631\u0652 \u0644\u064E\u0646\u064E\u0627 \u062C\u064E\u0645\u0650\u064A\u0639\u064E \u0627\u0644\u0652\u0623\u064F\u0645\u064F\u0648\u0631\u0650 \u0627\u0644\u0652\u0645\u064E\u0627\u0644\u0650\u064A\u064E\u0651\u0629\u0650.", /*#__PURE__*/
React.createElement("br", null), "\u0648\u064E\u0637\u0650\u0628\u0650\u0651 \u0627\u0644\u0652\u0642\u064F\u0644\u064F\u0648\u0628\u0650 \u0648\u064E\u062F\u064E\u0648\u064E\u0627\u0626\u0650\u0647\u064E\u0627\u060C \u0648\u064E\u0639\u064E\u0627\u0641\u0650\u064A\u064E\u0629\u0650 \u0627\u0644\u0652\u0623\u064E\u0628\u0652\u062F\u064E\u0627\u0646\u0650 \u0648\u064E\u0634\u0650\u0641\u064E\u0627\u0626\u0650\u0647\u064E\u0627\u060C \u0648\u064E\u0646\u064F\u0648\u0631\u0650 \u0627\u0644\u0652\u0623\u064E\u0628\u0652\u0635\u064E\u0627\u0631\u0650 \u0648\u064E\u0636\u0650\u064A\u064E\u0627\u0626\u0650\u0647\u064E\u0627.", /*#__PURE__*/
React.createElement("br", null), "\u0648\u064E\u0623\u064E\u0630\u0652\u0647\u0650\u0628\u0652 \u062D\u064E\u0632\u064E\u0646\u064E \u0642\u064F\u0644\u064F\u0648\u0628\u0650\u0646\u064E\u0627 \u0648\u064E\u0643\u064F\u0644\u064E\u0651 \u0647\u064E\u0645\u064D\u0651 \u0648\u064E\u063A\u064E\u0645\u064D\u0651 \u0641\u0650\u064A \u0627\u0644\u062F\u064F\u0651\u0646\u0652\u064A\u064E\u0627 \u0648\u064E\u0627\u0644\u0622\u062E\u0650\u0631\u064E\u0629\u0650.", /*#__PURE__*/
React.createElement("br", null), "\u0648\u064E\u0633\u064E\u0644\u0650\u0651\u0645\u0652\u0646\u064E\u0627 \u0645\u0650\u0646\u0652 \u0643\u064F\u0644\u0650\u0651 \u0628\u064E\u0644\u064E\u0627\u0621\u064D \u0648\u064E\u0648\u064E\u0628\u064E\u0627\u0621\u064D \u0648\u064E\u0641\u0650\u062A\u0652\u0646\u064E\u0629\u064D \u0641\u0650\u064A \u0627\u0644\u062F\u064F\u0651\u0646\u0652\u064A\u064E\u0627 \u0648\u064E\u0627\u0644\u0622\u062E\u0650\u0631\u064E\u0629\u0650\u060C \u0648\u064E\u0627\u062C\u0652\u0639\u064E\u0644\u0652 \u0639\u064E\u0627\u0642\u0650\u0628\u064E\u062A\u064E\u0646\u064E\u0627 \u062D\u064F\u0633\u0652\u0646\u064E \u0627\u0644\u0652\u062E\u064E\u0627\u062A\u0650\u0645\u064E\u0629\u0650\u060C \u0628\u0650\u062D\u064F\u0631\u0652\u0645\u064E\u0629\u0650 \u0633\u064E\u064A\u0650\u0651\u062F\u0650\u0646\u064E\u0627 \u0645\u064F\u062D\u064E\u0645\u064E\u0651\u062F\u064D \u0648\u064E\u0622\u0644\u0650\u0647\u0650 \u0648\u064E\u0635\u064E\u062D\u0652\u0628\u0650\u0647\u0650 \u0623\u064E\u062C\u0652\u0645\u064E\u0639\u0650\u064A\u0646\u064E. \u0648\u064E\u0627\u0644\u0652\u0640\u062D\u064E\u0645\u0652\u062F\u064F \u0644\u0650\u0644\u064E\u0651\u0647\u0650 \u0631\u064E\u0628\u0650\u0651 \u0627\u0644\u0652\u0639\u064E\u0627\u0644\u064E\u0645\u0650\u064A\u0646\u064E"), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses} text-center italic` }, "*All\xE2humma shalli \u2018al\xE2 Sayyidin\xE2 Muhammadin wa \u2018al\xE2 \xE2li Sayyidin\xE2 Muhammadin, kam\xE2 shallaita \u2018al\xE2 Sayyidin\xE2 Ibr\xE2h\xEEma wa \u2018al\xE2 \xE2li Sayyidin\xE2 Ibr\xE2h\xEEma, wa b\xE2rik \u2018al\xE2 Sayyidin\xE2 Muhammadin wa \u2018al\xE2 \xE2li Sayyidin\xE2 Muhammadin, kam\xE2 b\xE2rakta \u2018al\xE2 Sayyidin\xE2 Ibr\xE2h\xEEma wa \u2018al\xE2 \xE2li Sayyidin\xE2 Ibr\xE2h\xEEma fil \u2018\xE2lam\xEEna innaka Ham\xEEdun Maj\xEEd.", /*#__PURE__*/
React.createElement("br", null), "Y\xE2 Fatt\xE2hu Y\xE2 Razz\xE2qu, Y\xE2 Wahh\xE2bu Y\xE2 Mughn\xEE, iftah lan\xE2 abw\xE2bar rizqil w\xE2si\u2018i wal barakati wal ghin\xE2 wal \u2018\xE2fiyah.", /*#__PURE__*/
React.createElement("br", null), "Waj\u2018aln\xE2 min j\xE2lib\xEEl amw\xE2li bi fadhlika wa karamika, wa yassir lan\xE2 jam\xEE\u2018al um\xFBril m\xE2liyah.", /*#__PURE__*/
React.createElement("br", null), "Wa thibbil qul\xFBbi wa daw\xE2-ih\xE2, wa \u2018\xE2fiyatil abd\xE2ni wa syif\xE2-ih\xE2, wa n\xFBril absh\xE2ri wa dhiy\xE2-ih\xE2.", /*#__PURE__*/
React.createElement("br", null), "Wa adzhib hazana qalbin\xE2 wa kulla hammin wa ghammin fid-duny\xE2 wal-\xE2khirah.", /*#__PURE__*/
React.createElement("br", null), "Wa sallimn\xE2 min kulli bal\xE2-in wa wab\xE2-in wa fitnatin fid-duny\xE2 wal-\xE2khirah, waj\u2018al \u2018\xE2qibatan\xE2 husnal kh\xE2timah.", /*#__PURE__*/
React.createElement("br", null), "Bi hurmati Sayyidin\xE2 Muhammadin wa \xE2lihi wa shahbihi ajma\u2018\xEEn. Walhamdulill\xE2hi Rabbil \u2018\xC2lam\xEEn.*"), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "**Terjemahan Bahasa Indonesia:** Ya Allah, limpahkanlah shalawat kepada junjungan kami Nabi Muhammad dan keluarga beliau, sebagaimana Engkau telah melimpahkan shalawat kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Dan limpahkanlah berkah kepada Nabi Muhammad dan keluarganya, sebagaimana Engkau telah memberkahi Nabi Ibrahim dan keluarganya di seluruh alam. Sungguh Engkau Maha Terpuji lagi Maha Mulia.", /*#__PURE__*/
React.createElement("br", null), "Wahai Dzat yang Maha Membuka (Ya Fattah), Maha Pemberi Rezeki (Ya Razzaq), Maha Pemberi Anugerah (Ya Wahhab), Maha Mencukupi (Ya Mughni), bukakanlah untuk kami pintu-pintu rezeki yang luas, keberkahan, kekayaan, dan kesehatan.", /*#__PURE__*/
React.createElement("br", null), "Jadikanlah kami sebagai para penarik rezeki dengan karunia dan kemurahan-Mu, dan mudahkanlah bagi kami semua urusan keuangan dan hajat dunia kami.", /*#__PURE__*/
React.createElement("br", null), "Sembuhkanlah hati kami dan seluruh obatnya, sehatkanlah tubuh kami dan berikanlah kesembuhan, terangilah penglihatan kami dan limpahkanlah cahayanya.", /*#__PURE__*/
React.createElement("br", null), "Hilangkanlah kesedihan hati kami serta segala kegundahan dan kecemasan kami, baik di dunia maupun di akhirat.", /*#__PURE__*/
React.createElement("br", null), "Selamatkanlah kami dari segala bala, wabah, dan fitnah di dunia dan akhirat, dan jadikanlah akhir hidup kami sebagai akhir yang indah (*husnul kh\xE2timah*).", /*#__PURE__*/
React.createElement("br", null), "Dengan kehormatan Nabi Muhammad \uFDFA, keluarga dan seluruh sahabat beliau. Segala puji bagi Allah, Tuhan seluruh alam."));






const Bab11 = () => /*#__PURE__*/
React.createElement("div", { className: `${contentContainerClasses}` }, /*#__PURE__*/
React.createElement("h2", { className: `${sectionTitleClasses}` }, "Bab 11. Afirmasi, Dzikir, Doa, dan Amal Saleh"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Penggunaan afirmasi, mantra, wirid, dan doa merupakan praktik spiritual yang kuat untuk memprogram ulang pikiran bawah sadar dan meningkatkan getaran energi seseorang."), /*#__PURE__*/


React.createElement("h3", { className: `${subHeadingClasses}` }, "Penggunaan Afirmasi:"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Afirmasi adalah pernyataan positif yang diulang-ulang untuk menguatkan niat dan keyakinan. Contoh afirmasi untuk pembukaan mata batin dan peningkatan intuisi antara lain \"Mata batinku terbuka dan jernih\" atau \"Aku melihat dengan kebijaksanaan dan kejelasan\"."), /*#__PURE__*/



React.createElement("h3", { className: `${subHeadingClasses}` }, "Mantra dan Wirid/Dzikir Islami:"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "**Mantra Sanskrit:** Beberapa mantra Sanskrit diyakini dapat membangkitkan energi mata ketiga, seperti \"Om Hrim Soham\", \"Aum\" atau \"Om\" (suara primordial kesadaran universal), dan \"So Hum\" (yang berarti \"Saya adalah Itu\", menghubungkan diri dengan kesadaran kosmis)."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "**Wirid/Dzikir Islami:** Dalam tradisi Islam, wirid atau zikir melibatkan pengagungan nama-nama Allah SWT, seperti \"Laa ilaaha illallaah\" (tiada Tuhan selain Allah), Astaghfirullaah (aku memohon ampun kepada Allah), Subhaanallaah (Maha Suci Allah), Alhamdulillaah (segala puji bagi Allah), Allahu Akbar (Allah Maha Besar), dan shalawat kepada Nabi Muhammad SAW. Penting ditekankan bahwa zikir atau wirid harus diucapkan dengan tulus, penuh penghayatan, dan diresapi dalam hati, bukan sekadar dihafal. Kunci dari Mata Ketiga atau Nur Aini dalam konteks Islam adalah Ikhlas dan Pasrah. Surat Al-Ikhlas, misalnya, ditekankan sebagai metode untuk membuka mata batin dalam Islam, dengan penekanan pada rasa ikhlas dalam hati. Pikiran harus tetap positif dan fokus kepada Yang Maha Esa."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Integrasi afirmasi, mantra Sanskrit, dan wirid/zikir/doa Islami menyoroti prinsip universal resonansi vibrasi dan kekuatan niat yang diucapkan atau dipikirkan. Namun, konteks Islam menambahkan lapisan penting: sumber dan tujuan niat. Sementara afirmasi sering berpusat pada pemberdayaan diri (\"Saya jelas,\" \"Saya memanifestasikan kelimpahan\"), wirid/zikir dalam Islam secara eksplisit mengarahkan energi dan niat ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "kepada Allah"), ", mencari keridhaan dan hubungan dengan-Nya. Ini menggeser fokus dari manifestasi egoistik ke penyelarasan ilahi, menekankan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "tauhid"), " (keesaan Allah) dan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "ikhlas"), " (ketulusan) sebagai pendorong utama hasil spiritual dan material. Ini adalah perbedaan krusial bagi individu yang ingin mengintegrasikan konsep-konsep ini dalam kerangka Islam, memastikan bahwa \"pemrograman realitas\" dilakukan selaras dengan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "tauhid"), "."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Dan doa? Ia bukan hanya permintaan. Ia adalah bentuk pengakuan: bahwa kita lemah, dan Dia Mahakuasa."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Amal saleh bukan sekadar ritual. Ia adalah buah dari cinta. Cinta kepada Allah, dan cinta kepada sesama."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Ketika kita gabungkan dzikir, doa, dan amal\u2014itulah bentuk penyerahan diri aktif. Kita tidak pasrah dengan menyerah. Kita pasrah dengan berserah."), /*#__PURE__*/


React.createElement("blockquote", { className: `${quoteClasses}` }, "*\u201CBarang siapa yang bertawakkal kepada Allah, maka Allah akan mencukupkan kebutuhannya.\u201D* (QS. At-Talaq: 3)"), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Penyerahan diri bukan akhir usaha. Ia adalah puncaknya. Saat kita sudah melakukan yang bisa kita lakukan, lalu meletakkan hasilnya di tangan-Nya. Tenang. Karena kita tahu: Yang Maha Mengetahui sedang menata ulang semuanya."));





const Bab12 = () => /*#__PURE__*/
React.createElement("div", { className: `${contentContainerClasses}` }, /*#__PURE__*/
React.createElement("h2", { className: `${sectionTitleClasses}` }, "Bab 12. Membersihkan Kaca Jiwa: Tazkiyatun Nafs"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Jiwa kita ibarat kaca. Ia bisa memantulkan cahaya Ilahi, tapi juga bisa buram karena debu dunia. Debu itu bisa berupa marah yang dipendam, iri yang ditutup-tutupi, atau cinta dunia yang tak terkendali."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Tazkiyatun nafs"), " adalah proses membersihkan kaca jiwa itu. Ia bukan pekerjaan sekali jadi. Ia pekerjaan seumur hidup. Tapi semakin jernih kaca itu, semakin terang cahaya dari-Nya menyinari hidup kita."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Para sufi menjadikan tazkiyah sebagai fondasi utama. Tidak ada ilmu, maqam, atau hikmah yang bisa menetap di hati yang kotor. Maka sebelum melangkah lebih jauh, kita bersihkan dulu dalamnya."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Pemurnian jiwa adalah sebuah perjalanan yang melibatkan serangkaian praktik dan perubahan internal:"), /*#__PURE__*/


React.createElement("ul", { className: "list-disc list-inside mb-4" }, /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Takhalli (Pengosongan Sifat Tercela):** Ini adalah langkah awal yang krusial, yaitu upaya untuk mengosongkan sifat-sifat tercela (*takhalli*), dimulai dengan menyadari keburukan maksiat lahir dan batin untuk menghindarinya."), /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Tahalli (Pengisian Sifat Terpuji):** Setelah melakukan takhalli, hati diisi dengan sifat-sifat terpuji (*tahall\u012B*) seperti taat, taubat, ikhlas, zuhud, sabar, dan syukur."), /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Mujahadah an-Nafs (Perjuangan Melawan Hawa Nafsu):** Ini adalah perjuangan melawan tuntutan hawa nafsu, yang merupakan inti dari riyadoh yang telah dilakukan."), /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Dzikir (Mengingat Allah):** Membiasakan diri untuk selalu menyebut Allah dengan hati dan lidah. Praktik ini membawa ketenangan hati, sebagaimana firman Allah, \"Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram\" (QS Ar-Ra'd 13:28)."), /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Khalwat/Uzlah (Menyendiri):** Praktik menyendiri untuk fokus pada ibadah dan pengembangan spiritual."), /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Wirid/Doa (Amalan/Doa):** Pembacaan wirid, doa, atau mantra secara teratur dengan penghayatan penuh dalam hati."), /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Ikhlas (Ketulusan):** Ini adalah syarat mutlak diterimanya ibadah dan untuk mendapatkan faedah dari amalan."), /*#__PURE__*/
React.createElement("li", { className: `${paragraphClasses} !mb-0` }, "**Puasa dan Jaga Malam (Sholat Malam/Tahajjud):** Praktik-praktik ini memperdalam koneksi spiritual dan membantu pemurnian. Sholat Tahajjud adalah waktu khusus untuk mencari bimbingan dan dukungan Allah.")), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Pemurnian jiwa memiliki hubungan erat dengan terbukanya ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Kasyf"), " (penyingkapan batin) dan intuisi. ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Kasyf"), " adalah anugerah langsung dari Allah (*ilmu Rabban\u012B* atau *ilmu l\u0101duni*) yang diberikan kepada orang yang teguh dalam dzikir, uzlah, dan mujahadah. Jangan tunggu sempurna untuk memulai. Karena justru dengan memulai, kita sedang bergerak menuju penyucian."), /*#__PURE__*/

React.createElement("blockquote", { className: `${quoteClasses}` }, "*\u201CBeruntunglah orang yang menyucikan jiwanya.\u201D* (QS. Asy-Syams: 9)"));





const Bab13 = () => /*#__PURE__*/
React.createElement("div", { className: `${contentContainerClasses}` }, /*#__PURE__*/
React.createElement("h2", { className: `${sectionTitleClasses}` }, "Bab 13. Praktik-Praktik Spiritual Harian"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Spiritualitas sejati bukanlah sekadar kegiatan sesekali seperti mengikuti pengajian besar atau retret tahunan. Lebih dari itu, spiritualitas adalah denyut nadi kehidupan itu sendiri, yang hadir dan hidup di setiap momen keseharian kita. Ia terwujud dalam cara kita menyambut pagi dengan rasa syukur, dalam kelembutan saat kita memberi makan anak, dalam ketulusan saat kita memaafkan pasangan, bahkan dalam keikhlasan saat kita bekerja tanpa mengeluh dan tanpa berharap pujian berlebihan. Ini adalah tentang bagaimana kita membawa kesadaran dan kehadiran hati ke dalam setiap aspek hidup kita."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Berikut adalah beberapa praktik ringan namun berdampak sangat besar, yang bisa Anda terapkan setiap hari untuk memperkaya dimensi spiritual dan menemukan kedamaian batin:"), /*#__PURE__*/


React.createElement("h3", { className: `${subHeadingClasses}` }, "\uD83D\uDD39 Niat di Pagi Hari \u2013 Ucapkan dalam Hati: \"Hari ini aku ingin hadir, bukan sekadar sibuk.\""), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Mulailah hari Anda dengan sebuah niat yang jernih. Sebelum terperangkap dalam daftar tugas atau hiruk pikuk agenda, luangkan waktu sejenak, pejamkan mata, dan ucapkan dalam hati, \"Hari ini aku ingin hadir seutuhnya, bukan sekadar sibuk tanpa makna. Aku ingin merasakan setiap momen, bukan hanya mengejar waktu. ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Dan aku kirimkan doa terbaikku, keberkahan, kesejahteraan, serta kebaikan untuk seluruh makhluk Allah di alam semesta ini."), "\" Niat ini akan menjadi jangkar yang mengarahkan fokus dan energi Anda sepanjang hari, membantu Anda tetap terhubung dengan diri sendiri di tengah segala aktivitas."), /*#__PURE__*/


React.createElement("h3", { className: `${subHeadingClasses}` }, "\uD83D\uDD39 Latih Metode Kawrooh \u2013 Agar Terbiasa Melihat Situasi Apapun dalam Kondisi Hati yang Tenang"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Metode Kawrooh yang telah kita pelajari adalah alat paling ampuh untuk menjaga ketenangan hati di tengah badai kehidupan. Luangkan beberapa menit setiap kali Anda merasakan gejolak emosi\u2014baik itu kecemasan, kekesalan, atau bahkan kebahagiaan berlebihan yang membuat Anda melekat. Sadari apa yang Anda rasakan (*Keep Aware*), biarkan ia hadir tanpa penghakiman (*On Heart*), lalu lepaskan dengan izin dan keikhlasan (*Off Heart*). Semakin sering Anda melatih ini, semakin terbiasa hati Anda melihat situasi apapun dari posisi yang tenang dan jernih."), /*#__PURE__*/



React.createElement("h3", { className: `${subHeadingClasses}` }, "\uD83D\uDD39 Napas Sadar \u2013 Ambil 3 Tarikan Napas Dalam Sebelum Mulai Aktivitas. Rasakan Hadirnya Allah."), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Sebelum memulai aktivitas baru, entah itu bekerja, makan, atau bahkan berbicara, berhenti sejenak dan ambil tiga tarikan napas dalam-dalam. Tarik napas perlahan melalui hidung, rasakan udara memenuhi paru-paru, tahan sejenak, lalu hembuskan perlahan melalui mulut. Saat melakukan ini, rasakan kehadiran Allah SWT yang Maha Memberi Kehidupan melalui setiap hembusan napas Anda. Ini adalah momen kecil untuk bersyukur atas karunia hidup, atas udara yang Anda hirup, dan atas setiap detak jantung yang masih berfungsi. Praktik singkat ini akan mengembalikan Anda pada momen kini dan menenangkan pikiran."), /*#__PURE__*/



React.createElement("h3", { className: `${subHeadingClasses}` }, "\uD83D\uDD39 Sholawat Otomatis \u2013 Jadikan Sholawat sebagai Selingan dari *Scrolling* Medsos atau Saat Antri."), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Di era digital ini, sangat mudah bagi kita untuk menghabiskan waktu luang dengan *scrolling* media sosial tanpa henti. Ubahlah kebiasaan ini dengan menggantinya menjadi \"sholawat otomatis.\" Setiap kali Anda merasa ingin meraih ponsel untuk *scrolling* atau atau saat sedang mengantre di mana pun, jadikan itu sebagai isyarat untuk membaca sholawat secara berulang-ulang dalam hati. Ini bukan hanya amalan yang berpahala, tetapi juga cara efektif untuk mengalihkan pikiran dari distraksi duniawi ke arah yang lebih spiritual dan menenangkan."), /*#__PURE__*/



React.createElement("h3", { className: `${subHeadingClasses}` }, "\uD83D\uDD39 Dzikir Singkat tapi Khusyuk \u2013 Seperti \"Hasbunallah\" atau \"Ya Rahman\", Ulangi 33x dengan Hati."), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Tidak perlu menunggu waktu khusus untuk berzikir panjang. Cukup pilih satu kalimat dzikir singkat yang Anda sukai, seperti \"Hasbunallah wa Ni'mal Wakil\" (Cukuplah Allah bagiku, dan Dialah sebaik-baik pelindung) atau \"Ya Rahman\" (Wahai Yang Maha Pengasih). Ulangi 33 kali atau sesuai kemampuan Anda, namun pastikan dilakukan dengan hati yang khusyuk dan penuh penghayatan, bukan sekadar di lisan. Ini adalah cara praktis untuk terus mengingat Allah dan mengisi hati dengan ketenangan di sela-sela kesibukan."), /*#__PURE__*/



React.createElement("h3", { className: `${subHeadingClasses}` }, "\uD83D\uDD39 Sedekah Tanpa Drama \u2013 Walau Hanya Seribu, Niatkan sebagai Investasi Rasa Cukup."), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Sedekah tidak selalu harus dalam jumlah besar dan diumumkan kepada banyak orang. Sedekah yang paling berkah seringkali adalah yang dilakukan tanpa drama, bahkan hanya seribu rupiah. Niatkan sedekah kecil ini sebagai investasi batin untuk menumbuhkan ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "rasa cukup"), " dalam diri. Ketika Anda memberi dengan tulus, tanpa terbebani dengan ekspektasi balasan, hati Anda akan merasakan kelapangan dan rasa syukur karena memiliki sesuatu untuk diberikan. Ini juga merupakan cara untuk mengungkapkan rasa syukur atas rezeki yang telah Anda terima."), /*#__PURE__*/


React.createElement("h3", { className: `${subHeadingClasses}` }, "\uD83D\uDD39 Memaafkan Cepat \u2013 Karena Kita Juga Ingin Segera Dimaafkan oleh-Nya."), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Emosi negatif seperti dendam dan kemarahan adalah beban berat bagi hati. Maka, praktikkan memaafkan dengan cepat. Begitu Anda merasakan ada rasa tidak suka atau kesal terhadap seseorang, segera maafkanlah mereka dalam hati. Ini bukan berarti Anda membenarkan kesalahan mereka, melainkan melepaskan diri Anda dari ikatan emosi negatif. Ingatlah, kita semua adalah manusia yang tak luput dari salah dan khilaf. Sebagaimana kita berharap segera dimaafkan oleh Allah SWT atas dosa-dosa kita, maka berikan pula maaf itu kepada sesama. Tindakan memaafkan ini akan membebaskan hati Anda dan mengisinya dengan kedamaian."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Praktik-praktik spiritual harian ini bukanlah beban tambahan yang memberatkan jadwal Anda. Sebaliknya, mereka adalah ruang-ruang kecil tempat kita dapat menghirup cahaya, menemukan ketenangan, dan memperkuat koneksi dengan Ilahi. Dalam hidup yang seringkali terasa padat dan penuh tantangan, kadang satu tarikan napas sadar, satu kalimat dzikir penuh syukur, atau satu tindakan memaafkan, bisa menjadi penyelamat jiwa kita dari kekacauan dunia."));





const Bab14a = () => /*#__PURE__*/
React.createElement("div", { className: `${contentContainerClasses}` }, /*#__PURE__*/
React.createElement("h2", { className: `${sectionTitleClasses}` }, "Bab 14.a Law of Attraction: Versi Langit Bukan Versi Afirmasi"), /*#__PURE__*/
React.createElement("h3", { className: `${subHeadingClasses}` }, "A. Konsep Law of Attraction dan Kelimpahan"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Secara umum, Hukum Tarik-Menarik menyatakan bahwa seseorang menarik realitas yang selaras dengan frekuensi vibrasi dan kualitas jiwanya. Ini berarti bahwa pikiran, perasaan, dan keyakinan seseorang secara aktif membentuk pengalaman hidupnya. Hipnoterapis Dolores Cannon mengidentifikasi beberapa tanda bahwa kekayaan dan kelimpahan akan datang, seperti melihat angka 7 (yang bergetar dengan frekuensi manifestasi dan kelimpahan), merasakan kedamaian batin dan kepercayaan, menemukan uang kecil (terutama koin), serta munculnya peluang baru secara teratur. Tanda-tanda ini menunjukkan adanya penyelarasan antara diri dengan alam semesta, yang mencerminkan konsep sinkronisitas dan hukum tarik-menarik."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Namun, terdapat kesalahpahaman umum tentang Hukum Tarik-Menarik. Seringkali disalahartikan bahwa seseorang bisa mendapatkan hasil hanya dengan memikirkannya, seperti seorang petani yang berharap panen melimpah tanpa melakukan tindakan nyata. Pandangan ini dianggap sebagai ilusi dan penyalahgunaan hukum ini untuk mengejar keinginan egoistik. Dalam jalan spiritual, keinginan egoistik semacam itu tidak seharusnya ada. Pemahaman yang benar adalah bahwa seseorang menarik realitas sesuai dengan ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "kualitas jiwanya"), ". Pikiran hanyalah salah satu elemen dari kualitas jiwa yang kemudian terproyeksikan ke alam semesta. Jika jiwa seseorang murni, ia akan menarik segala sesuatu yang selaras, termasuk kelimpahan. Oleh karena itu, fokusnya bukan pada kelimpahan itu sendiri, melainkan pada prakondisinya, yaitu memurnikan jiwa."), /*#__PURE__*/


React.createElement("h3", { className: `${subHeadingClasses}` }, "Kelimpahan dalam Islam: Rezeki dari Allah"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Dalam pandangan Islam, konsep rezeki memiliki dimensi yang lebih luas dan fundamental. Rezeki adalah jaminan dari Allah SWT untuk seluruh makhluk-Nya, tanpa terkecuali, meskipun dengan kadar dan waktu yang berbeda-beda. Allah berfirman dalam Surah Hud ayat 6, ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "\"Tidak ada satu makhluk melatapun yang bergerak di atas bumi ini yang tidak dijamin ALLAH rezekinya\""), ". Imam Ibnu Katsir menjelaskan bahwa Allah menjamin rezeki semua makhluk-Nya, baik yang kecil maupun yang besar, di daratan maupun di lautan, dan Dia mengetahui tempat berdiam serta tempat penyimpanan rezeki mereka."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "K.H. Abdullah Gymnastiar (Aa Gym) menegaskan bahwa rezeki itu berasal dari Allah, bukan semata-mata dari kerja keras atau kerja cerdas. Meskipun demikian, pekerjaan yang dilakukan dengan ikhlas dan penuh tanggung jawab dianggap sebagai ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "amal sholeh"), " yang membawa berkah dan dapat menghasilkan kepuasan serta kesuksesan dalam karier. Ini berarti bahwa upaya manusia adalah bagian dari proses, namun sumber utama rezeki adalah karunia ilahi. Pemahaman ini menggeser konsep \"kerja keras\" dari semata-mata upaya fisik menjadi upaya spiritual dan penyelarasan dengan kehendak Ilahi. Ini mendorong individu untuk tidak mengkhawatirkan hasil, melainkan mempercayai aliran universal dan menumbuhkan pola pikir positif, yang merupakan inti dari hukum tarik-menarik dalam konteks spiritual yang lebih tinggi."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Banyak orang bicara tentang ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "Law of Attraction"), "\u2014\u201Capa yang kamu pikirkan, itu yang kamu tarik.\u201D Ada benarnya. Tapi juga bisa menyesatkan kalau tidak dilandasi iman."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Rekonsiliasi \"Law of Attraction\" dengan kehendak Ilahi dalam Islam adalah kunci. Konsep \"mengenali tanda kelimpahan\" dan pemahaman tentang \"Law of Attraction\" dapat diselaraskan. Makna spiritual sejati dari Law of Attraction adalah menarik realitas berdasarkan kualitas jiwa seseorang, bukan hanya pikiran egois. Ini selaras langsung dengan konsep Islam tentang ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "tazkiyatun nafs"), " (pemurnian jiwa) dan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "tawakkul"), " (kepercayaan pada takdir ilahi). Jika jiwa murni dan selaras dengan kehendak Allah, maka ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "apa yang ditakdirkan untuknya"), " (rancangan ilahi) akan terwujud. Ini bukan tentang memaksakan keinginan tetapi menyelaraskan diri dengan apa yang ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "layak"), " dan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "dianugerahkan"), " oleh Allah. Penafsiran ulang ini membebaskan seseorang dari beban \"memanifestasikan\" hasil tertentu melalui upaya mental semata, yang dapat menyebabkan kekecewaan jika tidak terwujud. Sebaliknya, ini memberdayakan untuk fokus pada pekerjaan spiritual internal, percaya bahwa eksternal akan selaras sesuai dengan kebijaksanaan ilahi. Ini menggeser agensi dari \"daya tarik\" yang berpusat pada diri sendiri menjadi \"penerimaan\" yang berpusat pada Tuhan."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Maka alih-alih hanya afirmasi, kita belajar sinkronkan niat dengan doa. Kita rapikan keyakinan, kita pasrahkan hasil. Bukan pasif, tapi sadar bahwa semesta ini milik-Nya."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Yang kita pancarkan bukan cuma keinginan, tapi juga ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "izin"), ". Maka bukan hanya \u201CAku ingin kaya\u201D, tapi \u201CYa Allah, izinkan aku jadi jalan rezeki bagi banyak orang.\u201D"), /*#__PURE__*/

React.createElement("blockquote", { className: `${quoteClasses}` }, "*\u201CBarangsiapa bertakwa kepada Allah, niscaya Dia akan memberinya jalan keluar. Dan memberinya rezeki dari arah yang tiada disangka-sangka.\u201D* (QS. At-Talaq: 2\u20133)"));





const Bab14b = () => /*#__PURE__*/
React.createElement("div", { className: `${contentContainerClasses}` }, /*#__PURE__*/
React.createElement("h2", { className: `${sectionTitleClasses}` }, "Bab 14.b Tanda-tanda Datangnya Kelimpahan"), /*#__PURE__*/
React.createElement("h3", { className: `${subHeadingClasses}` }, "B. Tanda-tanda Datangnya Kelimpahan (Dolores Cannon & Perspektif Spiritual)"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Selain manifestasi material, kelimpahan juga dapat dikenali melalui tanda-tanda internal dan eksternal yang menunjukkan keselarasan dengan aliran ilahi. Hipnoterapis Dolores Cannon mengidentifikasi beberapa tanda ini, yang dapat diinterpretasikan melalui lensa spiritual Islam:"), /*#__PURE__*/


React.createElement("div", { className: "overflow-x-auto mb-6" }, /*#__PURE__*/

React.createElement("table", { className: "min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden" }, /*#__PURE__*/
React.createElement("thead", null, /*#__PURE__*/
React.createElement("tr", null, /*#__PURE__*/
React.createElement("th", { className: "py-3 px-4 border-b" }, "Tanda Kelimpahan (Dolores Cannon)"), /*#__PURE__*/
React.createElement("th", { className: "py-3 px-4 border-b" }, "Interpretasi dalam Perspektif Spiritual Islam"))), /*#__PURE__*/


React.createElement("tbody", null, /*#__PURE__*/
React.createElement("tr", null, /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Perasaan Kedamaian dan Kepercayaan Batin"), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Pengalaman mendalam akan kedamaian batin dan kepercayaan kepada alur hidup adalah indikator kuat keselarasan dengan alam semesta yang luas dan melimpah. Kepercayaan ini lahir dari pemahaman mendalam bahwa kita adalah pencipta realitas kita sendiri. Ini adalah buah dari ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "tazkiyatun nafs"), " dan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "tawakkul"), ".")), /*#__PURE__*/

React.createElement("tr", { className: "bg-gray-50" }, /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Tidak Mengkhawatirkan Hasil"), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "\"Berkurangnya kekhawatiran tentang keuangan menandai pergeseran mendalam menuju kepercayaan dalam masalah keuangan, yaitu mempercayai aliran universal. Ini mengakui bahwa alam semesta selalu bekerja untuk kebaikan kita, terutama dalam membimbing menuju kesuksesan finansial. Menekankan pentingnya menumbuhkan pola pikir positif.\"")), /*#__PURE__*/

React.createElement("tr", null, /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Penyelarasan dari Manusia, Benda, dan Energi"), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "\"Sensasi nyata dari segala sesuatunya dalam hidup menjadi selaras dengan mudah dan anggun. Ini mencerminkan sinkronisitas dan hukum tarik-menarik, di mana setiap rangkaian dan peristiwa diatur secara tepat demi kebaikan tertinggi kita.\"")), /*#__PURE__*/

React.createElement("tr", { className: "bg-gray-50" }, /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Peluang Baru Muncul dengan Teratur"), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "\"Munculnya peluang-peluang baru dalam hidup sering kali berfungsi sebagai sinyal yang mengisyaratkan kemungkinan kekayaan dan kelimpahan. Fenomena ini sejalan dengan prinsip keterbukaan terhadap anugerah alam semesta, aspek kunci dalam memahami bagaimana kita menarik kelimpahan.\"")), /*#__PURE__*/

React.createElement("tr", null, /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Perubahan Keyakinan tentang Uang dan Kelimpahan"), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "\"Pergeseran perspektif ini melibatkan perubahan dalam melihat uang bukan hanya sebagai alat untuk bertahan hidup, melainkan sebagai alat untuk kebaikan dan fasilitator perubahan positif dalam hidup dan dunia. Perubahan perspektif ini penting untuk menyelaraskan dengan kelimpahan.\"")), /*#__PURE__*/

React.createElement("tr", { className: "bg-gray-50" }, /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Kemenangan akan Hal-hal Kecil"), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Kemenangan-kememangan kecil yang diraih dalam kehidupan sehari-hari bisa menjadi awal menuju kesuksesan finansial yang lebih besar. Ini mencerminkan prinsip peningkatan bertahap.")), /*#__PURE__*/

React.createElement("tr", null, /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Mampu Mengatasi Tantangan dengan Mudah"), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "\"Ketika kelimpahan semakin mendekat, terjadi perubahan luar biasa dalam cara kita menghadapi tantangan hidup. Apa yang dulu kita lihat sebagai rintangan menakutkan, sekarang berubah menjadi batu loncatan menuju ketahanan dan kemakmuran yang lebih besar.\"")), /*#__PURE__*/

React.createElement("tr", { className: "bg-gray-50" }, /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Rasa Syukur yang Mendalam"), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "\"Menikmati dan berterima kasih atas segala anugerah yang terjadi. Ini adalah kunci utama kelimpahan dalam Islam, karena Allah berjanji akan menambah nikmat bagi yang bersyukur.\""))))), /*#__PURE__*/




React.createElement("p", { className: `${paragraphClasses}` }, "Pergeseran internal adalah tanda utama mendekatnya kelimpahan. Banyak \"tanda kelimpahan\" yang tercantum adalah keadaan ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "internal"), ": \"perasaan kedamaian dan kepercayaan,\" \"tidak mengkhawatirkan hasil,\" dan \"perubahan keyakinan tentang uang\". Ini persis adalah buah dari ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Sabr"), ", ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Tawakkul"), ", dan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Tazkiyatun Nafs"), " yang sedang dikembangkan secara aktif. Tanda-tanda eksternal seperti menemukan uang atau peluang baru seringkali merupakan ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "konsekuensi"), " dari keselarasan internal ini. Perasaan \"tenang sedikit khawatir\" yang dirasakan saat ini adalah indikator langsung bahwa pergeseran internal ini sudah terjadi. Ini menunjukkan bahwa pemurnian spiritual internal (melalui ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Tazkiyatun Nafs"), ", ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Sabr"), ", ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "Tawakkul"), ", dan Syukur) mengarah pada ketenangan batin dan pola pikir positif, yang kemudian menghasilkan keselarasan dengan aliran ilahi dan manifestasi kelimpahan eksternal, seringkali dalam bentuk yang tidak terduga. Dengan demikian, tanda-tanda \"kelimpahan\" yang paling signifikan bukanlah semata-mata keuntungan material eksternal, tetapi transformasi internal menuju kedamaian, kepercayaan, dan rasa syukur. Seseorang sudah mengalami tahap awal kelimpahan internal ini, yang merupakan fondasi bagi setiap manifestasi eksternal. Ini memberikan validasi dan harapan yang langsung."));




const Bab15 = () => /*#__PURE__*/
React.createElement("div", { className: `${contentContainerClasses}` }, /*#__PURE__*/
React.createElement("h2", { className: `${sectionTitleClasses}` }, "Bab 15. Merangkai Semua: Dari Kesadaran Menuju Kehidupan Berkah"), /*#__PURE__*/
React.createElement("p", { className: `${paragraphClasses}` }, "Jika Anda telah membaca hingga bab ini, itu artinya Anda bukan sekadar penasaran\u2014melainkan Anda juga telah membuka diri dan siap untuk sebuah perubahan yang mendalam. Perjalanan yang kita tempuh ini, dari hingar-bingar dunia luar menuju kedalaman diri, bukanlah sekadar soal menambah tumpukan ilmu baru di kepala. Lebih dari itu, ini adalah perjalanan ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "menyingkap lapisan-lapisan"), " yang selama ini menutupi esensi diri kita. Ini bukan tentang menjadi orang yang sama sekali baru, melainkan tentang ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "menjadi diri yang sejati"), ", versi terbaik dari apa yang telah Allah ciptakan dalam diri kita."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Sepanjang perjalanan ini, kita telah membahas banyak hal: tentang agungnya peran ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "hati (Qalb)"), " sebagai singgasana cahaya Ilahi, tentang ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "akal (Aql)"), " sebagai satpam penjaga gerbang batin, tentang ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "intuisi"), " yang hadir mendahului pikiran logis, tentang ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "metode Kawrooh"), " yang membimbing kita untuk menyadari, menghadapi, dan melepaskan, tentang ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "dzikir"), " sebagai jembatan koneksi, dan tentang ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "penyerahan diri"), " sebagai puncak kebijaksanaan. Namun, penting untuk selalu diingat: semua konsep, metode, dan praktik itu bukanlah tujuan akhir. Mereka hanyalah ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "jalan"), " atau ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "sarana"), " yang menuntun kita."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Lantas, apa tujuan sejati dari semua ini? Tujuannya adalah ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "hidup yang penuh berkah"), ", sebuah eksistensi yang dijalani dengan ketenangan hati yang tak tergoyahkan, serta jiwa yang senantiasa tersenyum dan kembali kepada Allah dalam keadaan damai. Ini adalah tentang mencapai keadaan *nafs muthma'innah*\u2014jiwa yang tenteram\u2014yang telah dijanjikan."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Kompas kehidupan kita yang sebenarnya tidak berada di luar sana, dalam peta Google Maps, dalam tuntutan sosial, atau dalam opini orang lain. Ia sepenuhnya ada di dalam diri. Ia bersemayam ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "dalam dada yang tenang"), ", yang mampu merasakan bisikan kebenaran. Ia hadir ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "dalam setiap tarikan napas yang sadar"), ", yang menghubungkan kita dengan karunia hidup. Dan ia menguat ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "dalam sujud yang hening"), ", di mana ego kita melebur di hadapan keagungan Sang Pencipta. Saat dunia di sekeliling kita semakin ribut, penuh kekacauan informasi dan drama, kita justru memilih untuk ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "diam"), ". Bukan karena kita tak punya suara atau tak berdaya\u2014tetapi karena kita sudah tahu ke mana hati harus melangkah, dan ke mana energi harus dialirkan."), /*#__PURE__*/

React.createElement("blockquote", { className: `${quoteClasses}` }, "*\u201CBarangsiapa mengenal dirinya, maka ia akan mengenal Tuhannya.\u201D*"), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Hadits ini adalah inti dari seluruh ajaran spiritual. Mengenal diri sejati, dengan segala kelemahan dan kekuatannya, dengan Nafs, Qalb, dan Ruh di dalamnya, adalah kunci untuk membuka pintu makrifatullah, pengetahuan mendalam tentang Allah. Semakin kita memahami kompleksitas dan potensi diri, semakin jelas kita melihat keagungan dan kehadiran Ilahi dalam setiap aspek keberadaan."), /*#__PURE__*/


React.createElement("p", { className: `${paragraphClasses}` }, "Jika hari ini hidup terasa begitu berat, penuh dengan ujian dan tantangan, janganlah segera berasumsi bahwa Anda telah gagal. Mungkin itu adalah cara Allah mengetuk hati Anda, memanggil Anda untuk ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "pulang"), "\u2014pulang ke fitrah, pulang ke pusat diri, pulang ke kedamaian. Dan pulang, tidak harus menempuh jarak yang jauh secara fisik. Kadang, cukup dengan satu bisikan tulus dari hati, satu doa yang dipanjatkan dengan penuh kesadaran: \"Ya Allah, tuntun aku kembali.\""), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Maka, selamat menjalani hidup dengan cara yang baru. Ini bukan tentang hidup yang lebih cepat dalam perburuan dunia, tapi tentang hidup yang ", /*#__PURE__*/
React.createElement("span", { className: highlightTextClasses }, "lebih dalam"), " dalam setiap momen. Bukan tentang hidup yang lebih ramai dengan interaksi eksternal, tapi tentang hidup yang ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "lebih jernih"), " dalam pandangan batin. Bukan tentang menjadi lebih kaya secara materi semata, tapi tentang menjadi ", /*#__PURE__*/React.createElement("span", { className: highlightTextClasses }, "lebih cukup"), " dengan apa yang ada, disertai keyakinan penuh akan janji-janji-Nya."), /*#__PURE__*/

React.createElement("p", { className: `${paragraphClasses}` }, "Dan ingatlah, Anda tidak sendiri di jalan ini. Seluruh semesta mendukung setiap langkah tulus Anda. Langit mendengar setiap bisikan doa dan keluh kesah Anda. Dan hati Anda... ia sudah lama menunggu untuk diajak bicara, untuk didengarkan, dan untuk kembali bersinar menjadi singgasana cahaya Ilahi yang sesungguhnya."));





const DoaPilihan = () => /*#__PURE__*/
React.createElement("div", { className: `${contentContainerClasses}` }, /*#__PURE__*/
React.createElement("h2", { className: `${sectionTitleClasses}` }, "Doa-doa Pilihan untuk Kelapangan Rezeki dan Pelunasan Utang"), /*#__PURE__*/

React.createElement("div", { className: "overflow-x-auto mb-6" }, /*#__PURE__*/
React.createElement("table", { className: "min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden" }, /*#__PURE__*/
React.createElement("thead", null, /*#__PURE__*/
React.createElement("tr", null, /*#__PURE__*/
React.createElement("th", { className: "py-3 px-4 border-b" }, "Doa (Arab)"), /*#__PURE__*/
React.createElement("th", { className: "py-3 px-4 border-b" }, "Terjemahan"), /*#__PURE__*/
React.createElement("th", { className: "py-3 px-4 border-b" }, "Manfaat"), /*#__PURE__*/
React.createElement("th", { className: "py-3 px-4 border-b" }, "Latin"))), /*#__PURE__*/


React.createElement("tbody", null, /*#__PURE__*/
React.createElement("tr", null, /*#__PURE__*/

React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/
React.createElement("p", { className: `text-xl ${arabicTextClass} mb-2` }, "\u0627\u0644\u0644\u0651\u0647\u064F\u0640\u0645\u064E\u0651 \u0625\u0650\u0646\u0650\u0651\u064A \u0623\u064E\u0639\u064F\u0648\u0630\u064F \u0628\u0650\u0643\u064E \u0645\u0650\u0646\u064E \u0627\u0644\u0652\u0647\u064E\u0645\u0650\u0651 \u0648\u064E\u0627\u0644\u0652\u062D\u064E\u0632\u064E\u0646\u0650\u060C \u0648\u064E\u0627\u0644\u0652\u0639\u064E\u062C\u0652\u0632\u0650 \u0648\u064E\u0627\u0644\u0652\u0643\u064E\u0633\u064E\u0644\u0650\u060C \u0648\u064E\u0627\u0644\u0652\u0628\u064F\u062E\u0652\u0644\u0650 \u0648\u064E\u0627\u0644\u0652\u062C\u064F\u0628\u0652\u0646\u0650\u060C \u0648\u064E\u0636\u064E\u0644\u064E\u0639\u0650 \u0627\u0644\u062F\u064E\u0651\u064A\u0652\u0646\u0650 \u0648\u064E\u063A\u064E\u0644\u064E\u0628\u064E\u0629\u0650 \u0627\u0644\u0631\u0650\u0651\u062C\u064E\u0627\u0644\u0650.")), /*#__PURE__*/


React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement("p", null, "\"Ya Allah, aku berlindung kepada-Mu dari kegelisahan dan kesedihan, kelemahan dan kemalasan, kekikiran dan kepengecutan, beban utang dan dari dikuasai orang lain.\"")), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Memohon perlindungan dari berbagai kesulitan hidup, termasuk beban utang."), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/

React.createElement(IntegratedAudioPlayer, { src: "https://www.dropbox.com/scl/fi/670lr12jeov7i3huo7f4q/Allahuma-inne-audzubika.mp3?rlkey=g6tgl5ggj1v85gv0qnbw68k7f&st=zicx2qwg&dl=1",
  text: "Allaahumma innee a\u2019oodhu bika minal-hammi wal-hazani, wal-\u2018ajzi wal-kasali, wal-bukhli wal-jubni, wa dhala\u2019id-dayni wa ghalabatir-rijaal.", isLooping: true }))), /*#__PURE__*/


React.createElement("tr", { className: "bg-gray-50" }, /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement("p", { className: `text-xl ${arabicTextClass} mb-2` }, "\u0627\u0644\u0644\u0651\u0647\u064F\u0640\u0645\u064E\u0651 \u0627\u0643\u0652\u0641\u0650\u0640\u0646\u064A \u0628\u0650\u062D\u064E\u0644\u0627\u0644\u0650\u0640\u0643\u064E \u0639\u064E\u0646\u0652 \u062D\u064E\u0640\u0631\u0627\u0645\u0650\u0640\u0643\u060C \u0648\u064E\u0623\u064E\u063A\u0652\u0646\u0650\u0640\u0646\u064A \u0628\u0650\u0641\u064E\u0636\u0652\u0640\u0644\u0650\u0643\u064E \u0639\u064E\u0645\u064E\u0651\u0640\u0646\u0652 \u0633\u0650\u0640\u0648\u0627\u0643.")), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement("p", null, "\"Ya Allah, cukupkanlah aku dengan rezeki halal-Mu dari yang haram, dan jadikanlah aku kaya dengan karunia-Mu dari selain-Mu.\"")), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Memohon kecukupan rezeki yang halal dan kemandirian dari selain Allah."), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement(IntegratedAudioPlayer, { src: "https://www.dropbox.com/scl/fi/th3z8vt6knzd9xrcrd38k/Allahuma-finne.mp3?rlkey=li67cczje4b0h7vcqoptuxtmc&st=x4ji1mwv&dl=1", text: "Allaahummak-finee bihalaalika \u2018an haraamika wa \u2018aghninee bifadhlika \u2018amman siwaaka" }))), /*#__PURE__*/


React.createElement("tr", null, /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement("p", { className: `text-xl ${arabicTextClass} mb-2` }, "\u064A\u064E\u0627 \u062D\u064E\u064A\u064F\u0651 \u064A\u064E\u0627 \u0642\u064E\u064A\u064F\u0651\u0648\u0652\u0645\u064F \u0628\u0650\u0631\u064E\u062D\u0652\u0645\u064E\u062A\u0650\u0643\u064E \u0623\u064E\u0633\u0652\u062A\u064E\u063A\u0650\u064A\u0652\u062B\u064F.")), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement("p", null, "\"Wahai Yang Maha Hidup, Wahai Yang Maha Berdiri Sendiri! Dengan rahmat-Mu aku memohon pertolongan!\"")), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Memohon pertolongan dan kemudahan dalam segala urusan."), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement(IntegratedAudioPlayer, { src: "https://raw.githubusercontent.com/kesinilagi/asetmusik/main/ya hayy ya qayy.mp3", text: "Ya Hayyu Ya Qayyum! Bi rahmatika astagheeth", isLooping: true }))), /*#__PURE__*/

React.createElement("tr", { className: "bg-gray-50" }, /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement("p", { className: `text-xl ${arabicTextClass} mb-2` }, "\u0644\u064E\u0627 \u0625\u0650\u0644\u064E\u0647\u064E \u0625\u0650\u0644\u064E\u0651\u0627 \u0623\u064E\u0646\u0652\u062A\u064E \u0633\u064F\u0628\u0652\u062D\u064E\u0627\u0646\u064E\u0643\u064E \u0625\u0650\u0646\u0650\u0651\u064A \u0643\u064F\u0646\u0652\u062A\u064F \u0645\u0650\u0646\u064E \u0627\u0644\u0638\u064E\u0651\u0627\u0644\u0650\u0645\u0650\u064A\u0646\u064E.")), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement("p", null, "\"Tidak ada Tuhan selain Engkau. Maha Suci Engkau, sesungguhnya aku termasuk orang-orang yang zalim.\"")), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Doa permohonan ampun dan pertolongan dalam keadaan terdesak (Doa Nabi Yunus)."), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement(IntegratedAudioPlayer, { src: "https://www.dropbox.com/scl/fi/ld61ofv4vcdg2tae42on7/Laailahailaanta.mp3?rlkey=6ve7qhcxt43s1t8v4xiyrv3rk&st=1rkk0afx&dl=1", text: "LAA ILAAHA ILLAAA ANTA SUBHAANAKA INNEE KUNTU MINAZ'Z'AALIMEEN" }))), /*#__PURE__*/

React.createElement("tr", null, /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement("p", { className: `text-xl ${arabicTextClass} mb-2` }, "\u062D\u064E\u0633\u0652\u0628\u0650\u064A\u064E \u0627\u0644\u0644\u064E\u0651\u0647\u064F \u0644\u064E\u0627 \u0625\u0650\u0644\u064E\u0647\u064E \u0625\u0650\u0644\u064E\u0651\u0627 \u0647\u064F\u0648\u064E \u0639\u064E\u0644\u064E\u064A\u0652\u0647\u0650 \u062A\u064E\u0648\u064E\u0643\u064E\u0651\u0644\u0652\u062A\u064F \u0648\u064E\u0647\u064F\u0648\u064E \u0631\u064E\u0628\u064F\u0651 \u0627\u0644\u0652\u0639\u064E\u0631\u0652\u0634\u0650 \u0627\u0644\u0652\u0639\u064E\u0638\u0650\u064A\u0645\u0650.")), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement("p", null, "\"Cukuplah Allah bagiku, tiada Tuhan selain Dia. Hanya kepada-Nya aku bertawakal, dan Dia adalah Tuhan pemilik Arsy yang agung.\"")), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Menegaskan tawakal penuh kepada Allah sebagai satu-satunya sandaran."), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement(IntegratedAudioPlayer, { src: "https://www.dropbox.com/scl/fi/m3mapahumh2uk83azchst/Hasbiyallah.mp3?rlkey=7wq1fhibhc023x698itru308g&st=yu0bb0wq&dl=1", text: "Hasbiyallahu la ilaha illa Huwa alaihi tawakaltu wa huwa Robul Arsyil Azhiim", isLooping: true }))), /*#__PURE__*/

React.createElement("tr", { className: "bg-gray-50" }, /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement("p", { className: `text-xl ${arabicTextClass} mb-2` }, "\u0644\u0644\u064E\u0651\u0647\u064F\u0645\u064E\u0651 \u064A\u064E\u0627 \u0641\u064E\u0627\u0631\u0650\u062C\u064E \u0671\u0644\u0652\u0647\u064E\u0645\u0650\u0651\u060C \u0648\u064E\u064A\u064E\u0627 \u0643\u064E\u0627\u0634\u0650\u0641\u064E \u0671\u0644\u0652\u063A\u064E\u0645\u0650\u0651\u060C \u0648\u064E\u064A\u064E\u0627 \u0645\u064F\u062C\u0650\u064A\u0628\u064E \u062F\u064E\u0639\u0652\u0648\u064E\u0629\u0650 \u0671\u0644\u0652\u0645\u064F\u0636\u0652\u0637\u064E\u0631\u0650\u0651\u064A\u0646\u064E\u060C \u064A\u064E\u0627 \u0631\u064E\u062D\u0652\u0645\u0670\u0646\u064E \u0671\u0644\u062F\u064F\u0651\u0646\u0652\u064A\u064E\u0627 \u0648\u064E\u0671\u0644\u0652\u0622\u062E\u0650\u0631\u064E\u0629\u0650 \u0648\u064E\u0631\u064E\u062D\u0650\u064A\u0645\u064E\u0647\u064F\u0645\u064E\u0627\u060C \u0623\u064E\u0646\u0652\u062A\u064E \u0631\u064E\u062C\u064E\u0627\u0626\u0650\u064A\u060C \u0648\u064E\u064A\u064E\u0627 \u0631\u064E\u062D\u0652\u0645\u0670\u0646\u064E \u0643\u064F\u0644\u0650\u0651 \u0634\u064E\u064A\u0652\u0621\u064D\u060C \u0671\u0631\u0652\u062D\u064E\u0645\u0652\u0646\u0650\u064A \u0631\u064E\u062D\u0652\u0645\u064E\u0629\u064B \u062A\u064F\u063A\u0652\u0646\u0650\u064A\u0646\u0650\u064A \u0628\u0650\u0647\u064E\u0627 \u0639\u064E\u0646\u0652 \u0631\u064E\u062D\u0652\u0645\u064E\u0629\u0650 \u0645\u064E\u0646\u0652 \u0633\u0650\u0648\u064E\u0627\u0643\u064E\u060C \u0648\u064E\u0671\u0642\u0652\u0636\u0650 \u0639\u064E\u0646\u0650\u0651\u064A \u062C\u064E\u0645\u0650\u064A\u0639\u064E \u062F\u064E\u064A\u0652\u0646\u0650\u064A."), /*#__PURE__*/React.createElement("p", { className: "italic" }, ".")), /*#__PURE__*/


React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement("p", null, "\"Ya Allah! Wahai penghilang kesedihan. Wahai penghapus duka! Wahai yang menolak kesedihan dan Wahai yang menerima doa orang-orang yang gelisah. Wahai Yang Maha Penyayang di dunia dan akhirat. Engkaulah satu-satunya harapanku, dan Wahai Yang Maha Penyayang atas segala sesuatu, rahmatilah aku. Limpahkanlah rahmat kepadaku yang melebihi setiap rahmat lainnya dan bebaskanlah aku dari semua utang.\"")), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Doa spesifik untuk pembebasan dari utang dan memohon rahmat."), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement(IntegratedAudioPlayer, { src: "https://www.dropbox.com/scl/fi/yq8cqv2m8xr68x8qzcm4t/Allahuma-ya-farijal.mp3?rlkey=rhui1g4c1ko6tc802rzovmasl&st=dkaburaf&dl=1", text: "Allaahumma yaa faarijal-hammi, wa yaa kaashifal-ghammi, wa yaa mujeeba da'watil-mudhtarrin, yaa Rahmaanad-dunyaa wal-aakhirati wa rahiimahumaa, anta rajaa'ii, wa yaa Rahmaana kulli syai'in, irhamnii rahmatan tughniinii bihaa 'an rahmati man siwaaka, waqdhi 'annii jamii'a dainii." }))), /*#__PURE__*/

React.createElement("tr", null, /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement("p", { className: `text-xl ${arabicTextClass} mb-2` }, "\u0644\u0644\u064E\u0651\u0647\u064F\u0645\u064E\u0651 \u0671\u0631\u0652\u062F\u064F\u062F\u0652 \u0625\u0650\u0644\u0649\u0670 \u062C\u064E\u0645\u0650\u064A\u0639\u0650 \u062E\u064E\u0644\u0652\u0642\u0650\u0643\u064E \u0645\u064E\u0638\u064E\u0627\u0644\u0650\u0645\u064E\u0647\u064F\u0645\u064F \u0671\u0644\u064E\u0651\u062A\u0650\u064A \u0642\u0650\u0628\u064E\u0644\u0650\u064A \u0635\u064E\u063A\u0650\u064A\u0631\u064E\u0647\u064E\u0627 \u0648\u064E\u0643\u064E\u0628\u0650\u064A\u0631\u064E\u0647\u064E\u0627 \u0641\u0650\u064A \u064A\u064F\u0633\u0652\u0631\u064D \u0645\u0650\u0646\u0652\u0643\u064E \u0648\u064E\u0639\u064E\u0627\u0641\u0650\u064A\u064E\u0629\u064D \u0648\u064E\u0645\u064E\u0627 \u0644\u064E\u0645\u0652 \u062A\u064E\u0628\u0652\u0644\u064F\u063A\u0652\u0647\u064F \u0642\u064F\u0648\u064E\u0651\u062A\u0650\u064A \u0648\u064E\u0644\u064E\u0645\u0652 \u062A\u064E\u0633\u064E\u0639\u0652\u0647\u064F \u0630\u064E\u0627\u062A\u064F \u064A\u064E\u062F\u0650\u064A \u0648\u064E\u0644\u064E\u0645\u0652 \u064A\u064E\u0642\u0652\u0648\u064E \u0639\u064E\u0644\u064E\u064A\u0652\u0647\u0650 \u0628\u064E\u062F\u064E\u0646\u0650\u064A \u0648\u064E\u064A\u064E\u0642\u0650\u064A\u0646\u0650\u064A \u0648\u064E\u0646\u064E\u0641\u0652\u0633\u0650\u064A \u0641\u064E\u0627\uE832\u062F\u0650\u0651\u0647\u0650 \u0639\u064E\u0646\u0650\u0651\u064A \u0645\u0650\u0646\u0652 \u062C\u064E\u0632\u0650\u064A\u0644\u0650 \u0645\u064E\u0627 \u0639\u0650\u0646\u0652\u062F\u064E\u0643\u064E \u0645\u0650\u0646\u0652 \u0641\u064E\u0636\u0652\u0644\u0650\u0643\u064E \u062B\u064F\u0645\u064E\u0651 \u0644\u0627\u064E \u062A\u064F\u062E\u064E\u0644\u0650\u0651\u0641\u0652 \u0639\u064E\u0644\u064E\u064A\u064E\u0651 \u0645\u0650\u0646\u0652\u0647\u064F \u0634\u064E\u064A\u0652\u0626\u0627\u064B \u062A\u064E\u0642\u0652\u0636\u0650\u064A\u0647\u0650 \u0645\u0650\u0646\u0652 \u062D\u064E\u0633\u064E\u0646\u064E\u0627\u062A\u0650\u064A \u064A\u064E\u0627 \u0627\uE832\u0631\u0652\u062D\u064E\u0645\u064E \u0671\u0644\u0631\u064E\u0651\u0627\u062D\u0650\u0645\u0650\u064A\u0646\u064E"), /*#__PURE__*/
React.createElement("p", { className: "italic" })), /*#__PURE__*/

React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement("p", null, "\"Ya Allah, (mohon) bantulah aku membayar kembali kepada semua makhluk-Mu atas kezaliman mereka yang ada padaku, baik yang kecil maupun yang besar, dengan kemudahan dan kesejahteraan dari Hadirat-Mu. Adapun kewajiban yang aku terlalu lemah untuk menyelesaikannya, dan aku terlalu miskin untuk melunasinya, dan fisik, keyakinan, serta diriku tidak mampu menanggungnya, maka (mohon) selesaikanlah atas namaku dari karunia-Mu yang melimpah. Kemudian, (mohon) janganlah Engkau mengambil sedikit pun darinya dari kebaikan-kebaianku. Wahai Yang Maha Penyayang di antara para penyayang!\"\"")), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Permohonan agar Allah melunasi utang yang tak mampu dibayar dari karunia-Nya."), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement(IntegratedAudioPlayer, { src: "https://www.dropbox.com/scl/fi/llvm79ccwr1hx0xvkd8df/Allahuma-urdud.mp3?rlkey=o1ykeala308pzrb8xu8g9vx91&st=n8xwnlq9&dl=1", text: "Allaahumma urdud ilaa jamii'i khalqika mazhaalimahum allatee qibalii saghiirahaa wa kabiirahaa fii yusrin minka wa 'aafiyatin wa maa lam tablughhu quwwatii wa lam tasa'hu zaatu yadii wa lam yaqwa 'alaihi badanii wa yaqiinii wa nafsii fa'addih 'annii min jaziili maa 'indaka min fadhlika thumma laa tukhallif 'alayya minhu syai'an taqdhiih min hasanaatii yaa Arhamar-Raahimiin." }))), /*#__PURE__*/

React.createElement("tr", { className: "bg-gray-50" }, /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement("p", { className: `text-xl ${arabicTextClass} mb-2` }, "\u0627\u0644\u0644\u064E\u0651\u0647\u064F\u0645\u064E\u0651 \u0644\u064E\u0627 \u0633\u064E\u0647\u0652\u0644\u064E \u0625\u0650\u0644\u064E\u0651\u0627 \u0645\u064E\u0627 \u062C\u064E\u0639\u064E\u0644\u0652\u062A\u064E\u0647\u064F \u0633\u064E\u0647\u0652\u0644\u064B\u0627\u060C \u0648\u064E\u0623\u064E\u0646\u0652\u062A\u064E \u062A\u064E\u062C\u0652\u0639\u064E\u0644\u064F \u0627\u0644\u0652\u062D\u064E\u0632\u0652\u0646\u064E \u0625\u0650\u0630\u064E\u0627 \u0634\u0650\u0626\u0652\u062A\u064E \u0633\u064E\u0647\u0652\u0644\u064B\u0627."), /*#__PURE__*/React.createElement("p", { className: "italic" })), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement("p", null, "\"Ya Allah! Tidak ada kemudahan kecuali yang Engkau jadikan mudah, dan Engkau menjadikan kesedihan (kesulitan), jika Engkau kehendaki, menjadi mudah.\"")), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Memohon kemudahan dari Allah dalam menghadapi segala kesulitan."), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement(IntegratedAudioPlayer, { src: "https://www.dropbox.com/scl/fi/0wfm0jdg3vktod5t4fkxe/Allahuma-sahla.mp3?rlkey=icsztiki9wo3brj16noz3g89y&st=ozy2f9lg&dl=1", text: "Allahumma la sahla illa maa ja'altahu sahlan, wa Anta taj'alu l-hazna idha shi'ta sahla." }))), /*#__PURE__*/

React.createElement("tr", null, /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement("p", { className: `text-xl ${arabicTextClass} mb-2` }, "\u0627\u0644\u0644\u064E\u0651\u0647\u064F\u0645\u064E\u0651 \u0642\u064E\u0646\u0650\u0651\u0639\u0652\u0646\u0650\u064A \u0628\u0650\u0645\u064E\u0627 \u0631\u064E\u0632\u064E\u0642\u0652\u062A\u064E\u0646\u0650\u064A\u060C \u0648\u064E\u0628\u064E\u0627\u0631\u0650\u0643\u0652 \u0644\u0650\u064A \u0641\u0650\u064A\u0647\u0650\u060C \u0648\u064E\u0627\u062E\u0652\u0644\u064F\u0641\u0652 \u0639\u064E\u0644\u064E\u064A\u064E\u0651 \u0643\u064F\u0644\u064E\u0651 \u063A\u064E\u0627\u0626\u0650\u0628\u064E\u0629\u064D \u0644\u0650\u064A \u0628\u0650\u062E\u064E\u064A\u0652\u0631\u064D."), /*#__PURE__*/React.createElement("p", { className: "italic" })), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement("p", null, "\"Ya Allah, jadikanlah aku ridha dengan apa yang Engkau berikan kepadaku, berikanlah berkah di dalamnya, dan gantikanlah setiap yang hilang dariku dengan yang lebih baik.\"")), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, "Memohon rasa cukup, keberkahan, dan penggantian yang lebih baik."), /*#__PURE__*/
React.createElement("td", { className: "py-3 px-4 border-b" }, /*#__PURE__*/React.createElement(IntegratedAudioPlayer, { src: "https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Allahuma qanni.mp3", text: "Allahumma qanni\u2019ni bima razaqtani, wa barik li fihi, wakhluf \u2018alayya kulla gha\u2019ibatin li bi khayr." })))))));

// Komponen untuk meminta pengguna login
const LoginPrompt = () => {
  const handleLogin = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open('login');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 text-white flex flex-col justify-center items-center p-4">
      <Starfield />
      <div className="z-10 text-center animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Selamat Datang di Shunya Codex</h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">Silakan login atau daftar untuk melanjutkan perjalanan Anda.</p>
        <button 
          onClick={handleLogin} 
          className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 font-bold transition-colors text-xl shadow-lg"
        >
          Masuk / Daftar
        </button>
      </div>
    </div>
  );
};





// ### KOMPONEN LAYOUT UTAMA ###
// Komponen baru untuk mengatur struktur halaman utama
// ### GANTI SELURUH MAINLAYOUT ANDA DENGAN VERSI BERSIH INI ###
const MainLayout = () => {
  // Ambil semua state dan fungsi yang dibutuhkan dari context
  const {
    user,
    themeKey, themes,
    currentPageKey, setCurrentPageKey,
    fontSizeIndex, setFontSizeIndex, fontSizes,
    setIsCoverUnlocked,
    isSidebarOpen, setIsSidebarOpen } =
  useContext(AppContext);
/ Fungsi untuk logout
  const handleLogout = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.logout();
    }
  };
  const currentTheme = themes[themeKey];
  const pageIndex = pages.findIndex(p => p === currentPageKey);

  const goToPage = direction => {
    const nextIndex = pageIndex + direction;
    if (nextIndex >= 0 && nextIndex < pages.length) {
      const nextPageKey = pages[nextIndex];
      if (nextPageKey !== 'pixel-thoughts' && nextPageKey !== 'affirmation-room' && nextPageKey !== 'pengaturan' && nextPageKey !== 'kata-pengantar') {
        setCurrentPageKey(nextPageKey);
      }
    }
  };

  const changeFontSize = direction => {
    let nextIndex = fontSizeIndex + direction;
    if (nextIndex >= 0 && nextIndex < fontSizes.length) {
      setFontSizeIndex(nextIndex);
    }
  };

  const handleCloseBook = () => {
    closeFullscreen();
    setIsCoverUnlocked(false);
  };

  const renderPage = () => {
    switch (currentPageKey) {
      case 'kata-pengantar':return /*#__PURE__*/React.createElement(KataPengantar, null);
      case 'daftar-isi':return /*#__PURE__*/React.createElement(DaftarIsi, null);
      case 'bab1':return /*#__PURE__*/React.createElement(Bab1, null);
      case 'bab2':return /*#__PURE__*/React.createElement(Bab2, null);
      case 'bab3':return /*#__PURE__*/React.createElement(Bab3, null);
      case 'bab4':return /*#__PURE__*/React.createElement(Bab4, null);
      case 'bab5':return /*#__PURE__*/React.createElement(Bab5, null);
      case 'bab6':return /*#__PURE__*/React.createElement(Bab6, null);
      case 'bab7':return /*#__PURE__*/React.createElement(Bab7, null);
      case 'bab8':return /*#__PURE__*/React.createElement(Bab8, null);
      case 'bab9':return /*#__PURE__*/React.createElement(Bab9, null);
      case 'bab10':return /*#__PURE__*/React.createElement(Bab10, null);
      case 'bab11':return /*#__PURE__*/React.createElement(Bab11, null);
      case 'bab12':return /*#__PURE__*/React.createElement(Bab12, null);
      case 'bab13':return /*#__PURE__*/React.createElement(Bab13, null);
      case 'bab14a':return /*#__PURE__*/React.createElement(Bab14a, null);
      case 'bab14b':return /*#__PURE__*/React.createElement(Bab14b, null);
      case 'bab15':return /*#__PURE__*/React.createElement(Bab15, null);
      case 'doapilihan':return /*#__PURE__*/React.createElement(DoaPilihan, null);
      case 'pengaturan':return /*#__PURE__*/React.createElement(ThemeSettings, null);
      default:return /*#__PURE__*/React.createElement(DaftarIsi, null);}

  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "min-h-screen w-full bg-gray-900" }, /*#__PURE__*/

    React.createElement("div", { className: `sidebar ${isSidebarOpen ? 'is-open' : ''}` }, /*#__PURE__*/
    React.createElement(SidebarMenu, null)),

    isSidebarOpen && /*#__PURE__*/
    React.createElement("div", { onClick: () => setIsSidebarOpen(false), className: "sidebar-overlay" }), /*#__PURE__*/



    React.createElement("div", { className: "flex flex-col min-h-screen" },
    currentPageKey !== 'kata-pengantar' && /*#__PURE__*/
    React.createElement("header", { className: `sticky top-0 z-40 w-full text-white shadow-md ${currentTheme.header}` }, /*#__PURE__*/
    React.createElement("div", { className: "container mx-auto px-4 py-4 flex justify-between items-center" }, /*#__PURE__*/
    React.createElement("button", { onClick: () => setIsSidebarOpen(true), className: "font-bold text-lg hover:opacity-80 flex items-center gap-2" }, /*#__PURE__*/
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /*#__PURE__*/React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" })), "Daftar Isi"), /*#__PURE__*/
</button>
              
              <div className="flex items-center gap-2 md:gap-4">
                 {/* --- TOMBOL LOGOUT BARU --- */}
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded text-sm" 
                  title="Logout"
                >
                  Keluar
                </button>

    React.createElement("div", { className: "flex items-center gap-2 md:gap-4" }, /*#__PURE__*/
    React.createElement("button", { onClick: () => setCurrentPageKey('pengaturan'), className: "p-2 rounded-full hover:bg-white/20", title: "Pengaturan Tema" }, /*#__PURE__*/
    React.createElement("span", { className: "text-2xl" }, "\uD83C\uDFA8")), /*#__PURE__*/

    React.createElement("button", { onClick: handleCloseBook, className: "p-2 rounded-full hover:bg-white/20", title: "Tutup E-book" }, /*#__PURE__*/
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, /*#__PURE__*/
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" })))))), /*#__PURE__*/







    React.createElement("main", { className: `flex-grow container mx-auto px-4 ${currentPageKey === 'kata-pengantar' ? 'py-16' : 'py-8 md:py-12'}` },
    renderPage()),


    currentPageKey !== 'kata-pengantar' && /*#__PURE__*/
    React.createElement("footer", { className: `sticky bottom-0 z-40 w-full text-white shadow-inner p-4 ${currentTheme.header}` }, /*#__PURE__*/
    React.createElement("div", { className: "container mx-auto flex justify-between items-center" }, /*#__PURE__*/
    React.createElement("button", { onClick: () => goToPage(-1), disabled: pageIndex <= 1, className: "px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-white/20" }, "\u2039 Sebelumnya"), /*#__PURE__*/
    React.createElement("div", { className: "flex items-center gap-2" }, /*#__PURE__*/
    React.createElement("button", { onClick: () => changeFontSize(-1), disabled: fontSizeIndex <= 0, className: "px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-white/20" }, "A-"), /*#__PURE__*/
    React.createElement("span", { className: "w-8 text-center font-semibold" }, parseInt(fontSizes[fontSizeIndex])), /*#__PURE__*/
    React.createElement("button", { onClick: () => changeFontSize(1), disabled: fontSizeIndex >= fontSizes.length - 1, className: "px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-white/20" }, "A+")), /*#__PURE__*/

    React.createElement("button", { onClick: () => goToPage(1), disabled: pageIndex >= pages.findIndex(p => p === 'doapilihan'), className: "px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-white/20" }, "Berikutnya \u203A")), /*#__PURE__*/

    React.createElement("div", { className: "mt-3" }, /*#__PURE__*/
    React.createElement(RandomQuote, null))))));






};

//hujankata
// ### TAMBAHKAN KEMBALI KOMPONEN ASLI INI ###
const WordRainBackground = () => {
  const [words, setWords] = React.useState([]);

  React.useEffect(() => {
    const wordPool = ['Kaya', 'Berkelimpahan', 'Tenang', 'Rileks', 'Damai', 'Sejahtera', 'Syukur', 'Ikhlas', 'Wealth', 'Abundance', 'Rich', 'Calm', 'Relax', 'Peace', 'Grateful', 'Flow', 'Sugih', 'Tentrem', 'Ayem', 'Luber', 'Makmur', 'Nrimo', 'Legowo'];

    const generateWords = () => {
      const newWords = Array.from({ length: 120 }).map(() => ({
        text: wordPool[Math.floor(Math.random() * wordPool.length)],
        left: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 12 + 10 + 3}px`,
        animationDuration: `${Math.random() * 2 + 1 + 3}s`,
        animationDelay: `${Math.random() * 10}s`,
        opacity: Math.random() * 0.5 + 0.2 }));

      setWords(newWords);
    };

    generateWords();
  }, []);

  return /*#__PURE__*/(
    React.createElement("div", { className: "absolute inset-0 z-0 overflow-hidden" },
    words.map((word, index) => /*#__PURE__*/
    React.createElement("span", {
      key: index,
      className: "falling-word" // Menggunakan kelas 'falling-word'
      , style: {
        left: word.left,
        fontSize: word.fontSize,
        animationDuration: word.animationDuration,
        animationDelay: word.animationDelay,
        opacity: word.opacity } },


    word.text))));




};

// ### GANTI ZoomingWordBackground DENGAN VERSI UPGRADE INI ###
const ZoomingWordBackground = ({ customWords = [], rainColor }) => {
  const [words, setWords] = React.useState([]);

  React.useEffect(() => {
    // Jika tidak ada kata-kata yang dikirim, jangan lakukan apa-apa
    if (customWords.length === 0) {
      setWords([]);
      return;
    };

    const generateWords = () => {
      // Sekarang kita membuat 150 kata dari kata-kata yang diketik pengguna
      const newWords = Array.from({ length: 150 }).map(() => ({
        text: customWords[Math.floor(Math.random() * customWords.length)], // Mengambil kata acak dari input pengguna
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 16 + 12}px`,
        animationDuration: `${Math.random() * 4 + 3}s`, // Durasi zoom 3-7 detik
        animationDelay: `${Math.random() * 5}s` }));

      setWords(newWords);
    };

    generateWords();
  }, [customWords]); // Efek ini akan berjalan lagi jika customWords berubah

  return /*#__PURE__*/(
    React.createElement("div", { className: "absolute inset-0 z-0 overflow-hidden" },
    words.map((word, index) => /*#__PURE__*/
    React.createElement("span", {
      key: index,
      className: "zooming-word",
      style: {
        top: word.top,
        left: word.left,
        fontSize: word.fontSize,
        animationDuration: word.animationDuration,
        animationDelay: word.animationDelay,
        '--rain-color': rainColor // Menerapkan warna
      } },

    word.text))));




};

const SidebarMenu = () => {
  // Ambil fungsi untuk navigasi dan menutup sidebar dari context
  const { setCurrentPageKey, setIsSidebarOpen } = useContext(AppContext);

  const handleNavigate = pageKey => {
    setCurrentPageKey(pageKey);
    setIsSidebarOpen(false); // Otomatis tutup sidebar setelah bab dipilih
  };

  // Style tombol yang sudah kita buat sebelumnya
  const tocSectionClasses = "block w-full text-left font-bold text-lg text-black p-3 rounded-lg hover:bg-sky-100 transition-colors";
  const tocChapterClasses = "block w-full text-left text-black font-semibold p-2 pl-4 rounded-lg hover:bg-sky-100 transition-colors";
  const tocFeatureClasses = "block w-full text-left font-bold text-xl p-3 rounded-lg hover:bg-yellow-100 transition-colors";

  return /*#__PURE__*/ (
    // Ini adalah isi dari sidebar kita
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h4", { className: `${sectionTitleClasses} mb-4` }, "\uD83D\uDCD1 DAFTAR ISI"), /*#__PURE__*/
    React.createElement("ul", { className: "space-y-1 px-2" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab1'), className: tocSectionClasses }, "Bagian I: Dunia Ribut, Hati Harus Tenang"), /*#__PURE__*/
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab1'), className: tocChapterClasses }, "1. Dunia Boleh Heboh...")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab2'), className: tocChapterClasses }, "2. Kita Ini Mau Ke Mana?")))), /*#__PURE__*/




    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab3'), className: tocSectionClasses }, "Bagian II: Membedah Dalam Diri"), /*#__PURE__*/
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab3'), className: tocChapterClasses }, "3. Hati: Singgasana Cahaya yang Terlupakan")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab4'), className: tocChapterClasses }, "4. Akal: Satpam atau Penjaga Gerbang Ilahi?")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab5'), className: tocChapterClasses }, "5. Intuisi: Bahasa Lembut yang Kita Abaikan")))), /*#__PURE__*/


    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab6'), className: tocSectionClasses }, " Bagian III: Kecerdasan Hati dan Koherensi Diri"), /*#__PURE__*/
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab6'), className: tocChapterClasses }, " 6.HeartMath dan Koherensi: Saat Hati dan Otak Berdamai")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab7'), className: tocChapterClasses }, " 7.Janin pun Tahu: Jantung Lebih Dulu dari Otak")))), /*#__PURE__*/



    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab8'), className: tocSectionClasses }, " Bagian IV: Kawrooh \u2013 Metode Menjernihkan Hati"), /*#__PURE__*/
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab8'), className: tocChapterClasses }, " 8. Kawrooh: Ilmu Melepas Tanpa Drama")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab9'), className: tocChapterClasses }, " 9. Langkah-Langkah Kawrooh (di sertakan audio contoh pelepasan emosi)")))), /*#__PURE__*/



    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab10'), className: tocSectionClasses }, " Bagian V: Praktik Inti Spiritualitas Islam"), /*#__PURE__*/
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab10'), className: tocChapterClasses }, " 10. Sholawat: Jalan Cepat Menuju Cahaya (di sertai audio sholawat pilihan)")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab11'), className: tocChapterClasses }, "11. Afirmasi, Dzikir, Doa, dan Amal Saleh: Nafas Penyerahan Diri")))), /*#__PURE__*/



    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab12'), className: tocSectionClasses }, " Bagian VI: Jalan Pulang ke Dalam"), /*#__PURE__*/
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab12'), className: tocChapterClasses }, " 12.Membersihkan Kaca Jiwa: Tazkiyatun Nafs")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab13'), className: tocChapterClasses }, "13. Praktik-Praktik Spiritual Harian")))), /*#__PURE__*/



    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab14'), className: tocSectionClasses }, " Bagian VII: Spiritualitas dan Hukum Kehidupan"), /*#__PURE__*/
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab14a'), className: tocChapterClasses }, " 14.a Law of Attraction: Versi Langit Bukan Versi Afirmasi")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab14b'), className: tocChapterClasses }, "14.b Tanda-tanda Datangnya Kelimpahan")))), /*#__PURE__*/



    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab15'), className: tocSectionClasses }, " Bagian Penutup: Kompas Kehidupan"), /*#__PURE__*/
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('bab15'), className: tocChapterClasses }, " 15. Merangkai Semua: Dari Kesadaran Menuju Kehidupan Berkah")))), /*#__PURE__*/


    React.createElement("li", { className: "pt-4" }, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('pixel-thoughts'), className: `${tocFeatureClasses} text-yellow-600` }, "\u2728 Ruang Pelepasan")), /*#__PURE__*/
    React.createElement("li", { className: "pt-2" }, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('affirmation-room'), className: `${tocFeatureClasses} text-sky-500` }, "\u2728 Ruang Afirmasi")), /*#__PURE__*/
    React.createElement("li", { className: "pt-2" }, /*#__PURE__*/React.createElement("button", { onClick: () => handleNavigate('doapilihan'), className: `${tocFeatureClasses} text-green-600` }, "\uD83D\uDE4F Doa-doa Pilihan")))));



};


// --- GANTI COVER SCREEN ANDA DENGAN VERSI AMAN INI ---
// --- GANTI COVER SCREEN ANDA DENGAN VERSI KITAB KUNO INI ---
const CoverScreen = () => {
  const { setIsCoverUnlocked, setCurrentPageKey } = useContext(AppContext);
  const [isExiting, setIsExiting] = useState(false);
  const handleUnlock = () => {
    openFullscreen(document.documentElement);
    // Kita beri sedikit delay agar animasi balik bukunya terlihat
    setTimeout(() => {
      setCurrentPageKey('kata-pengantar');
      setIsCoverUnlocked(true);
    }, 500);
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "fixed inset-0 bg-gray-900 text-white flex flex-col items-center justify-center p-4 overflow-hidden" }, /*#__PURE__*/

    React.createElement(WordRainBackground, { rainColor: "#f0e68c" }), /*#__PURE__*/


    React.createElement("div", { className: "book-container animate-fade-in" }, /*#__PURE__*/



    React.createElement("div", { className: "relative z-10 text-center flex flex-col items-center justify-center h-full p-5" }, /*#__PURE__*/



    React.createElement("p", { className: "mb-11 text-gray-300/80 text-sm" }), /*#__PURE__*/


    React.createElement("button", {
      onClick: handleUnlock,
      className: `relative p-4 group ${isExiting ? 'star-shine-effect' : ''}`,
      "aria-label": "Buka E-book" }, /*#__PURE__*/

    React.createElement("div", { className: "w-7 h-13 text-yellow-100 transition-transform duration-500 group-hover:scale-150" }, /*#__PURE__*/

    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-full w-full", viewBox: "0 0 20 20", fill: "currentColor" }, /*#__PURE__*/
    React.createElement("path", { d: "M10 3L12 8L17 10L12 12L10 17L8 12L3 10L8 8L10 3z" })))))), /*#__PURE__*/







    React.createElement("div", { className: "mt-7" }, /*#__PURE__*/
    React.createElement("p", { className: "text-sm text-gray-400/60" }, "Karya: Akasha Bayu Sasmita"))));





};

// Daftar halaman untuk navigasi
const pages = ['kata-pengantar', 'daftar-isi', 'bab1', 'bab2', 'bab3', 'bab4', 'bab5', 'bab6', 'bab7', 'bab8', 'bab9', 'bab10', 'bab11', 'bab12', 'bab13', 'bab14a', 'bab14b', 'bab15', 'affirmation-room', 'doapilihan', 'pixel-thoughts', 'pengaturan'];


// ### KOMPONEN UTAMA APLIKASI (OTAK DARI SEMUANYA) ###
const App = () => {
  const [user, setUser] = useState(null);
  const [isCoverUnlocked, setIsCoverUnlocked] = useState(false);
  // --- STATE BARU UNTUK SIDEBAR ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const themes = {
    'blue': { name: 'Biru Klasik', header: 'bg-blue-700' },
    'green': { name: 'Hijau Menenangkan', header: 'bg-teal-700' },
    'purple': { name: 'Ungu Spiritual', header: 'bg-indigo-700' },
    'dark': { name: 'Mode Gelap', header: 'bg-gray-800' } };

  const [themeKey, setThemeKey] = useState('blue');
  const fontSizes = ['14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px', '32px', '34px', '36px'];
  const [fontSizeIndex, setFontSizeIndex] = useState(1);
  const [currentPageKey, setCurrentPageKey] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk menu

  useEffect(() => {
    const savedTheme = localStorage.getItem('ebookThemeKey');
    if (savedTheme && themes[savedTheme]) {
      setThemeKey(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--dynamic-font-size', fontSizes[fontSizeIndex]);
  }, [fontSizeIndex]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPageKey]);
 // --- EFEK UNTUK NETLIFY IDENTITY ---
  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.init();

      // Cek pengguna saat pertama kali load
      const currentUser = window.netlifyIdentity.currentUser();
      if (currentUser) {
        setUser(currentUser);
      }

      // Event listener untuk login
      window.netlifyIdentity.on('login', (loggedInUser) => {
        setUser(loggedInUser);
        window.netlifyIdentity.close();
      });

      // Event listener untuk logout
      window.netlifyIdentity.on('logout', () => {
        setUser(null);
      });
    }
  }, []);
  const contextValue = {
    user, setUser,
    themes, themeKey, setThemeKey,
    fontSizes, fontSizeIndex, setFontSizeIndex,
    currentPageKey, setCurrentPageKey,
    isCoverUnlocked, setIsCoverUnlocked,
    isSidebarOpen, setIsSidebarOpen,
    isMenuOpen, setIsMenuOpen };


  return (
    <AppContext.Provider value={contextValue}>
      {
        !isCoverUnlocked ? <CoverScreen /> :
        !user ? <LoginPrompt /> : // <-- JIKA BELUM LOGIN, TAMPILKAN INI
        currentPageKey === 'pixel-thoughts' ? <PixelThoughts /> :
        currentPageKey === 'affirmation-room' ? <AffirmationRoom /> :
        <MainLayout /> // <-- JIKA SUDAH LOGIN, TAMPILKAN INI
      }
    </AppContext.Provider>
  );

// Perintah Final untuk merender Aplikasi
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));

// CSS untuk variabel font size
// GANTI SELURUH BLOK CSS LAMA ANDA DENGAN YANG INI
const style = document.createElement('style');
style.innerHTML = `
    /* === Global & Reset === */
    body {
        margin: 0;
        background-color: #111827;
    }
    :root {
        --dynamic-font-size: 18px;
    }
    .dynamic-paragraph {
        font-size: var(--dynamic-font-size);
        transition: font-size 0.3s ease-in-out;
    }
    .animate-fade-in {
        animation: fadeIn 1.5s ease-in-out;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }

    /* === CSS untuk Hujan Kata-Kata (CoverScreen) === */
    .falling-word {
        position: absolute; top: -50px; color: var(--rain-color, #E6C700);
    text-shadow: 0 0 10px var(--rain-color, #FFD700);

    font-family: 'Times New Roman', serif;
    white-space: nowrap;
    animation-name: fall;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    user-select: none;
    text-transform: uppercase;
}
    @keyframes fall {
        from { transform: translateY(0vh) rotate(-10deg); }
        to { transform: translateY(110vh) rotate(10deg); }
    }
    
    /* Kelas baru untuk setiap KATA yang muncul */
/* Kelas baru untuk setiap KATA yang muncul dengan efek zoom */
.zooming-word {
    position: absolute;
    /* WARNA SEKARANG DIAMBIL DARI VARIABLE, JADI BISA BERUBAH-UBAH */
    color: var(--rain-color, #38bdf8); 
    text-shadow: 0 0 10px var(--rain-color, #38bdf8);
    font-family: 'Times New Roman', serif;
    white-space: nowrap;
    animation-name: zoomInOut; /* Menggunakan resep animasi baru */
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    user-select: none;
    text-transform: uppercase;
}

/* Resep animasi "zoom mendekat dan menghilang" yang baru */
@keyframes zoomInOut {
    0% {
        transform: scale(0.2);
        opacity: 0;
    }
    50% {
        transform: scale(1);
        opacity: 0.8;
    }
    100% {
        /* Tujuan akhir: jadi 2x lebih besar (mendekat) dan menghilang */
        transform: scale(2.5);
        opacity: 0;
    }
}

    /* === CSS UNTUK PIXEL THOUGHTS (YANG KEMARIN HILANG) === */
    .thought-bubble {
        /* Transisi untuk menyusut */
        transition: transform 20s ease-in-out, opacity 1s ease-out;
        transform: scale(1);
        opacity: 1;
    }
    .thought-bubble.recede {
        /* Saat menyusut, ukuran jadi 2% */
        transform: scale(0.02);
    }
    .thought-bubble.vanish {
        /* Saat terbang, ukurannya mengecil lagi dan terbang ke atas sambil menghilang */
        transform: scale(0.015) translateY(-3500vh);
        opacity: 0.5;
        /* Transisi untuk terbang dibuat lebih cepat dan dramatis */
        transition: transform 9s cubic-bezier(0.5, 0, 1, 1), opacity 1.5s ease-out;
    }
    .glowing-border {
        box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.5), 0 0 30px 10px rgba(79, 70, 229, 0.4);
    }
    .message-fade-in {
        animation: messageFade 1.5s ease-in-out forwards;
        white-space: pre-line;
    }
    @keyframes messageFade {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    // TAMBAHKAN KELAS INI KE DALAM BLOK <STYLE> ANDA

.affirmation-flasher {
    position: absolute;
    z-index: 10;
    /* Ukuran font dibuat responsif dan tidak terlalu besar agar muat */
    font-size: clamp(10rem, 20vw, 10rem);
    font-weight: extrabold;
    color: white;
    text-shadow: 0 0 25px white, 0 0 40px #0ea5e9;
    pointer-events: none;
        
    /* Pengaturan agar selalu di tengah dan tidak terpotong */
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%; /* Lebar maksimal 90% dari layar */
    max-width: 800px; /* Lebar absolut maksimal */
    text-align: center;
    text-transform: uppercase;
    
    /* Transisi untuk flash yang lebih halus */
    transition: opacity 0.2s ease-in-out; 
    
}
/* TAMBAHKAN KELAS INI KE BLOK CSS ANDA */

.force-uppercase {
    text-transform: uppercase;
}
/* Untuk placeholder agar tidak ikut kapital */
.force-uppercase::placeholder {
    text-transform: uppercase;
}
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 300px; /* Lebar sidebar */
    max-width: 80%;
    height: 100%;
    background-color: white;
    box-shadow: 4px 0 15px rgba(0,0,0,0.2);
    transform: translateX(-100%); /* Sembunyi di kiri */
    transition: transform 0.3s ease-in-out;
    z-index: 100;
    overflow-y: auto; /* Bisa di-scroll jika isinya panjang */
    color: #333; /* Warna teks di dalam sidebar */
}

.sidebar.is-open {
    transform: translateX(0); /* Muncul ke layar */
}

.sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5); /* Warna gelap transparan */
    z-index: 99;
}
.book-container {
    width: 90vw;
    max-width: 400px;
    aspect-ratio: 2 / 3; /* Menjaga rasio buku */
    background-color: #382e28; /* Warna dasar kulit coklat tua */
    background-image: url('https://raw.githubusercontent.com/kesinilagi/asetmusik/main/shunya codex.png');
    background-size: cover;      /* Membuat gambar menutupi seluruh area tanpa merusak rasio */
    background-position: center; /* Memposisikan gambar pas di tengah */
    background-repeat: no-repeat;  /* Mencegah gambar diulang-ulang */
    border-radius: 8px;
    box-shadow: 10px 10px 40px rgba(0,0,0,0.6), inset 0 0 25px rgba(0,0,0,0.5);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    border: 3px solid #1c1511;
}

.book-ornament-frame {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: fill; /* Membuat gambar bingkai meregang pas */
    pointer-events: none; /* Agar gambar tidak bisa diklik */
    opacity: 0.8;
}

.book-title-gold {
    font-family: 'Georgia', 'Times New Roman', serif; /* Font serif yang klasik */
    color: #f0e68c; /* Warna emas pucat */
    text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.9);
}

.unlock-button-gold {
    background: radial-gradient(ellipse at center, #7a5f2c 0%,#c19a48 45%,#d4af37 62%,#c19a48 100%);
    box-shadow: 0 0 15px 5px rgba(255, 215, 0, 0.4), inset 0 0 5px rgba(255, 255, 255, 0.5);
    border: 2px solid #f0e68c;
    transition: all 0.3s ease;
}

.unlock-button-gold:hover {
    box-shadow: 0 0 25px 10px rgba(255, 215, 0, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.7);
    transform: scale(1.05);
}
/* TAMBAHKAN RESEP ANIMASI INI KE CSS ANDA */

/* Kelas ini akan kita panggil saat tombol diklik */
.star-shine-effect {
    animation: star-shine 0.5s ease-in-out;
}

/* Resep/langkah-langkah animasinya */
@keyframes star-shine {
    0% {
        box-shadow: 0 0 15px 5px rgba(255, 215, 0, 0.4), inset 0 0 5px rgba(255, 255, 255, 0.5);
    }
    50% {
        /* Di tengah animasi, cahayanya membesar dan sangat terang */
        box-shadow: 0 0 45px 20px rgba(255, 215, 0, 0.9), inset 0 0 15px rgba(255, 255, 255, 0.8);
    }
    100% {
        box-shadow: 0 0 15px 5px rgba(255, 215, 0, 0.4), inset 0 0 5px rgba(255, 255, 255, 0.5);
    }
}
`;
document.head.appendChild(style);
