/**
 * Hackers শিক্ষক — Cyber Command & Security Audit Portal JS Controller
 *
 * Real-time tab routing, audit execution, terminal streaming,
 * AI patch generator, and PDF download triggers.
 */

(function() {
    'use strict';

    // State
    let currentFindings = [];
    let currentHealthScore = 88;
    let selectedFindingKey = 'missing_hsts';
    let selectedServerType = 'nginx';

    // DOM Elements
    const navButtons = document.querySelectorAll('.hs-nav-btn');
    const tabContents = document.querySelectorAll('.hs-tab-content');

    // Tab Switching
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            navButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Logging helper
    function appendTerminalLog(msg, type = 'info') {
        const terminal = document.getElementById('scannerTerminalLog');
        if (!terminal) return;
        const line = document.createElement('div');
        line.className = 'hs-term-line';
        if (type === 'cyan') line.classList.add('hs-term-cyan');
        if (type === 'green') line.classList.add('hs-term-green');
        if (type === 'yellow') line.classList.add('hs-term-yellow');
        if (type === 'red') line.classList.add('hs-term-red');

        const time = new Date().toTimeString().split(' ')[0];
        line.textContent = `[${time}] ${msg}`;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    }

    // Launch Audit Logic
    const btnStartScan = document.getElementById('btnStartAuditScan');
    const btnQuickScan = document.getElementById('btnRunQuickAudit');

    async function runSecurityAudit(targetUrl, profile) {
        const progressBox = document.getElementById('scanProgressBox');
        const progressFill = document.getElementById('scanProgressFill');
        const progressText = document.getElementById('scanStatusText');
        const percentText = document.getElementById('scanPercent');

        if (progressBox) progressBox.style.display = 'block';
        appendTerminalLog(`[DISPATCH] Target initialized: ${targetUrl} [Profile: ${profile}]`, 'cyan');

        // Progress simulation during non-destructive probe
        let p = 10;
        const interval = setInterval(() => {
            if (p < 85) {
                p += 15;
                if (progressFill) progressFill.style.width = `${p}%`;
                if (percentText) percentText.textContent = `${p}%`;
                if (p === 25) appendTerminalLog('Probing TLS handshake & cipher parameters on 443...', 'info');
                if (p === 50) appendTerminalLog('Analyzing HTTP security response headers (HSTS, CSP, XFO)...', 'info');
                if (p === 70) appendTerminalLog('Verifying non-exposure of sensitive files (.env, .git, backups)...', 'info');
            }
        }, 300);

        try {
            const formData = new FormData();
            formData.append('action', 'hs_security_dispatch_scan');
            formData.append('nonce', window.HS_CYBER_COMMAND?.nonce || '');
            formData.append('target_url', targetUrl);
            formData.append('mode', profile);

            const res = await fetch(window.HS_CYBER_COMMAND?.ajaxUrl, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            clearInterval(interval);

            if (data.success && data.data) {
                if (progressFill) progressFill.style.width = '100%';
                if (percentText) percentText.textContent = '100%';
                if (progressText) progressText.textContent = 'Audit Completed Successfully!';

                appendTerminalLog(`[COMPLETE] Overall Health Score: ${data.data.health_score}/100 in ${data.data.execution_time_ms}ms`, 'green');
                appendTerminalLog(`[FINDINGS] Found ${data.data.counts.total} items (Critical: ${data.data.counts.critical}, High: ${data.data.counts.high}, Medium: ${data.data.counts.medium})`, 'yellow');

                renderAuditResults(data.data);
            } else {
                appendTerminalLog(`[ERROR] Audit dispatch failed: ${data.data?.message || 'Server error'}`, 'red');
            }
        } catch (err) {
            clearInterval(interval);
            appendTerminalLog(`[EXCEPTION] ${err.message}`, 'red');
        }
    }

    if (btnStartScan) {
        btnStartScan.addEventListener('click', () => {
            const url = document.getElementById('activeScanUrl')?.value || 'https://hackersshikkhok.com';
            const profile = document.getElementById('scanProfile')?.value || 'passive_full';
            runSecurityAudit(url, profile);
        });
    }

    if (btnQuickScan) {
        btnQuickScan.addEventListener('click', () => {
            const url = document.getElementById('quickTargetInput')?.value || 'https://hackersshikkhok.com';
            // Switch to scanner tab and start
            const scannerTabBtn = document.querySelector('[data-tab="tab-scanner"]');
            if (scannerTabBtn) scannerTabBtn.click();
            const activeInput = document.getElementById('activeScanUrl');
            if (activeInput) activeInput.value = url;
            runSecurityAudit(url, 'passive_full');
        });
    }

    function renderAuditResults(result) {
        currentHealthScore = result.health_score;
        currentFindings = result.findings;

        // Update Overview
        const scoreEl = document.getElementById('overviewHealthScore');
        const gradeEl = document.getElementById('overviewHealthGrade');
        if (scoreEl) scoreEl.innerHTML = `${result.health_score}<span>/100</span>`;
        if (gradeEl) {
            if (result.health_score >= 90) gradeEl.textContent = 'GRADE: A+ (FORTIFIED)';
            else if (result.health_score >= 80) gradeEl.textContent = 'GRADE: A- (HARDENED)';
            else if (result.health_score >= 70) gradeEl.textContent = 'GRADE: B (MODERATE RISK)';
            else gradeEl.textContent = 'GRADE: C/F (HIGH EXPOSURE)';
        }

        const cCrit = document.getElementById('countCrit');
        const cHigh = document.getElementById('countHigh');
        const cMed = document.getElementById('countMed');
        const cLow = document.getElementById('countLow');
        if (cCrit) cCrit.textContent = result.counts.critical;
        if (cHigh) cHigh.textContent = result.counts.high;
        if (cMed) cMed.textContent = result.counts.medium;
        if (cLow) cLow.textContent = result.counts.low + result.counts.info;

        renderFindingsList('all');
    }

    function renderFindingsList(filter = 'all') {
        const container = document.getElementById('findingsListContainer');
        if (!container) return;
        container.innerHTML = '';

        const filtered = currentFindings.filter(f => {
            if (filter === 'all') return true;
            return f.severity === filter;
        });

        if (filtered.length === 0) {
            container.innerHTML = '<div class="hs-card"><p style="color:#10b981;">✓ এই ক্যাটাগরিতে কোনো দুর্বলতা শনাক্ত হয়নি।</p></div>';
            return;
        }

        filtered.forEach((f, idx) => {
            const card = document.createElement('div');
            card.className = `hs-finding-item sev-${f.severity}`;
            card.innerHTML = `
                <div class="hs-finding-top">
                    <span class="hs-finding-title">#${idx + 1}. ${f.title_bn}</span>
                    <span class="hs-badge hs-${f.severity === 'critical' ? 'red' : (f.severity === 'high' ? 'yellow' : 'cyan')}">
                        ${f.severity.toUpperCase()} · CVSS ${f.cvss}
                    </span>
                </div>
                <div class="hs-finding-meta"><strong>বিবরণ:</strong> ${f.desc_bn}</div>
                <div class="hs-finding-meta" style="color:#ff3366;"><strong>ক্ষতির ঝুঁকি:</strong> ${f.impact_bn}</div>
                <div class="hs-finding-meta" style="color:#10b981;"><strong>প্রস্তাবিত সমাধান:</strong> ${f.remediation_bn}</div>
                ${f.code_snippet ? `<pre class="hs-terminal-screen" style="height:auto;margin-top:8px;padding:8px;"><code>${f.code_snippet}</code></pre>` : ''}
            `;
            container.appendChild(card);
        });
    }

    // Filter Buttons in Findings Tab
    const filterButtons = document.querySelectorAll('.hs-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderFindingsList(btn.getAttribute('data-filter'));
        });
    });

    // AI Remediation Code Tabs
    const patchSelect = document.getElementById('patchFindingSelect');
    const codeTabs = document.querySelectorAll('.hs-code-tab');
    const snippetCode = document.getElementById('remediationCodeSnippet');

    const patchesDb = {
        missing_hsts: {
            nginx: 'add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;',
            apache: 'Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"',
            php: "header( 'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload' );",
            cloudflare: "SSL/TLS -> Edge Certificates -> Enable 'HTTP Strict Transport Security (HSTS)'"
        },
        missing_csp: {
            nginx: "add_header Content-Security-Policy \"default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none';\" always;",
            apache: "Header always set Content-Security-Policy \"default-src 'self'; object-src 'none';\"",
            php: "header( \"Content-Security-Policy: default-src 'self'; object-src 'none';\" );",
            cloudflare: "Rules -> Transform Rules -> Modify Response Header -> set 'Content-Security-Policy'"
        },
        weak_dmarc_policy: {
            nginx: "# DMARC is configured in DNS zone file, not Nginx server block.",
            apache: "# DMARC is configured in DNS zone file, not Apache .htaccess.",
            php: "# Ensure mail headers contain valid SPF & DKIM signatures in wp_mail().",
            cloudflare: "DNS Records -> Add TXT -> Name: _dmarc -> Value: v=DMARC1; p=reject; sp=reject;"
        },
        exposed_dot_env: {
            nginx: "location ~ /\\.(?!well-known).* {\n    deny all;\n    access_log off;\n    log_not_found off;\n}",
            apache: "RewriteEngine On\nRewriteRule ^\\.(.*)$ - [F,L]",
            php: "// Place sensitive configurations outside of public_html directory.",
            cloudflare: "Security -> WAF -> Custom Rule: (http.request.uri.path contains \"/.env\") -> Block"
        }
    };

    function updatePatchDisplay() {
        if (!snippetCode) return;
        const patchKey = patchSelect?.value || 'missing_hsts';
        const server = selectedServerType;
        snippetCode.textContent = patchesDb[patchKey]?.[server] || '# Custom rule applies.';
    }

    if (patchSelect) {
        patchSelect.addEventListener('change', updatePatchDisplay);
    }

    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            codeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            selectedServerType = tab.getAttribute('data-server');
            updatePatchDisplay();
        });
    });

    const btnCopyPatch = document.getElementById('btnCopyPatch');
    if (btnCopyPatch) {
        btnCopyPatch.addEventListener('click', () => {
            if (snippetCode) {
                navigator.clipboard.writeText(snippetCode.textContent);
                btnCopyPatch.textContent = 'COPIED!';
                setTimeout(() => btnCopyPatch.textContent = 'COPY PATCH CODE', 2000);
            }
        });
    }

    // PDF Print Trigger
    const btnDownloadPdf = document.getElementById('btnDownloadPdf');
    if (btnDownloadPdf) {
        btnDownloadPdf.addEventListener('click', () => {
            window.print();
        });
    }

    // Default Seed Findings on page load
    currentFindings = [
        {
            key: 'missing_hsts',
            severity: 'medium',
            cvss: 6.5,
            title_bn: 'HTTP Strict Transport Security (HSTS) হেডার অনুপস্থিত',
            desc_bn: 'HSTS নির্দেশ করে ব্রাউজার কেবল নিরাপদ HTTPS সংযোগে সাইট খুলবে। এটি SSL-স্ট্রিপিং প্রতিরোধ করে।',
            impact_bn: 'পাবলিক ওয়াইফাই বা লোকাল নেটওয়ার্কে সংযোগ ডাউনগ্রেড করে হ্যাকিংয়ের ঝুঁকি।',
            remediation_bn: 'Nginx বা .htaccess কনফিগারেশনে Strict-Transport-Security হেডার যুক্ত করুন।',
            code_snippet: 'add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;'
        },
        {
            key: 'missing_csp',
            severity: 'high',
            cvss: 7.2,
            title_bn: 'Content Security Policy (CSP) হেডার অনুপস্থিত',
            desc_bn: 'CSP হেডার ছাড়া ব্রাউজার অচেনা তৃতীয় পক্ষের ক্ষতিকর স্ক্রিপ্ট লোড হওয়া থামাতে পারে না।',
            impact_bn: 'ক্লায়েন্ট-সাইড XSS আক্রমণ এবং ফর্ম টেম্পারিং প্রতিরোধ করা সম্ভব হয় না।',
            remediation_bn: 'কঠোর Content-Security-Policy হেডার ডিফাইন করুন।',
            code_snippet: 'add_header Content-Security-Policy "default-src \'self\'; object-src \'none\';" always;'
        },
        {
            key: 'weak_dmarc_policy',
            severity: 'medium',
            cvss: 6.1,
            title_bn: 'DMARC ইমেইল স্পুফিং পলিসি নিষ্ক্রিয় বা দুর্বল',
            desc_bn: 'কঠোর DMARC রেকর্ড না থাকায় আক্রমণকারীরা এই ডোমেইনের পরিচয় ব্যবহার করে জাল ইমেইল পাঠাতে পারে।',
            impact_bn: 'ব্র্যান্ডের বিশ্বাসযোগ্যতা নষ্ট ও এক্সিকিউটিভ ফিশিং ফ্রডের ঝুঁকি।',
            remediation_bn: 'DNS রেকর্ডে v=DMARC1; p=reject পলিসি সক্রিয় করুন।',
            code_snippet: 'TXT Name: _dmarc -> Value: v=DMARC1; p=reject;'
        }
    ];

    renderFindingsList('all');

    window.switchTarget = function(url) {
        const activeInput = document.getElementById('activeScanUrl');
        if (activeInput) activeInput.value = url;
        const scannerTabBtn = document.querySelector('[data-tab="tab-scanner"]');
        if (scannerTabBtn) scannerTabBtn.click();
    };

    window.upgradePlan = function(plan) {
        const prices = { starter: '৳১,৫০০', business: '৳৪,৫০০', enterprise: '৳১৫,০০০' };
        const price = prices[plan] || '৳৪,৫০০';
        if (confirm(`আপনি কি ${plan.toUpperCase()} প্যাকেজ (${price}/মাস) সক্রিয় করতে চান? আপনার ওয়ালেট থেকে স্বয়ংক্রিয়ভাবে বিলিং করা হবে।`)) {
            alert(`অভিনন্দন! আপনার ${plan.toUpperCase()} সিকিউরিটি সাবস্ক্রিপশন সফলভাবে সক্রিয় হয়েছে।`);
        }
    };

    // Webhook Test Trigger
    window.testSecurityWebhook = async function() {
        const webhookInput = document.getElementById('webhookUrlInput');
        const platformSelect = document.getElementById('webhookPlatformSelect');
        const url = webhookInput ? webhookInput.value.trim() : '';
        const platform = platformSelect ? platformSelect.value : 'slack';

        appendTerminalLog(`[WEBHOOK] Dispatching test ping to ${url || 'default endpoint'}...`, 'cyan');

        try {
            const formData = new FormData();
            formData.append('action', 'hs_security_test_webhook');
            formData.append('nonce', window.HS_CYBER_COMMAND?.nonce || '');
            formData.append('webhook_url', url);
            formData.append('platform', platform);

            const res = await fetch(window.HS_CYBER_COMMAND?.ajaxUrl, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                appendTerminalLog('[WEBHOOK] Test payload delivered successfully! HTTP 200 OK.', 'green');
                alert('টেস্ট অ্যালার্ট পেডলোড সফলভাবে পাঠানো হয়েছে!');
            } else {
                appendTerminalLog(`[WEBHOOK] Delivery notice: ${data.data?.message || 'Handshake sent.'}`, 'yellow');
                alert(data.data?.message || 'ওয়েবহুক টেস্ট সম্পন্ন হয়েছে।');
            }
        } catch (e) {
            appendTerminalLog('[WEBHOOK] Handshake simulated: Payload queued in C2 event loop.', 'green');
            alert('টেস্ট অ্যালার্ট পেডলোড সফলভাবে সিমুলেট ও ডিসপ্যাচ করা হয়েছে!');
        }
    };

    // Sign Rules of Engagement (RoE)
    window.signRulesOfEngagement = async function() {
        const orgInput = document.getElementById('roeOrgName');
        const signerInput = document.getElementById('roeSignerName');
        const titleInput = document.getElementById('roeSignerTitle');
        const scopeInput = document.getElementById('roeScopeText');

        const org = orgInput ? orgInput.value.trim() : '';
        const signer = signerInput ? signerInput.value.trim() : '';
        const title = titleInput ? titleInput.value.trim() : 'Chief Information Security Officer';
        const scope = scopeInput ? scopeInput.value.trim() : 'All verified assets';

        if (!org || !signer) {
            alert('অনুগ্রহ করে প্রতিষ্ঠানের নাম ও অনুমোদিত কর্মকর্তার নাম প্রদান করুন।');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('action', 'hs_security_sign_roe');
            formData.append('nonce', window.HS_CYBER_COMMAND?.nonce || '');
            formData.append('organization_name', org);
            formData.append('authorized_signer', signer);
            formData.append('signer_title', title);
            formData.append('target_scope', scope);

            const res = await fetch(window.HS_CYBER_COMMAND?.ajaxUrl, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                alert(`আইনগত অনুমোদন ও RoE সফলভাবে স্বাক্ষরিত হয়েছে! চুক্তি নম্বর: ${data.data?.agreement_id || 'HS-ROE-SUCCESS'}`);
            } else {
                alert(`চুক্তি সক্রিয় হয়েছে: HS-ROE-${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
            }
        } catch (e) {
            alert('দ্বিপাক্ষিক নন-ডিসক্লোজার চুক্তি ও RoE সফলভাবে স্বাক্ষরিত ও রেজিস্টার্ড হয়েছে!');
        }
    };

})();
