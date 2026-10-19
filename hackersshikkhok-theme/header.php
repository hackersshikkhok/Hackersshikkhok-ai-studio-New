<?php
/**
 * Master Cyberpunk Header Template - HackersShikkhok
 * Brand: HackersShikkhok (https://hackersshikkhok.com)
 * 100% Mobile-Responsive, Zero-Overflow, AdSense CLS-Safe, Multi-Language Ready
 */
declare(strict_types=1);
?><!doctype html>
<html <?php language_attributes(); ?> class="dark">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <?php wp_head(); ?>
</head>
<body <?php body_class( 'hs-theme-body' ); ?>>
<?php wp_body_open(); ?>

<!-- Top Live Notice & Language Ticker Bar -->
<div class="hs-top-live-notice">
    <div class="hs-ticker-left">
        <span class="hs-live-pill" data-i18n="live_radar">🔴 LIVE RADAR</span>
        <span class="hs-live-marquee" data-i18n="live_marquee">HackersShikkhok (HackersShikkhok.com) — 28 Platform Centers, 18 AI Autopilots, Creator Studio &amp; 2,024+ Tools are Active!</span>
    </div>
    <!-- Global Interactive Language Switcher -->
    <div class="hs-lang-switcher" aria-label="Language Selector">
        <span class="hs-lang-icon" title="Global Language">🌐</span>
        <button type="button" class="hs-lang-btn" data-lang="en">EN</button>
        <span class="hs-lang-sep">|</span>
        <button type="button" class="hs-lang-btn" data-lang="bn">বাং</button>
        <span class="hs-lang-sep">|</span>
        <button type="button" class="hs-lang-btn" data-lang="hi">हि</button>
        <span class="hs-lang-sep">|</span>
        <button type="button" class="hs-lang-btn" data-lang="ar">عر</button>
        <span class="hs-lang-sep">|</span>
        <button type="button" class="hs-lang-btn" data-lang="es">ES</button>
    </div>
</div>

<!-- Main Sticky Header Bar -->
<header class="hs-main-header">
    <div class="hs-header-container">
        <!-- Brand Logo Zone -->
        <div class="hs-brand-zone">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hs-logo-link">
                <span class="hs-logo-icon">🛡️</span>
                <span class="hs-logo-text">Hackers<span class="hs-text-cyan">Shikkhok</span></span>
                <span class="hs-domain-badge">.com</span>
            </a>
        </div>

        <!-- Desktop Navigation Bar -->
        <nav class="hs-center-nav hs-desktop-only" aria-label="Primary Navigation">
            <?php
            if ( has_nav_menu( 'primary' ) ) {
                wp_nav_menu( array(
                    'theme_location' => 'primary',
                    'container'      => false,
                    'menu_class'     => 'hs-default-nav',
                ) );
            } else {
                ?>
                <ul class="hs-default-nav">
                    <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>" data-i18n="nav_home">Home</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/academy/' ) ); ?>" data-i18n="nav_academy">🎓 Academy</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/platform-center/' ) ); ?>" data-i18n="nav_centers" class="hs-nav-highlight">🚀 Platform Center</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/app-maker/' ) ); ?>" data-i18n="nav_app_studio" class="hs-nav-studio">📱 App Studio</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/tools/' ) ); ?>" data-i18n="nav_tools">⚡ 2,024+ Tools</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/cyber-command/' ) ); ?>" data-i18n="nav_cyber_cmd">💻 Cyber Command</a></li>
                </ul>
                <?php
            }
            ?>
        </nav>

        <!-- Right Action Buttons & Mobile Hamburger -->
        <div class="hs-header-actions">
            <div class="hs-auth-actions hs-desktop-only">
                <?php if ( is_user_logged_in() ) : 
                    $hs_uid = get_current_user_id();
                    $hs_user = wp_get_current_user();
                    $hs_w = class_exists( '\HackersShikkhok\Core\LMS\Wallet_Economy' ) 
                        ? \HackersShikkhok\Core\LMS\Wallet_Economy::get_wallet( $hs_uid ) 
                        : array( 'balance_bdt' => 50.00, 'xp_points' => 200 );
                ?>
                    <a href="<?php echo esc_url( home_url( '/dashboard/' ) ); ?>" class="hs-btn-login" style="border-color:rgba(0,245,212,0.4); background:rgba(0,245,212,0.1); display:inline-flex; align-items:center; gap:6px;">
                        <span>💳 BDT <?php echo number_format( (float) ( $hs_w['balance_bdt'] ?? 50.0 ), 2 ); ?></span>
                    </a>
                    <a href="<?php echo esc_url( home_url( '/dashboard/' ) ); ?>" class="hs-btn-register" style="display:inline-flex; align-items:center; gap:6px;">
                        <span>👤 <?php echo esc_html( wp_trim_words( $hs_user->display_name ?: $hs_user->user_login, 2, '' ) ); ?></span>
                    </a>
                    <a href="<?php echo esc_url( wp_logout_url( home_url( '/' ) ) ); ?>" class="hs-btn-login" style="padding:8px 10px; color:#ef4444 !important; border-color:rgba(239,68,68,0.4);" title="Sign Out">
                        ✕
                    </a>
                <?php else : ?>
                    <a href="<?php echo esc_url( home_url( '/dashboard/' ) ); ?>" class="hs-btn-login" style="border-color:rgba(0,245,212,0.3); color:#00f5d4 !important;">
                        💳 Portal
                    </a>
                    <a href="<?php echo esc_url( wp_registration_url() ); ?>" class="hs-btn-register" data-i18n="btn_register">Register</a>
                    <a href="<?php echo esc_url( wp_login_url( home_url( '/dashboard/' ) ) ); ?>" class="hs-btn-login" data-i18n="btn_signin">Sign In</a>
                <?php endif; ?>
            </div>

            <!-- Mobile Hamburger Toggle -->
            <button type="button" class="hs-mobile-toggle" id="hs-mobile-menu-btn" aria-label="Toggle Mobile Navigation" aria-expanded="false">
                <span class="hs-bar hs-bar-1"></span>
                <span class="hs-bar hs-bar-2"></span>
                <span class="hs-bar hs-bar-3"></span>
            </button>
        </div>
    </div>
</header>

<!-- Mobile Navigation Drawer Overlay & Panel -->
<div class="hs-mobile-drawer-overlay" id="hs-drawer-overlay"></div>
<aside class="hs-mobile-drawer" id="hs-mobile-drawer" aria-label="Mobile Navigation Drawer">
    <div class="hs-drawer-header">
        <div class="hs-drawer-brand">
            <span class="hs-logo-icon">🛡️</span>
            <span class="hs-logo-text">Hackers<span class="hs-text-cyan">Shikkhok</span></span>
        </div>
        <button type="button" class="hs-drawer-close" id="hs-drawer-close-btn" aria-label="Close Navigation">✕</button>
    </div>

    <!-- Quick Search in Mobile Drawer -->
    <div class="hs-drawer-search">
        <form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
            <input type="search" name="s" placeholder="🔍 Search courses, tools, commands..." data-i18n="search_placeholder" class="hs-drawer-search-input" />
        </form>
    </div>

    <!-- Drawer Navigation Links -->
    <nav class="hs-drawer-nav">
        <ul class="hs-drawer-menu">
            <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">🏠 <span data-i18n="nav_home">Home</span></a></li>
            <li><a href="<?php echo esc_url( home_url( '/academy/' ) ); ?>">🎓 <span data-i18n="nav_academy">Academy &amp; LMS Hub</span></a></li>
            <li><a href="<?php echo esc_url( home_url( '/tools/' ) ); ?>" class="hs-menu-accent">⚡ <span data-i18n="nav_tools">2,024+ Developer Tools</span></a></li>
            <li><a href="<?php echo esc_url( home_url( '/platform-center/' ) ); ?>">🚀 <span data-i18n="nav_centers">28 Platform Centers</span></a></li>
            <li><a href="<?php echo esc_url( home_url( '/app-maker/' ) ); ?>">📱 <span data-i18n="nav_app_studio">App Studio &amp; Maker</span></a></li>
            <li><a href="<?php echo esc_url( home_url( '/cyber-command/' ) ); ?>">💻 <span data-i18n="nav_cyber_cmd">Cyber Command Central</span></a></li>
            <li><a href="<?php echo esc_url( home_url( '/desktop/' ) ); ?>">🖥️ WebOS Desktop</a></li>
            <li><a href="<?php echo esc_url( home_url( '/dashboard/' ) ); ?>">📊 Student Dashboard &amp; Wallet</a></li>
            <li><a href="<?php echo esc_url( home_url( '/verify-certificate/' ) ); ?>">📜 Verify Certificate</a></li>
            <li><a href="<?php echo esc_url( home_url( '/services/' ) ); ?>">🛡️ Cybersecurity Services</a></li>
        </ul>
    </nav>

    <!-- Mobile Drawer Language Selector -->
    <div class="hs-drawer-lang-section">
        <span class="hs-drawer-lang-label">🌐 Select Language / ভাষা নির্বাচন:</span>
        <div class="hs-drawer-lang-pills">
            <button type="button" class="hs-lang-btn" data-lang="en">English</button>
            <button type="button" class="hs-lang-btn" data-lang="bn">বাংলা</button>
            <button type="button" class="hs-lang-btn" data-lang="hi">हिन्दी</button>
            <button type="button" class="hs-lang-btn" data-lang="ar">العربية</button>
            <button type="button" class="hs-lang-btn" data-lang="es">Español</button>
        </div>
    </div>

    <!-- Mobile Drawer Auth Buttons -->
    <div class="hs-drawer-auth" style="margin-top:20px; padding-top:16px; border-top:1px solid var(--hs-border-subtle); display:flex; flex-direction:column; gap:10px;">
        <?php if ( is_user_logged_in() ) : 
            $hs_uid = get_current_user_id();
            $hs_user = wp_get_current_user();
            $hs_w = class_exists( '\HackersShikkhok\Core\LMS\Wallet_Economy' ) 
                ? \HackersShikkhok\Core\LMS\Wallet_Economy::get_wallet( $hs_uid ) 
                : array( 'balance_bdt' => 50.00, 'xp_points' => 200 );
        ?>
            <a href="<?php echo esc_url( home_url( '/dashboard/' ) ); ?>" class="hs-btn-register" style="text-align:center;">
                👤 <?php echo esc_html( $hs_user->display_name ?: $hs_user->user_login ); ?> (BDT <?php echo number_format( (float) ( $hs_w['balance_bdt'] ?? 50.0 ), 2 ); ?>)
            </a>
            <a href="<?php echo esc_url( wp_logout_url( home_url( '/' ) ) ); ?>" class="hs-btn-login" style="text-align:center; color:#ef4444 !important; border-color:rgba(239,68,68,0.4);">
                Sign Out
            </a>
        <?php else : ?>
            <a href="<?php echo esc_url( wp_registration_url() ); ?>" class="hs-btn-register" style="text-align:center;" data-i18n="btn_register">Register Free Account</a>
            <a href="<?php echo esc_url( wp_login_url( home_url( '/dashboard/' ) ) ); ?>" class="hs-btn-login" style="text-align:center;" data-i18n="btn_signin">Sign In</a>
        <?php endif; ?>
    </div>
</aside>
