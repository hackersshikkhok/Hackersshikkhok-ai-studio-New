<?php
/**
 * Front Page Template - HackersShikkhok
 * Brand: HackersShikkhok (https://hackersshikkhok.com | YouTube: @HackersShikkhok)
 * 100% AdSense Compliant, SEO-Optimized, Cyber-Themed WordPress Homepage
 */
declare(strict_types=1);

get_header();

// Fetch popular tools from Universal Registry
$centers = class_exists( '\HackersShikkhok\Core\Tools\UniversalToolRegistry' ) ? \HackersShikkhok\Core\Tools\UniversalToolRegistry::get_centers() : array();
$all_tools = class_exists( '\HackersShikkhok\Core\Tools\UniversalToolRegistry' ) ? \HackersShikkhok\Core\Tools\UniversalToolRegistry::get_all_tools() : array();
$featured_tools = array_slice( $all_tools, 0, 8 );
?>

<main id="primary" class="site-main hs-front-page">

    <!-- Hero Section -->
    <section class="hs-hero-section">
        <div class="hs-hero-badge">CYBER DEFENSE ACADEMY &amp; 2,024+ TOOL LAB</div>
        <h1 class="hs-hero-title">Master Defensive Cybersecurity &amp; Full-Stack Engineering</h1>
        <p class="hs-hero-sub">
            HackersShikkhok is the premier open-access cyber defense academy, production code repository, and interactive 2,024+ client-side developer toolbox.
        </p>
        <div class="hs-hero-cta">
            <a href="<?php echo esc_url( home_url( '/academy/' ) ); ?>" class="hs-btn-primary">🎓 Explore Academy Courses</a>
            <a href="<?php echo esc_url( home_url( '/platform-center/' ) ); ?>" class="hs-btn-primary" style="background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%); border-color: #10b981; color: #fff;">🚀 Platform Center &amp; App Studio</a>
            <a href="<?php echo esc_url( home_url( '/tools/' ) ); ?>" class="hs-btn-secondary">⚡ Browse 2,024+ Tools</a>
        </div>
    </section>

    <!-- AdSense Compliant Banner Slot (Top) -->
    <div class="hs-ad-slot-container">
        <span class="hs-ad-label">Advertisement</span>
        <div class="hs-ad-banner-mock">
            <?php do_action( 'hs_render_ad_slot', 'homepage_top' ); ?>
        </div>
    </div>

    <!-- 8 Master Faculties / Categories -->
    <section class="hs-section-container">
        <div class="hs-section-header">
            <div>
                <h2 class="hs-section-title">🛡️ 8 Specialized Engineering Faculties</h2>
                <p style="color:var(--hs-text-muted);font-size:14px;margin-top:4px;">From foundational systems programming to advanced cyber defense operations.</p>
            </div>
            <a href="<?php echo esc_url( home_url( '/academy/' ) ); ?>" style="color:var(--hs-primary);text-decoration:none;font-size:14px;font-weight:600;">View All Courses &rarr;</a>
        </div>

        <div class="hs-card-grid">
            <div class="hs-cyber-card">
                <span class="hs-card-badge">Faculty 01</span>
                <h3 class="hs-card-title">Cybersecurity &amp; Ethical Hacking</h3>
                <p class="hs-card-desc">Defensive architecture, authorized penetration testing, Linux hardening, and OWASP Top 10 mitigation.</p>
                <a href="<?php echo esc_url( home_url( '/academy/?cat=cybersecurity' ) ); ?>" class="hs-btn-secondary" style="text-align:center;">10 Master Courses</a>
            </div>
            <div class="hs-cyber-card">
                <span class="hs-card-badge">Faculty 02</span>
                <h3 class="hs-card-title">Full-Stack Web &amp; Software Systems</h3>
                <p class="hs-card-desc">Modern JavaScript, TypeScript, React 19, Node.js, Python backends, and microservices architecture.</p>
                <a href="<?php echo esc_url( home_url( '/academy/?cat=webdev' ) ); ?>" class="hs-btn-secondary" style="text-align:center;">10 Master Courses</a>
            </div>
            <div class="hs-cyber-card">
                <span class="hs-card-badge">Faculty 03</span>
                <h3 class="hs-card-title">WordPress Engineering &amp; Ecosystem</h3>
                <p class="hs-card-desc">Professional theme and core plugin development, CPTs, REST APIs, security audits, and database tuning.</p>
                <a href="<?php echo esc_url( home_url( '/academy/?cat=wordpress' ) ); ?>" class="hs-btn-secondary" style="text-align:center;">10 Master Courses</a>
            </div>
            <div class="hs-cyber-card">
                <span class="hs-card-badge">Faculty 04</span>
                <h3 class="hs-card-title">AI, Data Science &amp; Autonomous Agents</h3>
                <p class="hs-card-desc">LLM orchestration, multi-provider failover, Python data intelligence, and autonomous autopilot engines.</p>
                <a href="<?php echo esc_url( home_url( '/academy/?cat=ai_data' ) ); ?>" class="hs-btn-secondary" style="text-align:center;">10 Master Courses</a>
            </div>
            <div class="hs-cyber-card">
                <span class="hs-card-badge">Faculty 05</span>
                <h3 class="hs-card-title">Freelancing &amp; Global Remote Careers</h3>
                <p class="hs-card-desc">International client acquisition, technical proposals, security auditing consulting, and remote job strategies.</p>
                <a href="<?php echo esc_url( home_url( '/academy/?cat=freelancing' ) ); ?>" class="hs-btn-secondary" style="text-align:center;">10 Master Courses</a>
            </div>
            <div class="hs-cyber-card">
                <span class="hs-card-badge">Faculty 06</span>
                <h3 class="hs-card-title">UI/UX Design Systems &amp; Media</h3>
                <p class="hs-card-desc">Figma design systems, glassmorphism UI tokens, YouTube tech branding, and high-fidelity vector styling.</p>
                <a href="<?php echo esc_url( home_url( '/academy/?cat=design_media' ) ); ?>" class="hs-btn-secondary" style="text-align:center;">10 Master Courses</a>
            </div>
            <div class="hs-cyber-card">
                <span class="hs-card-badge">Faculty 07</span>
                <h3 class="hs-card-title">Hardware, Networking &amp; IoT Defense</h3>
                <p class="hs-card-desc">Router security hardening, home lab infrastructure, packet analysis, and embedded IoT firmware development.</p>
                <a href="<?php echo esc_url( home_url( '/academy/?cat=hardware_iot' ) ); ?>" class="hs-btn-secondary" style="text-align:center;">10 Master Courses</a>
            </div>
            <div class="hs-cyber-card">
                <span class="hs-card-badge">Faculty 08</span>
                <h3 class="hs-card-title">Technical SEO &amp; Digital Growth</h3>
                <p class="hs-card-desc">Structured data (JSON-LD), Core Web Vitals optimization, content architecture, and tech sales funnels.</p>
                <a href="<?php echo esc_url( home_url( '/academy/?cat=marketing_business' ) ); ?>" class="hs-btn-secondary" style="text-align:center;">10 Master Courses</a>
            </div>
        </div>
    </section>

    <!-- 2,024+ Tools Center Preview -->
    <section class="hs-section-container" style="background:rgba(11,17,32,0.4);border-radius:24px;border:1px solid var(--hs-border);margin-top:24px;">
        <div class="hs-section-header">
            <div>
                <h2 class="hs-section-title">⚡ Essential Developer &amp; Security Tools</h2>
                <p style="color:var(--hs-text-muted);font-size:14px;margin-top:4px;">100% Client-Side, privacy-preserving, and instant in-browser execution.</p>
            </div>
            <a href="<?php echo esc_url( home_url( '/tools/' ) ); ?>" style="color:var(--hs-primary);text-decoration:none;font-size:14px;font-weight:600;">Full 2,024+ Tools Directory &rarr;</a>
        </div>

        <div class="hs-card-grid">
            <?php foreach ( $featured_tools as $tool ) : ?>
                <div class="hs-cyber-card">
                    <span class="hs-card-badge"><?php echo esc_html( $tool['category'] ?? 'Tool' ); ?></span>
                    <h3 class="hs-card-title" style="font-size:1.1rem;"><?php echo esc_html( $tool['name'] ?? 'Tool' ); ?></h3>
                    <p class="hs-card-desc" style="font-size:0.85rem;"><?php echo esc_html( $tool['short_desc'] ?? '' ); ?></p>
                    <a href="<?php echo esc_url( home_url( '/tools/?tool=' . urlencode( (string) ( $tool['id'] ?? ( $tool['tool_id'] ?? '' ) ) ) ) ); ?>" class="hs-btn-secondary" style="padding:8px 16px;text-align:center;font-size:13px;">Launch Tool</a>
                </div>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- YouTube & Community Section -->
    <section class="hs-section-container" style="margin-top:24px;">
        <div style="background:linear-gradient(135deg, rgba(123,44,191,0.2), rgba(0,245,212,0.1));border:1px solid var(--hs-border);border-radius:20px;padding:48px 32px;text-align:center;">
            <span class="hs-card-badge" style="background:rgba(239,68,68,0.2);color:#ef4444;border:1px solid rgba(239,68,68,0.4);">Official YouTube Channel</span>
            <h2 style="font-size:2rem;font-weight:800;color:#fff;margin:12px 0;">HackersShikkhok Official Video Resources</h2>
            <p style="color:var(--hs-text-muted);max-width:640px;margin:0 auto 24px;">
                Every academy course is accompanied by hands-on practical video walkthroughs and live demonstrations. Subscribe to join our community.
            </p>
            <a href="https://youtube.com/@HackersShikkhok" target="_blank" rel="noopener noreferrer" class="hs-btn-primary" style="background:#ef4444;color:#fff;box-shadow:0 0 20px rgba(239,68,68,0.4);">
                ▶ Subscribe to YouTube Channel
            </a>
        </div>
    </section>

    <!-- AdSense Compliant Banner Slot (Bottom) -->
    <div class="hs-ad-slot-container">
        <span class="hs-ad-label">Advertisement</span>
        <div class="hs-ad-banner-mock">
            <?php do_action( 'hs_render_ad_slot', 'homepage_bottom' ); ?>
        </div>
    </div>

</main>

<?php
get_footer();
