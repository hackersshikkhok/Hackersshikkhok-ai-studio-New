import React, { useState } from 'react';
import {
  PLATFORM_CENTERS,
  THEME_COLOR_PRESETS,
  PlatformCenter
} from './data/platformData';
import {
  INITIAL_VIRTUAL_FILES,
  VirtualFile,
  generateAndDownloadZip
} from './data/wpVirtualFiles';
import { CssRgbNeonLab } from './components/CssRgbNeonLab';
import { LiveDemoPlayground } from './components/LiveDemoPlayground';
import { DeveloperToolsLab } from './components/DeveloperToolsLab';
import { WpPackageStudio } from './components/WpPackageStudioModal';
import { AutopilotAndArchitectureHub } from './components/AutopilotAndArchitectureHub';
import { WpInstalledPreviewShowcase } from './components/WpInstalledPreviewShowcase';
import { CreatorStudioDeviceLabAndGames } from './components/CreatorStudioDeviceLabAndGames';
import { UniversalSocialAndUserHub } from './components/UniversalSocialAndUserHub';
import { EcosystemExpansionAndAudit114 } from './components/EcosystemExpansionAndAudit114';
import { NativeMasterSpecHub } from './components/NativeMasterSpecHub';
import { CyberAcademyAndLmsHub } from './components/CyberAcademyAndLmsHub';
import { MasterCyberAcademyEngineHub } from './components/MasterCyberAcademyEngineHub';
import { EngineeringCompletionAndHardeningHub } from './components/EngineeringCompletionAndHardeningHub';
import { CyberCommandCenterPortal } from './components/CyberCommandCenterPortal';
import { WpAppGeneratorStudioHub } from './components/WpAppGeneratorStudioHub';
import {
  AuthorityPagesAndLegalHubModal,
  AuthorityPageKey
} from './components/AuthorityPagesAndLegalHubModal';
import {
  Search,
  CheckCircle2,
  FolderGit2,
  X,
  Send,
  Palette
} from 'lucide-react';

export default function App() {
  const [virtualFiles, setVirtualFiles] = useState<VirtualFile[]>(INITIAL_VIRTUAL_FILES);
  const [activeBottomTab, setActiveBottomTab] = useState<'home' | 'dashboard' | 'maya' | 'tools-lab' | 'profile'>('home');
  const [selectedCenter, setSelectedCenter] = useState<PlatformCenter>(PLATFORM_CENTERS[0]);
  const [centerCategoryFilter, setCenterCategoryFilter] = useState<string>('all');
  const [globalSearch, setGlobalSearch] = useState('');
  const [walletBalance, setWalletBalance] = useState<number>(35.5);
  const [walletPoints, setWalletPoints] = useState<number>(420);
  const [activePresetId, setActivePresetId] = useState<string>('rgb-cyber');
  const [zipToast, setZipToast] = useState<string | null>(null);
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | null>(null);
  const [authorityModalPage, setAuthorityModalPage] = useState<AuthorityPageKey | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [notifications, setNotifications] = useState<string[]>([
    '1.  and  (with screenshot and icon assets) ready for download.',
    '2. Universal Social, Follow, Deep-Linked Comments, Private Messaging and Report systems active.',
    '3. Geographic profile mapping and strict separation of Monetary Wallet (BDT) vs Non-monetary Points online.',
    '4. Sandboxed live demo engine passed CSP, Zip-Slip, and cookie isolation integrity verification.'
  ]);

  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'maya'; text: string; time: string }>>([
    {
      sender: 'maya',
      text: 'Welcome to HackersShikkhok (HackersShikkhok.com) v4.0 Complete Ecosystem! I am Maya (✨). Click the Theme or Plugin download buttons above to download verified production packages anytime.',
      time: 'Just now'
    },
    {
      sender: 'maya',
      text: 'Our 28 Platform Centers, 18 AI Autopilots, 15 CSS/RGB Neon Generators, and 2,024+ Developer & Security Tools are 100% operational in your browser.',
      time: 'Just now'
    }
  ]);

  const showToastAndNotify = (msg: string) => {
    setZipToast(msg);
    setNotifications((prev) => [`• ${msg}`, ...prev.slice(0, 7)]);
    setTimeout(() => setZipToast(null), 4000);
  };

  const handleEarnPoints = (pts: number, reason: string) => {
    setWalletPoints((p) => p + pts);
    showToastAndNotify(reason);
  };

  const handleUpdateVirtualFile = (path: string, newContent: string) => {
    setVirtualFiles((prev) =>
      prev.map((f) =>
        f.path === path
          ? { ...f, content: newContent, updatedAt: new Date().toISOString().slice(0, 10) }
          : f
      )
    );
  };

  const handleAddVirtualFile = (newFile: VirtualFile) => {
    setVirtualFiles((prev) => {
      const exists = prev.some((f) => f.path === newFile.path);
      if (exists) {
        return prev.map((f) => (f.path === newFile.path ? newFile : f));
      }
      return [...prev, newFile];
    });
    showToastAndNotify(`New file added: ${newFile.path}`);
  };

  const handleDownloadZip = async (pkg: 'theme' | 'core' | 'docs' | 'all') => {
    if (pkg === 'theme' || pkg === 'core') {
      const fileName = pkg === 'core' ? 'hackersshikkhok-core.zip' : 'hackersshikkhok-theme.zip';
      try {
        const resp = await fetch(`/downloads/${fileName}`);
        if (resp.ok) {
          const blob = await resp.blob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          const sizeKb = (blob.size / 1024).toFixed(1);
          showToastAndNotify(
            `Download started: ${fileName} (${sizeKb} KB —   , cPanel  WordPress )`
          );
          return;
        }
      } catch (err) {
        console.warn('Fallback to browser dynamic rezip:', err);
      }
    }

    const info = await generateAndDownloadZip(virtualFiles, pkg);
    const sizeKb = (info.sizeBytes / 1024).toFixed(1);
    showToastAndNotify(
      `Download started: ${info.fileName} (${info.fileCount}  · ${sizeKb} KB — Dynamic Auto-Rezip)`
    );
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: new Date().toLocaleTimeString() },
      {
        sender: 'maya',
        text: `"${userMsg}"  HackersShikkhok Core Engine- ,  ,       ।    WP Studio     ZIP   !`,
        time: new Date().toLocaleTimeString()
      }
    ]);
    setChatInput('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCenters = PLATFORM_CENTERS.filter((c) => {
    const matchesCat = centerCategoryFilter === 'all' || c.category === centerCategoryFilter;
    const matchesSearch =
      !globalSearch.trim() ||
      c.nameBn.includes(globalSearch) ||
      c.nameEn.toLowerCase().includes(globalSearch.toLowerCase()) ||
      c.descriptionBn.includes(globalSearch);
    return matchesCat && matchesSearch;
  });

  const themeFileCount = virtualFiles.filter((f) => f.package === 'theme').length;
  const coreFileCount = virtualFiles.filter((f) => f.package === 'core').length;
  const docsFileCount = virtualFiles.filter((f) => f.package === 'docs').length;

  return (
    <div className="min-h-screen w-full bg-[#050811] text-[#e2e8f0] flex flex-col pb-24 selection:bg-[#00f5d4]/30 selection:text-[#00f5d4]">
      {/* =====================================================================
          1. TOP LIVE NOTICE BAR (🔴  )
      ====================================================================== */}
      <div className="w-full bg-gradient-to-r from-[#0b1120] via-[#111827] to-[#0b1120] border-b border-[#00f5d4]/25 px-3 sm:px-6 py-2">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="px-2.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/50 text-rose-300 font-bold whitespace-nowrap shrink-0">
              🔴  
            </span>
            <p className="text-slate-200 truncate">
              <strong>HackersShikkhok</strong> (HackersShikkhok.com) v4.0 Complete Ecosystem —  ,  AI -, ,  ,      Auto-Rezip   !
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsStudioModalOpen(true)}
              className="text-[#00f5d4] hover:underline font-mono text-xs flex items-center gap-1 cursor-pointer"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>WP    ZIP  ({virtualFiles.length} Files)</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <button
              onClick={() => handleDownloadZip('docs')}
              className="text-emerald-400 hover:underline font-mono text-xs hidden sm:inline cursor-pointer"
            >
              📚 Docs Zip ({docsFileCount}) 📥
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. MAIN HEADER BAR
             - Left: Logo & HackersShikkhok (hackersshikkhok.com)
             - Center: Wide Navigation Menu + Stacked Download Buttons:
               * 🛡️ Theme (Theme Zip) 📥
               * ⚙️ Plugin (Engine Zip) 🔌
             - Right: Register & Login Buttons
      ====================================================================== */}
      <header className="sticky top-0 z-40 w-full bg-[#050811]/95 backdrop-blur-md border-b border-[#00f5d4]/20 px-3 sm:px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Left: Official Brand Logo & HackersShikkhok */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setActiveBottomTab('home');
                setSelectedCenter(PLATFORM_CENTERS[0]);
              }}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f5d4] to-[#7c3aed] p-[2px] shadow-[0_0_20px_rgba(0,245,212,0.3)]">
                <div className="w-full h-full bg-[#050811] rounded-[10px] flex items-center justify-center font-mono font-extrabold text-[#00f5d4] text-base">
                  HS
                </div>
              </div>
              <div>
                <span className="block text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-[#00f5d4] transition-colors">
                  HackersShikkhok <span className="text-xs font-mono text-slate-400 font-normal">· hackersshikkhok.com</span>
                </span>
                <span className="block text-[11px] font-mono text-[#00f5d4]">
                  @HackersShikkhok · v4.0 Cyber &amp; Coding Ecosystem
                </span>
              </div>
            </button>
          </div>

          {/* Center: Wide Navigation Menu + Vertically Stacked Theme & Plugin Zip Download Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 flex-1">
            <nav className="hidden xl:flex items-center gap-4 text-xs font-semibold text-slate-300">
              <button
                onClick={() => {
                  setActiveBottomTab('home');
                  setSelectedCenter(PLATFORM_CENTERS[0]);
                }}
                className={`hover:text-[#00f5d4] transition-colors cursor-pointer whitespace-nowrap ${
                  activeBottomTab === 'home' ? 'text-[#00f5d4]' : ''
                }`}
              >
                Home (28 Centers)
              </button>
              <button
                onClick={() => {
                  setActiveBottomTab('home');
                  setSelectedCenter(PLATFORM_CENTERS.find((c) => c.slug === 'cyber') || PLATFORM_CENTERS[2]);
                }}
                className="hover:text-[#00f5d4] transition-colors cursor-pointer whitespace-nowrap"
              >
                Cyber Academy
              </button>
              <button
                onClick={() => setActiveBottomTab('tools-lab')}
                className={`hover:text-[#00f5d4] transition-colors cursor-pointer whitespace-nowrap ${
                  activeBottomTab === 'tools-lab' ? 'text-[#00f5d4]' : ''
                }`}
              >
                2,024+ Pro Tools Lab
              </button>
              <button
                onClick={() => setActiveBottomTab('profile')}
                className={`hover:text-[#00f5d4] transition-colors cursor-pointer whitespace-nowrap ${
                  activeBottomTab === 'profile' ? 'text-[#00f5d4]' : ''
                }`}
              >
                Social & Profile Hub
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('platform-center-hub');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-[#050811] font-bold transition-all cursor-pointer whitespace-nowrap"
              >
                🚀 Platform & App Maker
              </button>
              <button
                onClick={() => {
                  const cc = PLATFORM_CENTERS.find((c) => c.slug === 'cyber-command');
                  if (cc) setSelectedCenter(cc);
                  document.getElementById('cyber-command-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-2.5 py-1 rounded-lg bg-[#00f5d4]/15 border border-[#00f5d4]/40 text-[#00f5d4] hover:bg-[#00f5d4] hover:text-[#050811] font-bold transition-all cursor-pointer whitespace-nowrap"
              >
                🛡️ Cyber Command B2B
              </button>
              <button
                onClick={() => setAuthorityModalPage('services')}
                className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/40 text-purple-300 hover:bg-purple-500 hover:text-white font-bold transition-all cursor-pointer whitespace-nowrap"
              >
                ⚖️ Services, Legal & AI Hub
              </button>
              <button
                onClick={() => setIsStudioModalOpen(true)}
                className="hover:text-[#00f5d4] transition-colors cursor-pointer whitespace-nowrap"
              >
                WP Code Studio
              </button>
            </nav>

            {/* Vertically Stacked Download Buttons (-   ) */}
            <div className="flex flex-col gap-1.5 min-w-[245px] sm:min-w-[270px]">
              <button
                onClick={() => handleDownloadZip('theme')}
                title="Click to dynamically package and download hackersshikkhok-theme.zip (with screenshot.png)"
                className="w-full px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#00f5d4] to-[#10b981] hover:opacity-95 text-[#050811] font-extrabold text-xs flex items-center justify-between gap-2 shadow-[0_0_15px_rgba(0,245,212,0.3)] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>🛡️ Theme (Theme Zip)</span>
                <span className="font-mono text-[11px] bg-[#050811]/20 px-1.5 py-0.5 rounded">
                  {themeFileCount + 2} files 📥
                </span>
              </button>

              <button
                onClick={() => handleDownloadZip('core')}
                title="Click to dynamically package and download hackersshikkhok-core.zip (with icon & banner PNGs)"
                className="w-full px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#6366f1] hover:opacity-95 text-white font-extrabold text-xs flex items-center justify-between gap-2 shadow-[0_0_15px_rgba(124,58,237,0.35)] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>⚙️ Plugin (Engine Zip)</span>
                <span className="font-mono text-[11px] bg-black/25 px-1.5 py-0.5 rounded">
                  {coreFileCount + 2} files 🔌
                </span>
              </button>

              <button
                onClick={() => handleDownloadZip('docs')}
                title="Click to download Developer Documentation & System Architecture Guide (.zip)"
                className="w-full px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-[#050811] font-extrabold text-xs flex items-center justify-between gap-2 shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>📚 Dev Docs &amp; Architecture</span>
                <span className="font-mono text-[11px] bg-[#050811]/20 px-1.5 py-0.5 rounded">
                  {docsFileCount} docs 📥
                </span>
              </button>
            </div>
          </div>

          {/* Right: Register  Login  */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setAuthModalMode('register')}
              className="px-3.5 py-2 rounded-lg bg-[#0b1120] hover:bg-slate-800 text-[#00f5d4] border border-[#00f5d4]/40 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
            >
              Register
            </button>
            <button
              onClick={() => setAuthModalMode('login')}
              className="px-4 py-2 rounded-lg bg-[#00f5d4] hover:bg-[#00f5d4]/90 text-[#050811] text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          3. SUB-HEADER WALLET BAR (👛 Balance: 35.5  | 420 Points), NOTIFICATION (🔔) & THEME PRESET
      ====================================================================== */}
      <div className="w-full bg-[#0b1120]/90 border-b border-slate-800/90 px-3 sm:px-6 py-2.5">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Wallet Bar & Notification Icon */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="px-3.5 py-1.5 rounded-xl bg-[#050811] border border-[#00f5d4]/30 flex items-center gap-2 text-xs font-mono">
              <span>👛 Balance:</span>
              <strong className="text-[#00f5d4]" title="Monetary Balance (BDT)">{walletBalance.toFixed(1)} </strong>
              <span className="text-slate-600">|</span>
              <strong className="text-amber-400" title="Non-Monetary Learning & Engagement Points">{walletPoints} Points</strong>
              <button
                onClick={() => {
                  handleEarnPoints(10, 'Learning checkpoint bonus +10 Points awarded!');
                }}
                className="ml-1 px-2 py-0.5 rounded bg-[#00f5d4]/15 hover:bg-[#00f5d4]/25 text-[#00f5d4] text-[11px] font-sans font-bold cursor-pointer"
                title="Add learning checkpoint bonus points"
              >
                +Points
              </button>
            </div>

            <button
              onClick={() => setIsNotifOpen((n) => !n)}
              className="px-3 py-1.5 rounded-xl bg-[#050811] hover:bg-slate-900 border border-slate-800 text-xs flex items-center gap-1.5 cursor-pointer relative"
              aria-label="Notifications"
            >
              <span>🔔</span>
              <span className="font-mono text-[11px] text-[#00f5d4] font-bold">{notifications.length}</span>
            </button>

            <button
              onClick={() => setIsStudioModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#7c3aed]/20 hover:bg-[#7c3aed]/30 border border-[#7c3aed]/50 text-purple-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-[#00f5d4]" />
              <span>Customize Theme & Plugin Files (Auto-Rezip)</span>
            </button>

            {/* 10 Theme Presets Selector */}
            <div className="hidden md:flex items-center gap-1.5 bg-[#050811] border border-slate-800 rounded-xl px-2.5 py-1 text-xs">
              <Palette className="w-3.5 h-3.5 text-[#00f5d4]" />
              <select
                value={activePresetId}
                onChange={(e) => {
                  setActivePresetId(e.target.value);
                  const found = THEME_COLOR_PRESETS.find((p) => p.id === e.target.value);
                  if (found) {
                    document.documentElement.style.setProperty('--hs-primary', found.primary);
                    document.documentElement.style.setProperty('--hs-secondary', found.secondary);
                    showToastAndNotify(`Theme color preset updated: ${found.name}`);
                  }
                }}
                aria-label="Theme Color Preset"
                className="bg-transparent text-slate-200 font-mono text-[11px] focus:outline-none cursor-pointer"
              >
                {THEME_COLOR_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id} className="bg-[#050811] text-white">
                    Preset: {preset.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Global Instant Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search 28 Centers, Code, Tools, Courses or Users..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#050811] border border-slate-800 text-xs text-white focus:outline-none focus:border-[#00f5d4]"
            />
          </div>
        </div>
      </div>

      {/* Live Toast Notification when ZIP is downloaded or updated */}
      {zipToast && (
        <div className="fixed top-20 right-5 z-50 bg-[#0b1120] border-2 border-[#00f5d4] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 max-w-md">
          <CheckCircle2 className="w-5 h-5 text-[#00f5d4] shrink-0" />
          <div className="text-xs font-medium">{zipToast}</div>
        </div>
      )}

      {/* Notification Dropdown Panel */}
      {isNotifOpen && (
        <div className="max-w-[1600px] mx-auto w-full px-3 sm:px-6 mt-2">
          <div className="bg-[#0b1120] border border-[#00f5d4]/30 rounded-xl p-4 flex flex-col gap-2 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <strong className="text-[#00f5d4]">🔔 Universal Notification Center (Deduplicated & Deep-Linked)</strong>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setNotifications(['• All notifications marked as read.'])}
                  className="text-xs text-[#00f5d4] hover:underline cursor-pointer"
                >
                  Mark All Read
                </button>
                <button onClick={() => setIsNotifOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                  Close ✕
                </button>
              </div>
            </div>
            {notifications.map((n, idx) => (
              <div key={idx} className="text-slate-300">
                {n}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          4. MAIN FULL-SCREEN CONTENT WORKSPACE
      ====================================================================== */}
      <main className="max-w-[1600px] w-full mx-auto px-3 sm:px-6 py-6 space-y-8 flex-1">
        {/* HERO BANNER CARD */}
        <section className="relative rounded-2xl bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#050811] border border-[#00f5d4]/30 p-6 md:p-8 overflow-hidden shadow-[0_0_50px_rgba(0,245,212,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f5d4] bg-[#00f5d4]/10 border border-[#00f5d4]/30 px-3 py-1 rounded-md">
                <span>OFFICIAL BRAND: HACKERSSHIKKHOK</span>
                <span>·</span>
                <span>HACKERSSHIKKHOK.COM</span>
                <span>·</span>
                <span>@HACKERSSHIKKHOK</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                HackersShikkhok — Cyber Defense Academy, Ethical Hacking, Live Code Lab & WordPress Ecosystem (v4.0)
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Our custom WordPress theme (hackersshikkhok-theme.zip) and core engine (hackersshikkhok-core.zip) include high-resolution assets (screenshot.png, icon-256x256.png, banner-772x250.png), complete documentation, and the full production-ready v4.0 ecosystem.
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleDownloadZip('theme')}
                  className="px-4 py-2.5 rounded-xl bg-[#00f5d4] hover:bg-[#00f5d4]/90 text-[#050811] font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,245,212,0.35)] cursor-pointer"
                >
                  🛡️ Download Theme Zip ({themeFileCount + 2} Files) 📥
                </button>
                <button
                  onClick={() => handleDownloadZip('core')}
                  className="px-4 py-2.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.35)] cursor-pointer"
                >
                  ⚙️ Download Plugin Zip ({coreFileCount + 2} Files) 🔌
                </button>
                <button
                  onClick={() => setIsStudioModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#050811] hover:bg-slate-900 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                >
                  <FolderGit2 className="w-4 h-4 text-[#00f5d4]" />
                  <span>File Update & Customizer Studio</span>
                </button>
                <a
                  href="#cyber-academy-lms-hub"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                >
                  🎓 Cyber Academy   (LMS)
                </a>
                <a
                  href="#engineering-hardening-hub"
                  className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                >
                  🛡️ Engineering Hardening & Gap Audit
                </a>
              </div>
            </div>

            {/* Hero Right Architecture Metrics */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-[#050811]/90 border border-slate-800">
                <div className="text-2xl font-extrabold font-mono text-[#00f5d4]">28</div>
                <div className="text-xs text-slate-300 font-semibold mt-0.5">Ecosystem Centers</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Dedicated Center UIs</div>
              </div>
              <div className="p-4 rounded-xl bg-[#050811]/90 border border-slate-800">
                <div className="text-2xl font-extrabold font-mono text-purple-400">18</div>
                <div className="text-xs text-slate-300 font-semibold mt-0.5">AI Autopilots</div>
                <div className="text-[11px] text-slate-400 mt-0.5">100-Pt Quality Gate</div>
              </div>
              <div className="p-4 rounded-xl bg-[#050811]/90 border border-slate-800">
                <div className="text-2xl font-extrabold font-mono text-emerald-400">10 / 8 / 21</div>
                <div className="text-xs text-slate-300 font-semibold mt-0.5">CPTs · Tax · DB Tables</div>
                <div className="text-[11px] text-slate-400 mt-0.5">PHP 8.2+ Prepared SQL</div>
              </div>
              <div className="p-4 rounded-xl bg-[#050811]/90 border border-slate-800">
                <div className="text-2xl font-extrabold font-mono text-amber-400">15 + 64</div>
                <div className="text-xs text-slate-300 font-semibold mt-0.5">RGB Lab &amp; All Tools</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Browser &amp; Sandboxed</div>
              </div>
            </div>
          </div>
        </section>

        {/* WORDPRESS INSTALLED THEME & PLUGIN PREVIEW WITH PREMIUM IMAGES, DESCRIPTION & AUTHOR METADATA */}
        <WpInstalledPreviewShowcase
          onDownloadPackage={handleDownloadZip}
          themeFileCount={themeFileCount}
          coreFileCount={coreFileCount}
        />

        {/* 7-MODULE MASTER SPECIFICATION & AUTONOMOUS CYBER ACADEMY ENGINE */}
        <MasterCyberAcademyEngineHub />

        {/* COMPLETE PROFESSIONAL CYBERSECURITY ACADEMY & LEARNING SYSTEM (SECTIONS 0-154) */}
        <CyberAcademyAndLmsHub
          onEarnPoints={handleEarnPoints}
          onNotify={showToastAndNotify}
        />

        {/* NATIVE MASTER SPECIFICATION SUITE (CLASSIC EDITOR, NATIVE SEO/SITEMAP, GA4/ADSENSE, BRANDED EMAIL & AUTH/READER UX) */}
        <NativeMasterSpecHub />

        {/* FINAL ENGINEERING COMPLETION, 360° INVENTORY, BACKUP & HARDENING HUB */}
        <EngineeringCompletionAndHardeningHub />

        {/* FINAL 1-TO-114 EVIDENCE MATRIX, SOCIAL PUBLISHING, TREND INTELLIGENCE, 11 FACTORIES & RELATED/TOOL HEALTH */}
        <EcosystemExpansionAndAudit114 onNotify={showToastAndNotify} />

        {/* CONDITIONAL VIEW BY BOTTOM 5-TAB BAR OR ACTIVE WORKSPACE */}
        {activeBottomTab === 'dashboard' && (
          <section className="bg-[#0b1120] border border-[#00f5d4]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs font-mono text-[#00f5d4]">USER &amp; ADMIN WORKSPACE DASHBOARD · HACKERSSHIKKHOK</div>
                <h2 className="text-2xl font-bold text-white mt-1">
                  User Dashboard, Wallet Ledger, Rank & Project Control
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadZip('all')}
                  className="px-4 py-2 rounded-xl bg-[#00f5d4] text-[#050811] font-bold text-xs cursor-pointer"
                >
                  📦 Download Full Bundle (Theme + Plugin + Docs)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#050811] border border-slate-800">
                <span className="text-xs text-slate-400">Monetary Wallet Balance (BDT)</span>
                <div className="text-2xl font-bold font-mono text-[#00f5d4] mt-1">{walletBalance.toFixed(1)} </div>
                <span className="text-[11px] text-slate-400">Separate from Points Ledger</span>
              </div>
              <div className="p-4 rounded-xl bg-[#050811] border border-slate-800">
                <span className="text-xs text-slate-400">Learning & Activity Points</span>
                <div className="text-2xl font-bold font-mono text-amber-400 mt-1">{walletPoints} Points</div>
                <span className="text-[11px] text-slate-400">Rank: Cyber Defender Lvl {Math.floor(walletPoints / 100) + 1}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#050811] border border-slate-800">
                <span className="text-xs text-slate-400">  (`hackersshikkhok-theme`)</span>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{themeFileCount + 2} Files</div>
                <span className="text-[11px] text-slate-400">Includes screenshot.png</span>
              </div>
              <div className="p-4 rounded-xl bg-[#050811] border border-slate-800">
                <span className="text-xs text-slate-400">  (`hackersshikkhok-core`)</span>
                <div className="text-2xl font-bold font-mono text-purple-400 mt-1">{coreFileCount + 2} Files</div>
                <span className="text-[11px] text-slate-400">Includes Icon &amp; Banner PNG</span>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            5. 28 PLATFORM CENTERS DIRECTORY & INTERACTIVE SWITCHER
        ====================================================================== */}
        <section className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-[#00f5d4]">
                28 SPECIALIZED PLATFORM CENTERS · MODULAR ARCHITECTURE · HACKERSSHIKKHOK
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
                28 Platform Centers (Click Any Center to Inspect & Launch)
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {(['all', 'core', 'learning', 'labs', 'utility', 'community', 'creator'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCenterCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase cursor-pointer ${
                    centerCategoryFilter === cat
                      ? 'bg-[#00f5d4] text-[#050811] font-bold'
                      : 'bg-[#050811] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of 28 Centers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-5">
            {filteredCenters.map((center, index) => {
              const isSelected = selectedCenter.id === center.id;
              return (
                <button
                  key={center.id}
                  onClick={() => setSelectedCenter(center)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#00f5d4]/10 border-[#00f5d4] shadow-[0_0_20px_rgba(0,245,212,0.15)]'
                      : 'bg-[#050811] border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                      <span>
                        {String(index + 1).padStart(2, '0')}. {center.route}
                      </span>
                      <span className="text-[#00f5d4]">{center.featuredMetric}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1.5">{center.nameBn}</h3>
                    <div className="text-xs text-slate-400 font-medium">{center.nameEn}</div>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {center.descriptionBn}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-3 mt-3 border-t border-slate-800/80">
                    <span>{center.itemCount} Resources</span>
                    <span>{center.autopilotEnabled ? '🤖 Autopilot Active' : '⚡ Core Direct'}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Selected Center Spotlight Bar */}
          <div className="mt-5 p-4 rounded-xl bg-[#050811] border border-[#00f5d4]/30 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#00f5d4]">
                ACTIVE CENTER INSPECTOR · {selectedCenter.route}
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {selectedCenter.nameBn} — {selectedCenter.nameEn}
              </h3>
              <p className="text-xs text-slate-300 mt-1">{selectedCenter.descriptionBn}</p>
            </div>
            <div className="flex items-center gap-2">
              {selectedCenter.slug === 'wp-studio' && (
                <button
                  onClick={() => setIsStudioModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-[#00f5d4] text-[#050811] font-bold text-xs cursor-pointer"
                >
                  Open Full-Screen Code Studio
                </button>
              )}
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200">
                {selectedCenter.featuredMetric}
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================================
            5B. CYBER COMMAND & 14-MODULE ENTERPRISE B2B SECURITY SAAS PORTAL
        ====================================================================== */}
        <section id="cyber-command-section" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 px-1">
            <div>
              <span className="text-xs font-mono text-[#00f5d4] font-bold tracking-wider">
                ★ 14-MODULE ENTERPRISE B2B CYBER DEFENSE OPERATIONS &amp; SAAS PORTAL ★
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                Cyber Command & Security Audit Service Operations
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
                ● Live C2 Engine Active
              </span>
            </div>
          </div>
          <CyberCommandCenterPortal />
        </section>

        {/* =====================================================================
            6. CREATOR STUDIO, DEVICE DIAGNOSTIC LAB, GAMES CENTER & BD/HIJRI CALENDAR
        ====================================================================== */}
        <CreatorStudioDeviceLabAndGames
          onEarnPoints={handleEarnPoints}
          onNotify={showToastAndNotify}
        />

        {/* =====================================================================
            7. UNIVERSAL SOCIAL, BD 64-DISTRICT PROFILE, MESSAGES, COMMENTS, REPORTS & PASSKEYS
        ====================================================================== */}
        <UniversalSocialAndUserHub
          walletBalance={walletBalance}
          walletPoints={walletPoints}
          onAddPoints={handleEarnPoints}
          onNotify={showToastAndNotify}
        />

        {/* =====================================================================
            8. 15 INTERACTIVE CSS / RGB / NEON CODE LAB GENERATORS
        ====================================================================== */}
        <CssRgbNeonLab />

        {/* =====================================================================
            9. SANDBOXED LIVE DEMO PLAYGROUND (HTML / CSS / JS)
        ====================================================================== */}
        <LiveDemoPlayground />

        {/* =====================================================================
            10. 60+ UNIVERSAL DEVELOPER, MEDIA, PDF & CYBER TOOLS LAB
        ====================================================================== */}
        <DeveloperToolsLab />
        {/* URL-TO-ANDROID APP GENERATOR & PUBLIC SHOWCASE HUB */}
        <WpAppGeneratorStudioHub />

        {/* =====================================================================
            11. 18 AI AUTOPILOTS, KILL-SWITCH, 10 CPTS, 8 TAXONOMIES, 21 DB TABLES & 114-ITEM QA AUDIT
        ====================================================================== */}
        <AutopilotAndArchitectureHub />

        {/* =====================================================================
            12. EMBEDDED LIVE WORDPRESS THEME + CORE PLUGIN FILE STUDIO
        ====================================================================== */}
        <WpPackageStudio
          files={virtualFiles}
          onUpdateFile={handleUpdateVirtualFile}
          onAddFile={handleAddVirtualFile}
          onDownloadPackage={handleDownloadZip}
        />

        {/* =====================================================================
            12B. COMPLETE MULTI-COLUMN BRANDED FOOTER (SECTION 12 MASTER SPEC)
        ====================================================================== */}
        <footer className="rounded-2xl border border-[#00f5d4]/30 bg-[#070b16] p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00f5d4]/15 border border-[#00f5d4] font-mono font-extrabold text-[#00f5d4]">
                  HS
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white">HackersShikkhok</div>
                  <div className="text-xs font-mono text-[#00f5d4]">
                    https://hackersshikkhok.com · @HackersShikkhok
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cyber defense academy, ethical hacking, coding tutorials, sandboxed live demos,
                2,024+ developer & media tools, creator studio, and native WordPress ecosystem.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-[#00f5d4]">
                  ✉️ admin@hackersshikkhok.com
                </span>
                <span className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-purple-300">
                  ▶️ YouTube: @HackersShikkhok
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00f5d4]"></span>
                Core Platform & Academy
              </div>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button
                    onClick={() => {
                      setActiveBottomTab('home');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#00f5d4] cursor-pointer text-left transition-colors"
                  >
                    • Home & 28 Centers Hub
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveBottomTab('home');
                      setSelectedCenter(PLATFORM_CENTERS.find((c) => c.slug === 'cyber') || PLATFORM_CENTERS[2]);
                    }}
                    className="hover:text-[#00f5d4] cursor-pointer text-left transition-colors"
                  >
                    • Cyber Academy   
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const el = document.getElementById('platform-center-hub');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[#00f5d4] hover:underline cursor-pointer text-left font-bold"
                  >
                    • 📱 Website to Android App Maker
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setAuthorityModalPage('sitemap')}
                    className="hover:text-[#00f5d4] cursor-pointer text-left transition-colors"
                  >
                    • 🗺️ Master Sitemap & Crawl Index
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setAuthorityModalPage('llms-txt')}
                    className="text-emerald-400 hover:underline cursor-pointer text-left font-mono font-bold"
                  >
                    • 🤖 llms.txt (ChatGPT/Perplexity Knowledge)
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#a78bfa]"></span>
                Services & Advisory (B2B/B2C)
              </div>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button
                    onClick={() => setAuthorityModalPage('services')}
                    className="hover:text-[#a78bfa] cursor-pointer text-left transition-colors text-white font-bold"
                  >
                    • 🛡️ VAPT & Penetration Testing Audit
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setAuthorityModalPage('services')}
                    className="hover:text-[#a78bfa] cursor-pointer text-left transition-colors"
                  >
                    • 🧹 WordPress Malware Clean Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setAuthorityModalPage('services')}
                    className="hover:text-[#a78bfa] cursor-pointer text-left transition-colors"
                  >
                    • ☁️ Cloud Server Hardening Solution
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setAuthorityModalPage('advisory')}
                    className="hover:text-blue-400 cursor-pointer text-left transition-colors text-blue-300 font-bold"
                  >
                    • 💡 1-on-1 Mentorship & Advisory
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setAuthorityModalPage('advisory')}
                    className="hover:text-[#a78bfa] cursor-pointer text-left transition-colors"
                  >
                    • 🤝 Join Advisory Board
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                Tools Scalability & Labs
              </div>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button
                    onClick={() => setAuthorityModalPage('tools-expansion-plan')}
                    className="text-pink-400 hover:underline cursor-pointer text-left font-bold"
                  >
                    • 🚀 10,000+ Tools Architecture Roadmap
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveBottomTab('tools-lab')}
                    className="hover:text-[#00f5d4] cursor-pointer text-left transition-colors"
                  >
                    • 15 CSS / RGB / Neon Generators
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveBottomTab('tools-lab')}
                    className="hover:text-[#00f5d4] cursor-pointer text-left transition-colors"
                  >
                    • 2,024 Offline-First Developer & Cyber Tools
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const el = document.getElementById('platform-center-hub');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 cursor-pointer text-left transition-colors"
                  >
                    • Digital Card, Gift & Mini-Game Studio
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ff3366]"></span>
                Legal, AdSense & Policy
              </div>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button
                    onClick={() => setAuthorityModalPage('privacy')}
                    className="hover:text-emerald-400 cursor-pointer text-left transition-colors"
                  >
                    • 🔒 Privacy Policy (GDPR / CCPA)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setAuthorityModalPage('terms')}
                    className="hover:text-purple-400 cursor-pointer text-left transition-colors"
                  >
                    • ⚖️ Terms &amp; White-Hat Ethical Charter
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setAuthorityModalPage('disclaimer')}
                    className="hover:text-rose-400 cursor-pointer text-left transition-colors"
                  >
                    • ⚠️ Legal Disclaimer & Fair Use
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setAuthorityModalPage('dmca')}
                    className="hover:text-cyan-400 cursor-pointer text-left transition-colors"
                  >
                    • 🛡️ DMCA &amp; Copyright Compliance
                  </button>
                </li>
                <li className="pt-1">
                  <button
                    onClick={() => handleDownloadZip('theme')}
                    className="text-[#00f5d4] hover:underline font-bold cursor-pointer text-left"
                  >
                    📦 Download hackersshikkhok-theme.zip
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleDownloadZip('core')}
                    className="text-purple-300 hover:underline font-bold cursor-pointer text-left"
                  >
                    ⚙️ Download hackersshikkhok-core.zip
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/90 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div>
              © {new Date().getFullYear()} <strong className="text-white">HackersShikkhok</strong>{' '}
              (HackersShikkhok.com). Developed by HackersShikkhok. All rights reserved.
            </div>
            <div className="font-mono text-[11px] text-emerald-300">
              Native Core v4.0.0 · Zero Third-Party Plugin Dependency · PHP 8.2+ Ready
            </div>
          </div>
        </footer>
      </main>

      {/* =====================================================================
          13. FLOATING CHAT BUTTON (💬 ) & SCROLL-TO-TOP BUTTON (↑)
      ====================================================================== */}
      <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2.5">
        <button
          onClick={() => setIsChatOpen((o) => !o)}
          className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#00f5d4] to-[#7c3aed] text-[#050811] font-extrabold text-xs shadow-[0_0_25px_rgba(0,245,212,0.45)] flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform"
        >
          <span>💬 </span>
          <span className="hidden sm:inline">Live Chat</span>
        </button>

        <button
          onClick={scrollToTop}
          title="Scroll to Top"
          className="w-10 h-10 rounded-full bg-[#0b1120] hover:bg-slate-800 text-[#00f5d4] border border-[#00f5d4]/40 flex items-center justify-center font-bold shadow-lg cursor-pointer"
        >
          ↑
        </button>
      </div>

      {/* Floating Maya / Support Chat Drawer */}
      {isChatOpen && (
        <div className="fixed bottom-36 right-4 z-50 w-80 sm:w-96 bg-[#0b1120] border-2 border-[#00f5d4]/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 bg-gradient-to-r from-[#050811] to-[#111827] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">✨</span>
              <div>
                <div className="text-xs font-bold text-white">Maya (HackersShikkhok Companion)</div>
                <div className="text-[10px] font-mono text-[#00f5d4]">💬 3 New Messages · Online</div>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 space-y-2.5 max-h-64 overflow-y-auto bg-[#050811]/90 text-xs">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-xl ${
                  msg.sender === 'maya'
                    ? 'bg-[#0b1120] border border-slate-800 text-slate-200'
                    : 'bg-[#00f5d4]/15 border border-[#00f5d4]/30 text-white ml-6'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <span className="block text-[10px] font-mono text-slate-500 mt-1">{msg.time}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="p-2.5 bg-[#0b1120] border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your question or code assistance request..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-[#050811] border border-slate-800 text-xs text-white focus:outline-none focus:border-[#00f5d4]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-[#00f5d4] text-[#050811] font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* =====================================================================
          14. BOTTOM 5-TAB NAVIGATION BAR
              (, ,   ✨ Maya ,  , )
      ====================================================================== */}
      <nav
        aria-label="Bottom 5-Tab Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#050811]/95 backdrop-blur-lg border-t border-[#00f5d4]/25 px-2 sm:px-6 py-2"
      >
        <div className="max-w-3xl mx-auto grid grid-cols-5 items-center gap-1 text-center">
          <button
            onClick={() => {
              setActiveBottomTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeBottomTab === 'home'
                ? 'text-[#00f5d4] bg-[#00f5d4]/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🏠 Home
          </button>

          <button
            onClick={() => {
              setActiveBottomTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeBottomTab === 'dashboard'
                ? 'text-[#00f5d4] bg-[#00f5d4]/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📊 Dashboard
          </button>

          {/* Center Glowing ✨ Maya Button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                setActiveBottomTab('maya');
                setIsChatOpen(true);
              }}
              className="hs-glow-btn px-4 py-2 rounded-full bg-gradient-to-r from-[#00f5d4] via-[#7c3aed] to-[#f43f5e] text-[#050811] font-extrabold text-xs sm:text-sm tracking-wide cursor-pointer whitespace-nowrap"
            >
              ✨ Maya
            </button>
          </div>

          <button
            onClick={() => {
              setActiveBottomTab('tools-lab');
            }}
            className={`py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeBottomTab === 'tools-lab'
                ? 'text-[#00f5d4] bg-[#00f5d4]/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🧪 Tools Lab
          </button>

          <button
            onClick={() => {
              setActiveBottomTab('profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeBottomTab === 'profile'
                ? 'text-[#00f5d4] bg-[#00f5d4]/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👤 Profile
          </button>
        </div>
      </nav>

      {/* Modal: Full-Screen WP Package Code Studio */}
      {isStudioModalOpen && (
        <WpPackageStudio
          files={virtualFiles}
          onUpdateFile={handleUpdateVirtualFile}
          onAddFile={handleAddVirtualFile}
          onDownloadPackage={handleDownloadZip}
          onClose={() => setIsStudioModalOpen(false)}
          isModal
        />
      )}

      {/* Modal: Registration / Login */}
      {authModalMode && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1120] border border-[#00f5d4]/40 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">
                {authModalMode === 'login'
                  ? 'HackersShikkhok —  Login (Passkey / 2FA Ready)'
                  : 'HackersShikkhok —   Register'}
              </h3>
              <button
                onClick={() => setAuthModalMode(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Username or Email</label>
                <input
                  type="text"
                  defaultValue="developer@hackersshikkhok.com"
                  className="w-full px-3 py-2 rounded-lg bg-[#050811] border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  defaultValue="••••••••••••"
                  className="w-full px-3 py-2 rounded-lg bg-[#050811] border border-slate-800 text-white"
                />
              </div>
              <button
                onClick={() => {
                  setAuthModalMode(null);
                  showToastAndNotify(' HackersShikkhok !      ।');
                }}
                className="w-full py-2.5 rounded-lg bg-[#00f5d4] text-[#050811] font-extrabold cursor-pointer"
              >
                {authModalMode === 'login' ? 'Login  ' : 'Register  '}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Authority Pages, Legal, Services & AI Grounding Hub */}
      {authorityModalPage && (
        <AuthorityPagesAndLegalHubModal
          initialPageKey={authorityModalPage}
          onClose={() => setAuthorityModalPage(null)}
          onOpenAppMaker={() => {
            const el = document.getElementById('platform-center-hub');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenToolsLab={() => {
            setActiveBottomTab('tools-lab');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
}