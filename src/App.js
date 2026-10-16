import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const quotesList = [
  { text: "„Четенето е единственият начин, по който неусетно, а често и безпомощно, се промъкваме в чужда кожа, чужд глас, чужда душа.“", author: "Джойс Карол Оутс" },
  { text: "„Стая без книги е като тяло без душа.“", author: "Марк Тулий Цицерон" },
  { text: "„Винаги съм си представял, че Раят ще бъде някакъв вид библиотека.“", author: "Хорхе Луис Борхес" },
  { text: "„Книгата е мечта, която държиш в ръцете си.“", author: "Нийл Геймън" },
  { text: "„Четящият живее хиляди животи, преди да умре. Този, който не чете, живее само един.“", author: "Джордж Р. Р. Мартин" }
];

const bookFortunesList = [
  { text: "„Ще те обичам с всяко едно от моите хиляда сърца, до края на времето.“", book: "Хиляда целувки и едно момче", author: "Тили Коул" },
  { text: "„Понеже луната никога не е сама. Тя винаги има звездите около себе си.“", book: "Хиляда целувки и едно момче", author: "Тили Коул" },
  { text: "„Дори в най-тъмните дни, светлината на нашата обич няма да угасне.“", book: "Хиляда пръснати късчета", author: "Тили Коул" },
  { text: "„Събирам всяко пръснато късче от душата си и ти я давам.“", book: "Хиляда пръснати късчета", author: "Тили Коул" },
  { text: "„За звездите, които ни слушат, и за мечтите, които се сбъдват.“", book: "Кралство от шипове и рози", author: "Сара Дж. Маас" },
  { text: "„Ще те намеря във всяко следващо прераждане.“", book: "Divine Rivals", author: "Ребека Рос" },
  { text: "„Болката е неизбежна, но страданието е избор.“", book: "Лов на Аделин", author: "Х. Д. Карлтън" },
  { text: "„Ти си моят дом, независимо къде се намираме.“", book: "Fourth Wing", author: "Ребека Ярос" }
];

const globalDatabaseBooks = [
  { title: "The Fabric of Our Souls", author: "K. M. Moronova", totalPages: 344, bg: "#3a151b", accent: "#d1a153" },
  { title: "Divine Rivals", author: "Rebecca Ross", totalPages: 350, bg: "#1f2a3a", accent: "#c5d1e8" },
  { title: "Hunting Adeline", author: "H. D. Carlton", totalPages: 450, bg: "#141414", accent: "#b82323" },
  { title: "Does It Hurt?", author: "H. D. Carlton", totalPages: 380, bg: "#2a1f3a", accent: "#d4a3d8" },
  { title: "Fourth Wing", author: "Rebecca Yarros", totalPages: 528, bg: "#3a2a14", accent: "#e8c58b" },
  { title: "Atomic Habits", author: "James Clear", totalPages: 320, bg: "#143a28", accent: "#8be8b2" }
];

const themesList = [
  { id: 'classic', name: 'Classic', desc: 'Кремаво и цвят на кръв през деня, тъмна академия нощем.', bg: '#181210', cardBg: '#251b17', text: '#f5e8d7', accent: '#d1a153', border: '#3d2c26' },
  { id: 'white', name: 'White', desc: 'Чиста бяла хартия и черно мастило.', bg: '#f4f4f4', cardBg: '#ffffff', text: '#1a1a1a', accent: '#333333', border: '#dcdcdc' },
  { id: 'midnight', name: 'Midnight', desc: 'Истинско черно за OLED екрани.', bg: '#0b0b0f', cardBg: '#15151c', text: '#e0e0e0', accent: '#7b68ee', border: '#262636' },
  { id: 'rose', name: 'Rose Court', desc: 'Розова хартия, сливено мастило и злато.', bg: '#2b1d22', cardBg: '#3d2830', text: '#fce4ec', accent: '#d4af37', border: '#573743' },
  { id: 'moonlit', name: 'Moonlit', desc: 'Дълбоко виолетово и лунна светлина.', bg: '#181624', cardBg: '#242136', text: '#e2e0ff', accent: '#9575cd', border: '#383254' },
  { id: 'berry', name: 'Berry Matcha', desc: 'Матча крем и ягодово червено.', bg: '#1c241e', cardBg: '#28362c', text: '#e8f0eb', accent: '#c62828', border: '#3a4f3e' },
  { id: 'ice', name: 'Ice Rink', desc: 'Ледено бяло и пързалково синьо.', bg: '#151c24', cardBg: '#1f2a38', text: '#e3f2fd', accent: '#64b5f6', border: '#2c3d52' },
  { id: 'reading', name: 'Reading Room', desc: 'Пергамент, зелено от библиотека и месинг.', bg: '#142018', cardBg: '#1e3024', text: '#e8f5e9', accent: '#b58536', border: '#2b4434' },
  { id: 'seaside', name: 'Seaside', desc: 'Пясък, морско синьо и корал.', bg: '#1f2424', cardBg: '#2c3333', text: '#f0f4f4', accent: '#ff7043', border: '#3d4949' },
  { id: 'harvest', name: 'Harvest', desc: 'Тиква, кехлибар и мъх след залез.', bg: '#241a14', cardBg: '#36271e', text: '#fbe9e7', accent: '#ffb74d', border: '#4f382a' },
  { id: 'evergreen', name: 'Evergreen', desc: 'Борово зелено, червена боровинка и злато.', bg: '#11221c', cardBg: '#19332b', text: '#e0f2f1', accent: '#d4af37', border: '#264d40' },
  { id: 'witching', name: 'Witching Hour', desc: 'Черно виолетово, тиква и злато от свещ.', bg: '#171321', cardBg: '#231d30', text: '#ede7f6', accent: '#ffa726', border: '#362c4a' },
  { id: 'christmas', name: 'Christmas', desc: 'Внено червено, борово зелено и злато.', bg: '#241316', cardBg: '#361d21', text: '#ffebee', accent: '#d4af37', border: '#4f2a30' },
  { id: 'maple', name: 'Maple', desc: 'Овесена хартия, ръждиво оранжево и кестен.', bg: '#261e17', cardBg: '#382c22', text: '#efebe9', accent: '#d84315', border: '#4f3d2f' },
  { id: 'wisteria', name: 'Wisteria', desc: 'Люлякова хартия, глициниево виолетово и градински чай.', bg: '#201c26', cardBg: '#2f293b', text: '#f3e5f5', accent: '#9575cd', border: '#453c56' },
  { id: 'golden', name: 'Golden Hour', desc: 'Бледо злато, старо злато и бръшлянено зелено.', bg: '#242217', cardBg: '#363321', text: '#fef7e0', accent: '#81c784', border: '#4f4a30' },
  { id: 'valentine', name: 'Valentine', desc: 'Розово, карминено и зелено листо.', bg: '#26181c', cardBg: '#382329', text: '#fce4ec', accent: '#e91e63', border: '#52333c' },
  { id: 'sakura', name: 'Sakura', desc: 'Сливово черно, цвят сакура и фенерен кехлибар.', bg: '#211421', cardBg: '#301d30', text: '#f3e5f5', accent: '#ffb74d', border: '#472a47' }
];

const animationsList = [
  { id: 'classic', name: 'Classic', desc: 'Класическо плавно отваряне на приложението.' },
  { id: 'fade', name: 'Fade In', desc: 'Меко затъмняване и поява на екрана.' },
  { id: 'slide', name: 'Slide Up', desc: 'Плъзгане на началния екран отдолу нагоре.' },
  { id: 'zoom', name: 'Zoom Book', desc: 'Разтваряне като страници на книга.' },
  { id: 'bounce', name: 'Bounce', desc: 'Леко подскачане при зареждане.' }
];

const widgetsList = [
  { id: 'streak', title: 'Reading streak', subtitle: 'STREAK • Best: 52', type: 'streak' },
  { id: 'now', title: 'Reading now', subtitle: 'J • 148 / 320', type: 'now' },
  { id: 'today', title: 'Today', subtitle: '18 of 30 min • 24 pages', type: 'today' },
  { id: 'challenge', title: 'Reading challenge', subtitle: '2026 CHALLENGE • 10 of 25 books', type: 'challenge' },
  { id: 'toread', title: 'To be read', subtitle: 'TO BE READ • 12 books', type: 'toread' },
  { id: 'upnext', title: 'Up next', subtitle: 'UP NEXT • 4 books', type: 'upnext' }
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');
  const [timerRunning, setTimerRunning] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(1125);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  
  const [profileSubScreen, setProfileSubScreen] = useState(null);
  const [currentThemeId, setCurrentThemeId] = useState('classic');
  const [currentAnimationId, setCurrentAnimationId] = useState('classic');
  const [activeWidgets, setActiveWidgets] = useState(['streak', 'now', 'today', 'challenge']);
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [appLanguage, setAppLanguage] = useState('Български');
  const [userName, setUserName] = useState('Имрен');

  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState('12:30');

  const [defaultFormat, setDefaultFormat] = useState('Физическа');
  
  const [didNotFinishAction, setDidNotFinishAction] = useState('putAway');
  const [isPlayingUnfinishedAnim, setIsPlayingUnfinishedAnim] = useState(false);
  const [animStep, setAnimStep] = useState(0);

  const currentTheme = themesList.find(t => t.id === currentThemeId) || themesList[0];
  const selectedAnimationObj = animationsList.find(a => a.id === currentAnimationId) || animationsList[0];

  const [viewingBookTitle, setViewingBookTitle] = useState(null);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);
  const [isLibraryDropdownOpen, setIsLibraryDropdownOpen] = useState(false);

  const [booksSubTab, setBooksSubTab] = useState('Reading');
  const [statsMode, setStatsMode] = useState('weekly'); 

  const currentYear = new Date().getFullYear();
  const [finishedCountInput, setFinishedCountInput] = useState('1');
  const [yearlyGoal, setYearlyGoal] = useState('12');
  const [userNote, setUserNote] = useState('');

  const [myBooks, setMyBooks] = useState([
    { id: 1, title: "The Fabric of Our Souls", author: "K. M. Moronova", currentPage: 165, totalPages: 344, progress: 48, timeSpent: "2ч", sessions: 4, streak: 1, status: "Чете се в момента", bg: "#3a151b", accent: "#d1a153", displayType: "cover", x: 40, y: 120 },
    { id: 2, title: "Divine Rivals", author: "Rebecca Ross", currentPage: 350, totalPages: 350, progress: 100, timeSpent: "6ч", sessions: 8, streak: 4, status: "Прочетена", bg: "#1f2a3a", accent: "#c5d1e8", displayType: "spine", x: 130, y: 140 },
    { id: 3, title: "Does It Hurt?", author: "H. D. Carlton", currentPage: 0, totalPages: 380, progress: 0, timeSpent: "0ч", sessions: 0, streak: 0, status: "За четене", bg: "#2a1f3a", accent: "#d4a3d8", displayType: "flat", x: 180, y: 220 }
  ]);

  const [statsDays, setStatsDays] = useState({
    'Пон': { pages: 0, book: '' },
    'Вто': { pages: 0, book: '' },
    'Сря': { pages: 0, book: '' },
    'Чет': { pages: 83, book: 'The Fabric of Our Souls' },
    'Пет': { pages: 0, book: '' },
    'Съб': { pages: 0, book: '' },
    'Нед': { pages: 0, book: '' }
  });
  const [selectedStatsDay, setSelectedStatsDay] = useState('Чет');

  const [monthlyPages, setMonthlyPages] = useState(83); 
  const [monthlyPagesArray, setMonthlyPagesArray] = useState({
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 83, 10: 0, 11: 0
  });
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(9);

  const [draggingId, setDraggingId] = useState(null);
  const [relPos, setRelPos] = useState({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const [starRating, setStarRating] = useState(5);
  const [spicyRating, setSpicyRating] = useState(3);
  const [romanceRating, setRomanceRating] = useState(4);

  const viewingBook = myBooks.find(b => b.title === viewingBookTitle) || null;
  const currentBook = myBooks.find(b => b.status === "Чете се в момента") || myBooks[0];

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [reviewText, setReviewText] = useState('');
  const [containsSpoilers, setContainsSpoilers] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300);
    return () => clearTimeout(timer);
  }, [currentAnimationId]);

  const getDailyFortuneQuote = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const index = dayOfYear % bookFortunesList.length;
    return bookFortunesList[index];
  };

  const dailyQuote = getDailyFortuneQuote();

  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleQuoteClick = () => {
    setQuoteIndex((prevIndex) => (prevIndex + 1) % quotesList.length);
  };

  const handleStatusChange = (newStatus) => {
    if (!viewingBook) return;
    const updated = myBooks.map(b => {
      if (b.title === viewingBook.title) {
        return {
          ...b,
          status: newStatus,
          progress: newStatus === "Прочетена" ? 100 : b.progress,
          currentPage: newStatus === "Прочетена" ? b.totalPages : b.currentPage
        };
      }
      return b;
    });
    setMyBooks(updated);
    setIsStatusDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      const filtered = globalDatabaseBooks.filter(b => 
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  const handleAddBookFromSearch = (bookData) => {
    const types = ["cover", "spine", "flat"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const newBook = {
      id: Date.now(),
      title: bookData.title,
      author: bookData.author,
      currentPage: 0,
      totalPages: bookData.totalPages,
      progress: 0,
      timeSpent: "0ч",
      sessions: 0,
      streak: 0,
      status: "Чете се в момента",
      bg: bookData.bg,
      accent: bookData.accent,
      displayType: randomType,
      x: 50,
      y: 100
    };
    setMyBooks([newBook, ...myBooks]);
    setActiveModal(null);
    setSearchQuery('');
    setSearchResults([]);
  };

  const onMouseDownBook = (e, book) => {
    setDraggingId(book.id);
    hasMoved.current = false;
    setRelPos({
      x: e.clientX - book.x,
      y: e.clientY - book.y
    });
  };

  const onMouseMove = (e) => {
    if (draggingId === null) return;
    hasMoved.current = true;
    const newX = e.clientX - relPos.x;
    const newY = e.clientY - relPos.y;

    setMyBooks(myBooks.map(b => b.id === draggingId ? { ...b, x: newX, y: newY } : b));
  };

  const onMouseUp = () => {
    setDraggingId(null);
  };

  const handleBookClick = (book) => {
    if (!hasMoved.current) {
      setViewingBookTitle(book.title);
    }
  };

  const triggerUnfinishedAnimation = () => {
    setIsPlayingUnfinishedAnim(true);
    setAnimStep(1);

    if (didNotFinishAction === 'burnIt' && soundEnabled) {
      try {
        const fireAudio = new Audio('https://actions.google.com/sounds/v1/weather/fire_crackle.ogg');
        fireAudio.volume = 0.7;
        fireAudio.play().catch(() => {});
      } catch (e) {}
    }

    setTimeout(() => { setAnimStep(2); }, 1300);
    setTimeout(() => { setAnimStep(3); }, 2600);
    setTimeout(() => { 
      setIsPlayingUnfinishedAnim(false);
      setAnimStep(0);
    }, 3800);
  };

  const filteredBooksList = myBooks.filter(b => {
    if (booksSubTab === 'Reading') return b.status === "Чете се в момента";
    if (booksSubTab === 'ToBeRead') return b.status === "За четене";
    if (booksSubTab === 'All') return true;
    return true;
  });

  const totalWeeklyPages = Object.values(statsDays).reduce((acc, curr) => acc + Number(curr.pages || 0), 0);
  const uniqueBooksThisWeek = [...new Set(Object.values(statsDays).map(d => d.book).filter(b => b !== ''))];
  const weeklyBooksCount = uniqueBooksThisWeek.length;

  const totalYearlyPages = Object.values(monthlyPagesArray).reduce((acc, curr) => acc + Number(curr || 0), 0);
  const monthNames = ['я', 'ф', 'м', 'а', 'м', 'ю', 'ю', 'а', 'с', 'о', 'н', 'д'];
  const fullMonthNames = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'];

  if (isLoading) {
    let animStyle = {};
    if (currentAnimationId === 'fade') animStyle = { animation: 'fadeInAnim 1.2s ease-in-out' };
    else if (currentAnimationId === 'slide') animStyle = { animation: 'slideUpAnim 1.2s cubic-bezier(0.16, 1, 0.3, 1)' };
    else if (currentAnimationId === 'zoom') animStyle = { animation: 'zoomBookAnim 1.2s ease-in-out' };
    else if (currentAnimationId === 'bounce') animStyle = { animation: 'bounceAnim 1.2s infinite' };
    else animStyle = { animation: 'classicAnim 1.2s ease-in-out' };

    return (
      <div style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '20px', overflow: 'hidden' }}>
        <style>
          {`
            @keyframes fadeInAnim { 0% { opacity: 0; } 100% { opacity: 1; } }
            @keyframes slideUpAnim { 0% { transform: translateY(50px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
            @keyframes zoomBookAnim { 0% { transform: scale(0.7); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
            @keyframes bounceAnim { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
            @keyframes classicAnim { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
          `}
        </style>
        <div style={{ ...animStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: currentTheme.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>📖</div>
          <h1 style={{ fontSize: '26px', fontFamily: 'serif', margin: 0, color: currentTheme.text }}>Book App</h1>
          <p style={{ fontSize: '13px', color: currentTheme.accent, fontStyle: 'italic' }}>Твоите истории оживяват...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      {viewingBook ? (
        <div className="book-details-screen" style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}>
          <div className="details-top-bar">
            <button className="icon-back-btn" onClick={() => setViewingBookTitle(null)}>‹</button>
            <div style={{ position: 'relative' }}>
              <button className="icon-menu-btn" onClick={() => setIsTopMenuOpen(!isTopMenuOpen)}>•••</button>
              
              {isTopMenuOpen && (
                <div className="top-dropdown-menu">
                  <div className="top-dropdown-item" onClick={() => { setIsTopMenuOpen(false); setActiveModal('editBook'); }}>
                    ✏️ Редактирай книга
                  </div>
                  <div className="top-dropdown-item remove-item" onClick={() => { 
                    if(window.confirm("Сигурни ли сте, че искате да премахнете тази книга?")) {
                      setMyBooks(myBooks.filter(b => b.title !== viewingBook.title));
                      setViewingBookTitle(null);
                    }
                    setIsTopMenuOpen(false);
                  }}>
                    🗑️ Премахни книга
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="book-cover-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ 
              width: '160px', height: '230px', 
              backgroundColor: viewingBook.bg, 
              border: `2px solid ${viewingBook.accent}`,
              borderRadius: '12px', 
              boxShadow: '0 10px 20px rgba(0,0,0,0.6)', 
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', 
              padding: '16px', boxSizing: 'border-box', textAlign: 'center' 
            }}>
              <span style={{ fontSize: '10px', color: viewingBook.accent, textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'serif' }}>{viewingBook.author}</span>
              <h2 style={{ fontSize: '16px', color: '#fff', fontFamily: 'serif', margin: 0, textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{viewingBook.title}</h2>
              <span style={{ fontSize: '9px', color: '#aaa' }}>★ ★ ★ ★ ★</span>
            </div>
          </div>

          <h2 className="book-detail-title">{viewingBook.title}</h2>
          <p className="book-detail-author">{viewingBook.author}</p>

          <div className="status-dropdown-container">
            <div className="status-pill-btn" onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}>
              📖 {viewingBook.status} ↕
            </div>

            {isStatusDropdownOpen && (
              <div className="status-dropdown-menu">
                <div className="status-dropdown-item" onClick={() => handleStatusChange("За четене")}>📖 За четене</div>
                <div className="status-dropdown-item" onClick={() => handleStatusChange("Чете се в момента")}>📖 Чете се в момента</div>
                <div className="status-dropdown-item" onClick={() => handleStatusChange("Прочетена")}>✓ Прочетена</div>
                <div className="status-dropdown-item" onClick={() => handleStatusChange("Паузирана")}>⏸ Паузирана</div>
                <div className="status-dropdown-item" onClick={() => handleStatusChange("Не е завършена")}>✕ Не е завършена</div>
              </div>
            )}
          </div>

          <div className="details-progress-bar-bg">
            <div className="details-progress-bar-fill" style={{ width: `${viewingBook.progress}%` }}></div>
          </div>
          <p className="details-page-stats">{viewingBook.progress}% · {viewingBook.currentPage} / {viewingBook.totalPages} стр.</p>

          <div className="book-stats-triple-card" style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}>
            <div className="stat-col">
              <span className="stat-icon">🔥</span>
              <strong>{viewingBook.streak}</strong>
              <p>дни по ред</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-col">
              <span className="stat-icon">⏱️</span>
              <strong>{viewingBook.timeSpent}</strong>
              <p>с тази книга</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-col">
              <span className="stat-icon">📖</span>
              <strong>{viewingBook.sessions}</strong>
              <p>сесии</p>
            </div>
          </div>

          <div className="your-review-box" style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}>
            <div className="review-box-header">ТВОЕТО РЕВЮ</div>
            <textarea 
              className="review-textarea"
              placeholder="Какво мислиш за книгата? ✏️"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <div className="spoiler-toggle-row">
              <label className="spoiler-checkbox">
                <input 
                  type="checkbox" 
                  checked={containsSpoilers}
                  onChange={(e) => setContainsSpoilers(e.target.checked)}
                />
                <span>👁️ Съдържа спойлери</span>
              </label>
            </div>
          </div>
        </div>
      ) : activeTab === 'Library' ? (
        <div style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, minHeight: '100vh', paddingBottom: '80px', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
          
          <div style={{ backgroundColor: currentTheme.cardBg, padding: '16px 20px 12px 20px', borderBottom: `2px solid ${currentTheme.border}`, position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              <div style={{ position: 'relative' }}>
                <button 
                  onClick={() => setIsLibraryDropdownOpen(!isLibraryDropdownOpen)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}
                >
                  <span style={{ fontSize: '18px', fontWeight: '300', fontFamily: 'serif', fontStyle: 'italic', color: currentTheme.text, letterSpacing: '0.5px' }}>Моята библиотека</span>
                  <span style={{ fontSize: '12px', color: currentTheme.accent }}>▾</span>
                </button>

                {isLibraryDropdownOpen && (
                  <div style={{ 
                    position: 'absolute', 
                    top: '36px', 
                    left: 0, 
                    backgroundColor: currentTheme.cardBg, 
                    color: currentTheme.text, 
                    borderRadius: '16px', 
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)', 
                    width: '260px', 
                    zIndex: 100, 
                    padding: '12px',
                    textAlign: 'left',
                    border: `1px solid ${currentTheme.border}`
                  }}>
                    <div style={{ fontSize: '10px', fontWeight: 'bold', color: currentTheme.accent, marginBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>ВАШИТЕ БИБЛИОТЕКИ</div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', background: currentTheme.bg, borderRadius: '10px', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <div style={{ width: '24px', height: '24px', background: currentTheme.accent, borderRadius: '4px' }}></div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Моята библиотека</div>
                          <div style={{ fontSize: '10px', color: currentTheme.text }}>{myBooks.length} книги</div>
                        </div>
                      </div>
                      <span>✓</span>
                    </div>

                    <div style={{ padding: '8px', fontSize: '13px', cursor: 'pointer', color: currentTheme.accent, fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px', borderTop: `1px solid ${currentTheme.border}`, marginTop: '6px', paddingTop: '10px' }} onClick={() => { setIsLibraryDropdownOpen(false); alert('Нова библиотека'); }}>
                      <span>➕</span> Нова библиотека
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setActiveModal('searchBook')} style={{ background: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentTheme.text }}>🔍</button>
                <button onClick={() => setActiveModal('searchBook')} style={{ background: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentTheme.text }}>+</button>
              </div>
            </div>
            <p style={{ fontSize: '11px', color: currentTheme.accent, marginTop: '4px', marginBottom: '0' }}>{myBooks.length} книги (влачи за местене, кликни за детайли)</p>
          </div>

          <div style={{ position: 'relative', height: '420px', width: '100%' }}>
            {myBooks.map((b) => {
              if (b.displayType === "spine") {
                return (
                  <div 
                    key={b.id} 
                    onMouseDown={(e) => onMouseDownBook(e, b)}
                    onClick={() => handleBookClick(b)}
                    style={{ 
                      position: 'absolute', left: `${b.x}px`, top: `${b.y}px`,
                      cursor: 'grab', width: '32px', height: '125px',
                      backgroundColor: b.bg, border: `1px solid ${b.accent}`,
                      borderRadius: '3px', boxShadow: '2px 4px 8px rgba(0,0,0,0.6)',
                      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                      alignItems: 'center', padding: '8px 2px', boxSizing: 'border-box', zIndex: 5
                    }}
                  >
                    <span style={{ fontSize: '7px', color: b.accent, writingMode: 'vertical-rl', transform: 'rotate(180deg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxHeight: '50px' }}>{b.author}</span>
                    <span style={{ fontSize: '8px', fontWeight: 'bold', color: '#fff', writingMode: 'vertical-rl', transform: 'rotate(180deg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxHeight: '60px' }}>{b.title}</span>
                  </div>
                );
              } 
              else if (b.displayType === "flat") {
                return (
                  <div 
                    key={b.id} 
                    onMouseDown={(e) => onMouseDownBook(e, b)}
                    onClick={() => handleBookClick(b)}
                    style={{ 
                      position: 'absolute', left: `${b.x}px`, top: `${b.y}px`,
                      cursor: 'grab', width: '120px', height: '42px',
                      backgroundColor: b.bg, border: `1px solid ${b.accent}`,
                      borderRadius: '4px', boxShadow: '0 6px 12px rgba(0,0,0,0.6)',
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', padding: '6px 10px', boxSizing: 'border-box', zIndex: 5
                    }}
                  >
                    <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</span>
                    <span style={{ fontSize: '7px', color: b.accent }}>📖</span>
                  </div>
                );
              }
              else {
                return (
                  <div 
                    key={b.id} 
                    onMouseDown={(e) => onMouseDownBook(e, b)}
                    onClick={() => handleBookClick(b)}
                    style={{ 
                      position: 'absolute', left: `${b.x}px`, top: `${b.y}px`,
                      cursor: 'grab', width: '75px', height: '120px',
                      backgroundColor: b.bg, border: `1.5px solid ${b.accent}`,
                      borderRadius: '5px', boxShadow: '0 8px 16px rgba(0,0,0,0.6)',
                      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                      padding: '6px 4px', boxSizing: 'border-box', textAlign: 'center', zIndex: 5
                    }}
                  >
                    <span style={{ fontSize: '6px', color: b.accent, textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.author}</span>
                    <span style={{ fontSize: '8px', fontWeight: 'bold', color: '#fff', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{b.title}</span>
                    <span style={{ fontSize: '6px', color: '#aaa' }}>★ 5.0</span>
                  </div>
                );
              }
            })}
          </div>

          <div style={{ position: 'absolute', top: '260px', left: 0, right: 0, height: '22px', background: 'linear-gradient(180deg, #b07d53 0%, #54341b 100%)', borderTop: '3px solid #d19a6d', borderBottom: '2px solid #26160b', zIndex: 1, boxShadow: '0 8px 12px rgba(0,0,0,0.5)' }}></div>
          <div style={{ position: 'absolute', top: '400px', left: 0, right: 0, height: '22px', background: 'linear-gradient(180deg, #b07d53 0%, #54341b 100%)', borderTop: '3px solid #d19a6d', borderBottom: '2px solid #26160b', zIndex: 1, boxShadow: '0 8px 12px rgba(0,0,0,0.5)' }}></div>

        </div>
      ) : activeTab === 'Stats' ? (
        <div style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, minHeight: '100vh', padding: '20px 16px 100px 16px', boxSizing: 'border-box' }}>
          <h1 style={{ fontSize: '24px', fontFamily: 'serif', marginBottom: '16px' }}>Your reading</h1>

          <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', background: currentTheme.cardBg, padding: '6px', borderRadius: '16px', border: `1px solid ${currentTheme.border}` }}>
            <button 
              onClick={() => setStatsMode('weekly')}
              style={{ flex: 1, textAlign: 'center', padding: '8px 4px', fontSize: '11px', borderRadius: '10px', background: statsMode === 'weekly' ? currentTheme.accent : 'transparent', color: statsMode === 'weekly' ? '#fff' : currentTheme.text, fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
            >
              Ежеседмично
            </button>
            <button 
              onClick={() => setStatsMode('monthly')}
              style={{ flex: 1, textAlign: 'center', padding: '8px 4px', fontSize: '11px', borderRadius: '10px', background: statsMode === 'monthly' ? currentTheme.accent : 'transparent', color: statsMode === 'monthly' ? '#fff' : currentTheme.text, fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
            >
              Месечно
            </button>
            <button 
              onClick={() => setStatsMode('yearly')}
              style={{ flex: 1, textAlign: 'center', padding: '8px 4px', fontSize: '11px', borderRadius: '10px', background: statsMode === 'yearly' ? currentTheme.accent : 'transparent', color: statsMode === 'yearly' ? '#fff' : currentTheme.text, fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
            >
              Годишно ({currentYear})
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
            <div style={{ background: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: '12px', padding: '12px' }}>
              <div style={{ fontSize: '22px', fontWeight: 'bold' }}>
                {statsMode === 'weekly' ? totalWeeklyPages : statsMode === 'monthly' ? monthlyPages : totalYearlyPages}
              </div>
              <div style={{ fontSize: '11px', color: currentTheme.accent }}>Pages</div>
            </div>
            <div style={{ background: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: '12px', padding: '12px' }}>
              <div style={{ fontSize: '22px', fontWeight: 'bold' }}>{Math.floor(secondsElapsed / 3600)}h</div>
              <div style={{ fontSize: '11px', color: currentTheme.accent }}>Time</div>
            </div>
            <div style={{ background: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: '12px', padding: '12px' }}>
              <div style={{ fontSize: '22px', fontWeight: 'bold' }}>
                {statsMode === 'weekly' ? uniqueBooksThisWeek.length : statsMode === 'monthly' ? myBooks.filter(b => b.status === "Прочетена").length : finishedCountInput}
              </div>
              <div style={{ fontSize: '11px', color: currentTheme.accent }}>Books</div>
            </div>
          </div>

          {statsMode === 'yearly' && (
            <div style={{ background: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: '16px', padding: '16px', marginBottom: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontFamily: 'serif', fontWeight: 'bold', color: currentTheme.text, marginBottom: '4px' }}>{currentYear}</div>
              <div style={{ fontSize: '11px', color: currentTheme.accent, marginBottom: '20px' }}>+{totalYearlyPages} pages vs {currentYear - 1}</div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '120px', paddingBottom: '10px', borderBottom: `1px solid ${currentTheme.border}`, marginBottom: '8px' }}>
                {monthNames.map((mLabel, idx) => {
                  const pages = monthlyPagesArray[idx] || 0;
                  const heightPx = Math.min(100, Math.max(4, (pages / 300) * 100));
                  const isSelected = selectedMonthIndex === idx;

                  return (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedMonthIndex(idx)}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', flex: 1 }}
                    >
                      <div style={{ 
                        width: '10px', 
                        height: `${heightPx}px`, 
                        backgroundColor: isSelected ? currentTheme.accent : currentTheme.border, 
                        borderRadius: '4px',
                        transition: 'height 0.3s'
                      }}></div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: currentTheme.accent, marginBottom: '16px' }}>
                {monthNames.map((mLabel, idx) => (
                  <span 
                    key={idx} 
                    onClick={() => setSelectedMonthIndex(idx)}
                    style={{ flex: 1, textAlign: 'center', cursor: 'pointer', color: selectedMonthIndex === idx ? currentTheme.text : currentTheme.accent, fontWeight: selectedMonthIndex === idx ? 'bold' : 'normal' }}
                  >
                    {mLabel}
                  </span>
                ))}
              </div>

              <div style={{ background: currentTheme.bg, padding: '12px', borderRadius: '12px', border: `1px solid ${currentTheme.border}`, textAlign: 'left' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: currentTheme.text }}>
                  Редактиране за месец: <span style={{ color: currentTheme.accent }}>{fullMonthNames[selectedMonthIndex]}</span>
                </div>
                <label style={{ fontSize: '11px', color: currentTheme.accent, display: 'block', marginBottom: '4px' }}>Прочетени страници:</label>
                <input 
                  type="number"
                  value={monthlyPagesArray[selectedMonthIndex]}
                  onChange={(e) => {
                    const val = Math.max(0, parseInt(e.target.value) || 0);
                    setMonthlyPagesArray({
                      ...monthlyPagesArray,
                      [selectedMonthIndex]: val
                    });
                  }}
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', background: currentTheme.cardBg, color: currentTheme.text, border: `1px solid ${currentTheme.border}`, boxSizing: 'border-box', fontWeight: 'bold' }}
                />
              </div>
            </div>
          )}

          {statsMode === 'weekly' && (
            <div style={{ background: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: '16px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '12px', color: currentTheme.accent }}>📅 Избери ден и отбележи четенето:</div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px', marginBottom: '16px' }}>
                {Object.keys(statsDays).map((dayName) => (
                  <button
                    key={dayName}
                    onClick={() => setSelectedStatsDay(dayName)}
                    style={{
                      flex: 1,
                      padding: '8px 2px',
                      borderRadius: '8px',
                      border: selectedStatsDay === dayName ? `1px solid ${currentTheme.accent}` : `1px solid ${currentTheme.border}`,
                      background: selectedStatsDay === dayName ? currentTheme.bg : currentTheme.cardBg,
                      color: currentTheme.text,
                      cursor: 'pointer',
                      fontSize: '11px',
                      textAlign: 'center',
                      fontWeight: selectedStatsDay === dayName ? 'bold' : 'normal'
                    }}
                  >
                    {dayName}
                    <div style={{ fontSize: '10px', color: statsDays[dayName].pages > 0 ? currentTheme.accent : currentTheme.text, marginTop: '2px' }}>
                      {statsDays[dayName].pages > 0 ? `${statsDays[dayName].pages}с` : '—'}
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ background: currentTheme.bg, padding: '12px', borderRadius: '12px', border: `1px solid ${currentTheme.border}` }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: currentTheme.text }}>
                  Редактиране за ден: <span style={{ color: currentTheme.accent }}>{selectedStatsDay}</span>
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '11px', color: currentTheme.accent, display: 'block', marginBottom: '4px' }}>Прочетени страници:</label>
                  <input 
                    type="number"
                    value={statsDays[selectedStatsDay].pages}
                    onChange={(e) => {
                      const val = Math.max(0, parseInt(e.target.value) || 0);
                      setStatsDays({
                        ...statsDays,
                        [selectedStatsDay]: { ...statsDays[selectedStatsDay], pages: val }
                      });
                    }}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', background: currentTheme.cardBg, color: currentTheme.text, border: `1px solid ${currentTheme.border}`, boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', color: currentTheme.accent, display: 'block', marginBottom: '4px' }}>Коя книга чете този ден?</label>
                  <select 
                    value={statsDays[selectedStatsDay].book}
                    onChange={(e) => {
                      setStatsDays({
                        ...statsDays,
                        [selectedStatsDay]: { ...statsDays[selectedStatsDay], book: e.target.value }
                      });
                    }}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', background: currentTheme.cardBg, color: currentTheme.text, border: `1px solid ${currentTheme.border}`, boxSizing: 'border-box' }}
                  >
                    <option value="">-- Избери книга --</option>
                    {myBooks.map((b) => (
                      <option key={b.id} value={b.title}>{b.title}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {statsMode === 'monthly' && (
            <div style={{ background: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: '16px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '12px', color: currentTheme.accent }}>📖 Месечни отчети:</div>
              <div style={{ background: currentTheme.bg, padding: '12px', borderRadius: '12px', border: `1px solid ${currentTheme.border}` }}>
                <label style={{ fontSize: '11px', color: currentTheme.accent, display: 'block', marginBottom: '4px' }}>Общо прочетени страници за месеца:</label>
                <input 
                  type="number"
                  value={monthlyPages}
                  onChange={(e) => setMonthlyPages(Math.max(0, parseInt(e.target.value) || 0))}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: currentTheme.cardBg, color: currentTheme.text, border: `1px solid ${currentTheme.border}`, boxSizing: 'border-box', fontSize: '16px', fontWeight: 'bold' }}
                />
              </div>
            </div>
          )}
        </div>
      ) : activeTab === 'Books' ? (
        <div className="books-tab-screen" style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, minHeight: '100vh', padding: '20px 16px 100px 16px', boxSizing: 'border-box' }}>
          <div className="books-header-row">
            <h1 className="books-main-heading">Твоите книги</h1>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="books-icon-action-btn" onClick={() => alert('Филтри')}>⚙️</button>
              <button className="books-icon-action-btn" onClick={() => setActiveModal('searchBook')}>+</button>
            </div>
          </div>

          <div className="books-filter-pills" style={{ overflowX: 'auto', display: 'flex', gap: '8px', paddingBottom: '6px' }}>
            <span className={`filter-pill ${booksSubTab === 'Reading' ? 'active' : ''}`} onClick={() => setBooksSubTab('Reading')}>
              Чете се · {myBooks.filter(b => b.status === "Чете се в момента").length}
            </span>
            <span className={`filter-pill ${booksSubTab === 'ToBeRead' ? 'active' : ''}`} onClick={() => setBooksSubTab('ToBeRead')}>
              За четене · {myBooks.filter(b => b.status === "За четене").length}
            </span>
            <span className={`filter-pill ${booksSubTab === 'All' ? 'active' : ''}`} onClick={() => setBooksSubTab('All')}>
              Всички · {myBooks.length}
            </span>
          </div>

          <div style={{ margin: '14px 0' }}>
            <input 
              type="text" 
              placeholder="Търсене в книгите..."
              style={{ width: '100%', padding: '10px 14px', borderRadius: '20px', background: currentTheme.cardBg, color: currentTheme.text, border: `1px solid ${currentTheme.border}`, boxSizing: 'border-box', fontSize: '12px' }}
            />
          </div>

          {filteredBooksList.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <p style={{ color: currentTheme.accent, fontSize: '14px', fontWeight: 'bold' }}>Няма книги все още</p>
              <button className="btn-spin-small" onClick={() => setActiveModal('searchBook')}>Добави книга</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {filteredBooksList.map((b) => (
                <div key={b.id} className="finished-book-card" onClick={() => setViewingBookTitle(b.title)} style={{ textAlign: 'left', backgroundColor: currentTheme.cardBg, border: `1px solid ${currentTheme.border}` }}>
                  <div style={{ width: '100%', height: '140px', backgroundColor: b.bg, border: `1px solid ${b.accent}`, borderRadius: '8px', marginBottom: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px', boxSizing: 'border-box', textAlign: 'center' }}>
                    <span style={{ fontSize: '9px', color: b.accent }}>{b.author}</span>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#fff' }}>{b.title}</span>
                  </div>
                  <div className="finished-title" style={{ color: currentTheme.text }}>{b.title}</div>
                  <div className="finished-author" style={{ color: currentTheme.accent }}>{b.author}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : activeTab === 'Profile' ? (
        <div style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, minHeight: '100vh', padding: '20px 16px 100px 16px', boxSizing: 'border-box' }}>
          {profileSubScreen === 'Тема' ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => setProfileSubScreen(null)} style={{ background: 'transparent', border: 'none', color: currentTheme.accent, fontSize: '20px', cursor: 'pointer' }}>‹ Назад</button>
                <h2 style={{ fontSize: '18px', fontFamily: 'serif', margin: 0 }}>Theme</h2>
              </div>
              <p style={{ fontSize: '11px', color: currentTheme.accent, marginBottom: '16px' }}>Changes the colors of the app. Your bookcases keep their own.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {themesList.map((t) => {
                  const isSelected = currentThemeId === t.id;
                  return (
                    <div 
                      key={t.id}
                      onClick={() => setCurrentThemeId(t.id)}
                      style={{ 
                        background: t.cardBg, 
                        border: isSelected ? `2px solid ${t.accent}` : `1px solid ${t.border}`, 
                        borderRadius: '16px', 
                        padding: '14px 16px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        cursor: 'pointer',
                        boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.3)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>📖</div>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: 'bold', color: t.text }}>{t.name}</div>
                          <div style={{ fontSize: '11px', color: t.accent, marginTop: '2px' }}>{t.desc}</div>
                        </div>
                      </div>
                      {isSelected && (
                        <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px' }}>✓</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : profileSubScreen === 'Анимация при отваряне' ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => setProfileSubScreen(null)} style={{ background: 'transparent', border: 'none', color: currentTheme.accent, fontSize: '20px', cursor: 'pointer' }}>‹ Назад</button>
                <h2 style={{ fontSize: '18px', fontFamily: 'serif', margin: 0 }}>Opening animation</h2>
              </div>
              <p style={{ fontSize: '11px', color: currentTheme.accent, marginBottom: '16px' }}>Избери анимация при всяко отваряне на приложението.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {animationsList.map((anim) => {
                  const isSelected = currentAnimationId === anim.id;
                  return (
                    <div 
                      key={anim.id}
                      onClick={() => setCurrentAnimationId(anim.id)}
                      style={{ 
                        background: currentTheme.cardBg, 
                        border: isSelected ? `2px solid ${currentTheme.accent}` : `1px solid ${currentTheme.border}`, 
                        borderRadius: '16px', 
                        padding: '14px 16px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        cursor: 'pointer',
                        boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.3)' : 'none'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 'bold', color: currentTheme.text }}>{anim.name}</div>
                        <div style={{ fontSize: '11px', color: currentTheme.accent, marginTop: '2px' }}>{anim.desc}</div>
                      </div>
                      {isSelected && (
                        <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: currentTheme.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px' }}>✓</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : profileSubScreen === 'Уиджети' ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => setProfileSubScreen(null)} style={{ background: 'transparent', border: 'none', color: currentTheme.accent, fontSize: '20px', cursor: 'pointer' }}>‹ Назад</button>
                <h2 style={{ fontSize: '18px', fontFamily: 'serif', margin: 0 }}>Widgets</h2>
              </div>
              <p style={{ fontSize: '11px', color: currentTheme.accent, marginBottom: '16px' }}>These are examples. With Premium, each one shows your own reading.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                {widgetsList.map((w) => {
                  const isAdded = activeWidgets.includes(w.id);
                  return (
                    <div 
                      key={w.id}
                      style={{ 
                        background: currentTheme.cardBg, 
                        border: `1px solid ${currentTheme.border}`, 
                        borderRadius: '16px', 
                        padding: '12px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                      }}
                    >
                      <div style={{ height: '90px', background: currentTheme.bg, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', position: 'relative', border: `1px solid ${currentTheme.border}` }}>
                        <span style={{ fontSize: '22px' }}>
                          {w.type === 'streak' ? '🔥' : w.type === 'now' ? '📖' : w.type === 'today' ? '⏱️' : w.type === 'challenge' ? '📚' : '📦'}
                        </span>
                      </div>

                      <div style={{ fontSize: '13px', fontWeight: 'bold', color: currentTheme.text, marginBottom: '2px' }}>{w.title}</div>
                      <div style={{ fontSize: '10px', color: currentTheme.accent, marginBottom: '10px' }}>{w.subtitle}</div>

                      <button 
                        onClick={() => {
                          if (isAdded) {
                            setActiveWidgets(activeWidgets.filter(id => id !== w.id));
                          } else {
                            setActiveWidgets([...activeWidgets, w.id]);
                          }
                        }}
                        style={{ 
                          width: '100%', 
                          padding: '6px', 
                          borderRadius: '8px', 
                          background: isAdded ? currentTheme.bg : currentTheme.accent, 
                          color: isAdded ? currentTheme.accent : '#fff', 
                          border: `1px solid ${currentTheme.border}`,
                          fontSize: '11px', 
                          fontWeight: 'bold', 
                          cursor: 'pointer'
                        }}
                      >
                        {isAdded ? '✓ Added' : '🔒 Add'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : profileSubScreen === 'Общи' ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => setProfileSubScreen(null)} style={{ background: 'transparent', border: 'none', color: currentTheme.accent, fontSize: '20px', cursor: 'pointer' }}>‹ Назад</button>
                <h2 style={{ fontSize: '18px', fontFamily: 'serif', margin: 0 }}>General</h2>
              </div>

              <div style={{ background: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: '16px', overflow: 'hidden', padding: '6px 0' }}>
                <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${currentTheme.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: currentTheme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentTheme.accent, fontSize: '12px', border: `1px solid ${currentTheme.border}` }}>👤</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: currentTheme.text }}>Твоето име</div>
                      <div style={{ fontSize: '11px', color: currentTheme.accent }}>Изписва се на началния екран</div>
                    </div>
                  </div>
                  <input 
                    type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{ 
                      background: currentTheme.bg, 
                      color: currentTheme.text, 
                      border: `1px solid ${currentTheme.border}`, 
                      borderRadius: '8px', 
                      padding: '6px 10px', 
                      fontSize: '13px', 
                      width: '110px',
                      fontWeight: 'bold',
                      textAlign: 'right'
                    }}
                  />
                </div>

                <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${currentTheme.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: currentTheme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentTheme.accent, fontSize: '12px', border: `1px solid ${currentTheme.border}` }}>🔊</div>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: currentTheme.text }}>Sounds</span>
                  </div>
                  <div 
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    style={{ 
                      width: '44px', height: '24px', borderRadius: '12px', 
                      background: soundEnabled ? currentTheme.accent : currentTheme.bg, 
                      display: 'flex', alignItems: 'center', padding: '2px', cursor: 'pointer',
                      transition: 'background 0.3s', border: `1px solid ${currentTheme.border}`
                    }}
                  >
                    <div style={{ 
                      width: '20px', height: '20px', borderRadius: '50%', background: '#fff', 
                      transform: soundEnabled ? 'translateX(20px)' : 'translateX(0)',
                      transition: 'transform 0.3s'
                    }}></div>
                  </div>
                </div>

                <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: currentTheme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentTheme.accent, fontSize: '12px', border: `1px solid ${currentTheme.border}` }}>🌐</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: currentTheme.text }}>Language</div>
                      <div style={{ fontSize: '11px', color: currentTheme.accent }}>{appLanguage}</div>
                    </div>
                  </div>
                  <select 
                    value={appLanguage}
                    onChange={(e) => setAppLanguage(e.target.value)}
                    style={{ 
                      background: currentTheme.bg, 
                      color: currentTheme.text, 
                      border: `1px solid ${currentTheme.border}`, 
                      borderRadius: '8px', 
                      padding: '6px 10px', 
                      fontSize: '12px', 
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    <option value="Български">Български</option>
                    <option value="English">English</option>
                  </select>
                </div>
              </div>
            </div>
          ) : profileSubScreen === 'Напомняния за четене' ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => setProfileSubScreen(null)} style={{ background: 'transparent', border: 'none', color: currentTheme.accent, fontSize: '20px', cursor: 'pointer' }}>‹ Назад</button>
                <h2 style={{ fontSize: '18px', fontFamily: 'serif', margin: 0 }}>Напомняния за четене</h2>
              </div>

              <div style={{ background: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: '16px', overflow: 'hidden', padding: '6px 0' }}>
                <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${currentTheme.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: currentTheme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentTheme.accent, fontSize: '12px', border: `1px solid ${currentTheme.border}` }}>🔔</div>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: currentTheme.text }}>Ежедневни напомняния</span>
                  </div>
                  <div 
                    onClick={() => setReminderEnabled(!reminderEnabled)}
                    style={{ 
                      width: '44px', height: '24px', borderRadius: '12px', 
                      background: reminderEnabled ? currentTheme.accent : currentTheme.bg, 
                      display: 'flex', alignItems: 'center', padding: '2px', cursor: 'pointer',
                      transition: 'background 0.3s', border: `1px solid ${currentTheme.border}`
                    }}
                  >
                    <div style={{ 
                      width: '20px', height: '20px', borderRadius: '50%', background: '#fff', 
                      transform: reminderEnabled ? 'translateX(20px)' : 'translateX(0)',
                      transition: 'transform 0.3s'
                    }}></div>
                  </div>
                </div>

                <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: currentTheme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentTheme.accent, fontSize: '12px', border: `1px solid ${currentTheme.border}` }}>⏰</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: currentTheme.text }}>Час за известие</div>
                      <div style={{ fontSize: '11px', color: currentTheme.accent }}>Избери кога да ти напомняме</div>
                    </div>
                  </div>
                  <input 
                    type="time" 
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    style={{ 
                      background: currentTheme.bg, 
                      color: currentTheme.text, 
                      border: `1px solid ${currentTheme.border}`, 
                      borderRadius: '8px', 
                      padding: '6px 10px', 
                      fontSize: '14px', 
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      colorScheme: currentThemeId === 'white' ? 'light' : 'dark'
                    }}
                  />
                </div>
              </div>
            </div>
          ) : profileSubScreen === 'Формат по подразбиране' ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => setProfileSubScreen(null)} style={{ background: 'transparent', border: 'none', color: currentTheme.accent, fontSize: '20px', cursor: 'pointer' }}>‹ Назад</button>
                <h2 style={{ fontSize: '18px', fontFamily: 'serif', margin: 0 }}>Формат по подразбиране</h2>
              </div>
              <p style={{ fontSize: '11px', color: currentTheme.accent, marginBottom: '16px' }}>Избери как четеш по подразбиране:</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Физическа', 'Електронна', 'Аудио'].map((formatName) => {
                  const isSelected = defaultFormat === formatName;
                  return (
                    <div 
                      key={formatName}
                      onClick={() => setDefaultFormat(formatName)}
                      style={{ 
                        background: currentTheme.cardBg, 
                        border: isSelected ? `2px solid ${currentTheme.accent}` : `1px solid ${currentTheme.border}`, 
                        borderRadius: '16px', 
                        padding: '14px 16px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '18px' }}>{formatName === 'Физическа' ? '📖' : formatName === 'Електронна' ? '📱' : '🎧'}</span>
                        <span style={{ fontSize: '15px', fontWeight: 'bold', color: currentTheme.text }}>{formatName} книга</span>
                      </div>
                      {isSelected && (
                        <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: currentTheme.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px' }}>✓</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : profileSubScreen === 'Незавършена книга' ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => setProfileSubScreen(null)} style={{ background: 'transparent', border: 'none', color: currentTheme.accent, fontSize: '20px', cursor: 'pointer' }}>‹ Назад</button>
                <h2 style={{ fontSize: '18px', fontFamily: 'serif', margin: 0 }}>Did not finish</h2>
              </div>
              
              <div style={{ 
                background: '#111', 
                borderRadius: '24px', 
                height: '240px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                position: 'relative', 
                marginBottom: '20px', 
                overflow: 'hidden',
                border: `2px solid ${currentTheme.border}`
              }}>
                <button 
                  onClick={triggerUnfinishedAnimation}
                  style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', color: '#fff', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Пусни анимацията"
                >
                  ▶
                </button>

                <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '8px', fontFamily: 'serif' }}>
                  {isPlayingUnfinishedAnim ? (didNotFinishAction === 'putAway' ? 'Прибиране в шкаф...' : '🔥 Изгаряне в пепел...') : 'Натисни Play за анимация'}
                </div>

                {/* Ефект на горене / прибиране в рафт точно като на клипа */}
                <div style={{ position: 'relative', width: '90px', height: '130px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  
                  {didNotFinishAction === 'burnIt' && animStep >= 1 && (
                    <div style={{
                      position: 'absolute', inset: '-15px',
                      background: 'radial-gradient(circle, rgba(255,100,0,0.8) 0%, rgba(200,20,0,0.4) 50%, transparent 80%)',
                      filter: 'blur(8px)',
                      zIndex: 2,
                      animation: 'flameGlow 0.6s infinite alternate'
                    }}></div>
                  )}

                  <div style={{ 
                    width: '90px', 
                    height: '130px', 
                    backgroundColor: currentBook.bg, 
                    border: `1.5px solid ${currentBook.accent}`, 
                    borderRadius: '6px', 
                    padding: '8px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between', 
                    textAlign: 'center',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.8)',
                    position: 'relative',
                    zIndex: 3,
                    transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: didNotFinishAction === 'putAway' 
                      ? (animStep === 1 ? 'translateY(-20px)' : animStep === 2 ? 'translateY(70px) scale(0.3) opacity(0)' : 'translateY(0)')
                      : (animStep === 1 ? 'scale(1.05)' : animStep === 2 ? 'scale(0.85) brightness(1.6) contrast(1.5) sepia(1)' : 'scale(1)'),
                    filter: (didNotFinishAction === 'burnIt' && animStep === 2) ? 'grayscale(0.8) brightness(0.4) blur(3px)' : 'none',
                    opacity: (didNotFinishAction === 'burnIt' && animStep === 3) ? 0 : 1
                  }}>
                    <span style={{ fontSize: '6px', color: currentBook.accent, textTransform: 'uppercase' }}>{currentBook.author}</span>
                    <span style={{ fontSize: '8px', fontWeight: 'bold', color: '#fff' }}>{currentBook.title}</span>
                    <span style={{ fontSize: '6px', color: '#aaa' }}>★ 5.0</span>
                  </div>
                </div>

                {didNotFinishAction === 'putAway' && animStep >= 2 && (
                  <div style={{ position: 'absolute', bottom: '25px', background: 'rgba(30,30,30,0.95)', padding: '6px 14px', borderRadius: '8px', fontSize: '10px', color: '#fff', border: '1px solid #666', zIndex: 10 }}>
                    Did not finish · Спряна на стр. {currentBook.currentPage} от {currentBook.totalPages}
                  </div>
                )}
                {didNotFinishAction === 'burnIt' && animStep >= 2 && (
                  <div style={{ position: 'absolute', bottom: '25px', background: 'rgba(100,15,15,0.95)', padding: '6px 14px', borderRadius: '8px', fontSize: '10px', color: '#fff', border: '1px solid #ff4444', zIndex: 10 }}>
                    Burned to ashes 🔥 · {currentBook.title}
                  </div>
                )}
              </div>

              <p style={{ fontSize: '11px', color: currentTheme.accent, marginBottom: '14px' }}>Избери анимация при маркиране на книга като незавършена:</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div 
                  onClick={() => setDidNotFinishAction('putAway')}
                  style={{ 
                    background: currentTheme.cardBg, 
                    border: didNotFinishAction === 'putAway' ? `2px solid ${currentTheme.accent}` : `1px solid ${currentTheme.border}`, 
                    borderRadius: '16px', 
                    padding: '12px', 
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ height: '70px', background: currentTheme.bg, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', fontSize: '24px', border: `1px solid ${currentTheme.border}` }}>📦</div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: currentTheme.text }}>Put it away</div>
                  <div style={{ fontSize: '10px', color: currentTheme.accent, marginTop: '2px' }}>Прибира се в шкафа</div>
                </div>

                <div 
                  onClick={() => setDidNotFinishAction('burnIt')}
                  style={{ 
                    background: currentTheme.cardBg, 
                    border: didNotFinishAction === 'burnIt' ? `2px solid ${currentTheme.accent}` : `1px solid ${currentTheme.border}`, 
                    borderRadius: '16px', 
                    padding: '12px', 
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ height: '70px', background: currentTheme.bg, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', fontSize: '24px', border: `1px solid ${currentTheme.border}` }}>🔥</div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: currentTheme.text }}>Burn it</div>
                  <div style={{ fontSize: '10px', color: currentTheme.accent, marginTop: '2px' }}>Изгаря в пепел със звук 🔥</div>
                </div>
              </div>
            </div>
          ) : profileSubScreen ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => setProfileSubScreen(null)} style={{ background: 'transparent', border: 'none', color: currentTheme.accent, fontSize: '20px', cursor: 'pointer' }}>‹ Назад</button>
                <h2 style={{ fontSize: '18px', fontFamily: 'serif', margin: 0 }}>{profileSubScreen}</h2>
              </div>
              <div style={{ background: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: '16px', padding: '20px', textAlign: 'center', color: currentTheme.accent }}>
                Тук ще се намират настройките за „{profileSubScreen}“. Опцията работи перфектно! ⚙️✨
              </div>
            </div>
          ) : (
            <div>
              <h1 style={{ fontSize: '24px', fontFamily: 'serif', marginBottom: '20px' }}>Профил</h1>

              <div style={{ fontSize: '12px', color: currentTheme.accent, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Приложение</div>
              <div style={{ background: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: '16px', overflow: 'hidden', marginBottom: '20px' }}>
                <div onClick={() => setProfileSubScreen('Тема')} style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${currentTheme.border}`, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '16px' }}>🎨</span>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>Тема</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: currentTheme.accent, fontSize: '13px' }}>{currentTheme.name} <span>›</span></div>
                </div>

                <div onClick={() => setProfileSubScreen('Икона на приложението')} style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${currentTheme.border}`, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '16px' }}>🟥</span>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>Икона на приложението</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: currentTheme.accent, fontSize: '13px' }}>Warm <span>›</span></div>
                </div>

                <div onClick={() => setProfileSubScreen('Анимация при отваряне')} style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${currentTheme.border}`, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '16px' }}>✨</span>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>Анимация при отваряне</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: currentTheme.accent, fontSize: '13px' }}>{selectedAnimationObj.name} <span>›</span></div>
                </div>

                <div onClick={() => setProfileSubScreen('Уиджети')} style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${currentTheme.border}`, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '16px' }}>🗂️</span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>Уиджети</div>
                      <div style={{ fontSize: '11px', color: currentTheme.accent }}>Избери коя библиотека да се показва</div>
                    </div>
                  </div>
                  <span style={{ color: currentTheme.accent, fontSize: '13px' }}>›</span>
                </div>

                <div onClick={() => setProfileSubScreen('Общи')} style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '16px' }}>⚙️</span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>Общи</div>
                      <div style={{ fontSize: '11px', color: currentTheme.accent }}>Име, звуци, език</div>
                    </div>
                  </div>
                  <span style={{ color: currentTheme.accent, fontSize: '13px' }}>›</span>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: currentTheme.accent, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Четене</div>
              <div style={{ background: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: '16px', overflow: 'hidden' }}>
                <div onClick={() => setProfileSubScreen('Напомняния за четене')} style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${currentTheme.border}`, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '16px' }}>🔔</span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>Напомняния за четене</div>
                      <div style={{ fontSize: '11px', color: currentTheme.accent }}>Всеки ден в {reminderTime}</div>
                    </div>
                  </div>
                  <span style={{ color: currentTheme.accent, fontSize: '13px' }}>›</span>
                </div>

                <div onClick={() => setProfileSubScreen('Формат по подразбиране')} style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${currentTheme.border}`, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '16px' }}>📖</span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>Формат по подразбиране</div>
                      <div style={{ fontSize: '11px', color: currentTheme.accent }}>{defaultFormat}</div>
                    </div>
                  </div>
                  <span style={{ color: currentTheme.accent, fontSize: '13px' }}>›</span>
                </div>

                <div onClick={() => setProfileSubScreen('Незавършена книга')} style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '16px' }}>📦</span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>Незавършена книга</div>
                      <div style={{ fontSize: '11px', color: currentTheme.accent }}>{didNotFinishAction === 'putAway' ? 'Put it away' : 'Burn it'}</div>
                    </div>
                  </div>
                  <span style={{ color: currentTheme.accent, fontSize: '13px' }}>›</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <header className="header" style={{ backgroundColor: currentTheme.cardBg, borderBottom: `1px solid ${currentTheme.border}` }}>
            <div className="user-info">
              <div className="avatar" style={{ backgroundColor: currentTheme.accent }}>{userName ? userName.charAt(0).toUpperCase() : 'И'}</div>
              <div>
                <div className="greeting" style={{ color: currentTheme.accent }}>Добър ден,</div>
                <div className="username" style={{ color: currentTheme.text }}>{userName}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div className="streak-badge" style={{ backgroundColor: currentTheme.cardBg, border: `1px solid ${currentTheme.border}` }}>🔥 1 ден</div>
              <button className="settings-icon-btn" style={{ background: currentTheme.cardBg, color: currentTheme.text }} onClick={() => setActiveTab('Profile')}>⚙️</button>
            </div>
          </header>

          <div className="main-card" style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}>
            <div className="card-top" onClick={() => setViewingBookTitle(currentBook.title)} style={{ cursor: 'pointer' }}>
              <div className="card-details">
                <div className="status" style={{ color: currentTheme.accent }}>● {currentBook.status}</div>
                <h2 className="book-title" style={{ color: currentTheme.text }}>{currentBook.title}</h2>
                <p className="author" style={{ color: currentTheme.accent }}>{currentBook.author}</p>
                <div className="progress-bar-bg" style={{ backgroundColor: currentTheme.bg }}>
                  <div className="progress-bar-fill" style={{ width: `${currentBook.progress}%`, backgroundColor: currentTheme.accent }}></div>
                </div>
                <div className="page-info" style={{ color: currentTheme.accent }}>Стр. {currentBook.currentPage} от {currentBook.totalPages} ({currentBook.progress}%)</div>
              </div>
            </div>
            <div className="card-buttons">
              <button className="btn-light" style={{ backgroundColor: currentTheme.accent, color: currentTheme.bg }} onClick={() => setTimerRunning(!timerRunning)}>
                {timerRunning ? 'Пауза ⏸' : 'Продължи ▶'}
              </button>
              <button className="btn-dark" style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, border: `1px solid ${currentTheme.border}` }} onClick={() => setViewingBookTitle(currentBook.title)}>
                Ревю и детайли 🎯
              </button>
            </div>
          </div>

          <div className="dots">
            <div className="dot active" style={{ backgroundColor: currentTheme.accent }}></div>
            <div className="dot" style={{ backgroundColor: currentTheme.border }}></div>
          </div>

          <div className="quote-card" style={{ cursor: 'default', background: currentTheme.cardBg, border: `1px solid ${currentTheme.accent}` }}>
            <div style={{ fontSize: '10px', color: currentTheme.accent, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: 'bold' }}>
              ✨ Книжно късметче за деня ✨
            </div>
            <p className="quote-body" style={{ fontStyle: 'italic', marginBottom: '10px', color: currentTheme.text }}>{dailyQuote.text}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="quote-author-name" style={{ color: currentTheme.text, fontWeight: 'bold' }}>{dailyQuote.book}</span>
              <span style={{ fontSize: '11px', color: currentTheme.accent }}>— {dailyQuote.author}</span>
            </div>
          </div>

          <div className="week-card" style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}>
            <div className="week-header">
              <span style={{ color: currentTheme.text }}>Тази седмица</span>
              <span className="week-stats-link" onClick={() => setActiveTab('Stats')} style={{ cursor: 'pointer', color: currentTheme.accent }}>Статистика &gt;</span>
            </div>
            <div className="week-days-container">
              {['П', 'В', 'С', 'Ч', 'П', 'С', 'Н'].map((day, idx) => (
                <div key={idx} className="day-column">
                  <div className={`day-circle ${idx === 0 ? 'checked' : ''}`} style={{ backgroundColor: idx === 0 ? currentTheme.accent : currentTheme.bg, borderColor: currentTheme.border, color: idx === 0 ? '#fff' : currentTheme.text }}>
                    {idx === 0 ? '✓' : ''}
                  </div>
                  <span className="day-label" style={{ color: currentTheme.accent }}>{day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="year-card" style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}>
            <div className="year-header">
              <span style={{ color: currentTheme.text }}>Твоята {currentYear}</span>
              <span className="set-goal-link" onClick={() => setActiveModal('readGoal')} style={{ cursor: 'pointer', color: currentTheme.accent }}>Задай цел &gt;</span>
            </div>
            <p className="year-subtitle" style={{ color: currentTheme.accent }}>Колко книги тази година?</p>
            <div style={{ margin: '12px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="number" 
                value={finishedCountInput}
                onChange={(e) => setFinishedCountInput(e.target.value)}
                style={{ width: '65px', height: '45px', borderRadius: '8px', background: currentTheme.bg, color: currentTheme.text, border: `1px solid ${currentTheme.border}`, fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}
              />
              <span style={{ fontSize: '14px', color: currentTheme.text, fontWeight: '500' }}>общо прочетени книги</span>
            </div>
            <div className="year-stats-footer" style={{ color: currentTheme.accent }}>
              <strong style={{ color: currentTheme.text }}>2 часа прочетени</strong> • 83 страници
            </div>
          </div>

          <div className="notebook-card" style={{ cursor: 'default', backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}>
            <div className="card-tag" style={{ color: currentTheme.accent }}>Бележник</div>
            <h3 className="card-heading" style={{ color: currentTheme.text }}>Напиши първата си бележка</h3>
            <p className="card-subtext" style={{ color: currentTheme.accent }}>Цитати, теории и бележки от твоите книги се пазят тук, заедно с тяхната страница.</p>
            <textarea 
              placeholder="Напиши своя цитат или бележка тук... ✍️"
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              style={{ width: '100%', height: '70px', marginTop: '10px', padding: '10px', borderRadius: '8px', background: currentTheme.bg, color: currentTheme.text, border: `1px solid ${currentTheme.border}`, boxSizing: 'border-box', fontSize: '12px', resize: 'none' }}
            />
          </div>

          <div className="dual-cards-row">
            <div className="half-card" style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }} onClick={() => setActiveModal('searchBook')}>
              <div>
                <div className="card-tag-row"><span style={{ color: currentTheme.accent }}>Търсене на книга</span></div>
                <div className="add-box-dash" style={{ color: currentTheme.accent }}>🔍</div>
                <h4 className="half-card-title" style={{ color: currentTheme.text }}>Намери и добави книга</h4>
                <p className="half-card-desc" style={{ color: currentTheme.accent }}>Напиши името на книгата, която започваш</p>
              </div>
              <div className="half-card-link" style={{ color: currentTheme.accent }}>Търси книга &gt;</div>
            </div>

            <div className="half-card" style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }} onClick={() => alert('Обобщение')}>
              <div>
                <div className="card-tag-row"><span style={{ color: currentTheme.accent }}>Обобщение</span></div>
                <div className="add-box-dash" style={{ color: currentTheme.accent }}>📊</div>
                <h4 className="half-card-title" style={{ color: currentTheme.text }}>Твоето първо обобщение</h4>
                <p className="half-card-desc" style={{ color: currentTheme.accent }}>Идва на 1 ноември с книгите за октомври</p>
              </div>
              <div className="half-card-link" style={{ color: currentTheme.accent }}>Отвори обобщение &gt;</div>
            </div>
          </div>

          <div className="quote-card" onClick={handleQuoteClick} style={{ cursor: 'pointer', backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}>
            <p className="quote-body" style={{ color: currentTheme.text }}>{quotesList[quoteIndex].text}</p>
            <span className="quote-author-name" style={{ color: currentTheme.accent }}>{quotesList[quoteIndex].author}</span>
          </div>

          <div className="section-header">
            <h3 style={{ color: currentTheme.text }}>Твоята библиотека</h3>
            <span className="see-all" onClick={() => setActiveModal('searchBook')} style={{ cursor: 'pointer', color: currentTheme.accent }}>
              + Добави книга
            </span>
          </div>

          <div className="cozy-shelf-container">
            <div className="cozy-books-row" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              {myBooks.map((b) => (
                <div key={b.id} onClick={() => setViewingBookTitle(b.title)} style={{ width: '55px', height: '85px', backgroundColor: b.bg, border: `1px solid ${b.accent}`, borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4px', textAlign: 'center' }}>
                  <span style={{ fontSize: '7px', color: b.accent }}>{b.author}</span>
                  <span style={{ fontSize: '8px', fontWeight: 'bold', color: '#fff' }}>{b.title}</span>
                </div>
              ))}
            </div>

            <div className="wooden-shelf-base"></div>
            <div className="autumn-leaves">🍁🍂</div>
          </div>
        </>
      )}

      <div className="mini-player" style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}>
        <div className="player-left" onClick={() => setViewingBookTitle(currentBook.title)} style={{ cursor: 'pointer' }}>
          <strong style={{ color: currentTheme.text }}>{currentBook.title}</strong>
          <p style={{ color: currentTheme.accent }}>{currentBook.status}</p>
        </div>
        <div className="player-controls">
          <span className="timer" style={{ color: currentTheme.text }}>{formatTime(secondsElapsed)}</span>
          <button className="play-btn" style={{ backgroundColor: currentTheme.accent, color: '#fff' }} onClick={() => setTimerRunning(!timerRunning)}>
            {timerRunning ? '⏸' : '▶'}
          </button>
          <button className="stop-btn" style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }} onClick={() => { setTimerRunning(false); setSecondsElapsed(0); }}>■</button>
        </div>
      </div>

      <nav className="bottom-nav" style={{ backgroundColor: currentTheme.cardBg, borderTop: `1px solid ${currentTheme.border}` }}>
        <div className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => { setViewingBookTitle(null); setActiveTab('Home'); }} style={{ color: activeTab === 'Home' ? currentTheme.accent : currentTheme.accent }}>
          <span>🏠</span>
          <span>Начало</span>
        </div>
        <div className={`nav-item ${activeTab === 'Books' ? 'active' : ''}`} onClick={() => { setViewingBookTitle(null); setActiveTab('Books'); }} style={{ color: activeTab === 'Books' ? currentTheme.accent : currentTheme.accent }}>
          <span>📚</span>
          <span>Книги</span>
        </div>
        <div className={`nav-item ${activeTab === 'Library' ? 'active' : ''}`} onClick={() => { setViewingBookTitle(null); setActiveTab('Library'); }} style={{ color: activeTab === 'Library' ? currentTheme.accent : currentTheme.accent }}>
          <span>📖</span>
          <span>Библиотека</span>
        </div>
        <div className={`nav-item ${activeTab === 'Stats' ? 'active' : ''}`} onClick={() => { setViewingBookTitle(null); setActiveTab('Stats'); }} style={{ color: activeTab === 'Stats' ? currentTheme.accent : currentTheme.accent }}>
          <span>📊</span>
          <span>Статистика</span>
        </div>
        <div className={`nav-item ${activeTab === 'Profile' ? 'active' : ''}`} onClick={() => { setViewingBookTitle(null); setActiveTab('Profile'); }} style={{ color: activeTab === 'Profile' ? currentTheme.accent : currentTheme.accent }}>
          <span>👤</span>
          <span>Профил</span>
        </div>
      </nav>

      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" style={{ backgroundColor: currentTheme.cardBg, color: currentTheme.text, border: `1px solid ${currentTheme.border}` }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" style={{ color: currentTheme.text }} onClick={() => setActiveModal(null)}>✕</button>

            {activeModal === 'searchBook' && (
              <div>
                <h2>🔍 Търси книга</h2>
                <input 
                  type="text" 
                  placeholder="Въведи заглавие..." 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', background: currentTheme.bg, color: currentTheme.text, border: `1px solid ${currentTheme.border}`, marginBottom: '14px', boxSizing: 'border-box' }}
                />
                {searchResults.length > 0 && (
                  <div style={{ maxHeight: '200px', overflowY: 'auto', textAlign: 'left' }}>
                    {searchResults.map((book, i) => (
                      <div key={i} onClick={() => handleAddBookFromSearch(book)} style={{ background: currentTheme.bg, padding: '10px', borderRadius: '8px', marginBottom: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', border: `1px solid ${currentTheme.border}` }}>
                        <div style={{ width: '30px', height: '40px', backgroundColor: book.bg, borderRadius: '4px' }}></div>
                        <div>
                          <div style={{ fontWeight: 'bold', color: currentTheme.text }}>{book.title} ({book.totalPages} стр.)</div>
                          <div style={{ fontSize: '11px', color: currentTheme.accent }}>{book.author}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeModal === 'readGoal' && (
              <div>
                <h2>🎯 Задай цел за {currentYear} година</h2>
                <p style={{ color: currentTheme.accent, fontSize: '12px', marginBottom: '14px' }}>Колко книги искаш да прочетеш тази година?</p>
                <input 
                  type="number" 
                  value={yearlyGoal}
                  onChange={(e) => setYearlyGoal(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', background: currentTheme.bg, color: currentTheme.text, border: `1px solid ${currentTheme.border}`, marginBottom: '16px', boxSizing: 'border-box', fontSize: '14px', textAlign: 'center' }}
                />
                <button 
                  onClick={() => setActiveModal(null)}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', background: currentTheme.accent, color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Запази целта
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;