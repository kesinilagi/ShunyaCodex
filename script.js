// ===================================================================
// KODE MASTER FINAL v13 - DISempurnakan DENGAN CONTEXT API & PERBAIKAN STRUKTUR
// ===================================================================
// --- KOMPONEN BARU: LAYAR AKTIVASI (KOREKSI STRUKTUR JSX & TOMBOL) ---
const { useState, useEffect, useRef, createContext, useContext } = React;
// --- Context untuk State Global ---
// Ini akan menjadi "pusat data" untuk aplikasi kita.
const AppContext = createContext();
const ActivationScreen = () => {
    // Ambil setIsActivated dari context, bukan hanya setCurrentPageKey
    const { setCurrentPageKey, setIsActivated } = useContext(AppContext); 
    const [activationKey, setActivationKey] = useState('');
    const [userName, setUserName] = useState(''); // Tambahkan kembali state userName
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // PASTE URL WEB APP DARI GOOGLE APPS SCRIPT KAMU DI SINI!
    const GOOGLE_APPS_SCRIPT_API_URL = 'https://script.google.com/macros/s/AKfycbyvtJwSHb0rJLX4p1PYHAS9RSdU2H2fBPdyJoYIZygCUz3NSvEuAhB9NefBjpHIbp5u/exec'; 

    const verifyKeyWithBackend = async (keyToVerify) => { 
        try {
            const response = await fetch(`${GOOGLE_APPS_SCRIPT_API_URL}?key=${encodeURIComponent(keyToVerify.trim())}`);
            const data = await response.json(); 
            return data; 
        } catch (error) {
            console.error("Error verifying key with backend:", error);
            return { success: false, message: "Terjadi kesalahan koneksi. Mohon periksa koneksi internet Anda." };
        }
    };

    const handleActivate = async () => {
        // --- VALIDASI AWAL ---
        if (!userName.trim()) { // Validasi nama
            setMessage('Mohon masukkan nama Anda.');
            return;
        }
        if (!activationKey.trim()) {
            setMessage('Mohon masukkan kunci aktivasi.');
            return;
        }

        setIsLoading(true);
        setMessage('Memverifikasi kunci...');

        const result = await verifyKeyWithBackend(activationKey); 

        if (result.success) {
            // Simpan di localStorage agar persisten antar sesi
            localStorage.setItem('ebookActivated', 'true'); 
            localStorage.setItem('ebookActivationKey', activationKey.trim()); 
            localStorage.setItem('ebookUserName', userName.trim()); // Simpan nama di localStorage
            
            setIsActivated(true); 
            setMessage('Aktivasi Berhasil! Selamat menikmati E-book.');

            setTimeout(() => {
                setCurrentPageKey('kata-pengantar'); // Mengarahkan ke kata pengantar setelah aktivasi
            }, 1500); 

        } else {
            setMessage(`Aktivasi Gagal: ${result.message}`);
        }
        setIsLoading(false);
    };

    // Saat komponen dimuat, cek status aktivasi lokal terlebih dahulu
    useEffect(() => {
        const storedActivated = localStorage.getItem('ebookActivated') === 'true';
        const storedName = localStorage.getItem('ebookUserName');

        if (storedActivated) {
            setMessage(`E-book sudah aktif di perangkat ini, ${storedName || 'Sahabat'}.`); 
            setTimeout(() => {
                setCurrentPageKey('kata-pengantar'); // Mengarahkan ke kata pengantar jika sudah aktif
            }, 500);
        }
    }, []);

    return (
        <div className="fixed inset-0 bg-gray-900 text-white flex flex-col justify-center items-center p-4">
            <Starfield />
            
            <div className="z-10 text-center animate-fade-in bg-black/60 p-8 rounded-xl shadow-lg">
                {/* --- HEADER AKTIVASI --- */}
                {/* --- FORM AKTIVASI --- */}
                <div className="flex flex-col items-center">
                    {/* Input Nama Pengguna */}
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full max-w-xs bg-gray-800 border border-gray-700 rounded-lg text-xl text-center p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white mb-4"
                        placeholder="Nama Anda"
                        disabled={isLoading}
                    />
                    {/* Input Kunci Aktivasi */}
                    <input
                        type="text" // Menggunakan type="text" agar lebih mudah debug (bisa diganti password nanti)
                        value={activationKey}
                        onChange={(e) => setActivationKey(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleActivate()}
                        className="w-full max-w-xs bg-gray-800 border border-gray-700 rounded-lg text-xl text-center p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white uppercase"
                        placeholder="KUNCI AKTIVASI"
                        disabled={isLoading}
                    />
                    
                    {/* Pesan Sukses/Error */}
                    {message && <p className={`mt-4 text-center ${message.includes('Berhasil') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}
                    
                    {/* Tombol Aktivasi */}
                    <button
                        onClick={handleActivate}
                        // Disable tombol jika sedang loading, atau nama/kunci kosong
                        disabled={isLoading || !userName.trim() || !activationKey.trim()} 
                        className="bg-purple-600 text-white font-bold py-3 px-8 mt-8 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    > 
                        {isLoading ? 'Memverifikasi...' : 'Aktivasi'}
                    </button>
                </div>
                <p className="text-lg md:text-xl mb-4 text-gray-300">
                    Masukkan nama dan kunci aktivasi Anda untuk mengakses fitur penuh.
                </p>
                <p className="text-sm italic text-gray-400 mb-8">
                    Setiap kunci aktivasi berlaku untuk jumlah perangkat tertentu yang Anda beli. Jika Anda membutuhkan akses di lebih banyak perangkat, mohon hubungi kami untuk informasi penawaran khusus.
                </p>

                
            </div>
           
            
        </div>
    );
};
// --- Definisikan data jam galau di luar komponen SadHourReminder ---
// Ini akan membuat data ini tersedia dan tidak diinisialisasi ulang
const defaultSadHoursData = [
    { 
        id: 'subuh-dhuha', 
        start: 6, end: 9, // 06:00 - 08:59 (Setelah Subuh, waktu Dhuha)
        message: "jiwa yang bersih.berkah mengalir. Mari sucikan hati dan bersyukur."
    },
    { 
        id: 'menjelang-zuhur', 
        start: 11, end: 14, // 11:00 - 13:59 (Menjelang/Setelah Zuhur, waktu istirahat)
        message: "Rehat sejenak, tenangkan pikiran. Mari sejenak merenung dan lepaskan beban."
    },
    { 
        id: 'asar-sore', 
        start: 15, end: 17, // 15:00 - 16:59 (Waktu Asar, sore hari)
        message: " Ambil waktu jeda, pulihkan batin. Mari afirmasi kelimpahan dan ketenangan."
    },
    { 
        id: 'habis-isya', 
        start: 20, end: 22, // 20:00 - 21:59 (Malam, setelah Isya)
        message: "saatnya kembali ke diri. Bersyukurlah atas hari ini. Mari persiapkan hati untuk esok yang lebih baik."
    },
    { 
        id: 'insomnia-dini-hari', 
        start: 0, end: 4, // 00:00 - 03:59 (Tengah malam, jam insomnia)
        message: "Tenangkan jiwamu. Ada ketenangan di balik kegelisahan. Mari lepaskan dan isi energi positif."
    }
];

// --- KOMPONEN BARU: SAD HOUR REMINDER / NOTIFIKASI JAM GALAU (FIXED) ---
const SadHourReminder = ({ onClose, onNavigateToRoom }) => {
    const [currentReminderMessage, setCurrentReminderMessage] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [displayedUserName, setDisplayedUserName] = useState('');
    const [savedGoals, setSavedGoals] = useState([]); // State untuk daftar Goal

    useEffect(() => {
        const storedUserName = localStorage.getItem('ebookUserName');
        if (storedUserName) {
            setDisplayedUserName(storedUserName);
        }

        // MODIFIKASI INI: Langsung tampilkan pop-up saat komponen dimuat
        setIsVisible(true);
        
        // Pilih pesan pengingat acak dari defaultSadHoursData untuk ditampilkan
        const randomDefaultMessage = defaultSadHoursData[Math.floor(Math.random() * defaultSadHoursData.length)].message;
        setCurrentReminderMessage(randomDefaultMessage);

        // Ambil daftar goal dari localStorage
        const storedGoals = JSON.parse(localStorage.getItem('customReminders')) || [];
        setSavedGoals(storedGoals);
        
        // Hapus logika interval checkSadHour dan removeItem('lastSadHourReminder')
        // karena sekarang pop-up ini selalu muncul di awal dan tidak berdasarkan jam.
        // Tidak perlu ada clearInterval karena tidak ada setInterval.
    }, []); // Dependencies kosong agar hanya jalan sekali saat mount

    if (!isVisible || !currentReminderMessage) {
        return null;
    }

    const finalMessage = displayedUserName
        ? `Hai ${displayedUserName}, ${currentReminderMessage}`
        : `Hai Sahabat, ${currentReminderMessage}`;

    return (
        <div
            className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white
            p-4 rounded-lg shadow-xl z-50 animate-slide-up max-w-sm text-center"
        >
            <p className="mb-3 text-lg font-semibold text-yellow-300">💡 Pengingat & Akses Cepat</p>
            <p className="mb-4 text-gray-200 leading-snug text-sm">
                {finalMessage}
            </p>

            {/* Bagian baru untuk menampilkan daftar Bucket Goal */}
            {savedGoals.length > 0 && (
                <div className="mt-4 p-3 bg-gray-700 rounded-md">
                    <p className="font-semibold text-yellow-200 mb-2">Daftar Goal Anda:</p>
                    <ul className="list-disc list-inside text-sm text-gray-200 text-left max-h-24 overflow-y-auto">
                        {savedGoals.map((goal, index) => (
                            <li key={index}>{goal}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Tombol-tombol akses cepat */}
            <div className="flex flex-col gap-3 mt-4"> {/* Menggunakan flex-col untuk tombol */}
                <button
                    onClick={() => {
                        onNavigateToRoom('pixel-thoughts'); 
                        setIsVisible(false); 
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs transition-colors"
                >
                    Ruang Pelepasan ✨
                </button>
                <button
                    onClick={() => {
                        onNavigateToRoom('affirmation-room'); 
                        setIsVisible(false); 
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-xs transition-colors"
                >
                    Ruang Afirmasi 🌟
                </button>

                <button
                    onClick={() => {
                        onNavigateToRoom('secret-room-rezeki');
                        setIsVisible(false);
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2
rounded-lg text-sm transition-colors"
                >
                    Ruang Rahasia ✨
                </button>
                <button
                    onClick={() => {
                        onNavigateToRoom('doapilihan'); // Ini adalah "Doa Pilihan (Kelapangan Rezeki dan Pelunasan Utang)"
                        setIsVisible(false);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2
rounded-lg text-sm transition-colors"
                >
                    Doa Lunas Utang & Rezeki 💰
                </button>
                <button
                    onClick={() => {
                        onNavigateToRoom('doa-loa-codex');
                        setIsVisible(false);
                    }}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2
rounded-lg text-sm transition-colors"
                >
                    Doa LoA Codex 🌟
                </button>
    
                <button
                       onClick={() => {
                        onNavigateToRoom('daftar-isi'); // <-- UBAH INI
                        setIsVisible(false);
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2
rounded-lg text-sm transition-colors"
                >
                    Tutup & Masuk Ke Daftar Isi
                </button>
            </div>
        </div>
    );
};




// --- FUNGSI PEMBANTU UNTUK FULLSCREEN ---
const openFullscreen = (elem) => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

const closeFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}
// --- Styling Constants ---
const contentContainerClasses = "p-6 md:p-10 [background-color:rgba(254,243,199,var(--content-bg-opacity))] backdrop-blur-sm rounded-3xl shadow-lg animate-fade-in mb-8";  // <-- DARI bg-white MENJADI bg-stone-100
const sectionTitleClasses = "text-2xl md:text-3xl font-bold text-center text-black-800 mb-6 border-b-2 pb-2 border-black-200";
const paragraphClasses = "dynamic-paragraph text-black-1000 leading-loose mb-4 text-justify[text-shadow:1px_1px_3px_rgba(0,0,0,0.7)]";
const highlightTextClasses = "text-blue-600 font-semibold";
const quoteClasses = "italic text-gray-600 border-l-4 border-blue-400 pl-4 py-2 my-4 text-justify";
const subHeadingClasses = "text-xl font-bold text-gray-800 mb-3 mt-6";
const arabicTextClass = "font-serif text-2xl";

// --- KOMPONEN BARU UNTUK HALAMAN KATA PENGANTAR ---
const KataPengantar = () => {
    const { setCurrentPageKey } = useContext(AppContext);

    return (
        <div className={contentContainerClasses}>
            <h4 className={`${sectionTitleClasses} text-left`}>✍️ KATA PENGANTAR</h4>
            <p className={`${paragraphClasses}`}>Selamat datang di buku ini. Sebuah peta batin yang tidak menggurui, tapi menawarkan satu kemungkinan arah pulang—ke dalam. Ke tempat yang tenang di balik segala keramaian. Ke hati yang tahu meski sering diabaikan.</p>
            <p className={`${paragraphClasses}`}>Di dunia yang serba cepat, penuh notifikasi dan tagihan, kita butuh sesuatu yang tidak sekadar menenangkan—tapi membebaskan. E-Book Interactive ini bukan sekadar E-Book motivasi. Ia lebih seperti kawan cerita yang mau duduk bareng sambil berkata, "Yuk, kita beresin hati pelan-pelan."</p>
            <p className={`${paragraphClasses}`}>Di dalamnya, Anda tidak hanya akan membaca tentang hati, akal, intuisi, atau metode Kawrooh. Anda akan diajak mengalami—merenung, melepaskan, menyambung ulang. Ini adalah bagian dari perjalanan memahami <b>"Law of Allah" (Hukum-Hukum Allah)</b>, yaitu rumus-rumus tak tergoyahkan untuk keselamatan dunia dan akhirat. Seperti hukum gravitasi yang mengatur alam semesta, ada pula hukum-hukum ilahi yang mengatur batin dan keberuntungan hidup kita.</p>
            <p className={`${paragraphClasses}`}>Hukum-hukum ini terwujud dalam laku sehari-hari: kemampuan kita untuk <b>Bersyukur</b> atas setiap nikmat, <b>Bertawakal</b> sepenuhnya pada rencana-Nya, menjaga <b>Amanah</b> dalam setiap peran, selalu <b>Khusnudzon</b> (berprasangka baik) kepada Allah dan sesama, menjauhi <b>iri dengki</b> yang mengikis hati, dan mengendalikan <b>amarah</b> yang merusak. Kunci dari semua itu berpusat pada satu inti: menjaga hati.</p>
            <p className={`${paragraphClasses}`}>Ingatlah firman-Nya: <b>"Pada hari itu harta dan anak-anak laki-laki tidak berguna, kecuali orang-orang yang menghadap Allah dengan hati yang bersih." (QS. Asy-Syu'ara: 88-89).</b> Hati yang selamat, yang bersih dari penyakit dan terhubung dengan kebenaran, adalah magnet bagi inayah (pertolongan) dan karunia Allah. Saat hati kita beres, barulah semesta akan berpihak.</p>
            <p className={`${paragraphClasses}`}>Bukan sekadar teori. <b>Ini E-book untuk dipraktikkan, bukan hanya dikoleksi.</b> Semoga setiap bab-nya membawa Anda <b>lebih dekat pada rasa tenteram, lebih jujur pada diri sendiri, lebih terbuka pada limpahan karunia-Nya, sehingga pintu rezeki terbuka, dan hidup penuh keberkahan</b>. Selamat menyelami.</p>
            {/* Tombol baru untuk lanjut ke Daftar Isi */}
            <div className="text-center mt-10">
                <button
                    onClick={() => setCurrentPageKey('daftar-isi')}
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                    Siap Untuk Kembali Ke Dalam Keberlimpahan...
                </button>
            </div>
            <AuthorFootnote />
        </div>
    );
};
// --- KOMPONEN YANG HILANG: CATATAN KAKI PENGARANG ---
const AuthorFootnote = () => (
    <div className="text-center mt-12 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500 italic">
            Karya: Akasha Bayu Sasmita
        </p>
    </div>
);

// ### GANTI SELURUH KOMPONEN HOME ANDA DENGAN VERSI BARU INI ###
const DaftarIsi = () => {
    const { setCurrentPageKey } = useContext(AppContext);
    
    // Style tombol yang lama kita pindah ke sini
    const tocSectionClasses = "block w-full text-left font-bold text-lg text-black-700 p-2 rounded-lg hover:bg-black-100 transition-colors";
    const tocChapterClasses = "block w-full text-left text-gray-700 p-2 pl-4 rounded-lg hover:bg-sky-100 transition-colors";
    const tocFeatureClasses = "block w-full text-left font-bold text-xl p-2 rounded-lg hover:bg-yellow-100 transition-colors";

    return (
        // div pembungkusnya sekarang kita pindah ke ChapterWrapper
        <div className={contentContainerClasses}>
            <h4 className={`${sectionTitleClasses} text-left`}>📑 DAFTAR ISI</h4>
            <ul className="space-y-1">
                {/* ... (seluruh <ul> daftar isi Anda tidak berubah, letakkan di sini) ... */}
                 <li><button onClick={() => setCurrentPageKey('bab1')} className={tocSectionClasses}>Bagian I: Dunia Ribut, Hati Harus Tenang</button>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li><button onClick={() => setCurrentPageKey('bab1')} className={tocChapterClasses}>1. Dunia Boleh Heboh, Tapi Kita Jangan Hilang Arah</button></li>
                            <li><button onClick={() => setCurrentPageKey('bab2')} className={tocChapterClasses}>2. Kita Ini Mau Ke Mana Sebenarnya?</button></li>
                        </ul>
                    </li>
                    <li><button onClick={() => setCurrentPageKey('bab3')} className={tocSectionClasses}>Bagian II: Membedah Dalam Diri</button>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li><button onClick={() => setCurrentPageKey('bab3')} className={tocChapterClasses}>3. Hati: Singgasana Cahaya yang Terlupakan</button></li>
                            <li><button onClick={() => setCurrentPageKey('bab4')} className={tocChapterClasses}>4. Akal: Satpam atau Penjaga Gerbang Ilahi?</button></li>
                            <li><button onClick={() => setCurrentPageKey('bab5')} className={tocChapterClasses}>5. Intuisi: Bahasa Lembut yang Kita Abaikan</button></li>
                        </ul>
                    </li>
                    <li><button onClick={() => setCurrentPageKey('bab6')} className={tocSectionClasses}> Bagian III: Kecerdasan Hati dan Koherensi Diri</button>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li><button onClick={() => setCurrentPageKey('bab6')} className={tocChapterClasses}> 6.HeartMath dan Koherensi: Saat Hati dan Otak Berdamai</button></li>
                            <li><button onClick={() => setCurrentPageKey('bab7')} className={tocChapterClasses}> 7.Janin pun Tahu: Jantung Lebih Dulu dari Otak</button></li>
                                              </ul>
                    </li>

                    <li><button onClick={() => setCurrentPageKey('bab8')} className={tocSectionClasses}> Bagian IV: Kawrooh – Metode Menjernihkan Hati</button>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li><button onClick={() => setCurrentPageKey('bab8')} className={tocChapterClasses}> 8. Kawrooh: Ilmu Melepas Tanpa Drama</button></li>
                            <li><button onClick={() => setCurrentPageKey('bab9')} className={tocChapterClasses}> 9. Langkah-Langkah Kawrooh (di sertakan audio contoh pelepasan emosi)</button></li>
                                              </ul>
                    </li>

                    <li><button onClick={() => setCurrentPageKey('bab10')} className={tocSectionClasses}> Bagian V: Praktik Inti Spiritualitas Islam</button>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li><button onClick={() => setCurrentPageKey('bab10')} className={tocChapterClasses}> 10. Sholawat: Jalan Cepat Menuju Cahaya (di sertai audio sholawat pilihan)</button></li>
                            <li><button onClick={() => setCurrentPageKey('bab11')} className={tocChapterClasses}>11. Afirmasi, Dzikir, Doa, dan Amal Saleh: Nafas Penyerahan Diri</button></li>
                                              </ul>
                    </li>
              
                    <li><button onClick={() => setCurrentPageKey('bab12')} className={tocSectionClasses}> Bagian VI: Jalan Pulang ke Dalam</button>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li><button onClick={() => setCurrentPageKey('bab12')} className={tocChapterClasses}> 12.Membersihkan Kaca Jiwa: Tazkiyatun Nafs</button></li>
                            <li><button onClick={() => setCurrentPageKey('bab13')} className={tocChapterClasses}>13. Praktik-Praktik Spiritual Harian</button></li>
                                              </ul>
                    </li>
              
<li><button onClick={() => setCurrentPageKey('bab14')} className={tocSectionClasses}> Bagian VII: Spiritualitas dan Hukum Kehidupan</button>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li><button onClick={() => setCurrentPageKey('bab14a')} className={tocChapterClasses}> 14.a Law of Attraction: Versi Langit Bukan Versi Afirmasi</button></li>
                            <li><button onClick={() => setCurrentPageKey('bab14b')} className={tocChapterClasses}>14.b Tanda-tanda Datangnya Kelimpahan</button></li>
                                              </ul>
                    </li>
                    
                    <li><button onClick={() => setCurrentPageKey('bab15')} className={tocSectionClasses}> Bagian Penutup: Kompas Kehidupan</button>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li><button onClick={() => setCurrentPageKey('bab15')} className={tocChapterClasses}> 15. Merangkai Semua: Dari Kesadaran Menuju Kehidupan Berkah</button></li>
                            
                                              </ul>
                    </li>
              <li><button onClick={() => setCurrentPageKey('bab16')} className={tocSectionClasses}>Bab Tambahan: 369 Tesla × 369 Law of Allah</button></li>
                    <li className="pt-4"><button onClick={() => setCurrentPageKey('pixel-thoughts')} className={`${tocFeatureClasses} golden-background text-yellow-600`}>Ruang Pelepasan (Lepaskan Beban)</button></li>
    <li className="pt-2"><button onClick={()=>setCurrentPageKey('affirmation-room')} className={`${tocFeatureClasses} golden-background text-sky-500`}>Ruang Afirmasi / Manifestasi</button></li>
    <li className="pt-2"><button onClick={() => setCurrentPageKey('secret-room-rezeki')} className={`${tocFeatureClasses} golden-background text-purple-500`}>Ruang Rahasia </button></li>

                    <li className="pt-2"><button onClick={() => setCurrentPageKey('doapilihan')} className="text-green-600 hover:underline font-bold text-xl">🙏 Doa-doa Pilihan (Kelapangan Rezeki dan Pelunasan Utang)</button></li>
                    <li className="pt-2"><button onClick={() => setCurrentPageKey('doa-harian')} className="text-emerald-600 hover:underline font-bold text-xl">🤲 Doa Pilihan Khusus</button></li>
              <li className="pt-2"><button onClick={() => setCurrentPageKey('reminder-settings')} className={`${tocFeatureClasses} text-white-200`}>🔔 Bucket List Goal</button></li>
  </ul>
            <AuthorFootnote />
        </div>
    );
}

// --- KOMPONEN BARU UNTUK GRAFIK JANTUNG INTERAKTIF ---
const HeartCoherenceChart = () => {
    const canvasRef = useRef(null);
    const chartInstance = useRef(null);
    // State untuk mengontrol kondisi grafik: kacau (false) atau tenang (true)
    const [isCoherent, setIsCoherent] = useState(false);

    // Fungsi untuk membuat data grafik
    const generateChartData = (coherent) => {
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
                        fill: true,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 2000, // Durasi animasi 2 detik
                        easing: 'easeInOutCubic',
                    },
                    scales: {
                        y: { display: false, min: -15, max: 15 },
                        x: { display: false }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    }
                }
            });
        }
    }, [isCoherent]); // Efek ini akan berjalan setiap kali 'isCoherent' berubah

    return (
        <div className="my-8 p-4 md:p-6 bg-gray-50 rounded-xl shadow-inner border">
            <div className="h-48 md:h-64 relative">
                <canvas ref={canvasRef}></canvas>
            </div>
            <div className="text-center mt-4">
                <p className="mb-3 text-gray-600 italic">
                    {isCoherent 
                        ? "Ini adalah ritme jantung saat Anda merasa damai dan bersyukur." 
                        : "Ini adalah ritme jantung saat Anda merasa stres atau cemas."}
                </p>
                <button
                    onClick={() => setIsCoherent(prevState => !prevState)}
                    className={`px-6 py-2 rounded-full text-white font-semibold shadow-lg transition-all transform hover:scale-105 ${
                        isCoherent ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                    }`}
                >
                    {isCoherent ? "Kembali ke Mode Stres" : "Latih Ketenangan Hati"}
                </button>
            </div>
        </div>
    );
};

// ### GANTI SELURUH RUANG AFIRMASI DENGAN VERSI INI (Tidak Wajib Unggah Gambar) ###
const AffirmationRoom = () => {
    const { setCurrentPageKey } = useContext(AppContext);
    const [phase, setPhase] = useState('input');
    const [affirmationText, setAffirmationText] = useState('');
    const [error, setError] = useState('');
    const audioRef = useRef(null);
    const [isAudioReady, setIsAudioReady] = useState(false);
    
    // uploadedImage dan fileInputRef tetap ada untuk upload manual di Ruang Afirmasi
    const [uploadedImage, setUploadedImage] = useState(null); 
    const fileInputRef = useRef(null); 

    const fixedRainColor = '#E6D2B3'; 

    // NEW: State untuk menyimpan daftar Goal dari ReminderSettings
    // Sekarang hanya akan menyimpan array of strings
    const [savedGoals, setSavedGoals] = useState([]);

    // NEW: Load saved goals from localStorage when component mounts
    useEffect(() => {
        const storedGoals = JSON.parse(localStorage.getItem('customReminders')) || [];
        setSavedGoals(storedGoals); // Ini akan berupa array of strings
    }, []);

    // ... (useEffect untuk audio dan cleanup uploadedImage tidak berubah) ...

    const handleStart = (bypassAudio = false) => { 
        const words = affirmationText.trim().split(/\s+/).filter(Boolean);
        if (words.length === 0) { setError('Mohon masukkan afirmasi Anda.'); return; }
        if (words.length > 15) { setError('Terlalu panjang! Maksimal 15 kata.'); return; }

        setError('');
        setPhase('raining'); 
        
        // Hentikan semua audio lain sebelum memulai afirmasi
        document.querySelectorAll('audio').forEach(otherAudio => {
            if (audioRef.current && otherAudio !== audioRef.current) {
                otherAudio.pause();
                otherAudio.currentTime = 0;
            }
        });

        if (!bypassAudio && audioRef.current) { 
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(e => {
                console.error("Audio Playback Error:", e);
                setError("Gagal memutar audio. Pastikan izinkan autoplay jika diminta.");
                setIsAudioReady(true); 
            });
        } else if (bypassAudio) {
            setIsAudioReady(false); 
        }
    };

    const resetAffirmation = () => {
        if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
        setAffirmationText('');
        setPhase('input');
        setIsAudioReady(false); 
        if (uploadedImage) {
            URL.revokeObjectURL(uploadedImage);
            setUploadedImage(null);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (!file.type.startsWith('image/')) {
                setError('Hanya file gambar yang diizinkan!');
                setUploadedImage(null);
                return;
            }
            // Batasan ukuran file (misal 5MB) di sini lebih fleksibel karena tidak disimpan di localStorage
            if (file.size > 5 * 1024 * 1024) { 
                setError('Ukuran gambar terlalu besar! Maksimal 5 MB.');
                setUploadedImage(null);
                return;
            }

            if (uploadedImage) {
                URL.revokeObjectURL(uploadedImage);
            }
            setUploadedImage(URL.createObjectURL(file)); // Simpan sebagai Object URL sementara
            setError(''); 
        }
    };

    // NEW: Fungsi untuk memuat Goal dari Bucket List (hanya teks)
    const handleLoadFromGoal = (event) => {
        const selectedIndex = event.target.value;
        if (selectedIndex === "") {
            setAffirmationText(''); // Reset teks jika memilih placeholder
            setUploadedImage(null); // Pastikan gambar direset
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
        }
        const selectedGoalText = savedGoals[parseInt(selectedIndex)]; // Ambil teksnya saja
        if (selectedGoalText) {
            setAffirmationText(selectedGoalText);
            setUploadedImage(null); // Penting: reset gambar sebelumnya jika ada
            if (fileInputRef.current) fileInputRef.current.value = "";
            setError('');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 text-white flex flex-col justify-center items-center p-4 overflow-hidden">
            <audio ref={audioRef} src="musik/suara%20ruang%20afirmasi%208d.mp3" preload="auto"></audio>
            
            {uploadedImage ? (
                <img 
                    src={uploadedImage} 
                    alt="Gambar Afirmasi" 
                    className={`custom-affirmation-image ${phase === 'raining' ? 'image-zoom-fade' : ''}`}
                />
            ) : (
                <Starfield /> 
            )}

            {phase === 'raining' && <ZoomingWordBackground customWords={affirmationText.trim().split(/\s+/).filter(Boolean)} rainColor={fixedRainColor} />}
            {phase === 'raining' && <AffirmationFlasher phrase={affirmationText} rainColor={fixedRainColor}/>}
            
            {phase === 'raining' && (
                <div className="absolute top-4 left-4 z-20">
                    <button onClick={resetAffirmation} className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">&larr; Tulis Ulang & Ganti Gambar</button>
                </div>
            )}
            
            <div className="absolute top-4 right-4 z-20">
                <button onClick={() => setCurrentPageKey('daftar-isi')} className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">Kembali ke Daftar Isi &rarr;</button>
            </div>

            <div className="relative z-10 w-full max-w-3xl text-center flex flex-col justify-center items-center">
                {phase === 'input' && (
                    <div className="animate-fade-in w-full px-4">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">Ruang Manifestasi Visual</h1>
                        <p className="mb-6 text-gray-300">Tuliskan doa atau Manifestasi Anda (maks. 15 kata).</p>
                        <textarea value={affirmationText} onChange={(e) => setAffirmationText(e.target.value)}
                             className="w-full max-w-md h-24 bg-gray-800 border border-gray-700 rounded-lg text-xl p-4 focus:outline-none focus:ring-2 focus:ring-sky-500 force-uppercase"
    placeholder="Contoh: Rezeki berlimpah ">
</textarea>
                        <p className={`text-sm mt-2 ${affirmationText.trim().split(/\s+/).filter(Boolean).length > 15 ? 'text-red-500' : 'text-gray-400'}`}>
                            Jumlah Kata: {affirmationText.trim().split(/\s+/).filter(Boolean).length} / 15
                        </p>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        
                        
                        {/* Dropdown untuk memilih dari Bucket List Goal */}
                        {savedGoals.length > 0 && (
                            <div className="mb-6">
                                <label htmlFor="select-goal" className="block text-gray-300 text-lg font-semibold mb-2">Atau Pilih dari Goal Anda:</label>
                                <select 
                                    id="select-goal"
                                    onChange={handleLoadFromGoal}
                                    className="w-full max-w-md h-24 bg-gray-800 border border-gray-700 rounded-lg text-xl p-4 focus:outline-none focus:ring-2 focus:ring-sky-500 force-uppercase"
                                    value="" 
                                >
                                    <option value="" disabled>Pilih Goal yang Tersimpan...</option>
                                    {savedGoals.map((goalText, index) => (
                                        <option key={index} value={index}>{goalText}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Input File untuk Unggah Gambar (Opsional) */}
                        <div className="mb-6">
                            <label htmlFor="image-upload" className="block text-gray-300 text-lg font-semibold mb-2">Pilih Gambar Manifestasi Anda (Opsional):</label>
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                onChange={handleImageUpload}
                                ref={fileInputRef}
                                className="block w-full text-sm text-gray-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100"
                            />
                            
                            
                            {uploadedImage && (
                                <button onClick={() => { URL.revokeObjectURL(uploadedImage); setUploadedImage(null); if(fileInputRef.current) fileInputRef.current.value = ""; }}
                                    className="mt-2 text-red-400 hover:text-red-500 text-sm">Hapus Gambar</button>
                            )}
                        </div>
<button onClick={() => handleStart(false)} disabled={!affirmationText.trim()} 
                            className="mt-8 w-full max-w-sm bg-sky-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-sky-700 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
                            {isAudioReady ? 'Mulai Sesi Afirmasi' : 'Memuat Audio...'}
                        </button>
                        
                        
                        
                        
                    </div>
                )}
                
                {phase === 'finished' && (
                    <div className="animate-fade-in">
                        <h1 className="text-3xl md:text-5xl font-bold mb-6">Sesi Selesai</h1>
                        <p className="mb-8 text-gray-300">Selamat Anda Sudah Siap Mengalirkan dan Menerima Energi Kelimpahan.</p>
                        <button onClick={resetAffirmation}
                            className="bg-sky-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-sky-700 transition-colors">
                            Afirmasi Lagi
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};


// --- KOMPONEN-KOMPONEN UTILITAS ---

// ### GANTI SELURUH KOMPONEN INI DENGAN VERSI BARU INI ###
const IntegratedAudioPlayer = ({ src, text, isLooping = false }) => {
    const audioRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = React.useState(false);

    // Fungsi 'Sapu Bersih' dan pemutaran audio
    const togglePlay = async () => { // Tambahkan async
        if (!audioRef.current || !src) { // Pastikan src tidak kosong
            console.warn("Audio element not ready or src is empty.");
            return;
        }

        const thisAudio = audioRef.current;

        // Jika audio ini sedang berputar, hentikan saja.
        if (isPlaying) {
            thisAudio.pause();
            thisAudio.currentTime = 0;
            return; // Hentikan fungsi di sini
        }

        // --- JURUS SAPU BERSIH GLOBAL UNTUK SEMUA AUDIO ---
        document.querySelectorAll('audio').forEach(otherAudio => {
            if (otherAudio !== thisAudio) {
                otherAudio.pause();
                otherAudio.currentTime = 0;
            }
        });

        // Setel src dan muat audio, lalu coba putar
        thisAudio.src = src;
        thisAudio.load(); // Load the audio content

        try {
            await thisAudio.play();
            setIsPlaying(true);
            console.log("Audio played successfully: " + src);
        } catch (error) {
            console.error("Audio Playback Error for " + src + ":", error);
            setIsPlaying(false);
            // Memberi tahu pengguna jika autoplay diblokir
            if (error.name === "NotAllowedError" || error.name === "AbortError") {
                alert("Pemutaran audio diblokir oleh browser. Mohon izinkan autoplay untuk situs ini atau coba interaksi manual.");
            } else {
                alert("Gagal memutar audio. Pastikan format file cocok atau coba lagi.");
            }
        }
    };

    // Efek untuk memantau status audio
    React.useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        
        audio.loop = isLooping;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => { if(!isLooping) setIsPlaying(false); };
        
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);

        // Cleanup saat komponen unmount
        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
            // Hentikan audio saat komponen di-unmount
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, [src, isLooping]); // Tambahkan src ke dependencies agar useEffect re-run saat src berubah

    return (
        <div onClick={togglePlay} className="flex items-center justify-center gap-4 my-4 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
            <audio ref={audioRef} preload="auto" className="hidden" crossOrigin="anonymous"></audio>
            
            {/* Ikon yang berubah */}
            <div className="text-white">
                {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 animate-pulse text-sky-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3.5a.5.5 0 01.5.5v12a.5.5 0 01-1 0v-12a.5.5 0 01.5-.5zM5.5 6a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8a.5.5 0 01.5-.5zM14.5 6a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8a.5.5 0 01.5-.5z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                )}
            </div>

            {/* Teks dinamis yang berubah */}
            <p className={`text-center text-xl font-serif text-white`}> {text}
            </p>
        </div>
    );
};


// ### GANTI SELURUH KOMPONEN INI DENGAN VERSI BARU YANG LEBIH PINTAR ###
// ### VERSI INI MENINGKATKAN KESTABILAN PEMUTARAN UNTUK INLINE AUDIO ICON ###
// ### DENGAN FOKUS PADA PENGELOLAAN AUTOPLAY POLICY DAN AUDIO CONTEXT ###
const InlineAudioIcon = ({ src, isLooping = false }) => {
    const audioRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isAudioLoadedAndReady, setIsAudioLoadedAndReady] = React.useState(false); // Melacak kesiapan audio
    const [showUserInteractionPrompt, setShowUserInteractionPrompt] = React.useState(false); // Untuk tombol "Aktifkan Audio"

    // --- Referensi untuk Web Audio API ---
    const audioContextRef = React.useRef(null);
    const pannerNodeRef = React.useRef(null);
    const sourceNodeRef = React.useRef(null);
    const gainNodeRef = React.useRef(null);
    const panIntervalIdRef = React.useRef(null);

    // Inisialisasi AudioContext dan nodes
    // Kita buat ini jadi `React.useMemo` agar instance-nya tidak berubah antar render
    // tapi tetap diinisialisasi oleh interaksi pertama kali.
    const initAudioNodes = React.useCallback(() => {
        if (audioContextRef.current) return; // Sudah diinisialisasi

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) {
                console.warn("Web Audio API not supported in this browser.");
                return;
            }
            audioContextRef.current = new AudioContext();
            console.log("[InlineAudioIcon Init] AudioContext created (state:", audioContextRef.current.state + ").");

            pannerNodeRef.current = audioContextRef.current.createPanner();
            pannerNodeRef.current.panningModel = 'HRTF';
            pannerNodeRef.current.distanceModel = 'linear';
            pannerNodeRef.current.refDistance = 1;
            pannerNodeRef.current.maxDistance = 1000;
            pannerNodeRef.current.rolloffFactor = 1;

            gainNodeRef.current = audioContextRef.current.createGain();
            gainNodeRef.current.gain.value = 1;

            pannerNodeRef.current.connect(gainNodeRef.current);
            gainNodeRef.current.connect(audioContextRef.current.destination);

            console.log("[InlineAudioIcon Init] PannerNode and GainNode initialized.");

        } catch (e) {
            console.error("[InlineAudioIcon Init] Failed to create AudioContext or Web Audio nodes:", e);
            audioContextRef.current = null;
            pannerNodeRef.current = null;
            gainNodeRef.current = null;
        }
    }, []); // Dependencies kosong, jadi memoized

    // Fungsi untuk memulai efek panning 8D
    const startPanning = React.useCallback(() => {
        const panner = pannerNodeRef.current;
        const gainNode = gainNodeRef.current;
        if (!panner || !gainNode) {
            console.warn("Panner or GainNode not available for panning. Cannot start 8D effect.");
            return;
        }

        let time = 0;
        const cycleDuration = 10000;
        const maxDistance = 15;

        if (panIntervalIdRef.current) {
            clearInterval(panIntervalIdRef.current);
        }

        panIntervalIdRef.current = setInterval(() => {
            const normalizedTime = (time % cycleDuration) / cycleDuration;
            const x = maxDistance * Math.sin(2 * Math.PI * normalizedTime);
            const z = -maxDistance * Math.cos(2 * Math.PI * normalizedTime);

            panner.positionX.value = x;
            panner.positionY.value = 0;
            panner.positionZ.value = z;

            const volume = 0.5 + 0.5 * ((z + maxDistance) / (2 * maxDistance));
            gainNode.gain.value = volume;

            time += 50;
        }, 50);
        console.log("8D Panning started.");
    }, []);

    // Fungsi untuk menghentikan panning
    const stopPanning = React.useCallback(() => {
        if (panIntervalIdRef.current) {
            clearInterval(panIntervalIdRef.current);
            panIntervalIdRef.current = null;
            if (pannerNodeRef.current && gainNodeRef.current) {
                pannerNodeRef.current.positionX.value = 0;
                pannerNodeRef.current.positionY.value = 0;
                pannerNodeRef.current.positionZ.value = 0;
                gainNodeRef.current.gain.value = 1;
            }
            console.log("8D Panning stopped and reset.");
        }
    }, []);

    // Fungsi utama toggle play/pause
    const togglePlay = async (e) => {
        e.stopPropagation(); // Mencegah event klik menyebar ke akordeon

        const thisAudio = audioRef.current;
        if (!thisAudio || !src) {
            console.warn("Audio element not ready or src is empty for InlineAudioIcon. Skipping play.");
            return;
        }

        // Jika audio ini sedang berputar, hentikan saja
        if (isPlaying) {
            thisAudio.pause();
            thisAudio.currentTime = 0;
            stopPanning();
            return;
        }

        // --- JURUS SAPU BERSIH GLOBAL UNTUK SEMUA AUDIO LAIN ---
        document.querySelectorAll('audio').forEach(otherAudio => {
            if (otherAudio !== thisAudio) {
                otherAudio.pause();
                otherAudio.currentTime = 0;
            }
        });
        
        // Pastikan AudioContext diinisialisasi
        initAudioNodes(); // Coba inisialisasi/ambil lagi AudioContext
        const audioContext = audioContextRef.current;
        const panner = pannerNodeRef.current;
        const gainNode = gainNodeRef.current;

        // Penting: Resume AudioContext jika suspended
        if (audioContext && audioContext.state === 'suspended') {
            try {
                await audioContext.resume();
                console.log("AudioContext resumed by user interaction for InlineAudioIcon.");
            } catch (e) {
                console.error("Error resuming AudioContext for InlineAudioIcon:", e);
                // Tampilkan prompt ke pengguna untuk interaksi lebih lanjut jika diperlukan
                setShowUserInteractionPrompt(true); // Tampilkan tombol interaksi
                alert("Browser memblokir pemutaran audio otomatis. Mohon klik OK atau sentuh layar untuk mengaktifkan audio.");
                return; // Berhenti di sini, menunggu interaksi tambahan
            }
        }
        
        // Setel SRC dan muat audio, lalu tunggu hingga siap diputar
        thisAudio.src = src;
        thisAudio.load(); 

        try {
            // Tunggu hingga audio bisa diputar sepenuhnya
            await new Promise((resolve, reject) => {
                if (thisAudio.readyState >= 3) { // HAVE_FUTURE_DATA atau HAVE_ENOUGH_DATA
                    resolve();
                } else {
                    const handleCanPlayThrough = () => {
                        thisAudio.removeEventListener('canplaythrough', handleCanPlayThrough);
                        thisAudio.removeEventListener('error', handleError);
                        resolve();
                    };
                    const handleError = (e) => {
                        thisAudio.removeEventListener('canplaythrough', handleCanPlayThrough);
                        thisAudio.removeEventListener('error', handleError);
                        console.error("Audio loading error event:", e);
                        reject(new Error("Failed to load audio resource."));
                    };
                    thisAudio.addEventListener('canplaythrough', handleCanPlayThrough);
                    thisAudio.addEventListener('error', handleError);
                }
            });
            setIsAudioLoadedAndReady(true);
            console.log(`Audio for ${src} is fully loaded and ready.`);

            // Coba putar audio dengan Web Audio API
            if (audioContext && panner && gainNode) {
                if (!sourceNodeRef.current || sourceNodeRef.current.mediaElement !== thisAudio) {
                    if (sourceNodeRef.current) {
                        sourceNodeRef.current.disconnect();
                        sourceNodeRef.current = null;
                    }
                    sourceNodeRef.current = audioContext.createMediaElementSource(thisAudio);
                    sourceNodeRef.current.connect(panner);
                    console.log("[InlineAudioIcon] MediaElementSourceNode created and connected to panner.");
                }
                thisAudio.loop = isLooping;
                await thisAudio.play();
                setIsPlaying(true);
                startPanning();
                console.log("Web Audio API playback started for: " + src);
            } else { // Fallback jika Web Audio API tidak berfungsi
                console.warn("Web Audio API not fully initialized or supported, falling back to direct HTML audio.");
                thisAudio.loop = isLooping;
                await thisAudio.play();
                setIsPlaying(true);
                console.log("Direct HTML audio playback started for: " + src);
            }
            setShowUserInteractionPrompt(false); // Sembunyikan prompt jika sukses

        } catch (error) {
            console.error("Audio Playback/Load Error for InlineAudioIcon " + src + ":", error);
            setIsPlaying(false);
            stopPanning();
            if (error.name === "NotAllowedError" || error.name === "AbortError" || error.message === "Failed to load audio resource.") {
                // Ini adalah error akibat autoplay policy atau gagal load
                setShowUserInteractionPrompt(true); // Tampilkan prompt agar user klik
                alert("Gagal memutar audio. Browser memblokir pemutaran otomatis atau file tidak dapat dimuat. Mohon klik 'Aktifkan Audio' jika muncul.");
            } else {
                alert("Terjadi kesalahan tak terduga saat memutar audio. Silakan coba lagi.");
            }
        }
    };

    // Global listener untuk mengaktifkan AudioContext jika suspended
    // Ini adalah fallback jika `resume()` di `togglePlay` gagal
    React.useEffect(() => {
        const handleFirstInteraction = () => {
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume().then(() => {
                    console.log("Global AudioContext resumed by first document click/touch.");
                }).catch(e => console.error("Error resuming global AudioContext:", e));
            }
            // Hapus listener setelah interaksi pertama
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
        };

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);

        return () => {
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
        };
    }, []);


    // Efek untuk memantau status audio
    React.useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        
        audio.loop = isLooping;

        const handlePlayEvent = () => setIsPlaying(true);
        const handlePauseEvent = () => { setIsPlaying(false); stopPanning(); };
        const handleEndedEvent = () => { 
            if(!isLooping) handlePauseEvent(); 
        };
        const handleLoadedDataEvent = () => { setIsAudioLoadedAndReady(true); };
        const handleErrorEvent = (e) => { 
            console.error(`Audio event error for ${src}:`, e.target.error);
            setIsAudioLoadedAndReady(false);
            setIsPlaying(false);
            stopPanning();
        };

        audio.addEventListener('play', handlePlayEvent);
        audio.addEventListener('pause', handlePauseEvent);
        audio.addEventListener('ended', handleEndedEvent);
        audio.addEventListener('loadeddata', handleLoadedDataEvent);
        audio.addEventListener('error', handleErrorEvent);

        // Cleanup saat komponen di-unmount
        return () => {
            audio.removeEventListener('play', handlePlayEvent);
            audio.removeEventListener('pause', handlePauseEvent);
            audio.removeEventListener('ended', handleEndedEvent);
            audio.removeEventListener('loadeddata', handleLoadedDataEvent);
            audio.removeEventListener('error', handleErrorEvent);
            
            if (audio) { audio.pause(); audio.currentTime = 0; }
            stopPanning();
            if (sourceNodeRef.current) {
                sourceNodeRef.current.disconnect();
                sourceNodeRef.current = null;
            }
        };
    }, [src, isLooping, stopPanning, startPanning]); // Dependencies yang lengkap

    return (
        <button onClick={togglePlay} className="inline-flex items-center gap-2 ml-3 text-gray-500 hover:text-blue-600 transition-colors" title={isPlaying ? "Hentikan Audio" : "Putar Audio"}>
            <audio ref={audioRef} preload="auto" className="hidden" crossOrigin="anonymous"></audio>
            
            {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3.5a.5.5 0 01.5.5v12a.5.5 0 01-1 0v-12a.5.5 0 01.5-.5zM5.5 6a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8a.5.5 0 01.5-.5zM14.5 6a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8a.5.5 0 01.5-.5z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
            )}

            <span className="text-xs font-semibold">
                {isPlaying ? 'Sedang Mendengar...' : (isAudioLoadedAndReady ? 'Dengarkan' : 'Memuat...')}
            </span>

            {/* Tombol Prompt Interaksi Pengguna (Opsional, jika masalah autoplay parah) */}
            {/* Ini akan muncul di dalam ikon play/pause jika audio diblokir */}
            {showUserInteractionPrompt && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 rounded-full text-xs text-white z-10 p-1"
                    onClick={(e) => { // Mencegah klik menyebar ke togglePlay lagi
                        e.stopPropagation();
                        togglePlay(e); // Coba play lagi setelah klik prompt
                        setShowUserInteractionPrompt(false);
                    }}>
                    Klik!
                </div>
            )}
        </button>
    );
};

// --- KOMPONEN BARU UNTUK AKORDEON SHOLAWAT ---
const SholawatAccordion = ({ title, audioSrc, arabicText, latinText, translationText, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl mb-4 border border-white/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex justify-between items-center text-left"
      >
        <h4 className="text-lg font-bold text-Yellow">{title}</h4>
        <div className="flex items-center">
          <InlineAudioIcon src={audioSrc} isLooping={true} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 text-brown transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div 
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden"> {/* Div ini penting untuk animasi grid */}
          <div className="p-4 border-t border-white/20">
            <p className={`${paragraphClasses} text-center text-xl ${arabicTextClass} text-black`}>{arabicText}</p>
            <p className={`${paragraphClasses} text-center italic text-black-300`}>{latinText}</p>
            <p className={`${paragraphClasses} text-Yellow-200`}><b>Terjemahan:</b> {translationText}</p>
            <div className="mt-4 border-t border-dashed border-black/30 pt-4">
              <h5 className="text-md font-bold text-yellow-300 mb-2">Fadhilah & Anjuran:</h5>
              <div className="text-black-200 space-y-2 text-sm break-words">
                  {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// --- KOMPONEN BARU UNTUK AKORDEON DOA ---
const DoaAccordion = ({ title, audioSrc, arabicText, latinText, translationText, benefitsText ,isLooping}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl mb-4 border border-white/20">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 flex justify-between items-center text-left"
            >
                <h4 className="text-lg font-bold text-black">{title}</h4> {/* Changed text-Yellow to text-black for better contrast */}
                <div className="flex items-center">
                    <InlineAudioIcon src={audioSrc} isLooping={isLooping} /> {/* Doa usually isn't looped */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 text-black transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="p-4 border-t border-white/20">
                        <p className={`${paragraphClasses} text-center text-xl ${arabicTextClass} text-black`}>{arabicText}</p>
                        <p className={`${paragraphClasses} text-center italic text-black-300`}>{latinText}</p>
                        <p className={`${paragraphClasses} text-black-800`}><b>Terjemahan:</b> {translationText}</p>
                        <div className="mt-4 border-t border-dashed border-black/30 pt-4">
                            <h5 className="text-md font-bold text-black-800 mb-2">Manfaat:</h5>
                            <p className="text-black-200 space-y-2 text-sm break-words">{benefitsText}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
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
                    speed: Math.random() * 0.2 + 0.1
                });
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
    return <canvas id="starfield" ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></canvas>;
};
// --- KOMPONEN BARU: AmbientSoundAccordion untuk Ruang Rahasia ---
const AmbientSoundAccordion = ({ sound, selectedBackgroundSound, setSelectedBackgroundSound, isBackgroundPlaying, onStartSession }) => {
    const audioPreviewRef = useRef(null);
    const [isPlayingPreview, setIsPlayingPreview] = useState(false);

    const togglePreview = (e) => {
        e.stopPropagation(); // Mencegah akordeon tertutup saat tombol diklik
        const audio = audioPreviewRef.current;
        if (!audio) return;

        // Hentikan semua audio preview lainnya
        document.querySelectorAll('audio[id="preview-audio"]').forEach(otherAudio => {
            if (otherAudio !== audio && !otherAudio.paused) {
                otherAudio.pause();
                otherAudio.currentTime = 0;
            }
        });

        // Jika suara ambient ini yang sedang diputar sebagai background utama, hentikan
        if (selectedBackgroundSound === sound.src && isBackgroundPlaying) {
            setSelectedBackgroundSound(''); // Hentikan background utama
            setIsPlayingPreview(false); // Pastikan status preview juga mati
            return;
        }

        // Jika audio ini sedang diputar sebagai preview, pause
        if (isPlayingPreview) {
            audio.pause();
            audio.currentTime = 0;
        } else {
            // Jika belum diputar, set src dan play
            audio.src = sound.src;
            audio.load(); // Penting untuk memuat ulang jika src berubah
            audio.play().then(() => {
                setIsPlayingPreview(true);
            }).catch(e => {
                console.error("Error playing ambient preview audio:", e);
                alert("Gagal memutar preview audio. Mohon izinkan autoplay.");
            });
        }
    };

    useEffect(() => {
        const audio = audioPreviewRef.current;
        if (!audio) return;

        const handlePlay = () => setIsPlayingPreview(true);
        const handlePause = () => setIsPlayingPreview(false);
        const handleEnded = () => setIsPlayingPreview(false);

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
            if (audio) { audio.pause(); audio.currentTime = 0; } // Bersihkan saat unmount
        };
    }, [sound.src]); // Re-run effect if sound.src changes

    // Update isPlayingPreview berdasarkan selectedBackgroundSound
    useEffect(() => {
        if (selectedBackgroundSound === sound.src && isBackgroundPlaying) {
            setIsPlayingPreview(true);
        } else {
            setIsPlayingPreview(false);
        }
    }, [selectedBackgroundSound, isBackgroundPlaying, sound.src]);


    return (
        <div className="bg-gray-700 rounded-lg shadow-md mb-2">
            <div className="p-3 flex justify-between items-center text-left">
                <span className="text-lg font-semibold text-white">{sound.name}</span>
                <div className="flex items-center gap-2">
                    {sound.src && ( // Hanya tampilkan tombol preview jika ada src audio
                        <button
                            onClick={togglePreview}
                            className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-full transition-colors"
                            title={isPlayingPreview ? "Hentikan Preview" : "Dengarkan Preview"}
                        >
                            {isPlayingPreview ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 3.5a.5.5 0 01.5.5v12a.5.5 0 01-1 0v-12a.5.5 0 01.5-.5zM5.5 6a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8a.5.5 0 01.5-.5zM14.5 6a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8a.5.5 0 01.5-.5z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                            )}
                            <audio id="preview-audio" ref={audioPreviewRef} preload="auto" loop></audio> {/* Gunakan id agar bisa di-selectAll */}
                        </button>
                    )}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBackgroundSound(sound.src); // Setel ini sebagai background utama
                            onStartSession(); // Lanjutkan ke fase berikutnya
                        }}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-semibold transition-colors"
                        disabled={sound.src === selectedBackgroundSound && isBackgroundPlaying} // Disable jika sudah aktif
                    >
                        {sound.src === selectedBackgroundSound && isBackgroundPlaying ? 'Aktif' : 'Pilih & Mulai'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- KOMPONEN BARU: RUANG RAHASIA MENARIK REZEKI MALAM HARI ---
const SecretRoomRezeki = () => {
    const { setCurrentPageKey } = useContext(AppContext);
    // State untuk mengelola fase saat ini
    const [currentPhase, setCurrentPhase] = useState('time_check'); 
    
    // State untuk mengelola audio utama setiap fase
    const audioReleaseRef = useRef(null);
    const audioManifestationRef = useRef(null);
    const audioGratitudeRef = useRef(null); // <--- KOREKSI INI: CUKUP useRef(null)

    // State untuk melacak apakah audio di fase saat ini sedang bermain
    const [isCurrentAudioPlaying, setIsCurrentAudioPlaying] = useState(false);

    // State untuk audio latar (background ambient sound)
    const backgroundAudioRef = useRef(null);
    const [selectedBackgroundSound, setSelectedBackgroundSound] = useState(''); // URL audio latar
    const [isBackgroundPlaying, setIsBackgroundPlaying] = useState(false);
    const [isCandleLit, setIsCandleLit] = useState(false); // State baru untuk lilin menyala

    // States for Password & Time Check
    // passwordInput, passwordError, CORRECT_PASSWORD dihapus
    const [timeError, setTimeError] = useState('');

    // Allowed time: 12 AM (0) to 4 AM (4). Note: JavaScript uses 0-23 for hours.
    const ALLOW_START_HOUR = 0; // 00:00 (12 AM)
    const ALLOW_END_HOUR = 4;   // 04:00 (4 AM) -- Mengembalikan ke jam 4 pagi sesuai instruksi awal

    // Data audio latar
    const ambientSounds = [
        { name: 'Gamelan Ambient', src: 'musik/GamelanAmbient.mp3' },
    { name: 'Angel Abundance', src: 'musik/AngelAmbient.mp3' },
    { name: 'Singing Bowl', src: 'musik/SingingBowl.mp3' },
    { name: 'Rural Ambience', src: 'musik/RuralAmbient.mp3' },
    { name: 'Hening (Mati)', src: '' }
    ];

    // Audio sources untuk setiap fase utama
    const phaseAudios = {
        release: 'musik/Clearing.mp3',
    manifestation: 'musik/Afirmasi.mp3',
    gratitude: 'musik/Gratitude.mp3',
    };

    // --- FUNGSI-FUNGSI PEMBANTU ---

    // Fungsi untuk menghentikan semua audio utama
    const stopAllPhaseAudios = () => {
        [audioReleaseRef, audioManifestationRef, audioGratitudeRef].forEach(ref => {
            if (ref.current) {
                ref.current.pause();
                ref.current.currentTime = 0;
            }
        });
        setIsCurrentAudioPlaying(false);
    };

    // Fungsi untuk memulai audio fase tertentu (atau memutar ulang)
    const startOrRestartPhaseAudio = (phaseName) => {
        stopAllPhaseAudios();
        
        const audioToPlay = phaseAudios[phaseName];
        let currentAudioRef;

        switch (phaseName) {
            case 'release': currentAudioRef = audioReleaseRef; break;
            case 'manifestation': currentAudioRef = audioManifestationRef; break;
            case 'gratitude': currentAudioRef = audioGratitudeRef; break;
            default: return;
        }

        if (currentAudioRef && currentAudioRef.current && audioToPlay) {
            currentAudioRef.current.src = audioToPlay;
            currentAudioRef.current.load();
            currentAudioRef.current.play()
                .then(() => setIsCurrentAudioPlaying(true))
                .catch(e => console.error(`Error playing ${phaseName} audio:`, e));
        }
    };

    // Fungsi untuk transisi ke fase berikutnya
    const goToNextPhase = (nextPhase) => {
        stopAllPhaseAudios();
        setCurrentPhase(nextPhase);
        if (nextPhase !== 'finished') {
            startOrRestartPhaseAudio(nextPhase);
        }
    };

    // Fungsi untuk memeriksa waktu akses
    const handleTimeCheck = () => {
        const currentHour = new Date().getHours(); 

        const isTimeValid = currentHour >= ALLOW_START_HOUR && currentHour < ALLOW_END_HOUR;

        setTimeError(''); // Reset error messages

        if (!isTimeValid) {
            const formattedStartTime = ALLOW_START_HOUR < 10 ? `0${ALLOW_START_HOUR}` : ALLOW_START_HOUR;
            const formattedEndTime = ALLOW_END_HOUR < 10 ? `0${ALLOW_END_HOUR}` : ALLOW_END_HOUR;
            setTimeError(`Ruangan ini hanya bisa diakses antara pukul ${formattedStartTime}:00 hingga ${formattedEndTime}:00 WIB.`);
            return false; // Mengembalikan false jika waktu tidak valid
        }
        return true; // Mengembalikan true jika waktu valid
    };

    // Auto-check waktu saat komponen dimuat
    useEffect(() => {
        if (!handleTimeCheck()) {
            // Jika waktu tidak valid saat dimuat, maka tetap di time_check
            // Pesan error sudah dihandle oleh handleTimeCheck
        } else {
            setCurrentPhase('intro'); // Jika waktu valid, langsung ke intro
        }
    }, []); // Hanya berjalan sekali saat komponen dimount
    
    // --- AKHIR FUNGSI-FUNGSI PEMBANTU ---

    // Effect untuk mengelola audio latar
    useEffect(() => {
        const audio = backgroundAudioRef.current;
        if (!audio) return;

        audio.loop = true;
        audio.volume = 0.4;

        if (selectedBackgroundSound) {
            audio.src = selectedBackgroundSound;
            audio.play().then(() => setIsBackgroundPlaying(true)).catch(e => console.error("Error playing background audio:", e));
        } else {
            audio.pause();
            setIsBackgroundPlaying(false);
        }

        return () => {
            if (audio) audio.pause();
        };
    }, [selectedBackgroundSound]);

    // Efek untuk memantau status audio dari REF saat ini dan mengatur isCurrentAudioPlaying
    // Serta memicu tampilan tombol "Lanjut" saat audio selesai
    useEffect(() => {
        const refs = {
            'release': audioReleaseRef,
            'manifestation': audioManifestationRef,
            'gratitude': audioGratitudeRef
        };

        const currentRef = refs[currentPhase];
        if (!currentRef || !currentRef.current) return;

        const audio = currentRef.current;

        const handlePlaying = () => setIsCurrentAudioPlaying(true);
        const handlePaused = () => setIsCurrentAudioPlaying(false);
        const handleEnded = () => {
            setIsCurrentAudioPlaying(false);
        };

        audio.addEventListener('play', handlePlaying);
        audio.addEventListener('pause', handlePaused);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('play', handlePlaying);
            audio.removeEventListener('pause', handlePaused);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [currentPhase]); 


    const resetSession = () => {
        stopAllPhaseAudios();
        setCurrentPhase('time_check'); // Kembali ke time_check (atau intro jika tanpa time check)
        setIsCandleLit(false);
        setTimeError(''); // Reset error waktu
        if (backgroundAudioRef.current) {
            backgroundAudioRef.current.pause();
            backgroundAudioRef.current.currentTime = 0;
            setSelectedBackgroundSound('');
            setIsBackgroundPlaying(false);
        }
    };

    const getPhaseTitle = () => {
        switch (currentPhase) {
            case 'time_check': return "Akses Ruang Rahasia"; // Judul untuk pengecekan waktu
            case 'intro': return "Sambutan Malam Kelimpahan";
            case 'idle': return "Pilih Suasana Sesi Anda";
            case 'release': return "Fase 1: Pelepasan Beban";
            case 'manifestation': return "Fase 2: Manifestasi Impian";
            case 'gratitude': return "Fase 3: Syukur Mendalam";
            case 'finished': return "Sesi Selesai. Selamat, Kelimpahan Menanti!";
            default: return "";
        }
    };

    const renderPhaseContent = () => {
        // New: Time Check Phase (menggantikan password_check)
        if (currentPhase === 'time_check') {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();

            const formattedCurrentTime = 
                `${currentHour < 10 ? '0' : ''}${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`;
            
            const isTimeValid = currentHour >= ALLOW_START_HOUR && currentHour < ALLOW_END_HOUR;
            const formattedStartTime = ALLOW_START_HOUR < 10 ? `0${ALLOW_START_HOUR}` : ALLOW_START_HOUR;
            const formattedEndTime = ALLOW_END_HOUR < 10 ? `0${ALLOW_END_HOUR}` : ALLOW_END_HOUR;
            const displayTimeRange = `${formattedStartTime}:00 - ${formattedEndTime}:00`;

            return (
                <div className="animate-fade-in flex flex-col items-center">
                    <p className="mb-4 text-gray-300 text-lg text-center">
                        Ruang Rahasia ini hanya bisa diakses pada waktu tertentu.
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-yellow-300 mb-2">
                        Saat ini Pukul: {formattedCurrentTime} WIB
                    </p>
                    <p className="mb-8 text-gray-400 font-bold text-center">
                        Waktu Akses: {displayTimeRange} WIB
                    </p>
                    
                    {timeError && <p className="text-red-500 mt-2">{timeError}</p>}
                    
                    <button
                        onClick={() => { handleTimeCheck(); }} 
                        disabled={isTimeValid} 
                        className="bg-purple-600 text-white font-bold py-3 px-8 mt-8 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {isTimeValid ? 'Waktu Sesuai, Silakan Lanjut' : 'Periksa Waktu Akses'}
                    </button>
                    {!isTimeValid && <p className="text-gray-400 mt-4">Mohon tunggu hingga waktu akses yang ditentukan.</p>}
                </div>
            );
        }

        if (currentPhase === 'intro') {
            return (
                <div className="animate-fade-in flex flex-col items-center">
                    <p className="mb-8 text-gray-300 text-lg">
                        Selamat datang di Ruang Rahasia Menarik Rezeki Malam Hari.
                        Di sini, kita akan menyelaraskan energi untuk kelimpahan.
                        Mari mulai dengan menyalakan lilin untuk fokus dan ketenangan.
                    </p>
                    <div className={`candle-container ${isCandleLit ? 'lit' : ''}`}>
                        <img src="icons/lilin.png" alt="Batang Lilin" className="candle-image" />
                        {isCandleLit && <div className="flame animate-flicker"></div>}
                    </div>
                    <button
                        onClick={() => { setIsCandleLit(true); setCurrentPhase('idle'); }}
                        className="bg-yellow-500 text-black font-bold py-3 px-8 mt-8 rounded-lg shadow-lg hover:bg-yellow-600 transition-all duration-300"
                    >
                        Nyalakan Lilin ✨
                    </button>
                </div>
            );
        }

        if (currentPhase === 'idle') {
            return (
                <div className="animate-fade-in flex flex-col items-center">
                    <div className={`candle-container ${isCandleLit ? 'lit' : ''} mb-8`}>
                        <img src="https://raw.githubusercontent.com/kesinilagi/asetmusik/main/lilin.png" alt="Batang Lilin" className="candle-image" />
                        {isCandleLit && <div className="flame animate-flicker"></div>}
                    </div>
                    <p className="mb-4 text-gray-300">Lilin sudah menyala. Sekarang, pilih suasana sesi Anda:</p>
                    {/* Menggunakan komponen AmbientSoundAccordion */}
                    <div className="w-full max-w-sm space-y-3">
                        {ambientSounds.map(sound => (
                            <AmbientSoundAccordion
                                key={sound.name}
                                sound={sound}
                                selectedBackgroundSound={selectedBackgroundSound}
                                setSelectedBackgroundSound={setSelectedBackgroundSound}
                                isBackgroundPlaying={isBackgroundPlaying}
                                onStartSession={() => { 
                                    document.querySelectorAll('audio[id="preview-audio"]').forEach(audio => {
                                        audio.pause();
                                        audio.currentTime = 0;
                                    });
                                    goToNextPhase('release'); 
                                }}
                            />
                        ))}
                    </div>
                </div>
            );
        }

        if (currentPhase === 'release' || currentPhase === 'manifestation' || currentPhase === 'gratitude') {
            return (
                <div className="flex flex-col items-center justify-center h-full w-full">
                    <div className={`candle-container ${isCandleLit ? 'lit' : ''}`}>
                        <img src="https://raw.githubusercontent.com/kesinilagi/asetmusik/main/lilin.png" alt="Batang Lilin" className="candle-image" />
                        {isCandleLit && <div className="flame animate-flicker"></div>}
                    </div>

                    <p className="text-sm text-gray-400 mt-8 animate-pulse mb-4">
                        {isCurrentAudioPlaying ? (
                            <>
                                {getPhaseTitle().split(': ')[1]} sedang diputar...
                                <br/>
                                (Audio akan berhenti otomatis saat selesai.)
                            </>
                        ) : (
                            <>
                                Audio selesai.
                            </>
                        )}
                    </p>

                    {!isCurrentAudioPlaying && currentPhase !== 'gratitude' && (
                        <button
                            onClick={() => startOrRestartPhaseAudio(currentPhase)}
                            className="bg-purple-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300"
                        >
                            Ulangi {getPhaseTitle().split(': ')[1]}
                        </button>
                    )}

                    {!isCurrentAudioPlaying && (
                        <>
                            {currentPhase === 'release' && (
                                <button
                                    onClick={() => goToNextPhase('manifestation')}
                                    className="bg-blue-500 text-white font-bold py-3 px-8 mt-4 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
                                >
                                    Lanjut ke Manifestasi ✨
                                </button>
                            )}
                            {currentPhase === 'manifestation' && (
                                <button
                                    onClick={() => goToNextPhase('gratitude')}
                                    className="bg-blue-500 text-white font-bold py-3 px-8 mt-4 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
                                >
                                    Lanjut ke Syukur ❤️
                                </button>
                            )}
                            {currentPhase === 'gratitude' && (
                                <button
                                    onClick={() => goToNextPhase('finished')}
                                    className="bg-green-500 text-white font-bold py-3 px-8 mt-4 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300"
                                >
                                    Selesai Sesi Malam Ini ✅
                                </button>
                            )}
                        </>
                    )}
                </div>
            );
        }

        if (currentPhase === 'finished') {
            return (
                <div className="animate-fade-in flex flex-col items-center">
                    <p className="text-xl mb-6 text-yellow-300">Sesi Telah Selesai! Anda kini selaras dengan Kelimpahan.</p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <button
                            onClick={resetSession}
                            className="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-600 transition-colors"
                        >
                            Mulai Sesi Baru
                        </button>
                        <button
                            onClick={() => { resetSession(); setCurrentPageKey('daftar-isi'); }}
                            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                        >
                            Kembali ke Daftar Isi
                        </button>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="fixed inset-0 bg-gray-900 text-white flex flex-col justify-center items-center p-4 overflow-hidden">
            {/* Latar belakang bintang hanya muncul jika sesi selesai atau saat waktu tidak tepat */}
            {(currentPhase === 'time_check' || currentPhase === 'finished') && <Starfield />}

            {/* Cahaya lilin sebagai overlay */}
            {isCandleLit && (currentPhase !== 'finished' && currentPhase !== 'time_check') && <div className="candle-light-overlay"></div>}
            
            <audio ref={audioReleaseRef} preload="auto"></audio>
            <audio ref={audioManifestationRef} preload="auto"></audio>
            <audio ref={audioGratitudeRef} preload="auto"></audio>
            <audio ref={backgroundAudioRef} preload="auto"></audio>

            <div className="absolute top-4 right-4 z-20">
                <button onClick={() => { resetSession(); setCurrentPageKey('daftar-isi'); }} className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                    Kembali ke Daftar Isi &rarr;
                </button>
            </div>

            <div className={`relative z-10 w-full max-w-3xl text-center flex flex-col justify-center items-center p-8 rounded-xl shadow-lg
                ${(currentPhase === 'intro' || currentPhase === 'idle' || currentPhase === 'finished' || currentPhase === 'time_check') ? 'bg-black/50' : 'bg-black/0'}`}>
                
                {(currentPhase === 'intro' || currentPhase === 'idle' || currentPhase === 'finished' || currentPhase === 'time_check') && (
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 text-yellow-300">
                        {getPhaseTitle()}
                    </h1>
                )}
                
                {renderPhaseContent()}
            </div>
        </div>
    );
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

    return (
        <p
            className="affirmation-flasher"
            style={{
                top: positionTop,
                opacity: isVisible ? 1 : 0,
                  //color: rainColor,
                    textShadow: `0 0 30px `
            }}>
            
            {phrase.toUpperCase()}
        </p>
    );
};

// ### GANTI SELURUH PIXELTHOUGHTS ANDA DENGAN VERSI INI ###
const PixelThoughts = () => {
  const { setCurrentPageKey } = useContext(AppContext);
  const [view, setView] = useState('input');
  const [thought, setThought] = useState('');
  const [message, setMessage] = useState('');
  const [heading, setHeading] = useState('Beban Apa yang saat ini kamu rasakan , pikirkan dan ingin di LEPASKAN?');
  const [animationClass, setAnimationClass] = useState('');
  const audioRef = useRef(null);

  const messages = [
    "Tarik napas dalam-dalam... ",
    "tahan .",
    "Perhatikan pikiran itu menyusut.\nLihatlah ia menjadi kecil dan jauh.....",
    "Ia hanyalah setitik kecil di alam semesta yang luas......",
    "hembuskan nafasmu \nbersama rasa itu",
    "Biarkan ia pergi.",
    "Menghilang di antara bintang-bintang...... \nRasakan kelegaan saat ia menghilang......",
    " ",
    " ",
    "Dari keheningan, aku terbuka. \nDari ketiadaan",
    "aku menerima... ",
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
      if (messages[i] === "Biarkan ia pergi.") {
        setAnimationClass('recede vanish');
      }
      await sleep(i === messages.length - 1 ? 12000 : 5000);
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

  return React.createElement("div", { className: "fixed inset-0 bg-gray-900 text-white flex flex-col justify-start items-center p-4 pt-16 md:pt-20" },
    React.createElement(Starfield, null),
    React.createElement("audio", { ref: audioRef, src: "https://cdn.jsdelivr.net/gh/kesinilagi/asetmusik@main/Afirmasi Pelepasan Panning 3d.mp3", loop: true }),

    // Tombol kembali kita pindah ke bawah agar tidak mengganggu
    React.createElement("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 z-10" },
      React.createElement("button", { onClick: () => setCurrentPageKey('daftar-isi'), className: "bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors" }, "\u2190 Kembali ke Daftar Isi")
    ),

    // --- STRUKTUR BARU DIMULAI DARI SINI ---
    React.createElement("div", { className: "z-10 w-full max-w-2xl text-center flex flex-col items-center" },

      // Area 1: Khusus untuk Teks (Input, Pesan, atau Tombol Selesai)
      React.createElement("div", { className: "w-full h-48 flex flex-col justify-center items-center" },
        view === 'input' && React.createElement("div", { className: "animate-fade-in w-full" },
          React.createElement("h1", { className: "text-3xl md:text-5xl font-bold mb-6" }, heading),
          React.createElement("input", { onKeyPress: handleKeyPress, type: "text", className: "w-full bg-gray-800 border border-gray-700 rounded-lg text-xl md:text-2xl text-center p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 force-uppercase", placeholder: "Ungkapkan Disini...." })
        ),

        view === 'message' && React.createElement("p", { key: message, className: "message-fade-in text-2xl md:text-4xl font-light" }, message),

        view === 'finished' && React.createElement("div", { className: "animate-fade-in" },
          React.createElement("h2", { className: "text-2xl md:text-4xl font-bold mb-8" }, "Pelepasan Selesai. Apa selanjutnya?"),
          React.createElement("div", { className: "flex flex-col md:flex-row gap-4 justify-center" },
            React.createElement("button", { onClick: handleRestart, className: "bg-white/20 px-6 py-3 rounded-lg hover:bg-white/30 transition-colors" }, "Ada Lagi yang Mau Dilepaskan"),
            React.createElement("button", { onClick: () => setCurrentPageKey('affirmation-room'), className: "bg-sky-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-sky-700 transition-colors" }, "Lanjut ke Ruang Afirmasi \u2728")
          )
        )
      ),

      // Area 2: Khusus untuk Gelembung Animasi
      React.createElement("div", { className: "w-full flex justify-center items-center" },
        (view === 'thought' || view === 'message' || view === 'finished') &&
        React.createElement("div", { className: `thought-bubble ${animationClass} glowing-border flex items-center justify-center w-64 h-64 md:w-80 md:h-80 bg-white/80 rounded-full text-center p-6` },
          React.createElement("span", { className: `font-extrabold text-indigo-600 break-words ${thought.length > 40 ? 'text-xl md:text-3xl' : 'text-2xl md:text-4xl'} force-uppercase` },
            thought
          )
        )
      )
    )
  );
};


// QUOTE
const RandomQuote = () => {
    const quotes = ["Ketenangan sejati bukan berarti tanpa badai, tapi menari di tengah badai.", "Hati yang bersyukur adalah magnet bagi keajaiban.", "Lepaskan apa yang tidak bisa kau kendalikan, dan fokus pada apa yang bisa.","Saat aku melepaskan siapa diriku, aku menjadi siapa yang seharusnya kutumbuhkan - Lao TSe","Apa pun yang kamu lawan, akan menguat. Dan apa yang kamu tolak, akan menetap - Eckhart Tolle","Jangan lawan perubahan yang datang. Biarkan hidup mengalir melalui dirimu - Jalaludin Rumi","Ingatlah, hanya dengan mengingat Allah, hati menjadi tenang","Dunia ini hanyalah bayangan. Jika kau kejar, ia akan lari.Tapi jika kau berpaling darinya, ia akan mengikutimu"];
    const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        }, 10000);
        return () => clearInterval(intervalId);
    }, []);
    return (<div className="text-sm italic text-white/70 mt-2 text-center w-full transition-opacity duration-1000">"{quote}"</div>);
};

// --- KOMPONEN HALAMAN & KONTEN ---

const LoginScreen = () => {
    const { setUserName } = useContext(AppContext);
    const [name, setName] = useState('');

    const handleLogin = () => {
        if (name.trim()) {
            const trimmedName = name.trim();
            localStorage.setItem('ebookUserName', trimmedName);
            setUserName(trimmedName);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 text-white flex flex-col justify-center items-center p-4">
            <Starfield />
            <div className="z-10 text-center animate-fade-in">
                 <h1 className="text-4xl md:text-6xl font-bold mb-4">Selamat Datang</h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-300">Silakan masukkan nama Anda untuk memulai.</p>
                <div className="flex">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                        className="bg-gray-800 border border-gray-700 rounded-l-lg text-xl text-center p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Nama Anda..."
                    />
                    <button onClick={handleLogin} className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg hover:bg-indigo-700 font-bold transition-colors">
                        Masuk
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- KOMPONEN BARU: PENGATURAN PESAN REMINDER KUSTOM ---
// --- KOMPONEN BARU: PENGATURAN PESAN REMINDER KUSTOM ---
const ReminderSettings = () => {
    const { setCurrentPageKey } = useContext(AppContext);
    // State untuk menyimpan pesan kustom dari localStorage
    const [customReminders, setCustomReminders] = useState([]);
    const [newReminderText, setNewReminderText] = useState('');
    const [editIndex, setEditIndex] = useState(null); // Index pesan yang sedang diedit

    // Load pesan kustom dari localStorage saat komponen dimuat
    useEffect(() => {
        const storedReminders = JSON.parse(localStorage.getItem('customReminders')) || [];
        setCustomReminders(storedReminders);
    }, []);

    // Simpan pesan kustom ke localStorage setiap kali berubah
    useEffect(() => {
        localStorage.setItem('customReminders', JSON.stringify(customReminders));
    }, [customReminders]);

    const handleAddOrUpdateReminder = () => {
        const trimmedText = newReminderText.trim();
        if (!trimmedText) {
            alert('Pesan tidak boleh kosong!');
            return;
        }

        if (editIndex !== null) {
            // Mode Edit
            const updatedReminders = customReminders.map((reminder, index) =>
                index === editIndex ? trimmedText : reminder
            );
            setCustomReminders(updatedReminders);
            setEditIndex(null); // Reset mode edit
        } else {
            // Mode Tambah Baru
            if (customReminders.length >= 5) { // Batasi maksimal 5 pesan
                alert('Maksimal 5 pesan pengingat yang dapat disimpan.');
                return;
            }
            setCustomReminders([...customReminders, trimmedText]);
        }
        setNewReminderText(''); // Bersihkan input
    };

    const handleEditReminder = (index) => {
        setNewReminderText(customReminders[index]);
        setEditIndex(index);
    };

    const handleDeleteReminder = (indexToDelete) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
            const updatedReminders = customReminders.filter((_, index) => index !== indexToDelete);
            setCustomReminders(updatedReminders);
            // Jika pesan yang diedit dihapus, reset mode edit
            if (editIndex === indexToDelete) {
                setEditIndex(null);
                setNewReminderText('');
            }
        }
    };

    return (
        <div className={contentContainerClasses}>
            <h2 className={`${sectionTitleClasses} text-left`}>📝 LIST GOAL</h2>
            <p className={`${paragraphClasses}`}>
                Anda dapat membuat hingga 5 Daftar Goal.
            </p>

            <div className="mb-6">
                <textarea
                    value={newReminderText}
                    onChange={(e) => setNewReminderText(e.target.value)}
                    placeholder="Tulis Goal Anda di sini (contoh: Umroh tanggal sekian, Hutang Lunas)..."
                    rows="3"
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white resize-y focus:outline-none focus:ring-2 focus:ring-sky-500"
                ></textarea>
                <button
                    onClick={handleAddOrUpdateReminder}
                    className="mt-3 bg-blue-600 text-white font-bold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!newReminderText.trim()}
                >
                    {editIndex !== null ? 'Perbarui Pesan' : 'Tambah Pesan'}
                </button>
                {editIndex !== null && (
                    <button
                        onClick={() => { setEditIndex(null); setNewReminderText(''); }}
                        className="mt-3 ml-2 bg-gray-600 text-white font-bold py-2 px-5 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
                    >
                        Batal Edit
                    </button>
                )}
            </div>

            <h3 className={`${subHeadingClasses}`}>Daftar Pesan Anda ({customReminders.length}/5)</h3>
            {customReminders.length === 0 ? (
                <p className={`${paragraphClasses} italic text-gray-500`}>Belum ada pesan kustom. Tambahkan yang pertama!</p>
            ) : (
                <ul className="space-y-3">
                    {customReminders.map((reminder, index) => (
                        <li key={index} className="bg-gray-700 p-3 rounded-lg flex justify-between items-center text-gray-100 shadow-sm">
                            <span className="flex-grow text-justify pr-2">{reminder}</span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEditReminder(index)}
                                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                                    title="Edit"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.828-2.829z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleDeleteReminder(index)}
                                    className="text-red-400 hover:text-red-500 transition-colors"
                                    title="Hapus"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="text-center mt-10 flex flex-col gap-4"> {/* Menggunakan flex-col dan gap-4 untuk tombol */}
                {/* Tombol Akses Ruang Afirmasi */}
                {customReminders.length > 0 && (
                    <button
                        onClick={() => setCurrentPageKey('affirmation-room')}
                        className="bg-sky-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-sky-700 transition-all duration-300 transform hover:scale-105"
                    >
                        Akses Ruang Afirmasi Anda ✨
                    </button>
                )}

                <button
                    onClick={() => setCurrentPageKey('daftar-isi')}
                    className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                >
                    Kembali ke Daftar Isi
                </button>
            </div>
        </div>
    );
};
const ThemeSettings = () => {
    // 1. Ambil fungsi `setCurrentPageKey` dari Context
    const { themeKey, setThemeKey, themes, setCurrentPageKey,bgOpacity, setBgOpacity } = useContext(AppContext);

    const handleThemeChange = (key) => {
        localStorage.setItem('ebookThemeKey', key);
        setThemeKey(key);
    };

    return (
        <div className={contentContainerClasses}>
            <h2 className={sectionTitleClasses}>Pengaturan Tema</h2>
            <p className={paragraphClasses}>Pilih skema warna yang paling nyaman untuk Anda.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.keys(themes).map(key => {
                    const theme = themes[key];
                    return (
                        <div key={key} className="text-center">
                            <button
                                onClick={() => handleThemeChange(key)}
                                className={`w-full h-24 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md border-4 transition-all ${
                                    key === themeKey ? 'border-yellow-400 scale-105' : 'border-transparent'
                                } ${theme.header}`}
                            >
                                {theme.name}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* --- KONTROL TRANSPARANSI BARU --- */}
      <h3 className={`${subHeadingClasses} mt-10`}>Atur Transparansi Latar</h3>
      <div className="mt-4">
        <input 
          type="range"
          min="20" // Minimal 20% agar tidak terlalu transparan
          max="100" // Maksimal 100% (solid)
          value={bgOpacity}
          onChange={(e) => setBgOpacity(e.target.value)}
          className="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer"
        />
        <div className="text-center text-gray-700 font-semibold mt-2">{bgOpacity}%</div>
      </div>
            {/* 2. TAMBAHKAN TOMBOL INI DI BAGIAN BAWAH */}
            <div className="text-center mt-10">
                <button
                    onClick={() => setCurrentPageKey('home')}
                    className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                >
                    Tutup Pengaturan
                </button>
            </div>
        </div>
    );
};


// --- KUMPULAN KOMPONEN BAB ---
// PERBAIKAN: Semua ` ``` ` telah dihapus dari sini.

const Bab1 = () => (
    <div className={`${contentContainerClasses}`}>
        <h2 className={`${sectionTitleClasses}`}>Bab 1. Dunia Boleh Heboh, Tapi Kita Jangan Hilang Arah</h2>
        <p className={`${paragraphClasses}`}>
            Coba sejenak hentikan langkah dan amati sekeliling. Di setiap sudut, hiruk pikuk kehidupan modern begitu terasa, seolah semua berpacu dalam perlombaan tanpa garis finis. Setiap individu tampak sibuk, tergesa-gesa mengejar "sesuatu" yang seringkali bersifat fana dan sementara. Berbondong-bondong mereka berlomba ingin menjadi <span className={highlightTextClasses}>viral</span> di media sosial, berharap mendapatkan <span className={highlightTextClasses}>cuan</span> instan dari tren sesaat, atau mati-matian mencari <span className={highlightTextClasses}>validasi</span> dari dunia maya yang terus-menerus menuntut. Mereka sibuk mengkurasi citra diri yang sempurna di hadapan publik, mengejar jumlah *likes* dan *followers* seolah itulah satu-satunya ukuran keberhasilan. Namun, pernahkah kita berhenti sejenak dan bertanya: berapa banyak dari mereka yang benar-benar merasakan ketenangan dan kedamaian di lubuk hati, terlepas dari gemerlap dunia luar?
        </p>
        <p className={`${paragraphClasses}`}>
            Ironisnya, banyak di antara mereka yang tampak "berhasil" di mata dunia justru menyimpan kegelisahan mendalam. Ada yang jumlah pengikutnya di media sosial mencapai ribuan, bahkan jutaan, hidup di bawah sorotan lampu publik, namun setiap malam tidur mereka diliputi kegelisahan dan kekhawatiran akan citra diri yang rentan, takut kehilangan relevansi. Ada pula yang rekening banknya begitu tebal, dipenuhi angka-angka fantastis, meraup keuntungan dari berbagai lini bisnis, namun jantung mereka rapuh, dilanda kecemasan akan investasi berikutnya atau ketakutan kehilangan kekayaan yang telah terkumpul. Lebih menyedihkan lagi, tak sedikit yang begitu gigih berusaha membahagiakan orang lain, sibuk memenuhi ekspektasi sosial dari keluarga, teman, atau bahkan lingkungan kerja, hingga lupa bagaimana rasanya bahagia itu sendiri, bahkan kehilangan koneksi dengan kebutuhan dan kebahagiaan sejati dalam diri mereka.
        </p>
        <p className={`${paragraphClasses}`}>
            Kita semua hidup dalam era serba <span className={highlightTextClasses}>instan</span>, di mana segala sesuatu bisa didapatkan dengan cepat dan mudah. Pesanan makanan sampai dalam hitungan menit, informasi melimpah dalam hitungan detik, dan konektivitas global seolah menghapus batasan ruang dan waktu. Namun, paradoksnya, justru keadaan serba cepat inilah yang sering kali membuat batin kita terasa <span className={highlightTextClasses}>lapar</span> dan hampa. Kita merasa mendapatkan begitu banyak hal—gadget terbaru, liburan mewah, pengakuan publik—but at the same time, kita justru merasa kehilangan lebih banyak lagi. Kehilangan waktu untuk diri sendiri, kehilangan kualitas hubungan, dan yang terpenting, kehilangan esensi diri dalam pusaran ekspektasi.
        </p>
        <p className={`${paragraphClasses}`}>
            Mengapa fenomena ini bisa terjadi? Jawabannya sederhana: karena kita terlalu sibuk melihat <span className={highlightTextClasses}>ke luar</span>, terpaku pada apa yang orang lain miliki atau pikirkan, atau bagaimana orang lain menampilkan diri mereka, daripada <span className={highlightTextClasses}>menengok ke dalam</span> diri sendiri. Kita terus membandingkan pencapaian, berlomba mengejar standar yang seringkali tidak realistis, dan mengejar persetujuan yang ditetapkan oleh dunia luar, tanpa pernah memberi kesempatan pada jiwa untuk bernapas, merefleksikan apa yang benar-benar penting, dan menemukan kedamaian yang otentik.
        </p>
        <p className={`${paragraphClasses}`}>
            Buku ini sama sekali tidak bermaksud menyuruh Anda untuk berhenti bekerja, meninggalkan segala aktivitas duniawi, atau menjadi seorang rahib yang menyepi di puncak gunung. Bukan itu tujuannya. Sebaliknya, mari kita secara perlahan dan sadar menata ulang perspektif kita tentang hidup. Hidup ini bukan hanya soal <span className={highlightTextClasses}>laku</span> atau tindakan yang terlihat oleh mata orang lain, tapi juga soal <span className={highlightTextClasses}>rasa</span> yang mengalir di dalam batin kita—niat, kebermaknaan, dan ketenangan. Ini bukan hanya tentang <span className={highlightTextClasses}>hasil</span> yang bisa diukur dengan angka, tapi juga soal bagaimana hasil itu didapatkan, apakah melalui cara yang <span className={highlightTextClasses}>halal</span> dan berkah, tanpa merugikan diri sendiri atau orang lain. Dan yang paling penting, hidup ini bukan hanya tentang <span className={highlightTextClasses}>siapa kita di mata orang lain</span>, sejauh mana kita diakui atau dielu-elukan oleh masyarakat, tapi yang terpenting adalah <span className={highlightTextClasses}>siapa kita saat bercermin dengan jiwa</span>, ketika kita jujur pada diri sendiri dan menyelaraskan hati nurani dengan tindakan nyata. Inilah jalan menuju kedamaian sejati, yang tak tergoyahkan oleh hebohnya dunia.
        </p>
    </div>
);

const Bab2 = () => (
    <div className={`${contentContainerClasses}`}>
        <h2 className={`${sectionTitleClasses}`}>Bab 2. Kita Ini Mau Ke Mana Sebenarnya?</h2>
        <p className={`${paragraphClasses}`}>
            Pernahkah Anda merasakan hidup ini seperti sedang menaiki kereta api super cepat, melaju dengan kecepatan tinggi tanpa henti, namun dengan perasaan hampa karena sama sekali tidak tahu tujuan akhirnya ke mana? Di era modern ini, fenomena tersebut semakin umum terjadi. Semua orang tampak sibuk, semua tergesa-gesa dalam aktivitas sehari-hari, dari bangun pagi hingga larut malam. Namun, jika tiba-tiba kita diajukan pertanyaan sederhana, “Mau ke mana sih, sebenarnya, hidup ini mengarah?”... sebagian besar dari kita mungkin hanya bisa menjawab, “Yang penting jalan aja dulu,” atau “Ikuti arus saja,” tanpa benar-benar memiliki kompas internal yang jelas.
        </p>
        <p className={`${paragraphClasses}`}>
            Ya, terkadang hidup memang berjalan seperti itu: kita mengejar sesuatu yang bahkan tidak kita pahami secara mendalam, atau yang kita yakini akan membawa kebahagiaan padahal belum tentu. Kita sibuk menumpuk pencapaian demi pencapaian—gelar pendidikan tinggi, posisi jabatan bergengsi, akumulasi aset materi—namun kita lupa untuk mengevaluasi kembali apakah semua itu benar-benar membuat batin kita merasa damai, tenang, dan utuh, atau justru sebaliknya, makin tertekan oleh beban ekspektasi dan target yang tak berujung. Misalnya, seorang profesional muda mungkin mati-ati mengejar promosi demi promosi, hanya untuk menyadari bahwa kenaikan gaji dan posisi justru membawa lebih banyak stres dan kurangnya waktu untuk keluarga.
        </p>
        <p className={`${paragraphClasses}`}>
            Ada yang berlari kencang dari bayang-bayang kemiskinan masa lalu, sehingga lupa menikmati proses hidup. Ada yang dikejar *deadline* pekerjaan yang tak ada habisnya, mengorbankan kesehatan fisik dan mental demi tuntutan karier. Ada pula yang hanya ingin diakui keberadaannya di lingkungan sosial atau profesional, terus-menerus mencari tepuk tangan dan pujian dari luar. Namun, di balik semua hiruk pikuk pengejaran itu, ada satu pertanyaan mendasar yang seringkali kita abaikan, atau bahkan sengaja kita hindari karena takut dengan jawabannya:
        </p>
        <p className={`${paragraphClasses} text-center font-bold text-xl text-blue-700`}>
            👉 Apa sih tujuan saya hidup ini, sebenarnya?
        </p>
        <p className={`${paragraphClasses}`}>
            Ini bukan sekadar visi atau daftar impian yang kita tempel di *vision board* kita, melainkan pertanyaan jujur yang keluar dari lubuk hati terdalam: apa yang sebenarnya saya cari dalam perjalanan hidup ini? Jika jawabannya hanya uang, maka setelah memiliki uang dalam jumlah yang cukup melimpah… lantas apa lagi yang akan dikejar? Apakah itu akan mengisi kekosongan batin? Jika jawabannya pengakuan atau popularitas, setelah menjadi <span className={highlightTextClasses}>viral</span> dan dikenal banyak orang… lalu apa yang tersisa? Apakah validasi dari ribuan *likes* dan komentar itu bisa menjamin kedamaian abadi?
        </p>
        <p className={`${paragraphClasses}`}>
            Banyak dari kita yang mengejar sesuatu hanya karena “semua orang juga begitu.” Kita terjebak dalam arus kolektif, merasa harus mengikuti tren dan standar yang ditetapkan oleh lingkungan sekitar agar tidak tertinggal. Kita lupa bahwa hidup ini bukan sebuah lomba cepat-cepatan di mana yang tercepat adalah pemenangnya. Ini adalah sebuah perjalanan yang unik bagi setiap individu—dan yang paling penting adalah: jalan mana yang kita pilih, yang akan membuat kita tetap utuh, seimbang, dan berintegritas di tengah berbagai godaan dunia.
        </p>
        <p className={`${paragraphClasses}`}>
            Kadang, justru ketika kita berani berhenti sejenak dari hiruk pikuk, menarik diri dari kebisingan luar, dan jujur pada suara hati… barulah kita menemukan arah sejati. Arah yang tidak didikte oleh ekspektasi eksternal, melainkan berasal dari kebijaksanaan dan keinginan terdalam diri kita.
        </p>
        <p className={`${paragraphClasses}`}>
            Maka, sebelum jauh melangkah lagi dan terbawa arus yang tak jelas, mari kita ambil napas dalam-dalam. Tanyakan ulang ke dalam diri dengan sepenuh hati:
        </p>
        <p className={`${paragraphClasses} text-center font-semibold text-lg text-blue-700`}>
            Apakah jalan yang saya tempuh saat ini sedang mendekatkan saya pada hidup yang penuh berkah dan makna? Atau justru tanpa sadar menjauhkan saya dari kejujuran batin dan kedamaian sejati saya sendiri?
        </p>
        <p className={`${paragraphClasses} text-center font-semibold`}>
            Jawabannya… hanya hati nurani Anda yang tahu dan bisa merasakannya.
        </p>
        <IntegratedAudioPlayer
            src="musik/PendahuluanIA.mp3"
            text="Dengarkan Pembukaan Bab Ini"
            
        />
    </div>
);

const Bab3 = () => (
    <div className={`${contentContainerClasses}`}>
        <h2 className={`${sectionTitleClasses}`}>Bab 3. Hati: Singgasana Cahaya yang Terlupakan</h2>
        <p className={`${paragraphClasses}`}>
            Dalam khazanah psikologi Islam, khususnya dalam ajaran Sufisme, kita mengenal tiga "penghuni" utama yang mendiami diri kita: <span className={highlightTextClasses}>Nafs</span> (sering diartikan sebagai diri, ego, atau jiwa hewani), <span className={highlightTextClasses}>Qalb</span> (hati, dalam konteks spiritual), dan <span className={highlightTextClasses}>Ruh</span> (roh ilahi). Untuk memudahkannya, bayangkan diri Anda sebagai sebuah rumah berjenjang. <span className={highlightTextClasses}>Nafs</span> adalah penghuni kamar bawah tanah yang cenderung gelap dan suka bikin onar. Ia adalah bagian dari diri kita yang senantiasa menuntut kesenangan instan, cenderung egois, mudah tergoda hawa nafsu, dan seringkali menjadi sumber kemalasan. Nafs yang membisikkan untuk menunda ibadah, mudah terpancing emosi dan amarah, atau sekadar ingin rebahan berlama-lama sambil terus-menerus *scrolling* media sosial tanpa tujuan. Di atasnya, pada tingkatan yang lebih tinggi dan "berkelas", bersemayamlah <span className={highlightTextClasses}>Qalb</span> dan <span className={highlightTextClasses}>Ruh</span> yang memancarkan cahaya serta kebijaksanaan.
        </p>
        <p className={`${paragraphClasses}`}>
            Al-Ghazali, seorang ulama besar dan pemikir Islam terkemuka, dengan tegas membedakan antara hati fisik yang berfungsi memompa darah ke seluruh tubuh—ranah ilmu kedokteran—dan "substansi halus" dari <span className={highlightTextClasses}>Qalb</span>. Nah, <span className={highlightTextClasses}>Qalb</span> inilah esensi sejati kemanusiaan kita. Ia adalah pusat di mana kita bisa merasa, tahu, mengalami kesadaran mendalam, serta membedakan antara yang baik dan buruk. Dia adalah "Bos" sejati dalam diri kita, yang seharusnya menjadi pengendali utama. Bagi kaum Sufi, <span className={highlightTextClasses}>Qalb</span> itu bagaikan antena paling canggih dan sensitif, yang diciptakan untuk menangkap sinyal-sinyal kebenaran, ilham, dan pengetahuan spiritual langsung dari Ilahi. Tentu saja, ini bisa terjadi asalkan antenanya bersih dan terawat, tanpa "karat" yang disebabkan oleh tumpukan dosa, ego, dan kelalaian. Di dalam <span className={highlightTextClasses}>Qalb</span> inilah iman (<span className={highlightTextClasses}>īmān</span>), pengetahuan spiritual mendalam (<span className={highlightTextClasses}>ma'rifa</span>), dan konsep keesaan ilahi (<span className={highlightTextClasses}>tauhīd</span>) bersemayam serta tumbuh subur. Tradisi Sufi bahkan menggambarkan <span className={highlightTextClasses}>Qalb</span> sebagai wadah tak terbatas, sebuah cetakan suci di mana Tuhan menuangkan keberadaan, pengetahuan, cinta, dan cahaya-Nya. Ada sebuah Hadits masyhur yang menyatakan, "hati seorang mukmin adalah singgasana Yang Maha Pengasih," menunjukkan betapa agungnya kedudukan hati ini. <span className={highlightTextClasses}>Qalb</span> juga yang menopang jiwa kita dengan kebijaksanaan dan cahaya spiritual, sekaligus berfungsi sebagai alat untuk memurnikan sifat-sifat buruk dan tercela. Bahkan, di sinilah wahyu ilahi bisa kita rasakan dan tangkap secara intuitif melalui <span className={highlightTextClasses}>Sirr</span>, bagian terdalam dari hati. Kata "qalb" sendiri secara etimologi berarti "berbalik, berubah," menunjukkan bahwa hati itu sangat dinamis, selalu bisa berputar ke arah kebaikan atau sebaliknya, tergantung pilihan dan usaha kita.
        </p>
        <p className={`${paragraphClasses}`}>
            Jika kita kembali ke analogi tubuh sebagai sebuah rumah, maka hati (<span className={highlightTextClasses}>Qalb</span>) adalah ruang tengahnya, atau bisa juga disebut ruang keluarga. Ini adalah tempat di mana kita kembali, tempat segala rasa dan emosi bermuara, tempat kita menemukan ketenangan dan kejernihan. Namun, di zaman sekarang yang serba cepat dan penuh distraksi, ruang vital ini seringkali ditinggalkan—ia berdebu oleh berbagai distraksi digital, riuhnya informasi, dan diam oleh kesibukan yang tiada henti. Kita terlalu fokus pada tampilan luar rumah, hingga lupa membersihkan dan menghidupkan ruang tengah yang seharusnya menjadi inti.
        </p>
        <p className={`${paragraphClasses}`}>
            Dalam ajaran tasawuf, hati bukanlah sekadar organ fisik yang berdetak dan memompa darah. Ia adalah <span className={highlightTextClasses}>Qalb</span>—sebuah wadah spiritual, pusat kesadaran tertinggi, dan tempat di mana cahaya Ilahi bisa hadir serta menerangi jalan hidup kita. Saat hati jernih, bersih dari segala kotoran spiritual, hidup terasa terang, penuh makna, dan langkah menjadi mantap. Sebaliknya, saat hati keruh, diliputi noda dosa, iri, dengki, atau keserakahan, maka logika kita pun akan ikut buram, sulit membedakan yang hak dan batil, serta mudah tersesat.
        </p>
        <p className={`${paragraphClasses}`}>
            Hati memiliki kemampuan unik untuk "mengetahui" tanpa harus berpikir secara logis, dan "memahami" tanpa harus dijelaskan secara verbal. Ia mampu menangkap kehadiran Allah SWT, merasakan arah kebenaran, dan membimbing kita menuju kebaikan. Namun… kemampuan luar biasa ini juga bisa tertutup dan tumpul. Hal ini bisa terjadi karena tumpukan dosa yang disengaja maupun tidak, karena trauma masa lalu yang tidak disembuhkan, atau karena kita terlalu sibuk mengejar duniawi yang tak pernah usai dan tak pernah bisa memuaskan sepenuhnya.
        </p>
        <p className={`${paragraphClasses}`}>
            Maka, tugas kita sebagai manusia bukan hanya sekadar menjaga kesehatan fisik atau penampilan luar, tetapi yang jauh lebih esensial adalah merawat dan membersihkan <span className={highlightTextClasses}>Qalb</span> kita. Membersihkannya dari "sampah" spiritual seperti sifat iri hati, dengki, serakah, riya (pamer), ujub (merasa diri hebat), dan tamak. Menghidupkannya kembali dengan zikir, renungan, ibadah, dan perbuatan baik agar ia bisa berfungsi optimal sebagai penunjuk jalan menuju kebahagiaan sejati dan ridha Ilahi.
        </p>
        <blockquote className={`${quoteClasses}`}>
            *“Ketahuilah, dalam tubuh manusia ada segumpal daging. Jika ia baik, baiklah seluruh tubuh. Jika ia rusak, rusaklah seluruh tubuh. Ketahuilah, itu adalah hati.”* (HR. Bukhari dan Muslim).
        </blockquote>
        <p className={`${paragraphClasses}`}>
            Hadits ini menegaskan bahwa segala kebaikan dan keburukan manusia bermula dari kondisi hatinya.
        </p>
    </div>
);

const Bab4 = () => (
    <div className={`${contentContainerClasses}`}>
        <h2 className={`${sectionTitleClasses}`}>Bab 4. Akal: Satpam atau Penjaga Gerbang Ilahi?</h2>
        <p className={`${paragraphClasses}`}>
            <span className={highlightTextClasses}>Akal</span> kita adalah anugerah luar biasa. Dengan kecerdasannya, ia mampu menghitung dengan cepat, menyusun strategi yang kompleks, dan menciptakan inovasi-inovasi yang mengubah peradaban. Berkat akal, kita bisa membangun jembatan megah, merancang perangkat teknologi mutakhir, atau memecahkan masalah-masalah matematis yang rumit. Namun, di balik segala kehebatannya, akal juga memiliki batas dan kelemahan intrinsik. Ia bisa menjadi licik, rentan terhadap kekeliruan dalam penalaran, dan mudah sekali menjadi korban egonya sendiri, Nafs, yang telah kita bahas di bab sebelumnya.
        </p>
        <p className={`${paragraphClasses}`}>
            Dalam konteks spiritual, khususnya dalam tradisi Sufi, tugas sejati akal bukanlah untuk menindas hati (<span className={highlightTextClasses}>Qalb</span>), melainkan untuk mendukung dan melindunginya. Ketika akal dan hati bersatu dalam harmoni, kita bisa berjalan lurus di jalan kebenaran. Kita dapat mengenal kebenaran hakiki tanpa tersesat oleh jerat logika semata yang kadang menjebak. Akal membutuhkan ilmu dan informasi yang benar sebagai bahan bakarnya, sementara hati memerlukan dzikir dan pengalaman spiritual mendalam sebagai nutrisinya. Akal butuh argumentasi yang kokoh dan bukti empiris, sedangkan hati membutuhkan pengalaman langsung dan intuisi. Bersama-sama, mereka membentuk kompas sejati yang tak tergoyahkan dalam mengarungi samudra kehidupan.
        </p>
        <p className={`${paragraphClasses}`}>
            Imam Ja’far al-Sadiq, seorang cendekiawan terkemuka dalam tradisi Islam, memperkenalkan konsep <span className={highlightTextClasses}>Aql</span> (akal) sebagai "satpam" atau "penghalang" antara <span className={highlightTextClasses}>Nafs</span> yang cenderung membuat ulah dengan dorongan negatifnya dan <span className={highlightTextClasses}>Qalb</span> yang suci. Menurut beliau:
        </p>
        <blockquote className={`${quoteClasses}`}>
            *“Akal itu yang dengannya Allah disembah dan dengan akal itulah surga diraih.”*
        </blockquote>
        <p className={`${paragraphClasses}`}>
            Pernyataan ini menunjukkan betapa krusialnya peran akal dalam perjalanan spiritual dan pencapaian keberkahan. Akal yang tercerahkan akan membimbing kita pada ketaatan dan kebaikan, yang pada akhirnya mengantarkan pada ganjaran Ilahi. Namun, penting untuk dicatat bahwa jika akal tidak terhubung atau terkoordinasi dengan <span className={highlightTextClasses}>Qalb</span>, ia bisa menjelma menjadi alat manipulasi yang berbahaya. Akal yang terputus dari hati bisa sangat pintar menipu diri sendiri, mahir dalam beralasan dan mencari pembenaran untuk setiap tindakan, bahkan ketika hati nurani telah merasakan ada yang salah. Akal semacam ini menjadi pandai secara pragmatis, namun lupa akan arah pulang yang sesungguhnya menuju kedamaian dan kebenaran.
        </p>
        <p className={`${paragraphClasses}`}>
            Tugas <span className={highlightTextClasses}>Aql</span> ini sangat penting: dia berfungsi menyaring dan menghalau pengaruh negatif dari <span className={highlightTextClasses}>Nafs</span> agar tidak merusak kemurnian hati. Jadi, <span className={highlightTextClasses}>Aql</span> bukanlah sumber utama pengetahuan spiritual. Sumber itu tetaplah <span className={highlightTextClasses}>Qalb</span>, karena hati lebih dekat dengan <span className={highlightTextClasses}>Ruh</span> dan mampu menerima cahaya ilahi secara langsung. Akal adalah penjaga agar <span className={highlightTextClasses}>Qalb</span> tetap bersih dan reseptif terhadap pancaran Ilahi tersebut. Singkatnya, dalam psikologi Sufi, <span className={highlightTextClasses}>Qalb</span> adalah inti kesadaran manusia dan organ utama untuk pengetahuan spiritual. Jika <span className={highlightTextClasses}>Qalb</span> bersih, ia menjadi sumber kebenaran tertinggi dan koneksi langsung dengan Ilahi, jauh melampaui kemampuan analitis pikiran semata. Ini sangat mendukung mengapa hati harus diutamakan untuk pencarian kebenaran spiritual, sebab hati jujur dan sangat reseptif terhadap kehadiran ilahi. Akal? Dia penting, tapi sebagai "asisten" yang setia menjaga kemurnian hati.
        </p>
        <p className={`${paragraphClasses}`}>
            Perdebatan filosofis Barat tentang akal (*reason*) dan emosi (*emotion*) juga menawarkan perspektif menarik yang selaras dengan pandangan Sufi. Dulu, ada aliran pemikiran yang menganggap akal sebagai raja tunggal, seperti Immanuel Kant yang menekankan peran akal murni dalam moralitas dan pengetahuan. Di sisi lain, ada juga yang menyatakan bahwa emosi adalah bosnya, seperti David Hume yang berpendapat bahwa akal hanyalah budak nafsu. Namun, dalam psikologi kognitif dan ilmu saraf modern, konsensus yang lebih kuat muncul: keduanya adalah tim kerja yang saling melengkapi.
        </p>
        <p className={`${paragraphClasses}`}>
            Emosi seringkali memberikan "alarm" atau sinyal awal tentang suatu situasi—misalnya, rasa takut memberi tahu adanya bahaya, atau rasa gembira menandakan kebahagiaan. Akal kemudian mengambil peran untuk menganalisis sinyal emosional ini, merumuskan strategi, dan mengambil keputusan yang paling rasional berdasarkan informasi yang ada. Jadi, bukan lagi soal memilih salah satu dan mengabaikan yang lain, melainkan bagaimana keduanya—akal dan emosi (yang dapat dianalogikan dengan <span className={highlightTextClasses}>Qalb</span> sebagai pusat perasaan spiritual dan intuisi)—bisa bekerja sama secara sinergis. Ketika akal yang cerdas didasari oleh kejernihan hati dan intuisi spiritual, keputusan yang diambil akan jauh lebih bijaksana dan membawa berkah, tidak hanya bagi diri sendiri tetapi juga bagi lingkungan sekitar.
        </p>
    </div>
);

const Bab5 = () => (
    <div className={`${contentContainerClasses}`}>
        <h2 className={`${sectionTitleClasses}`}>Bab 5. Intuisi: Bahasa Lembut yang Kita Abaikan</h2>
        <p className={`${paragraphClasses}`}>
            Pernahkah Anda punya "firasat" kuat tentang sesuatu, padahal logika Anda bilang sebaliknya? Lalu, Anda mengabaikan firasat itu dan *boom!* Kejadiannya persis seperti firasat Anda. Rasanya kayak ditampar kenyataan, kan? Nah, itulah intuisi.
        </p>
        <p className={`${paragraphClasses}`}>
            Intuisi itu seperti bisikan halus yang sering kita abaikan. Ia tak berteriak, tak memaksa. Tapi ia tahu. Ia hadir dalam bentuk firasat, bisikan hati, atau rasa “kayaknya gini deh”—dan sering kali, benar.
        </p>
        <p className={`${paragraphClasses}`}>
            Intuisi itu kemampuan kita untuk tahu atau paham sesuatu tanpa perlu mikir keras atau menganalisis secara sadar. Sering disebut "perasaan usus" (*gut feeling*) atau insting yang membimbing keputusan cepat. Alam bawah sadar kita punya peran besar di sini. Dia itu kayak perpustakaan raksasa yang menyimpan semua pengalaman, pola, dan informasi yang pernah kita serap, bahkan yang tidak kita sadari. Dari situlah intuisi muncul, kadang tiba-tiba, kayak ide cemerlang yang muncul pas lagi mandi.
        </p>
        <p className={`${paragraphClasses}`}>
            Banyak dari kita terlalu sibuk di kepala. Kita pikir semua harus masuk akal. Tapi ada bagian dari diri kita yang bisa melihat tanpa mata, bisa mendengar tanpa telinga: itulah intuisi.
        </p>
        <p className={`${paragraphClasses}`}>
            Dalam tradisi Islam, intuisi sering disebut firasat orang beriman. Nabi SAW bersabda,
        </p>
        <blockquote className={`${quoteClasses}`}>
            *“Takutlah terhadap firasat orang mukmin, karena ia melihat dengan cahaya Allah.”* (HR. Tirmidzi)
        </blockquote>
        <p className={`${paragraphClasses}`}>
            Intuisi dikenal dengan berbagai istilah seperti <span className={highlightTextClasses}>kasyf</span>, <span className={highlightTextClasses}>ilham</span>, atau <span className={highlightTextClasses}>firasa</span>. <span className={highlightTextClasses}>Kasyf</span> secara harfiah berarti "terbuka tirai" atau tersingkapnya tabir penghalang antara hamba dan Tuhannya, mengungkapkan rahasia alam gaib dan pengertian-pengertian tersembunyi.
        </p>
        <p className={`${paragraphClasses}`}>
            <span className={highlightTextClasses}>Ilham</span> adalah pengetahuan benar yang diberikan langsung oleh Allah (*wahbi*) kepada hati seorang mukmin atau wali, yang bisa diusahakan melalui perjuangan spiritual (*mujāhadah*) atau diberikan sebagai anugerah mutlak.
        </p>
        <p className={`${paragraphClasses}`}>
            <span className={highlightTextClasses}>Kasyf</span> juga dapat diibaratkan sebagai "wahyu" Tuhan yang datang tiba-tiba tanpa dipikirkan, menghasilkan pemahaman instan atau "tahu bahwa kita tahu" (*we know that we know*). Pengetahuan ini, dalam tasawuf, dikenal sebagai <span className="highlight-text">al-ilm al-khuduri</span> atau "ilmu kehadiran" karena hadir tanpa proses berpikir rasional. Pengalaman <span className={highlightTextClasses}>kasyf</span> dapat terwujud melalui getaran hati, mimpi, atau penglihatan batin.
        </p>
        <p className={`${paragraphClasses}`}>
            Konsep <span className={highlightTextClasses}>kasyf</span> dan <span className={highlightTextClasses}>ilham</span> dalam Islam memberikan kerangka teologis yang melegitimasi dan mengangkat pengalaman intuisi melampaui sekadar wawasan psikologis. Ini menempatkan intuisi sebagai karunia ilahi atau buah dari perjuangan spiritual yang mendalam.
        </p>
        <p className={`${paragraphClasses}`}>
            Intuisi bukan sekadar *feeling*. Ia adalah kemampuan batin yang muncul dari hati yang bersih. Jika hati penuh suara-suara dunia, intuisi tenggelam. Tapi jika hati tenang dan jernih, maka intuisi jadi penunjuk jalan yang luar biasa.
        </p>
        <p className={`${paragraphClasses}`}>
            Ada teori yang bilang intuisi itu berasal dari sistem pemrosesan informasi yang cepat, otomatis, dan implisit, beda sama sistem rasional yang lambat dan butuh kontrol. Penelitian ilmiah juga sudah membuktikan bahwa intuisi melibatkan aktivitas di berbagai area otak, seperti ganglia basal, amigdala, dan korteks prefrontal. Jadi, ini bukan cuma "perasaan" biasa, tapi proses kognitif yang canggih.
        </p>
        <p className={`${paragraphClasses}`}>
            Intuisi bisa muncul dalam berbagai bentuk: bisa berupa gambaran visual, atau "indra intuitif" di tubuh kita (misalnya, sensasi di perut, hati, telinga, atau hidung) yang muncul tanpa proses logis. Tapi, hati-hati ya, "intuisi yang paling murni itu selalu benar," tapi yang "tercampur dengan pikiran dan emosi Anda sendiri mungkin cuma sebagian benar atau bahkan sepenuhnya salah". Logika juga tidak selalu akurat, kok. Berharap intuisi itu sempurna 100% tanpa latihan, itu namanya "pemikiran magis". 
        </p>
        <p className={`${paragraphClasses}`}>
            Kadang intuisi datang dalam bentuk gelisah yang tak jelas. Kadang ia muncul sebagai ketenangan yang tidak bisa dijelaskan. Maka belajar mendengarkan intuisi adalah bagian dari perjalanan kembali ke dalam.
        </p>
        <p className={`${paragraphClasses}`}>
            Latihannya? Diam. Tenang. Rileks. Dan dengarkan. Bukan dari kepala, tapi dari dalam dada.
        </p>
        <p className={`${paragraphClasses}`}>
            Untuk membedakan intuisi sejati dari angan-angan atau proyeksi (alias "baperan" atau "paranoid"), ada beberapa cara:
        </p>
        <ul className="list-disc list-inside mb-4">
            <li className={`${paragraphClasses} !mb-0`}>**Dengarkan Tubuh Anda:** Intuisi sejati sering disertai perasaan "terbuka, rileks, gembira, koneksi, tanpa keraguan, jernih, terkejut, kagum, semangat, atau cerah." Ada "rasa tahu yang mendalam." Kalau cuma proyeksi, biasanya hati terasa tertutup, cemas, takut, atau khawatir.</li>
            <li className={`${paragraphClasses} !mb-0`}>**Fokus atau Meditasi:** Praktik ini membantu mencapai keadaan "terpusat" yang tenang dan waspada, sehingga intuisi tidak terganggu oleh pikiran atau emosi yang berisik.</li>
            <li className={`${paragraphClasses} !mb-0`}>**Analisis Gambaran:** Tanyakan pada diri sendiri: "Apakah ini gambaran dari masa lalu saya? Apakah saya pernah melihatnya di film/buku? Apakah ini ada hubungannya dengan ketakutan saya? Seberapa besar saya berharap ini jadi kenyataan?" Jujur pada diri sendiri itu penting.</li>
        </ul>
        <p className={`${paragraphClasses}`}>
            Penekanan pada penyucian diri (<span className={highlightTextClasses}>takhalli</span> dari sifat tercela, <span className={highlightTextClasses}>tahalli</span> dengan sifat terpuji), ketekunan dalam zikir, <span className={highlightTextClasses}>uzlah</span> (khalwat), <span className={highlightTextClasses}>mujahadah an-nafsi</span> (melawan hawa nafsu), dan <span className={highlightTextClasses}>istiqamah</span> (konsistensi) dalam ibadah adalah prasyarat penting untuk memperoleh <span className={highlightTextClasses}>kasyf</span>.
        </p>
        <p className={`${paragraphClasses}`}>
            Ini berarti bahwa intuisi yang benar-benar berasal dari ilahi bukanlah sekadar teknik yang dipelajari, melainkan konsekuensi dari kehidupan spiritual yang lurus dan bersih. Hal ini juga berfungsi sebagai perlindungan terhadap potensi kesesatan, seperti campur tangan jin yang dapat memfitnah atau menunjukkan hal yang sebenarnya tidak akan terjadi. Dengan demikian, keimanan yang kuat dan ibadah yang konsisten bertindak sebagai filter, memastikan sumber intuisi adalah ilahi dan bukan menyesatkan.
        </p>
        <p className={`${paragraphClasses}`}>
            Kalau ada masukan intuitif yang bertentangan, jangan buru-buru ambil keputusan. Itu biasanya tanda ada proyeksi atau angan-angan yang ikut campur. Intinya, intuisi itu bukan cuma perasaan, tapi proses kognitif kompleks yang memanfaatkan alam bawah sadar dan isyarat emosional. Keandalannya bisa ditingkatkan dengan latihan dan kesadaran diri.
        </p>
    </div>
);




const Bab6 = () => (
    <div className={`${contentContainerClasses}`}>
        <h2 className={`${sectionTitleClasses}`}>Bab 6. HeartMath dan Koherensi: Saat Hati dan Otak Berdamai</h2>
        <p className={`${paragraphClasses}`}>
            Pernahkah Anda merasa pikiran Anda seperti *browser* dengan 100 tab terbuka, semuanya berisik dan bikin pusing? Atau seperti *laptop* yang *hang* karena terlalu banyak aplikasi berjalan? Nah, itu namanya "inkoherensi" antara hati dan pikiran.
        </p>
        <p className={`${paragraphClasses}`}>
            Sains modern ternyata setuju dengan para sufi: hati itu bukan cuma organ pompa darah. Ia punya kecerdasannya sendiri. Penelitian dari HeartMath Institute menunjukkan bahwa kita bisa dengan sengaja mengubah ritme jantung kita untuk mengirim sinyal positif ke seluruh tubuh, menyeimbangkan sistem saraf, hormonal, dan kekebalan kita.
        </p>
        <HeartCoherenceChart />
              
        <p className={`${paragraphClasses}`}>
            Grafik di atas mengilustrasikan perbedaan antara ritme jantung yang kacau (inkoheren) saat stres, dan ritme yang halus dan teratur (koheren) saat kita merasakan emosi positif seperti syukur atau cinta. Saat koheren, stres minggat, emosi membaik, dan fungsi otak kita jadi "terbuka" ke level yang lebih tinggi.
        </p>
        <p className={`${paragraphClasses}`}>
            Koherensi hati ini punya dampak besar pada pikiran dan intuisi kita. Stres hilang, pikiran jadi jernih, kinerja kognitif meningkat, dan kita jadi lebih mudah mengakses panduan intuitif. Saat hati kita koheren, kita "berpikir lebih jernih, lebih intuitif," dan pilihan kita jadi lebih efektif karena "selaras dengan kebijaksanaan hati kita yang lebih dalam".
        </p>
        <p className={`${paragraphClasses}`}>
            Ada pepatah HeartMath yang keren banget: *<span className={highlightTextClasses}>"Otak berpikir, tetapi hati tahu."</span>* Ini bukan berarti otak kita bodoh, tapi hati punya jenis pengetahuan yang berbeda, yang melengkapi atau bahkan melampaui pemikiran intelektual murni. Intuisi kita jadi lebih mudah diakses saat hati, pikiran, dan emosi kita selaras dan seimbang. Jadi, kalau selama ini Anda merasa pikiran Anda berisik dan bikin bingung, mungkin saatnya mendengarkan "konduktor" di dada Anda!
        </p>
        <p className={`${paragraphClasses}`}>
            Latihannya sederhana: tarik napas perlahan, fokuskan ke dada, rasakan rasa syukur atau cinta. Hanya dengan itu, ritme jantung bisa berubah. Pikiran jadi tidak grasak-grusuk. Dan kita jadi lebih bisa mendengar intuisi dan kebijaksanaan hati. Koherensi hati bukan cuma latihan emosi. Ia adalah spiritualitas dalam bentuk ilmiah.
        </p>
    </div>
);

const Bab7 = () => (
    <div className={`${contentContainerClasses}`}>
        <h2 className={`${sectionTitleClasses}`}>Bab 7. Janin pun Tahu: Jantung Lebih Dulu dari Otak</h2>
        <p className={`${paragraphClasses}`}>
            Tahukah Anda bahwa dalam keajaiban rahim ibu, <span className={highlightTextClasses}>jantung janin sudah mulai berdetak</span> bahkan sebelum otaknya terbentuk sempurna? Ini adalah salah satu fakta biologis yang paling mencengangkan dan penuh makna. Di minggu kelima kehamilan, sebuah organ mungil seukuran biji apel sudah memulai tugas vitalnya, memompa darah ke seluruh bakal tubuh. Detak jantung yang ritmis dan penuh kehidupan itu sudah bisa didengar, sementara sistem saraf pusat, termasuk otak, masih dalam tahap pengembangan awal, jauh dari fungsi kognitif yang kompleks.
        </p>
        <p className={`${paragraphClasses}`}>
            Ini bukan soal mana yang "lebih hebat" atau "lebih penting" antara jantung dan otak. Keduanya memiliki peran krusial dalam keberlangsungan hidup. Namun, fenomena perkembangan ini menyiratkan sebuah urutan alamiah dan filosofis yang mendalam: <span className={highlightTextClasses}>hati dulu, baru akal</span>. Kita, sebagai makhluk hidup, pada dasarnya "digerakkan oleh rasa" sejak detik-detik pertama keberadaan kita. Detak pertama itu adalah manifestasi kehidupan, sebuah irama primordial yang mendahului segala bentuk pikiran dan analisis.
        </p>
        <p className={`${paragraphClasses}`}>
            Dari sudut pandang <span className={highlightTextClasses}>ilmu pengetahuan (sains)</span>, jantung memang lebih dari sekadar pompa darah. Penelitian neurokardiologi modern telah menemukan bahwa jantung memiliki "otaknya sendiri," yang disebut <span className={highlightTextClasses}>sistem saraf intrinsik jantung</span>. Jaringan saraf yang kompleks ini memungkinkan jantung untuk berfungsi secara independen dari otak di kepala, bahkan memengaruhi aktivitas otak melalui komunikasi dua arah melalui <span className={highlightTextClasses}>saraf vagus</span>. Ini adalah bukti ilmiah bahwa jantung tidak hanya merasakan secara fisik, tetapi juga memiliki semacam kecerdasan atau kemampuan 'mengetahui' dan beradaptasi. Hormon seperti *atrial natriuretic peptide* (ANP) yang diproduksi jantung juga berperan dalam pengaturan *mood* dan respons stres, menunjukkan keterkaitannya dengan kondisi emosional kita. Konsep <span className={highlightTextClasses}>koherensi jantung-otak</span> dalam ilmu saraf juga menyoroti bagaimana irama detak jantung yang stabil dan sinkron dengan gelombang otak dapat meningkatkan kejernihan mental, intuisi, dan keseimbangan emosional.
        </p>
        <p className={`${paragraphClasses}`}>
            Lebih lanjut lagi, sains modern telah memberikan bukti nyata mengenai betapa eratnya hubungan emosional ibu dan janin. Ketika seorang ibu mengalami <span className={highlightTextClasses}>stres</span>, tubuhnya akan melepaskan hormon-hormon stres seperti <span className={highlightTextClasses}>kortisol</span>. Hormon-hormon ini tidak hanya beredar dalam aliran darah ibu, tetapi juga dapat melewati plasenta dan mencapai janin. Akibatnya, janin pun akan mengalami peningkatan detak jantung, perubahan pola pernapasan, dan bahkan peningkatan aktivitas dalam sistem sarafnya, seolah-olah ia ikut merasakan ketidaknyamanan yang dialami ibunya. Ini menunjukkan bahwa <span className={highlightTextClasses}>janin merespons kondisi emosional ibu</span>, bukan hanya nutrisi fisiknya. Stres kronis pada ibu bahkan dikaitkan dengan perubahan perkembangan otak janin dan risiko lebih tinggi terhadap masalah perilaku atau emosional di kemudian hari. Hal ini menegaskan bahwa "rasa" yang dialami ibu, baik positif maupun negatif, memiliki dampak langsung dan signifikan pada perkembangan "rasa" awal janin.
        </p>
        <p className={`${paragraphClasses}`}>
            Dalam perspektif <span className={highlightTextClasses}>agama dan spiritualitas</span>, khususnya dalam ajaran Islam, fenomena ini semakin menguatkan pentingnya <span className={highlightTextClasses}>Qalb</span> (hati spiritual) yang telah kita bahas di bab-bab sebelumnya. Jika sejak awal kehidupan kita dimulai dengan sebuah detak, sebuah "rasa," bukan dengan pikiran atau analisis, mungkin sudah waktunya kita kembali menyadari bahwa <span className={highlightTextClasses}>rasa</span>—dalam artian intuisi, empati, <span className={highlightTextClasses}>fitrah</span>, dan koneksi spiritual—adalah dasar dari segalanya. Hati, sebagai pusat Qalb, adalah singgasana iman, pengetahuan mendalam (*ma'rifah*), dan wadah bagi cahaya Ilahi. Ia adalah organ yang paling dekat dengan Ruh, yang mampu menangkap sinyal-sinyal kebenaran spiritual jauh sebelum akal mampu memprosesnya.
        </p>
        <p className={`${paragraphClasses}`}>
            Ironisnya, dalam kehidupan modern yang serba rasional dan logis, kita cenderung mengabaikan bisikan hati dan lebih mengandalkan akal semata. Kita dididik untuk berpikir kritis, menganalisis data, dan membuat keputusan berdasarkan fakta. Ini penting, tentu saja. Namun, ketika hidup mulai terasa kacau, penuh tekanan, dan kita merasa kehilangan arah, respons pertama kita seringkali adalah mencoba memecahkannya dengan akal: berpikir lebih keras, mencari solusi logis, atau merencanakan strategi baru. Padahal, seringkali yang dibutuhkan bukanlah peningkatan kapasitas akal semata—melainkan <span className={highlightTextClasses}>menenangkan dulu hatimu</span>. Karena dari sanalah semua dimulai, dari detak pertama kehidupan, dari kejernihan hati yang mampu melihat melampaui logika duniawi. Hati yang tenang akan membimbing akal menuju solusi yang lebih bijaksana dan seimbang, yang tidak hanya tepat secara logis tetapi juga membawa kedamaian spiritual.
        </p>
    </div>
);

const Bab8 = () => (
    <div className={`${contentContainerClasses}`}>
        <h2 className={`${sectionTitleClasses}`}>Bab 8. Kawrooh: Ilmu Melepas Tanpa Drama</h2>
        <p className={`${paragraphClasses}`}>
            Pernahkah Anda merasa hidup ini seperti *game* yang levelnya susah banget, dan Anda terus-menerus *stuck* di satu titik? Atau seperti membawa ransel yang isinya batu semua, berat banget, tapi Anda gak tahu cara melepasnya? Nah, di sinilah Metode Kawrooh hadir sebagai "cheat code" yang halal dan berkah.
        </p>
        <p className={`${paragraphClasses}`}>
            Kawrooh bukan mantra. Ia bukan metode holistik. Kawrooh adalah seni melepas yang lahir dari kesadaran. Ia sederhana tapi dalam. Ia tidak mengajari kita “cara cepat bahagia”, tapi cara jujur berdamai.
        </p>
        <p className={`${paragraphClasses}`}>
            "Kawrooh" adalah singkatan dari <span className={highlightTextClasses}>Keep Aware On Off Heart</span>. Ini bukan sekadar akronim keren, tapi inti dari sebuah filosofi yang mendalam. Kata "Kawruh" sendiri dalam bahasa Jawa berarti pengetahuan atau ilmu, yang menekankan pentingnya wawasan mendalam.
        </p>
        <p className={`${paragraphClasses}`}>
            Metode Kawrooh mengajarkan kita untuk melepaskan beban emosional dan mental dengan <span className={highlightTextClasses}>ridho Ilahi</span>, sehingga kita bisa mencapai tujuan yang berkah. Ini adalah pendekatan yang fokus pada kesadaran batin dan penyerahan diri untuk meraih ketenangan dan kebahagiaan sejati.
        </p>
        <p className={`${paragraphClasses}`}>
            Dalam konteks spiritual Jawa, ada "Kawruh Begja" dari Ki Ageng Suryomentaram. Beliau mengajarkan bahwa untuk bahagia, kita gak perlu mati-matian mengejarnya, dan penderitaan pun gak perlu dihindari. Kuncinya? Manusia hanya perlu mampu merespons atau mengatur perasaannya dalam memenuhi keinginan. Ini wawasan spiritual yang keren banget: kebahagiaan itu bukan tentang apa yang kita dapatkan, tapi bagaimana kita mengelola perasaan kita terhadap apa yang terjadi. Konsep "tentrem" (ketenangan batin) dalam Kawruh Jawa kontemporer juga menegaskan bahwa kebahagiaan sejati itu bukan cuma soal harta, tapi soal ketenangan pikiran dan jiwa.
        </p>
        <p className={`${paragraphClasses}`}>
            Metode Kawrooh ini juga menyentuh alam bawah sadar kita. Seringkali, "keyakinan dan perasaan yang membatasi diri" itu tersimpan di alam bawah sadar, bikin kita gak bisa maju. Dengan "melepaskan" hambatan bawah sadar ini, kita bisa mengakses "pengetahuan batin" yang lebih dalam dan "Diri yang tidak terbatas" yang terhubung dengan hati. Jadi, alam bawah sadar itu bukan "kekuatan hati" itu sendiri, tapi semacam "gudang" tempat penyumbatan hati berada. Kalau gudangnya bersih, kekuatan hati kita bisa keluar maksimal.
        </p>
        <p className={`${paragraphClasses}`}>
            Seringkali kita merasa berat bukan karena masalahnya besar, tapi karena kita menggenggamnya terlalu erat. Kawrooh mengajak kita untuk pelan-pelan sadar, lalu rela melepaskan. Tanpa drama. Tanpa paksaan. Tanpa *overthinking*.
        </p>
        <p className={`${paragraphClasses}`}>
            Kita nggak perlu berpura-pura kuat. Tapi kita bisa belajar mengenali apa yang sedang kita tahan. Dan dari sana, kita bisa memilih: lepaskan. Serahkan. Tenangkan.
        </p>
        <blockquote className={`${quoteClasses}`}>
            *“Beban hidup itu seperti batu di tas punggung. Kalau sadar, bisa dilepas. Kalau nggak, ya dibawa terus sambil ngeluh.”*
        </blockquote>
    </div>
);

const Bab9 = () => (
    <div className={`${contentContainerClasses}`}>
        <h2 className={`${sectionTitleClasses}`}>Bab 9. Langkah-Langkah Kawrooh</h2>
        <p className={`${paragraphClasses}`}>
            Metode Kawrooh memiliki alur sederhana namun sangat mendalam, dirancang untuk membantu kita kembali terhubung dengan diri sejati dan menemukan kedamaian batin. Berikut adalah langkah-langkahnya:
        </p>
        <h3 className={`${subHeadingClasses}`}>1. Keep Aware – Sadari Dulu</h3>
        <p className={`${paragraphClasses}`}>
            Banyak dari kita yang tanpa sadar berlari dari perasaan sendiri. Kita mencoba mengabaikan kecemasan, menekan kemarahan, atau berpura-pura baik-baik saja padahal hati sedang terluka. Ironisnya, perasaan yang kita tolak atau coba singkirkan itu justru akan menetap, bahkan bisa mengendap dan menjadi beban yang lebih berat.
        </p>
        <p className={`${paragraphClasses}`}>
            Maka, langkah pertama yang paling krusial adalah <span className={highlightTextClasses}>menyadari</span>: *apa sih yang sedang saya rasakan sekarang?* Ini adalah momen untuk berhenti sejenak dan melakukan *scan* batin.
        </p>
        <p className={`${paragraphClasses} font-semibold`}>Bagaimana cara mengakses perasaan Anda?</p>
        <ul className="list-disc list-inside mb-4">
            <li className={`${paragraphClasses} !mb-0`}>**Ambil jeda sejenak.** Berhenti dari aktivitas apa pun yang sedang Anda lakukan, bahkan hanya untuk beberapa detik. Tarik napas dalam-dalam, hembuskan perlahan.</li>
            <li className={`${paragraphClasses} !mb-0`}>**Perhatikan sensasi fisik.** Di mana Anda merasakan emosi itu di tubuh Anda? Apakah ada ketegangan di bahu? Perut terasa mual? Dada terasa sesak? Tangan dingin atau berkeringat? Sensasi fisik seringkali menjadi petunjuk pertama tentang apa yang sedang terjadi di dalam diri.</li>
            <li className={`${paragraphClasses} !mb-0`}>**Identifikasi emosi yang muncul.** Berikan nama pada perasaan itu. Apakah Anda sedang merasa <span className={highlightTextClasses}>takut</span> (mungkin takut akan masa depan yang belum jelas)? Merasa <span className={highlightTextClasses}>iri</span> (melihat pencapaian orang lain)? Merasa <span className={highlightTextClasses}>malu</span> (karena kesalahan masa lalu)? Merasa <span className={highlightTextClasses}>bingung</span> (dengan pilihan hidup)? Atau mungkin ada rasa <span className={highlightTextClasses}>ketakutan yang tidak beralasan</span> (padahal kejadiannya belum terjadi dan mungkin tidak akan pernah terjadi)? Atau <span className={highlightTextClasses}>rasa bersalah</span> atau <span className={highlightTextClasses}>penyesalan</span> yang belum terselesaikan (padahal peristiwa itu sudah lewat dan tidak bisa diubah)?</li>
            <li className={`${paragraphClasses} !mb-0`}>**Jangan melabeli "buruk" atau "baik".** Penting sekali untuk tidak menghakimi perasaan yang muncul. Ini bukan tentang menjadi "orang baik" atau "orang buruk" karena merasakan sesuatu. Ini hanyalah tentang mengenali dan menerima keberadaan perasaan tersebut. Anggap saja Anda sedang mengamati cuaca dalam diri; Anda tidak mengatakan hujan itu "buruk" atau cerah itu "baik", Anda hanya mencatat bahwa "sekarang sedang hujan" atau "sekarang sedang cerah". Begitu pula dengan emosi, cukup kenali: "Oh, saya sedang merasa cemas."</li>
        </ul>

        <h3 className={`${subHeadingClasses}`}>2. On Heart – Hadapi Tanpa Menghakimi</h3>
        <p className={`${paragraphClasses}`}>
            Setelah menyadari dan mengenali perasaan, langkah selanjutnya adalah membuka ruang bagi perasaan itu untuk hadir di hati Anda, tanpa perlawanan dan tanpa penghakiman. Rasakan sensasi emosi itu di dada atau bagian tubuh lain tempat ia bermanifestasi. Jangan buru-buru menganalisis, mencari penyebab, atau mencoba menyelesaikannya saat itu juga.
        </p>
        <p className={`${paragraphClasses}`}>
            Praktikkan <span className={highlightTextClasses}>mindfulness</span> atau kesadaran penuh. Ini melibatkan fokus total pada momen sekarang, tanpa memikirkan masa lalu atau masa depan. Caranya adalah dengan mengamati napas Anda yang masuk dan keluar, merasakan sensasi tubuh (seperti duduk atau berdiri), dan menyaksikan pikiran-pikiran yang muncul di benak Anda *tanpa berusaha mengubahnya atau bereaksi terhadapnya*. Dengan mengamati, Anda mulai menciptakan jarak yang sehat antara diri Anda sebagai pengamat dan beban-beban emosional atau pikiran tersebut. Anda akan sadar, "Oh, ini cuma pikiran cemas, bukan diri saya yang cemas," atau "Ini hanya rasa takut yang lewat, bukan saya yang takut itu." Ini seperti Anda melihat awan di langit; Anda tahu itu awan, Anda bisa melihat bentuk dan pergerakannya, tapi Anda bukan awan itu. Anda adalah langit yang luas dan tak terbatas, yang menyaksikan awan datang dan pergi.
        </p>
        <p className={`${paragraphClasses}`}>
            Dalam proses kesadaran ini, setelah memberi ruang pada perasaan, mulailah secara perlahan mengidentifikasi hal-hal kecil yang patut disyukuri dalam hidup Anda. Mungkin hari ini Anda masih bisa bernapas lega, masih bisa menikmati secangkir kopi hangat, atau masih bisa melihat indahnya matahari terbit. Rasa syukur adalah fondasi yang sangat kuat untuk melepaskan beban emosional dan pikiran negatif, karena ia secara efektif menggeser fokus dari kekurangan dan keterbatasan menuju kelimpahan dan anugerah. Ini seperti menyalakan lampu kecil di ruangan yang gelap gulita; perlahan-lahan, dengan hadirnya cahaya syukur, kegelapan akan berkurang dan menghilang.
        </p>

        <h3 className={`${subHeadingClasses}`}>3. Off Heart – Lepaskan dengan Izin dan Ikhlas</h3>
        <p className={`${paragraphClasses}`}>
            Setelah Anda cukup hadir dan mengenali perasaan tersebut, kini saatnya memberi izin pada diri untuk melepaskan. Proses pelepasan ini bisa melalui berbagai cara, seperti dengan mengatur napas, doa, dzikir, atau menulis. Salah satu cara sederhana adalah dengan mengakui secara jujur perasaan atau pikiran yang selama ini membatasi Anda, kemudian secara sadar dan sengaja memilih untuk melepaskannya. Bayangkan beban itu seperti Anda memegang kentang panas. Semakin lama Anda menggenggamnya, ia akan terasa semakin panas dan menyakitkan. Lepaskan saja!
        </p>
        
        <p className={`${paragraphClasses}`}>
            Daripada terus-menerus mencoba mengendalikan atau melawan perasaan-perasaan tersebut, fokuslah pada konsep <span className={highlightTextClasses}>penyerahan</span>. Serahkan segala kekhawatiran, ketakutan, atau keinginan untuk mengendalikan hasil di luar batas kendali Anda. Penyerahan ini bukan berarti Anda menjadi pasif atau malas-malasan; justru sebaliknya, Anda menjadi *powerful* karena bersandar pada kekuatan tak terbatas yang ada di luar diri Anda.
        </p>

        <h4 className="text-lg font-bold text-gray-700 mt-4 mb-2">• Menyerahkan Hasil dan Tidak Membatasi Kehendak Ilahi</h4>
        <p className={`${paragraphClasses}`}>
            Sadari bahwa tidak semua hal dalam hidup berada sepenuhnya dalam kendali Anda. Setelah melakukan upaya terbaik yang Anda bisa, serahkan hasilnya kepada Tuhan Yang Maha Esa. Ini adalah bentuk <span className={highlightTextClasses}>kepercayaan yang mendalam</span> yang ada kekuatan yang lebih besar yang mengatur segala sesuatu dengan hikmah-Nya. Jangan membatasi diri Anda dengan asumsi atau kekhawatiran manusiawi, sebab kehendak Ilahi itu tidak terbatas. Seringkali kita berkata, "Ah, mana mungkin saya bisa begini," atau "Rezeki saya cuma segini." Padahal, Allah bisa memberikan rezeki dan jalan keluar dari arah yang tidak disangka-sangka. Percayalah pada kemungkinan tak terhingga yang bisa datang dari-Nya. Ini ibarat Anda memesan makanan di restoran bintang lima. Anda tidak perlu tahu bagaimana koki menyiapkan hidangan itu; Anda hanya perlu percaya bahwa makanan terbaik akan segera tiba.
        </p>

        <h4 className="text-lg font-bold text-gray-700 mt-4 mb-2">• Membangun Rasa Percaya dan Penerimaan</h4>
        <p className={`${paragraphClasses}`}>
            Kembangkanlah rasa percaya yang tulus bahwa apa pun yang terjadi dalam hidup Anda adalah yang terbaik untuk Anda, sesuai dengan rencana dan ketentuan Ilahi. Penerimaan semacam ini bukanlah sikap pasif yang menyerah tanpa usaha, melainkan penerimaan aktif yang justru membebaskan Anda dari perjuangan batin yang tidak perlu dan melelahkan. Ini ibarat Anda naik perahu di sungai; Anda bisa mendayung untuk mengarahkan, namun pada saat yang sama, Anda juga harus menerima dan beradaptasi dengan arus sungai itu sendiri.
        </p>

        <h4 className="text-lg font-bold text-gray-700 mt-4 mb-2">• Ridho sebagai Kunci</h4>
        <p className={`${paragraphClasses}`}>
            <span className={highlightTextClasses}>Ridho Ilahi</span> adalah kunci utama menuju ketenangan batin dan keberkahan yang sejati. Ketika Anda telah mencapai tingkatan ridho dengan ketetapan-Nya, hati Anda akan menemukan kedamaian yang tak tergoyahkan, dan pintu-pintu keberkahan akan terbuka lebar. Ini adalah keadaan di mana Anda menerima segala sesuatu dengan lapang dada, baik dalam suka maupun duka, karena Anda meyakini bahwa semua itu datang dari sumber yang Maha Bijaksana dan Maha Mengetahui. 
        </p>
        <p className={`${paragraphClasses}`}>
            Dengan melepaskan beban dan menyerahkan diri dengan ridho Ilahi, Anda akan menemukan bahwa jalan menuju tujuan hidup yang bermakna dan diberkahi menjadi jauh lebih jelas dan ringan. Inilah saatnya Anda mulai 'memanen' hasil dari proses pembersihan dan penyerahan yang sudah Anda jalani.
        </p>

        <h4 className="text-lg font-bold text-gray-700 mt-4 mb-2">• Mengarahkan Energi</h4>
        <p className={`${paragraphClasses}`}>
            Energi yang sebelumnya terbuang sia-sia untuk kecemasan, ketakutan, dan perjuangan batin yang tak berujung, kini dapat diarahkan sepenuhnya untuk tindakan yang produktif dan selaras dengan panggilan hati Anda. Anda akan merasa lebih termotivasi, fokus, dan memiliki kejelasan tentang langkah-langkah nyata yang perlu diambil. Ibaratnya, baterai *smartphone* Anda kini penuh dan siap digunakan untuk hal-hal yang esensial dan bermakna.
        </p>

        <h4 className="text-lg font-bold text-gray-700 mt-4 mb-2">• Rezeki Tanpa Ngoyo</h4>
        <p className={`${paragraphClasses}`}>
            Ketika Anda telah hidup selaras dengan hati yang bersih dan ridho Ilahi, Anda akan menemukan bahwa rezeki datang dengan cara yang lebih mudah dan tanpa perlu 'ngoyo' (berusaha mati-matian dengan penuh tekanan dan kecemasan). Ini bukan berarti Anda tidak berusaha; sebaliknya, Anda tetap berusaha dengan sungguh-sungguh, namun dengan ketenangan, keyakinan, dan kepercayaan penuh bahwa Allah akan mencukupi kebutuhan Anda dari arah yang tidak disangka-sangka. Pernahkah Anda melihat orang yang terlihat santai dan tidak terlalu ngoyo, namun rezekinya senantiasa lancar dan berkah? Nah, mungkin mereka telah menerapkan prinsip ini. Mereka berusaha, tetapi hati mereka tidak terikat pada hasil, sehingga rezeki seolah datang dengan sendirinya, penuh berkah.
        </p>

        <h4 className="text-lg font-bold text-gray-700 mt-4 mb-2">• Tujuan yang Selaras dengan Hati</h4>
        <p className={`${paragraphClasses}`}>
            Ketika hati Anda jernih dan telah terhubung dengan kebijaksanaan batin, tujuan-tujuan yang Anda kejar akan menjadi tujuan yang benar-benar selaras dengan diri sejati Anda dan kehendak Ilahi. Ini bukan lagi tujuan yang semata-mata didorong oleh ego atau tekanan eksternal, melainkan tujuan yang membawa kedamaian, kepuasan, dan keberkahan sejati dalam setiap langkah.
        </p>
        <p className={`${paragraphClasses}`}>
            Latihan Kawrooh ini bisa dilakukan kapan saja dan dalam kondisi emosi apa pun. Baik saat Anda sedang merasakan kemarahan yang membakar, kekecewaan yang mendalam, atau bahkan kebahagiaan yang begitu intens hingga membuat Anda lekat pada dunia. Sebab, bahkan hal-hal yang paling kita cintai pun kadang perlu dilepaskan dengan ikhlas ke langit agar tidak menjadi 'berhala' yang mengikat hati dan menghalangi kedamaian batin.
        </p>
    <IntegratedAudioPlayer
            src="musik/PelepasanEmosiIslamic.mp3"
            text="Contoh Audio Pelepasan Emosi"
            
        />
    </div>
);

const Bab10 = () => {
   return (
  <div className={`${contentContainerClasses}`}>
          <h2 className={`${sectionTitleClasses}`}>Bab 10. Sholawat: Jalan Cepat Menuju Cahaya</h2>
        <p className={`${paragraphClasses}`}>
            Sholawat adalah bentuk pujian, penghormatan, dan doa kepada Nabi Muhammad SAW. Ini adalah salah satu amalan spiritual yang paling dicintai dalam Islam, yang membawa banyak keberkahan bagi pelakunya.
        </p>
        <p className={`${paragraphClasses}`}>
            Penting untuk dipahami bahwa sholawat yang bersumber langsung dari Nabi Muhammad SAW atau doa-doa yang terdapat dalam hadits shahih dapat diamalkan secara langsung tanpa memerlukan "ijazah" (izin). Demikian pula, doa-doa atau sholawat yang disusun oleh para alim ulama juga dapat diamalkan tanpa memerlukan "ijazah". Konsep "qobiltu ijazah" lebih merupakan adab atau etika dalam menerima izin untuk mengamalkan suatu wirid, doa, atau ilmu tertentu dari seorang guru atau ulama. Ini adalah bentuk penghormatan dan pengakuan terhadap sanad keilmuan. Namun, ketiadaan "qobiltu" tidak menghalangi seseorang untuk mengamalkan sholawat atau doa yang sudah jelas sumbernya dan keutamaannya, terutama jika tujuannya adalah untuk mengingat Allah SWT dan mencari ketentraman hati.
        </p>
        <p className={`${paragraphClasses}`}>
            Mengamalkan sholawat adalah salah satu cara terbaik untuk mengingat Allah SWT. Allah SWT berfirman yang artinya: <span className={highlightTextClasses}>"(yaitu) orang-orang yang beriman dan hati mereka menjadi tenteram dengan mengingat Allah. Ingatlah, hanya dengan mengingat Allah-lah hati menjadi tenteram."</span> (QS. Ar-Ra'd: 28). Dengan bersholawat, Anda secara aktif mengingat Allah dan Nabi-Nya, yang secara langsung membawa ketenangan dan kedamaian ke dalam hati Anda.
        </p>
        <p className={`${paragraphClasses}`}>
            Di sinilah letak "privilege" yang tak terhingga dari sholawat. Coba bayangkan di dunia nyata. Kalau Anda punya "Orang Dalam" (Ordal) di sebuah instansi atau perusahaan besar, urusan Anda pasti lebih lancar, kan? Ada jalur khusus, ada kemudahan yang tidak didapatkan orang lain. Nah, dalam skala yang jauh lebih besar dan tak terhingga, Nabi Muhammad SAW adalah "Orang Dalam" kita di sisi Allah SWT. Sebagaimana sebuah sabda Qudsi yang masyhur, Allah SWT berfirman, <span className={highlightTextClasses}>"Tidak Kuciptakan dunia ini kecuali karena adanya kamu, Muhammad."</span>
        </p>
        <p className={`${paragraphClasses}`}>
            Ungkapan ini menegaskan kedudukan agung Nabi Muhammad SAW sebagai sebab penciptaan alam semesta, menjadikannya "Orang Dalam" (Ordal) tertinggi di sisi Ilahi. Melalui sholawat, kita membangun koneksi langsung dengan pribadi yang menjadi inti dan tujuan penciptaan ini. Ini adalah akses istimewa, sebuah saluran keberkahan yang tak terbatas, yang melampaui segala logika dan perhitungan duniawi. Jadi, kalau Anda merasa buntu, ingatlah "Ordal" kita ini!
        </p>
        <blockquote className={`${quoteClasses}`}>
            *Jika engkau punya Rasul dalam hatimu, maka langit pun mencatat langkahmu. Rezeki akan mengejarmu, karena Allah mencintai pecinta Rasul-Nya.*
        </blockquote>
        <p className={`${paragraphClasses}`}>
            Manfaat sholawat sangat beragam dan mencakup aspek duniawi maupun ukhrawi:
        </p>
        <ul className="list-disc list-inside mb-4">
            <li className={`${paragraphClasses} !mb-0`}>**Ketenangan Hati:** Seperti disebutkan dalam Al-Qur'an, mengingat Allah melalui sholawat adalah sumber ketenangan batin yang mendalam.</li>
            <li className={`${paragraphClasses} !mb-0`}>**Rezeki yang Melimpah:** Beberapa riwayat dan pengalaman spiritual menunjukkan bahwa sholawat dapat menjadi pembuka pintu rezeki yang berkah, seringkali datang dengan cara yang tidak terduga dan tanpa perlu "ngoyo" yang berlebihan.</li>
            <li className={`${paragraphClasses} !mb-0`}>**Perlindungan dan Keamanan:** Mengamalkan sholawat juga dapat memberikan perlindungan dari berbagai kesulitan dan bahaya, serta menjauhkan dari kemiskinan.</li>
            <li className={`${paragraphClasses} !mb-0`}>**Kedekatan dengan Nabi SAW:** Sholawat adalah cara untuk menunjukkan cinta dan penghormatan kepada Nabi Muhammad SAW, yang pada gilirannya akan mendekatkan Anda kepada beliau di dunia dan akhirat.</li>
        </ul>
       
      <p className={`${paragraphClasses} text-black-800`}>
        Sholawat adalah salah satu amalan spiritual paling dicintai dalam Islam. Di bawah ini adalah beberapa sholawat populer beserta fadhilah dan anjuran pengamalannya. Klik pada setiap judul untuk membuka detailnya.
      </p>

      {/* Sholawat Nariyah */}
      <SholawatAccordion
        title="1. Sholawat Nariyah"
        audioSrc="musik/Sholawatnariyahbowl.mp3"
        arabicText="اللَّهُمَّ صَلِّ صَلاَةً كَامِلَةً وَسَلِّمْ سَلاَماً تَامًّا عَلَى سَيِّدِنَا مُحَمَّدٍ الَّذِي تَنْحَلُّ بِهِ الْعُقَدُ، وَتَنْفَرِجُ بِهِ الْكُرَبُ، وَتُقْضَى بِهِ الْحَوَائِجُ، وَتُنَالُ بِهِ الرَّغَائِبُ، وَحُسْنُ الْخَوَاتِيمِ، وَيُسْتَسْقَى الْغَمَامُ بِوَجْهِهِ الْكَرِيمِ، وَعَلَى آلِهِ وَصَحْبِهِ، فِي كُلِّ لَمْحَةٍ وَنَفَسٍ، بِعَدَدِ كُلِّ مَعْلُومٍ لَكَ."
        latinText="Allahumma shalli shalaatan kaamilatan wa sallim salaaman taamman ‘alaa sayyidinaa Muhammadin illadzi tanhallu bihil ‘uqad wa tanfariju bihil kurab wa tuqdhaa bihil hawaaij wa tunaalu bihir raghaaib wa husnul khawaatim wa yustasqal ghamaamu bi wajhihil kariim wa ‘alaa aalihi wa shahbihi fii kulli lamhatin wa nafasin bi ‘adadi kulli ma’luumin laka."
        translationText="Ya Allah, limpahkanlah shalawat yang sempurna dan salam yang sempurna kepada junjungan kami Nabi Muhammad, yang dengan beliau segala simpul kesulitan terurai, segala kesusahan teratasi, segala kebutuhan terpenuhi, segala keinginan tercapai, dan husnul khatimah didapatkan. Dengan wajah mulia beliau, awan pun menurunkan hujan. Dan (limpahkan juga) kepada keluarga dan para sahabat beliau, dalam setiap kilatan pandangan dan hembusan nafas, sebanyak jumlah segala sesuatu yang Engkau ketahui.
"
      >
        <ul className="list-disc pl-5 space-y-1">
            <li><b>Melancarkan Rezeki:</b> Baca 11 kali setiap selesai sholat fardhu.</li>
            <li><b>Memudahkan Urusan:</b> Baca 31 kali setiap selesai sholat Subuh.</li>
            <li><b>Hajat Besar & Tolak Bala:</b> Baca 300 kali (berjamaah) atau 4.444 kali (sendiri dalam satu majelis).</li>
            <li><b>Menghilangkan Kesedihan:</b> Baca 90 kali setiap hari.</li>
        </ul>
      </SholawatAccordion>

      {/* Sholawat Munjiyat */}
      <SholawatAccordion
        title="2. Sholawat Munjiyat"
        audioSrc="musik/Sholawatmunjiyatbowl.mp3"
        arabicText="اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلَاةً تُنَجِّينَا بِهَا مِنْ جَمِيعِ الْأَهْوَالِ وَالآفَاتِ، وَتَقْضِي لَنَا بِهَا جَمِيعَ الْحَاجَاتِ، وَتُطَهِّرُنَا بِهَا مِنْ جَمِيعِ السَّيِّئَاتِ، وَتَرْفَعُنَا بِهَا عِنْدَكَ أَعْلَى الدَّرَجَاتِ..."
        latinText="Allahumma shalli ‘ala sayyidina Muhammadin shalaatan tunajjinaa biha min jamii’il ahwaali wal aafaat, wa taqdhi lanaa biha jamii’al haajaat, wa tutahhirunaa biha min jamii’is sayyi’aat, wa tarfa’unaa biha ‘indaka a’lad darajaat, wa tuballighunaa biha aqshal ghaayaat min jamii’il khayraat fil hayaat wa ba’dal mamaat. Innaka ‘ala kulli syai’in qadiir.*
"
        translationText="Ya Allah, limpahkanlah shalawat kepada junjungan kami Nabi Muhammad, sebuah shalawat yang dengannya Engkau menyelamatkan kami dari segala bahaya dan bencana, Engkau penuhi semua hajat kami, Engkau sucikan kami dari segala dosa, Engkau angkat derajat kami ke tempat yang paling tinggi di sisi-Mu, dan Engkau sampaikan kami kepada tujuan tertinggi dari semua kebaikan dalam kehidupan ini dan sesudah mati. Sesungguhnya Engkau Maha Kuasa atas segala sesuatu.
"
      >
        <ul className="list-disc pl-5 space-y-1">
            <li><b>Terkabulnya Doa:</b> Baca 11 kali setiap selesai sholat Subuh.</li>
            <li><b>Kelancaran Urusan/Pekerjaan:</b> Baca 40 kali di pagi hari sebelum beraktivitas.</li>
            <li><b>Terhindar dari Penyakit/Musibah:</b> Baca 1.000 kali di tengah malam.</li>
            <li><b>Meraih Kesuksesan:</b> Baca 500 kali setiap hari.</li>
        </ul>
      </SholawatAccordion>
      
      {/* Sholawat Nuril Anwar */}
       <SholawatAccordion
        title="3. Sholawat Nuril Anwar"
        audioSrc="musik/SholawatNA8d.mp3"
        arabicText="اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ نُورِ الْأَنْوَارِ، وَسِرِّ الْأَسْرَارِ، وَتِرْيَاقِ الْأَغْيَارِ، وَمِفْتَاحِ بَابِ الْيَسَارِ..."
        latinText="Allahumma shalli ‘ala Sayyidina Muhammad, Nuril Anwar, wa Sirril Asrar, wa Tiryāqil Aghyār, wa Miftāhi Bābil Yasar, Sayyidina wa Maulana Muhammadinil Mukhtar, wa Alihi al-Athar, wa Shahbihi al-Akhyar, 'Adada Ni'amillahi wa Ifdhalihi.*
 "
        translationText="Ya Allah, limpahkanlah rahmat kepada junjungan kami, Nabi Muhammad,Cahaya dari segala Cahaya, dan Rahasia dari segala Rahasia, dan Penawar kesusahan (bagi selain Allah), dan Kunci pembuka pintu kemudahan (kelapangan). Junjungan kami dan pemimpin kami, Nabi Muhammad yang terpilih, dan keluarga beliau yang suci, serta para sahabat beliau yang baik-baik, sebanyak jumlah nikmat Allah dan karunia-Nya."
 
      >
        <ul className="list-disc pl-5 space-y-1">
            <li><b>Terhindar dari Bahaya & Kelancaran Rezeki:</b> Baca setiap selesai sholat fardhu.</li>
            <li><b>Rezeki Lahir Batin & Cahaya Ilahi:</b> Baca 100 kali sehari semalam.</li>
            <li><b>Terhindar dari Sihir:</b> Baca 7 kali setiap akan tidur.</li>
            <li><b>Memperoleh Kedudukan:</b> Baca 21 kali setiap akan berangkat kerja.</li>
        </ul>
      </SholawatAccordion>
      
      {/* Sholawat Futuh Rizq */}
       <SholawatAccordion
        title="4. Sholawat Futuh Rizq Wal Afiyah"
        audioSrc="musik/SholawatFRWA8d.mp3"
        arabicText="اللّٰهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ صَلَاةً تَفْتَحُ لَنَا بِهَا أَبْوَابَ الرِّزْقِ وَالْعَافِيَةِ..."
        latinText="Allahumma shalli ‘alâ Sayyidinâ Muhammadin shalâtan taftahu lanâ bihâ abwâbar rizqi wal ‘âfiyah, wa tuskinu bihâ khawfanâ, wa tuyassiru lanâ bihâ kulla amrin ‘asîr, wa tujliya bihâ kulla hamm wa gham, wa taqdhi bihâ jamî’a hawâ’ijinâ fid-dunyâ wal-âkhirah, wa ‘alâ âlihi wa shahbihi wa sallim.*
"
        translationText="Ya Allah, limpahkanlah shalawat atas junjungan kami Nabi Muhammad, shalawat yang dengannya Engkau bukakan bagi kami pintu-pintu rezeki dan ‘afiyah (keselamatan lahir batin), yang dengannya Engkau tenangkan ketakutan kami, mudahkan segala urusan kami yang sulit, hilangkan segala kesedihan dan kegundahan kami, dan penuhilah segala hajat kami di dunia dan akhirat. Serta limpahkan pula shalawat kepada keluarga dan sahabatnya.
"
      >
        <ul className="list-disc pl-5 space-y-1">
            <li><b>Wirid Harian:</b> Baca minimal 7 atau 11 kali setelah sholat fardhu.</li>
            <li><b>Hajat Mendesak:</b> Baca 41 kali setiap hari secara rutin.</li>
            <li><b>Kelancaran Rezeki Signifikan:</b> Baca 100 kali setiap hari.</li>
        </ul>
      </SholawatAccordion>

    </div>
  );
};

const Bab11 = () => (
    <div className={`${contentContainerClasses}`}>
        <h2 className={`${sectionTitleClasses}`}>Bab 11. Afirmasi, Dzikir, Doa, dan Amal Saleh</h2>
        <p className={`${paragraphClasses}`}>
            Penggunaan afirmasi, mantra, wirid, dan doa merupakan praktik spiritual yang kuat untuk memprogram ulang pikiran bawah sadar dan meningkatkan getaran energi seseorang.
        </p>
        <h3 className={`${subHeadingClasses}`}>Penggunaan Afirmasi:</h3>
        <p className={`${paragraphClasses}`}>
            Afirmasi adalah pernyataan positif yang diulang-ulang untuk menguatkan niat dan keyakinan. Contoh afirmasi untuk pembukaan mata batin dan peningkatan intuisi antara lain "Mata batinku terbuka dan jernih" atau "Aku melihat dengan kebijaksanaan dan kejelasan".
        </p>

        <h3 className={`${subHeadingClasses}`}>Mantra dan Wirid/Dzikir Islami:</h3>
        <p className={`${paragraphClasses}`}>
            **Mantra Sanskrit:** Beberapa mantra Sanskrit diyakini dapat membangkitkan energi mata ketiga, seperti "Om Hrim Soham", "Aum" atau "Om" (suara primordial kesadaran universal), dan "So Hum" (yang berarti "Saya adalah Itu", menghubungkan diri dengan kesadaran kosmis).
        </p>
        <p className={`${paragraphClasses}`}>
            **Wirid/Dzikir Islami:** Dalam tradisi Islam, wirid atau zikir melibatkan pengagungan nama-nama Allah SWT, seperti "Laa ilaaha illallaah" (tiada Tuhan selain Allah), Astaghfirullaah (aku memohon ampun kepada Allah), Subhaanallaah (Maha Suci Allah), Alhamdulillaah (segala puji bagi Allah), Allahu Akbar (Allah Maha Besar), dan shalawat kepada Nabi Muhammad SAW. Penting ditekankan bahwa zikir atau wirid harus diucapkan dengan tulus, penuh penghayatan, dan diresapi dalam hati, bukan sekadar dihafal. Kunci dari Mata Ketiga atau Nur Aini dalam konteks Islam adalah Ikhlas dan Pasrah. Surat Al-Ikhlas, misalnya, ditekankan sebagai metode untuk membuka mata batin dalam Islam, dengan penekanan pada rasa ikhlas dalam hati. Pikiran harus tetap positif dan fokus kepada Yang Maha Esa.
        </p>
        <p className={`${paragraphClasses}`}>
            Integrasi afirmasi, mantra Sanskrit, dan wirid/zikir/doa Islami menyoroti prinsip universal resonansi vibrasi dan kekuatan niat yang diucapkan atau dipikirkan. Namun, konteks Islam menambahkan lapisan penting: sumber dan tujuan niat. Sementara afirmasi sering berpusat pada pemberdayaan diri ("Saya jelas," "Saya memanifestasikan kelimpahan"), wirid/zikir dalam Islam secara eksplisit mengarahkan energi dan niat <span className={highlightTextClasses}>kepada Allah</span>, mencari keridhaan dan hubungan dengan-Nya. Ini menggeser fokus dari manifestasi egoistik ke penyelarasan ilahi, menekankan <span className={highlightTextClasses}>tauhid</span> (keesaan Allah) dan <span className={highlightTextClasses}>ikhlas</span> (ketulusan) sebagai pendorong utama hasil spiritual dan material. Ini adalah perbedaan krusial bagi individu yang ingin mengintegrasikan konsep-konsep ini dalam kerangka Islam, memastikan bahwa "pemrograman realitas" dilakukan selaras dengan <span className={highlightTextClasses}>tauhid</span>.
        </p>
        <p className={`${paragraphClasses}`}>
            Dan doa? Ia bukan hanya permintaan. Ia adalah bentuk pengakuan: bahwa kita lemah, dan Dia Mahakuasa.
        </p>
        <p className={`${paragraphClasses}`}>
            Amal saleh bukan sekadar ritual. Ia adalah buah dari cinta. Cinta kepada Allah, dan cinta kepada sesama.
        </p>
        <p className={`${paragraphClasses}`}>
            Ketika kita gabungkan dzikir, doa, dan amal—itulah bentuk penyerahan diri aktif. Kita tidak pasrah dengan menyerah. Kita pasrah dengan berserah.
        </p>
        <blockquote className={`${quoteClasses}`}>
            *“Barang siapa yang bertawakkal kepada Allah, maka Allah akan mencukupkan kebutuhannya.”* (QS. At-Talaq: 3)
        </blockquote>
        <p className={`${paragraphClasses}`}>
            Penyerahan diri bukan akhir usaha. Ia adalah puncaknya. Saat kita sudah melakukan yang bisa kita lakukan, lalu meletakkan hasilnya di tangan-Nya. Tenang. Karena kita tahu: Yang Maha Mengetahui sedang menata ulang semuanya.
        </p>
    </div>
);

const Bab12 = () => (
    <div className={`${contentContainerClasses}`}>
        <h2 className={`${sectionTitleClasses}`}>Bab 12. Membersihkan Kaca Jiwa: Tazkiyatun Nafs</h2>
        <p className={`${paragraphClasses}`}>
            Jiwa kita ibarat kaca. Ia bisa memantulkan cahaya Ilahi, tapi juga bisa buram karena debu dunia. Debu itu bisa berupa marah yang dipendam, iri yang ditutup-tutupi, atau cinta dunia yang tak terkendali.
        </p>
        <p className={`${paragraphClasses}`}>
            <span className={highlightTextClasses}>Tazkiyatun nafs</span> adalah proses membersihkan kaca jiwa itu. Ia bukan pekerjaan sekali jadi. Ia pekerjaan seumur hidup. Tapi semakin jernih kaca itu, semakin terang cahaya dari-Nya menyinari hidup kita.
        </p>
        <p className={`${paragraphClasses}`}>
            Para sufi menjadikan tazkiyah sebagai fondasi utama. Tidak ada ilmu, maqam, atau hikmah yang bisa menetap di hati yang kotor. Maka sebelum melangkah lebih jauh, kita bersihkan dulu dalamnya.
        </p>
        <p className={`${paragraphClasses}`}>
            Pemurnian jiwa adalah sebuah perjalanan yang melibatkan serangkaian praktik dan perubahan internal:
        </p>
        <ul className="list-disc list-inside mb-4">
            <li className={`${paragraphClasses} !mb-0`}>**Takhalli (Pengosongan Sifat Tercela):** Ini adalah langkah awal yang krusial, yaitu upaya untuk mengosongkan sifat-sifat tercela (*takhalli*), dimulai dengan menyadari keburukan maksiat lahir dan batin untuk menghindarinya.</li>
            <li className={`${paragraphClasses} !mb-0`}>**Tahalli (Pengisian Sifat Terpuji):** Setelah melakukan takhalli, hati diisi dengan sifat-sifat terpuji (*tahallī*) seperti taat, taubat, ikhlas, zuhud, sabar, dan syukur.</li>
            <li className={`${paragraphClasses} !mb-0`}>**Mujahadah an-Nafs (Perjuangan Melawan Hawa Nafsu):** Ini adalah perjuangan melawan tuntutan hawa nafsu, yang merupakan inti dari riyadoh yang telah dilakukan.</li>
            <li className={`${paragraphClasses} !mb-0`}>**Dzikir (Mengingat Allah):** Membiasakan diri untuk selalu menyebut Allah dengan hati dan lidah. Praktik ini membawa ketenangan hati, sebagaimana firman Allah, "Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram" (QS Ar-Ra'd 13:28).</li>
            <li className={`${paragraphClasses} !mb-0`}>**Khalwat/Uzlah (Menyendiri):** Praktik menyendiri untuk fokus pada ibadah dan pengembangan spiritual.</li>
            <li className={`${paragraphClasses} !mb-0`}>**Wirid/Doa (Amalan/Doa):** Pembacaan wirid, doa, atau mantra secara teratur dengan penghayatan penuh dalam hati.</li>
            <li className={`${paragraphClasses} !mb-0`}>**Ikhlas (Ketulusan):** Ini adalah syarat mutlak diterimanya ibadah dan untuk mendapatkan faedah dari amalan.</li>
            <li className={`${paragraphClasses} !mb-0`}>**Puasa dan Jaga Malam (Sholat Malam/Tahajjud):** Praktik-praktik ini memperdalam koneksi spiritual dan membantu pemurnian. Sholat Tahajjud adalah waktu khusus untuk mencari bimbingan dan dukungan Allah.</li>
        </ul>
        <p className={`${paragraphClasses}`}>
            Pemurnian jiwa memiliki hubungan erat dengan terbukanya <span className={highlightTextClasses}>Kasyf</span> (penyingkapan batin) dan intuisi. <span className={highlightTextClasses}>Kasyf</span> adalah anugerah langsung dari Allah (*ilmu Rabbanī* atau *ilmu lāduni*) yang diberikan kepada orang yang teguh dalam dzikir, uzlah, dan mujahadah. Jangan tunggu sempurna untuk memulai. Karena justru dengan memulai, kita sedang bergerak menuju penyucian.
        </p>
        <blockquote className={`${quoteClasses}`}>
            *“Beruntunglah orang yang menyucikan jiwanya.”* (QS. Asy-Syams: 9)
        </blockquote>
    </div>
);

const Bab13 = () => (
    <div className={`${contentContainerClasses}`}>
        <h2 className={`${sectionTitleClasses}`}>Bab 13. Praktik-Praktik Spiritual Harian</h2>
        <p className={`${paragraphClasses}`}>
            Spiritualitas sejati bukanlah sekadar kegiatan sesekali seperti mengikuti pengajian besar atau retret tahunan. Lebih dari itu, spiritualitas adalah denyut nadi kehidupan itu sendiri, yang hadir dan hidup di setiap momen keseharian kita. Ia terwujud dalam cara kita menyambut pagi dengan rasa syukur, dalam kelembutan saat kita memberi makan anak, dalam ketulusan saat kita memaafkan pasangan, bahkan dalam keikhlasan saat kita bekerja tanpa mengeluh dan tanpa berharap pujian berlebihan. Ini adalah tentang bagaimana kita membawa kesadaran dan kehadiran hati ke dalam setiap aspek hidup kita.
        </p>
        <p className={`${paragraphClasses}`}>
            Berikut adalah beberapa praktik ringan namun berdampak sangat besar, yang bisa Anda terapkan setiap hari untuk memperkaya dimensi spiritual dan menemukan kedamaian batin:
        </p>
        <h3 className={`${subHeadingClasses}`}>🔹 Niat di Pagi Hari – Ucapkan dalam Hati: "Hari ini aku ingin hadir, bukan sekadar sibuk."</h3>
        <p className={`${paragraphClasses}`}>
            Mulailah hari Anda dengan sebuah niat yang jernih. Sebelum terperangkap dalam daftar tugas atau hiruk pikuk agenda, luangkan waktu sejenak, pejamkan mata, dan ucapkan dalam hati, "Hari ini aku ingin hadir seutuhnya, bukan sekadar sibuk tanpa makna. Aku ingin merasakan setiap momen, bukan hanya mengejar waktu. <span className={highlightTextClasses}>Dan aku kirimkan doa terbaikku, keberkahan, kesejahteraan, serta kebaikan untuk seluruh makhluk Allah di alam semesta ini.</span>" Niat ini akan menjadi jangkar yang mengarahkan fokus dan energi Anda sepanjang hari, membantu Anda tetap terhubung dengan diri sendiri di tengah segala aktivitas.
        </p>

        <h3 className={`${subHeadingClasses}`}>🔹 Latih Metode Kawrooh – Agar Terbiasa Melihat Situasi Apapun dalam Kondisi Hati yang Tenang</h3>
        <p className={`${paragraphClasses}`}>
            Metode Kawrooh yang telah kita pelajari adalah alat paling ampuh untuk menjaga ketenangan hati di tengah badai kehidupan. Luangkan beberapa menit setiap kali Anda merasakan gejolak emosi—baik itu kecemasan, kekesalan, atau bahkan kebahagiaan berlebihan yang membuat Anda melekat. Sadari apa yang Anda rasakan (*Keep Aware*), biarkan ia hadir tanpa penghakiman (*On Heart*), lalu lepaskan dengan izin dan keikhlasan (*Off Heart*). Semakin sering Anda melatih ini, semakin terbiasa hati Anda melihat situasi apapun dari posisi yang tenang dan jernih.
        </p>

        <h3 className={`${subHeadingClasses}`}>🔹 Napas Sadar – Ambil 3 Tarikan Napas Dalam Sebelum Mulai Aktivitas. Rasakan Hadirnya Allah.</h3>
        <p className={`${paragraphClasses}`}>
            Sebelum memulai aktivitas baru, entah itu bekerja, makan, atau bahkan berbicara, berhenti sejenak dan ambil tiga tarikan napas dalam-dalam. Tarik napas perlahan melalui hidung, rasakan udara memenuhi paru-paru, tahan sejenak, lalu hembuskan perlahan melalui mulut. Saat melakukan ini, rasakan kehadiran Allah SWT yang Maha Memberi Kehidupan melalui setiap hembusan napas Anda. Ini adalah momen kecil untuk bersyukur atas karunia hidup, atas udara yang Anda hirup, dan atas setiap detak jantung yang masih berfungsi. Praktik singkat ini akan mengembalikan Anda pada momen kini dan menenangkan pikiran.
        </p>

        <h3 className={`${subHeadingClasses}`}>🔹 Sholawat Otomatis – Jadikan Sholawat sebagai Selingan dari *Scrolling* Medsos atau Saat Antri.</h3>
        <p className={`${paragraphClasses}`}>
            Di era digital ini, sangat mudah bagi kita untuk menghabiskan waktu luang dengan *scrolling* media sosial tanpa henti. Ubahlah kebiasaan ini dengan menggantinya menjadi "sholawat otomatis." Setiap kali Anda merasa ingin meraih ponsel untuk *scrolling* atau atau saat sedang mengantre di mana pun, jadikan itu sebagai isyarat untuk membaca sholawat secara berulang-ulang dalam hati. Ini bukan hanya amalan yang berpahala, tetapi juga cara efektif untuk mengalihkan pikiran dari distraksi duniawi ke arah yang lebih spiritual dan menenangkan.
        </p>

        <h3 className={`${subHeadingClasses}`}>🔹 Dzikir Singkat tapi Khusyuk – Seperti "Hasbunallah" atau "Ya Rahman", Ulangi 33x dengan Hati.</h3>
        <p className={`${paragraphClasses}`}>
            Tidak perlu menunggu waktu khusus untuk berzikir panjang. Cukup pilih satu kalimat dzikir singkat yang Anda sukai, seperti "Hasbunallah wa Ni'mal Wakil" (Cukuplah Allah bagiku, dan Dialah sebaik-baik pelindung) atau "Ya Rahman" (Wahai Yang Maha Pengasih). Ulangi 33 kali atau sesuai kemampuan Anda, namun pastikan dilakukan dengan hati yang khusyuk dan penuh penghayatan, bukan sekadar di lisan. Ini adalah cara praktis untuk terus mengingat Allah dan mengisi hati dengan ketenangan di sela-sela kesibukan.
        </p>

        <h3 className={`${subHeadingClasses}`}>🔹 Sedekah Tanpa Drama – Walau Hanya Seribu, Niatkan sebagai Investasi Rasa Cukup.</h3>
        <p className={`${paragraphClasses}`}>
            Sedekah tidak selalu harus dalam jumlah besar dan diumumkan kepada banyak orang. Sedekah yang paling berkah seringkali adalah yang dilakukan tanpa drama, bahkan hanya seribu rupiah. Niatkan sedekah kecil ini sebagai investasi batin untuk menumbuhkan <span className={highlightTextClasses}>rasa cukup</span> dalam diri. Ketika Anda memberi dengan tulus, tanpa terbebani dengan ekspektasi balasan, hati Anda akan merasakan kelapangan dan rasa syukur karena memiliki sesuatu untuk diberikan. Ini juga merupakan cara untuk mengungkapkan rasa syukur atas rezeki yang telah Anda terima.
        </p>

        <h3 className={`${subHeadingClasses}`}>🔹 Memaafkan Cepat – Karena Kita Juga Ingin Segera Dimaafkan oleh-Nya.</h3>
        <p className={`${paragraphClasses}`}>
            Emosi negatif seperti dendam dan kemarahan adalah beban berat bagi hati. Maka, praktikkan memaafkan dengan cepat. Begitu Anda merasakan ada rasa tidak suka atau kesal terhadap seseorang, segera maafkanlah mereka dalam hati. Ini bukan berarti Anda membenarkan kesalahan mereka, melainkan melepaskan diri Anda dari ikatan emosi negatif. Ingatlah, kita semua adalah manusia yang tak luput dari salah dan khilaf. Sebagaimana kita berharap segera dimaafkan oleh Allah SWT atas dosa-dosa kita, maka berikan pula maaf itu kepada sesama. Tindakan memaafkan ini akan membebaskan hati Anda dan mengisinya dengan kedamaian.
        </p>
        <p className={`${paragraphClasses}`}>
            Praktik-praktik spiritual harian ini bukanlah beban tambahan yang memberatkan jadwal Anda. Sebaliknya, mereka adalah ruang-ruang kecil tempat kita dapat menghirup cahaya, menemukan ketenangan, dan memperkuat koneksi dengan Ilahi. Dalam hidup yang seringkali terasa padat dan penuh tantangan, kadang satu tarikan napas sadar, satu kalimat dzikir penuh syukur, atau satu tindakan memaafkan, bisa menjadi penyelamat jiwa kita dari kekacauan dunia.
        </p>
    </div>
);

const Bab14a = () => (
    <div className={`${contentContainerClasses}`}>
        <h2 className={`${sectionTitleClasses}`}>Bab 14.a Law of Attraction: Versi Langit Bukan Versi Afirmasi</h2>
        <h3 className={`${subHeadingClasses}`}>A. Konsep Law of Attraction dan Kelimpahan</h3>
        <p className={`${paragraphClasses}`}>
            Secara umum, Hukum Tarik-Menarik menyatakan bahwa seseorang menarik realitas yang selaras dengan frekuensi vibrasi dan kualitas jiwanya. Ini berarti bahwa pikiran, perasaan, dan keyakinan seseorang secara aktif membentuk pengalaman hidupnya. Hipnoterapis Dolores Cannon mengidentifikasi beberapa tanda bahwa kekayaan dan kelimpahan akan datang, seperti melihat angka 7 (yang bergetar dengan frekuensi manifestasi dan kelimpahan), merasakan kedamaian batin dan kepercayaan, menemukan uang kecil (terutama koin), serta munculnya peluang baru secara teratur. Tanda-tanda ini menunjukkan adanya penyelarasan antara diri dengan alam semesta, yang mencerminkan konsep sinkronisitas dan hukum tarik-menarik.
        </p>
        <p className={`${paragraphClasses}`}>
            Namun, terdapat kesalahpahaman umum tentang Hukum Tarik-Menarik. Seringkali disalahartikan bahwa seseorang bisa mendapatkan hasil hanya dengan memikirkannya, seperti seorang petani yang berharap panen melimpah tanpa melakukan tindakan nyata. Pandangan ini dianggap sebagai ilusi dan penyalahgunaan hukum ini untuk mengejar keinginan egoistik. Dalam jalan spiritual, keinginan egoistik semacam itu tidak seharusnya ada. Pemahaman yang benar adalah bahwa seseorang menarik realitas sesuai dengan <span className={highlightTextClasses}>kualitas jiwanya</span>. Pikiran hanyalah salah satu elemen dari kualitas jiwa yang kemudian terproyeksikan ke alam semesta. Jika jiwa seseorang murni, ia akan menarik segala sesuatu yang selaras, termasuk kelimpahan. Oleh karena itu, fokusnya bukan pada kelimpahan itu sendiri, melainkan pada prakondisinya, yaitu memurnikan jiwa.
        </p>

        <h3 className={`${subHeadingClasses}`}>Kelimpahan dalam Islam: Rezeki dari Allah</h3>
        <p className={`${paragraphClasses}`}>
            Dalam pandangan Islam, konsep rezeki memiliki dimensi yang lebih luas dan fundamental. Rezeki adalah jaminan dari Allah SWT untuk seluruh makhluk-Nya, tanpa terkecuali, meskipun dengan kadar dan waktu yang berbeda-beda. Allah berfirman dalam Surah Hud ayat 6, <span className={highlightTextClasses}>"Tidak ada satu makhluk melatapun yang bergerak di atas bumi ini yang tidak dijamin ALLAH rezekinya"</span>. Imam Ibnu Katsir menjelaskan bahwa Allah menjamin rezeki semua makhluk-Nya, baik yang kecil maupun yang besar, di daratan maupun di lautan, dan Dia mengetahui tempat berdiam serta tempat penyimpanan rezeki mereka.
        </p>
        <p className={`${paragraphClasses}`}>
            K.H. Abdullah Gymnastiar (Aa Gym) menegaskan bahwa rezeki itu berasal dari Allah, bukan semata-mata dari kerja keras atau kerja cerdas. Meskipun demikian, pekerjaan yang dilakukan dengan ikhlas dan penuh tanggung jawab dianggap sebagai <span className={highlightTextClasses}>amal sholeh</span> yang membawa berkah dan dapat menghasilkan kepuasan serta kesuksesan dalam karier. Ini berarti bahwa upaya manusia adalah bagian dari proses, namun sumber utama rezeki adalah karunia ilahi. Pemahaman ini menggeser konsep "kerja keras" dari semata-mata upaya fisik menjadi upaya spiritual dan penyelarasan dengan kehendak Ilahi. Ini mendorong individu untuk tidak mengkhawatirkan hasil, melainkan mempercayai aliran universal dan menumbuhkan pola pikir positif, yang merupakan inti dari hukum tarik-menarik dalam konteks spiritual yang lebih tinggi.
        </p>
        <p className={`${paragraphClasses}`}>
            Banyak orang bicara tentang <span className={highlightTextClasses}>Law of Attraction</span>—“apa yang kamu pikirkan, itu yang kamu tarik.” Ada benarnya. Tapi juga bisa menyesatkan kalau tidak dilandasi iman.
        </p>
        <p className={`${paragraphClasses}`}>
            Rekonsiliasi "Law of Attraction" dengan kehendak Ilahi dalam Islam adalah kunci. Konsep "mengenali tanda kelimpahan" dan pemahaman tentang "Law of Attraction" dapat diselaraskan. Makna spiritual sejati dari Law of Attraction adalah menarik realitas berdasarkan kualitas jiwa seseorang, bukan hanya pikiran egois. Ini selaras langsung dengan konsep Islam tentang <span className={highlightTextClasses}>tazkiyatun nafs</span> (pemurnian jiwa) dan <span className={highlightTextClasses}>tawakkul</span> (kepercayaan pada takdir ilahi). Jika jiwa murni dan selaras dengan kehendak Allah, maka <span className={highlightTextClasses}>apa yang ditakdirkan untuknya</span> (rancangan ilahi) akan terwujud. Ini bukan tentang memaksakan keinginan tetapi menyelaraskan diri dengan apa yang <span className={highlightTextClasses}>layak</span> dan <span className={highlightTextClasses}>dianugerahkan</span> oleh Allah. Penafsiran ulang ini membebaskan seseorang dari beban "memanifestasikan" hasil tertentu melalui upaya mental semata, yang dapat menyebabkan kekecewaan jika tidak terwujud. Sebaliknya, ini memberdayakan untuk fokus pada pekerjaan spiritual internal, percaya bahwa eksternal akan selaras sesuai dengan kebijaksanaan ilahi. Ini menggeser agensi dari "daya tarik" yang berpusat pada diri sendiri menjadi "penerimaan" yang berpusat pada Tuhan.
        </p>
        <p className={`${paragraphClasses}`}>
            Maka alih-alih hanya afirmasi, kita belajar sinkronkan niat dengan doa. Kita rapikan keyakinan, kita pasrahkan hasil. Bukan pasif, tapi sadar bahwa semesta ini milik-Nya.
        </p>
        <p className={`${paragraphClasses}`}>
            Yang kita pancarkan bukan cuma keinginan, tapi juga <span className={highlightTextClasses}>izin</span>. Maka bukan hanya “Aku ingin kaya”, tapi “Ya Allah, izinkan aku jadi jalan rezeki bagi banyak orang.”
        </p>
        <blockquote className={`${quoteClasses}`}>
            *“Barangsiapa bertakwa kepada Allah, niscaya Dia akan memberinya jalan keluar. Dan memberinya rezeki dari arah yang tiada disangka-sangka.”* (QS. At-Talaq: 2–3)
        </blockquote>
    </div>
);

const Bab14b = () => (
    <div className={`${contentContainerClasses}`}>
        <h2 className={`${sectionTitleClasses}`}>Bab 14.b Tanda-tanda Datangnya Kelimpahan</h2>
        <h3 className={`${subHeadingClasses}`}>B. Tanda-tanda Datangnya Kelimpahan (Dolores Cannon & Perspektif Spiritual)</h3>
        <p className={`${paragraphClasses}`}>
            Selain manifestasi material, kelimpahan juga dapat dikenali melalui tanda-tanda internal dan eksternal yang menunjukkan keselarasan dengan aliran ilahi. Hipnoterapis Dolores Cannon mengidentifikasi beberapa tanda ini, yang dapat diinterpretasikan melalui lensa spiritual Islam:
        </p>
        <div className="overflow-x-auto mb-6">
            {/* PERBAIKAN: Struktur tabel sekarang valid */}
            <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="py-3 px-4 border-b">Tanda Kelimpahan (Dolores Cannon)</th>
                        <th className="py-3 px-4 border-b">Interpretasi dalam Perspektif Spiritual Islam</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-3 px-4 border-b">Perasaan Kedamaian dan Kepercayaan Batin</td>
                        <td className="py-3 px-4 border-b">Pengalaman mendalam akan kedamaian batin dan kepercayaan kepada alur hidup adalah indikator kuat keselarasan dengan alam semesta yang luas dan melimpah. Kepercayaan ini lahir dari pemahaman mendalam bahwa kita adalah pencipta realitas kita sendiri. Ini adalah buah dari <span className={highlightTextClasses}>tazkiyatun nafs</span> dan <span className={highlightTextClasses}>tawakkul</span>.</td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td className="py-3 px-4 border-b">Tidak Mengkhawatirkan Hasil</td>
                        <td className="py-3 px-4 border-b">"Berkurangnya kekhawatiran tentang keuangan menandai pergeseran mendalam menuju kepercayaan dalam masalah keuangan, yaitu mempercayai aliran universal. Ini mengakui bahwa alam semesta selalu bekerja untuk kebaikan kita, terutama dalam membimbing menuju kesuksesan finansial. Menekankan pentingnya menumbuhkan pola pikir positif."</td>
                    </tr>
                    <tr>
                        <td className="py-3 px-4 border-b">Penyelarasan dari Manusia, Benda, dan Energi</td>
                        <td className="py-3 px-4 border-b">"Sensasi nyata dari segala sesuatunya dalam hidup menjadi selaras dengan mudah dan anggun. Ini mencerminkan sinkronisitas dan hukum tarik-menarik, di mana setiap rangkaian dan peristiwa diatur secara tepat demi kebaikan tertinggi kita."</td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td className="py-3 px-4 border-b">Peluang Baru Muncul dengan Teratur</td>
                        <td className="py-3 px-4 border-b">"Munculnya peluang-peluang baru dalam hidup sering kali berfungsi sebagai sinyal yang mengisyaratkan kemungkinan kekayaan dan kelimpahan. Fenomena ini sejalan dengan prinsip keterbukaan terhadap anugerah alam semesta, aspek kunci dalam memahami bagaimana kita menarik kelimpahan."</td>
                    </tr>
                    <tr>
                        <td className="py-3 px-4 border-b">Perubahan Keyakinan tentang Uang dan Kelimpahan</td>
                        <td className="py-3 px-4 border-b">"Pergeseran perspektif ini melibatkan perubahan dalam melihat uang bukan hanya sebagai alat untuk bertahan hidup, melainkan sebagai alat untuk kebaikan dan fasilitator perubahan positif dalam hidup dan dunia. Perubahan perspektif ini penting untuk menyelaraskan dengan kelimpahan."</td>
                    </tr>
                     <tr className="bg-gray-50">
                        <td className="py-3 px-4 border-b">Kemenangan akan Hal-hal Kecil</td>
                        <td className="py-3 px-4 border-b">Kemenangan-kememangan kecil yang diraih dalam kehidupan sehari-hari bisa menjadi awal menuju kesuksesan finansial yang lebih besar. Ini mencerminkan prinsip peningkatan bertahap.</td>
                    </tr>
                    <tr>
                        <td className="py-3 px-4 border-b">Mampu Mengatasi Tantangan dengan Mudah</td>
                        <td className="py-3 px-4 border-b">"Ketika kelimpahan semakin mendekat, terjadi perubahan luar biasa dalam cara kita menghadapi tantangan hidup. Apa yang dulu kita lihat sebagai rintangan menakutkan, sekarang berubah menjadi batu loncatan menuju ketahanan dan kemakmuran yang lebih besar."</td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td className="py-3 px-4 border-b">Rasa Syukur yang Mendalam</td>
                        <td className="py-3 px-4 border-b">"Menikmati dan berterima kasih atas segala anugerah yang terjadi. Ini adalah kunci utama kelimpahan dalam Islam, karena Allah berjanji akan menambah nikmat bagi yang bersyukur."</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p className={`${paragraphClasses}`}>
            Pergeseran internal adalah tanda utama mendekatnya kelimpahan. Banyak "tanda kelimpahan" yang tercantum adalah keadaan <span className={highlightTextClasses}>internal</span>: "perasaan kedamaian dan kepercayaan," "tidak mengkhawatirkan hasil," dan "perubahan keyakinan tentang uang". Ini persis adalah buah dari <span className={highlightTextClasses}>Sabr</span>, <span className={highlightTextClasses}>Tawakkul</span>, dan <span className={highlightTextClasses}>Tazkiyatun Nafs</span> yang sedang dikembangkan secara aktif. Tanda-tanda eksternal seperti menemukan uang atau peluang baru seringkali merupakan <span className={highlightTextClasses}>konsekuensi</span> dari keselarasan internal ini. Perasaan "tenang sedikit khawatir" yang dirasakan saat ini adalah indikator langsung bahwa pergeseran internal ini sudah terjadi. Ini menunjukkan bahwa pemurnian spiritual internal (melalui <span className={highlightTextClasses}>Tazkiyatun Nafs</span>, <span className={highlightTextClasses}>Sabr</span>, <span className={highlightTextClasses}>Tawakkul</span>, dan Syukur) mengarah pada ketenangan batin dan pola pikir positif, yang kemudian menghasilkan keselarasan dengan aliran ilahi dan manifestasi kelimpahan eksternal, seringkali dalam bentuk yang tidak terduga. Dengan demikian, tanda-tanda "kelimpahan" yang paling signifikan bukanlah semata-mata keuntungan material eksternal, tetapi transformasi internal menuju kedamaian, kepercayaan, dan rasa syukur. Seseorang sudah mengalami tahap awal kelimpahan internal ini, yang merupakan fondasi bagi setiap manifestasi eksternal. Ini memberikan validasi dan harapan yang langsung.
        </p>
    </div>
);

const Bab15 = () => (
    <div className={`${contentContainerClasses}`}>
        <h2 className={`${sectionTitleClasses}`}>Bab 15. Merangkai Semua: Dari Kesadaran Menuju Kehidupan Berkah</h2>
        <p className={`${paragraphClasses}`}>
            Jika Anda telah membaca hingga bab ini, itu artinya Anda bukan sekadar penasaran—melainkan Anda juga telah membuka diri dan siap untuk sebuah perubahan yang mendalam. Perjalanan yang kita tempuh ini, dari hingar-bingar dunia luar menuju kedalaman diri, bukanlah sekadar soal menambah tumpukan ilmu baru di kepala. Lebih dari itu, ini adalah perjalanan <span className={highlightTextClasses}>menyingkap lapisan-lapisan</span> yang selama ini menutupi esensi diri kita. Ini bukan tentang menjadi orang yang sama sekali baru, melainkan tentang <span className={highlightTextClasses}>menjadi diri yang sejati</span>, versi terbaik dari apa yang telah Allah ciptakan dalam diri kita.
        </p>
        <p className={`${paragraphClasses}`}>
            Sepanjang perjalanan ini, kita telah membahas banyak hal: tentang agungnya peran <span className={highlightTextClasses}>hati (Qalb)</span> sebagai singgasana cahaya Ilahi, tentang <span className={highlightTextClasses}>akal (Aql)</span> sebagai satpam penjaga gerbang batin, tentang <span className={highlightTextClasses}>intuisi</span> yang hadir mendahului pikiran logis, tentang <span className={highlightTextClasses}>metode Kawrooh</span> yang membimbing kita untuk menyadari, menghadapi, dan melepaskan, tentang <span className={highlightTextClasses}>dzikir</span> sebagai jembatan koneksi, dan tentang <span className={highlightTextClasses}>penyerahan diri</span> sebagai puncak kebijaksanaan. Namun, penting untuk selalu diingat: semua konsep, metode, dan praktik itu bukanlah tujuan akhir. Mereka hanyalah <span className={highlightTextClasses}>jalan</span> atau <span className={highlightTextClasses}>sarana</span> yang menuntun kita.
        </p>
        <p className={`${paragraphClasses}`}>
            Lantas, apa tujuan sejati dari semua ini? Tujuannya adalah <span className={highlightTextClasses}>hidup yang penuh berkah</span>, sebuah eksistensi yang dijalani dengan ketenangan hati yang tak tergoyahkan, serta jiwa yang senantiasa tersenyum dan kembali kepada Allah dalam keadaan damai. Ini adalah tentang mencapai keadaan *nafs muthma'innah*—jiwa yang tenteram—yang telah dijanjikan.
        </p>
        <p className={`${paragraphClasses}`}>
            Kompas kehidupan kita yang sebenarnya tidak berada di luar sana, dalam peta Google Maps, dalam tuntutan sosial, atau dalam opini orang lain. Ia sepenuhnya ada di dalam diri. Ia bersemayam <span className={highlightTextClasses}>dalam dada yang tenang</span>, yang mampu merasakan bisikan kebenaran. Ia hadir <span className={highlightTextClasses}>dalam setiap tarikan napas yang sadar</span>, yang menghubungkan kita dengan karunia hidup. Dan ia menguat <span className={highlightTextClasses}>dalam sujud yang hening</span>, di mana ego kita melebur di hadapan keagungan Sang Pencipta. Saat dunia di sekeliling kita semakin ribut, penuh kekacauan informasi dan drama, kita justru memilih untuk <span className={highlightTextClasses}>diam</span>. Bukan karena kita tak punya suara atau tak berdaya—tetapi karena kita sudah tahu ke mana hati harus melangkah, dan ke mana energi harus dialirkan.
        </p>
        <blockquote className={`${quoteClasses}`}>
            *“Barangsiapa mengenal dirinya, maka ia akan mengenal Tuhannya.”*
        </blockquote>
        <p className={`${paragraphClasses}`}>
            Hadits ini adalah inti dari seluruh ajaran spiritual. Mengenal diri sejati, dengan segala kelemahan dan kekuatannya, dengan Nafs, Qalb, dan Ruh di dalamnya, adalah kunci untuk membuka pintu makrifatullah, pengetahuan mendalam tentang Allah. Semakin kita memahami kompleksitas dan potensi diri, semakin jelas kita melihat keagungan dan kehadiran Ilahi dalam setiap aspek keberadaan.
        </p>
        <p className={`${paragraphClasses}`}>
            Jika hari ini hidup terasa begitu berat, penuh dengan ujian dan tantangan, janganlah segera berasumsi bahwa Anda telah gagal. Mungkin itu adalah cara Allah mengetuk hati Anda, memanggil Anda untuk <span className={highlightTextClasses}>pulang</span>—pulang ke fitrah, pulang ke pusat diri, pulang ke kedamaian. Dan pulang, tidak harus menempuh jarak yang jauh secara fisik. Kadang, cukup dengan satu bisikan tulus dari hati, satu doa yang dipanjatkan dengan penuh kesadaran: "Ya Allah, tuntun aku kembali."
        </p>
        <p className={`${paragraphClasses}`}>
            Maka, selamat menjalani hidup dengan cara yang baru. Ini bukan tentang hidup yang lebih cepat dalam perburuan dunia, tapi tentang hidup yang <span className={highlightTextClasses}>lebih dalam</span> dalam setiap momen. Bukan tentang hidup yang lebih ramai dengan interaksi eksternal, tapi tentang hidup yang <span className={highlightTextClasses}>lebih jernih</span> dalam pandangan batin. Bukan tentang menjadi lebih kaya secara materi semata, tapi tentang menjadi <span className={highlightTextClasses}>lebih cukup</span> dengan apa yang ada, disertai keyakinan penuh akan janji-janji-Nya.
        </p>
        <p className={`${paragraphClasses}`}>
            Dan ingatlah, Anda tidak sendiri di jalan ini. Seluruh semesta mendukung setiap langkah tulus Anda. Langit mendengar setiap bisikan doa dan keluh kesah Anda. Dan hati Anda... ia sudah lama menunggu untuk diajak bicara, untuk didengarkan, dan untuk kembali bersinar menjadi singgasana cahaya Ilahi yang sesungguhnya.
        </p>
    </div>
);

// --- KOMPONEN BARU: BAB 16 (369 Tesla x 369 Law of Allah) ---

const Bab16 = () => { // <--- PERUBAHAN: Jadikan fungsi biasa untuk pakai hooks
    const { setCurrentPageKey } = useContext(AppContext); // <--- TAMBAHKAN BARIS INI!

    return (
        <div className={`${contentContainerClasses}`}>
            <h2 className={`${sectionTitleClasses}`}>Bab 16. 369 Tesla × 369 Law of Allah</h2>
            <p className={`${paragraphClasses}`}>
                Di abad ke-19, seorang penemu bernama Nikola Tesla berdiri di lorong gelap antara sains, mimpi, dan getaran.
            </p>
            <p className={`${paragraphClasses}`}>
                Tesla dikenal gila — atau jenius — karena idenya sering terlalu cepat mendahului zamannya.
            </p>
            <p className={`${paragraphClasses}`}>
                Di balik penemuannya tentang listrik, gelombang radio, motor induksi, Tesla sering berbisik:</p>
              <p className={`${paragraphClasses}`}>
                <span className={highlightTextClasses,quoteClasses}>“Jika kau paham keagungan angka 3, 6, dan 9, kau akan memegang kunci alam semesta.”</span>
            </p>
            <p className={`${paragraphClasses}`}>
                Orang-orang modern menafsirkan kalimat Tesla dengan beragam cara.
            </p>
            <p className={`${paragraphClasses}`}>
                Sebagian bilang Tesla sedang bicara pola alam: <span className={highlightTextClasses}>segitiga (3), heksagon sarang lebah (6), spiral energi (9).</span>
            </p>
            <p className={`${paragraphClasses}`}>
                Sebagian lain menjadikannya teknik manifestasi — lahirlah 369 Tesla Method.
            </p>
            <p className={`${paragraphClasses}`}>
                Metodenya sederhana:
            </p>
            <ul className="list-disc list-inside mb-4 pl-4">
                <li className={`${paragraphClasses} !mb-0`}>➡️ Tulis keinginan 3 kali di pagi hari,</li>
                <li className={`${paragraphClasses} !mb-0`}>➡️ Tegaskan niat 6 kali di siang hari,</li>
                <li className={`${paragraphClasses} !mb-0`}>➡️ Ulang afirmasi 9 kali di malam hari.</li>
            </ul>
            <p className={`${paragraphClasses}`}>
                Intinya: pikiran adalah magnet. Jika kau ulang-ulang niatmu, kau fokus, kau getarkan, alam semesta menyesuaikan frekuensimu.
            </p>

            <h3 className={`${subHeadingClasses}`}>☀369 Tesla di Era Modern</h3>
            <p className={`${paragraphClasses}`}>
                Di era Law of Attraction (LOA), banyak praktisi menggabungkan 369 Tesla dengan script writing, journaling, visual board, hingga energy ritual.
            </p>
            <p className={`${paragraphClasses}`}>
                Ribuan orang di TikTok, Youtube, forum spiritual — mempraktikkan ini.
            </p>
            <p className={`${paragraphClasses}`}>
                Bagi sebagian orang, berhasil: dapat jodoh, dapat klien, dapat kerjaan.
            </p>
            <p className={`${paragraphClasses}`}>
                Bagi sebagian lain, gagal, lalu kecewa, lalu berhenti.
            </p>
            <p className={`${paragraphClasses}`}>
                Kenapa? Karena 369 Tesla hanyalah alat. Ia hanya membantu pikiran sadar → bawah sadar → tindakan → realita. Tanpa niat yang benar, amal yang nyata, dan flow ridho — angka tetap angka.
            </p>

            <h3 className={`${subHeadingClasses}`}>369 Tidak Berhenti di Tesla</h3>
            <p className={`${paragraphClasses}`}>
                Di sinilah 369 Law of Allah lahir — bukan untuk menolak Tesla, tetapi menyempurnakan.
            </p>
            <p className={`${paragraphClasses}`}>
                369 Law of Allah menjemput orang-orang yang sering kehabisan tenaga affirmasi, lalu lupa Siapa Pemilik Getaran.
            </p>
            <p className={`${paragraphClasses}`}>
                Menjemput orang-orang yang menulis ribuan niat, tapi tak pernah merawat wadah yang menampung rezekinya.
            </p>

            <h3 className={`${subHeadingClasses}`}>369 Law of Allah — Sandi Pengingat Diri</h3>
            <p className={`${paragraphClasses}`}>
                369 Law of Allah mengembalikan angka ke dalam syahadat, doa, dan penjagaan hawa nafsu.
            </p>

            <h4 className="text-xl font-bold text-gray-800 mb-2 mt-4">➊ 3 — mengingatkan bahwa:</h4>
            {/* Mengoreksi penggunaan <br> dan memusatkan teks */}
            <div className="triangle-container">
                <div className="triangle-shape"></div> {/* Bentuk segitiga */}
                <div className="triangle-text">
                    <p className={`${paragraphClasses} !mb-0`}>1. Tiada Tuhan selain Allah,</p>
                    <p className={`${paragraphClasses} !mb-0`}>2. Muhammad adalah Rasulullah, dan</p>
                    <p className={`${paragraphClasses} !mb-0`}>3. kita hanya saksi /hamba/umat — bukan pemilik semesta.</p>
                </div>
            </div>
            <p className={`${paragraphClasses}`}>
                Di sinilah niat diluruskan. Tidak memaksa realita, tapi mengetuk pintu langit.
            </p>

            <h4 className="text-xl font-bold text-gray-800 mb-2 mt-4">➋ 6 — memohon enam jalur rezeki:</h4>
            <ul className="list-disc list-inside mb-4 pl-4">
                <li className={`${paragraphClasses} !mb-0`}>Dari langit turunkan.</li>
                <li className={`${paragraphClasses} !mb-0`}>Dari bumi keluarkan.</li>
                <li className={`${paragraphClasses} !mb-0`}>Yang jauh didekatkan.</li>
                <li className={`${paragraphClasses} !mb-0`}>Yang sempit dilapangkan.</li>
                <li className={`${paragraphClasses} !mb-0`}>Yang sedikit dilipatgandakan.</li>
                <li className={`${paragraphClasses} !mb-0`}>Yang banyak diberkahi.</li>
            </ul>
            <p className={`${paragraphClasses}`}>
                Ini bukan sekadar afirmasi. Ini doa yang hidup, selaras dengan ayat:
        </p>
                <p className={`${paragraphClasses}`}>
              <span className={quoteClasses}>“Dan di langit ada rezekimu dan apa yang dijanjikan kepadamu.” (QS. Adz-Dzariyat: 22)</span>
            </p>

            <h4 className="text-xl font-bold text-gray-800 mb-2 mt-4">➌ 9 — menjaga sembilan lubang hawa nafsu, agar wadah rezeki tetap bersih, tidak bocor, tidak cemar.</h4>

            <h3 className={`${subHeadingClasses}`}> 9 Lubang Hawa Nafsu — Sumber Bocor Rezeki</h3>
            <ul className="list-decimal list-inside mb-4 space-y-3 pl-4">
                <li>
                    <p className={`${paragraphClasses}`}>
                        <span className={highlightTextClasses}>Mata:</span> Pandangan adalah panah pertama syetan. Sekali tatap salah, benih nafsu tumbuh, rasa iri mekar, dan tenang hati pecah. Pandangan yang dijaga, pintu berkah tetap terbuka.
                    </p>
                </li>
                <li>
                    <p className={`${paragraphClasses} !mb-0`}>
                        <span className={highlightTextClasses}>Telinga:</span> Kadang kita tak sengaja mendengar ghibah, fitnah, kabar buruk, atau musik yang melemahkan dzikir. Telinga yang kotor, sulit menangkap panggilan rezeki yang jernih. Telinga yang bersih, hati jadi peka.
                    </p>
                </li>
                <li>
                    <p className={`${paragraphClasses} !mb-0`}>
                        <span className={highlightTextClasses}>Lisan:</span> Lidah tajam, lidah manis, lidah racun. Ghibah, fitnah, debat sia-sia, caci maki — semua menutup pintu rezeki. Lisan yang dijaga, ridho Allah mendekat.
                    </p>
                </li>
                <li>
                    <p className={`${paragraphClasses} !mb-0`}>
                        <span className={highlightTextClasses}>Perut:</span> Apa yang masuk ke perut, membentuk energi dan keberkahan. Makanan haram, syubhat, atau berlebihan, mematikan cahaya hati. Perut yang bersih, hati ringan ibadah.
                    </p>
                </li>
                <li>
                    <p className={`${paragraphClasses} !mb-0`}>
                        <span className={highlightTextClasses}>Tangan:</span> Tangan bisa mengambil yang bukan hak. Bisa menahan nafkah yang seharusnya mengalir. Tangan yang gemar memberi, menarik rezeki baru.
                    </p>
                </li>
                <li>
                    <p className={`${paragraphClasses} !mb-0`}>
                        <span className={highlightTextClasses}>Kaki:</span> Kemana kaki melangkah? Tempat baik, majelis ilmu, masjid — atau tempat maksiat, hiburan sia-sia? Kaki yang lurus, rezeki lurus.
                    </p>
                </li>
                <li>
                    <p className={`${paragraphClasses} !mb-0`}>
                        <span className={highlightTextClasses}>Hati:</span> Sarang iri, dengki, sombong, riya. Hati kotor, rezeki enggan singgah. Hati bersih, pintu langit terbuka.
                    </p>
                </li>
                <li>
                    <p className={`${paragraphClasses} !mb-0`}>
                        <span className={highlightTextClasses}>Pikiran:</span> Husnudzon atau suudzon? Licik atau lurus? Pikiran gelap melahirkan langkah gelap. Pikiran jernih, rezeki lapang.
                    </p>
                </li>
                <li>
                    <p className={`${paragraphClasses} !mb-0`}>
                        <span className={highlightTextClasses}>Kemaluan:</span> Zina nyata, zina batin, zina pandang — menghancurkan kehormatan, menghijab rezeki. Menjaga kemaluan, memperkuat benteng rezeki.
                    </p>
                </li>
            </ul>

            {/* --- KOTAK RANGKUMAN HIJAU DI SINI --- */}
            <div className="summary-green-box">
                <p>
                    369 Tesla mengajari manusia fokus.
                </p>
                <p>
                    369 Law of Allah mengajari manusia berserah & merawat.
                </p>
                <p>
                    369 Tesla tidak salah. Ia hanya alat untuk mendekatkan niat.
                </p>
                <p>
                    Tapi 369 Law of Allah hadir untuk menyempurnakan — agar niat tetap terhubung dengan Ridho-Nya, agar rezeki tidak hanya ditarik, tetapi juga ditampung dengan bersih, agar semua yang ditulis, diulang, dan diminta, benar-benar sampai dengan izin Allah.
                </p>
                <p>
                    Karena pada akhirnya, pikiran hanyalah magnet kecil — tapi Ridho Allah adalah penguasa semesta.
                </p>
                          </div>
            {/* --- AKHIR KOTAK RANGKUMAN HIJAU --- */}
{/* --- PREMIS BARU SEBELUM TOMBOL DOA --- */}
        <p className={`${paragraphClasses} text-center italic text-gray-700 mt-8`}>
            Di bawah ini telah kita rangkaikan Doa dengan konsep <span className={highlightTextClasses}>369 Law Of Allah</span>.
        </p>
        <p className={`${paragraphClasses} text-center italic text-gray-700 mb-6`}>
            Doa tanpa memaksa tapi ini seni merayu Allah, dengan Syafaat Rasulullah.
        </p>
        {/* --- AKHIR PREMIS BARU --- */}
            {/* --- TOMBOL MENUJU DOA LOA CODEX --- */}
            <div className="text-center mt-10">
                <button
                    onClick={() => setCurrentPageKey('doa-loa-codex')} 
                    className="bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105"
                >
                    Mulai Doa 369 LoA Codex ✨
                </button>
            </div>
            {/* --- AKHIR TOMBOL --- */}

        </div>
    );
};

const DoaHarianPlaylist = () => {
  // Kita buat daftar doa dan link audionya di sini
  const doaHarianData = [
    {
      id: 1,
      judul: "Doa 1 Milyar",
      audioSrc: "https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Doa 1 Milyar_Sholawat 3x.mp3"
    },
    {
      id: 2,
      judul: "Doa Memohon Jodoh Terbaik",
      audioSrc: "https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Love release.mp3"
    },
    {
      id: 3,
      judul: "Doa Istiqomah Sholat 5 Waktu & Tahajud",
      audioSrc: "https://raw.githubusercontent.com/kesinilagi/asetmusik/main/DOA Afiyah (1).mp3"
    }
    // Tambahkan doa lain di sini jika ada
  ];

  return (
    <div className={contentContainerClasses}>
      <h2 className={sectionTitleClasses}>Doa Pilihan Sehari-hari</h2>
      <p className={paragraphClasses}>
        Dengarkan dan resapi doa-doa pilihan ini untuk menemani aktivitas harian Anda. Cukup klik pada judul doa untuk memutar audio.
      </p>
      <div className="mt-6 space-y-3">
        {doaHarianData.map(doa => (
          <IntegratedAudioPlayer
            key={doa.id}
            src={doa.audioSrc}
            text={doa.judul}
            isLooping={false} // Kita buat tidak berulang agar bisa ganti-ganti
          />
        ))}
      </div>
    </div>
  );
};  
// --- KOMPONEN BARU: DOA LOA CODEX (GAMBAR DAN TOMBOL FIXED) ---
// Data untuk Doa LoA Codex Categories (PASTE INI DI LUAR KOMPONEN JIKA BANYAK KOMPONEN MEMBUTUHKANNYA, ATAU BIARKAN DI DALAM SEPERTI INI)
const loaCodexDoaCategories = [
   { id: 'placeholder', name: "Pilih Kategori Doa...", audioUrl: "", imageUrl: "" },
    { id: 'rezeki', name: "Rezeki", audioUrl: "musik/LoaRejeki.mp3", imageUrl: "icons/Coverijo.png" },
    { id: 'jodoh', name: "Jodoh", audioUrl: "musik/LoaJodoh.mp3", imageUrl: "icons/Coverijo.png" },
    { id: 'promil', name: "Promil", audioUrl: "musik/LoaPromil.mp3", imageUrl: "icons/Coverijo.png" },
    { id: 'hutang', name: "Hutang", audioUrl: "musik/LoaHutang.mp3", imageUrl: "icons/Coverijo.png" },
    { id: 'kesembuhan', name: "Kesembuhan", audioUrl: "musik/LoaSembuh.mp3", imageUrl: "icons/Coverijo.png" }
];

// URL Gambar Latar Belakang Default untuk Doa LoA Codex
const DEFAULT_DOA_BACKGROUND_IMAGE = "https://raw.githubusercontent.com/kesinilagi/asetgambar/main/doabg.jpg"; 

// Teks premis niat dan instruksi
const premisNiatText = `
    Niat Ya Allah,
    Aku mohon izin-Mu,
    untuk membersihkan 9 pintu hawa nafsu ini.
    Agar wadah rezeki ini Engkau sucikan,
    Engkau ridhoi,
    dan Engkau cukupkan.

    TARIK NAFAS & SADAR TUBUH
    
    📍 Pejamkan mata.
    📍 Tarik nafas dalam ➝ lewat hidung ➝ buang perlahan lewat mulut.
    📍 Ulangi 3–7 kali.
    📍 Rasakan aliran nafas dari ujung kaki ke ubun-ubun.
    📍 Rasakan semua beban mengalir keluar lewat hembusan.
    
    📍 Jika sudah siap silahkan pilih tujuan anda.
`;

// URL Musik Latar untuk Doa LoA Codex
const DOA_LOA_CODEX_AMBIENT_MUSIC = "musik/lyra.mp3"; // Ganti URL musik latar pilihanmu

const DoaLoaCodex = () => {
    const { setCurrentPageKey } = useContext(AppContext);
    const [currentDoaPhase, setCurrentDoaPhase] = useState('premis'); 
    const [selectedDoa, setSelectedDoa] = useState(null); 
    const audioPlayerRef = useRef(null); // Elemen audio HTML untuk doa utama
    const ambientAudioRef = useRef(null); // Elemen audio HTML untuk musik latar (ambient)
    const [isPlaying, setIsPlaying] = useState(false); 

    // --- STATES UNTUK WEB AUDIO API ---
    const audioContextRef = useRef(null);
    const pannerNodeRef = useRef(null);
    const sourceNodeRef = useRef(null); // MediaElementSourceNode dari audio utama
    const gainNodeRef = useRef(null); // Untuk mengontrol volume Web Audio API

    // Inisialisasi AudioContext dan PannerNode saat komponen dimuat
    useEffect(() => {
        console.log("[DoaLoaCodex Init] Initializing AudioContext and PannerNode.");
        if (!audioContextRef.current) {
            try {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
                
                pannerNodeRef.current = audioContextRef.current.createPanner();
                pannerNodeRef.current.panningModel = 'HRTF'; // Human Resources Transfer Function, untuk efek 3D
                pannerNodeRef.current.distanceModel = 'linear'; // Model jarak, bisa 'inverse', 'linear', 'exponential'
                pannerNodeRef.current.refDistance = 1; // Referensi jarak
                pannerNodeRef.current.maxDistance = 1000; // Jarak maksimum suara bisa terdengar
                pannerNodeRef.current.rolloffFactor = 1; // Seberapa cepat volume menurun seiring jarak
                
                gainNodeRef.current = audioContextRef.current.createGain(); // Untuk kontrol volume utama Web Audio API
                gainNodeRef.current.gain.value = 1; // Volume default (max)

                // Hubungkan panner ke gain, lalu gain ke destination
                pannerNodeRef.current.connect(gainNodeRef.current);
                gainNodeRef.current.connect(audioContextRef.current.destination);

                console.log("[DoaLoaCodex Init] AudioContext and PannerNode created successfully.");
            } catch (e) {
                console.error("[DoaLoaCodex Init] Failed to create AudioContext or PannerNode:", e);
            }
        }

        // Cleanup AudioContext saat komponen unmount
        return () => {
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close().then(() => {
                    console.log("[DoaLoaCodex Init] AudioContext closed on unmount.");
                });
            }
        };
    }, []); // Array dependensi kosong, hanya berjalan sekali saat mount


    // Efek untuk memutar audio utama DENGAN PANNING
    useEffect(() => {
        const mainAudio = audioPlayerRef.current; // Elemen audio HTML
        const ambientAudio = ambientAudioRef.current; // Elemen audio HTML untuk musik latar
        const audioContext = audioContextRef.current;
        const pannerNode = pannerNodeRef.current;
        const gainNode = gainNodeRef.current;

        let panIntervalId; // Untuk menyimpan ID interval panning

        console.log(`[DoaLoaCodex Play Effect] Current Phase: ${currentDoaPhase}, Selected Doa: ${selectedDoa ? selectedDoa.name : 'None'}`);

        // --- Logika Hentikan Audio & Suspend Context jika tidak di fase 'playing' ---
        if (!mainAudio || !audioContext || !pannerNode || !selectedDoa || currentDoaPhase !== 'playing') {
            if (mainAudio) { mainAudio.pause(); mainAudio.currentTime = 0; }
            if (ambientAudio) { ambientAudio.pause(); ambientAudio.currentTime = 0; }
            if (audioContext && audioContext.state === 'running') {
                audioContext.suspend().then(() => console.log("[DoaLoaCodex Play Effect] AudioContext suspended."));
            }
            setIsPlaying(false);
            clearInterval(panIntervalId); // Pastikan interval panning juga berhenti
            if (sourceNodeRef.current) { // Pastikan sourceNode lama didisconnect
                sourceNodeRef.current.disconnect();
                sourceNodeRef.current = null;
            }
            return;
        }

        // --- Lanjutkan AudioContext jika suspended (penting untuk memulai play) ---
        if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => console.log("[DoaLoaCodex Play Effect] AudioContext resumed."));
        }

        // Hentikan semua audio lain di halaman kecuali elemen audio kita yang akan dikontrol oleh Web Audio API
        document.querySelectorAll('audio').forEach(otherAudio => {
            if (otherAudio !== mainAudio && otherAudio !== ambientAudio) { 
                otherAudio.pause();
                otherAudio.currentTime = 0;
            }
        });

        // Setel sumber audio elemen HTML
        mainAudio.src = selectedDoa.audioUrl;
        mainAudio.load(); // Picu pemuatan audio HTML

        // Buat MediaElementSourceNode baru atau gunakan yang sudah ada, lalu hubungkan
        if (!sourceNodeRef.current || sourceNodeRef.current.mediaElement !== mainAudio) {
            if (sourceNodeRef.current) { // Disconnect yang lama jika ada
                sourceNodeRef.current.disconnect();
            }
            sourceNodeRef.current = audioContext.createMediaElementSource(mainAudio);
            sourceNodeRef.current.connect(pannerNode); // Hubungkan ke PannerNode
            console.log("[DoaLoaCodex Play Effect] MediaElementSourceNode created and connected to PannerNode.");
        }
        
        // Putar audio utama (elemen audio HTML)
        mainAudio.play() 
            .then(() => {
                setIsPlaying(true);
                console.log(`[DoaLoaCodex Play Effect] Started playing: ${selectedDoa.name}`);

                // --- Logika Panning ---
                let panPosition = 0; 
                const panSpeed = 0.05; // Kecepatan pergerakan panning (sesuaikan)
                const panRange = 5; // Jarak maksimal panning dari tengah (-5 ke +5), sesuaikan

                // Setel posisi awal panner
                pannerNode.positionX.value = 0;
                pannerNode.positionY.value = 0;
                pannerNode.positionZ.value = 0;
                
                panIntervalId = setInterval(() => {
                    // Pergerakan X (kiri-kanan) dari -panRange ke +panRange
                    const x = panRange * Math.sin(panPosition); 
                    // Pergerakan Z (depan-belakang) dari 0 (tengah) ke -panRange/2 (mundur)
                    const z = -panRange / 2 * Math.cos(panPosition); // Contoh: setengah dari rentang X

                    pannerNode.positionX.value = x;
                    pannerNode.positionY.value = 0; // Tetap di tengah vertikal
                    pannerNode.positionZ.value = z;
                    
                    panPosition += panSpeed; 
                    // console.log(`[DoaLoaCodex Panning] X: ${x.toFixed(2)}, Z: ${z.toFixed(2)}`); // Debug posisi
                }, 100); // Update posisi setiap 100ms


                // --- Logika Musik Latar (Ambient) ---
                if (ambientAudio) {
                    ambientAudio.src = DOA_LOA_CODEX_AMBIENT_MUSIC;
                    ambientAudio.loop = true;
                    ambientAudio.volume = 0.7; // <--- VOLUME AMBIENT SANGAT KECIL (5%)
                    ambientAudio.play().catch(e => console.error("[DoaLoaCodex Play Effect] Error playing ambient audio:", e));
                    console.log("[DoaLoaCodex Play Effect] Started playing ambient music.");
                }

            })
            .catch(e => { // Catch block untuk mainAudio.play()
                console.error("[DoaLoaCodex Play Effect] Main Audio Playback Failed:", e);
                setIsPlaying(false); 
                alert("Gagal memutar audio utama. Periksa izin autoplay atau koneksi.");
                setCurrentDoaPhase('premis'); 
            });

        // Event listeners untuk audio utama
        const handleMainAudioPlay = () => setIsPlaying(true);
        const handleMainAudioPause = () => setIsPlaying(false);
        const handleMainAudioEnded = () => {
            console.log("[DoaLoaCodex Play Effect] Main audio ended.");
            setIsPlaying(false); 
            setCurrentDoaPhase('finished'); 
        };

        mainAudio.addEventListener('play', handleMainAudioPlay);
        mainAudio.addEventListener('pause', handleMainAudioPause);
        mainAudio.addEventListener('ended', handleMainAudioEnded);

        // Cleanup function untuk useEffect ini
        return () => {
            console.log("[DoaLoaCodex Play Effect] Cleaning up...");
            clearInterval(panIntervalId); // Hentikan interval panning
            if (mainAudio) { mainAudio.pause(); mainAudio.currentTime = 0; } // Hentikan audio HTML element
            if (ambientAudio) { ambientAudio.pause(); ambientAudio.currentTime = 0; } // Hentikan ambient audio
            if (audioContext && audioContext.state === 'running') {
                audioContext.suspend().then(() => console.log("[DoaLoaCodex Play Effect] AudioContext suspended on cleanup."));
            }
            if (sourceNodeRef.current) { // Pastikan sourceNode lama didisconnect
                sourceNodeRef.current.disconnect();
                sourceNodeRef.current = null; // Reset sourceNodeRef
            }
        };
    }, [selectedDoa, currentDoaPhase, audioContextRef, pannerNodeRef, gainNodeRef, loaCodexDoaCategories]); // Tambahkan semua dependencies yang relevan


    const handleDoaCategorySelect = (event) => {
        const selectedId = event.target.value;
        if (selectedId === 'placeholder') { 
            setSelectedDoa(null);
            return;
        }
        const category = loaCodexDoaCategories.find(cat => cat.id === selectedId);
        if (category) {
            setSelectedDoa(category);
            setCurrentDoaPhase('playing'); 
        }
    };

    const renderPremisPopup = () => (
        <div className="popup-animate-in"> 
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-yellow-300">
                Persiapan Doa LoA Codex
            </h1>
            <div className="doa-text-container bg-black/0 max-h-[45vh] overflow-y-auto mb-6"> 
                <p className="text-base md:text-lg leading-snug text-justify whitespace-pre-line text-gray-200"> 
                    {premisNiatText}
                </p>
            </div>

            <h3 className="text-base md:text-lg font-bold text-gray-100 mb-4">Pilih Tujuan Doa Anda:</h3> 
            <div className="relative w-full"> 
                <select 
                    onChange={handleDoaCategorySelect} 
                    value={selectedDoa ? selectedDoa.id : 'placeholder'} 
                    className="block w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-gray-600 focus:border-blue-500 appearance-none text-base" 
                >
                    {loaCodexDoaCategories.map((category) => (
                        <option 
                            key={category.id} 
                            value={category.id}
                            disabled={category.id === 'placeholder'} 
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
        </div>
    );

    // Fungsi untuk merender tampilan saat audio sedang diputar (KINI HANYA BACKGROUND + TOMBOL SUDUT)
    // KONTEN TEKS DAN IKON DI TENGAH DIHAPUS SEPENUHNYA DARI SINI
    const renderPlayingPhase = () => (
        // Wrapper utama yang akan menjadi Latar Belakang Penuh Layar untuk fase playing
        <div className="fixed inset-0 flex flex-col justify-center items-center p-4 overflow-hidden">
            {/* Gambar Dinamis untuk Fase Playing (ini latar belakang utama) */}
            {selectedDoa && selectedDoa.imageUrl && (
                <img 
                    src={selectedDoa.imageUrl} 
                    alt={selectedDoa.name} 
                    className="playing-phase-dynamic-image" 
                    onLoad={() => console.log(`[DoaLoaCodex] Image loaded: ${selectedDoa.imageUrl}`)}
                    onError={(e) => console.error(`[DoaLoaCodex] Image failed to load: ${selectedDoa.imageUrl}`, e)}
                />
            )}
            {/* CATATAN: Judul, Icon, Pesan "Doa sedang dibacakan..." DIHAPUS SEPENUHNYA DARI SINI */}
        </div>
    );
// --- FUNGSI BARU UNTUK RENDER FASE AKHIR ---
    const renderFinishedPhase = () => (
        <div className="popup-animate-in">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-yellow-300">
                Sesi Doa Selesai!
            </h1>
            <p className="text-base md:text-lg leading-snug text-center text-gray-200 mb-6">
                Anda sudah selesai dengan Doa "{selectedDoa ? selectedDoa.name : 'ini'}" kali ini.
                <br/>Anda sudah menyerahkan kepada Allah segalanya.
                <br/>Senantiasa jaga **9 lubang hawa nafsu**.
                <br/>Sedekah minimal **1000 rupiah tiap hari**.
                <br/>Yakin, **kuasa Allah itu nyata!**
            </p>
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => {
                        setSelectedDoa(null); // Reset pilihan doa
                        setCurrentDoaPhase('premis'); // Kembali ke persiapan
                    }}
                    className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300"
                >
                    Ulangi Doa LoA Codex
                </button>
                <button
                    onClick={() => setCurrentPageKey('daftar-isi')}
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
                >
                    Kembali ke Daftar Isi
                </button>
            </div>
        </div>
    );
    return (
        <div className="fixed inset-0 bg-gray-900 text-white flex flex-col justify-center items-center p-4 overflow-hidden">
            {/* Elemen audio utama (doa) */}
            <audio ref={audioPlayerRef} preload="auto" crossOrigin="anonymous"></audio> {/* crossOrigin penting untuk Web Audio API */}
            {/* Elemen audio latar belakang (ambient) */}
            <audio id="ambient-music-player" ref={ambientAudioRef} preload="auto" loop crossOrigin="anonymous"></audio> {/* Ref baru dan looping, crossOrigin */}

            {/* Tombol "Kembali ke Bab 16" di pojok kiri atas */}
            <div className="absolute top-4 left-4 z-50"> 
                <button
                    onClick={() => {
                        if (audioPlayerRef.current) { audioPlayerRef.current.pause(); audioPlayerRef.current.currentTime = 0; } 
                        if (ambientAudioRef.current) { ambientAudioRef.current.pause(); ambientAudioRef.current.currentTime = 0; } // Hentikan juga ambient
                        setCurrentPageKey('bab16'); 
                    }}
                    className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors text-white"
                >
                    ← Kembali ke Bab 16
                </button>
            </div>
            
            {/* Tombol "Kembali ke Persiapan" di pojok kanan atas - hanya tampil saat playing */}
            {currentDoaPhase === 'playing' && (
                <div className="absolute top-4 right-4 z-50"> 
                    <button
                        onClick={() => {
                            if (audioPlayerRef.current) { audioPlayerRef.current.pause(); audioPlayerRef.current.currentTime = 0; }
                            if (ambientAudioRef.current) { ambientAudioRef.current.pause(); ambientAudioRef.current.currentTime = 0; } // Hentikan juga ambient
                            setCurrentDoaPhase('premis'); 
                        }}
                        className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors text-white"
                    >
                        ← Kembali ke Persiapan
                    </button>
                </div>
            )}

            {/* Gambar Latar Belakang Utama Doa LoA Codex (ini background seluruh halaman saat premis) */}
            {currentDoaPhase === 'premis' && ( 
                <img 
                    src={DEFAULT_DOA_BACKGROUND_IMAGE} 
                    alt="Latar Belakang Doa" 
                    className="doa-background-image" 
                />
            )}
            
            {/* Gambar Dinamis untuk Fase Playing (ini akan jadi latar belakang utama saat playing) */}
            {currentDoaPhase === 'playing' && selectedDoa && selectedDoa.imageUrl && (
                <img 
                    src={selectedDoa.imageUrl} 
                    alt={selectedDoa.name} 
                    className="playing-phase-dynamic-image" 
                    onLoad={() => console.log(`[DoaLoaCodex] Image loaded: ${selectedDoa.imageUrl}`)}
                    onError={(e) => console.error(`[DoaLoaCodex] Image failed to load: ${selectedDoa.imageUrl}`, e)}
                />
            )}

            {/* Konten Utama berdasarkan Fase Doa (Pop-up Premis atau renderPlayingPhase) */}
            {currentDoaPhase === 'premis' && renderPremisPopup()}
            {currentDoaPhase === 'playing' && renderPlayingPhase()} {/* Render playingPhase div utamanya */}
        {currentDoaPhase === 'finished' && renderFinishedPhase()}
        </div>
    );
};

const DoaPilihan = () => {
    const { isDoaLooping, setIsDoaLooping } = useContext(AppContext);
    const doaData = [
        {
            id: 1,
            title: "Doa Perlindungan dari Kegelisahan dan Utang",
            arab: "اللّهُـمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ.",
            terjemahan: "\"Ya Allah, sesungguhnya aku berlindung kepada-Mu dari rasa gelisah dan sedih, dari kelemahan dan kemalasan, dari sifat kikir dan penakut, serta dari lilitan hutang dan tekanan orang-orang.\"",
            manfaat: "Memohon perlindungan dari berbagai kesulitan hidup, termasuk beban utang.",
            latin: "Allaahumma innii a’uudzu bika minal-hammi wal-hazan, wal-‘ajzi wal-kasal, wal-bukhli wal-jubn, wa dhala’id-dayni wa ghalabatir-rijaal",
            audioSrc: "musik/Allahumainneaudzubika.mp3"
        },
        {
            id: 2,
            title: "Doa Memohon Kecukupan Rezeki Halal",
            arab: "اللّهُـمَّ اكْفِـني بِحَلالِـكَ عَنْ حَـرامِـك، وَأَغْنِـني بِفَضْـلِكَ عَمَّـنْ سِـواك.",
            terjemahan: "\"Ya Allah, cukupkanlah aku dengan rezeki halal-Mu dari yang haram, dan jadikanlah aku kaya dengan karunia-Mu dari selain-Mu.\"",
            manfaat: "Memohon kecukupan rezeki yang halal dan kemandirian dari selain Allah.",
            latin: "Allaahumma ikfinii bihalaalika ‘an haraamik, wa aghninii bifadhlika ‘amman siwaak.",
            audioSrc: "musik/Allahumafinne.mp3"
        },
        {
            id: 3,
            title: "Doa Memohon Pertolongan dengan Rahmat Allah",
            arab: "يَا حَيُّ يَا قَيُّوْمُ بِرَحْمَتِكَ أَسْتَغِيْثُ.",
            terjemahan: "\"Wahai Yang Maha Hidup, Wahai Yang Maha Berdiri Sendiri! Dengan rahmat-Mu aku memohon pertolongan!\"",
            manfaat: "Memohon pertolongan dan kemudahan dalam segala urusan.",
            latin: "Ya Hayyu Ya Qayyum! Bi rahmatika astagheeth",
            audioSrc: "musik/yahayyyaqayy.mp3"
        },
        {
            id: 4,
            title: "Doa Nabi Yunus (Saat Terdesak)",
              arab: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ.",
            terjemahan: "\"Tidak ada Tuhan selain Engkau. Maha Suci Engkau, sesungguhnya aku termasuk orang-orang yang zalim.\"",
            manfaat: "Doa permohonan ampun dan pertolongan dalam keadaan terdesak (Doa Nabi Yunus).",
            latin: "Laa ilaaha illaa anta subhaanaka inni kuntu minazh-zhaalimiin",
            audioSrc: "musik/NabiYunus.mp3"
        },
        {
            id: 5,
            title: "Doa Tawakal Penuh kepada Allah",
            arab: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.",
            terjemahan: "\"Cukuplah Allah bagiku, tiada Tuhan selain Dia. Hanya kepada-Nya aku bertawakal, dan Dia adalah Tuhan pemilik Arsy yang agung.\"",
            manfaat: "Menegaskan tawakal penuh kepada Allah sebagai satu-satunya sandaran.",
            latin: "Hasbiyallaahu laa ilaaha illaa Huwa, ‘alayhi tawakkaltu wa Huwa Rabbul-‘Arsyil-‘Azhiim.",
            audioSrc: "musik/Hasbiyallah.mp3"
        },
        {
            id: 6,
            title: "Doa Pembebasan dari Utang",
            arab: "اللَّهُمَّ يَا فَارِجَ الْهَمِّ، وَيَا كَاشِفَ الْغَمِّ، فَرِّجْ هَمِّي وَاكْشِفْ غَمِّي، وَارْزُقْنِي مِنْ حَيْثُ لَا أَحْتَسِبُ، يَا أَرْحَمَ الرَّاحِمِينَ",
            terjemahan: "\"Ya Allah! Wahai penghilang kesedihan... dan bebaskanlah aku dari semua utang.\"",
            manfaat: "Doa spesifik untuk pembebasan dari utang dan memohon rahmat.",
            latin: "Allaahumma yaa faarija al-hamm, wa yaa kaasyifa al-ghamm, farrij hammi wakshif ghummi, warzuqni min haytsu laa ahtasib, yaa arhamar raahimiin.",
            audioSrc: "musik/Allahumayafarijal.mp3"
        },
        {
            id: 7,
            title: "Doa Melunasi Utang Orang Lain dari Karunia Allah",
            arab: "اللَّهُمَّ ٱرْدُدْ إِلَىٰ جَمِيعِ خَلْقِكَ مَظَالِمَهُمُ ٱلَّتِي قِبَلِي صَغِيرِهَا وَكَبِيرِهَا فِي يُسْرٍ مِنْكَ وَعَافِيَةٍ، وَمَا لَمْ تُبَلِّغْهُ قُوَّتِي وَلَمْ تَسَعْهُ ذَاتُ يَدِي وَلَمْ يَقْوَ عَلَيْهِ بَدَنِي وَيَقِينِي وَنَفْسِي، فَأَدِّهِ عَنِّي مِنْ جَزِيلِ مَا عِنْدَكَ مِنْ فَضْلِكَ، ثُمَّ لَا تُخْلِفْ عَلَيَّ مِنْهُ شَيْئًا تَقْضِيهِ مِنْ حَسَنَاتِي، يَا أَرْحَمَ الرَّاحِمِينَ.",
            terjemahan: "\"Ya Allah, kembalikanlah kepada seluruh makhluk-Mu segala kezhaliman mereka yang masih ada padaku — baik yang kecil maupun yang besar — dengan kemudahan dan keselamatan dari-Mu. Dan apa pun yang kekuatanku tak sanggup menyampaikannya, yang tanganku tak sanggup menjangkaunya, yang tubuhku, keyakinanku, dan diriku tak mampu memikulnya — maka tunaikanlah itu dariku dengan limpahan karunia-Mu. Lalu janganlah Engkau kurangi sedikit pun darinya dari (imbalan) kebaikanku, wahai Zat Yang Maha Pengasih di antara para pengasih.\"",
            manfaat: "Permohonan agar Allah melunasi utang yang tak mampu dibayar dari karunia-Nya.",
            latin: "Allaahumma urdud ilaa jamii‘i khalqika mazaalimahum allati qibalii shaghiiruhaa wa kabiiruhaa fii yusrin minka wa ‘aafiyah. Wa maa lam tuballigh-hu quwwatii wa lam tasa‘hu dhaatu yadî wa lam yaqwa ‘alayhi badanii wa yaqînii wa nafsii, fa-addihi ‘annii min jaziili maa ‘indaka min fadhlika, tsumma laa tukhlif ‘alayya minhu syay’an taqdhiihi min hasanaatii, yaa arhamar raahimiin.",
            audioSrc: "musik/Allahumaurdud.mp3"
        },
        {
            id: 8,
            title: "Doa Memohon Kemudahan",
            arab: "االلّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلاً",
            terjemahan: "\"Ya Allah, tidak ada kemudahan kecuali apa yang Engkau jadikan mudah, dan Engkaulah yang menjadikan kesedihan (kesulitan) itu mudah jika Engkau kehendaki.\"",
            manfaat: "Memohon kemudahan dari Allah dalam menghadapi segala kesulitan.",
            latin: "Allahumma la sahla illa maa ja‘altahu sahlan, wa anta taj‘alu al-hazna idza syi’ta sahlan.",
            audioSrc: "musik/Allahumasahla.mp3" 
        },
        {
            id: 9,
            title: "Doa Memohon Qana'ah dan Keberkahan Rezeki",
            arab: "اللَّهُمَّ قَنِّعْنِي بِمَا رَزَقْتَنِي وَبَارِكْ لِي فِيهِ وَاخْلُفْ عَلَيَّ كُلَّ غَائِبَةٍ لِي بِخَيْرٍ",
            terjemahan: "\"Ya Allah, cukupkanlah aku dengan apa yang Engkau rezekikan kepadaku, berkahilah ia untukku, dan gantilah setiap yang hilang dariku dengan yang lebih baik.\"",
            manfaat: "Memohon rasa cukup (qana'ah), keberkahan, dan penggantian yang lebih baik.",
            latin: "Allahumma qanni’ni bima razaqtani, wa baarik li fihi, wakhluf ‘alayya kulla gha’ibatin li bikhayr.",
            audioSrc: "musik/Allahumaqanni.mp3"
        },
      {
            id: 10,
            title: "Doa Rejeki Lapang dan Luas Surat Ali Imron 26-27",
            arab: "قُلِ اللَّهُمَّ مَالِكَ الْمُلْكِ تُؤْتِي الْمُلْكَ مَن تَشَاءُ وَتَنزِعُ الْمُلْكَ مِمَّن تَشَاءُ وَتُعِزُّ مَن تَشَاءُ وَتُذِلُّ مَن تَشَاءُ ۖ بِيَدِكَ الْخَيْرُ ۖ إِنَّكَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ  , تُولِجُ اللَّيْلَ فِي النَّهَارِ وَتُولِجُ النَّهَارَ فِي اللَّيْلِ وَتُخْرِجُ الْحَيَّ مِنَ الْمَيِّتِ وَتُخْرِجُ الْمَيِّتَ مِنَ الْحَيِّ وَتَرْزُقُ مَن تَشَاءُ بِغَيْرِ حِسَابٍ",
            terjemahan: "\"Katakanlah (Muhammad), ‘Wahai Allah, Pemilik kerajaan, Engkau berikan kerajaan kepada siapa yang Engkau kehendaki, dan Engkau cabut kerajaan dari siapa yang Engkau kehendaki. Engkau muliakan siapa yang Engkau kehendaki, dan Engkau hinakan siapa yang Engkau kehendaki. Di tangan-Mu segala kebajikan. Sungguh, Engkau Mahakuasa atas segala sesuatu. Engkau masukkan malam ke dalam siang dan Engkau masukkan siang ke dalam malam. Engkau keluarkan yang hidup dari yang mati, dan Engkau keluarkan yang mati dari yang hidup. Dan Engkau berikan rezeki kepada siapa yang Engkau kehendaki tanpa perhitungan\"",
            manfaat: "memohon dibalikkan keadaan, diangkat derajat, dicukupkan rezeki, dan diberi kemuliaan di dunia & akhirat.",
            latin: "Qulillaahumma maalikal-mulki tu’til-mulka man tasyā’u wa tanzi‘ul-mulka mimman tasyā’, wa tu‘izzu man tasyā’u wa tudzillu man tasyā’, biyadikal-khayr, innaka ‘alā kulli syay’in qadiir. Tuulijul-layla fin-nahāri wa tuulijun-nahāra fil-layl, wa tukhrijul-hayya minal-mayyit, wa tukhrijul-mayyita minal-hayy, wa tarzuqu man tasyā’u bighayri hisāb.",
            audioSrc: "musik/Surah2627.mp3"
        },
    ];

return (
        <div className={contentContainerClasses}>
            <h2 className={sectionTitleClasses}>🙏 Doa-doa Pilihan (Kelapangan Rezeki dan Pelunasan Utang)</h2>
            <p className={paragraphClasses}>
                Berikut adalah kumpulan doa pilihan yang dapat Anda amalkan untuk memohon kelapangan rezeki, kemudahan urusan, dan pembebasan dari utang. Klik pada judul doa untuk melihat detail dan mendengarkan audionya.
            </p>
{/* --- NEW: Toggle Button for Looping --- */}
            <div className="text-center my-6">
                <button
                    onClick={() => setIsDoaLooping(prev => !prev)}
                    className={`px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-300 transform hover:scale-105 ${
                        isDoaLooping ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                >
                    {isDoaLooping ? '🔁 Looping Aktif' : '▶️ Aktifkan Looping'}
                </button>
                <p className="text-sm text-gray-600 mt-2">
                    {isDoaLooping ? 'Setiap doa akan berulang otomatis.' : 'Doa akan diputar sekali lalu berhenti.'}
                </p>
            </div>
            {/* --- END NEW TOGGLE --- */}
            <div className="mt-6 space-y-3">
                {doaData.map(doa => (
                    <DoaAccordion
                        key={doa.id}
                        title={doa.title}
                        audioSrc={doa.audioSrc}
                        arabicText={doa.arab}
                        latinText={doa.latin}
                        translationText={doa.terjemahan}
                        benefitsText={doa.manfaat}
                        isLooping={isDoaLooping}
                    />
                ))}
            </div>
        </div>
    );
};



// ### KOMPONEN LAYOUT UTAMA ###
// Komponen baru untuk mengatur struktur halaman utama
// Di dalam komponen MainLayout.js

const MainLayout = () => {
    const { 
        themeKey, themes, 
        currentPageKey, setCurrentPageKey, 
        fontSizeIndex, setFontSizeIndex, fontSizes, 
        setIsCoverUnlocked, 
        isSidebarOpen, setIsSidebarOpen,
        isActivated, // <--- PASTIKAN INI ADA DI SINI! (Diambil dari AppContext)
        resetAppState
    } = useContext(AppContext);
    
    const currentTheme = themes[themeKey];
    const pageIndex = pages.findIndex(p => p === currentPageKey);

    // --- PESAN GROUNDED DAN LOGIKA ROTASI ---
    const groundedMessages = [
        "Ketenangan di hati adalah pangkal rezeki.",
        "Setiap tarikan napas adalah karunia. Bersyukurlah.",
        "Fokus pada sekarang. Hadirkan hati, semesta berpihak padamu.",
        "Ridho dan syukur melapangkan jalanmu.",
        "Yakinlah, Allah sebaik-baiknya perencana.",
        "Dunia boleh heboh, hatimu tetap tenang.",
        "Jalanmu lapang, rezekimu berlimpah. Percayalah."
    ];
    const [currentGroundedMessage, setCurrentGroundedMessage] = useState(groundedMessages[0]);
    const [displayedUserName, setDisplayedUserName] = useState('');

    useEffect(() => {
        const storedUserName = localStorage.getItem('ebookUserName');
        if (storedUserName) {
            setDisplayedUserName(storedUserName);
        }

        let messageIndex = 0;
        const interval = setInterval(() => {
            messageIndex = (messageIndex + 1) % groundedMessages.length;
            setCurrentGroundedMessage(groundedMessages[messageIndex]);
        }, 10000); // Ganti pesan setiap 10 detik

        return () => clearInterval(interval);
    }, []); // Efek ini hanya berjalan sekali saat mount

    const getGroundedHeaderText = () => {
        if (displayedUserName) {
            return `Hai ${displayedUserName}, ${currentGroundedMessage}`;
        }
        return currentGroundedMessage; // Jika nama belum ada, tampilkan pesan saja
    };
    // --- AKHIR PESAN GROUNDED ---

    const goToPage = (direction) => {
        const nextIndex = pageIndex + direction;
        if (nextIndex >= 0 && nextIndex < pages.length) {
            const nextPageKey = pages[nextIndex];
            if (nextPageKey !== 'pixel-thoughts' && nextPageKey !== 'affirmation-room' && nextPageKey !== 'secret-room-rezeki' && nextPageKey !== 'pengaturan' && nextPageKey !== 'kata-pengantar' && nextPageKey !== 'activation-screen' && nextPageKey !== 'doa-harian' && nextPageKey !== 'doapilihan' && nextPageKey !== 'reminder-settings'&& nextPageKey !== 'doa-loa-codex') { 
                setCurrentPageKey(nextPageKey);
            }
        }
    };
    
    const changeFontSize = (direction) => {
        let nextIndex = fontSizeIndex + direction;
        if (nextIndex >= 0 && nextIndex < fontSizes.length) {
            setFontSizeIndex(nextIndex);
        }
    };

    const handleCloseBook = () => {
        closeFullscreen();
        setIsCoverUnlocked(false);
        resetAppState();
    };

    const renderPage = () => {
        switch (currentPageKey) {
            case 'kata-pengantar': return <KataPengantar />;
            case 'daftar-isi': return <DaftarIsi />;
            case 'bab1': return <Bab1 />;
            case 'bab2': return <Bab2 />;
            case 'bab3': return <Bab3 />;
            case 'bab4': return <Bab4 />;
            case 'bab5': return <Bab5 />;
            case 'bab6': return <Bab6 />;
            case 'bab7': return <Bab7 />;
            case 'bab8': return <Bab8 />;
            case 'bab9': return <Bab9 />;
            case 'bab10': return <Bab10 />;
            case 'bab11': return <Bab11 />;
            case 'bab12': return <Bab12 />;
            case 'bab13': return <Bab13 />;
            case 'bab14a': return <Bab14a />;
            case 'bab14b': return <Bab14b />;
            case 'bab15': return <Bab15 />;
            case 'bab16': return <Bab16 />;
            case 'doa-loa-codex': return <DoaLoaCodex />;
            case 'doapilihan': return <DoaPilihan />;
            case 'pengaturan': return <ThemeSettings />;
            case 'doa-harian': return <DoaHarianPlaylist />;
            case 'pixel-thoughts': return <PixelThoughts />; 
            case 'affirmation-room': return <AffirmationRoom />; 
            case 'secret-room-rezeki': return <SecretRoomRezeki />; 
            case 'activation-screen': return <ActivationScreen />; 
            case 'reminder-settings': return <ReminderSettings />; 
            default: return <DaftarIsi />;
        }
    };

    return (
        <div className="min-h-screen w-full">
            {/* --- SIDEBAR & OVERLAY --- */}
            <div className={`sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
                <SidebarMenu />
            </div>
            {isSidebarOpen && (
                <div onClick={() => setIsSidebarOpen(false)} className="sidebar-overlay"></div>
            )}

            {/* --- PEMBUNGKUS UTAMA UNTUK KONTEN (HEADER, MAIN, FOOTER) --- */}
            <div className="flex flex-col min-h-screen">
                {currentPageKey !== 'kata-pengantar' && (
                    <header className={`sticky top-0 z-40 w-full text-white shadow-md ${currentTheme.header}`}>
                        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                            <button onClick={() => setIsSidebarOpen(true)} className="font-bold text-lg hover:opacity-80 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                                Daftar Isi
                            </button>
                            {/* --- PESAN GROUNDED DI TENGAH HEADER --- */}
                            <p className="flex-grow text-center text-sm font-semibold text-white/90">
                                {getGroundedHeaderText()}
                            </p>
                            {/* --- AKHIR PESAN GROUNDED --- */}
                            <div className="flex items-center gap-2 md:gap-4">
                                <button onClick={() => setCurrentPageKey('pengaturan')} className="p-2 rounded-full hover:bg-white/20" title="Pengaturan Tema">
                                    <span className="text-2xl">🎨</span>
                                </button>
                                <button onClick={handleCloseBook} className="p-2 rounded-full hover:bg-white/20" title="Tutup E-book">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </header>
                )}

                <main className={`flex-grow container mx-auto px-4 ${currentPageKey === 'kata-pengantar' ? 'py-16' : 'py-8 md:py-12'}`}>
                    {renderPage()}
                </main>

                {currentPageKey !== 'kata-pengantar' && (
                    <footer className={`sticky bottom-0 z-40 w-full text-white shadow-inner p-4 ${currentTheme.header}`}>
                        <div className="container mx-auto flex justify-between items-center">
                            <button onClick={() => goToPage(-1)} disabled={pageIndex <= 1} className="px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-white/20">‹ Sebelumnya</button>
                            <div className="flex items-center gap-2">
                                <button onClick={() => changeFontSize(-1)} disabled={fontSizeIndex <= 0} className="px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-white/20">A-</button>
                                <span className="w-8 text-center font-semibold">{parseInt(fontSizes[fontSizeIndex])}</span>
                                <button onClick={() => changeFontSize(1)} disabled={fontSizeIndex >= fontSizes.length - 1} className="px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-white/20">A+</button>
                            </div>
                            <button onClick={() => goToPage(1)} disabled={pageIndex >= pages.findIndex(p => p === 'bab16')} className="px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-white/20">Berikutnya ›</button>
                        </div>
                        <div className="mt-3">
                            <RandomQuote />
                        </div>
                    </footer>
                )}
            </div>

            {/* --- INTEGRASI SAD HOUR REMINDER DI SINI --- */}
            {/* Kondisi rendering: isActivated (sudah aktif) DAN bukan di layar aktivasi DAN sidebar tidak terbuka */}
            {isActivated && currentPageKey !== 'activation-screen' && isSidebarOpen === false && ( 
                <SadHourReminder 
                    onClose={() => console.log('Reminder closed')} 
                    onNavigateToRoom={setCurrentPageKey} 
                />
            )}
            {/* --- AKHIR INTEGRASI REMINDER --- */}

        </div>
    );
};

//hujankata
// ### TAMBAHKAN KEMBALI KOMPONEN ASLI INI ###
const WordRainBackground = () => {
    const [words, setWords] = React.useState([]);

    React.useEffect(() => {
        const wordPool = [ 'Kaya', 'Berkelimpahan', 'Tenang', 'Rileks', 'Damai', 'Sejahtera', 'Syukur', 'Ikhlas', 'Wealth', 'Abundance', 'Rich', 'Calm', 'Relax', 'Peace', 'Grateful', 'Flow', 'Sugih', 'Tentrem', 'Ayem', 'Luber', 'Makmur', 'Nrimo', 'Legowo' ];

        const generateWords = () => {
            const newWords = Array.from({ length: 120 }).map(() => ({
                text: wordPool[Math.floor(Math.random() * wordPool.length)],
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 12 + 10 + 3}px`, 
                animationDuration: `${Math.random() * 2 + 1 + 3}s`,
                animationDelay: `${Math.random() * 10}s`,
                opacity: Math.random() * 0.5 + 0.2,
            }));
            setWords(newWords);
        };

        generateWords();
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {words.map((word, index) => (
                <span
                    key={index}
                    className="falling-word" // Menggunakan kelas 'falling-word'
                    style={{
                        left: word.left,
                        fontSize: word.fontSize,
                        animationDuration: word.animationDuration,
                        animationDelay: word.animationDelay,
                        opacity: word.opacity,
                    }}
                >
                    {word.text}
                </span>
            ))}
        </div>
    );
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
                animationDelay: `${Math.random() * 5}s`,
            }));
            setWords(newWords);
        };

        generateWords();
    }, [customWords]); // Efek ini akan berjalan lagi jika customWords berubah

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {words.map((word, index) => (
                <span
                    key={index}
                    className="zooming-word"
                    style={{
                        top: word.top,
                        left: word.left,
                        fontSize: word.fontSize,
                        animationDuration: word.animationDuration,
                        animationDelay: word.animationDelay,
                        '--rain-color': rainColor, // Menerapkan warna
                    }}
                >
                    {word.text}
                </span>
            ))}
        </div>
    );
};

const SidebarMenu = () => {
    // Ambil fungsi untuk navigasi dan menutup sidebar dari context
    const { setCurrentPageKey, setIsSidebarOpen , installPromptEvent} = useContext(AppContext);

    const handleNavigate = (pageKey) => {
        setCurrentPageKey(pageKey);
        setIsSidebarOpen(false); // Otomatis tutup sidebar setelah bab dipilih
    };
    const handleInstallClick = () => {
        if (!installPromptEvent) {
            alert("Tidak bisa meng-install, browser mungkin tidak didukung.");
            return;
        }
        // Tampilkan dialog instalasi bawaan browser
        installPromptEvent.prompt();
    };
    // Style tombol yang sudah kita buat sebelumnya
    const tocSectionClasses = "block w-full text-left font-bold text-lg text-black p-3 rounded-lg hover:bg-sky-100 transition-colors";
    const tocChapterClasses = "block w-full text-left text-black font-semibold p-2 pl-4 rounded-lg hover:bg-sky-100 transition-colors";
    const tocFeatureClasses = "block w-full text-left font-bold text-xl p-3 rounded-lg hover:bg-yellow-100 transition-colors";

    return (
        // Ini adalah isi dari sidebar kita
        <>
            <h4 className={`${sectionTitleClasses} mb-4`}>📑 DAFTAR ISI</h4>
        {/* --- TOMBOL INSTALL PWA (HANYA MUNCUL JIKA BISA) --- */}
            {installPromptEvent && (
                <div className="px-4 mb-4">
                    <button onClick={handleInstallClick} className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Install Aplikasi
                    </button>
                </div>
            )}  
            <ul className="space-y-1 px-2">
                 <li><button onClick={() => handleNavigate('bab1')} className={tocSectionClasses}>Bagian I: Dunia Ribut, Hati Harus Tenang</button>
                    <ul className="ml-4 mt-1 space-y-1">
                        <li><button onClick={() => handleNavigate('bab1')} className={tocChapterClasses}>1. Dunia Boleh Heboh...</button></li>
                        <li><button onClick={() => handleNavigate('bab2')} className={tocChapterClasses}>2. Kita Ini Mau Ke Mana?</button></li>
                    </ul>
                </li>


<li><button onClick={() => handleNavigate('bab3')} className={tocSectionClasses}>Bagian II: Membedah Dalam Diri</button>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li><button onClick={() => handleNavigate('bab3')} className={tocChapterClasses}>3. Hati: Singgasana Cahaya yang Terlupakan</button></li>
                            <li><button onClick={() => handleNavigate('bab4')} className={tocChapterClasses}>4. Akal: Satpam atau Penjaga Gerbang Ilahi?</button></li>
                            <li><button onClick={() => handleNavigate('bab5')} className={tocChapterClasses}>5. Intuisi: Bahasa Lembut yang Kita Abaikan</button></li>
                        </ul>
                    </li>
                    <li><button onClick={() => handleNavigate('bab6')} className={tocSectionClasses}> Bagian III: Kecerdasan Hati dan Koherensi Diri</button>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li><button onClick={() => handleNavigate('bab6')} className={tocChapterClasses}> 6.HeartMath dan Koherensi: Saat Hati dan Otak Berdamai</button></li>
                            <li><button onClick={() => handleNavigate('bab7')} className={tocChapterClasses}> 7.Janin pun Tahu: Jantung Lebih Dulu dari Otak</button></li>
                                              </ul>
                    </li>

                    <li><button onClick={() => handleNavigate('bab8')} className={tocSectionClasses}> Bagian IV: Kawrooh – Metode Menjernihkan Hati</button>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li><button onClick={() => handleNavigate('bab8')} className={tocChapterClasses}> 8. Kawrooh: Ilmu Melepas Tanpa Drama</button></li>
                            <li><button onClick={() => handleNavigate('bab9')} className={tocChapterClasses}> 9. Langkah-Langkah Kawrooh (di sertakan audio contoh pelepasan emosi)</button></li>
                                              </ul>
                    </li>

                    <li><button onClick={() => handleNavigate('bab10')} className={tocSectionClasses}> Bagian V: Praktik Inti Spiritualitas Islam</button>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li><button onClick={() => handleNavigate('bab10')} className={tocChapterClasses}> 10. Sholawat: Jalan Cepat Menuju Cahaya (di sertai audio sholawat pilihan)</button></li>
                            <li><button onClick={() => handleNavigate('bab11')} className={tocChapterClasses}>11. Afirmasi, Dzikir, Doa, dan Amal Saleh: Nafas Penyerahan Diri</button></li>
                                              </ul>
                    </li>
              
                    <li><button onClick={() => handleNavigate('bab12')} className={tocSectionClasses}> Bagian VI: Jalan Pulang ke Dalam</button>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li><button onClick={() => handleNavigate('bab12')} className={tocChapterClasses}> 12.Membersihkan Kaca Jiwa: Tazkiyatun Nafs</button></li>
                            <li><button onClick={() => handleNavigate('bab13')} className={tocChapterClasses}>13. Praktik-Praktik Spiritual Harian</button></li>
                                              </ul>
                    </li>
              
<li><button onClick={() => handleNavigate('bab14')} className={tocSectionClasses}> Bagian VII: Spiritualitas dan Hukum Kehidupan</button>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li><button onClick={() => handleNavigate('bab14a')} className={tocChapterClasses}> 14.a Law of Attraction: Versi Langit Bukan Versi Afirmasi</button></li>
                            <li><button onClick={() => handleNavigate('bab14b')} className={tocChapterClasses}>14.b Tanda-tanda Datangnya Kelimpahan</button></li>
                                              </ul>
                    </li>
                    
                    <li><button onClick={() => handleNavigate('bab15')} className={tocSectionClasses}> Bagian Penutup: Kompas Kehidupan</button>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li><button onClick={() => handleNavigate('bab15')} className={tocChapterClasses}> 15. Merangkai Semua: Dari Kesadaran Menuju Kehidupan Berkah</button></li>
                        </ul>
                    </li>
              <li><button onClick={() => handleNavigate('bab16')} className={tocSectionClasses}>Bab Tambahan: 369 Tesla × 369 Law of Allah</button></li>
                <li className="pt-4"><button onClick={() => handleNavigate('pixel-thoughts')} className={`${tocFeatureClasses} golden-background text-yellow-600`}>Ruang Pelepasan</button></li>
    <li className="pt-2"><button onClick={()=> handleNavigate('affirmation-room')} className={`${tocFeatureClasses} golden-background text-sky-500`}> Ruang Afirmasi</button></li>
    <li className="pt-2"><button onClick={() => handleNavigate('secret-room-rezeki')} className={`${tocFeatureClasses} golden-background text-purple-500`}> Ruang Rahasia Menarik Rezeki</button></li>
                <li className="pt-2"><button onClick={()=> handleNavigate('doapilihan')} className={`${tocFeatureClasses} text-green-600`}>🙏 Doa-doa Pilihan</button></li>
             <li className="pt-2"><button onClick={() => handleNavigate('doa-harian')} className={`${tocFeatureClasses} text-emerald-600`}>🤲 Doa Khusus</button></li>
              <li className="pt-2"><button onClick={() => handleNavigate('reminder-settings')} className={`${tocFeatureClasses} text-red-400`}>🔔 Bucket List Goal</button></li>
              </ul>
        </>
    );
}
  

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

    return (
        <div className="fixed inset-0 bg-gray-900 text-white flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Starfield sebagai latar belakang kosmik */}
            <WordRainBackground rainColor="#f0e68c"/>

            {/* Container Buku */}
            <div className="book-container animate-fade-in">
               

                {/* Konten di dalam cover */}
                <div className="relative z-10 text-center flex flex-col items-center justify-center h-full p-5">
                        
                        

                        <p className="mb-11 text-gray-300/80 text-sm"></p>
                        
                        
                        <button
                            onClick={handleUnlock}
                            className={`relative p-4 group ${isExiting ? 'star-shine-effect' : ''}`}
                            aria-label="Buka E-book"
                        >
                           <div className="w-7 h-20 text-yellow-100 transition-transform duration-500 group-hover:scale-150">
                                {/* === SVG BINTANG DIGANTI DENGAN SVG STARLIGHT / PERCIKAN CAHAYA === */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="-1 13 20 20" fill="currentColor">
                                  <path d="M10 3L12 8L17 10L12 12L10 17L8 12L3 10L8 8L10 3z" />
                                </svg>
                             
                            </div>
                        </button>
                    </div>
            </div>
            
            {/* Nama Pengarang diletakkan di luar 'buku' */}
            <div className="mt-7">
                <p className="text-sm text-gray-400/60">
                    Karya: Akasha Bayu Sasmita
                </p>
            </div>
        </div>
    );
};

// Daftar halaman untuk navigasi
  const pages = ['kata-pengantar', 'daftar-isi', 'bab1', 'bab2', 'bab3', 'bab4', 'bab5', 'bab6', 'bab7', 'bab8', 'bab9', 'bab10', 'bab11', 'bab12', 'bab13', 'bab14a', 'bab14b', 'bab15','bab16','affirmation-room', 'doapilihan', 'pixel-thoughts', 'pengaturan','doa-harian','secret-room-rezeki','activation-screen','reminder-settings','doa-loa-codex' ];


// ### KOMPONEN UTAMA APLIKASI (OTAK DARI SEMUANYA) ###
   // ### KOMPONEN UTAMA APLIKASI (OTAK DARI SEMUANYA) ###
// Pastikan baris ini ada di paling atas file JS kamu:
// const { useState, useEffect, useRef, createContext, useContext } = React;

// ### KOMPONEN UTAMA APLIKASI (OTAK DARI SEMUANYA) ###
const App = () => {
    const [isCoverUnlocked, setIsCoverUnlocked] = useState(false); 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const themes = {
        'blue': { name: 'Biru Klasik', header: 'bg-blue-700' },
        'green': { name: 'Hijau Menenangkan', header: 'bg-teal-700' },
        'purple': { name: 'Ungu Spiritual', header: 'bg-indigo-700' },
        'dark': { name: 'Mode Gelap', header: 'bg-gray-800' },
    };
    const [themeKey, setThemeKey] = useState('blue');
    const fontSizes = [ '14px','16px','18px','20px', '22px', '24px','26px', '28px', '30px','32px', '34px', '36px'];
    const [fontSizeIndex, setFontSizeIndex] = useState(1);
    const [currentPageKey, setCurrentPageKey] = useState('home'); // Default ke 'home' atau halaman pertama setelah aktivasi
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [installPromptEvent, setInstallPromptEvent] = useState(null);
    const [bgOpacity, setBgOpacity] = useState(80); 
    const [userName, setUserName] = useState(() => localStorage.getItem('ebookUserName') || '');
    const [isDoaLooping, setIsDoaLooping] = useState(false); 

    // --- State Kunci untuk Fitur Aktivasi ---
    // Baca status aktivasi dari localStorage saat inisialisasi App
    const [isActivated, setIsActivated] = useState(() => {
        const storedActivation = localStorage.getItem('ebookActivated') === 'true';
        console.log("App startup: isActivated from localStorage =", storedActivation);
        return storedActivation;
    });
// --- NEW STATE UNTUK MENGONTROL POP-UP AWAL ---
    const [hasShownInitialReminder, setHasShownInitialReminder] = useState(() => {
        // Cek apakah reminder sudah pernah ditampilkan di sesi sebelumnya
        // atau jika ini adalah pertama kali aplikasi diaktifkan.
        // Kita bisa menyimpan flag di localStorage untuk ini.
        return localStorage.getItem('hasShownInitialReminder') === 'true' && localStorage.getItem('ebookActivated') === 'true';
    });
    // Update localStorage saat hasShownInitialReminder berubah
    useEffect(() => {
        localStorage.setItem('hasShownInitialReminder', hasShownInitialReminder);
    }, [hasShownInitialReminder]);
    
    useEffect(() => {
        // Ambil nilai transparansi yang tersimpan
        const savedOpacity = localStorage.getItem('ebookBgOpacity');
        if (savedOpacity) {
            setBgOpacity(Number(savedOpacity));
        }
    }, []);

    // --- EFEK UNTUK MENGUBAH CSS VARIABEL ---
    useEffect(() => {
        localStorage.setItem('ebookBgOpacity', bgOpacity);
        document.documentElement.style.setProperty('--content-bg-opacity', bgOpacity / 100);
    }, [bgOpacity]);
        
    // --- Efek untuk PWA Install Prompt ---
    useEffect(() => {
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setInstallPromptEvent(event);
            console.log("PWA bisa di-install, event ditangkap!");
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    // --- Efek untuk Memuat Tema Tersimpan ---
    useEffect(() => {
        const savedTheme = localStorage.getItem('ebookThemeKey');
        if (savedTheme && themes[savedTheme]) {
            setThemeKey(savedTheme);
        }
    }, []);

    // --- Efek untuk Mengatur Ukuran Font Dinamis ---
    useEffect(() => {
        document.documentElement.style.setProperty('--dynamic-font-size', fontSizes[fontSizeIndex]);
    }, [fontSizeIndex]);

    // --- Efek untuk Scroll ke Atas Saat Halaman Berubah ---
    // Ini juga akan membantu memicu re-render jika currentPageKey berubah
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPageKey]);

    // --- Efek untuk memantau perubahan localStorage untuk isActivated ---
    // Ini PENTING agar App bereaksi ketika ActivationScreen mengubah 'ebookActivated'
    useEffect(() => {
        const handleStorageChange = () => {
            const newActivationStatus = localStorage.getItem('ebookActivated') === 'true';
            if (newActivationStatus !== isActivated) {
                console.log("localStorage 'ebookActivated' changed! Updating App state to", newActivationStatus);
                setIsActivated(newActivationStatus);
            }
            const newUserName = localStorage.getItem('ebookUserName') || '';
            if (newUserName !== userName) {
                setUserName(newUserName);
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [isActivated]); // Dependensi isActivated agar listener aktif jika isActivated berubah sendiri
    
const resetAppState = async () => { // Pastikan ini async
        console.log("Resetting app state (excluding activation key and bucket list)...");
        
        // --- REVISI DI SINI: Tambahkan 'customReminders' ke itemsToKeep ---
        const itemsToKeep = ['ebookActivated', 'ebookActivationKey', 'customReminders', 'ebookUserName', 'ebookBgOpacity', 'ebookThemeKey', 'hasShownInitialReminder']; 
        // Anda juga bisa menambahkan 'ebookUserName', 'ebookBgOpacity', 'ebookThemeKey', 'hasShownInitialReminder'
        // jika ingin setting personalisasi ini tetap ada setelah reset.
        // Saya menyarankan untuk tetap menyimpan ini, kecuali hasShownInitialReminder jika ingin popup awal muncul lagi.

        const allLocalStorageKeys = Object.keys(localStorage);
        for (const key of allLocalStorageKeys) {
            if (!itemsToKeep.includes(key)) {
                localStorage.removeItem(key);
            }
        }

        // Hapus semua cache Service Worker
        if ('caches' in window) {
            try {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(cacheName => {
                    console.log(`Deleting cache: ${cacheName}`);
                    return caches.delete(cacheName);
                }));
                console.log("All Service Worker caches cleared.");
            } catch (error) {
                console.error("Error clearing Service Worker caches:", error);
            }
        } else {
            console.warn("Cache API not supported in this browser.");
        }

        // Reset state aplikasi ke nilai default
        setCurrentPageKey('kata-pengantar'); // Kembali ke kata pengantar
        setIsSidebarOpen(false);
        // Nilai di bawah ini akan diambil dari localStorage yang sudah kita tentukan untuk disimpan
        setThemeKey(localStorage.getItem('ebookThemeKey') || 'blue'); 
        setFontSizeIndex(1); // Reset ukuran font ke default
        setBgOpacity(Number(localStorage.getItem('ebookBgOpacity')) || 80); 
        setIsDoaLooping(false); 
        // hasShownInitialReminder akan diambil dari localStorage (dipertahankan)
        // jika tidak, maka tambahkan setHasShownInitialReminder(false) jika ingin selalu muncul.
        setHasShownInitialReminder(localStorage.getItem('hasShownInitialReminder') === 'true'); // Mempertahankan status tampil/tidak tampilnya pengingat awal
        setUserName(localStorage.getItem('ebookUserName') || ''); 
    };
    // Context Value - isActivated dan setIsActivated sekarang disertakan!
    const contextValue = {
        themes, themeKey, setThemeKey,
        fontSizes, fontSizeIndex, setFontSizeIndex,
        currentPageKey, setCurrentPageKey, // currentPageKey ini yang akan dikontrol oleh App
        isCoverUnlocked, setIsCoverUnlocked,
        isSidebarOpen, setIsSidebarOpen,
        isMenuOpen, setIsMenuOpen,
        bgOpacity, setBgOpacity,
        isDoaLooping, setIsDoaLooping,
        userName, setUserName,
        isActivated, setIsActivated ,
        resetAppState
    };
    
    return (
        <AppContext.Provider value={contextValue}>
            <Starfield /> 
            {
                !isCoverUnlocked ? <CoverScreen /> 
                // Logika routing berdasarkan isActivated dan currentPageKey
                // Jika belum aktif, selalu tampilkan ActivationScreen
                : !isActivated ? <ActivationScreen /> 
                    // Perubahan ada di sini: SadHourReminder akan muncul setelah aktivasi,
                    // dan sebelum navigasi ke halaman lain.
                    : (currentPageKey === 'kata-pengantar' || currentPageKey === 'home') && !hasShownInitialReminder // <-- Tambahkan state ini
                        ? <SadHourReminder onClose={() => setHasShownInitialReminder(true)} onNavigateToRoom={setCurrentPageKey} /> // <-- Gunakan state ini
                        : currentPageKey === 'pixel-thoughts' 
                            ? <PixelThoughts />
                            : currentPageKey === 'affirmation-room' 
                                ? <AffirmationRoom />
                                : currentPageKey === 'secret-room-rezeki' 
                                    ? <SecretRoomRezeki />
                                    : <MainLayout /> // MainLayout adalah default jika tidak ada halaman spesifik
        }
    </AppContext.Provider>
);
};

// Perintah Final untuk merender Aplikasi
ReactDOM.render(<App />, document.getElementById('root'));

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
/* --- CSS UNTUK GAMBAR KUSTOM AFIRMASI (Tidak Full Screen, Dengan Flasher yang Jelas) --- */

.custom-affirmation-image {
    position: fixed; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    
    width: auto; 
    height: auto; 
    max-width: 90vw; 
    max-height: 90vh; 
    object-fit: contain; 
    
    z-index: 0; 
    opacity: 0.4; /* Opasitas default di fase input (sesuaikan jika ingin lebih/kurang terlihat) */
    
    /* Pastikan transisi ini halus saat beralih dari fase input ke raining */
    transition: all 1s ease-in-out; 
}

/* Gaya untuk gambar saat di fase 'raining' (dengan zoom, fade, dan flasher) */
.custom-affirmation-image.image-zoom-fade {
    /* Properti dasar untuk fase raining */
    transform: translate(-50%, -50%) scale(0.95); /* Sedikit zoom out */
    opacity: 0.1; /* Opasitas dasar saat raining, akan di-override oleh animasi */
    
    /* Animasi kilatan (flasher) */
    /* Pastikan ini adalah animasi flasher yang kamu inginkan */
    animation: imageFlash 7s infinite linear; /* Nama animasi, durasi 7 detik, looping tak terbatas, linear */

    /* Transisi untuk perubahan awal saat masuk ke fase raining. Opacity akan segera dikontrol oleh animasi. */
    transition: max-width 1s ease-in-out, max-height 1s ease-in-out, transform 1s ease-in-out; 
}

/* --- DEFINISI KEYFRAMES UNTUK EFEK KILATAN GAMBAR --- */
@keyframes imageFlash {
    0% {
        opacity: 0.1; /* Mulai dari opasitas dasar yang rendah (sesuai base di image-zoom-fade) */
    }
    /* Flash ke 0.9 selama 1 detik (1/7 dari 7 detik = ~14%) */
    /* Kita bisa buat lebih cepat flashnya */
    0.1% { /* Sangat cepat ke opacity tinggi */
        opacity: 0.9; /* Kilat penuh yang kamu inginkan (tidak 100% agar tidak terlalu silau) */
    }
    1% { /* Kembali ke opasitas dasar dengan cepat */
        opacity: 0.1; /* Kembali ke opasitas dasar */
    }
    100% {
        opacity: 0.1; /* Tetap di opasitas dasar selama sisa siklus (sampai 7 detik) */
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
    max-width: 450px;
    aspect-ratio: 2 / 3; /* Menjaga rasio buku */
    max-height: 85vh
    background-color: #382e28; /* Warna dasar kulit coklat tua */
    background-image: url('icons/Coverijo.png');
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
        box-shadow: 0 60 60px 5px rgba(255, 215, 0, 0.4), inset 0 0 5px rgba(255, 255, 255, 0.5);
    }
    50% {
        /* Di tengah animasi, cahayanya membesar dan sangat terang */
        box-shadow: 0 60 60px 20px rgba(255, 215, 0, 0.9), inset 0 0 15px rgba(255, 255, 255, 0.8);
    }
    100% {
        box-shadow: 0 60 60px 5px rgba(255, 215, 0, 0.4), inset 0 0 5px rgba(255, 255, 255, 0.5);
    }
}
/* --- CSS untuk Lilin dan Efek Cahaya (Diperbaiki) --- */
.candle-container {
    position: relative;
    width: 150px; /* Lebar container, sesuaikan */
    height: 300px; /* Tinggi container, sesuaikan */
    margin: 0 auto;
    /* background-color: transparent; */ /* Pastikan transparent, atau hapus jika tidak perlu */
    box-shadow: none; /* HAPUS SEMUA SHADOW DARI CONTAINER INI */
    transition: all 0.5s ease-in-out;
    display: flex;
    flex-direction: column; /* Mengatur elemen di dalamnya secara kolom */
    align-items: center; /* Pusatkan secara horizontal */
    justify-content: flex-end; /* Posisikan elemen ke bawah */
    overflow: hidden;
}

.candle-container.lit {
    /* box-shadow: 0 0 20px 5px rgba(255, 255, 0, 0.5), 0 0 30px 10px rgba(255, 200, 0, 0.3); */
    /* Hapus dari sini, kita akan coba letakkan di candle-light-overlay atau di flame */
}

.candle-image {
    position: absolute;
    bottom: 0; /* Pastikan gambar lilin ada di dasar container */
    width: 100%; /* Gambar mengisi lebar container lilin */
    height: auto; /* Jaga aspek rasio */
    max-height: 200px; /* Batasi tinggi gambar lilin agar ada ruang untuk api di atas */
    object-fit: contain; /* Memastikan gambar pas di dalam tanpa terpotong */
    display: block;
    z-index: 1; /* Di bawah nyala api */
}
   
 

.flame {
    position: absolute;
    /* Posisi 'top' ini yang paling krusial untuk menempelkan api ke sumbu */
    /* Sesuaikan nilai 'px' ini berdasarkan hasil ujimu */
    top: 90px; /* Contoh nilai, kamu mungkin perlu MENYESUAIKAN ini! */ 
    /* Misal: coba 40px, 20px, 50px, sampai pas */

    left: 50%;
    transform: translateX(-50%);
    width: 40px; /* Sesuaikan lebar api agar proporsional dengan gambar lilin */
    height: 80px; /* Sesuaikan tinggi api */
    background: radial-gradient(circle at center, #ffeb3b 0%, #ffc107 50%, transparent 80%);
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    filter: blur(8px); /* Blur lebih banyak agar lebih menyatu dan efek glow */
    box-shadow: 
        0 0 10px 5px rgba(255, 235, 59, 0.7), /* Kuning terang, blur kecil */
        0 0 20px 10px rgba(255, 193, 7, 0.5), /* Kuning lebih gelap, blur sedang */
        0 0 40px 15px rgba(255, 159, 0, 0.3); /* Oranye, blur besar */
    opacity: 0; /* Awalnya tidak terlihat */
    animation: fadeInFlame 1s forwards; /* Animasi muncul */
    z-index: 2; /* Pastikan api di atas gambar lilin */
}

.candle-container.lit .flame {
    opacity: 1; /* Terlihat saat lilin menyala */
}

@keyframes fadeInFlame {
    from { opacity: 0; transform: translateX(-50%) scale(0.5); }
    to { opacity: 1; transform: translateX(-50%) scale(1); }
}

.animate-flicker {
    animation: flicker 1.5s ease-in-out infinite alternate;
}

@keyframes flicker {
    0% { transform: translateX(-50%) scale(1) rotate(-1deg); opacity: 1; filter: blur(2px); }
    25% { transform: translateX(-50%) scale(0.98) rotate(1deg); opacity: 0.95; filter: blur(1.8px); }
    50% { transform: translateX(-50%) scale(1.02) rotate(-0.5deg); opacity: 1; filter: blur(2.2px); }
    75% { transform: translateX(-50%) scale(0.99) rotate(0.5deg); opacity: 0.97; filter: blur(1.9px); }
    100% { transform: translateX(-50%) scale(1) rotate(-1deg); opacity: 1; filter: blur(2px); }
}

.candle-light-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 70%, rgba(255, 200, 0, 0.1) 0%, transparent 70%);
    pointer-events: none;
    z-index: 5; /* Di atas starfield tapi di bawah konten */
    animation: pulseLight 3s infinite alternate;
}

@keyframes pulseLight {
    0% { opacity: 0.8; }
    50% { opacity: 1; }
    100% { opacity: 0.8; }
}
/* --- New Golden Background Class --- */
.golden-background {
    background: linear-gradient(to right, #DAA520, #FFD700, #DAA520); /* Gold gradient */
    color: #4B3B00 !important; /* Dark brown text for contrast */
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5); /* Light shadow for readability */
    border: 2px solid #DAA520;
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
}

.golden-background:hover {
    background: linear-gradient(to right, #FFD700, #DAA520, #FFD700);
    box-shadow: 0 6px 20px rgba(255, 215, 0, 0.6);
    transform: scale(1.02);
}
/* --- CSS untuk Kotak Rangkuman Hijau di Bab 16 --- */
.summary-green-box {
    background-color: #34d399; /* Hijau Zamrud */
    color: #ffffff; /* Teks putih */
    padding: 1.5rem; /* Padding di dalam kotak */
    border-radius: 1.5rem; /* Sudut membulat (rounded-3xl) */
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* Bayangan */
    margin-top: 2.5rem; /* Margin atas agar terpisah dari teks sebelumnya */
    margin-bottom: 2.5rem; /* Margin bawah */
    font-weight: bold; /* Teks tebal */
    text-align: center; /* Teks di tengah */
    line-height: 1.75; /* Spasi baris agar mudah dibaca */
}
.triangle-container {
    position: relative;
    width: 100%; /* Wadah agar segitiga bisa responsif */
    height: 200px; /* Tinggi wadah untuk segitiga, sesuaikan jika perlu */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
}
.triangle-shape {
    width: 0;
    height: 0;
    border-left: 300px solid transparent; /* Setengah lebar segitiga */
    border-right: 300px solid transparent; /* Setengah lebar segitiga */
    border-bottom: 200px solid #FFD700; /* Warna dan tinggi segitiga */
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%); /* Pusatkan segitiga */
    filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5)); /* Sedikit bayangan */
}

.triangle-text {
    position: absolute;
    /* Sesuaikan posisi teks agar pas di tengah-tengah bentuk segitiga */
    top: calc(50% + 20px); /* Geser sedikit ke bawah dari tengah wadah */
    left: 50%;
    transform: translate(-50%, -50%); /* Memusatkan teks di dalam wadah */
    
    width: 80%; /* Batasi lebar teks agar tidak keluar dari segitiga */
    color: #4B3B00; /* Warna teks gelap agar kontras dengan emas */
    font-weight: bold;
    text-align: center;
    line-height: 1.4; /* Spasi baris */
    font-size: 0.9rem; /* Ukuran font, sesuaikan agar pas */
    z-index: 1; /* Pastikan teks di atas segitiga */
}

.triangle-text p {
    margin-bottom: 0.2rem; /* Spasi antar baris paragraf dalam segitiga */
}


/* --- CSS untuk Doa LoA Codex (Gambar Latar Belakang & Teks Scrollable) --- */
.doa-background-image {
    position: fixed; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    
    min-width: 100vw; 
    min-height: 100vh; 
    width: auto;
    height: auto;
    object-fit: cover; 
    
    z-index: 0; 
    opacity: 0.2; 
    transition: opacity 0.5s ease-in-out; 
}

/* --- CSS untuk Gambar Dinamis Per Doa di Fase 'playing' --- */
.playing-phase-dynamic-image {
    position: fixed; /* Gambar ini akan mengisi seluruh viewport */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Pusatkan */
    
    width: 100vw; 
    height: 100vh; 
    object-fit: contain; /* Gambar akan utuh di dalam, dengan bar hitam jika rasio tidak pas */
    background-color: black; /* Latar belakang hitam untuk bar yang tidak terisi gambar */
    
    z-index: 0; /* KOREKSI: Ini sekarang di lapisan PALING BELAKANG (di bawah semuanya) */
    opacity: 1; /* Gambar terlihat penuh, tidak transparan */
    transition: opacity 0.5s ease-in-out; 
}

/* --- CSS untuk Kotak Konten (Judul, Icon, Pesan) di Fase Playing --- */
/* KOREKSI: KELAS INI SEKARANG DIHAPUS DARI JSX, TIDAK ADA LAGI KOTAK DI TENGAH */
/* Karena kamu ingin LATAR BELAKANG GAMBAR CLEAN dan tidak ada overlay */
/* Jika kamu ingin KONTEN (teks/icon) tampil di tengah, tapi tanpa kotak background,
   maka kita perlu mengatur positioning mereka secara terpisah di atas gambar */
/* Untuk saat ini, saya akan SEMBUNYIKAN KELAS INI (display: none)
   karena JSX untuk renderPlayingPhase sudah saya modifikasi untuk tidak merendernya. */
.playing-phase-content-overlay {
    display: none; /* KOREKSI: Sembunyikan sepenuhnya */
}


/* --- CSS untuk Pop-up Premis (Sederhana & Elegan Seperti Reminder) --- */
.popup-animate-in {
    position: fixed; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1); 
    z-index: 60; 
    
    width: 90%; 
    max-width: 400px; 
    
    background-color: #3f3f46; 
    color: #ffffff;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
    text-align: center; 

    animation: fadeInScaleUp 0.5s ease-out forwards; 
}
@keyframes fadeInScaleUp {
    from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9); 
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

`;
document.head.appendChild(style);
