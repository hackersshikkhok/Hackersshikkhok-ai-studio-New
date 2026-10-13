import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, Globe, Download, Sparkles, Shield, Terminal, Code, 
  Share2, Check, ExternalLink, Eye, Layers, Cpu, Zap, Plus, Trash2, 
  FileText, QrCode, Laptop, Server, Database, Star, Search, Gift, 
  CreditCard, Gamepad2, Palette, Play, RefreshCw, Copy, Sliders, 
  Wand2, Bookmark, HelpCircle, ArrowRight, CheckCircle2, AlertCircle,
  Maximize2, Box, Send, Award, Compass
} from 'lucide-react';

export type PlatformCategory = 'web-to-app' | 'link-app' | 'card-maker' | 'gift-maker' | 'game-maker' | 'design-maker';

export interface GeneratedAppItem {
  id: string;
  slug: string;
  category: PlatformCategory;
  url: string;
  appName: string;
  packageName: string;
  themeColor: string;
  iconName: string;
  author: string;
  createdAt: string;
  downloadsCount: number;
  rating: number;
  description: string;
  manifestCode: string;
  apkSize: string;
  status: 'Published' | 'Building';
  tags: string[];
}

const INITIAL_GENERATED_APPS: GeneratedAppItem[] = [
  {
    id: 'app-101',
    slug: 'hackers-shikkhok-cyber-hub',
    category: 'web-to-app',
    url: 'https://hackersshikkhok.com',
    appName: 'Hackers শিক্ষক Cyber Hub (Android App)',
    packageName: 'com.hackersshikkhok.hub',
    themeColor: '#00f5d4',
    iconName: 'Shield',
    author: 'Admin (H. Shikkhok)',
    createdAt: '2026-10-10 20:30',
    downloadsCount: 1420,
    rating: 4.9,
    description: 'Official Android wrapper app for HackersShikkhok.com featuring instant offline CTF access, 520+ developer tools, and real-time terminal simulation. Optimized for "ওয়েবসাইট অ্যাপ মেক" search.',
    manifestCode: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.hackersshikkhok.hub">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <application android:label="Hackers শিক্ষক" android:icon="@mipmap/ic_launcher" android:theme="@style/Theme.AppCompat.NoActionBar">
        <activity android:name=".MainActivity" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`,
    apkSize: '4.8 MB',
    status: 'Published',
    tags: ['ওয়েবসাইট অ্যাপ মেক', 'ওয়ার্ডপ্রেস ওয়েবসাইট অ্যাপ্লিকেশন মেক', 'Android App', 'Cyber Hub']
  },
  {
    id: 'app-102',
    slug: 'wp-ecommerce-mobile-app',
    category: 'web-to-app',
    url: 'https://demo.hackersshikkhok.com/shop',
    appName: 'WordPress E-Commerce Pro Store App',
    packageName: 'com.hs.wpstore',
    themeColor: '#10b981',
    iconName: 'Smartphone',
    author: 'Tanvir Ahmed',
    createdAt: '2026-10-10 21:15',
    downloadsCount: 960,
    rating: 4.8,
    description: 'ওয়ার্ডপ্রেস উকমার্স স্টোর থেকে এক ক্লিকে তৈরি অ্যান্ড্রয়েড অ্যাপ। পুশ নোটিফিকেশন ও অফলাইন কার্ট সুবিধা সহ।',
    manifestCode: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.hs.wpstore">
    <uses-permission android:name="android.permission.INTERNET" />
    <application android:label="WP Store" android:icon="@mipmap/ic_launcher">
        <activity android:name=".MainActivity" android:exported="true" />
    </application>
</manifest>`,
    apkSize: '4.2 MB',
    status: 'Published',
    tags: ['ওয়ার্ডপ্রেস ওয়েবসাইট অ্যাপ্লিকেশন মেক', 'WooCommerce', 'Mobile Store']
  },
  {
    id: 'app-103',
    slug: 'cyber-student-id-pass',
    category: 'card-maker',
    url: 'https://hackersshikkhok.com/verify-certificate/',
    appName: 'Cyber Cadet Holographic ID Card',
    packageName: 'card.cyber.cadet01',
    themeColor: '#7c3aed',
    iconName: 'CreditCard',
    author: 'Rubel Hossain',
    createdAt: '2026-10-10 18:40',
    downloadsCount: 2310,
    rating: 5.0,
    description: 'হোলোগ্রাম ব্যাজ ও এনক্রিপ্টেড কিউআর কোড সহ সাইবার সিকিউরিটি স্টুডেন্ট আইডি কার্ড মেকার টেমপ্লেট।',
    manifestCode: '{"type":"cyber_card","badge":"Level-3 Sentinel","qr":"https://hackersshikkhok.com/cert/789"}',
    apkSize: 'Vector SVG',
    status: 'Published',
    tags: ['কার্ড মেক', 'Digital ID Card', 'Cyber Pass', 'QR Badge']
  },
  {
    id: 'app-104',
    slug: 'neon-gift-box-voucher',
    category: 'gift-maker',
    url: 'https://hackersshikkhok.com/gift/eid2026',
    appName: 'Cyberpunk Surprise Gift Box & 50% Voucher',
    packageName: 'gift.cyber.box99',
    themeColor: '#f43f5e',
    iconName: 'Gift',
    author: 'Nabila Karim',
    createdAt: '2026-10-10 17:20',
    downloadsCount: 1840,
    rating: 4.9,
    description: 'ক্লিক করলে লাইভ কনফেটি সহ আনবক্স হওয়া সাইবার গিফট বক্স। ফ্রেন্ডদের কাছে লিংক শেয়ার করে সারপ্রাইজ পাঠানো যায়।',
    manifestCode: '{"type":"gift_box","secret":"CYBER_MASTER_2026","voucher":"HACKER50"}',
    apkSize: 'Web Link',
    status: 'Published',
    tags: ['গিফট মেক', 'Gift Box', 'Surprise Voucher', 'Confetti']
  },
  {
    id: 'app-105',
    slug: 'matrix-snake-mini-game',
    category: 'game-maker',
    url: 'https://hackersshikkhok.com/games/matrix-snake',
    appName: 'Matrix Cyber Snake (Canvas Mini-Game)',
    packageName: 'game.matrix.snake',
    themeColor: '#10b981',
    iconName: 'Gamepad2',
    author: 'Fahim Morshed',
    createdAt: '2026-10-10 16:00',
    downloadsCount: 3120,
    rating: 4.9,
    description: 'এইচটিএমএল৫ ক্যানভাস ভিত্তিক ফুল রেসপন্সিভ সাইবার স্নেক গেম। যেকোনো ওয়ার্ডপ্রেস বা স্ট্যাটিক সাইটে সহজে এমবেডযোগ্য।',
    manifestCode: '<canvas id="matrixSnake" width="400" height="400"></canvas>',
    apkSize: 'HTML5 Bundle',
    status: 'Published',
    tags: ['গেম মেকিং', 'Mini Game', 'Canvas', 'HTML5 Game']
  },
  {
    id: 'app-106',
    slug: 'cyber-youtube-thumbnail-designer',
    category: 'design-maker',
    url: 'https://hackersshikkhok.com/design/thumb01',
    appName: 'Cyber Hacker YouTube Thumbnail Studio',
    packageName: 'design.thumb.cyber',
    themeColor: '#f59e0b',
    iconName: 'Palette',
    author: 'Anisur Rahman',
    createdAt: '2026-10-10 14:30',
    downloadsCount: 1530,
    rating: 4.8,
    description: 'নিয়ন গ্লো, টার্মিনাল ফ্রেম ও গ্লিচ টেক্সট সহ প্রফেশনাল ইউটিউব থাম্বনেইল ও সোশাল ব্যানার ডিজাইনার।',
    manifestCode: '{"preset":"youtube_1280x720","theme":"neon_glitch"}',
    apkSize: 'HD Graphic',
    status: 'Published',
    tags: ['ডিজাইনিং মেকার', 'Thumbnail Maker', 'Banner Studio', 'Social Card']
  }
];

export function WpAppGeneratorStudioHub() {
  const [activeCategory, setActiveCategory] = useState<PlatformCategory | 'all'>('all');
  const [activeView, setActiveView] = useState<'hub' | 'generator'>('hub');
  const [appsList, setAppsList] = useState<GeneratedAppItem[]>(() => {
    const saved = localStorage.getItem('hs_platform_apps_v4');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_GENERATED_APPS; }
    }
    return INITIAL_GENERATED_APPS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppDetail, setSelectedAppDetail] = useState<GeneratedAppItem | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Studio Sub-Tabs
  const [activeStudioMode, setActiveStudioMode] = useState<PlatformCategory>('web-to-app');

  // 1. Web to App Form State
  const [urlInput, setUrlInput] = useState('https://hackersshikkhok.com');
  const [appNameInput, setAppNameInput] = useState('Hackers শিক্ষক Pro App');
  const [packageNameInput, setPackageNameInput] = useState('com.hackersshikkhok.app');
  const [selectedColor, setSelectedColor] = useState('#00f5d4');
  const [selectedIcon, setSelectedIcon] = useState('Smartphone');
  const [authorInput, setAuthorInput] = useState('Chief Cyber Engineer');
  const [descriptionInput, setDescriptionInput] = useState('অ্যান্ড্রয়েড ওয়েবভিউ র‍্যাপার অ্যাপ উইথ অফলাইন ক্যাশিং ও পুশ নোটিফিকেশন।');
  const [enableOfflineCache, setEnableOfflineCache] = useState(true);
  const [enableAdMob, setEnableAdMob] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);

  // 2. Card Maker State
  const [cardName, setCardName] = useState('হৃদয় হাসান (Hridoy Hasan)');
  const [cardTitle, setCardTitle] = useState('Cyber Security Cadet & Full-Stack Eng');
  const [cardBadge, setCardBadge] = useState('🛡️ LEVEL-4 SENTINEL');
  const [cardQrUrl, setCardQrUrl] = useState('https://hackersshikkhok.com/verify-certificate/');
  const [cardTheme, setCardTheme] = useState<'neon-cyan' | 'purple-matrix' | 'gold-elite'>('neon-cyan');

  // 3. Gift Maker State
  const [giftRecipient, setGiftRecipient] = useState('প্রিয় বন্ধু (Friend)');
  const [giftMessage, setGiftMessage] = useState('শুভ জন্মদিন! তোমার জন্য হ্যাকার্স শিক্ষক কোর্সে ৫০% ডিসকাউন্ট ভাউচার!');
  const [giftVoucher, setGiftVoucher] = useState('EID-HACKER-50');
  const [isGiftOpened, setIsGiftOpened] = useState(false);

  // 4. Mini Game Maker State (Playable Canvas Mini-Game)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameTheme, setGameTheme] = useState<'matrix' | 'cyberpunk'>('matrix');

  // 5. Design Studio State
  const [bannerHeading, setBannerHeading] = useState('CYBER DEFENSE 2026');
  const [bannerSub, setBannerSub] = useState('হ্যাক প্রুফ ওয়ার্ডপ্রেস ও ফুল-স্ট্যাক কোডিং');
  const [bannerBg, setBannerBg] = useState<'dark-grid' | 'neon-circuit' | 'cyber-gradient'>('dark-grid');

  useEffect(() => {
    localStorage.setItem('hs_platform_apps_v4', JSON.stringify(appsList));
  }, [appsList]);

  // Mini-Game Loop
  useEffect(() => {
    if (!gameRunning) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let posX = 20;
    let posY = 100;
    let dx = 3;
    let dy = 2;
    let score = 0;
    let animId: number;

    const render = () => {
      ctx.fillStyle = gameTheme === 'matrix' ? '#050811' : '#120422';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = gameTheme === 'matrix' ? 'rgba(0, 245, 212, 0.15)' : 'rgba(244, 63, 94, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 20) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }

      // Moving Hacker Node
      ctx.fillStyle = gameTheme === 'matrix' ? '#00f5d4' : '#f43f5e';
      ctx.shadowColor = gameTheme === 'matrix' ? '#00f5d4' : '#f43f5e';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(posX, posY, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Text status
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.fillText(`SCORE: ${score} | SPEED: ${dx.toFixed(1)}x`, 15, 25);

      posX += dx;
      posY += dy;

      if (posX + 10 > canvas.width || posX - 10 < 0) {
        dx = -dx;
        score += 10;
        setGameScore(score);
      }
      if (posY + 10 > canvas.height || posY - 10 < 0) {
        dy = -dy;
        score += 10;
        setGameScore(score);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [gameRunning, gameTheme]);

  // App Creation Handler
  const handleGenerateApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setIsBuilding(true);
    setTimeout(() => {
      const cleanUrl = urlInput.startsWith('http') ? urlInput : `https://${urlInput}`;
      const domainName = cleanUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
      const finalName = appNameInput.trim() || `${domainName.charAt(0).toUpperCase() + domainName.slice(1)} App`;
      const pkg = packageNameInput.trim() || `com.app.${domainName.replace(/[^a-z0-9]/g, '')}`;
      const slug = `${domainName.replace(/[^a-z0-9]/g, '-')}-app-${Date.now().toString().slice(-4)}`;
      const desc = descriptionInput.trim() || `High-performance standalone Android wrapper app for ${cleanUrl} built via Hackers শিক্ষক App Studio.`;

      const newApp: GeneratedAppItem = {
        id: `app-${Date.now()}`,
        slug,
        category: 'web-to-app',
        url: cleanUrl,
        appName: finalName,
        packageName: pkg,
        themeColor: selectedColor,
        iconName: selectedIcon,
        author: authorInput.trim() || 'Anonymous Developer',
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        downloadsCount: 1,
        rating: 5.0,
        description: desc,
        manifestCode: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="${pkg}">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="${finalName}"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.NoActionBar">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`,
        apkSize: `${(Math.random() * 1.5 + 3.2).toFixed(1)} MB`,
        status: 'Published',
        tags: ['ওয়েবসাইট অ্যাপ মেক', 'ওয়ার্ডপ্রেস ওয়েবসাইট অ্যাপ্লিকেশন মেক', 'Android App', domainName]
      };

      setAppsList([newApp, ...appsList]);
      setIsBuilding(false);
      setSelectedAppDetail(newApp);
      setActiveView('hub');
    }, 1200);
  };

  // Card Creation Handler
  const handleCreateCardItem = () => {
    const slug = `card-${cardName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}-${Date.now().toString().slice(-4)}`;
    const newCard: GeneratedAppItem = {
      id: `card-${Date.now()}`,
      slug,
      category: 'card-maker',
      url: cardQrUrl,
      appName: `${cardName} - ${cardTitle}`,
      packageName: `card.user.${slug}`,
      themeColor: cardTheme === 'neon-cyan' ? '#00f5d4' : cardTheme === 'purple-matrix' ? '#7c3aed' : '#f59e0b',
      iconName: 'CreditCard',
      author: cardName,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      downloadsCount: 1,
      rating: 5.0,
      description: `ডিজিটাল আইডি ও সাইবার পাস তৈরি হয়েছে। ব্যাজ: ${cardBadge}।`,
      manifestCode: JSON.stringify({ name: cardName, title: cardTitle, badge: cardBadge, qr: cardQrUrl }, null, 2),
      apkSize: 'Vector SVG',
      status: 'Published',
      tags: ['কার্ড মেক', 'Digital Pass', 'Cyber Card', 'ID Badge']
    };
    setAppsList([newCard, ...appsList]);
    setSelectedAppDetail(newCard);
    setActiveView('hub');
  };

  // Gift Box Creation Handler
  const handleCreateGiftItem = () => {
    const slug = `gift-${Date.now().toString().slice(-4)}`;
    const newGift: GeneratedAppItem = {
      id: `gift-${Date.now()}`,
      slug,
      category: 'gift-maker',
      url: `https://hackersshikkhok.com/gift/${slug}`,
      appName: `সারপ্রাইজ গিফট বক্স for ${giftRecipient}`,
      packageName: `gift.box.${slug}`,
      themeColor: '#f43f5e',
      iconName: 'Gift',
      author: 'Gift Creator',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      downloadsCount: 1,
      rating: 5.0,
      description: `গিফট বার্তা: "${giftMessage}" | গোপন ভাউচার কোড: ${giftVoucher}`,
      manifestCode: JSON.stringify({ recipient: giftRecipient, msg: giftMessage, voucher: giftVoucher }, null, 2),
      apkSize: 'Web Gift',
      status: 'Published',
      tags: ['গিফট মেক', 'Gift Box', 'Surprise Voucher', 'Voucher Code']
    };
    setAppsList([newGift, ...appsList]);
    setSelectedAppDetail(newGift);
    setActiveView('hub');
  };

  // Game Creation Handler
  const handleCreateGameItem = () => {
    const slug = `game-cyber-${Date.now().toString().slice(-4)}`;
    const newGame: GeneratedAppItem = {
      id: `game-${Date.now()}`,
      slug,
      category: 'game-maker',
      url: `https://hackersshikkhok.com/games/${slug}`,
      appName: 'Cyber Runner Mini-Game (Playable)',
      packageName: `game.canvas.${slug}`,
      themeColor: '#10b981',
      iconName: 'Gamepad2',
      author: 'Game Architect',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      downloadsCount: 1,
      rating: 5.0,
      description: 'HTML5 ক্যানভাস ভিত্তিক ফুল রেসপন্সিভ সাইবার আর্কেড গেম। এমবেড কোড ও অফলাইন প্লেয়ার সহ।',
      manifestCode: '<canvas id="cyberGame" width="400" height="300"></canvas>',
      apkSize: 'Canvas Game',
      status: 'Published',
      tags: ['গেম মেকিং', 'Mini Game', 'Canvas Game', 'Cyber Runner']
    };
    setAppsList([newGame, ...appsList]);
    setSelectedAppDetail(newGame);
    setActiveView('hub');
  };

  // Download Project ZIP / APK Text Package
  const handleDownloadApkPackage = (app: GeneratedAppItem) => {
    const content = `=== HACKERS SHIKKHOK PLATFORM HUB EXPORT ===
Item Title: ${app.appName}
Category: ${app.category}
Slug: /platform-hub/${app.category}/${app.slug}
Direct Target: ${app.url}
Package / ID: ${app.packageName}
Author: ${app.author}
Created At: ${app.createdAt}
Size / Asset Type: ${app.apkSize}

==================================================
1. ANDROID MANIFEST / CONFIGURATION METADATA
==================================================
${app.manifestCode}

==================================================
2. WORDPRESS INTEGRATION & SHORTCODES
==================================================
[hs_app_studio slug="${app.slug}"]
[hs_platform_center category="${app.category}"]

==================================================
3. HOW TO DEPLOY
==================================================
1. Import into Android Studio or WordPress Child Theme.
2. In Android Studio, open app/src/main/java/MainActivity.java and set WebView URL to "${app.url}".
3. Build Signed APK / AAB Bundle for Google Play Store release.
==================================================
Developed by Hackers শিক্ষক (https://hackersshikkhok.com)
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${app.slug}-export-bundle.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copy Slug Handler
  const handleCopySlug = (slug: string) => {
    const fullUrl = `https://hackersshikkhok.com/platform-center/#${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  // Filtered List
  const filteredApps = appsList.filter((app) => {
    const matchesCategory = activeCategory === 'all' || app.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery = 
      app.appName.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q) ||
      app.slug.toLowerCase().includes(q) ||
      app.packageName.toLowerCase().includes(q) ||
      app.author.toLowerCase().includes(q) ||
      app.tags.some(t => t.toLowerCase().includes(q)) ||
      (q.includes('ওয়েবসাইট') && app.tags.some(t => t.includes('ওয়েবসাইট'))) ||
      (q.includes('ওয়ার্ডপ্রেস') && app.tags.some(t => t.includes('ওয়ার্ডপ্রেস'))) ||
      (q.includes('কার্ড') && app.category === 'card-maker') ||
      (q.includes('গিফট') && app.category === 'gift-maker') ||
      (q.includes('গেম') && app.category === 'game-maker');

    return matchesCategory && matchesQuery;
  });

  return (
    <div id="platform-center-hub" className="bg-[#0b1120] border border-[#00f5d4]/30 rounded-2xl p-5 md:p-8 text-white space-y-6">
      
      {/* Top Banner & SEO H1 Headline */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#00f5d4]">
            <span className="px-2 py-0.5 rounded bg-[#00f5d4]/15 border border-[#00f5d4]/40 font-bold">
              🚀 MULTI-STUDIO PLATFORM CENTER HUB
            </span>
            <span>·</span>
            <span className="text-slate-400">স্লাগ ও ক্যাটাগরি ফিল্টারিং সিস্টেম</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-extrabold mt-1 tracking-tight">
            ওয়েবসাইট অ্যাপ মেক, ডিজিটাল কার্ড, গিফট ও গেম ক্রিয়েটর প্ল্যাটফর্ম
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            যেকোনো ওয়েবসাইটের লিংক দিয়ে ১ ক্লিকে অ্যান্ড্রয়েড অ্যাপ (APK/AAB), সাইবার আইডি কার্ড, অ্যানিমেটেড গিফট বক্স, এইচটিএমএল৫ মিনি গেম ও প্রফেশনাল ডিজাইন তৈরির পূর্ণাঙ্গ হাব।
          </p>
        </div>

        {/* View Switcher: Hub vs Creator Studio */}
        <div className="flex items-center gap-2 bg-[#050811] p-1.5 rounded-xl border border-slate-800 self-stretch sm:self-auto justify-center">
          <button
            onClick={() => setActiveView('hub')}
            className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeView === 'hub'
                ? 'bg-[#00f5d4] text-[#050811] shadow-[0_0_15px_rgba(0,245,212,0.4)]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> প্ল্যাটফর্ম গ্যালারি ({appsList.length})
          </button>
          <button
            onClick={() => setActiveView('generator')}
            className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeView === 'generator'
                ? 'bg-[#00f5d4] text-[#050811] shadow-[0_0_15px_rgba(0,245,212,0.4)]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> ক্রিয়েটর স্টুডিও খুলুন
          </button>
        </div>
      </div>

      {/* Global Search Bar with High-Intent Keyword Suggestions */}
      <div className="bg-[#050811] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#00f5d4] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="সার্চ করুন: 'ওয়েবসাইট অ্যাপ মেক', 'ওয়ার্ডপ্রেস ওয়েবসাইট অ্যাপ্লিকেশন মেক', 'কার্ড মেক', 'গিফট মেক', 'গেম মেকিং'..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#0b1120] border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00f5d4] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕ ক্লিয়ার
              </button>
            )}
          </div>

          <button
            onClick={() => {
              setActiveView('generator');
              setActiveStudioMode('web-to-app');
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-[#050811] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow hover:brightness-110 transition-all whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> নতুন আইটেম তৈরি করুন
          </button>
        </div>

        {/* Quick Trend Keywords Chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] pt-1">
          <span className="text-slate-400 flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#00f5d4]" /> জনপ্রিয় সার্চ:
          </span>
          {[
            { label: '🔥 ওয়েবসাইট অ্যাপ মেক', query: 'ওয়েবসাইট অ্যাপ মেক' },
            { label: '📱 ওয়ার্ডপ্রেস ওয়েবসাইট অ্যাপ্লিকেশন মেক', query: 'ওয়ার্ডপ্রেস ওয়েবসাইট অ্যাপ্লিকেশন মেক' },
            { label: '🎴 কার্ড মেক', query: 'কার্ড মেক' },
            { label: '🎁 গিফট মেক', query: 'গিফট মেক' },
            { label: '🎮 গেম মেকিং', query: 'গেম মেকিং' },
            { label: '🎨 ডিজাইনিং', query: 'ডিজাইনিং' }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setSearchQuery(item.query)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-[#00f5d4] transition-all cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'all', label: 'সব ক্যাটাগরি', icon: Layers, count: appsList.length },
          { id: 'web-to-app', label: '📱 ওয়েবসাইট অ্যাপ মেকার', icon: Smartphone, count: appsList.filter(a => a.category === 'web-to-app').length },
          { id: 'card-maker', label: '🎴 ডিজিটাল কার্ড মেকার', icon: CreditCard, count: appsList.filter(a => a.category === 'card-maker').length },
          { id: 'gift-maker', label: '🎁 ডিজিটাল গিফট মেকার', icon: Gift, count: appsList.filter(a => a.category === 'gift-maker').length },
          { id: 'game-maker', label: '🎮 মিনি গেম মেকিং', icon: Gamepad2, count: appsList.filter(a => a.category === 'game-maker').length },
          { id: 'design-maker', label: '🎨 ডিজাইনিং মেকার', icon: Palette, count: appsList.filter(a => a.category === 'design-maker').length }
        ].map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-[#00f5d4]/15 border-[#00f5d4] text-[#00f5d4]'
                  : 'bg-[#050811] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300">
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          VIEW A: CREATOR STUDIO (INTERACTIVE GENERATORS FOR ALL 5 CATEGORIES)
      ========================================================================== */}
      {activeView === 'generator' && (
        <div className="bg-[#050811] border border-slate-800 rounded-2xl p-5 md:p-6 space-y-6">
          
          {/* Studio Sub-Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#00f5d4] flex items-center gap-1">
                <Wand2 className="w-3.5 h-3.5" /> স্টুডিও মোড সিলেক্ট করুন:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'web-to-app', label: '📱 ওয়েবসাইট অ্যাপ মেক', icon: Smartphone },
                { id: 'card-maker', label: '🎴 কার্ড মেকার', icon: CreditCard },
                { id: 'gift-maker', label: '🎁 গিফট মেকার', icon: Gift },
                { id: 'game-maker', label: '🎮 গেম মেকিং', icon: Gamepad2 },
                { id: 'design-maker', label: '🎨 ডিজাইন মেকার', icon: Palette }
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setActiveStudioMode(st.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all border ${
                    activeStudioMode === st.id
                      ? 'bg-[#00f5d4] text-[#050811] border-[#00f5d4]'
                      : 'bg-[#0b1120] text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* 1. STUDIO MODE: WEBSITE TO ANDROID APP MAKER */}
          {activeStudioMode === 'web-to-app' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Form Controls */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-[#0b1120] p-4 rounded-xl border border-slate-800/80 space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#00f5d4]" /> ওয়েবসাইট / ওয়ার্ডপ্রেস টু অ্যান্ড্রয়েড অ্যাপ কনফিগ
                  </h3>
                  <p className="text-xs text-slate-400">
                    যেকোনো লাইভ ওয়েবসাইট অথবা ওয়ার্ডপ্রেস ব্লগের লিংক দিন। সিস্টেম স্বয়ংক্রিয়ভাবে একটি কমপ্লিট অ্যান্ড্রয়েড নেটিভ র‍্যাপার, মেনিফেস্ট এবং বিল্ড স্ক্রিপ্ট তৈরি করবে।
                  </p>
                </div>

                <form onSubmit={handleGenerateApp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      ওয়েবসাইট লিংক (Target URL) * <span className="text-[#00f5d4]">(যেমন: https://yourdomain.com)</span>
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://hackersshikkhok.com"
                        className="w-full pl-9 pr-3 py-2.5 bg-[#0b1120] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00f5d4]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">কাস্টম অ্যাপের নাম (App Name)</label>
                      <input
                        type="text"
                        value={appNameInput}
                        onChange={(e) => setAppNameInput(e.target.value)}
                        placeholder="যেমন: Hackers শিক্ষক Mobile"
                        className="w-full px-3 py-2.5 bg-[#0b1120] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00f5d4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">প্যাকেজ আইডি (Package Name)</label>
                      <input
                        type="text"
                        value={packageNameInput}
                        onChange={(e) => setPackageNameInput(e.target.value)}
                        placeholder="যেমন: com.company.app"
                        className="w-full px-3 py-2.5 bg-[#0b1120] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00f5d4]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">ডেভেলপার বা ব্র্যান্ডের নাম</label>
                      <input
                        type="text"
                        value={authorInput}
                        onChange={(e) => setAuthorInput(e.target.value)}
                        className="w-full px-3 py-2.5 bg-[#0b1120] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00f5d4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">প্রাইমারি থিম কালার</label>
                      <div className="flex items-center gap-2 pt-1">
                        {['#00f5d4', '#10b981', '#3b82f6', '#7c3aed', '#f43f5e', '#f59e0b'].map((col) => (
                          <button
                            key={col}
                            type="button"
                            onClick={() => setSelectedColor(col)}
                            className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-all ${
                              selectedColor === col ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.4)]' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: col }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Feature Toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <label className="flex items-center gap-2 p-3 rounded-xl bg-[#0b1120] border border-slate-800 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enableOfflineCache}
                        onChange={(e) => setEnableOfflineCache(e.target.checked)}
                        className="rounded accent-[#00f5d4]"
                      />
                      <span>অফলাইন ক্যাশিং ও সার্ভিস ওয়ার্কার সক্রিয় রাখুন</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 rounded-xl bg-[#0b1120] border border-slate-800 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enableAdMob}
                        onChange={(e) => setEnableAdMob(e.target.checked)}
                        className="rounded accent-[#00f5d4]"
                      />
                      <span>গুগল অ্যাডমব ব্যানার ও ইন্টারস্টিশিয়াল স্লট যোগ করুন</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isBuilding}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00f5d4] to-emerald-400 text-[#050811] font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,245,212,0.3)] hover:brightness-110 transition-all"
                  >
                    {isBuilding ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> অ্যান্ড্রয়েড প্রজেক্ট জেনারেট হচ্ছে...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" /> ইনস্ট্যান্ট অ্যান্ড্রয়েড অ্যাপ প্যাকেজ বিল্ড করুন
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Live Android Phone Mockup Simulator */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="w-[280px] h-[520px] bg-[#050811] border-4 border-slate-700 rounded-[36px] p-3 shadow-2xl relative flex flex-col overflow-hidden">
                  {/* Speaker & Camera Notch */}
                  <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-900 mr-2" />
                    <div className="w-8 h-1 rounded-full bg-slate-700" />
                  </div>

                  {/* Android Status Bar */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-2 py-0.5 border-b border-slate-800/60">
                    <span>12:00</span>
                    <span className="flex items-center gap-1">5G 📶 100% 🔋</span>
                  </div>

                  {/* App Header Bar in Simulator */}
                  <div 
                    className="p-2.5 rounded-xl mt-1 text-black font-bold text-xs flex items-center justify-between shadow"
                    style={{ backgroundColor: selectedColor }}
                  >
                    <span className="truncate">{appNameInput || 'My Android App'}</span>
                    <span className="text-[10px] opacity-80 font-mono">APK</span>
                  </div>

                  {/* Mock Browser/Webview Screen */}
                  <div className="flex-1 bg-[#0b1120] rounded-xl mt-2 p-3 border border-slate-800/80 flex flex-col items-center justify-center text-center space-y-2 overflow-hidden">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-black text-xl shadow"
                      style={{ backgroundColor: selectedColor }}
                    >
                      {(appNameInput || 'A').charAt(0)}
                    </div>
                    <div className="text-xs font-bold text-white truncate max-w-[200px]">
                      {appNameInput || 'Preview App'}
                    </div>
                    <div className="text-[10px] font-mono text-[#00f5d4] truncate max-w-[200px]">
                      {urlInput || 'https://yourwebsite.com'}
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-3">
                      ওয়েবসাইটটি মোবাইল ফ্রেন্ডলি মোডে মসৃণভাবে লোড হবে। অফলাইন ক্যাশ ও গুগল অ্যাডসেন্স/অ্যাডমব সাপোর্ট উপলব্ধ।
                    </p>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                      ✓ Ready for APK Compile
                    </span>
                  </div>

                  {/* Bottom Home Indicator */}
                  <div className="w-24 h-1 bg-slate-600 rounded-full mx-auto mt-2" />
                </div>
              </div>
            </div>
          )}

          {/* 2. STUDIO MODE: DIGITAL CARD MAKER */}
          {activeStudioMode === 'card-maker' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-[#0b1120] p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#00f5d4]" /> ডিজিটাল সাইবার কার্ড ও আইডি পাস মেকার
                  </h3>
                  <p className="text-xs text-slate-400">
                    স্টুডেন্ট, ডেভেলপার, বা এন্টারপ্রাইজ টিমের জন্য হোলোগ্রাফিক নিয়ন সাইবার আইডি কার্ড তৈরি করুন।
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">পূর্ণ নাম (Full Name)</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#0b1120] border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">পদবী ও ভূমিকা (Designation)</label>
                    <input
                      type="text"
                      value={cardTitle}
                      onChange={(e) => setCardTitle(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#0b1120] border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">ব্যাজ টাইপ</label>
                      <input
                        type="text"
                        value={cardBadge}
                        onChange={(e) => setCardBadge(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0b1120] border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">থিম স্টাইল</label>
                      <select
                        value={cardTheme}
                        onChange={(e) => setCardTheme(e.target.value as any)}
                        className="w-full px-3 py-2 bg-[#0b1120] border border-slate-800 rounded-xl text-xs text-white"
                      >
                        <option value="neon-cyan">নিয়ন সায়ান (Cyber)</option>
                        <option value="purple-matrix">পার্পল ম্যাট্রিক্স</option>
                        <option value="gold-elite">গোল্ড এলিট</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">কিউআর কোড টার্গেট লিংক</label>
                    <input
                      type="text"
                      value={cardQrUrl}
                      onChange={(e) => setCardQrUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0b1120] border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>

                  <button
                    onClick={handleCreateCardItem}
                    className="w-full py-2.5 rounded-xl bg-[#00f5d4] text-[#050811] font-bold text-xs cursor-pointer hover:brightness-110 shadow"
                  >
                    🎴 কার্ড প্রকাশ করুন ও গ্যালারিতে যোগ করুন
                  </button>
                </div>
              </div>

              {/* Live Interactive Card Preview */}
              <div className="lg:col-span-6 flex items-center justify-center p-4">
                <div 
                  className={`w-[340px] h-[200px] rounded-2xl p-5 border shadow-2xl relative flex flex-col justify-between overflow-hidden ${
                    cardTheme === 'neon-cyan'
                      ? 'bg-gradient-to-br from-[#0b1120] via-[#050811] to-[#042f2e] border-[#00f5d4]/60 text-white'
                      : cardTheme === 'purple-matrix'
                      ? 'bg-gradient-to-br from-[#1e1b4b] via-[#050811] to-[#3b0764] border-purple-500/60 text-white'
                      : 'bg-gradient-to-br from-[#1c1917] via-[#050811] to-[#451a03] border-amber-500/60 text-white'
                  }`}
                >
                  {/* Holographic Watermark Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-[#00f5d4] uppercase">
                      HACKERS SHIKKHOK · OFFICIAL PASS
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/10 border border-white/20">
                      {cardBadge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-black tracking-tight">{cardName}</h4>
                    <p className="text-xs text-slate-300 font-medium">{cardTitle}</p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-white/10 pt-2">
                    <div>
                      <span>ISSUED: 2026-10-11</span><br />
                      <span className="text-emerald-400">STATUS: VERIFIED & ACTIVE</span>
                    </div>
                    <div className="w-8 h-8 rounded bg-white p-0.5 flex items-center justify-center text-black font-extrabold text-[8px]">
                      QR SCAN
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. STUDIO MODE: DIGITAL GIFT MAKER */}
          {activeStudioMode === 'gift-maker' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-[#0b1120] p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#f43f5e]" /> ডিজিটাল অ্যানিমেটেড গিফট বক্স ও ভাউচার মেকার
                  </h3>
                  <p className="text-xs text-slate-400">
                    সারপ্রাইজ বার্তা ও সিক্রেট ভাউচার কোড দিয়ে বন্ধুদের জন্য অ্যানিমেটেড গিফট লিংক তৈরি করুন।
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">প্রাপকের নাম (Recipient)</label>
                    <input
                      type="text"
                      value={giftRecipient}
                      onChange={(e) => setGiftRecipient(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0b1120] border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">সারপ্রাইজ বার্তা (Secret Message)</label>
                    <textarea
                      rows={2}
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0b1120] border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">ডিসকাউন্ট ভাউচার কোড</label>
                    <input
                      type="text"
                      value={giftVoucher}
                      onChange={(e) => setGiftVoucher(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0b1120] border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>

                  <button
                    onClick={handleCreateGiftItem}
                    className="w-full py-2.5 rounded-xl bg-[#f43f5e] text-white font-bold text-xs cursor-pointer hover:brightness-110 shadow"
                  >
                    🎁 গিফট বক্স জেনারেট ও সেভ করুন
                  </button>
                </div>
              </div>

              {/* Live Interactive Gift Unboxing Simulator */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-[#0b1120] rounded-2xl border border-slate-800">
                <div 
                  onClick={() => setIsGiftOpened(!isGiftOpened)}
                  className="cursor-pointer text-center space-y-3 select-none"
                >
                  <div className={`w-28 h-28 mx-auto rounded-3xl flex items-center justify-center transition-all duration-500 shadow-2xl ${
                    isGiftOpened ? 'bg-gradient-to-r from-amber-400 to-rose-500 rotate-6 scale-110' : 'bg-gradient-to-r from-rose-500 to-pink-600 hover:scale-105'
                  }`}>
                    <Gift className={`w-14 h-14 text-white transition-transform ${isGiftOpened ? 'rotate-12' : ''}`} />
                  </div>
                  <span className="block text-xs font-mono text-[#00f5d4]">
                    {isGiftOpened ? '🎉 গিফট বক্স আনবক্সড!' : '👉 গিফট বক্সে ক্লিক করে ওপেন করুন'}
                  </span>
                </div>

                {isGiftOpened && (
                  <div className="mt-4 p-4 rounded-xl bg-[#050811] border border-rose-500/40 text-center space-y-2 animate-in fade-in max-w-sm">
                    <span className="text-xs font-bold text-rose-400">Dear {giftRecipient},</span>
                    <p className="text-xs text-slate-200">{giftMessage}</p>
                    <div className="p-2 rounded bg-rose-500/10 border border-rose-500/30 font-mono text-xs text-white">
                      ভাউচার কোড: <strong className="text-amber-400">{giftVoucher}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 4. STUDIO MODE: MINI GAME MAKER */}
          {activeStudioMode === 'game-maker' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-[#0b1120] p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4 text-[#10b981]" /> এইচটিএমএল৫ ক্যানভাস মিনি গেম স্টুডিও
                  </h3>
                  <p className="text-xs text-slate-400">
                    যেকোনো ওয়েবসাইটে এমবেডযোগ্য লাইভ ইন্টারঅ্যাক্টিভ আর্কেড গেম। কোড এক্সপোর্ট বা লাইভ প্লেয়ার।
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setGameRunning(!gameRunning)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                        gameRunning ? 'bg-rose-500 text-white' : 'bg-[#10b981] text-[#050811]'
                      }`}
                    >
                      {gameRunning ? '⏸ গেম পজ করুন' : '▶ গেম চালু করুন (Play)'}
                    </button>
                    <button
                      onClick={() => {
                        setGameTheme(gameTheme === 'matrix' ? 'cyberpunk' : 'matrix');
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300"
                    >
                      থিম: {gameTheme}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0b1120] border border-slate-800 text-xs font-mono text-slate-300">
                    <span>লাইভ স্কোর: <strong className="text-[#10b981]">{gameScore}</strong></span><br />
                    <span>ইঞ্জিন: 60 FPS HTML5 Canvas</span>
                  </div>

                  <button
                    onClick={handleCreateGameItem}
                    className="w-full py-2.5 rounded-xl bg-[#10b981] text-[#050811] font-bold text-xs cursor-pointer hover:brightness-110 shadow"
                  >
                    🎮 এই গেমটি পাবলিশ ও গ্যালারিতে যোগ করুন
                  </button>
                </div>
              </div>

              {/* Live Canvas Game Screen */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center p-3 bg-[#0b1120] rounded-2xl border border-slate-800">
                <canvas
                  ref={canvasRef}
                  width={380}
                  height={220}
                  className="rounded-xl border border-slate-800 w-full max-w-[380px] shadow-lg"
                />
                <span className="text-[10px] font-mono text-slate-500 mt-2">
                  Interactive HTML5 Canvas Arcade Engine · Responsive Web Ready
                </span>
              </div>
            </div>
          )}

          {/* 5. STUDIO MODE: DESIGNING MAKER */}
          {activeStudioMode === 'design-maker' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-[#0b1120] p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[#f59e0b]" /> সাইবার ব্যানার ও সোশাল থাম্বনেইল ডিজাইনার
                  </h3>
                  <p className="text-xs text-slate-400">
                    ইউটিউব থাম্বনেইল, ফেসবুক কভার বা কোডিং আর্টিকেলের জন্য প্রফেশনাল নিয়ন গ্রাফিক ব্যানার তৈরি করুন।
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">মেইন হেডিং (Primary Headline)</label>
                    <input
                      type="text"
                      value={bannerHeading}
                      onChange={(e) => setBannerHeading(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0b1120] border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">সাবটাইটেল (Subtitle)</label>
                    <input
                      type="text"
                      value={bannerSub}
                      onChange={(e) => setBannerSub(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0b1120] border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">ব্যাকগ্রাউন্ড প্যাটার্ন</label>
                    <select
                      value={bannerBg}
                      onChange={(e) => setBannerBg(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[#0b1120] border border-slate-800 rounded-xl text-xs text-white"
                    >
                      <option value="dark-grid">ডার্ক সাইবার গ্রিড</option>
                      <option value="neon-circuit">নিয়ন সার্কিট গ্লো</option>
                      <option value="cyber-gradient">ম্যাট্রিক্স গ্রেডিয়েন্ট</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Live Banner Canvas Preview */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-[380px] h-[210px] rounded-2xl bg-[#050811] border-2 border-[#f59e0b]/50 p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between text-[10px] font-mono text-amber-400">
                    <span>⚡ PRO CYBER GRAPHIC</span>
                    <span>HD 1920x1080</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-white tracking-tight drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                      {bannerHeading}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium">
                      {bannerSub}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800 pt-2">
                    <span>HackersShikkhok.com</span>
                    <span className="text-[#00f5d4]">100% Vector Ready</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* =========================================================================
          VIEW B: PUBLIC PLATFORM GALLERY & SEARCH RESULTS
      ========================================================================== */}
      {activeView === 'hub' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              দেখাচ্ছে {filteredApps.length} টি আইটেম (টোটাল {appsList.length})
            </span>
            <div className="text-xs text-[#00f5d4] flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" /> রিয়েল-টাইম সার্চ সিঙ্ক সক্রিয়
            </div>
          </div>

          {filteredApps.length === 0 ? (
            <div className="p-12 text-center bg-[#050811] rounded-2xl border border-slate-800 space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
              <h4 className="text-base font-bold text-white">কোনো ফলাফল পাওয়া যায়নি!</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                '{searchQuery}' এর জন্য কোনো আইটেম পাওয়া যায়নি। অন্য কোনো কিওয়ার্ড দিয়ে সার্চ করুন অথবা 'নতুন আইটেম তৈরি করুন' বাটনে ক্লিক করে তৈরি করুন।
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-[#00f5d4] cursor-pointer"
              >
                সব আইটেম রিসেট করুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="bg-[#050811] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-[#00f5d4]/50 transition-all shadow-lg group relative overflow-hidden"
                >
                  <div>
                    {/* Top Status & Category Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-black text-base shadow"
                          style={{ backgroundColor: app.themeColor }}
                        >
                          {app.appName.charAt(0)}
                        </div>
                        <div>
                          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300 uppercase block">
                            {app.category}
                          </span>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono">
                        ● {app.status}
                      </span>
                    </div>

                    {/* App Title & URL */}
                    <h4 className="text-base font-bold text-white group-hover:text-[#00f5d4] transition-colors line-clamp-1">
                      {app.appName}
                    </h4>

                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#00f5d4] hover:underline flex items-center gap-1 mt-1 truncate"
                    >
                      <Globe className="w-3 h-3 shrink-0" /> {app.url}
                    </a>

                    {/* Description */}
                    <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                      {app.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {app.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Technical Meta Card */}
                    <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] font-mono bg-[#0b1120] p-2.5 rounded-xl border border-slate-800/80">
                      <div>
                        <span className="text-slate-500 block text-[9px]">স্লাগ (Slug):</span>
                        <span className="text-slate-200 truncate block max-w-[120px]">
                          /{app.slug}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">ডাউনলোড / রেটিং:</span>
                        <span className="text-emerald-400 font-bold">
                          {app.apkSize} · ⭐ {app.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Buttons */}
                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="text-[10px] text-slate-400">
                      <span>By {app.author}</span><br />
                      <span>{app.downloadsCount.toLocaleString()} downloads</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopySlug(app.slug)}
                        title="স্লাগ কপি করুন"
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
                      >
                        {copiedSlug === app.slug ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => setSelectedAppDetail(app)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 cursor-pointer flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#00f5d4]" /> ভিউ
                      </button>

                      <button
                        onClick={() => handleDownloadApkPackage(app)}
                        className="px-3 py-1.5 rounded-lg bg-[#00f5d4] hover:bg-[#00f5d4]/90 text-[#050811] text-xs font-bold cursor-pointer flex items-center gap-1 shadow"
                      >
                        <Download className="w-3.5 h-3.5" /> ডাউনলোড
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Detailed Modal for Single App View */}
      {selectedAppDetail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b1120] border border-[#00f5d4]/40 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 text-white space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedAppDetail(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900 border border-slate-700 cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-black text-xl"
                style={{ backgroundColor: selectedAppDetail.themeColor }}
              >
                {selectedAppDetail.appName.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedAppDetail.appName}</h3>
                <span className="text-xs font-mono text-[#00f5d4]">
                  /{selectedAppDetail.category}/{selectedAppDetail.slug}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-[#050811] border border-slate-800 space-y-1">
                <span className="text-slate-500 font-mono block">টার্গেট লিংক:</span>
                <a
                  href={selectedAppDetail.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00f5d4] font-mono hover:underline flex items-center gap-1"
                >
                  {selectedAppDetail.url} <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <span className="text-slate-500 font-mono block mb-1">বর্ণনা:</span>
                <p className="bg-[#050811] p-3 rounded-xl border border-slate-800 leading-relaxed">
                  {selectedAppDetail.description}
                </p>
              </div>

              <div>
                <span className="text-slate-500 font-mono block mb-1">মেনিফেস্ট ও কনফিগারেশন কোড:</span>
                <pre className="bg-[#050811] border border-slate-800 p-3 rounded-xl text-[11px] font-mono text-[#00f5d4] overflow-x-auto max-h-48">
                  {selectedAppDetail.manifestCode}
                </pre>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-400 font-mono">
                লেখক: {selectedAppDetail.author} | ডাউনলোড: {selectedAppDetail.downloadsCount}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopySlug(selectedAppDetail.slug)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white cursor-pointer"
                >
                  স্লাগ লিংক কপি করুন
                </button>
                <button
                  onClick={() => handleDownloadApkPackage(selectedAppDetail)}
                  className="px-4 py-2 rounded-xl bg-[#00f5d4] text-[#050811] font-bold text-xs cursor-pointer hover:brightness-110 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> প্যাকেজ ডাউনলোড করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEO & AdSense Compliant Q&A Article Block (High Search Intent) */}
      <div className="bg-[#050811] border border-slate-800/80 rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <HelpCircle className="w-4 h-4 text-[#00f5d4]" />
          <span>কীভাবে ওয়েবসাইট ও ওয়ার্ডপ্রেস থেকে অ্যান্ড্রয়েড অ্যাপ মেক করবেন? (সম্পূর্ণ বাংলা গাইড)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-[#0b1120] border border-slate-800 space-y-1.5">
            <span className="font-bold text-[#00f5d4] block">১. ওয়েবসাইটের লিংক দিন</span>
            <p className="text-slate-400 leading-relaxed">
              আপনার ওয়ার্ডপ্রেস বা কাস্টম ওয়েবসাইটের ইউআরএল দিন। প্ল্যাটফর্ম সেন্টার স্বয়ংক্রিয়ভাবে মেটাডাটা ও আইকন ডিটেক্ট করবে।
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0b1120] border border-slate-800 space-y-1.5">
            <span className="font-bold text-[#00f5d4] block">২. কনফিগারেশন ও বিল্ড</span>
            <p className="text-slate-400 leading-relaxed">
              প্যাকেজ নেম, থিম কালার ও পারমিশন সেট করুন। সিস্টেম তাৎক্ষণিকভাবে Android Studio রেডি প্রজেক্ট তৈরি করবে।
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0b1120] border border-slate-800 space-y-1.5">
            <span className="font-bold text-[#00f5d4] block">৩. APK রিলিজ ও পাবলিশ</span>
            <p className="text-slate-400 leading-relaxed">
              ডাউনলোডকৃত বান্ডিল দিয়ে গুগল প্লে কনসোলে সরাসরি AAB/APK আপলোড করে লাইভ পাবলিশ করা সম্ভব।
            </p>
          </div>
        </div>

        <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2">
          <span>🛡️ ১০০% ক্লায়েন্ট-সাইড নিরাপদ ও প্রিমিয়াম ওয়ার্ডপ্রেস প্লাগইন ও থিম সামঞ্জস্যপূর্ণ।</span>
          <span>Official Domain: <a href="https://hackersshikkhok.com" target="_blank" rel="noopener noreferrer" className="text-[#00f5d4] hover:underline">hackersshikkhok.com</a></span>
        </div>
      </div>

    </div>
  );
}
