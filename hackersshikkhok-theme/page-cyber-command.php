<?php
/**
 * Template Name: Cyber Command & Security Audit Portal
 * Template Post Type: page
 *
 * Dedicated Tactical Cyberpunk B2B Security Operations & Audit Portal.
 * 14-Module Enterprise Client Dashboard.
 *
 * @package HackersShikkhok\Theme
 */

declare(strict_types=1);

get_header();

$current_user_id = get_current_user_id();
$wallet_summary  = class_exists( '\HackersShikkhok\Core\LMS\Wallet_Economy' ) 
    ? \HackersShikkhok\Core\LMS\Wallet_Economy::get_wallet( $current_user_id ) 
    : array( 'balance_bdt' => 0.0, 'points' => 0 );

$nonce = wp_create_nonce( 'hs_cyber_command_nonce' );
?>

<link rel="stylesheet" href="<?php echo esc_url( get_template_directory_uri() . '/assets/css/cyber-command.css' ); ?>">

<main id="primary" class="hs-cyber-command-wrapper">
    <!-- Top Tactical HUD Bar -->
    <header class="hs-hud-bar">
        <div class="hs-hud-container">
            <div class="hs-hud-brand">
                <span class="hs-hud-pulse"></span>
                <span class="hs-hud-logo">🛡️ HACKERS শিক্ষক // CYBER COMMAND</span>
                <span class="hs-hud-badge">ENTERPRISE SECURITY SAAS v2.0</span>
            </div>
            <div class="hs-hud-metrics">
                <div class="hs-hud-metric">
                    <span class="hs-metric-label">STATUS</span>
                    <span class="hs-metric-val hs-green">ACTIVE DEFENSE</span>
                </div>
                <div class="hs-hud-metric">
                    <span class="hs-metric-label">WALLET</span>
                    <span class="hs-metric-val hs-cyan">৳<?php echo number_format( (float) ( $wallet_summary['balance_bdt'] ?? 0.0 ), 2 ); ?></span>
                </div>
                <div class="hs-hud-metric">
                    <span class="hs-metric-label">OPERATIVE</span>
                    <span class="hs-metric-val"><?php echo esc_html( wp_get_current_user()->display_name ?: 'Guest Security Auditor' ); ?></span>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Command Grid -->
    <div class="hs-command-layout">
        <!-- Sidebar Navigation: 14 Modules -->
        <aside class="hs-command-sidebar">
            <div class="hs-sidebar-title">MODULE REGISTRY</div>
            <nav class="hs-sidebar-nav">
                <button class="hs-nav-btn active" data-tab="tab-overview">📊 1. Threat Radar &amp; Overview</button>
                <button class="hs-nav-btn" data-tab="tab-targets">🌐 2. Assets &amp; Scope Manager</button>
                <button class="hs-nav-btn" data-tab="tab-scanner">⚡ 3. Automated Web Auditor</button>
                <button class="hs-nav-btn" data-tab="tab-findings">🔍 4. Vulnerabilities Ledger</button>
                <button class="hs-nav-btn" data-tab="tab-remediation">🛠️ 5. AI Code Patches</button>
                <button class="hs-nav-btn" data-tab="tab-executive">💼 6. Business Impact Matrix</button>
                <button class="hs-nav-btn" data-tab="tab-pdf">📄 7. Executive PDF Report</button>
                <button class="hs-nav-btn" data-tab="tab-csm">🔄 8. Continuous Monitoring</button>
                <button class="hs-nav-btn" data-tab="tab-redteam">🎯 9. Red Team Penetration</button>
                <button class="hs-nav-btn" data-tab="tab-compliance">📋 10. Compliance (OWASP/ISO)</button>
                <button class="hs-nav-btn" data-tab="tab-webhooks">🔔 11. Alerts &amp; Webhooks</button>
                <button class="hs-nav-btn" data-tab="tab-billing">💳 12. B2B Subscriptions</button>
                <button class="hs-nav-btn" data-tab="tab-terminal">💻 13. Live Activity Terminal</button>
                <button class="hs-nav-btn" data-tab="tab-guidelines">📜 14. Rules of Engagement</button>
            </nav>
        </aside>

        <!-- Command Stage Container -->
        <section class="hs-command-stage">
            
            <!-- TAB 1: OVERVIEW & THREAT RADAR -->
            <div class="hs-tab-content active" id="tab-overview">
                <div class="hs-stage-header">
                    <h2>Enterprise Security Posture &amp; Threat Radar</h2>
                    <p>রিয়েল-টাইম ভালনারেবিলিটি সারফেস, ক্লাউড সিকিউরিটি স্কোর এবং আক্রমণ প্রতিরোধ সক্ষমতা পর্যবেক্ষণ।</p>
                </div>

                <div class="hs-overview-grid">
                    <div class="hs-card hs-health-card">
                        <div class="hs-health-title">Overall Security Health Index</div>
                        <div class="hs-health-score" id="overviewHealthScore">88<span>/100</span></div>
                        <div class="hs-health-grade" id="overviewHealthGrade">GRADE: A- (HARDENED)</div>
                        <p class="hs-health-desc">প্যাসিভ স্ক্যানিং ও হেডার কনফিগারেশন নিরীক্ষা সম্পন্ন। ৩টি মাঝারি ঝুঁকি পাওয়া গেছে।</p>
                    </div>

                    <div class="hs-card hs-stat-card">
                        <div class="hs-card-sub">ACTIVE FINDINGS BY SEVERITY</div>
                        <div class="hs-severity-bars">
                            <div class="hs-sev-row">
                                <span class="hs-sev-tag hs-crit">CRITICAL (CVSS 9.0+)</span>
                                <span class="hs-sev-count" id="countCrit">0</span>
                            </div>
                            <div class="hs-sev-row">
                                <span class="hs-sev-tag hs-high">HIGH (CVSS 7.0-8.9)</span>
                                <span class="hs-sev-count" id="countHigh">1</span>
                            </div>
                            <div class="hs-sev-row">
                                <span class="hs-sev-tag hs-med">MEDIUM (CVSS 4.0-6.9)</span>
                                <span class="hs-sev-count" id="countMed">2</span>
                            </div>
                            <div class="hs-sev-row">
                                <span class="hs-sev-tag hs-low">LOW / INFO</span>
                                <span class="hs-sev-count" id="countLow">3</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Scan Launcher -->
                <div class="hs-card hs-quick-scan">
                    <h3>⚡ Instant Zero-Impact Security Audit</h3>
                    <p>ক্লাউড সার্ভারের কোনো পারফরম্যান্স ক্ষতি না করে নন-ইনট্রুসিভ সেফ ওয়েব অডিট রান করুন।</p>
                    <div class="hs-input-row">
                        <input type="url" id="quickTargetInput" placeholder="https://yourcompany.com" value="https://hackersshikkhok.com" class="hs-cyber-input">
                        <button class="hs-cyber-btn" id="btnRunQuickAudit">LAUNCH INSTANT AUDIT</button>
                    </div>
                </div>
            </div>

            <!-- TAB 2: ASSETS & SCOPE MANAGER -->
            <div class="hs-tab-content" id="tab-targets">
                <div class="hs-stage-header">
                    <h2>Target Scope &amp; Asset Ownership Verification</h2>
                    <p>অননুমোদিত স্ক্যানিং প্রতিরোধে ডোমেন বা ওয়েব অ্যাপের মালিকানা যাচাইকরণ (DNS TXT / HTML Meta Tag)।</p>
                </div>
                <div class="hs-card">
                    <h3>Add New Corporate Asset to Scope</h3>
                    <div class="hs-form-grid">
                        <div>
                            <label>Domain / URL</label>
                            <input type="text" id="newAssetUrl" placeholder="https://portal.example.com" class="hs-cyber-input">
                        </div>
                        <div>
                            <label>Organization / Project Name</label>
                            <input type="text" id="newAssetOrg" placeholder="Apex FinTech Corp" class="hs-cyber-input">
                        </div>
                        <div>
                            <label>Verification Method</label>
                            <select id="newAssetMethod" class="hs-cyber-select">
                                <option value="dns_txt">DNS TXT Record (_hs-verify)</option>
                                <option value="meta_tag">HTML &lt;meta&gt; Tag on Homepage</option>
                                <option value="file_upload">File Upload (/.well-known/)</option>
                            </select>
                        </div>
                    </div>
                    <button class="hs-cyber-btn" style="margin-top:15px;" id="btnAddTarget">Register Asset to Scope</button>
                </div>

                <div class="hs-card" style="margin-top:20px;">
                    <h3>Verified Target Inventory</h3>
                    <table class="hs-cyber-table">
                        <thead>
                            <tr>
                                <th>Target Asset</th>
                                <th>Organization</th>
                                <th>Status</th>
                                <th>Health</th>
                                <th>Last Audit</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="targetTableBody">
                            <tr>
                                <td><strong>https://hackersshikkhok.com</strong></td>
                                <td>Hackers শিক্ষক Core</td>
                                <td><span class="hs-badge hs-green">VERIFIED</span></td>
                                <td><span class="hs-badge hs-cyan">88/100</span></td>
                                <td>Today</td>
                                <td><button class="hs-table-btn" onclick="switchTarget('https://hackersshikkhok.com')">Select</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- TAB 3: SCANNER TERMINAL -->
            <div class="hs-tab-content" id="tab-scanner">
                <div class="hs-stage-header">
                    <h2>Automated Passive Web Auditor</h2>
                    <p>SSL/TLS, HTTP সিকিউরিটি হেডার্স, এক্সপোজড সেনসিটিভ ফাইল, DNS স্পুফিং এবং CMS ফিঙ্গারপ্রিন্ট স্ক্যানার।</p>
                </div>

                <div class="hs-card">
                    <div class="hs-scan-controls">
                        <div>
                            <label>Target Domain</label>
                            <input type="text" id="activeScanUrl" value="https://hackersshikkhok.com" class="hs-cyber-input" style="width:340px;">
                        </div>
                        <div>
                            <label>Audit Profile</label>
                            <select id="scanProfile" class="hs-cyber-select">
                                <option value="passive_full">Full Passive Surface Audit (Recommended)</option>
                                <option value="headers_only">Security Headers Only</option>
                                <option value="ssl_only">SSL/TLS Handshake &amp; Cipher Suite</option>
                                <option value="cms_cve">WordPress &amp; CVE Vulnerability Check</option>
                            </select>
                        </div>
                        <button class="hs-cyber-btn hs-btn-pulse" id="btnStartAuditScan">DISPATCH AUDIT</button>
                    </div>

                    <!-- Progress Bar -->
                    <div class="hs-progress-wrap" style="display:none;" id="scanProgressBox">
                        <div class="hs-progress-info">
                            <span id="scanStatusText">Auditing Target Surface...</span>
                            <span id="scanPercent">0%</span>
                        </div>
                        <div class="hs-progress-bar">
                            <div class="hs-progress-fill" id="scanProgressFill" style="width:0%;"></div>
                        </div>
                    </div>

                    <!-- Terminal Log View -->
                    <div class="hs-terminal-screen" id="scannerTerminalLog">
                        <div class="hs-term-line hs-term-cyan">[SYSTEM] Hackers শিক্ষক Passive Security Engine Initialized. Ready for dispatch.</div>
                    </div>
                </div>
            </div>

            <!-- TAB 4: FINDINGS LEDGER -->
            <div class="hs-tab-content" id="tab-findings">
                <div class="hs-stage-header">
                    <h2>Vulnerability Lifecycle &amp; Findings Ledger</h2>
                    <p>শনাক্তকৃত দুর্বলতা, CVSS v3.1 রিস্ক স্কোরিং, প্রমাণ এবং স্ট্যাটাস ট্র্যাকিং।</p>
                </div>

                <div class="hs-filter-bar">
                    <button class="hs-filter-btn active" data-filter="all">ALL FINDINGS</button>
                    <button class="hs-filter-btn" data-filter="critical">CRITICAL</button>
                    <button class="hs-filter-btn" data-filter="high">HIGH</button>
                    <button class="hs-filter-btn" data-filter="medium">MEDIUM</button>
                    <button class="hs-filter-btn" data-filter="low">LOW / INFO</button>
                </div>

                <div class="hs-findings-list" id="findingsListContainer">
                    <!-- Dynamic finding items loaded via JS -->
                </div>
            </div>

            <!-- TAB 5: AI CODE PATCHES -->
            <div class="hs-tab-content" id="tab-remediation">
                <div class="hs-stage-header">
                    <h2>AI Code Remediation &amp; Patch Generator</h2>
                    <p>শনাক্ত দুর্বলতার জন্য Nginx, Apache (.htaccess), Cloudflare WAF ও PHP এর কপি-পেস্ট উপযোগী কোড প্যাচ।</p>
                </div>

                <div class="hs-card">
                    <div class="hs-patch-selector">
                        <label>Select Target Finding to Generate Patch:</label>
                        <select id="patchFindingSelect" class="hs-cyber-select">
                            <option value="missing_hsts">#1. Strict-Transport-Security (HSTS) Header Missing (CVSS 6.5)</option>
                            <option value="missing_csp">#2. Content-Security-Policy (CSP) Missing (CVSS 7.2)</option>
                            <option value="weak_dmarc_policy">#3. Weak DMARC Anti-Spoofing Policy (CVSS 6.1)</option>
                            <option value="exposed_dot_env">#4. Sensitive .env Credentials Exposure (CVSS 9.8)</option>
                        </select>
                    </div>

                    <div class="hs-code-tabs">
                        <button class="hs-code-tab active" data-server="nginx">Nginx Server Block</button>
                        <button class="hs-code-tab" data-server="apache">Apache .htaccess</button>
                        <button class="hs-code-tab" data-server="php">PHP Native Header</button>
                        <button class="hs-code-tab" data-server="cloudflare">Cloudflare WAF Rule</button>
                    </div>

                    <div class="hs-code-display">
                        <pre><code id="remediationCodeSnippet">add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;</code></pre>
                        <button class="hs-copy-btn" id="btnCopyPatch">COPY PATCH CODE</button>
                    </div>
                </div>
            </div>

            <!-- TAB 6: BUSINESS IMPACT MATRIX -->
            <div class="hs-tab-content" id="tab-executive">
                <div class="hs-stage-header">
                    <h2>Executive Business Impact &amp; Financial Exposure</h2>
                    <p>নন-টেকনিক্যাল সিইও, সিটিও ও ম্যানেজমেন্টের জন্য আর্থিক ঝুঁকি ও ব্র্যান্ড লস অ্যানালাইসিস।</p>
                </div>

                <div class="hs-overview-grid">
                    <div class="hs-card">
                        <h3>Estimated Financial Breach Liability</h3>
                        <div style="font-size:32px; font-weight:900; color:#ff3366; margin:10px 0;">৳৫,৫০,০০০ - ৳২০,০০,০০০</div>
                        <p>ডাটাবেস লিক বা সেশন হাইজ্যাকিংয়ের ক্ষেত্রে গ্রাহকের ক্ষতিপূরণ ও জিডিপিআর/সাইবার অ্যাক্ট রেগুলেটরি পেনাল্টি ঝুঁকি।</p>
                    </div>
                    <div class="hs-card">
                        <h3>Brand &amp; Customer Trust Degradation</h3>
                        <div style="font-size:32px; font-weight:900; color:#f59e0b; margin:10px 0;">HIGH VULNERABILITY</div>
                        <p>ইমেইল স্পুফিং ও আন-এনক্রিপ্টেড ট্রাফিকের কারণে স্প্যাম ফিল্টারিং ও গ্রাহক প্রতারণার সম্ভাবনা।</p>
                    </div>
                </div>
            </div>

            <!-- TAB 7: PDF REPORT -->
            <div class="hs-tab-content" id="tab-pdf">
                <div class="hs-stage-header">
                    <h2>Download Executive PDF Security Audit Report</h2>
                    <p>ক্লায়েন্ট প্রেজেন্টেশন ও বোর্ড মিটিংয়ের জন্য এক্সিকিউটিভ সামারি ও পূর্ণাঙ্গ টেকনিক্যাল প্রুফ রিপোর্ট।</p>
                </div>

                <div class="hs-card" style="text-align:center; padding:40px 20px;">
                    <div style="font-size:48px; margin-bottom:12px;">📄</div>
                    <h3>Executive Cyber Audit Report Ready</h3>
                    <p style="max-width:550px; margin:0 auto 20px; color:#94a3b8;">
                        রিপোর্টে অন্তর্ভুক্ত রয়েছে: সিকিউরিটি গ্রেড কার্ড, সিভেই র্যাঙ্কিং, স্ক্রিনশট এভিডেন্স, এবং সি-লেভেল এক্সিকিউটিভ সামারি।
                    </p>
                    <button class="hs-cyber-btn" id="btnDownloadPdf">PRINT / SAVE AS PDF REPORT</button>
                </div>
            </div>

            <!-- TAB 8: CONTINUOUS MONITORING -->
            <div class="hs-tab-content" id="tab-csm">
                <div class="hs-stage-header">
                    <h2>Continuous Security Monitoring (CSM)</h2>
                    <p>সার্বক্ষণিক নজরদারি: নতুন CVE রিলিজ হলে বা কনফিগারেশন চেঞ্জ হলে স্বয়ংক্রিয় স্ক্যান ও নোটিফিকেশন।</p>
                </div>

                <div class="hs-card">
                    <h3>Configure Automated Schedule</h3>
                    <div class="hs-form-grid">
                        <div>
                            <label>Audit Frequency</label>
                            <select class="hs-cyber-select" id="csmFrequency">
                                <option value="daily">Daily Continuous Surface Probe</option>
                                <option value="weekly" selected>Weekly Full Security Audit</option>
                                <option value="monthly">Monthly Compliance Health Audit</option>
                            </select>
                        </div>
                        <div>
                            <label>Alert Email Address</label>
                            <input type="email" class="hs-cyber-input" value="<?php echo esc_attr( wp_get_current_user()->user_email ?: 'security@hackersshikkhok.com' ); ?>">
                        </div>
                    </div>
                    <button class="hs-cyber-btn" style="margin-top:15px;" onclick="alert('স্বয়ংক্রিয় মনিটরিং সিডিউল আপডেট হয়েছে।')">Save Monitoring Schedule</button>
                </div>
            </div>

            <!-- TAB 9: RED TEAM -->
            <div class="hs-tab-content" id="tab-redteam">
                <div class="hs-stage-header">
                    <h2>Custom Red Team &amp; Manual Penetration Testing</h2>
                    <p>অনুমোদিত ম্যানুয়াল হ্যাকিং পরীক্ষা: ক্রেডেনশিয়াল টেস্ট, বিজনেস লজিক ফ্ল অডিট ও এক্সিকিউটিভ ওয়ার্কশপ।</p>
                </div>

                <div class="hs-card">
                    <h3>Submit Red Team Scoping Request</h3>
                    <div class="hs-form-grid">
                        <div>
                            <label>Company / Organization Name</label>
                            <input type="text" id="rtCompanyName" placeholder="Standard Commercial Bank Ltd." class="hs-cyber-input">
                        </div>
                        <div>
                            <label>Authorized Contact Email</label>
                            <input type="email" id="rtContactEmail" placeholder="ciso@company.com" class="hs-cyber-input">
                        </div>
                    </div>
                    <div style="margin-top:12px;">
                        <label>Scope of Engagement (Domains, APIs, Mobile APK, IP Ranges)</label>
                        <textarea id="rtScopeText" rows="4" class="hs-cyber-input" style="width:100%;" placeholder="1. https://api.company.com/v1/*&#10;2. Android APK Package com.company.app&#10;3. Core Payment Gateway Workflow"></textarea>
                    </div>
                    <div style="margin-top:10px; color:#94a3b8; font-size:12px;">
                        <input type="checkbox" id="rtNdaCheck" checked> আমি নিশ্চিত করছি আমি এই সম্পদের আইনি মালিক এবং Hackers শিক্ষক-এর সাথে দ্বিপাক্ষিক নন-ডিসক্লোজার চুক্তি (NDA) মেনে টেস্ট অনুমোদন করছি।
                    </div>
                    <button class="hs-cyber-btn" style="margin-top:15px;" id="btnSubmitRedTeam">Submit Official Red Team Proposal</button>
                </div>
            </div>

            <!-- TAB 10: COMPLIANCE -->
            <div class="hs-tab-content" id="tab-compliance">
                <div class="hs-stage-header">
                    <h2>Global Security Compliance Matrix</h2>
                    <p>ওওয়াস্প টপ ১০, আইএসও ২৭০০১ এবং বাংলাদেশ সাইবার নিরাপত্তা আইন ২০২৩ এর সাথে কমপ্লায়েন্স ট্র্যাকিং।</p>
                </div>

                <div class="hs-card">
                    <h3>Compliance Readiness Scorecards</h3>
                    <div class="hs-compliance-row">
                        <div class="hs-comp-header">
                            <strong>OWASP Top 10 (Web Application Security)</strong>
                            <span class="hs-badge hs-cyan">85% PASSED</span>
                        </div>
                        <div class="hs-comp-items">
                            <div>✓ A01: Broken Access Control (Protected)</div>
                            <div>✓ A02: Cryptographic Failures (TLSv1.3 Active)</div>
                            <div>⚠️ A05: Security Misconfiguration (HSTS/CSP Missing)</div>
                        </div>
                    </div>

                    <div class="hs-compliance-row" style="margin-top:20px;">
                        <div class="hs-comp-header">
                            <strong>Bangladesh Cyber Security Act 2023 Guidelines</strong>
                            <span class="hs-badge hs-green">90% COMPLIANT</span>
                        </div>
                        <div class="hs-comp-items">
                            <div>✓ Section 17: Critical Information Infrastructure Defense</div>
                            <div>✓ Section 19: Unauthorized Access Prevention</div>
                            <div>⚠️ Section 23: Email Anti-Spoofing &amp; DMARC Policy Active</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB 11: WEBHOOKS -->
            <div class="hs-tab-content" id="tab-webhooks">
                <div class="hs-stage-header">
                    <h2>Security Webhooks &amp; Instant Incident Dispatcher</h2>
                    <p>ক্রিটিক্যাল দুর্বলতা ধরা পড়ার সাথে সাথে স্ল্যাক (Slack), ডিসকর্ড বা ইন্টারনাল সিআই/সিডি পাইপলাইনে অ্যালার্ট পাঠান।</p>
                </div>

                <div class="hs-card">
                    <h3>Enterprise Webhook &amp; SIEM Notification Gateway</h3>
                    <div class="hs-form-grid">
                        <div>
                            <label>Notification Platform</label>
                            <select id="webhookPlatformSelect" class="hs-cyber-select">
                                <option value="slack">Slack Incoming Webhook</option>
                                <option value="discord">Discord Channel Webhook</option>
                                <option value="teams">Microsoft Teams Webhook</option>
                                <option value="custom_siem">Custom SIEM / HTTP JSON Endpoint</option>
                            </select>
                        </div>
                        <div>
                            <label>HMAC-SHA256 Secret Signature</label>
                            <input type="text" readonly class="hs-cyber-input" value="hs_sec_9f81a7b3e0c4d291fa87">
                        </div>
                    </div>
                    <div style="margin-top:14px;">
                        <label>Target Webhook URL</label>
                        <input type="url" id="webhookUrlInput" class="hs-cyber-input" style="width:100%;" placeholder="https://hooks.slack.com/services/T00/B00/XXXX" value="https://hooks.slack.com/services/DEMO/SECURITY/ALERT">
                    </div>
                    <div style="margin-top:14px;" class="hs-form-row">
                        <label style="display:inline-flex; align-items:center; gap:8px; font-size:12px; color:#cbd5e1; cursor:pointer;">
                            <input type="checkbox" checked> Send alerts on CRITICAL (CVSS 9.0+) exposures
                        </label>
                        <label style="display:inline-flex; align-items:center; gap:8px; font-size:12px; color:#cbd5e1; cursor:pointer; margin-left:16px;">
                            <input type="checkbox" checked> Send report link on scan completion
                        </label>
                    </div>
                    <button class="hs-cyber-btn" style="margin-top:15px;" onclick="testSecurityWebhook()">DISPATCH TEST PAYLOAD</button>
                </div>
            </div>

            <!-- TAB 12: B2B SUBSCRIPTION -->
            <div class="hs-tab-content" id="tab-billing">
                <div class="hs-stage-header">
                    <h2>B2B Security Subscription &amp; Wallet Billing</h2>
                    <p>আপনার কোম্পানির প্রয়োজন অনুসারে অপটিমাইজড সিকিউরিটি প্যাকেজ বেছে নিন।</p>
                </div>

                <div class="hs-pricing-grid">
                    <div class="hs-card hs-price-card">
                        <h3>Starter Security</h3>
                        <div class="hs-price-amt">৳১,৫০০<span>/মাস</span></div>
                        <ul class="hs-price-features">
                            <li>৩টি ডোমেন বা ওয়েব অ্যাপ</li>
                            <li>সাপ্তাহিক অটোমেটেড অডিট</li>
                            <li>SSL/TLS ও হেডার বিশ্লেষণ</li>
                            <li>পিডিএফ রিপোর্ট ডাউনলোড</li>
                        </ul>
                        <button class="hs-cyber-btn" onclick="upgradePlan('starter')">Select Starter</button>
                    </div>

                    <div class="hs-card hs-price-card hs-featured-price">
                        <div class="hs-badge hs-cyan" style="margin-bottom:8px;">POPULAR FOR BUSINESS</div>
                        <h3>Business Continuous</h3>
                        <div class="hs-price-amt">৳৪,৫০০<span>/মাস</span></div>
                        <ul class="hs-price-features">
                            <li>১০টি ডোমেন ও এপিআই স্কোপ</li>
                            <li>দৈনিক কন্টিনিউয়াস মনিটরিং</li>
                            <li>CVE ও সংবেদনশীল ফাইল ডিটেকশন</li>
                            <li>AI কোড প্যাচিং গাইড</li>
                            <li>১টি কোয়ার্টারলি রেড টিম অডিট</li>
                        </ul>
                        <button class="hs-cyber-btn hs-btn-pulse" onclick="upgradePlan('business')">Select Business</button>
                    </div>

                    <div class="hs-card hs-price-card">
                        <h3>Enterprise Managed</h3>
                        <div class="hs-price-amt">৳১৫,০০০<span>/মাস</span></div>
                        <ul class="hs-price-features">
                            <li>আনলিমিটেড টার্গেট স্কোপ</li>
                            <li>রিয়েল-টাইম কন্টিনিউয়াস স্ক্যান</li>
                            <li>ডেডিকেটেড ম্যানুয়াল পেন্টেস্টিং</li>
                            <li>SLA গ্যারান্টি ও সাপোর্ট</li>
                            <li>এক্সিকিউটিভ ওয়ার্কশপ</li>
                        </ul>
                        <button class="hs-cyber-btn" onclick="upgradePlan('enterprise')">Select Enterprise</button>
                    </div>
                </div>
            </div>

            <!-- TAB 13: TERMINAL LOGS -->
            <div class="hs-tab-content" id="tab-terminal">
                <div class="hs-stage-header">
                    <h2>Live Security Operations Terminal Logs</h2>
                    <p>সার্ভার প্রোব ও ডায়াগনস্টিকসের রিয়েল-টাইম স্ট্রিম।</p>
                </div>
                <div class="hs-terminal-screen" style="height:350px;">
                    <div class="hs-term-line hs-term-cyan">[INFO] C2 Daemon Online · Listening on socket /var/run/hs_c2.sock</div>
                    <div class="hs-term-line">[DEBUG] Micro-batch queue initialized. Maximum execution limit: 15s.</div>
                    <div class="hs-term-line hs-term-green">[SUCCESS] Let's Encrypt TLS handshake verified on 443.</div>
                    <div class="hs-term-line hs-term-yellow">[WARN] Missing Strict-Transport-Security header detected.</div>
                    <div class="hs-term-line hs-term-red">[ALERT] Weak DMARC spoofing policy active on domain DNS.</div>
                    <div class="hs-term-line hs-term-cyan">[SYSTEM] Audit complete. Overall health score evaluated to 88/100.</div>
                </div>
            </div>

            <!-- TAB 14: ROE & GUIDELINES -->
            <div class="hs-tab-content" id="tab-guidelines">
                <div class="hs-stage-header">
                    <h2>Rules of Engagement (RoE) &amp; Ethical Standard</h2>
                    <p>ইথিক্যাল হ্যাকিং, আইনগত দ্বিপাক্ষিক অনুমোদন ও ৯৯.৯% জিরো-ডিসরাপশন এসএলএ চুক্তি।</p>
                </div>
                <div class="hs-card">
                    <h3>100% Responsible &amp; Lawful Security Testing Standard</h3>
                    <p>
                        Hackers শিক্ষক শুধুমাত্র অনুমোদিত ক্লায়েন্ট সম্পদের ওপর পরীক্ষা পরিচালনা করে। 
                        আমরা কোনো আন-অথরাইজড নেটওয়ার্কে ডস (DDoS) বা ধ্বংসাত্মক শোষণ চালাই না। সকল মূল্যায়ন 
                        <strong>বাংলাদেশ সাইবার নিরাপত্তা আইন ২০২৩</strong> এবং আন্তর্জাতিক <strong>OWASP WSTG v4.2</strong> স্ট্যান্ডার্ড মেনে পরিচালিত হয়।
                    </p>

                    <div style="margin-top:24px; padding-top:20px; border-top:1px solid #1e293b;">
                        <h3>Execute Bilateral Non-Disclosure Agreement (M-NDA) &amp; Legal Authorization</h3>
                        <p style="color:#94a3b8; font-size:12px; margin-bottom:16px;">
                            আপনার কোম্পানির সিকিউরিটি টিমের জন্য আইনগত বৈধতা ও কর্পোরেট অনুমোদন ফ্রেমওয়ার্ক জেনারেট করুন:
                        </p>
                        <div class="hs-form-grid">
                            <div>
                                <label>Corporate Organization Name</label>
                                <input type="text" id="roeOrgName" placeholder="Tech Global Solutions Ltd." class="hs-cyber-input">
                            </div>
                            <div>
                                <label>Authorized Signer / CISO Name</label>
                                <input type="text" id="roeSignerName" placeholder="Engr. Tanvir Ahmed" class="hs-cyber-input">
                            </div>
                            <div>
                                <label>Signer Official Title</label>
                                <input type="text" id="roeSignerTitle" placeholder="Head of IT Security &amp; Infrastructure" class="hs-cyber-input">
                            </div>
                        </div>
                        <div style="margin-top:14px;">
                            <label>Authorized Scope of Engagement</label>
                            <textarea id="roeScopeText" rows="3" class="hs-cyber-input" style="width:100%;" placeholder="https://api.techglobal.com, https://portal.techglobal.com"></textarea>
                        </div>
                        <button class="hs-cyber-btn" style="margin-top:16px;" onclick="signRulesOfEngagement()">EXECUTE LEGAL ROE &amp; DOWNLOAD CERTIFICATE</button>
                    </div>
                </div>
            </div>

        </section>
    </div>
</main>

<script>
    window.HS_CYBER_COMMAND = {
        ajaxUrl: '<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>',
        restUrl: '<?php echo esc_url( rest_url( 'hackersshikkhok/v1/security/' ) ); ?>',
        nonce: '<?php echo esc_js( $nonce ); ?>',
        siteUrl: '<?php echo esc_url( home_url() ); ?>'
    };
</script>
<script src="<?php echo esc_url( get_template_directory_uri() . '/assets/js/cyber-command.js' ); ?>"></script>

<?php
get_footer();
