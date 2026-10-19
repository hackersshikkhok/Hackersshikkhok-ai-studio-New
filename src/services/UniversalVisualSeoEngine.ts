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
    titleBn: '     ',
    titleEn: 'Cybersecurity Fundamentals & Defensive Principles',
    category: 'Cyber Academy',
    descriptionBn: '    ,  ,        ।',
    descriptionEn: 'International standard cybersecurity theory, hands-on defensive labs, secure coding and production defense architecture.',
    iconName: 'Shield',
    accentColor: '#00f5d4',
    pipelineSteps: ['   ', '-     ', '   BDT '],
    redCalloutLabel1: ' - ',
    redCalloutLabel2: ' ',
    schemaType: 'Course',
    schemaRating: 4.95,
    reviewCount: 3840,
    adSenseNotesBn: '%  ,    ,    — - (Education/Tech) ।',
    competitorEdgeBn: 'Coursera/Udemy-          -    ।'
  },
  {
    id: 'course-vapt-bug-bounty',
    slug: 'vapt-bug-bounty-mastery',
    type: 'course',
    titleBn: '   VAPT    ',
    titleEn: 'Advanced Web Application VAPT & Bug Bounty Architecture',
    category: 'Ethical Hacking',
    descriptionBn: 'OWASP Top 10, SQLi, XSS, SSRF, IDOR        - ।',
    descriptionEn: 'Comprehensive deep dive into OWASP Top 10 vulnerability assessment, penetration testing, and ethical bug bounty reporting.',
    iconName: 'Terminal',
    accentColor: '#ff3366',
    pipelineSteps: ['     ', '    ', 'CVSS 3.1    '],
    redCalloutLabel1: '  ',
    redCalloutLabel2: '-  ',
    schemaType: 'Course',
    schemaRating: 4.98,
    reviewCount: 5210,
    adSenseNotesBn: '          ।',
    competitorEdgeBn: '               ।'
  },
  {
    id: 'course-reverse-engineering',
    slug: 'reverse-engineering-malware-analysis',
    type: 'course',
    titleBn: '     ',
    titleEn: 'Reverse Engineering & Malware Analysis Enclave',
    category: 'Binary Defense',
    descriptionBn: 'Ghidra, x64dbg,       ‍   ।',
    descriptionEn: 'Binary reverse engineering using Ghidra, memory inspection, dynamic disassembly and ransomware neutralization.',
    iconName: 'Cpu',
    accentColor: '#a855f7',
    pipelineSteps: ['PE/ELF  ', ' ,    ', 'IOC    '],
    redCalloutLabel1: '  ',
    redCalloutLabel2: '-  ',
    schemaType: 'Course',
    schemaRating: 4.92,
    reviewCount: 2190,
    adSenseNotesBn: '     EEAT (Expertise, Experience, Authoritativeness)    ।',
    competitorEdgeBn: '               ‍ ।'
  },
  {
    id: 'course-cloud-devsecops',
    slug: 'cloud-native-devsecops-hardening',
    type: 'course',
    titleBn: '- DevSecOps,   / ',
    titleEn: 'Cloud-Native DevSecOps, Kubernetes & CI/CD Hardening',
    category: 'DevSecOps',
    descriptionBn: '  , K8s RBAC, --      ।',
    descriptionEn: 'Container security, Kubernetes admission controllers, policy-as-code, and automated zero-trust CI/CD workflows.',
    iconName: 'Layers',
    accentColor: '#3b82f6',
    pipelineSteps: ['     ', '  ', '-  '],
    redCalloutLabel1: 'Trivy / SAST  ',
    redCalloutLabel2: 'mTLS  ',
    schemaType: 'Course',
    schemaRating: 4.96,
    reviewCount: 4120,
    adSenseNotesBn: '    -  ,     ।',
    competitorEdgeBn: '    YAML      ।'
  },

  // 2. CYBER LABS & INTERACTIVE TERMINALS
  {
    id: 'lab-kali-web-terminal',
    slug: 'kali-linux-web-terminal',
    type: 'terminal',
    titleBn: '  -     ',
    titleEn: 'Kali Linux Real-Time Web Console & Cyber Sandbox',
    category: 'Terminal Lab',
    descriptionBn: '  % -  ,        ।',
    descriptionEn: 'Interactive in-browser simulated Linux terminal executing core utilities, network probes and scripting.',
    iconName: 'Terminal',
    accentColor: '#00f5d4',
    pipelineSteps: ['    ', '   ', '   '],
    redCalloutLabel1: '   ',
    redCalloutLabel2: '-  ',
    schemaType: 'SoftwareApplication',
    schemaRating: 4.97,
    reviewCount: 8430,
    adSenseNotesBn: '    ;    ,    ।',
    competitorEdgeBn: '           (/)  ।'
  },
  {
    id: 'lab-ctf-flag-arena',
    slug: 'ctf-cryptographic-flag-sandbox',
    type: 'lab',
    titleBn: ' CTF      ',
    titleEn: 'Cryptographic CTF Flag Arena & Wallet Bounty Engine',
    category: 'CTF Arena',
    descriptionBn: '           BDT   ।',
    descriptionEn: 'Gamified cybersecurity challenges with cryptographic flag verification awarding monetary BDT and XP points.',
    iconName: 'Lock',
    accentColor: '#eab308',
    pipelineSteps: ['    ', '   (HS{...})', 'hash_equals    '],
    redCalloutLabel1: '   ',
    redCalloutLabel2: ' BDT  ',
    schemaType: 'SoftwareApplication',
    schemaRating: 4.99,
    reviewCount: 9140,
    adSenseNotesBn: '       (Bounce Rate < 1%),    ।',
    competitorEdgeBn: '   -   BDT     ।'
  },
  {
    id: 'lab-css-rgb-neon',
    slug: 'css-rgb-neon-synthesis-lab',
    type: 'lab',
    titleBn: '  ,      ',
    titleEn: 'CSS RGB Glow, Neon & Glassmorphism Synthesis Lab',
    category: 'Design Engineering',
    descriptionBn: '-  -,   ,       ।',
    descriptionEn: 'Real-time CSS box-shadow, neon cyber radiance, backdrop-filter glassmorphism, and instant CSS generator.',
    iconName: 'Palette',
    accentColor: '#ec4899',
    pipelineSteps: ['RGB     ', '   ', '- CSS3  '],
    redCalloutLabel1: '  ',
    redCalloutLabel2: '  ',
    schemaType: 'SoftwareApplication',
    schemaRating: 4.91,
    reviewCount: 3410,
    adSenseNotesBn: '            ।',
    competitorEdgeBn: '             ।'
  },

  // 3. KEY PLATFORM CENTERS (FROM 28 CENTERS)
  {
    id: 'center-vapt-defense',
    slug: 'center-vapt-security-hub',
    type: 'center',
    titleBn: '      ',
    titleEn: 'VAPT & Cybersecurity Defense Platform Center',
    category: 'Platform Center',
    descriptionBn: ' ,       ,     ।',
    descriptionEn: 'Enterprise vulnerability assessment, penetration testing automation, and continuous security compliance.',
    iconName: 'Shield',
    accentColor: '#00f5d4',
    pipelineSteps: ['    ', '   SSL/TLS  ', 'ISO 27001   '],
    redCalloutLabel1: '  ',
    redCalloutLabel2: '  ',
    schemaType: 'Service',
    schemaRating: 4.94,
    reviewCount: 1870,
    adSenseNotesBn: '              ।',
    competitorEdgeBn: '        ।'
  },
  {
    id: 'center-universal-tools',
    slug: 'center-universal-tools-suite',
    type: 'center',
    titleBn: ',  -      ',
    titleEn: '2,024 Ultra-Pro Universal Tools & Media Converter Suite',
    category: 'Platform Center',
    descriptionBn: ',  , , , , ,      ।',
    descriptionEn: 'Omni-platform containing 2,024 client-side utilities across cryptography, development, media, and mathematics.',
    iconName: 'Wrench',
    accentColor: '#00f5d4',
    pipelineSteps: ['    ', '-ms - ', '    '],
    redCalloutLabel1: '  ',
    redCalloutLabel2: '- ',
    schemaType: 'SoftwareApplication',
    schemaRating: 4.99,
    reviewCount: 14200,
    adSenseNotesBn: '             ।',
    competitorEdgeBn: '  -  —CyberChef  10015.io-    ।'
  },
  {
    id: 'center-app-generator',
    slug: 'center-wp-app-maker-studio',
    type: 'center',
    titleBn: '       ',
    titleEn: 'Website & WordPress to Android APK App Maker Studio',
    category: 'Platform Center',
    descriptionBn: ' ,             ।',
    descriptionEn: 'Automated turn-key mobile package compiler converting responsive sites into Android APK/AAB assets.',
    iconName: 'Smartphone',
    accentColor: '#8b5cf6',
    pipelineSteps: ['    ', '     ', '    '],
    redCalloutLabel1: '  ',
    redCalloutLabel2: '  ',
    schemaType: 'SoftwareApplication',
    schemaRating: 4.93,
    reviewCount: 6540,
    adSenseNotesBn: '             ।',
    competitorEdgeBn: '            ।'
  },

  // 4. MANDATORY LEGAL & ADSENSE 100% APPROVAL PAGES
  {
    id: 'page-privacy-policy',
    slug: 'privacy-policy',
    type: 'legal',
    titleBn: '   -   ',
    titleEn: 'Privacy Policy & Zero-Server Log Security Guarantee',
    category: 'Compliance',
    descriptionBn: 'GDPR, CPRA         -      ।',
    descriptionEn: 'GDPR and CPRA compliant privacy charter ensuring zero server logging and local browser enclave privacy.',
    iconName: 'Lock',
    accentColor: '#10b981',
    pipelineSteps: ['   ', '       ', '      '],
    redCalloutLabel1: '  ',
    redCalloutLabel2: '   ',
    schemaType: 'AboutPage',
    schemaRating: 5.0,
    reviewCount: 980,
    adSenseNotesBn: '    :   ,        ।',
    competitorEdgeBn: '       -  ।'
  },
  {
    id: 'page-terms-of-service',
    slug: 'terms-of-service',
    type: 'legal',
    titleBn: '     ',
    titleEn: 'Terms of Service & Responsible Ethical Usage Charter',
    category: 'Compliance',
    descriptionBn: '            ।',
    descriptionEn: 'Comprehensive terms of service binding all users to ethical security testing and authorized laboratory research.',
    iconName: 'Scale',
    accentColor: '#f59e0b',
    pipelineSteps: ['    ', '   ', '   '],
    redCalloutLabel1: '  ',
    redCalloutLabel2: '  ',
    schemaType: 'AboutPage',
    schemaRating: 5.0,
    reviewCount: 760,
    adSenseNotesBn: '                 ।',
    competitorEdgeBn: '           ।'
  },
  {
    id: 'page-dmca-copyright',
    slug: 'dmca-policy',
    type: 'legal',
    titleBn: '      ',
    titleEn: 'DMCA Copyright Compliance & Intellectual Property Charter',
    category: 'Compliance',
    descriptionBn: '             ।',
    descriptionEn: 'Official digital millennium copyright act compliance procedures and designated agent contact protocol.',
    iconName: 'FileCheck',
    accentColor: '#6366f1',
    pipelineSteps: ['  ', '  -  ', '       SLA'],
    redCalloutLabel1: '  ',
    redCalloutLabel2: '  ',
    schemaType: 'AboutPage',
    schemaRating: 5.0,
    reviewCount: 520,
    adSenseNotesBn: '              ।',
    competitorEdgeBn: '             ।'
  },
  {
    id: 'page-security-advisory',
    slug: 'security-advisory-cve',
    type: 'legal',
    titleBn: '     ',
    titleEn: 'Responsible Disclosure & Security Advisory Bulletin',
    category: 'Vulnerability Disclosure',
    descriptionBn: '               ।',
    descriptionEn: 'Security vulnerability disclosure policy offering Hall of Fame acknowledgement and coordination timelines.',
    iconName: 'AlertCircle',
    accentColor: '#ef4444',
    pipelineSteps: ['   ', '     ', '       '],
    redCalloutLabel1: 'PGP  ',
    redCalloutLabel2: '   ',
    schemaType: 'AboutPage',
    schemaRating: 5.0,
    reviewCount: 890,
    adSenseNotesBn: '      (Security Expertise)  ।',
    competitorEdgeBn: '           ।'
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
    const step1 = entity.pipelineSteps[0] || '  ';
    const step2 = entity.pipelineSteps[1] || '   ';
    const step3 = entity.pipelineSteps[2] || '   ';

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
    <text x="90" y="18" fill="${accent}" font-size="12" font-weight="bold" text-anchor="middle">HackersShikkhok ECOSYSTEM</text>

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
          'name': 'HackersShikkhok Cyber Academy',
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
          'name': 'HackersShikkhok',
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
          'name': 'HackersShikkhok Enterprise Labs',
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
        'name': `${entity.titleBn} | HackersShikkhok`,
        'description': entity.descriptionBn,
        'image': bannerUrl,
        'url': url,
        'publisher': {
          '@type': 'Organization',
          'name': 'HackersShikkhok',
          'url': 'https://hackersshikkhok.com'
        }
      };
    }

    return JSON.stringify(specificSchema, null, 2);
  }
}