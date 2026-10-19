<?php
/**
 * HackersShikkhok Theme presentation bootstrap (v4.0.0).
 * Developed by HackersShikkhok (https://hackersshikkhok.com)
 *
 * Strict architectural rule:
 * Zero business logic is placed in the theme. All CPTs, DB tables, and tools reside in hackersshikkhok-core.
 */

declare(strict_types=1);

namespace HackersShikkhok\Theme;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require_once get_template_directory() . '/inc/ComponentLibrary.php';

add_action( 'after_setup_theme', static function (): void {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ) );

    register_nav_menus( array(
        'primary'     => __( 'Primary Cyber Header Menu', 'hackersshikkhok-theme' ),
        'mobile_tabs' => __( 'Bottom 5-Tab Navigation', 'hackersshikkhok-theme' ),
        'footer_links'=> __( 'Footer Cyber Links', 'hackersshikkhok-theme' ),
    ) );
} );

add_action( 'wp_enqueue_scripts', static function (): void {
    // 1. Google Fonts: Hind Siliguri (Bangla), JetBrains Mono (Code/Terminal), Inter (UI)
    wp_enqueue_style(
        'hs-google-fonts',
        'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@400;500;600;700;800&display=swap',
        array(),
        null
    );

    // 2. Core Theme Stylesheet (Hero, Cards, Headers, Navigation, Buttons)
    wp_enqueue_style(
        'hs-theme-css',
        get_template_directory_uri() . '/assets/css/theme.css',
        array( 'hs-google-fonts' ),
        '4.0.0'
    );

    // 3. Cyber LMS Stylesheet
    wp_enqueue_style(
        'hs-cyber-lms',
        get_template_directory_uri() . '/assets/css/cyber-lms.css',
        array( 'hs-theme-css' ),
        '4.0.0'
    );

    // 4. Cyber Command & Terminal Stylesheet
    wp_enqueue_style(
        'hs-cyber-command',
        get_template_directory_uri() . '/assets/css/cyber-command.css',
        array( 'hs-theme-css' ),
        '4.0.0'
    );

    // 5. Primary Style.css
    wp_enqueue_style(
        'hs-theme-style',
        get_stylesheet_uri(),
        array( 'hs-theme-css', 'hs-cyber-lms' ),
        '4.0.0'
    );

    // JavaScript Assets
    wp_enqueue_script(
        'hs-theme-script',
        get_template_directory_uri() . '/assets/js/theme.js',
        array(),
        '4.0.0',
        true
    );

    wp_enqueue_script(
        'hs-ui-script',
        get_template_directory_uri() . '/assets/js/hs-ui.js',
        array(),
        '4.0.0',
        true
    );

    wp_enqueue_script(
        'hs-theming-engine',
        get_template_directory_uri() . '/assets/js/theming-engine.js',
        array(),
        '4.0.0',
        true
    );

    wp_enqueue_script(
        'hs-terminal-engine',
        get_template_directory_uri() . '/assets/js/terminal-engine.js',
        array(),
        '4.0.0',
        true
    );

    wp_enqueue_script(
        'hs-cyber-command-js',
        get_template_directory_uri() . '/assets/js/cyber-command.js',
        array(),
        '4.0.0',
        true
    );

    // Localize REST API config for front-end AJAX/Fetch
    wp_localize_script( 'hs-theme-script', 'hsThemeConfig', array(
        'root'      => esc_url_raw( rest_url() ),
        'apiRoot'   => esc_url_raw( rest_url( 'hackersshikkhok/v1/' ) ),
        'nonce'     => wp_create_nonce( 'wp_rest' ),
        'homeUrl'   => esc_url_raw( home_url( '/' ) ),
        'themeUrl'  => esc_url_raw( get_template_directory_uri() ),
        'brandName' => 'HackersShikkhok',
    ) );
} );

add_action( 'admin_notices', static function (): void {
    $screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
    if ( ! $screen || 'themes' !== $screen->id ) {
        return;
    }
    $screenshot_url = esc_url( get_template_directory_uri() . '/screenshot.png' );
    ?>
    <div class="notice notice-info is-dismissible" style="background:#0b1120;color:#e2e8f0;border-left:4px solid #00f5d4;padding:16px;display:flex;align-items:center;gap:18px;">
        <img src="<?php echo $screenshot_url; ?>" alt="HackersShikkhok Theme Preview" style="width:110px;height:80px;object-fit:cover;border-radius:10px;border:1px solid #00f5d4;" />
        <div>
            <strong style="color:#00f5d4;font-size:15px;">🛡️ HackersShikkhok 2040 Cyber &amp; Coding Hub Theme (v4.0.0) — Developed by HackersShikkhok</strong>
            <p style="margin:6px 0;color:#cbd5e1;font-size:13px;">  ,   ,  ,  ,    +   -   ।</p>
            <div style="display:flex;gap:14px;align-items:center;margin-top:6px;">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" target="_blank" style="color:#050811;background:#00f5d4;font-weight:700;font-size:12px;padding:4px 10px;border-radius:6px;text-decoration:none;">🌐   </a>
                <a href="<?php echo esc_url( admin_url( 'admin.php?page=hs-diagnostics' ) ); ?>" style="color:#38bdf8;font-weight:700;font-size:12px;text-decoration:none;">🩺     </a>
                <a href="https://hackersshikkhok.com" target="_blank" rel="noopener noreferrer" style="color:#94a3b8;font-size:12px;text-decoration:none;"> : hackersshikkhok.com</a>
            </div>
        </div>
    </div>
    <?php
} );
