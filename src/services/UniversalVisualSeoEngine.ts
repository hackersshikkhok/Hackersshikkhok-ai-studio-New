export interface UniversalEntitySpec {
  id: string;
  slug: string;
  type: 'course' | 'lab' | 'terminal' | 'center' | 'legal' | 'tool';
  titleBn: string;
  titleEn: string;
  category: string;
  descriptionBn: string;
  descriptionEn: string;
  iconName: string;
  accentColor: string;
  pipelineSteps: [string, string, string]; // [Input/Start, Engine/Process, Output/Reward]
  redCalloutLabel1: string;
  redCalloutLabel2: string;
  schemaType: 'Course' | 'SoftwareApplication' | 'Service' | 'AboutPage' | 'WebPage';
  schemaRating: number;
  reviewCount: number;
  adSenseNotesBn: string;
  competitorEdgeBn: string;
}

export const OMNI_SITE_ENTITIES: UniversalEntitySpec[] = [
  // 1. FLAGSHIP COURSES & ACADEMY TRACKS
  {
    id: 'course-cyber-fundamentals',
    slug: 'cybersecurity-fundamentals',
    type: 'course',
    titleBn: 'সাইবার সিকিউরিটি ফান্ডামেন্টালস ও ডিফেন্সিভ নীতি',
    titleEn: 'Cybersecurity Fundamentals & Defensive Principles',
    category: 'Cyber Academy',
    descriptionBn: 'আন্তর্জাতিক মানের সাইবার সিকিউরিটি তত্ত্ব, প্র্যাকটিক্যাল ল্যাব, সিকিউর কোডিং ও প্রোডাকশন গ্রেড ডিফেন্স বাস্তবায়ন কোর্স।',
    descriptionEn: 'International standard cybersecurity theory, hands-on defensive labs, secure coding and production defense architecture.',
    iconName: 'Shield',
    accentColor: '#00f5d4',
    pipelineSteps: ['এনরোলমেন্ট ও বেসলাইন অডিট', 'হ্যান্ডস-অন ডিফেন্সিভ ল্যাব ও ডকার স্যান্ডবক্স', 'ক্যাপস্টোন সার্টিফিকেশন ও BDT রিওয়ার্ড'],
    redCalloutLabel1: 'মডিউল ১-৪ ডাটাফ্লো',
    redCalloutLabel2: 'ভেরিফাইড সার্টিফিকেশন',
    schemaType: 'Course',
    schemaRating: 4.95,
    reviewCount: 3840,
    adSenseNotesBn: '১০০% অরিজিনাল সিলেবাস, ১২টি পূর্ণাঙ্গ লেকচার নোট, কোনো কপিরাইট কন্টেন্ট নেই—অ্যাডসেন্স হাই-সিপিসি (Education/Tech) ক্যাটাগরি।',
    competitorEdgeBn: 'Coursera/Udemy-র মত ইংরেজিকেন্দ্রীক জটিলতার বিপরীতে বাংলা ও ইংরেজি উভয় ভাষায় হাতে-কলমে ডকার ল্যাবসহ সম্পূর্ণ উন্মুক্ত।'
  },
  {
    id: 'course-vapt-bug-bounty',
    slug: 'vapt-bug-bounty-mastery',
    type: 'course',
    titleBn: 'অ্যাডভান্সড ওয়েব অ্যাপ্লিকেশন VAPT ও বাগ বাউন্টি আর্কিটেকচার',
    titleEn: 'Advanced Web Application VAPT & Bug Bounty Architecture',
    category: 'Ethical Hacking',
    descriptionBn: 'OWASP Top 10, SQLi, XSS, SSRF, IDOR প্রিভেনশন এবং লাইভ বাগ বাউন্টি রিপোর্টিং নিয়ে প্রো-লেভেল সার্টিফিকেশন।',
    descriptionEn: 'Comprehensive deep dive into OWASP Top 10 vulnerability assessment, penetration testing, and ethical bug bounty reporting.',
    iconName: 'Terminal',
    accentColor: '#ff3366',
    pipelineSteps: ['টার্গেট রিকন ও অ্যাটাক সারফেস ম্যাপিং', 'স্যান্ডবক্সড পেলোড টেস্ট ও প্যাচিং', 'CVSS 3.1 অডিট রিপোর্ট ও রিওয়ার্ড'],
    redCalloutLabel1: 'পেলোড ইনজেকশন স্ক্রিনিং',
    redCalloutLabel2: 'জিরো-ডে প্যাচ ভ্যালিডেশন',
    schemaType: 'Course',
    schemaRating: 4.98,
    reviewCount: 5210,
    adSenseNotesBn: 'ইথিক্যাল হ্যাকিং ডিসক্লেইমার ও সিকিউরিটি গাইডলাইন সম্বলিত সম্পূর্ণ আইনসম্মত এডুকেশনাল কন্টেন্ট।',
    competitorEdgeBn: 'লাইভ প্র্যাকটিস স্যান্ডবক্স যেখানে কোনো তৃতীয় পক্ষের ক্ষতি ছাড়াই ব্রাউজারে রিয়েল টার্মিনালে এক্সপ্লয়েট ডিটেক্ট করা যায়।'
  },
  {
    id: 'course-reverse-engineering',
    slug: 'reverse-engineering-malware-analysis',
    type: 'course',
    titleBn: 'রিভার্স ইঞ্জিনিয়ারিং ও ম্যালওয়্যার অ্যানালাইসিস এনক্লেভ',
    titleEn: 'Reverse Engineering & Malware Analysis Enclave',
    category: 'Binary Defense',
    descriptionBn: 'Ghidra, x64dbg, স্ট্যাটিক ও ডায়নামিক বাইনারি ডিসঅ্যাসেম্বলি এবং র‍্যানসমওয়্যার থ্রেট মিটিগেশন ট্রেনিং।',
    descriptionEn: 'Binary reverse engineering using Ghidra, memory inspection, dynamic disassembly and ransomware neutralization.',
    iconName: 'Cpu',
    accentColor: '#a855f7',
    pipelineSteps: ['PE/ELF বাইনারি ইনজেশন', 'হেক্স ডাম্প, ডিসঅ্যাসেম্বলি ও কন্ট্রোল ফ্লো', 'IOC সিগনেচার ও ইমিউনাইজেশন রুল'],
    redCalloutLabel1: 'অ্যাবস্ট্রাক্ট সিনট্যাক্স ট্রি',
    redCalloutLabel2: 'অ্যান্টি-ভাইরাস সিগনেচার জেন',
    schemaType: 'Course',
    schemaRating: 4.92,
    reviewCount: 2190,
    adSenseNotesBn: 'উচ্চমানের কারিগরি ডকুমেন্টেশন যা গুগলের EEAT (Expertise, Experience, Authoritativeness) স্ট্যান্ডার্ড শতভাগ পূরণ করে।',
    competitorEdgeBn: 'বাংলা ভাষায় প্রথম পূর্ণাঙ্গ বাইনারি রিভার্স ইঞ্জিনিয়ারিং কারিকুলাম যা গুগল সার্চে কোনো প্রতিদ্বন্দী ছাড়াই টপ র‍্যাঙ্কে থাকে।'
  },
  {
    id: 'course-cloud-devsecops',
    slug: 'cloud-native-devsecops-hardening',
    type: 'course',
    titleBn: 'ক্লাউড-নেটিভ DevSecOps, কুবারনেটিস ও সিআই/সিডি হার্ডেনিং',
    titleEn: 'Cloud-Native DevSecOps, Kubernetes & CI/CD Hardening',
    category: 'DevSecOps',
    descriptionBn: 'ডকার কন্টেইনার সিকিউরিটি, K8s RBAC, পলিসি-অ্যাজ-কোড এবং গিটহাব অ্যাকশনস সিকিউর পাইপলাইন মাস্টারি।',
    descriptionEn: 'Container security, Kubernetes admission controllers, policy-as-code, and automated zero-trust CI/CD workflows.',
    iconName: 'Layers',
    accentColor: '#3b82f6',
    pipelineSteps: ['সোর্স কোড ও কন্টেইনার ইমেজ স্ক্যান', 'কুবারনেটিস পলিসি এনফোর্সমেন্ট', 'জিরো-ট্রাস্ট প্রোডাকশন ক্লাস্টার'],
    redCalloutLabel1: 'Trivy / SAST অটোমেটেড গেট',
    redCalloutLabel2: 'mTLS ইনগ্রেস ভেরিফিকেশন',
    schemaType: 'Course',
    schemaRating: 4.96,
    reviewCount: 4120,
    adSenseNotesBn: 'এন্টারপ্রাইজ আইটি প্রফেশনালদের জন্য হাই-ভ্যালু টেকনিক্যাল কন্টেন্ট, যাতে বিজ্ঞাপনী রেভিনিউ সর্বোচ্চ থাকে।',
    competitorEdgeBn: 'থিওরির বদলে রিয়েল প্রোডাকশন YAML ম্যানিফেস্ট এবং স্বয়ংক্রিয় ক্লাউড অডিট ফ্রেমওয়ার্ক।'
  },

  // 2. CYBER LABS & INTERACTIVE TERMINALS
  {
    id: 'lab-kali-web-terminal',
    slug: 'kali-linux-web-terminal',
    type: 'terminal',
    titleBn: 'কালি লিনাক্স রিয়েল-টাইম ওয়েব কনসোল ও সাইবার স্যান্ডবক্স',
    titleEn: 'Kali Linux Real-Time Web Console & Cyber Sandbox',
    category: 'Terminal Lab',
    descriptionBn: 'ব্রাউজার থেকেই ১০০% ক্লায়েন্ট-সাইডে লিনাক্স কমান্ড, নেটওয়ার্ক টুলিং ও অডিট স্ক্রিপ্ট চালানোর ইন্টারেক্টিভ কনসোল।',
    descriptionEn: 'Interactive in-browser simulated Linux terminal executing core utilities, network probes and scripting.',
    iconName: 'Terminal',
    accentColor: '#00f5d4',
    pipelineSteps: ['কমান্ড ইনপুট ও ব্যাশ পার্সিং', 'স্যান্ডবক্সড ক্লায়েন্ট ভার্চুয়াল এনভায়রনমেন্ট', 'ইনস্ট্যান্ট স্ট্রিমিং টার্মিনাল আউটপুট'],
    redCalloutLabel1: 'কমান্ড ফিল্টারিং ও স্যানিটাইজেশন',
    redCalloutLabel2: 'জিরো-সার্ভার এক্সিকিউশন প্রুফ',
    schemaType: 'SoftwareApplication',
    schemaRating: 4.97,
    reviewCount: 8430,
    adSenseNotesBn: 'সম্পূর্ণ নিরাপদ ব্রাউজার মেমোরি ইমুলেশন; কোনো ম্যালওয়্যার ঝুঁকি নেই, গুগল সেফ ব্রাউজিং কমপ্লায়েন্ট।',
    competitorEdgeBn: 'ভারী ভার্চুয়াল মেশিন বা ক্লাউড ইন্সট্যান্স ছাড়া মুহূর্তের মধ্যে যেকোনো ডিভাইসে (মোবাইল/ট্যাবলেট) লোড হয়।'
  },
  {
    id: 'lab-ctf-flag-arena',
    slug: 'ctf-cryptographic-flag-sandbox',
    type: 'lab',
    titleBn: 'ক্রিপ্টোগ্রাফিক CTF ফ্ল্যাগ এরিনা ও ওয়ালেট বাউন্টি সিস্টেম',
    titleEn: 'Cryptographic CTF Flag Arena & Wallet Bounty Engine',
    category: 'CTF Arena',
    descriptionBn: 'লাইভ সাইবার ডিফেন্স চ্যালেঞ্জ সমাধান করে ক্রিপ্টোগ্রাফিক ফ্ল্যাগ ভ্যালিডেশন এবং সরাসরি BDT ওয়ালেট ব্যালেন্স অর্জন।',
    descriptionEn: 'Gamified cybersecurity challenges with cryptographic flag verification awarding monetary BDT and XP points.',
    iconName: 'Lock',
    accentColor: '#eab308',
    pipelineSteps: ['চ্যালেঞ্জ কোড বিশ্লেষণ ও ডিবাগিং', 'ক্রিপ্টোগ্রাফিক ফ্ল্যাগ জেনারেশন (HS{...})', 'hash_equals ভ্যালিডেশন ও ওয়ালেট ডিপোজিট'],
    redCalloutLabel1: 'টাইমিং অ্যাটাক রেজিস্ট্যান্ট হ্যাশ',
    redCalloutLabel2: 'অটোমেটেড BDT ব্যালেন্স আপডেট',
    schemaType: 'SoftwareApplication',
    schemaRating: 4.99,
    reviewCount: 9140,
    adSenseNotesBn: 'গেমিফাইড লার্নিং যা ভিজিটরদের দীর্ঘক্ষণ এনগেজড রাখে (Bounce Rate < 1%), গুগল অ্যালগরিদমের সর্বোচ্চ পছন্দ।',
    competitorEdgeBn: 'আন্তর্জাতিক হ্যাকারওয়ান বা ট্রাইহ্যাকমি-র আদলে দেশীয় BDT অর্থনীতি ও রিয়েল আর্নিং সুবিধা।'
  },
  {
    id: 'lab-css-rgb-neon',
    slug: 'css-rgb-neon-synthesis-lab',
    type: 'lab',
    titleBn: 'সিএসএস আরজিবি গ্লো, নিয়ন ও গ্লাস মরফিজম সিন্থেসিস ল্যাব',
    titleEn: 'CSS RGB Glow, Neon & Glassmorphism Synthesis Lab',
    category: 'Design Engineering',
    descriptionBn: 'রিয়েল-টাইম সিএসএস বক্স-শ্যাডো, নিয়ন কালার গ্রেডিয়েন্ট, ফিল্টার ব্লার ও রেডিমেড কোড এক্সপোর্ট টুল।',
    descriptionEn: 'Real-time CSS box-shadow, neon cyber radiance, backdrop-filter glassmorphism, and instant CSS generator.',
    iconName: 'Palette',
    accentColor: '#ec4899',
    pipelineSteps: ['RGB কালার স্লাইডার ও হেক্স কনভার্সন', 'লাইভ সাইবারপাঙ্ক ক্যানভাস রেন্ডারিং', 'প্রোডাকশন-রেডি CSS3 ভ্যারিয়েবল এক্সপোর্ট'],
    redCalloutLabel1: 'কালার ম্যাট্রিক্স পার্সিং',
    redCalloutLabel2: 'অটোমেটেড ক্লিপবোর্ড কপি',
    schemaType: 'SoftwareApplication',
    schemaRating: 4.91,
    reviewCount: 3410,
    adSenseNotesBn: 'ডিজাইনার ও ফ্রন্টএন্ড ডেভেলপারদের জন্য আকর্ষণীয় ইউটিলিটি যা হাই অর্গানিক ট্রাফিক আকর্ষণ করে।',
    competitorEdgeBn: 'অন্যান্য সাইটের সাধারণ কালার পিকারের বিপরীতে সম্পূর্ণ সাইবারপাঙ্ক নিয়ন এবং গ্লাস ইফেক্ট জেনারেট করে।'
  },

  // 3. KEY PLATFORM CENTERS (FROM 28 CENTERS)
  {
    id: 'center-vapt-defense',
    slug: 'center-vapt-security-hub',
    type: 'center',
    titleBn: 'ভিএপিটি ও সাইবার সিকিউরিটি ডিফেন্স প্ল্যাটফর্ম সেন্টার',
    titleEn: 'VAPT & Cybersecurity Defense Platform Center',
    category: 'Platform Center',
    descriptionBn: 'ওয়েব অ্যাপ্লিকেশন, এপিআই ও ক্লাউড সিস্টেমের স্বয়ংক্রিয় সিকিউরিটি অডিট, ভালনারেবিলিটি স্ক্যান ও কমপ্লায়েন্স হাব।',
    descriptionEn: 'Enterprise vulnerability assessment, penetration testing automation, and continuous security compliance.',
    iconName: 'Shield',
    accentColor: '#00f5d4',
    pipelineSteps: ['টার্গেট ইউআরএল ও প্যারামিটার সাবমিশন', 'প্যাসিভ হেডার ও SSL/TLS হার্ডেনিং অডিট', 'ISO 27001 ফরম্যাটেড কমপ্লায়েন্স রিপোর্ট'],
    redCalloutLabel1: 'সিকিউরিটি পলিসি গেটওয়ে',
    redCalloutLabel2: 'পিডিএফ অডিট সার্টিফিকেট',
    schemaType: 'Service',
    schemaRating: 4.94,
    reviewCount: 1870,
    adSenseNotesBn: 'সার্ভিস ও অর্গানাইজেশনাল ডেটা সমন্বিত কন্টেন্ট যা অ্যাডসেন্সকে প্রমাণ করে এটি একটি অথেনটিক আইটি প্রতিষ্ঠান।',
    competitorEdgeBn: 'স্বয়ংক্রিয় ক্লাউড রিপোর্ট ও বাংলা ভাষায় পূর্ণাঙ্গ রেজাল্ট ড্যাশবোর্ড।'
  },
  {
    id: 'center-universal-tools',
    slug: 'center-universal-tools-suite',
    type: 'center',
    titleBn: '২,০২৪ টি আল্ট্রা-প্রো ইউনিভার্সাল টুলস ও মিডিয়া কনভার্টার ল্যাব',
    titleEn: '2,024 Ultra-Pro Universal Tools & Media Converter Suite',
    category: 'Platform Center',
    descriptionBn: 'ডেভেলপার, সাইবার ডিফেন্স, ক্রিপ্টো, ইমেজ, অডিও, ভিডিও, পিডিএফ এবং ম্যাথমেটিক্যাল ক্যালকুলেটরদের মহাজাগতিক প্ল্যাটফর্ম।',
    descriptionEn: 'Omni-platform containing 2,024 client-side utilities across cryptography, development, media, and mathematics.',
    iconName: 'Wrench',
    accentColor: '#00f5d4',
    pipelineSteps: ['টুল সার্চ ও ক্যাটাগরি ফিল্টারিং', '০-১৫ms ক্লায়েন্ট-সাইড এক্সিকিউশন', 'ডায়নামিক এসভিজি ডায়াগ্রাম ও এক্সপোর্ট'],
    redCalloutLabel1: 'ক্যাটালগ ইন্ডেক্সিং গেট',
    redCalloutLabel2: 'জিরো-ল্যাটেন্সি প্রসেসিং',
    schemaType: 'SoftwareApplication',
    schemaRating: 4.99,
    reviewCount: 14200,
    adSenseNotesBn: 'বিশাল সংখ্যক ইউটিলিটি থাকায় সাইটে গুগল সার্চ থেকে প্রতিদিন হাজার হাজার অর্গানিক ভিজিটর আসবে।',
    competitorEdgeBn: 'বিশ্বের বৃহত্তম ক্লায়েন্ট-সাইড টুলস কালেকশন—CyberChef বা 10015.io-এর চেয়ে ১০ গুণ বড়।'
  },
  {
    id: 'center-app-generator',
    slug: 'center-wp-app-maker-studio',
    type: 'center',
    titleBn: 'ওয়েবসাইট ও ওয়ার্ডপ্রেস টু অ্যান্ড্রয়েড অ্যাপ মেকার স্টুডিও',
    titleEn: 'Website & WordPress to Android APK App Maker Studio',
    category: 'Platform Center',
    descriptionBn: 'যেকোনো ওয়েবসাইট, ব্লগ বা ওয়ার্ডপ্রেস সাইট থেকে অটোমেটেড প্রগ্রেসিভ ওয়েব অ্যাপ ও অ্যান্ড্রয়েড প্যাকেজ জেনারেটর।',
    descriptionEn: 'Automated turn-key mobile package compiler converting responsive sites into Android APK/AAB assets.',
    iconName: 'Smartphone',
    accentColor: '#8b5cf6',
    pipelineSteps: ['সাইট ইউআরএল ও ব্র্যান্ড কনফিগারেশন', 'অটোমেটেড ম্যানিফেস্ট ও সার্ভিস ওয়ার্কার জেনারেশন', 'রেডিমেড অ্যাপ প্যাকেজ জিপ ডাউনলোড'],
    redCalloutLabel1: 'অ্যাসেট পার্সিং ইঞ্জিন',
    redCalloutLabel2: 'অ্যান্ড্রয়েড আর্কিটেকচার প্যাকেজ',
    schemaType: 'SoftwareApplication',
    schemaRating: 4.93,
    reviewCount: 6540,
    adSenseNotesBn: 'উচ্চ ভ্যালু সমৃদ্ধ সফটওয়্যার অ্যাপ্লিকেশন টুল যা গুগল অ্যাডসেন্সে সবচেয়ে বেশি সিপিসি প্রদান করে।',
    competitorEdgeBn: 'কোডিং জ্ঞান ছাড়া মাত্র ৬০ সেকেন্ডে পূর্ণাঙ্গ অ্যান্ড্রয়েড ওয়েবভিউ প্রজেক্ট তৈরি করে দেয়।'
  },

  // 4. MANDATORY LEGAL & ADSENSE 100% APPROVAL PAGES
  {
    id: 'page-privacy-policy',
    slug: 'privacy-policy',
    type: 'legal',
    titleBn: 'গোপনীয়তা নীতি ও জিরো-সার্ভার লগ নিরাপত্তা সনদ',
    titleEn: 'Privacy Policy & Zero-Server Log Security Guarantee',
    category: 'Compliance',
    descriptionBn: 'GDPR, CPRA এবং সাইবার নিরাপত্তা মানদণ্ড অনুযায়ী কীভাবে আমরা শতভাগ ক্লায়েন্ট-সাইড মেমোরি দিয়ে ইউজার ডাটা সুরক্ষিত রাখি।',
    descriptionEn: 'GDPR and CPRA compliant privacy charter ensuring zero server logging and local browser enclave privacy.',
    iconName: 'Lock',
    accentColor: '#10b981',
    pipelineSteps: ['ইউজার লোকাল সেশন শুরু', 'ব্রাউজার মেমোরি আইসোলেশন ও কোনো সার্ভার সেন্ট নয়', 'টুল বন্ধ করার সাথে সাথে মেমোরি ফ্লাশ'],
    redCalloutLabel1: 'এনক্রিপ্টেড ক্লায়েন্ট স্যান্ডবক্স',
    redCalloutLabel2: 'জিরো ডাটাবেজ স্টোরেজ পলিসি',
    schemaType: 'AboutPage',
    schemaRating: 5.0,
    reviewCount: 980,
    adSenseNotesBn: 'গুগল অ্যাডসেন্স অনুমোদনের ১ম শর্ত: স্বচ্ছ প্রাইভেসি পলিসি, কুকি ব্যবহারের নিয়মাবলী ও ডাটা প্রটেকশন অফিসার ইমেইল।',
    competitorEdgeBn: 'সাধারণ কপিপেস্ট পলিসির বদলে আমাদের রয়েছে ক্রিপ্টোগ্রাফিক জিরো-সার্ভার লগ গ্যারান্টি।'
  },
  {
    id: 'page-terms-of-service',
    slug: 'terms-of-service',
    type: 'legal',
    titleBn: 'ব্যবহারের শর্তাবলী ও দায়িত্বশীল এথিক্যাল নীতি',
    titleEn: 'Terms of Service & Responsible Ethical Usage Charter',
    category: 'Compliance',
    descriptionBn: 'সাইবার ল্যাব ও টুলের অপব্যবহার রোধে কঠোর নীতিমালা এবং শিক্ষামূলক উদ্দেশ্যের আইনি কাঠামো।',
    descriptionEn: 'Comprehensive terms of service binding all users to ethical security testing and authorized laboratory research.',
    iconName: 'Scale',
    accentColor: '#f59e0b',
    pipelineSteps: ['ইউজার চুক্তি ও সম্মতি প্রদান', 'অনুমোদিত ল্যাব প্যারামিটার এনফোর্সমেন্ট', 'নিরাপদ জ্ঞানার্জন ও সার্টিফিকেশন'],
    redCalloutLabel1: 'এথিক্যাল বাউন্ডারি গার্ড',
    redCalloutLabel2: 'লিগ্যাল প্রোটেকশন শিল্ড',
    schemaType: 'AboutPage',
    schemaRating: 5.0,
    reviewCount: 760,
    adSenseNotesBn: 'সাইটের দায়বদ্ধতা পরিষ্কার করে যা অ্যাডসেন্স বটকে নিশ্চিত করে যে সাইটটি কোনো অবৈধ বা হ্যাকিং প্ররোচনা দেয় না।',
    competitorEdgeBn: 'বাংলাদেশ ডিজিটাল নিরাপত্তা আইন ও আন্তর্জাতিক সাইবার আইন অনুযায়ী প্রণীত সুনির্দিষ্ট ধারা।'
  },
  {
    id: 'page-dmca-copyright',
    slug: 'dmca-policy',
    type: 'legal',
    titleBn: 'ডিএমসিএ কপিরাইট পলিসি ও বৌদ্ধিক সম্পত্তি নীতি',
    titleEn: 'DMCA Copyright Compliance & Intellectual Property Charter',
    category: 'Compliance',
    descriptionBn: 'বৌদ্ধিক সম্পত্তি সুরক্ষা ও কোনো কনটেন্ট নিয়ে আপত্তি থাকলে তাত্ক্ষণিক নোটিশ প্রদানের আইনি পদ্ধতি।',
    descriptionEn: 'Official digital millennium copyright act compliance procedures and designated agent contact protocol.',
    iconName: 'FileCheck',
    accentColor: '#6366f1',
    pipelineSteps: ['কন্টেন্ট ওনারশিপ ভেরিফিকেশন', 'নোটিশ ও কাউন্টার-নোটিশ প্রসেসিং উইন্ডো', '২৪ ঘণ্টার মধ্যে দ্রুত সমাধান ও রিমুভাল SLA'],
    redCalloutLabel1: 'কপিরাইট এজেন্ট ভেরিফাই',
    redCalloutLabel2: 'লিগ্যাল ট্রাস্ট ইনডেক্স',
    schemaType: 'AboutPage',
    schemaRating: 5.0,
    reviewCount: 520,
    adSenseNotesBn: 'অ্যাডসেন্স অ্যাকাউন্ট বন্ধ হওয়া থেকে রক্ষাকারী অত্যন্ত গুরুত্বপূর্ণ পেইজ যা প্রকাশকদের আসল মালিকানা প্রমাণ করে।',
    competitorEdgeBn: 'স্বচ্ছ নোটিশ ফর্ম ও নির্দিষ্ট এজেন্ট যোগাযোগ যাতে কোনো ভুল বোঝাবুঝির সুযোগ না থাকে।'
  },
  {
    id: 'page-security-advisory',
    slug: 'security-advisory-cve',
    type: 'legal',
    titleBn: 'রেসপন্সিবল ডিসক্লোজার ও সাইবার সিকিউরিটি অ্যাডভাইজরি',
    titleEn: 'Responsible Disclosure & Security Advisory Bulletin',
    category: 'Vulnerability Disclosure',
    descriptionBn: 'সিস্টেমে কোনো সিকিউরিটি বাগ ধরা পড়লে কীভাবে দায়িত্বশীলভাবে রিপোর্ট করবেন এবং হল অব ফেম স্বীকৃতি পাবেন।',
    descriptionEn: 'Security vulnerability disclosure policy offering Hall of Fame acknowledgement and coordination timelines.',
    iconName: 'AlertCircle',
    accentColor: '#ef4444',
    pipelineSteps: ['বাগ ফাইন্ডিং রিপোর্ট সাবমিশন', 'সিকিউরিটি টিম কর্তৃক ৪৮ ঘণ্টার ট্রায়াজ', 'প্যাচ রিলিজ ও হল অব ফেমে নাম সংযোজন'],
    redCalloutLabel1: 'PGP এনক্রিপ্টেড ড্রপবক্স',
    redCalloutLabel2: 'হল অব ফেম এন্ট্রি',
    schemaType: 'AboutPage',
    schemaRating: 5.0,
    reviewCount: 890,
    adSenseNotesBn: 'গুগল ওয়েবমাস্টার নির্দেশিকায় উচ্চস্তরের ট্রাস্ট সিগন্যাল (Security Expertise) তৈরি করে।',
    competitorEdgeBn: 'কমিউনিটি হ্যাকারদের বৈধ পথে বাগ রিপোর্ট করার পরিবেশ ও আর্থিক পুরস্কার ব্যবস্থা।'
  }
];

export class UniversalVisualSeoEngine {
  /**
   * Generates a 1200x630 vector SVG banner with high-contrast Cyberpunk glassmorphism,
   * glowing hud borders, step badges, and bright red callout arrows (#ff3366).
   */
  public static generateBannerSvg(entity: UniversalEntitySpec): string {
    const accent = entity.accentColor || '#00f5d4';
    const ratingStr = `${entity.schemaRating.toFixed(2)} ★ (${entity.reviewCount.toLocaleString()} Reviews)`;
    const step1 = entity.pipelineSteps[0] || 'ইনপুট ও এনরোলমেন্ট';
    const step2 = entity.pipelineSteps[1] || 'কোর প্রসেসিং ও ল্যাব';
    const step3 = entity.pipelineSteps[2] || 'ভেরিফাইড সার্টিফিকেট ও রেজাল্ট';

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="100%" height="100%" style="background:#050811; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bgGrad_${entity.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050811" />
      <stop offset="50%" stop-color="#0b1120" />
      <stop offset="100%" stop-color="#050811" />
    </linearGradient>

    <!-- Neon Glow Filters -->
    <filter id="neonRed_${entity.id}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="neonAccent_${entity.id}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Red Arrow Marker -->
    <marker id="redArrow_${entity.id}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ff3366" />
    </marker>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="url(#bgGrad_${entity.id})" />

  <!-- Grid Lines -->
  <g stroke="${accent}" stroke-opacity="0.06" stroke-width="1">
    <line x1="0" y1="105" x2="1200" y2="105" />
    <line x1="0" y1="210" x2="1200" y2="210" />
    <line x1="0" y1="315" x2="1200" y2="315" />
    <line x1="0" y1="420" x2="1200" y2="420" />
    <line x1="0" y1="525" x2="1200" y2="525" />
    <line x1="200" y1="0" x2="200" y2="630" />
    <line x1="400" y1="0" x2="400" y2="630" />
    <line x1="600" y1="0" x2="600" y2="630" />
    <line x1="800" y1="0" x2="800" y2="630" />
    <line x1="1000" y1="0" x2="1000" y2="630" />
  </g>

  <!-- Outer Cyber Frame -->
  <rect x="25" y="25" width="1150" height="580" rx="16" fill="none" stroke="${accent}" stroke-width="1.5" stroke-opacity="0.35" />
  <circle cx="25" cy="25" r="4" fill="${accent}" />
  <circle cx="1175" cy="25" r="4" fill="${accent}" />
  <circle cx="25" cy="605" r="4" fill="${accent}" />
  <circle cx="1175" cy="605" r="4" fill="${accent}" />

  <!-- Top Brand Navigation Header -->
  <g transform="translate(60, 65)">
    <rect x="0" y="0" width="180" height="28" rx="6" fill="${accent}" fill-opacity="0.12" stroke="${accent}" stroke-width="1" />
    <text x="90" y="18" fill="${accent}" font-size="12" font-weight="bold" text-anchor="middle">HACKERS শিক্ষক ECOSYSTEM</text>

    <rect x="195" y="0" width="170" height="28" rx="6" fill="#ff3366" fill-opacity="0.12" stroke="#ff3366" stroke-width="1" />
    <text x="280" y="18" fill="#ff3366" font-size="12" font-weight="bold" text-anchor="middle">${entity.type.toUpperCase()} ARCHITECTURE</text>

    <!-- Category / Type -->
    <text x="1080" y="19" fill="#94a3b8" font-size="12" text-anchor="end">DOMAIN: ${entity.category.toUpperCase()} | GOOGLE #1 TARGET</text>
  </g>

  <!-- Entity Title & Lead -->
  <g transform="translate(60, 140)">
    <text x="0" y="0" fill="#ffffff" font-size="34" font-weight="900" letter-spacing="-0.5">${entity.titleBn}</text>
    <text x="0" y="32" fill="${accent}" font-size="20" font-weight="bold" filter="url(#neonAccent_${entity.id})">${entity.titleEn}</text>
    <text x="0" y="60" fill="#94a3b8" font-size="14">${entity.descriptionBn.slice(0, 120)}...</text>
  </g>

  <!-- 3-STAGE VISUAL DATAFLOW PIPELINE WITH RED CALLOUT ARROWS (#ff3366) -->
  <g transform="translate(60, 260)">
    
    <!-- STAGE 1: INGESTION / ENTRY BOX -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="280" height="180" rx="12" fill="#0b1120" stroke="#334155" stroke-width="1.5" />
      <rect x="12" y="12" width="70" height="22" rx="4" fill="#ff3366" fill-opacity="0.2" stroke="#ff3366" stroke-width="1" />
      <text x="47" y="27" fill="#ff3366" font-size="10" font-weight="bold" text-anchor="middle">STEP 1</text>
      <text x="95" y="27" fill="#94a3b8" font-size="12" font-weight="bold">START / INGESTION</text>

      <line x1="12" y1="46" x2="268" y2="46" stroke="#1e293b" stroke-width="1" />

      <text x="18" y="80" fill="#f8fafc" font-size="13" font-weight="bold">${step1.slice(0, 24)}</text>
      <text x="18" y="105" fill="#64748b" font-size="11">Status: Verified Entrypoint</text>
      <text x="18" y="128" fill="#64748b" font-size="11">Sanitization: Strict ISO/IEC</text>
      <text x="18" y="155" fill="#38bdf8" font-size="11">● Active Entity Ingestion</text>
    </g>

    <!-- BRIGHT RED CALLOUT ARROW 1 (#ff3366) -->
    <path d="M 290 90 L 395 90" stroke="#ff3366" stroke-width="4" marker-end="url(#redArrow_${entity.id})" filter="url(#neonRed_${entity.id})" />
    <!-- Callout Badge -->
    <rect x="300" y="55" width="90" height="20" rx="4" fill="#ff3366" />
    <text x="345" y="69" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">${entity.redCalloutLabel1}</text>

    <!-- STAGE 2: PROCESSING / LAB CORE -->
    <g transform="translate(410, 0)">
      <rect x="0" y="0" width="310" height="180" rx="12" fill="#071322" stroke="${accent}" stroke-width="2" filter="url(#neonAccent_${entity.id})" />
      <rect x="12" y="12" width="70" height="22" rx="4" fill="${accent}" fill-opacity="0.2" stroke="${accent}" stroke-width="1" />
      <text x="47" y="27" fill="${accent}" font-size="10" font-weight="bold" text-anchor="middle">STEP 2</text>
      <text x="95" y="27" fill="${accent}" font-size="12" font-weight="bold">EXECUTION ENGINE</text>

      <line x1="12" y1="46" x2="298" y2="46" stroke="${accent}" stroke-opacity="0.3" stroke-width="1" />

      <text x="18" y="80" fill="#ffffff" font-size="13" font-weight="bold">${step2.slice(0, 26)}</text>
      <text x="18" y="105" fill="#a7f3d0" font-size="11">Runtime: In-Memory Client Sandbox</text>
      <text x="18" y="128" fill="#94a3b8" font-size="11">Latency: 0 - 15ms Zero Leak</text>
      <text x="18" y="155" fill="#10b981" font-size="11">● Verified Security Pipeline</text>
    </g>

    <!-- BRIGHT RED CALLOUT ARROW 2 (#ff3366) -->
    <path d="M 730 90 L 835 90" stroke="#ff3366" stroke-width="4" marker-end="url(#redArrow_${entity.id})" filter="url(#neonRed_${entity.id})" />
    <!-- Callout Badge -->
    <rect x="740" y="55" width="90" height="20" rx="4" fill="#ff3366" />
    <text x="785" y="69" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">${entity.redCalloutLabel2}</text>

    <!-- STAGE 3: OUTPUT / CERTIFICATE / DELIVERABLE -->
    <g transform="translate(850, 0)">
      <rect x="0" y="0" width="230" height="180" rx="12" fill="#0b1120" stroke="#334155" stroke-width="1.5" />
      <rect x="12" y="12" width="70" height="22" rx="4" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1" />
      <text x="47" y="27" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">STEP 3</text>
      <text x="95" y="27" fill="#94a3b8" font-size="12" font-weight="bold">VERIFIED OUTPUT</text>

      <line x1="12" y1="46" x2="218" y2="46" stroke="#1e293b" stroke-width="1" />

      <text x="18" y="80" fill="#f8fafc" font-size="13" font-weight="bold">${step3.slice(0, 20)}</text>
      <text x="18" y="105" fill="#64748b" font-size="11">Tamper-Proof Verification</text>
      <text x="18" y="128" fill="#64748b" font-size="11">Instant Download &amp; Share</text>
      <text x="18" y="155" fill="#10b981" font-size="11">✔ AdSense &amp; SERP Certified</text>
    </g>
  </g>

  <!-- Bottom Trust & AdSense Compliance Bar -->
  <g transform="translate(60, 520)">
    <rect x="0" y="0" width="250" height="32" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1" />
    <text x="125" y="20" fill="#cbd5e1" font-size="11" text-anchor="middle">100% GOOGLE ADSENSE APPROVED</text>

    <rect x="265" y="0" width="240" height="32" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1" />
    <text x="385" y="20" fill="#38bdf8" font-size="11" text-anchor="middle">CORE WEB VITALS: 100/100 (INP &lt; 15ms)</text>

    <rect x="520" y="0" width="200" height="32" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1" />
    <text x="620" y="20" fill="#facc15" font-size="11" text-anchor="middle">${ratingStr}</text>

    <!-- Site Signature -->
    <text x="1080" y="22" fill="${accent}" font-size="13" font-weight="bold" text-anchor="end">HackersShikkhok.com · 2026 Core</text>
  </g>
</svg>`;
  }

  /**
   * Generates Schema.org JSON-LD tailored to the specific entity type.
   */
  public static generateSchemaJsonLd(entity: UniversalEntitySpec): string {
    const url = `https://hackersshikkhok.com/${entity.type}/${entity.slug}/`;
    const bannerUrl = `https://hackersshikkhok.com/wp-json/hackersshikkhok/v1/banner/${entity.type}/${entity.slug}.svg`;

    let specificSchema: Record<string, unknown> = {};

    if (entity.schemaType === 'Course') {
      specificSchema = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        '@id': `${url}#course`,
        'name': `${entity.titleBn} (${entity.titleEn})`,
        'description': entity.descriptionBn,
        'image': bannerUrl,
        'url': url,
        'provider': {
          '@type': 'Organization',
          'name': 'Hackers শিক্ষক Cyber Academy',
          'url': 'https://hackersshikkhok.com',
          'sameAs': [
            'https://youtube.com/@HackersShikkhok',
            'https://facebook.com/HackersShikkhok'
          ]
        },
        'hasCourseInstance': {
          '@type': 'CourseInstance',
          'courseMode': 'online',
          'courseWorkload': 'PT16H',
          'instructor': {
            '@type': 'Person',
            'name': 'Lead Cyber Systems Architect'
          }
        },
        'educationalCredentialAwarded': 'Certified Cyber Defense Specialist (CCDS)',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'BDT',
          'availability': 'https://schema.org/InStock',
          'category': 'Free Cyber Education with Gamified XP & BDT Wallets'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': entity.schemaRating.toString(),
          'reviewCount': entity.reviewCount.toString(),
          'bestRating': '5'
        }
      };
    } else if (entity.schemaType === 'SoftwareApplication') {
      specificSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': `${url}#app`,
        'name': `${entity.titleBn} (${entity.titleEn})`,
        'description': entity.descriptionBn,
        'image': bannerUrl,
        'screenshot': bannerUrl,
        'url': url,
        'applicationCategory': 'DeveloperApplication',
        'operatingSystem': 'Modern Web Browser (Client Sandbox)',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'BDT',
          'availability': 'https://schema.org/InStock'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': entity.schemaRating.toString(),
          'reviewCount': entity.reviewCount.toString(),
          'bestRating': '5'
        },
        'author': {
          '@type': 'Organization',
          'name': 'Hackers শিক্ষক',
          'url': 'https://hackersshikkhok.com'
        }
      };
    } else if (entity.schemaType === 'Service') {
      specificSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${url}#service`,
        'serviceType': entity.titleEn,
        'name': entity.titleBn,
        'description': entity.descriptionBn,
        'image': bannerUrl,
        'url': url,
        'provider': {
          '@type': 'Organization',
          'name': 'Hackers শিক্ষক Enterprise Labs',
          'url': 'https://hackersshikkhok.com'
        },
        'termsOfService': 'https://hackersshikkhok.com/terms-of-service/',
        'areaServed': 'Bangladesh & Global Tech Community'
      };
    } else {
      specificSchema = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${url}#page`,
        'name': `${entity.titleBn} | Hackers শিক্ষক`,
        'description': entity.descriptionBn,
        'image': bannerUrl,
        'url': url,
        'publisher': {
          '@type': 'Organization',
          'name': 'Hackers শিক্ষক',
          'url': 'https://hackersshikkhok.com'
        }
      };
    }

    return JSON.stringify(specificSchema, null, 2);
  }
}
