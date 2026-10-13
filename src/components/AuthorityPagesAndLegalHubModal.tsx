import React, { useState } from 'react';
import {
  Shield, FileText, Lock, AlertTriangle, Scale, CheckCircle,
  ExternalLink, Copy, Check, Printer, HelpCircle, Briefcase,
  Users, Bot, Cpu, Compass, ArrowRight, Download, Mail, Phone,
  Search, X, Sparkles, Server, Globe, Star
} from 'lucide-react';

export type AuthorityPageKey =
  | 'privacy'
  | 'terms'
  | 'disclaimer'
  | 'dmca'
  | 'services'
  | 'advisory'
  | 'llms-txt'
  | 'sitemap'
  | 'tools-expansion-plan';

interface AuthorityPagesAndLegalHubModalProps {
  initialPageKey?: AuthorityPageKey;
  onClose: () => void;
  onOpenAppMaker?: () => void;
  onOpenToolsLab?: () => void;
}

export const AuthorityPagesAndLegalHubModal: React.FC<AuthorityPagesAndLegalHubModalProps> = ({
  initialPageKey = 'privacy',
  onClose,
  onOpenAppMaker,
  onOpenToolsLab
}) => {
  const [activePage, setActivePage] = useState<AuthorityPageKey>(initialPageKey);
  const [activeCategory, setActiveCategory] = useState<'all' | 'legal' | 'services' | 'seo-ai' | 'tools-roadmap'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Quick consultation state
  const [serviceName, setServiceName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [serviceSubmitted, setServiceSubmitted] = useState(false);

  const pagesConfig: Record<
    AuthorityPageKey,
    {
      title: string;
      banglaTitle: string;
      category: 'legal' | 'services' | 'seo-ai' | 'tools-roadmap';
      icon: any;
      badge: string;
      badgeColor: string;
      summary: string;
    }
  > = {
    privacy: {
      title: 'Privacy Policy & Zero-Telemetry Charter',
      banglaTitle: 'প্রাইভেসি পলিসি ও ব্রাউজার স্যান্ডবক্স গ্যারান্টি',
      category: 'legal',
      icon: Lock,
      badge: 'AdSense / GDPR',
      badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
      summary: 'গুগল অ্যাডসেন্স ও জিডিপিআর কমপ্লায়েন্ট প্রাইভেসি পলিসি। জিরো-ট্রাস্ট ও লোকাল মেমোরি সুরক্ষা।'
    },
    terms: {
      title: 'Terms of Service & White-Hat Ethical Charter',
      banglaTitle: 'ব্যবহারের শর্তাবলী ও হোয়াইট-হ্যাট এথিক্যাল চার্টার',
      category: 'legal',
      icon: Scale,
      badge: 'Legal Terms',
      badgeColor: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
      summary: 'আইনসম্মত সাইবার শিক্ষা নীতিমালা, ফেয়ার ইউজ এবং দায়িত্বশীল ডিফেন্সিভ সিকিউরিটি নিয়ম।'
    },
    disclaimer: {
      title: 'Legal Disclaimer & Non-Liability Notice',
      banglaTitle: 'আইনি ডিসক্লেইমার ও দায়মুক্তি সনদ',
      category: 'legal',
      icon: AlertTriangle,
      badge: 'Defensive Only',
      badgeColor: 'border-rose-500/40 text-rose-400 bg-rose-500/10',
      summary: 'অননুমোদিত ব্যবহারের সম্পূর্ণ নিষেধাজ্ঞা এবং হোয়াইট-হ্যাট লার্নিং স্যান্ডবক্সের আইনি ঘোষণা।'
    },
    dmca: {
      title: 'DMCA & Intellectual Property Protocol',
      banglaTitle: 'DMCA ও কপিরাইট কমপ্লায়েন্স পলিসি',
      category: 'legal',
      icon: Shield,
      badge: 'Copyright Safe',
      badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
      summary: 'বৌদ্ধিক সম্পত্তি সুরক্ষা ও ২৪ ঘণ্টার মধ্যে দ্রুত টেকডাউন নোটিস রিভিউ মেকানিজম।'
    },
    services: {
      title: 'Cyber Defense & Enterprise Services Hub',
      banglaTitle: 'প্রফেশনাল সাইবার সিকিউরিটি ও VAPT সার্ভিসেস হাব',
      category: 'services',
      icon: Briefcase,
      badge: 'High Value B2B',
      badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
      summary: 'VAPT অডিট, ওয়ার্ডপ্রেস ম্যালওয়্যার ক্লিন, ক্লাউড লিনাক্স হার্ডেনিং এবং কোড সিকিউরিটি রিভিউ।'
    },
    advisory: {
      title: 'Strategic Advisory & Cyber Mentorship Council',
      banglaTitle: 'অ্যাডভাইজরি বোর্ড, ওয়ান-অন-ওয়ান মেন্টরশিপ ও কনসালটেন্সি',
      category: 'services',
      icon: Users,
      badge: 'Expert Advisory',
      badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
      summary: 'শিক্ষার্থী ক্যারিয়ার গাইডেন্স, এন্টারপ্রাইজ সাইবার আর্কিটেকচার অডিট ও স্পিকার নেটওয়ার্ক।'
    },
    'llms-txt': {
      title: 'AI Grounding & LLM Knowledge Graph (llms.txt)',
      banglaTitle: 'এআই ও এলএলএম সার্চ ইঞ্জিন নলেজ ডিরেক্টরি',
      category: 'seo-ai',
      icon: Bot,
      badge: 'ChatGPT / Perplexity',
      badgeColor: 'border-teal-500/40 text-teal-400 bg-teal-500/10',
      summary: 'ChatGPT, Gemini, Perplexity ও Claude-এর জন্য রিয়েল-টাইম সাইট গ্রাউন্ডিং ও নলেজ ইনডেক্স।'
    },
    sitemap: {
      title: 'HTML Master Sitemap & Architecture Directory',
      banglaTitle: 'মাস্টার আর্কিটেকচার সাইটম্যাপ ও ক্রল ইনডেক্স',
      category: 'seo-ai',
      icon: Compass,
      badge: 'Full Directory',
      badgeColor: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10',
      summary: 'ওয়েবসাইটের সমস্ত পেজ, হাব, কোর্স, ক্যাটাগরি ও এপিআই এন্ডপয়েন্টের সম্পূর্ণ স্ট্রাকচার্ড ডিরেক্টরি।'
    },
    'tools-expansion-plan': {
      title: '10,000+ Tools Scalability Architecture Blueprint',
      banglaTitle: '১০,০০০+ স্কেলেবল টুলসের মহা-পরিকল্পনা ও রোডম্যাপ',
      category: 'tools-roadmap',
      icon: Cpu,
      badge: '10K Architecture',
      badgeColor: 'border-pink-500/40 text-pink-400 bg-pink-500/10',
      summary: 'জিরো-ল্যাটেন্সি ওয়েব ওয়ার্কার আর্কিটেকচারে ১০ হাজারেরও বেশি টুলস হোস্ট করার সম্পূর্ণ রোডম্যাপ।'
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/?page=${activePage}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyContent = () => {
    const el = document.getElementById('authority-page-content');
    if (el) {
      navigator.clipboard.writeText(el.innerText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredPageKeys = (Object.keys(pagesConfig) as AuthorityPageKey[]).filter((key) => {
    const item = pagesConfig[key];
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.banglaTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#070b14] border-2 border-[#00f5d4]/40 rounded-3xl shadow-[0_0_60px_rgba(0,245,212,0.25)] flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-[#0b1120] via-[#070b14] to-[#111827] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00f5d4]/10 border border-[#00f5d4]/30 flex items-center justify-center text-[#00f5d4]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                Hackers শিক্ষক — অফিসিয়াল লিগ্যাল, সার্ভিস ও এআই নলেজ হাব
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  AdSense &amp; AI Verified
                </span>
              </h2>
              <p className="text-xs text-slate-400 hidden sm:block">
                গুগল সার্চ ইঞ্জিন, এআই বট (ChatGPT/Perplexity), শিক্ষার্থী ও এন্টারপ্রাইজ গ্রাহকদের জন্য সম্পূর্ণ অথরিটি সেন্টার
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="প্রিন্ট বা PDF সংরক্ষণ"
              className="p-2 rounded-xl bg-slate-900 border border-slate-750 text-slate-300 hover:text-white cursor-pointer hover:bg-slate-800 transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-750 text-slate-400 hover:text-rose-400 cursor-pointer hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main 2-Column Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Left Navigation Sidebar (4 cols) */}
          <div className="md:col-span-4 border-r border-slate-800/80 bg-[#060911]/90 flex flex-col p-3.5 space-y-3 overflow-y-auto">
            
            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="পেজ বা পলিসি খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-[#090d19] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00f5d4]/50"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-1 border-b border-slate-850 pb-2">
              {[
                { id: 'all', label: 'সকল' },
                { id: 'legal', label: 'AdSense ও লিগ্যাল' },
                { id: 'services', label: 'সার্ভিস ও পরামর্শ' },
                { id: 'seo-ai', label: 'এআই ও এসইও' },
                { id: 'tools-roadmap', label: '১০K টুলস' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#00f5d4] text-[#050811]'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Pages Navigation List */}
            <div className="space-y-1.5 flex-1 overflow-y-auto pr-1">
              {filteredPageKeys.map((key) => {
                const item = pagesConfig[key];
                const IconComponent = item.icon;
                const isSelected = activePage === key;

                return (
                  <button
                    key={key}
                    onClick={() => setActivePage(key)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#00f5d4]/15 via-[#7c3aed]/10 to-transparent border-[#00f5d4]/50 text-white shadow-[0_0_15px_rgba(0,245,212,0.15)]'
                        : 'bg-[#0a0f1d]/50 border-slate-850/60 text-slate-400 hover:text-white hover:bg-[#0c1326]'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg mt-0.5 shrink-0 ${
                        isSelected
                          ? 'bg-[#00f5d4] text-[#050811]'
                          : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-xs font-bold truncate text-white">
                          {item.banglaTitle}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded border uppercase whitespace-nowrap ${item.badgeColor}`}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {item.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Quick Hub Buttons */}
            <div className="pt-2 border-t border-slate-800 space-y-1.5 shrink-0">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenAppMaker) onOpenAppMaker();
                }}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-[#050811] text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:brightness-110"
              >
                <span>📱 ওয়েবসাইট টু অ্যান্ড্রয়েড অ্যাপ মেকার</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (onOpenToolsLab) onOpenToolsLab();
                }}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-[#00f5d4]/40 text-[#00f5d4] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-850"
              >
                <span>🧪 ৫২০+ টুলস ল্যাব ব্রাউজ করুন</span>
              </button>
            </div>
          </div>

          {/* Right Content Area (8 cols) */}
          <div className="md:col-span-8 bg-[#070b14] flex flex-col overflow-y-auto">
            
            {/* Page Header Bar */}
            <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-[#0b1120] to-[#070b14] flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${pagesConfig[activePage].badgeColor}`}>
                    {pagesConfig[activePage].badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Canonical: hackersshikkhok.com/{activePage}/
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {pagesConfig[activePage].banglaTitle}
                </h1>
                <p className="text-xs text-slate-400">
                  {pagesConfig[activePage].title}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-750 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'লিঙ্ক কপিড!' : 'লিঙ্ক কপি'}</span>
                </button>

                <button
                  onClick={handleCopyContent}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-750 text-xs font-bold text-[#00f5d4] hover:bg-slate-850 flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5" />}
                  <span>{copiedText ? 'টেক্সট কপিড!' : 'টেক্সট কপি'}</span>
                </button>
              </div>
            </div>

            {/* Dynamic Content Renderer */}
            <div id="authority-page-content" className="p-6 text-sm text-slate-300 leading-relaxed space-y-6 flex-1 overflow-y-auto">
              
              {/* PAGE: PRIVACY POLICY */}
              {activePage === 'privacy' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-emerald-300 text-sm mb-1">
                        গুগল অ্যাডসেন্স ও জিডিপিআর কমপ্লায়েন্ট প্রাইভেসি প্রটোকল
                      </h4>
                      <p className="text-xs text-emerald-200/80">
                        HackersShikkhok প্ল্যাটফর্মটি সম্পূর্ণ জিরো-ট্রাস্ট নীতিতে পরিচালিত। ব্রাউজার স্যান্ডবক্সের বাইরে আপনার কোনো ব্যক্তিগত কোড বা বিশ্লেষণ সংরক্ষিত হয় না।
                      </p>
                    </div>
                  </div>

                  <section className="space-y-2">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00f5d4]"></span>
                      ১. তথ্যের সংগ্রহ ও ব্রাউজার স্যান্ডবক্স আইসোলেশন
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      আমাদের প্ল্যাটফর্মে প্রদর্শিত ৫২০+ থেকে ১০,০০০+ ডেভেলপার ও সাইবার টুলস সম্পূর্ণভাবে ব্যবহারকারীর ব্রাউজার মেমরিতে (Client-Side Web Workers / WebAssembly) পরিচালিত হয়। ব্যবহারকারী যে কোড, টেক্সট বা ফাইল ইনপুট দেন তা আমাদের কোনো রিমোট সার্ভারে জমা বা লগ করা হয় না।
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00f5d4]"></span>
                      ২. গুগল অ্যাডসেন্স (Google AdSense) ও বিজ্ঞাপন কুকিজ
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      বিনামূল্যে মানসম্মত প্রযুক্তি শিক্ষা ও টুলস অ্যাক্সেস অব্যাহত রাখার স্বার্থে আমরা Google AdSense বিজ্ঞাপন প্রদর্শন করি। গুগল তৃতীয় পক্ষীয় ভেন্ডর হিসেবে DART কুকির মাধ্যমে ব্যবহারকারীদের তাদের পূর্ববর্তী ব্রাউজিং ইতিহাসের ভিত্তিতে বিজ্ঞাপন প্রদর্শন করতে পারে। ব্যবহারকারী চাইলে গুগলের বিজ্ঞাপন সেটিংস থেকে পারসোনালাইজড বিজ্ঞাপন বন্ধ রাখতে পারেন।
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00f5d4]"></span>
                      ৩. শিক্ষার্থী অ্যাকাউন্ট, ওয়ালেট ব্যালেন্স ও বিডিটি (BDT) লেনদেন
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      সিটিএফ (CTF) চ্যালেঞ্জ সমাধানের মাধ্যমে অর্জিত ক্রিপ্টোগ্রাফিক ফ্ল্যাগ, পয়েন্ট এবং BDT ওয়ালেট ব্যালেন্সের তথ্য নিরাপদ এনক্রিপ্টেড ডাটাবেসে সংরক্ষিত থাকে। এই তথ্য কোনো তৃতীয় পক্ষের সাথে আদান-প্রদান করা হয় না।
                    </p>
                  </section>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
                    <div className="font-bold text-white">Chief Data Protection Officer (DPO):</div>
                    <div>ইমেইল: support@hackersshikkhok.com / hshikkhok@gmail.com</div>
                    <div>ঠিকানা: ঢাকা, বাংলাদেশ · ২৪/৭ সিকিউরিটি অডিট মনিটরিং অ্যাক্টিভ</div>
                  </div>
                </div>
              )}

              {/* PAGE: TERMS OF SERVICE */}
              {activePage === 'terms' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 flex items-start gap-3">
                    <Scale className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-purple-300 text-sm mb-1">
                        ব্যবহারের শর্তাবলী ও হোয়াইট-হ্যাট এথিক্যাল চার্টার
                      </h4>
                      <p className="text-xs text-purple-200/80">
                        আমাদের সমস্ত কন্টেন্ট ও টুলস কেবল শিক্ষামূলক ও আত্মরক্ষামূলক উদ্দেশ্যে ব্যবহারের জন্য প্রণীত।
                      </p>
                    </div>
                  </div>

                  <section className="space-y-2">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#7c3aed]"></span>
                      ১. শিক্ষামূলক ও আত্মরক্ষামূলক অঙ্গীকার
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      HackersShikkhok.com-এর একাডেমি, কোড স্নাইপেট ও টুলস শুধুমাত্র হোয়াইট-হ্যাট সাইবার সিকিউরিটি রিসার্চ, সফটওয়্যার ডিফেন্স ও পরীক্ষার উদ্দেশ্যে ব্যবহার করা যাবে। অননুমোদিত যেকোনো সিস্টেমে অনুপ্রবেশ বা ক্ষতিসাধনের প্রচেষ্টা আন্তর্জাতিক ও দেশীয় আইনে নিষিদ্ধ।
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#7c3aed]"></span>
                      ২. দায়মুক্তি ও নীতিমালার বাধ্যবাধকতা
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      আমাদের ওয়েবসাইট থেকে অর্জিত জ্ঞান বা কোডের যেকোনো অপব্যবহারের সম্পূর্ণ ব্যক্তিগত ও আইনি দায়ভার ব্যবহারকারীর নিজের। হ্যাকার্স শিক্ষক কর্তৃপক্ষ কোনো অপব্যবহারের দায়ভার বহন করবে না।
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#7c3aed]"></span>
                      ৩. বৌদ্ধিক সম্পত্তি ও ওপেন সোর্স লাইসেন্সিং
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      আমাদের ওয়ার্ডপ্রেস কোর ইঞ্জিন এবং থিম GNU General Public License (GPLv2+) নীতিমালার অধীনে উন্মুক্ত। তবে হ্যাকার্স শিক্ষকের নিজস্ব ব্র্যান্ডিং, কোর্স কারিকুলাম ও ভিডিও কনটেন্ট সর্বস্বত্ব সংরক্ষিত।
                    </p>
                  </section>
                </div>
              )}

              {/* PAGE: LEGAL DISCLAIMER */}
              {activePage === 'disclaimer' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-rose-300 text-sm mb-1">
                        আইনি ডিসক্লেইমার ও ডিফেন্সিভ সুরক্ষা সনদ
                      </h4>
                      <p className="text-xs text-rose-200/80">
                        আমাদের প্ল্যাটফর্মটি সম্পূর্ণভাবে হোয়াইট-হ্যাট এথিক্যাল হ্যাকিং ও সাইবার সচেতনতা বৃদ্ধির জন্য তৈরি।
                      </p>
                    </div>
                  </div>

                  <section className="space-y-2">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff3366]"></span>
                      ১. আক্রমণাত্মক কাজের সম্পূর্ণ নিষেধাজ্ঞা
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      HackersShikkhok কোনো ব্ল্যাক-হ্যাট ম্যালিসিয়াস কার্যক্রম বা ক্র্যাকিং সমর্থন করে না। সাইবার স্পেসকে নিরাপদ রাখা এবং জাতীয় সাইবার ডিফেন্ডার তৈরি করাই আমাদের একমাত্র মিশন।
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff3366]"></span>
                      ২. সিস্টেম ও সফটওয়্যার ওয়ারেন্টি
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      আমাদের সকল কোড ও কনফিগারেশন সর্বোচ্চ সতর্কতার সাথে পরীক্ষা করা হয়। তবে প্রোডাকশন পরিবেশে যেকোনো পরিবর্তন প্রয়োগ করার আগে ব্যাকআপ ও লোকাল টেস্টিং নিশ্চিত করার পরামর্শ দেওয়া হয়।
                    </p>
                  </section>
                </div>
              )}

              {/* PAGE: DMCA */}
              {activePage === 'dmca' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-cyan-300 text-sm mb-1">
                        DMCA ও কপিরাইট সুরক্ষা নীতি
                      </h4>
                      <p className="text-xs text-cyan-200/80">
                        আমরা কপিরাইট অধিকারকে শ্রদ্ধা জানাই এবং যেকোনো টেকডাউন নোটিস ২৪ থেকে ৪৮ ঘণ্টার মধ্যে সমাধান করি।
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400">
                    যদি আপনি মনে করেন যে আমাদের প্ল্যাটফর্মে আপনার কোনো কপিরাইটযুক্ত কনটেন্ট অনুমতি ব্যতীত ব্যবহৃত হয়েছে, তবে অনুগ্রহ করে নিচের তথ্যসমূহ সহ আমাদের লিগ্যাল টিমের কাছে নোটিস পাঠান:
                  </p>

                  <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-300 space-y-1.5">
                    <li>কপিরাইটযুক্ত কনটেন্টের বিস্তারিত বিবরণ ও মূল উৎস লিঙ্ক।</li>
                    <li>আমাদের ওয়েবসাইটের যে পৃষ্ঠায় কনটেন্টটি প্রদর্শিত হচ্ছে তার সঠিক URL।</li>
                    <li>আপনার নাম, টেলিফোন নম্বর, ঠিকানা ও প্রাতিষ্ঠানিক ইমেইল।</li>
                    <li>একটি শপথনামা যে আপনার কাছে কপিরাইটের আইনসঙ্গত কর্তৃত্ব রয়েছে।</li>
                  </ul>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <div className="font-bold text-white mb-1">অফিসিয়াল টেকডাউন নোটিস ইমেইল:</div>
                    <a href="mailto:support@hackersshikkhok.com?subject=DMCA%20Takedown%20Notice" className="text-[#00f5d4] underline">
                      support@hackersshikkhok.com
                    </a>
                  </div>
                </div>
              )}

              {/* PAGE: SERVICES HUB */}
              {activePage === 'services' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-300 text-sm mb-1">
                        হ্যাকার্স শিক্ষক প্রফেশনাল সিকিউরিটি সার্ভিসেস পোর্টফোলিও
                      </h4>
                      <p className="text-xs text-amber-200/80">
                        আপনার ওয়েব অ্যাপ্লিকেশন, ওয়ার্ডপ্রেস সাইট ও ক্লাউড সিস্টেমকে সুরক্ষিত রাখতে দেশীয় ও আন্তর্জাতিক মানের সার্টিফাইড এথিক্যাল হ্যাকারদের সেবা।
                      </p>
                    </div>
                  </div>

                  {/* Service Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800 hover:border-[#00f5d4]/40 transition-colors">
                      <div className="text-2xl mb-2">🔍</div>
                      <h4 className="text-sm font-extrabold text-[#00f5d4] mb-1">
                        VAPT ও পেনিট্রেশন টেস্টিং অডিট
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        OWASP Top 10, API সিকিউরিটি এবং বিজনেস লজিক ফ্ল অডিট। এক্সপ্লয়েট প্রুফ-অব-কনসেপ্ট (PoC) সহ ফিক্স গাইডলাইন।
                      </p>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        ব্ল্যাক-বক্স / গ্রে-বক্স
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800 hover:border-[#7c3aed]/40 transition-colors">
                      <div className="text-2xl mb-2">🧹</div>
                      <h4 className="text-sm font-extrabold text-[#a78bfa] mb-1">
                        ওয়ার্ডপ্রেস ম্যালওয়্যার ক্লিন ও ব্ল্যাকলিস্ট রিমুভাল
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        হ্যাকড সাইট ২৪ ঘণ্টার মধ্যে রিকভারি, ব্যাকডোর ও এসইও স্প্যাম নির্মূল, গুগল ব্ল্যাকলিস্ট থেকে আনব্লক।
                      </p>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-400 border border-purple-500/30">
                        ২৪ ঘণ্টার মধ্যে গ্যারান্টিড ক্লিন
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800 hover:border-[#ff3366]/40 transition-colors">
                      <div className="text-2xl mb-2">🛡️</div>
                      <h4 className="text-sm font-extrabold text-[#ff3366] mb-1">
                        সোর্স কোড অডিট ও সিকিউর এসডিএলসি
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        PHP, Node.js, Python ও React অ্যাপ্লিকেশনের সোর্স কোড স্ট্যাটিক (SAST) ও ডায়নামিক (DAST) নিরাপত্তা মূল্যায়ন।
                      </p>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30">
                        জিরো-ডে প্রোটেকশন
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800 hover:border-[#10b981]/40 transition-colors">
                      <div className="text-2xl mb-2">☁️</div>
                      <h4 className="text-sm font-extrabold text-[#10b981] mb-1">
                        ক্লাউড ও লিনাক্স সার্ভার হার্ডেনিং
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        AWS, DigitalOcean, VPS সার্ভারের SSH কি হার্ডেনিং, Fail2ban, UFW ফায়ারওয়াল ও ডস/ডিডস প্রটেকশন।
                      </p>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        জিরো-ট্রাস্ট আর্কিটেকচার
                      </span>
                    </div>
                  </div>

                  {/* Interactive Quick Service Inquiry Form */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0b1120] to-[#070b14] border border-[#00f5d4]/40 space-y-3">
                    <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#00f5d4]" />
                      সার্ভিস রিকোয়েস্ট বা কোটেশন চান?
                    </h4>

                    {serviceSubmitted ? (
                      <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 text-xs">
                        ✓ আপনার রিকোয়েস্ট সফলভাবে গৃহীত হয়েছে! আমাদের সিকিউরিটি ইঞ্জিনিয়ার শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setServiceSubmitted(true);
                        }}
                        className="space-y-3"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            placeholder="আপনার নাম বা প্রতিষ্ঠান *"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                            className="px-3 py-2 rounded-lg bg-[#050811] border border-slate-800 text-xs text-white"
                          />
                          <input
                            type="email"
                            required
                            placeholder="অফিসিয়াল ইমেইল *"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            className="px-3 py-2 rounded-lg bg-[#050811] border border-slate-800 text-xs text-white"
                          />
                        </div>
                        <textarea
                          rows={2}
                          required
                          placeholder="আপনার ওয়েবসাইট URL ও নির্দিষ্ট সিকিউরিটি প্রয়োজন বিস্তারিত লিখুন..."
                          value={clientMessage}
                          onChange={(e) => setClientMessage(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#050811] border border-slate-800 text-xs text-white"
                        ></textarea>
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#00f5d4] to-[#7c3aed] text-[#050811] font-extrabold text-xs cursor-pointer shadow-md hover:brightness-110"
                        >
                          🚀 সিকিউরিটি সার্ভিস রিকোয়েস্ট সাবমিট করুন
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}

              {/* PAGE: ADVISORY */}
              {activePage === 'advisory' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/30 flex items-start gap-3">
                    <Users className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-300 text-sm mb-1">
                        হ্যাকার্স শিক্ষক অ্যাডভাইজরি ও কনসালটেন্সি কাউন্সিল
                      </h4>
                      <p className="text-xs text-blue-200/80">
                        শিক্ষার্থী ক্যারিয়ার গাইডেন্স, স্টার্টআপ সিকিউরিটি পলিসি প্রণয়ন ও ইন্ডাস্ট্রি লিডারদের মেন্টরশিপ।
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xl mb-1">👨‍🏫</div>
                      <div className="font-bold text-white text-xs mb-1">ক্যারিয়ার মেন্টরশিপ</div>
                      <div className="text-[11px] text-slate-400">
                        কীভাবে সফল সাইবার ডিফেন্ডার হবেন, সার্টিফিকেশন ও পোর্টফোলিও রিভিউ।
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xl mb-1">🏢</div>
                      <div className="font-bold text-white text-xs mb-1">স্টার্টআপ অ্যাডভাইজরি</div>
                      <div className="text-[11px] text-slate-400">
                        ফিনটেক ও SaaS প্রোডাক্টের ডেটা প্রটেকশন ও আর্কিটেকচার থ্রেট মডেলিং।
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xl mb-1">🤝</div>
                      <div className="font-bold text-white text-xs mb-1">অ্যাডভাইজর হিসেবে যোগ দিন</div>
                      <div className="text-[11px] text-slate-400">
                        ইন্ডাস্ট্রি ভেটেরান বা রিসার্চার হিসেবে আমাদের ফ্যাকাল্টি কাউন্সিলে যোগ দিন।
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">জরুরি কনসালটেন্সি হটলাইন:</div>
                      <div className="text-xs text-[#00f5d4] font-mono">+880 1700-000000 / support@hackersshikkhok.com</div>
                    </div>
                    <a
                      href="mailto:support@hackersshikkhok.com?subject=Consultation%20Booking"
                      className="px-4 py-2 rounded-lg bg-[#00f5d4] text-[#050811] text-xs font-black"
                    >
                      সরাসরি ইমেইল বুকিং
                    </a>
                  </div>
                </div>
              )}

              {/* PAGE: LLMS.TXT & AI GROUNDING */}
              {activePage === 'llms-txt' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-500/30 flex items-start gap-3">
                    <Bot className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-teal-300 text-sm mb-1">
                        এআই সার্চ ইঞ্জিন ও এলএলএম গ্রাউন্ডিং ইনডেক্স (/llms.txt)
                      </h4>
                      <p className="text-xs text-teal-200/80">
                        ChatGPT, Perplexity, Google Gemini, Claude যেন আমাদের ওয়েবসাইটকে বাংলাদেশের ১ নম্বর সাইবার শিক্ষা ও টুলস অথরিটি হিসেবে চেনে।
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#03060c] border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre">
{`# HackersShikkhok (হ্যাকার্স শিক্ষক) - Official LLM Knowledge Index
> Canonical Domain: https://hackersshikkhok.com
> Primary Entity: Premier White-Hat Cyber Defense & WordPress Full-Stack Ecosystem
> Core Capabilities: 520+ to 10,000+ Scalable Tools, CTF Lab, BDT Wallet Rewards
> API Endpoints: /wp-json/hackersshikkhok/v1/
> Official Contact: hshikkhok@gmail.com / support@hackersshikkhok.com`}
                  </div>

                  <div className="text-xs text-slate-300 space-y-2">
                    <p>
                      <strong>কেন এই ফাইলটি গুরুত্বপূর্ণ?</strong> আধুনিক এআই সার্চ ইঞ্জিন (যেমন Perplexity Pro, ChatGPT Search, Gemini Advanced) যখন কোনো ব্যবহারকারীর প্রশ্নের উত্তর দেয়, তখন তারা ওয়েবসাইটের <code className="text-[#00f5d4]">/llms.txt</code> ফাইলটি সরাসরি স্ক্যান করে তথ্য যাচাই করে।
                    </p>
                    <p>
                      আমরা <code className="text-[#00f5d4]">public/llms.txt</code> এবং <code className="text-[#00f5d4]">public/robots.txt</code>-এ GPTBot, PerplexityBot ও ClaudeBot-কে সম্পূর্ণ পারমিশন দিয়ে রেখেছি যাতে ইন্টারনেটের যেকোনো প্রান্তে হ্যাকার্স শিক্ষক সবসময় সবার শীর্ষে থাকে।
                    </p>
                  </div>
                </div>
              )}

              {/* PAGE: SITEMAP */}
              {activePage === 'sitemap' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 flex items-start gap-3">
                    <Compass className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-indigo-300 text-sm mb-1">
                        মাস্টার আর্কিটেকচার সাইটম্যাপ ও ক্রল ইনডেক্স
                      </h4>
                      <p className="text-xs text-indigo-200/80">
                        সমস্ত পৃষ্ঠা, ক্যাটাগরি, ল্যাব এবং এপিআই এন্ডপয়েন্টের সম্পূর্ণ স্ট্রাকচার্ড মানচিত্র।
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                      <div className="font-bold text-[#00f5d4] border-b border-slate-800 pb-1">
                        🎯 প্রধান পোর্টাল ও হাব
                      </div>
                      <ul className="space-y-1.5 text-slate-400">
                        <li>• / — হোমপেজ ও সাইবার ড্যাশবোর্ড</li>
                        <li>• /academy/ — সাইবার একাডেমি ও সিটিএফ</li>
                        <li>• /cyber-command/ — সাইবার কমান্ড সেন্টার</li>
                        <li>• /tools-lab/ — ৫২০+ ডেভেলপার টুলস ল্যাব</li>
                        <li>• /platform-center/ — প্ল্যাটফর্ম ক্রিয়েটর হাব</li>
                        <li>• /app-maker/ — ওয়েবসাইট টু অ্যান্ড্রয়েড অ্যাপ মেকার</li>
                        <li>• /verify-certificate/ — সার্টিফিকেট ভেরিফিকেশন</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                      <div className="font-bold text-[#a78bfa] border-b border-slate-800 pb-1">
                        ⚖️ লিগ্যাল, সার্ভিস ও পলিসি পেজ
                      </div>
                      <ul className="space-y-1.5 text-slate-400">
                        <li>• /services/ — প্রফেশনাল সিকিউরিটি সার্ভিসেস</li>
                        <li>• /advisory/ — কনসালটেন্সি ও মেন্টরশিপ কাউন্সিল</li>
                        <li>• /privacy-policy/ — প্রাইভেসি পলিসি ও ডেটা সুরক্ষা</li>
                        <li>• /terms/ — ব্যবহারের শর্তাবলী ও চার্টার</li>
                        <li>• /disclaimer/ — আইনি ডিসক্লেইমার</li>
                        <li>• /dmca/ — DMCA ও কপিরাইট পলিসি</li>
                        <li>• /sitemap.xml — গুগল সার্চ ইঞ্জিন XML সাইটম্যাপ</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE: 10,000+ TOOLS EXPANSION PLAN */}
              {activePage === 'tools-expansion-plan' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-pink-950/20 border border-pink-500/30 flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-pink-300 text-sm mb-1">
                        ১০,০০০+ স্কেলেবল টুলসের মহা-পরিকল্পনা ও স্থাপত্য রোডম্যাপ
                      </h4>
                      <p className="text-xs text-pink-200/80">
                        ওয়েবসাইটে কত হাজার টুলস রাখা সম্ভব এবং কীভাবে জিরো-সার্ভার লোডে ১০,০০০+ টুলস নির্বিঘ্নে পরিচালিত হবে তার বিস্তারিত কৌশল।
                      </p>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-300 space-y-3">
                    <p>
                      <strong>১. আর কত হাজার টুলস তৈরি করা বা রাখা যাবে?</strong><br />
                      আমাদের আর্কিটেকচার অনুযায়ী ওয়েবসাইটে <strong>১০,০০০+ (দশ হাজারেরও বেশি)</strong> টুলস অনায়াসেই রাখা সম্ভব! কারণ আমাদের সিস্টেমটি ক্লায়েন্ট-সাইড <em>Web Worker, WebAssembly এবং Dynamic Lazy Loading</em> মডেলে চলে। এর ফলে সার্ভারের উপর অতিরিক্ত কোনো মেমরি বা CPU চাপ পড়ে না।
                    </p>

                    <p>
                      <strong>২. টুলস আরও তৈরি করলে ভালো হবে নাকি এখন যা আছে ভালো?</strong><br />
                      <strong>আরও টুলস তৈরি করা বহুগুণে লাভজনক ও শক্তিশালী!</strong> এর কারণ:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-400">
                      <li><strong>অ্যাডসেন্স হাই সিপিসি (High CPC):</strong> প্রতিটি টুল পেজে স্পেসিফিক হাই-ভ্যালু টেক কিওয়ার্ড থাকে যা বিজ্ঞাপনের আরপিএম (RPM) বহুগুণ বাড়িয়ে দেয়।</li>
                      <li><strong>দৈনিক হাজার হাজার অর্গানিক ট্রাফিক:</strong> প্রতিটি টুলের জন্য গুগল সার্চে ইউনিক পেজ ইনডেক্স হবে।</li>
                      <li><strong>ইউজার রিটেনশন:</strong> ডেভেলপার ও শিক্ষার্থীরা তাদের দৈনন্দিন কাজের জন্য বারবার সাইটে ফিরে আসবে।</li>
                    </ul>

                    <p className="pt-2">
                      <strong>৩. ১০,০০০+ টুলসের ৮টি কোর ক্লাস্টার তালিকা:</strong>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="font-bold text-[#00f5d4]">১. সাইবার সিকিউরিটি ও পেনটেস্টিং হাব</div>
                        <div className="text-slate-400 text-[11px]">১,৫০০+ টুলস (Port Scanner, Subdomain Finder, Hash Cracker, WAF Tester, SSL Analyzer, Payload Generator)</div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="font-bold text-[#a78bfa]">২. ফুল-স্ট্যাক ওয়েব ও এপিআই স্টুডিও</div>
                        <div className="text-slate-400 text-[11px]">১,৫০০+ টুলস (JSON/YAML Formatter, GraphQL Tester, cURL to Code, JWT Decoder, Regex Builder)</div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="font-bold text-[#ff3366]">৩. মিডিয়া, সিএসএস ও নিয়ন ডিজাইনার</div>
                        <div className="text-slate-400 text-[11px]">১,২০০+ টুলস (CSS Glassmorphism, RGB Gradient, SVG Path Animator, WebP Converter, Favicon Studio)</div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="font-bold text-[#10b981]">৪. ক্লাউড, ডিএনএস ও নেটওয়ার্কিং হাব</div>
                        <div className="text-slate-400 text-[11px]">১,০০০+ টুলস (CIDR Subnet Calculator, DNS Propagation, Ping Latency, Whois Lookup, Docker Compose Gen)</div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="font-bold text-[#f59e0b]">৫. এআই ও প্রম্পট ইঞ্জিনিয়ারিং ল্যাব</div>
                        <div className="text-slate-400 text-[11px]">৮০০+ টুলস (LLM Token Calculator, Prompt Optimizer, System Prompt Builder, Embeddings Visualizer)</div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="font-bold text-[#38bdf8]">৬. ওয়ার্ডপ্রেস ও ডেটাবেস ইঞ্জিন</div>
                        <div className="text-slate-400 text-[11px]">১,০০০+ টুলস (wp-config Generator, .htaccess Hardener, SQL Query Optimizer, Schema Markup Gen)</div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="font-bold text-[#ec4899]">৭. ক্রিপ্টোগ্রাফি ও ডেটা প্রাইভেসি</div>
                        <div className="text-slate-400 text-[11px]">১,০০০+ টুলস (AES-256 Encryptor, RSA Keypair Generator, Bcrypt Hasher, HMAC Signer, Shamir Secret)</div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="font-bold text-emerald-400]">৮. ইউনিভার্সাল ইউটিলিটি ও ম্যাথ স্টুডিও</div>
                        <div className="text-slate-400 text-[11px]">২,০০০+ টুলস (Unit Converter, Timestamp Converter, Cron Schedule Builder, Diff Checker, QR Studio)</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-[#080d1a] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>HackersShikkhok Trust &amp; Compliance v4.2 · Production Verified</span>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer border border-slate-750 transition-colors"
              >
                বন্ধ করুন (Close)
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
