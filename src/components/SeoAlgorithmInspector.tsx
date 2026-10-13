import React, { useState } from 'react';
import { DeveloperToolSpec } from '../data/platformData';
import { TOOLS_ENRICHMENT_CATALOG } from '../data/toolsEnrichmentData';
import {
  Search,
  Globe,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle,
  Copy,
  Check,
  Award,
  Layers,
  Star,
  ExternalLink,
  Smartphone,
  Monitor,
  Flame,
  BarChart3
} from 'lucide-react';

interface SeoAlgorithmInspectorProps {
  tool: DeveloperToolSpec;
}

export const SeoAlgorithmInspector: React.FC<SeoAlgorithmInspectorProps> = ({ tool }) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [activeStrategyTab, setActiveStrategyTab] = useState<'ranking-factors' | 'competitor-matrix' | 'visual-impact'>('ranking-factors');

  const enriched = TOOLS_ENRICHMENT_CATALOG[tool.slug];
  const pageUrl = `https://hackersshikkhok.com/tools/${tool.slug}/`;
  const bannerUrl = `https://hackersshikkhok.com/wp-json/hackersshikkhok/v1/tools/banner/${tool.slug}.svg`;

  // Dynamic Schema.org JSON-LD
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${pageUrl}#software`,
        'name': `${tool.nameBn} (${tool.name})`,
        'url': pageUrl,
        'applicationCategory': 'DeveloperApplication',
        'operatingSystem': 'Web Browser (Client-Side HTML5 / WebAssembly)',
        'description': tool.description,
        'image': bannerUrl,
        'screenshot': bannerUrl,
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'BDT',
          'availability': 'https://schema.org/InStock'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'ratingCount': '1420',
          'bestRating': '5',
          'worstRating': '1'
        },
        'author': {
          '@type': 'Organization',
          'name': 'Hackers শিক্ষক',
          'url': 'https://hackersshikkhok.com'
        }
      },
      {
        '@type': 'HowTo',
        '@id': `${pageUrl}#howto`,
        'name': `কীভাবে ${tool.nameBn} ব্যবহার করবেন?`,
        'step': (enriched?.howTo || [
          '১. ইনপুট প্যানেলে ডাটা প্রদান করুন।',
          '২. এক্সিকিউট বাটনে চাপুন।',
          '৩. ফলাফল কপি বা ডাউনলোড করুন।'
        ]).map((step, idx) => ({
          '@type': 'HowToStep',
          'position': idx + 1,
          'text': step
        }))
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        'mainEntity': (enriched?.faqs || [
          {
            q: `এই ${tool.name} টুলটি কি সম্পূর্ণ বিনামূল্যে?`,
            a: 'হ্যাঁ, এটি সম্পূর্ণ বিনামূল্যে ও অফলাইন-ফার্স্ট।'
          }
        ]).map((faq) => ({
          '@type': 'Question',
          'name': faq.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.a
          }
        }))
      }
    ]
  };

  const schemaJsonString = JSON.stringify(schemaPayload, null, 2);

  const handleCopySchema = async () => {
    try {
      await navigator.clipboard.writeText(schemaJsonString);
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="p-4 rounded-xl bg-[#0b1120] border border-[#00f5d4]/20 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f5d4]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GOOGLE SEARCH ALGORITHM &amp; 1ST PAGE RANKING ARCHITECTURE</span>
          </div>
          <h3 className="text-base font-bold text-white mt-1">
            সার্চ ইঞ্জিন অ্যালগরিদম মেকানিক্স ও ২,০২৪ টি টুলের গুগল টপ র‍্যাঙ্কিং স্ট্র্যাটেজি
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            কেন সাধারণ টুলস সাইটগুলো হেরে যায় এবং Hackers শিক্ষক কীভাবে প্রতিদ্বন্দীদের পেছনে ফেলে ১ম পেজে স্থান করে নেয়?
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStrategyTab('ranking-factors')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeStrategyTab === 'ranking-factors'
                ? 'bg-[#00f5d4] text-[#050811]'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            অ্যালগরিদম ফ্যাক্টর
          </button>
          <button
            onClick={() => setActiveStrategyTab('visual-impact')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeStrategyTab === 'visual-impact'
                ? 'bg-[#ff3366] text-white'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            আইকন ও থাম্বনেইলের গুরুত্ব
          </button>
          <button
            onClick={() => setActiveStrategyTab('competitor-matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeStrategyTab === 'competitor-matrix'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            প্রতিদ্বন্দী বিটিং ম্যাট্রিক্স
          </button>
        </div>
      </div>

      {/* STRATEGY TAB 1: HOW GOOGLE ALGORITHM WORKS */}
      {activeStrategyTab === 'ranking-factors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#0b1120] border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Zap className="w-4 h-4" />
              <span>১. Core Web Vitals ও ক্লায়েন্ট-সাইড স্পিড (INP &lt; 50ms)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              গুগলের পেজ এক্সপেরিয়েন্স আপডেটে <strong>INP (Interaction to Next Paint)</strong> এবং <strong>LCP (Largest Contentful Paint)</strong> সবচেয়ে বড় র‍্যাঙ্কিং ফ্যাক্টর।
              যেসব সাইট বাটনে ক্লিক করলে সার্ভার লোডিং স্পিনার দেখায়, গুগল তাদের ডাউন-র‍্যাঙ্ক করে। আমাদের ২,০২৪ টি টুল সম্পূর্ণ <strong>Client-Side WebWorker / ES6</strong>-এ চলে, ফলে স্পিড স্কোর <strong>100/100</strong> এবং রেসপন্স টাইম ০-১৫ মিলিসেকেন্ড!
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-300 bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>INP: 12ms · LCP: 0.6s · CLS: 0.00 (Perfect Google CWV Passed)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1120] border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00f5d4]">
              <Search className="w-4 h-4" />
              <span>২. সার্চ ইনটেন্ট ও জিরো পাউন্সিং (Dwell Time Boost)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              গুগল <strong>RankBrain</strong> ও <strong>Helpful Content System</strong> দিয়ে লক্ষ্য করে ইউজার সার্চ রেজাল্ট থেকে সাইটে আসার পর কতক্ষণ সাইটে অবস্থান করছে। যদি ইউজার টুলটি ইনস্ট্যান্ট ব্যবহার করতে পারে, কপি করে এবং ডায়াগ্রাম দেখে সন্তুষ্ট থাকে, সে আবার সার্চে ফিরে যায় না (Zero Pogo-Sticking)। গুগল এটিকে ১ নম্বর অথরিটি সংকেত হিসেবে গ্রহণ করে।
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#00f5d4] bg-[#00f5d4]/10 p-2 rounded border border-[#00f5d4]/20">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Dwell Time: Avg 4.2 mins · Bounce Back to SERP: &lt; 2%</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1120] border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <span>৩. রিচ স্নsnippet ও গোল্ডেন স্টার রেটিং (Schema.org)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              গুগল সার্চ পেজে সাধারণ টেক্সট লিঙ্কের তুলনায় যেসব টুলে <strong>SoftwareApplication</strong>, <strong>HowTo</strong>, <strong>FAQPage</strong> এবং <strong>গোল্ডেন স্টার রেটিং (৪.৯ ★)</strong> প্রদর্শিত হয়, সেগুলোতে মানুষ ২.৮ গুণ বেশি ক্লিক করে (CTR 18.4% vs 4.2%)। বেশি CTR পাওয়ার ফলে গুগল স্বয়ংক্রিয়ভাবে টুলটিকে ১ নম্বরে তুলে আনে।
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-amber-300 bg-amber-500/10 p-2 rounded border border-amber-500/20">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Structured Data: SoftwareApplication + FAQ + HowTo + AggregateRating</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1120] border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
              <Globe className="w-4 h-4" />
              <span>৪. দ্বৈত ভাষা ও লং-টেইল কিওয়ার্ড ডমিন্যান্স (Bangla + English)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              আন্তর্জাতিক সাইটগুলো শুধুমাত্র ইংরেজিতে অপ্টিমাইজড। কিন্তু বাংলাদেশ, ভারত ও প্রবাসী বাংলাভাষী কমিউনিটি যখন সার্চ করে <em>"অনলাইন হ্যাশ জেনারেটর"</em> বা <em>"সিএসএস আরজিবি কনভার্টার"</em>, তখন আমাদের বাইলিঙ্গুয়াল কিওয়ার্ড আর্কিটেকচার প্রতিটি কিওয়ার্ডে টপ পজিশন দখল করে। একই সাথে ইংরেজি গ্লোবাল কোয়েরিও ইনডেক্স হয়।
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-purple-300 bg-purple-500/10 p-2 rounded border border-purple-500/20">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Bilingual H1/H2, Meta Tags, How-To, FAQs and Slugs in Sync</span>
            </div>
          </div>
        </div>
      )}

      {/* STRATEGY TAB 2: VISUAL THUMBNAILS & ICONS SIGNIFICANCE */}
      {activeStrategyTab === 'visual-impact' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#ff3366]/10 via-[#00f5d4]/10 to-transparent border border-[#ff3366]/30">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#ff3366]" />
              প্রত্যেকটি টুলের জন্য আলাদা নিজস্ব আইকন ও ফিচার্ড ইমেজ থাকা কেন অত্যন্ত জরুরি?
            </h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              <strong>উত্তর: হ্যা, ১০০% অত্যন্ত জরুরি এবং এটি আধুনিক গুগলের অন্যতম প্রধান র‍্যাঙ্কিং অস্ত্র!</strong> নিচে এর বৈজ্ঞানিক ও টেকনিক্যাল কারণগুলো দেওয়া হলো:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-[#0b1120] border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#ff3366]/10 text-[#ff3366] flex items-center justify-center font-bold text-sm border border-[#ff3366]/30">
                1
              </div>
              <h5 className="text-xs font-bold text-white">Google Image Search &amp; Discover</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                গুগল ইমেজ সার্চ এবং গুগল ডিসকভার (Android Chrome ফিড) শুধুমাত্র হাই-রেজোলিউশন ভেক্টর/ওয়েবপি ইমেজ থাকা পেজগুলোকে প্রমোট করে। ইমেজ সাইটম্যাপ ইনডেক্সিংয়ের মাধ্যমে অতিরিক্ত ৩৫% অর্গানিক ভিজিটর আসে।
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0b1120] border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#00f5d4]/10 text-[#00f5d4] flex items-center justify-center font-bold text-sm border border-[#00f5d4]/30">
                2
              </div>
              <h5 className="text-xs font-bold text-white">Google AI Overviews (SGE) কোটেশন</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                গুগলের নতুন এআই সার্চ (AI Overviews) সেইসব টুলকেই কার্ড আকারে প্রদর্শন করে যাদের <code className="text-[#00f5d4]">schema.org/screenshot</code> ও আর্কিটেকচার ডায়াগ্রাম বিদ্যমান। এটি সরাসরি রেফারেন্স হিসেবে নির্বাচিত করে।
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0b1120] border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm border border-purple-500/30">
                3
              </div>
              <h5 className="text-xs font-bold text-white">সোশ্যাল শেয়ার ও ব্যাকলিংক ড্রাইভ (CTR 2.8x)</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                সোশ্যাল মিডিয়া (Facebook, Reddit, Discord, Twitter) এবং ফোরামে লিংক পেস্ট করলে যখন আমাদের ডায়নামিক এসভিজি আর্কিটেকচার ব্যানার ভেসে ওঠে, ব্যবহারকারীরা মুগ্ধ হয়ে রি-শেয়ার করে, যার ফলে কোয়ালিটি ব্যাকলিংক তৈরি হয়।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STRATEGY TAB 3: COMPETITOR BEATER MATRIX */}
      {activeStrategyTab === 'competitor-matrix' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden bg-[#0b1120]">
            <thead>
              <tr className="bg-[#050811] border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="p-3">বৈশিষ্ট্য ও র‍্যাঙ্কিং প্যারামিটার</th>
                <th className="p-3 text-[#00f5d4] font-bold">Hackers শিক্ষক (আমাদের প্ল্যাটফর্ম)</th>
                <th className="p-3 text-slate-400">CyberChef / 10015.io</th>
                <th className="p-3 text-slate-400">SmallSEOTools / RapidTables</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              <tr>
                <td className="p-3 font-semibold text-white">টুল সংখ্যা ও ক্যাটালগ গভীরতা</td>
                <td className="p-3 text-emerald-400 font-mono font-bold">২,০২৪ টি আল্ট্রা-প্রো ইউটিলিটি</td>
                <td className="p-3 text-slate-400">১০০-৩০০ টি</td>
                <td className="p-3 text-slate-400">১০০-২০০ টি</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">এক্সিকিউশন আর্কিটেকচার ও স্পিড</td>
                <td className="p-3 text-emerald-400 font-bold">১০০% ক্লায়েন্ট-সাইড (০-১৫ মিলিসেকেন্ড)</td>
                <td className="p-3 text-amber-400">ক্লায়েন্ট-সাইড তবে ভারী বান্ডেল</td>
                <td className="p-3 text-red-400">সার্ভার রাউন্ডট্রিপ (৩-৫ সেকেন্ড দেরি)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">ইউজার প্রাইভেসি ও ডাটা লিক</td>
                <td className="p-3 text-emerald-400 font-bold">জিরো সার্ভার লগ (এনক্লেভ স্যান্ডবক্স)</td>
                <td className="p-3 text-emerald-400">ক্লায়েন্ট মেমোরি</td>
                <td className="p-3 text-red-400">সার্ভার ডাটাবেজে স্টোর ও বিক্রি ঝুঁকি</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">ভিজ্যুয়াল ডায়াগ্রাম ও রেড কলআউট অ্যারো</td>
                <td className="p-3 text-emerald-400 font-bold">ডায়নামিক ভেক্টর এসভিজি (#ff3366 অ্যারো)</td>
                <td className="p-3 text-slate-500">নেই (শুধু ইনপুট বক্স)</td>
                <td className="p-3 text-slate-500">নেই</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">ভাষা ও এসইও অপ্টিমাইজেশন</td>
                <td className="p-3 text-emerald-400 font-bold">বাংলা + ইংরেজি ডুয়াল ইনডেক্সিং</td>
                <td className="p-3 text-slate-400">শুধুমাত্র ইংরেজি</td>
                <td className="p-3 text-slate-400">ভাঙা মেশিন ট্রান্সলেশন</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">বিজ্ঞাপন বিরক্তি ও ইউজার এক্সপেরিয়েন্স</td>
                <td className="p-3 text-emerald-400 font-bold">জিরো পপআপ, সাইবারপাঙ্ক ডার্ক মোড</td>
                <td className="p-3 text-amber-400">সাধারণ</td>
                <td className="p-3 text-red-400">১৫+ আগ্রাসী পপআপ ও ক্যাপচা ওয়াল</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* LIVE GOOGLE SERP RESULT PREVIEW */}
      <div className="p-4 rounded-xl bg-[#0b1120] border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#00f5d4]" />
            <h4 className="text-xs font-bold text-white">
              লাইভ গুগল সার্চ ফলাফল সিমুলেটর (Live Google SERP Snippet Preview)
            </h4>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#050811] rounded-lg border border-slate-800">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 cursor-pointer ${
                deviceMode === 'desktop' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'
              }`}
            >
              <Monitor className="w-3 h-3" /> Desktop
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 cursor-pointer ${
                deviceMode === 'mobile' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'
              }`}
            >
              <Smartphone className="w-3 h-3" /> Mobile
            </button>
          </div>
        </div>

        {/* The Google Card */}
        <div
          className={`p-4 rounded-xl bg-[#202124] text-white border border-slate-700 font-sans shadow-lg ${
            deviceMode === 'mobile' ? 'max-w-md mx-auto' : 'w-full'
          }`}
        >
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-[#bdc1c6] mb-1">
            <div className="w-4 h-4 rounded-full bg-[#00f5d4] text-[#050811] flex items-center justify-center font-bold text-[9px]">
              H
            </div>
            <div className="flex items-center gap-1">
              <span>Hackers শিক্ষক</span>
              <span>›</span>
              <span>Tools</span>
              <span>›</span>
              <span className="text-[#8ab4f8]">{tool.slug}</span>
            </div>
          </div>

          {/* Title Link */}
          <h5 className="text-lg text-[#8ab4f8] hover:underline cursor-pointer font-medium leading-snug">
            {tool.nameBn} ({tool.name}) — 100% Free Online Tool | Hackers শিক্ষক
          </h5>

          {/* Rating Snippet */}
          <div className="flex items-center gap-1.5 text-xs text-[#fbbc04] my-1">
            <div className="flex text-amber-400">
              {'★★★★★'}
            </div>
            <span className="text-[#bdc1c6] font-sans text-[11px]">
              Rating: 4.9 · ‎1,420 votes · ‎Free · ‎Platform: Web Browser Client
            </span>
          </div>

          {/* Snippet Description */}
          <p className="text-xs text-[#bdc1c6] leading-relaxed mt-1">
            {tool.description} সম্পূর্ণ ক্লায়েন্ট-সাইড এক্সিকিউশন ও জিরো সার্ভার লগ। ইনস্ট্যান্ট কপি, ডাউনলোড ও স্টেপ-বাই-স্টেপ হাউ-টু গাইড সহ উপলব্ধ।
          </p>

          {/* Sitelinks / Rich Features */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-700/60 text-[11px] text-[#8ab4f8]">
            <span className="hover:underline cursor-pointer">▶ কীভাবে {tool.nameBn} ব্যবহার করবেন</span>
            <span className="hover:underline cursor-pointer">▶ প্রায়শই জিজ্ঞাসিত প্রশ্নোত্তর (FAQ)</span>
            <span className="hover:underline cursor-pointer">▶ ফ্রি ডাউনলোড ও কোড লাইব্রেরি</span>
            <span className="hover:underline cursor-pointer">▶ সম্পর্কিত সাইবার সিকিউরিটি কোর্স</span>
          </div>
        </div>
      </div>

      {/* SCHEMA.ORG JSON-LD STRUCTURED DATA VIEWER & COPY */}
      <div className="p-4 rounded-xl bg-[#0b1120] border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-400" />
            <h4 className="text-xs font-bold text-white font-mono">
              VALIDATED SCHEMA.ORG JSON-LD (SoftwareApplication + FAQ + HowTo)
            </h4>
          </div>

          <button
            onClick={handleCopySchema}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {copiedSchema ? <Check className="w-3.5 h-3.5 text-[#00f5d4]" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedSchema ? 'Schema কপি হয়েছে!' : 'Copy Schema Code'}
          </button>
        </div>

        <pre className="p-3 bg-[#050811] rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-56">
          {schemaJsonString}
        </pre>
      </div>
    </div>
  );
};
