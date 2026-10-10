<?php
declare(strict_types=1);
?><!doctype html>
<html <?php language_attributes(); ?> class="dark">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class( 'hs-theme-body' ); ?>>
<?php wp_body_open(); ?>
<div class="hs-top-live-notice">
    <div style="display:flex;align-items:center;gap:8px;flex:1;overflow:hidden;">
        <span class="hs-live-pill">🔴 লাইভ নোটিশ</span>
        <span class="hs-live-marquee">Hackers শিক্ষক (HackersShikkhok.com) — ২৮টি প্ল্যাটফর্ম সেন্টার, ১৮টি AI অটো-পাইলট, ক্রিয়েটর স্টুডিও ও ৬০+ টুলস এখন লাইভ!</span>
    </div>
    <!-- Global Language Switcher -->
    <div class="hs-lang-switcher" style="display:flex;align-items:center;gap:6px;font-size:12px;margin-left:auto;">
        <span style="color:var(--hs-text-muted);">🌐</span>
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" style="color:<?php echo ( ! isset($_GET['hs_lang']) || 'bn' === ($_GET['hs_lang'] ?? '') ) ? '#00f5d4;font-weight:700;' : '#94a3b8;'; ?>text-decoration:none;padding:2px 6px;border-radius:4px;">বাংলা</a>
        <span style="color:#334155;">|</span>
        <a href="<?php echo esc_url( home_url( '/en/' ) ); ?>" style="color:<?php echo ( 'en' === ($_GET['hs_lang'] ?? '') ) ? '#00f5d4;font-weight:700;' : '#94a3b8;'; ?>text-decoration:none;padding:2px 6px;border-radius:4px;">EN</a>
        <span style="color:#334155;">|</span>
        <a href="<?php echo esc_url( home_url( '/ar/' ) ); ?>" style="color:<?php echo ( 'ar' === ($_GET['hs_lang'] ?? '') ) ? '#00f5d4;font-weight:700;' : '#94a3b8;'; ?>text-decoration:none;padding:2px 6px;border-radius:4px;">العربية</a>
        <span style="color:#334155;">|</span>
        <a href="<?php echo esc_url( home_url( '/es/' ) ); ?>" style="color:<?php echo ( 'es' === ($_GET['hs_lang'] ?? '') ) ? '#00f5d4;font-weight:700;' : '#94a3b8;'; ?>text-decoration:none;padding:2px 6px;border-radius:4px;">ES</a>
    </div>
</div>
<header class="hs-main-header">
    <div class="hs-brand-zone">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hs-logo-link">Hackers শিক্ষক · hackersshikkhok.com</a>
    </div>
    <nav class="hs-center-nav" aria-label="Primary Navigation">
        <?php wp_nav_menu( array( 'theme_location' => 'primary', 'fallback_cb' => false ) ); ?>
    </nav>
    <div class="hs-auth-actions">
        <a href="<?php echo esc_url( wp_registration_url() ); ?>" class="hs-btn-register">রেজিস্ট্রেশন</a>
        <a href="<?php echo esc_url( wp_login_url() ); ?>" class="hs-btn-login">লগইন</a>
    </div>
</header>
