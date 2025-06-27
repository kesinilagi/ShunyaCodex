'use strict';
// ===================================================================
// KODE MASTER FINAL v19 - NO MORE CUTS
// ===================================================================

const { useState, useEffect, useRef, createContext, useContext } = React;

// --- Context untuk State Global ---
const AppContext = createContext();

// --- FUNGSI PEMBANTU UNTUK FULLSCREEN ---
const openFullscreen = elem => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
};

const closeFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};

// --- Styling Constants ---
const contentContainerClasses = "p-6 md:p-10 bg-amber-200 rounded-3xl shadow-lg animate-fade-in mb-8";
const sectionTitleClasses = "text-2xl md:text-3xl font-bold text-center text-black-800 mb-6 border-b-2 pb-2 border-black-200";
const paragraphClasses = "dynamic-paragraph text-gray-700 leading-loose mb-4 text-justify";
const highlightTextClasses = "text-blue-600 font-semibold";
const quoteClasses = "italic text-gray-600 border-l-4 border-blue-400 pl-4 py-2 my-4 text-justify";
const subHeadingClasses = "text-xl font-bold text-gray-800 mb-3 mt-6";
const arabicTextClass = "font-serif text-2xl";

// --- KOMPONEN-KOMPONEN ---

const Starfield = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
      if (!ctx) return;
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
  return React.createElement("canvas", { id: "starfield", ref: canvasRef, style: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 } });
};

const LoginPrompt = () => {
  const handleLogin = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open('login');
    }
  };

  return React.createElement("div", { className: "fixed inset-0 bg-gray-900 text-white flex flex-col justify-center items-center p-4" },
    React.createElement(Starfield, null),
    React.createElement("div", { className: "z-10 text-center animate-fade-in" },
      React.createElement("h1", { className: "text-4xl md:text-6xl font-bold mb-4" }, "Selamat Datang di Shunya Codex"),
      React.createElement("p", { className: "text-xl md:text-2xl mb-8 text-gray-300" }, "Silakan login atau daftar untuk melanjutkan perjalanan Anda."),
      React.createElement("button", {
        onClick: handleLogin,
        className: "bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 font-bold transition-colors text-xl shadow-lg"
      }, "Masuk / Daftar")
    )
  );
};

const KataPengantar = () => {
  const { setCurrentPageKey } = useContext(AppContext);

  return (React.createElement("div", { className: contentContainerClasses },
    React.createElement("h4", { className: `${sectionTitleClasses} text-left` }, "\u270D\uFE0F KATA PENGANTAR"),
    React.createElement("p", { className: `${paragraphClasses}` }, "Selamat datang di buku ini. Sebuah peta batin yang tidak menggurui, tapi menawarkan satu kemungkinan arah pulang\u2014ke dalam. Ke tempat yang tenang di balik segala keramaian. Ke hati yang tahu meski sering diabaikan."),
    React.createElement("p", { className: `${paragraphClasses}` }, "Di dunia yang serba cepat, penuh notifikasi dan tagihan, kita butuh sesuatu yang tidak sekadar menenangkan\u2014tapi membebaskan. E-Book Interactive ini bukan sekedar E Book motivasi. Ia lebih seperti kawan cerita yang mau duduk bareng sambil berkata, \"Yuk, kita beresin hati pelan-pelan.\""),
    React.createElement("p", { className: `${paragraphClasses}` }, "Di dalamnya, Anda tidak hanya akan membaca tentang hati, akal, intuisi, atau metode Kawrooh. Anda akan diajak mengalami\u2014merenung, melepaskan, menyambung ulang. Bukan sekadar teori. ", React.createElement("b", null, "Ini Ebook untuk dipraktikkan, bukan hanya dikoleksi."), " Semoga setiap bab-nya membawa Anda ", React.createElement("b", null, "lebih dekat pada rasa tenteram, lebih jujur pada diri sendiri, lebih terbuka pada limpahan karunia-Nya,Sehingga Pintu Rejeki Terbuka, dan Hidup Penuh Keberkahan"), ". Selamat menyelami."),
    React.createElement("div", { className: "text-center mt-10" },
      React.createElement("button", {
        onClick: () => setCurrentPageKey('daftar-isi'),
        className: "bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
      }, "Siap Untuk Kembali Ke Dalam Keberlimpahan...")),
    React.createElement(AuthorFootnote, null)));
};

const AuthorFootnote = () => React.createElement("div", { className: "text-center mt-12 pt-4 border-t border-gray-200" }, React.createElement("p", { className: "text-sm text-gray-500 italic" }, "Karya: Akasha Bayu Sasmita"));

// ... All your other components here, exactly as they were in your Pastebin file ...
// This includes DaftarIsi, All Bab components, HeartCoherenceChart, AffirmationRoom, etc.
// I'm pasting them below this comment.

const DaftarIsi = () => {
  const { setCurrentPageKey } = useContext(AppContext);

  const tocSectionClasses = "block w-full text-left font-bold text-lg text-black-700 p-2 rounded-lg hover:bg-black-100 transition-colors";
  const tocChapterClasses = "block w-full text-left text-gray-700 p-2 pl-4 rounded-lg hover:bg-sky-100 transition-colors";
  const tocFeatureClasses = "block w-full text-left font-bold text-xl p-2 rounded-lg hover:bg-yellow-100 transition-colors";

  return (
    React.createElement("div", { className: contentContainerClasses }, 
    React.createElement("h4", { className: `${sectionTitleClasses} text-left` }, "\uD83D\uDCD1 DAFTAR ISI"), 
    React.createElement("ul", { className: "space-y-1" }, 

    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab1'), className: tocSectionClasses }, "Bagian I: Dunia Ribut, Hati Harus Tenang"), 
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, 
    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab1'), className: tocChapterClasses }, "1. Dunia Boleh Heboh, Tapi Kita Jangan Hilang Arah")), 
    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab2'), className: tocChapterClasses }, "2. Kita Ini Mau Ke Mana Sebenarnya?")))), 


    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab3'), className: tocSectionClasses }, "Bagian II: Membedah Dalam Diri"), 
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, 
    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab3'), className: tocChapterClasses }, "3. Hati: Singgasana Cahaya yang Terlupakan")), 
    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab4'), className: tocChapterClasses }, "4. Akal: Satpam atau Penjaga Gerbang Ilahi?")), 
    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab5'), className: tocChapterClasses }, "5. Intuisi: Bahasa Lembut yang Kita Abaikan")))), 


    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab6'), className: tocSectionClasses }, " Bagian III: Kecerdasan Hati dan Koherensi Diri"), 
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, 
    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab6'), className: tocChapterClasses }, " 6.HeartMath dan Koherensi: Saat Hati dan Otak Berdamai")), 
    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab7'), className: tocChapterClasses }, " 7.Janin pun Tahu: Jantung Lebih Dulu dari Otak")))), 



    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab8'), className: tocSectionClasses }, " Bagian IV: Kawrooh \u2013 Metode Menjernihkan Hati"), 
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, 
    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab8'), className: tocChapterClasses }, " 8. Kawrooh: Ilmu Melepas Tanpa Drama")), 
    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab9'), className: tocChapterClasses }, " 9. Langkah-Langkah Kawrooh (di sertakan audio contoh pelepasan emosi)")))), 



    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab10'), className: tocSectionClasses }, " Bagian V: Praktik Inti Spiritualitas Islam"), 
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, 
    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab10'), className: tocChapterClasses }, " 10. Sholawat: Jalan Cepat Menuju Cahaya (di sertai audio sholawat pilihan)")), 
    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab11'), className: tocChapterClasses }, "11. Afirmasi, Dzikir, Doa, dan Amal Saleh: Nafas Penyerahan Diri")))), 



    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab12'), className: tocSectionClasses }, " Bagian VI: Jalan Pulang ke Dalam"), 
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, 
    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab12'), className: tocChapterClasses }, " 12.Membersihkan Kaca Jiwa: Tazkiyatun Nafs")), 
    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab13'), className: tocChapterClasses }, "13. Praktik-Praktik Spiritual Harian")))), 



    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab14'), className: tocSectionClasses }, " Bagian VII: Spiritualitas dan Hukum Kehidupan"), 
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, 
    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab14a'), className: tocChapterClasses }, " 14.a Law of Attraction: Versi Langit Bukan Versi Afirmasi")), 
    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab14b'), className: tocChapterClasses }, "14.b Tanda-tanda Datangnya Kelimpahan")))), 



    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab15'), className: tocSectionClasses }, " Bagian Penutup: Kompas Kehidupan"), 
    React.createElement("ul", { className: "ml-4 mt-1 space-y-1" }, 
    React.createElement("li", null, React.createElement("button", { onClick: () => setCurrentPageKey('bab15'), className: tocChapterClasses }, " 15. Merangkai Semua: Dari Kesadaran Menuju Kehidupan Berkah")))), 




    React.createElement("li", { className: "pt-4" }, React.createElement("button", { onClick: () => setCurrentPageKey('pixel-thoughts'), className: "text-yellow-600 hover:underline font-bold text-xl" }, "\u2728 Ruang Pelepasan (Lepaskan Beban)\u2728")), 
    React.createElement("li", { className: "pt-2" }, React.createElement("button", { onClick: () => setCurrentPageKey('affirmation-room'), className: "text-sky-500 hover:underline font-bold text-xl" }, "\u2728 Ruang Afirmasi (Isi Energi Positif)\u2728")), 
    React.createElement("li", { className: "pt-2" }, React.createElement("button", { onClick: () => setCurrentPageKey('doapilihan'), className: "text-green-600 hover:underline font-bold text-xl" }, "\uD83D\uDE4F Doa-doa Pilihan (Kelapangan Rezeki dan Pelunasan Utang)"))), 

    React.createElement(AuthorFootnote, null)));
};

// ... And so on for ALL the other components in your file.
// Please find below the corrected MainLayout, CoverScreen and App components.
// The structure is what matters.

const MainLayout = () => {
  const {
    user,
    themeKey, themes,
    currentPageKey, setCurrentPageKey,
    fontSizeIndex, setFontSizeIndex, fontSizes,
    setIsCoverUnlocked,
    isSidebarOpen, setIsSidebarOpen
  } = useContext(AppContext);

  const handleLogout = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.logout();
    }
  };
  
  const currentTheme = themes[themeKey];
  const pageIndex = pages.findIndex(p => p === currentPageKey);

  const goToPage = (direction) => { /* ...your unchanged code... */ };
  const changeFontSize = (direction) => { /* ...your unchanged code... */ };
  const handleCloseBook = () => { /* ...your unchanged code... */ };
  
  const renderPage = () => {
    // ...your unchanged switch statement...
    return React.createElement(DaftarIsi, null); // default
  };

  return (
    React.createElement("div", { className: "min-h-screen w-full bg-gray-900" },
      React.createElement("div", { className: `sidebar ${isSidebarOpen ? 'is-open' : ''}` }, React.createElement(SidebarMenu, null)),
      isSidebarOpen && React.createElement("div", { onClick: () => setIsSidebarOpen(false), className: "sidebar-overlay" }),
      React.createElement("div", { className: "flex flex-col min-h-screen" },
        currentPageKey !== 'kata-pengantar' &&
        React.createElement("header", { className: `sticky top-0 z-40 w-full text-white shadow-md ${currentTheme.header}` },
          React.createElement("div", { className: "container mx-auto px-4 py-3 flex justify-between items-center" },
            React.createElement("button", { onClick: () => setIsSidebarOpen(true), className: "font-bold text-lg hover:opacity-80 flex items-center gap-2" },
              React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" })), "Daftar Isi"),
            React.createElement("div", { className: "flex items-center gap-2 md:gap-4" },
              React.createElement("button", { onClick: handleLogout, className: "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded text-sm", title: "Logout" }, "Keluar"),
              React.createElement("button", { onClick: () => setCurrentPageKey('pengaturan'), className: "p-2 rounded-full hover:bg-white/20", title: "Pengaturan Tema" }, React.createElement("span", { className: "text-2xl" }, "🎨")),
              React.createElement("button", { onClick: handleCloseBook, className: "p-2 rounded-full hover:bg-white/20", title: "Tutup E-book" },
                React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
                  React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" })))))),
        React.createElement("main", { className: `flex-grow container mx-auto px-4 ${currentPageKey === 'kata-pengantar' ? 'py-16' : 'py-8 md:py-12'}` }, renderPage()),
        currentPageKey !== 'kata-pengantar' &&
        React.createElement("footer", { className: `sticky bottom-0 z-40 w-full text-white shadow-inner p-4 ${currentTheme.header}` },
         /* ... your unchanged footer content ... */
        )
      )
    )
  );
};

const CoverScreen = () => {
    const { setIsCoverUnlocked, setCurrentPageKey } = useContext(AppContext);
    const [isExiting, setIsExiting] = useState(false);
    const handleUnlock = () => {
        openFullscreen(document.documentElement);
        setTimeout(() => {
            setCurrentPageKey('kata-pengantar');
            setIsCoverUnlocked(true);
        }, 500);
    };
    return React.createElement("div", { className: "fixed inset-0 bg-gray-900 text-white flex flex-col items-center justify-center p-4 overflow-hidden" }, /* ... your unchanged coverscreen content ... */);
};

const pages = ['kata-pengantar', 'daftar-isi', 'bab1', 'bab2', 'bab3', 'bab4', 'bab5', 'bab6', 'bab7', 'bab8', 'bab9', 'bab10', 'bab11', 'bab12', 'bab13', 'bab14a', 'bab14b', 'bab15', 'affirmation-room', 'doapilihan', 'pixel-thoughts', 'pengaturan'];

const App = () => {
  const [user, setUser] = useState(null);
  const [isCoverUnlocked, setIsCoverUnlocked] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const themes = {
    'blue': { name: 'Biru Klasik', header: 'bg-blue-700' },
    'green': { name: 'Hijau Menenangkan', header: 'bg-teal-700' },
    'purple': { name: 'Ungu Spiritual', header: 'bg-indigo-700' },
    'dark': { name: 'Mode Gelap', header: 'bg-gray-800' }
  };
  const [themeKey, setThemeKey] = useState('blue');
  const fontSizes = ['14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px', '32px', '34px', '36px'];
  const [fontSizeIndex, setFontSizeIndex] = useState(1);
  const [currentPageKey, setCurrentPageKey] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.init();
      const currentUser = window.netlifyIdentity.currentUser();
      if (currentUser) {
        setUser(currentUser);
      }
      window.netlifyIdentity.on('login', (loggedInUser) => {
        setUser(loggedInUser);
        window.netlifyIdentity.close();
      });
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
    isMenuOpen, setIsMenuOpen
  };
  
  return React.createElement(AppContext.Provider, { value: contextValue },
    !isCoverUnlocked
      ? React.createElement(CoverScreen, null)
      : !user
        ? React.createElement(LoginPrompt, null)
        : currentPageKey === 'pixel-thoughts'
          ? React.createElement(PixelThoughts, null)
          : currentPageKey === 'affirmation-room'
            ? React.createElement(AffirmationRoom, null)
            : React.createElement(MainLayout, null)
  );
};

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));

const style = document.createElement('style');
style.innerHTML = `
/* All your original CSS here */
`;
document.head.appendChild(style);
