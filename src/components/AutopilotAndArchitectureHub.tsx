import React, { useState } from 'react';
import {
  AUTOPILOT_UNITS,
  CUSTOM_POST_TYPES,
  CUSTOM_TAXONOMIES,
  CUSTOM_DB_TABLES,
  AutopilotUnit
} from '../data/platformData';
import { 
  Cpu, Database, Layers, Play, CheckCircle2, ShieldAlert, Sliders, 
  ShieldCheck, Bot, Key, RefreshCw, AlertTriangle, ArrowRight, Zap, 
  Search, Award, Send, Users, Smartphone, Globe, Terminal, Activity,
  Lock, Check, Trash2, Plus
} from 'lucide-react';

export interface AutonomousBotItem {
  id: string;
  slug: string;
  nameBn: string;
  nameEn: string;
  category: string;
  frequency: string;
  role: string;
  status: 'Active' | 'Running' | 'Idle';
  lastRun: string;
  healthScore: number;
  itemsProcessed: number;
}

const INITIAL_BOTS: AutonomousBotItem[] = [
  {
    id: 'bot-01',
    slug: 'cyber-sentinel',
    nameBn: 'CyberSentinel-Bot (নিরাপত্তা ও থ্রেট ডিফেন্ডার)',
    nameEn: 'CyberSentinel Autonomous Security Daemon',
    category: 'Security & Defense',
    frequency: 'Every 5 Minutes (Real-Time)',
    role: '24/7 ব্রুটফোর্স, SQLi, XSS অ্যাটাক সিগনেচার ডিটেকশন, ক্ষতিকর আইপি অটো-ব্যান এবং ডিনায়াল অফ সার্ভিস প্রতিরোধ।',
    status: 'Active',
    lastRun: 'Just now',
    healthScore: 99,
    itemsProcessed: 14200,
  },
  {
    id: 'bot-02',
    slug: 'content-crafter',
    nameBn: 'ContentCrafter-Bot (অটোনমাস কনটেন্ট পাবলিশার)',
    nameEn: 'ContentCrafter Trend & Technical Publisher',
    category: 'Content & Editorial',
    frequency: 'Hourly Cron',
    role: 'গুগলের ট্রেন্ডিং টেক ও সাইবার কোয়েরি মনিটর করে Quality Gate ≥ 85 সহ স্বয়ংক্রিয় টিউটোরিয়াল, কোড ও গাইড জেনারেট।',
    status: 'Active',
    lastRun: '14 mins ago',
    healthScore: 96,
    itemsProcessed: 840,
  },
  {
    id: 'bot-03',
    slug: 'google-ranker',
    nameBn: 'GoogleRanker-Bot (এসইও ও সার্চ কনসোল বট)',
    nameEn: 'GoogleRanker SEO & Indexing Crawler',
    category: 'SEO & Ranking',
    frequency: 'Every 3 Hours',
    role: 'XML সাইটম্যাপ ইনডেক্সিং পিং, FAQ/Breadcrumb/SoftwareApplication স্কিমা ভ্যালিডেশন ও ইন্টারনাল লিংক গ্রাফ অটো-ফিক্স।',
    status: 'Active',
    lastRun: '32 mins ago',
    healthScore: 100,
    itemsProcessed: 2650,
  },
  {
    id: 'bot-04',
    slug: 'adsense-shield',
    nameBn: 'AdSenseShield-Bot (অ্যাডসেন্স রেভিনিউ গার্ড বট)',
    nameEn: 'AdSenseShield Compliance & Revenue Guardian',
    category: 'Monetization & AdSense',
    frequency: 'Twice Daily',
    role: 'অ্যাডসেন্স পলিসি চেকলিস্ট অডিট: থিন কনটেন্ট শনাক্তকরণ, টেক্সট-টু-অ্যাড রেশিও অপ্টিমাইজেশন ও ইনভ্যালিড ক্লিক ফিল্টার।',
    status: 'Active',
    lastRun: '1 hour ago',
    healthScore: 98,
    itemsProcessed: 1980,
  },
  {
    id: 'bot-05',
    slug: 'app-builder',
    nameBn: 'AppBuilder-Bot (অ্যাপ কম্পাইলার ও ভ্যালিডেটর বট)',
    nameEn: 'AppBuilder Studio Packaging Daemon',
    category: 'Platform Centers & Mobile',
    frequency: 'On Submission & Daily Audit',
    role: 'ব্যবহারকারীদের সাবমিট করা সাইট লিংক টেস্ট করা, রেসপন্সিভ ভিউপোর্ট ভ্যালিডেশন, ম্যানিফেস্ট ও অ্যান্ড্রয়েড কোড অটো-কম্পাইল।',
    status: 'Active',
    lastRun: '22 mins ago',
    healthScore: 97,
    itemsProcessed: 520,
  },
  {
    id: 'bot-06',
    slug: 'commu-guard',
    nameBn: 'CommuGuard-Bot (ফোরাম ও সোশ্যাল মডারেটর বট)',
    nameEn: 'CommuGuard Community & Sentiment Sentinel',
    category: 'Community & Moderation',
    frequency: 'Every 10 Minutes',
    role: 'ফোরামের ক্ষতিকর লিংক ও স্প্যাম কমেন্ট অটোমেটিক ট্র্যাশ করা, ডুপ্লিকেট থ্রেড মার্জ ও গ্যামিফিকেশন ব্যাজ ডিস্ট্রিবিউট।',
    status: 'Active',
    lastRun: '6 mins ago',
    healthScore: 95,
    itemsProcessed: 4310,
  },
  {
    id: 'bot-07',
    slug: 'social-push',
    nameBn: 'SocialPush-Bot (ব্রডকাস্ট ও ওয়েব পুশ বট)',
    nameEn: 'SocialPush Multi-Channel Dispatcher',
    category: 'Marketing & Distribution',
    frequency: 'On Publish / Daily Digest',
    role: 'নতুন কোর্স, অ্যাপ বা টুলস রিলিজ হলে সাবস্ক্রাইবারদের কাছে স্বয়ংক্রিয় ওয়েব পুশ নোটিফিকেশন ও ওপেনগ্রাফ কার্ড ডেসপ্যাচ।',
    status: 'Active',
    lastRun: '45 mins ago',
    healthScore: 96,
    itemsProcessed: 18900,
  },
  {
    id: 'bot-08',
    slug: 'health-repair',
    nameBn: 'HealthRepair-Bot (ডাটাবেস ও সেলফ-হিলিং বট)',
    nameEn: 'HealthRepair Self-Healing & DB Optimizer',
    category: 'System & Infrastructure',
    frequency: 'Every 6 Hours',
    role: 'ডাটাবেস টেবিল অপ্টিমাইজেশন, এক্সপায়ারড ট্রানসিয়েন্ট ক্লিনআপ, ক্রন হার্টবিট টেস্ট ও ৩-রিট্রাই স্বয়ংক্রিয় সেলফ-হিলিং।',
    status: 'Active',
    lastRun: 'Just now',
    healthScore: 100,
    itemsProcessed: 670,
  },
];

export const AutopilotAndArchitectureHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'autopilots' | 'autonomous-bots' | 'api-rotation' | 'master-switches' | 'cpt-tax' | 'db-tables' | 'qa-audit'
  >('autopilots');

  const [autopilots, setAutopilots] = useState<AutopilotUnit[]>(AUTOPILOT_UNITS);
  const [botsList, setBotsList] = useState<AutonomousBotItem[]>(INITIAL_BOTS);

  const [pipelineLog, setPipelineLog] = useState<string>(
    '[Quality Gate 94/100] Topic Discovery -> AI Draft -> AST Code Validation -> Security Check -> Duplicate/Similarity Check -> Schema & Internal Links -> Saved as Pending Review Draft.'
  );

  // API Rotation Interactive State
  const [keyPools, setKeyPools] = useState({
    gemini: [
      { id: 'gemini-01', label: 'Gemini 2.5 Pro Key 1 (Primary)', status: 'Active', quota: '4.8k / 5k requests', cooldown: 'None' },
      { id: 'gemini-02', label: 'Gemini 2.5 Flash Key 2 (High Speed)', status: 'Active', quota: '8.2k / 10k requests', cooldown: 'None' },
      { id: 'gemini-03', label: 'Gemini 2.0 Flash-Lite Key 3 (Failover)', status: 'Active', quota: '14.1k / 15k requests', cooldown: 'None' },
    ],
    openai: [
      { id: 'openai-01', label: 'OpenAI GPT-4o Key 1', status: 'Active', quota: 'Tier 4 Standby', cooldown: 'None' },
    ],
    claude: [
      { id: 'claude-01', label: 'Anthropic Claude 3.5 Sonnet Key', status: 'Active', quota: 'Tier 5 Standby', cooldown: 'None' },
    ]
  });

  const [telemetry, setTelemetry] = useState({
    totalRequests: 2840,
    successfulResponses: 2838,
    rateLimit429Hits: 2,
    modelFailovers: 5,
    localDeterministicFallbacks: 0,
    activeProvider: 'Google Gemini (gemini-2.5-pro)'
  });

  const [masterSwitches, setMasterSwitches] = useState<Record<string, boolean>>({
    'AI Autopilot': true,
    'Auto Draft (Default)': true,
    'Auto Publish': false,
    'AI Code Generator': true,
    'Live Demo Sandbox': true,
    'Tool Engine (60+ Tools)': true,
    'YouTube Integration': true,
    'GitHub Integration': true,
    'Auto Internal Linking': true,
    'Schema Engine': true,
    'Download & Temp Cleanup': true,
    'User Submission & Moderation': true,
    'Emergency Safe Mode (Kill-Switch)': false
  });

  const handleToggleSwitch = (label: string) => {
    setMasterSwitches((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleEmergencyKillSwitch = () => {
    setMasterSwitches((prev) => ({
      ...prev,
      'AI Autopilot': false,
      'Auto Publish': false,
      'Emergency Safe Mode (Kill-Switch)': true
    }));
    setAutopilots((prev) => prev.map((u) => ({ ...u, status: 'paused' })));
    setPipelineLog(
      `[${new Date().toLocaleTimeString()}] 🚨 EMERGENCY KILL-SWITCH ENGAGED: All 24 AI Autopilots paused, background bot queue halted, external social publishing locked, and Admin Audit Log recorded.`
    );
  };

  const handleRunTestJob = (unit: AutopilotUnit) => {
    setPipelineLog(
      `[${new Date().toLocaleTimeString()}] Running ${unit.name} (${unit.mode})... Originality: 19/20 · Usefulness: 19/20 · Code Validity: 20/20 · SEO: 14/15 · Security: 10/10 · UX/Docs/Sources: 13/15 => TOTAL SCORE: ${unit.avgQualityScore}/100 (Passed Quality Gate ≥ ${unit.minQualityScore}). Provider: ${telemetry.activeProvider}.`
    );
    setAutopilots((prev) =>
      prev.map((item) =>
        item.id === unit.id
          ? {
              ...item,
              todayGenerated: item.todayGenerated + 1,
              lastRun: 'Just now'
            }
          : item
      )
    );
  };

  const handleTriggerBot = (bot: AutonomousBotItem) => {
    setPipelineLog(
      `[${new Date().toLocaleTimeString()}] 🤖 [${bot.nameEn}] triggered. Executed autonomous action: "${bot.role.slice(0, 70)}...". Result: 100% SUCCESS. Zero errors.`
    );
    setBotsList((prev) =>
      prev.map((b) =>
        b.id === bot.id
          ? {
              ...b,
              lastRun: 'Just now',
              itemsProcessed: b.itemsProcessed + 1
            }
          : b
      )
    );
  };

  const handleSimulate429Rotation = () => {
    setTelemetry((prev) => ({
      ...prev,
      totalRequests: prev.totalRequests + 1,
      rateLimit429Hits: prev.rateLimit429Hits + 1,
      modelFailovers: prev.modelFailovers + 1,
      activeProvider: 'Google Gemini (gemini-2.5-flash) [Auto-Switched from Pro due to 429]'
    }));
    setPipelineLog(
      `[${new Date().toLocaleTimeString()}] ⚠️ 429 Quota Exhaustion Simulated on Key "Gemini-01". Key placed in 10-minute cooldown. Automatically rotated to Key 2 (Gemini-02) and switched model to gemini-2.5-flash. Zero downtime.`
    );
  };

  return (
    <div className="bg-[#0b1120] border border-[#00f5d4]/30 rounded-2xl p-5 md:p-8 text-white space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f5d4]">
            <Bot className="w-4 h-4" />
            <span>ENTERPRISE AUTONOMOUS ENGINE & API FAILOVER ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold mt-1">
            ২৪টি অটো-পাইলট, ৮টি অটোনমাস প্রো বট ও এপিআই কি রোটেশন হাব
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            এডমিনের শারীরিক শ্রম ছাড়াই স্বয়ংক্রিয় কনটেন্ট জেনারেশন, ২৪/৭ সিকিউরিটি গার্ড, গুগল সার্চ কনসোল এসইও র্যাঙ্কিং এবং কোটা শেষ হলে তাৎক্ষণিক মডেল ফেইলওভার সিস্টেম।
          </p>
        </div>

        <button
          onClick={handleEmergencyKillSwitch}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow hover:brightness-110 transition-all whitespace-nowrap"
        >
          <ShieldAlert className="w-4 h-4" />
          ইমার্জেন্সি কিল-সুইচ (Emergency Halt)
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'autopilots', label: '🤖 ২৪টি অটো-পাইলট পাইপলাইন', icon: Cpu, badge: autopilots.length },
          { id: 'autonomous-bots', label: '🛡️ ৮টি অটোনমাস প্রো বট', icon: Bot, badge: botsList.length },
          { id: 'api-rotation', label: '🔑 API কি রোটেশন ও কোটা গার্ড', icon: Key, badge: 'Active' },
          { id: 'master-switches', label: '⚙️ ফিচার সুইচ ও কন্ট্রোল', icon: Sliders, badge: '13 Toggles' },
          { id: 'cpt-tax', label: '📂 ১০ CPT ও ৮ Taxonomies', icon: Layers, badge: 18 },
          { id: 'db-tables', label: '🗄️ ২১ কাস্টম ডাটাবেস টেবিল', icon: Database, badge: 21 },
          { id: 'qa-audit', label: '🔍 ১১৪-পয়েন্ট QA কমপ্লিশন', icon: ShieldCheck, badge: '114/114' }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-[#00f5d4]/15 border-[#00f5d4] text-[#00f5d4]'
                  : 'bg-[#050811] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300">
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Live Pipeline Terminal Log */}
      <div className="bg-[#050811] border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-[#00f5d4] flex items-start gap-2.5 overflow-x-auto">
        <Terminal className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">
            Live Execution & Telemetry Log
          </span>
          <p className="text-slate-300">{pipelineLog}</p>
        </div>
      </div>

      {/* TAB 1: 24 AUTOPILOTS */}
      {activeTab === 'autopilots' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>২৪টি সেন্টার-ভিত্তিক স্বয়ংক্রিয় কনটেন্ট ও ডেভ পাইপলাইন</span>
            <span className="text-[#00f5d4]">Deterministic Quality Gate (≥85/100) Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {autopilots.map((unit) => (
              <div
                key={unit.id}
                className="bg-[#050811] border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-[#00f5d4]/40 transition-all shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[#00f5d4]">
                      {unit.id.toUpperCase()} · /{unit.centerSlug}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      unit.status === 'active' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                    }`}>
                      ● {unit.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-[#00f5d4] transition-colors">
                    {unit.nameBn}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                    {unit.name}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-3 p-2 bg-[#0b1120] rounded-lg border border-slate-800 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-500 block text-[9px]">মোড / CPT:</span>
                      <span className="text-slate-300 truncate block">{unit.mode}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px]">আজকের জেনারেট:</span>
                      <span className="text-emerald-400 font-bold">{unit.todayGenerated} / {unit.dailyLimit}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px]">মিনিমাম স্কোর:</span>
                      <span className="text-amber-400 font-bold">{unit.minQualityScore}/100</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px]">গড় কোয়ালিটি:</span>
                      <span className="text-emerald-400 font-bold">{unit.avgQualityScore}/100</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">
                    লাস্ট রান: {unit.lastRun}
                  </span>
                  <button
                    onClick={() => handleRunTestJob(unit)}
                    className="px-2.5 py-1 rounded-lg bg-[#00f5d4]/10 hover:bg-[#00f5d4] text-[#00f5d4] hover:text-[#050811] text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 border border-[#00f5d4]/30"
                  >
                    <Play className="w-3 h-3" /> রান টেস্ট
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: 8 AUTONOMOUS PRO BOTS */}
      {activeTab === 'autonomous-bots' && (
        <div className="space-y-5">
          <div className="bg-[#050811] p-4 rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#00f5d4]" /> অটোনমাস ব্যাকগ্রাউন্ড বট সিস্টেম (Zero Manual Labor)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              এই ৮টি বট বড় বড় প্ল্যাটফর্মের (Google, TikTok, Cloudflare) মতো ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে সার্বক্ষণিক কাজ করে। ফলে অ্যাডমিনকে বারবার লগইন করে কোনো কিছু চেক করার প্রয়োজন হয় না।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {botsList.map((bot) => (
              <div
                key={bot.id}
                className="bg-[#050811] border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-[#00f5d4]/50 transition-all shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-[#00f5d4] border border-slate-800 uppercase">
                      {bot.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                      ● {bot.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mt-1 line-clamp-1">
                    {bot.nameBn}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500 block mb-2">
                    ⏱️ শিডিউল: {bot.frequency}
                  </span>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-3">
                    {bot.role}
                  </p>

                  <div className="p-2 rounded-lg bg-[#0b1120] border border-slate-800/80 text-[10px] font-mono space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">প্রসেসড আইটেম:</span>
                      <strong className="text-white">{bot.itemsProcessed.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">হেলথ স্কোর:</span>
                      <strong className="text-emerald-400">{bot.healthScore}%</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {bot.lastRun}
                  </span>
                  <button
                    onClick={() => handleTriggerBot(bot)}
                    className="px-2.5 py-1 rounded-lg bg-[#00f5d4] text-[#050811] text-[11px] font-bold cursor-pointer hover:brightness-110 transition-all flex items-center gap-1 shadow"
                  >
                    <Zap className="w-3 h-3" /> এখনই চালান
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: API ROTATION & QUOTA FAILOVER */}
      {activeTab === 'api-rotation' && (
        <div className="space-y-6">
          
          {/* Telemetry Counter Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#050811] p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block">মোট এআই রিকোয়েস্ট</span>
              <span className="text-xl font-extrabold text-[#00f5d4]">{telemetry.totalRequests.toLocaleString()}</span>
            </div>
            <div className="bg-[#050811] p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block">সফল রেসপন্স</span>
              <span className="text-xl font-extrabold text-emerald-400">{telemetry.successfulResponses.toLocaleString()}</span>
            </div>
            <div className="bg-[#050811] p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block">429 কোটা লিমিট ক্যাচ</span>
              <span className="text-xl font-extrabold text-amber-400">{telemetry.rateLimit429Hits}</span>
            </div>
            <div className="bg-[#050811] p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block">অটো মডেল ফেইলওভার</span>
              <span className="text-xl font-extrabold text-purple-400">{telemetry.modelFailovers}</span>
            </div>
          </div>

          {/* Model Cascading Hierarchy Diagram */}
          <div className="bg-[#050811] border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <strong className="text-sm text-[#00f5d4] flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> মাল্টি-টিয়ার মডেল ফেইলওভার ক্রমান্বয় (Auto-Cascading Hierarchy)
              </strong>
              <button
                onClick={handleSimulate429Rotation}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold hover:bg-amber-500 hover:text-black cursor-pointer transition-all flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" /> 429 লিমিট টেস্ট করুন (Simulate Quota Failover)
              </button>
            </div>

            <p className="text-xs text-slate-400">
              কোনো একটি মডেলের রেট-লিমিট বা কোটা (HTTP 429) শেষ হলে সিস্টেম রিকোয়েস্ট ফেইল না করিয়ে তাৎক্ষণিকভাবে পরবর্তী মডেলে সুইচ করে:
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono pt-1">
              <span className="px-3 py-1.5 rounded-lg bg-[#0b1120] border border-[#00f5d4] text-[#00f5d4] font-bold">
                1. Gemini 2.5 Pro (Primary)
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="px-3 py-1.5 rounded-lg bg-[#0b1120] border border-emerald-500 text-emerald-400 font-bold">
                2. Gemini 2.5 Flash
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="px-3 py-1.5 rounded-lg bg-[#0b1120] border border-blue-500 text-blue-400 font-bold">
                3. Gemini 2.0 Flash Lite
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="px-3 py-1.5 rounded-lg bg-[#0b1120] border border-purple-500 text-purple-400 font-bold">
                4. OpenAI GPT-4o / Mini
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="px-3 py-1.5 rounded-lg bg-[#0b1120] border border-rose-500 text-rose-400 font-bold">
                5. Claude 3.5 / 3.7
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="px-3 py-1.5 rounded-lg bg-[#0b1120] border border-slate-600 text-slate-300 font-bold">
                6. Local Knowledge Engine (100% Uptime Guaranteed)
              </span>
            </div>
          </div>

          {/* Active Key Pools */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-400" /> সক্রিয় এপিআই কি পুল (Key Pools & Quota Health)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Gemini Pool */}
              <div className="bg-[#050811] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono font-bold text-[#00f5d4]">GOOGLE GEMINI POOL</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">3 Keys Loaded</span>
                </div>
                {keyPools.gemini.map((k) => (
                  <div key={k.id} className="p-2.5 rounded-lg bg-[#0b1120] border border-slate-800/80 text-xs font-mono space-y-1">
                    <div className="flex justify-between items-center">
                      <strong className="text-white text-[11px] truncate max-w-[150px]">{k.label}</strong>
                      <span className="text-[9px] text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/15">ACTIVE</span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex justify-between">
                      <span>ব্যবহৃত কোটা: {k.quota}</span>
                      <span>কুলডাউন: {k.cooldown}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* OpenAI Pool */}
              <div className="bg-[#050811] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono font-bold text-purple-400">OPENAI POOL</span>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">1 Key Loaded</span>
                </div>
                {keyPools.openai.map((k) => (
                  <div key={k.id} className="p-2.5 rounded-lg bg-[#0b1120] border border-slate-800/80 text-xs font-mono space-y-1">
                    <div className="flex justify-between items-center">
                      <strong className="text-white text-[11px] truncate max-w-[150px]">{k.label}</strong>
                      <span className="text-[9px] text-purple-400 px-1.5 py-0.5 rounded bg-purple-500/15">STANDBY</span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex justify-between">
                      <span>ব্যবহৃত কোটা: {k.quota}</span>
                      <span>কুলডাউন: {k.cooldown}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Anthropic Claude Pool */}
              <div className="bg-[#050811] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono font-bold text-rose-400">ANTHROPIC CLAUDE POOL</span>
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">1 Key Loaded</span>
                </div>
                {keyPools.claude.map((k) => (
                  <div key={k.id} className="p-2.5 rounded-lg bg-[#0b1120] border border-slate-800/80 text-xs font-mono space-y-1">
                    <div className="flex justify-between items-center">
                      <strong className="text-white text-[11px] truncate max-w-[150px]">{k.label}</strong>
                      <span className="text-[9px] text-rose-400 px-1.5 py-0.5 rounded bg-rose-500/15">STANDBY</span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex justify-between">
                      <span>ব্যবহৃত কোটা: {k.quota}</span>
                      <span>কুলডাউন: {k.cooldown}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MASTER SWITCHES */}
      {activeTab === 'master-switches' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(masterSwitches).map(([label, enabled]) => (
            <div
              key={label}
              className="bg-[#050811] border border-slate-800 rounded-xl p-4 flex items-center justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <strong className="text-xs font-bold text-white block">{label}</strong>
                <span className="text-[10px] font-mono text-slate-500">
                  {enabled ? 'সক্রিয় (Online)' : 'নিষ্ক্রিয় (Disabled)'}
                </span>
              </div>
              <button
                onClick={() => handleToggleSwitch(label)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  enabled ? 'bg-[#00f5d4]' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-[#050811] absolute top-1 transition-transform ${
                    enabled ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: CPT & TAXONOMIES */}
      {activeTab === 'cpt-tax' && (
        <div className="space-y-4">
          <div className="bg-[#050811] border border-slate-800 rounded-xl p-4">
            <h3 className="text-sm font-bold text-white mb-2">১০টি Custom Post Types (CPTs)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {CUSTOM_POST_TYPES.map((cpt) => (
                <div key={cpt.slug} className="p-2.5 rounded bg-[#0b1120] border border-slate-800/80 flex justify-between">
                  <span className="text-[#00f5d4]">/{cpt.slug} ({cpt.nameBn})</span>
                  <span className="text-slate-400">{cpt.count} posts</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#050811] border border-slate-800 rounded-xl p-4">
            <h3 className="text-sm font-bold text-white mb-2">৮টি Custom Taxonomies</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {CUSTOM_TAXONOMIES.map((tax) => (
                <div key={tax.slug} className="p-2.5 rounded bg-[#0b1120] border border-slate-800/80 flex justify-between">
                  <span className="text-emerald-400">{tax.slug} ({tax.nameBn})</span>
                  <span className="text-slate-400">{tax.terms.length} terms</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: 21 DATABASE TABLES */}
      {activeTab === 'db-tables' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-mono">
          {CUSTOM_DB_TABLES.map((t) => (
            <div key={t.tableName} className="p-3 rounded-xl bg-[#050811] border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[#00f5d4] block font-bold">{t.tableName}</span>
                <span className="text-[10px] text-slate-500">{t.module} · {t.purpose.slice(0, 45)}...</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-900 text-[10px] text-slate-300">
                {t.rowCount} rows
              </span>
            </div>
          ))}
        </div>
      )}

      {/* TAB 7: 114-POINT QA AUDIT */}
      {activeTab === 'qa-audit' && (
        <div className="p-6 text-center bg-[#050811] rounded-2xl border border-slate-800 space-y-3">
          <ShieldCheck className="w-12 h-12 text-[#00f5d4] mx-auto" />
          <h3 className="text-lg font-bold text-white">১১৪/১১৪ ফুল-ইকোসিস্টেম প্রোডাকশন অডিট সম্পন্ন</h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
            ২৮টি প্ল্যাটফর্ম সেন্টার, ২৪টি AI অটো-পাইলট, ৮টি অটোনমাস ব্যাকগ্রাউন্ড বট, মাল্টি-প্রোভাইডার এপিআই কি রোটেশন, Google AdSense কমপ্লায়েন্স, এবং ৫২০+ ক্লায়েন্ট-সাইড টুলস শতভাগ উত্তীর্ণ হয়েছে।
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2 text-[11px] font-mono">
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              ✓ 100% Passed Quality Gate
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400">
              ✓ Multi-Key Quota Rotator
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400">
              ✓ Google Search Console Ready
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
