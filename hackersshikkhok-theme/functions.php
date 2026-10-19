<?php
/**
 * HackersShikkhok Theme presentation bootstrap (v4.0.0).
 * Developed by HackersShikkhok (https://hackersshikkhok.com)
 * Zero business logic is placed in the theme. All CPTs, DB tables, and tools reside in hackersshikkhok-core.
 */

declare(strict_types=1);

namespace HackersShikkhok\Theme;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require_once get_template_directory() . '/inc/ComponentLibrary.php';

/**
 * Prevent zlib output compression conflict on shared hosts/cPanel
 */
add_action( 'init', static function (): void {
    if ( ini_get( 'zlib.output_compression' ) || ( function_exists( 'ob_get_level' ) && ob_get_level() > 0 ) ) {
        remove_action( 'shutdown', 'wp_ob_end_flush_all', 1 );
    }
}, 0 );

add_action( 'after_setup_theme', static function (): void {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
    register_nav_menus( array(
        'primary'       => __( 'Primary Cyber Header Menu', 'hackersshikkhok-theme' ),
        'mobile_drawer' => __( 'Mobile Drawer Navigation', 'hackersshikkhok-theme' ),
        'mobile_tabs'   => __( 'Bottom 5-Tab Navigation', 'hackersshikkhok-theme' ),
        'footer_legal'  => __( 'Footer Legal & Trust Menu', 'hackersshikkhok-theme' ),
    ) );
} );

add_action( 'widgets_init', static function (): void {
    register_sidebar( array(
        'name'          => __( 'Primary Cyber Sidebar', 'hackersshikkhok-theme' ),
        'id'            => 'cyber-primary-sidebar',
        'description'   => __( 'Appears on tutorials, single posts, and archives.', 'hackersshikkhok-theme' ),
        'before_widget' => '<div id="%1$s" class="hs-sidebar-widget hs-cyber-card %2$s" style="margin-bottom:24px;">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="hs-widget-title" style="font-size:1rem;font-weight:700;color:#00f5d4;margin-bottom:14px;border-bottom:1px solid rgba(0,245,212,0.2);padding-bottom:8px;">',
        'after_title'   => '</h3>',
    ) );
} );

add_action( 'wp_enqueue_scripts', static function (): void {
    // Premium WebFonts: Plus Jakarta Sans, Inter, JetBrains Mono
    wp_enqueue_style( 'hs-google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@500;600;700;800;900&display=swap', array(), null );

    wp_enqueue_style( 'hs-theme-style', get_stylesheet_uri(), array( 'hs-google-fonts' ), '4.1.0' );
    wp_enqueue_style( 'hs-theme-layout', get_template_directory_uri() . '/assets/css/theme.css', array( 'hs-theme-style' ), '4.1.0' );
    wp_enqueue_style( 'hs-cyber-lms', get_template_directory_uri() . '/assets/css/cyber-lms.css', array( 'hs-theme-layout' ), '4.1.0' );

    if ( is_page_template( 'page-cyber-command.php' ) || is_page( 'cyber-command' ) ) {
        wp_enqueue_style( 'hs-cyber-command', get_template_directory_uri() . '/assets/css/cyber-command.css', array( 'hs-theme-layout' ), '4.1.0' );
        wp_enqueue_script( 'hs-cyber-command-js', get_template_directory_uri() . '/assets/js/cyber-command.js', array(), '4.1.0', true );
    }

    wp_enqueue_script( 'hs-theme-script', get_template_directory_uri() . '/assets/js/theme.js', array(), '4.1.0', true );
    wp_enqueue_script( 'hs-ui-script', get_template_directory_uri() . '/assets/js/hs-ui.js', array(), '4.1.0', true );
    wp_enqueue_script( 'hs-theming-engine', get_template_directory_uri() . '/assets/js/theming-engine.js', array(), '4.1.0', true );
    wp_enqueue_script( 'hs-terminal-engine', get_template_directory_uri() . '/assets/js/terminal-engine.js', array(), '4.1.0', true );
    wp_enqueue_script( 'hs-i18n-engine', get_template_directory_uri() . '/assets/js/i18n-engine.js', array(), '4.1.0', true );

    $payload = array(
        'ajax_url'           => admin_url( 'admin-ajax.php' ),
        'rest_url'           => esc_url_raw( rest_url( 'hackersshikkhok/v1/' ) ),
        'rest_nonce'         => wp_create_nonce( 'wp_rest' ),
        'site_url'           => home_url( '/' ),
        'theme_url'          => get_template_directory_uri(),
        'is_user_logged_in'  => is_user_logged_in(),
        'current_user_id'    => get_current_user_id(),
        'official_brand'     => 'HackersShikkhok',
        'official_site_url'  => 'https://hackersshikkhok.com',
    );

    wp_localize_script( 'hs-terminal-engine', 'hsTerminalData', $payload );
    wp_localize_script( 'hs-theme-script', 'hsThemeData', $payload );
    wp_localize_script( 'hs-i18n-engine', 'hsI18nData', $payload );
    if ( wp_script_is( 'hs-cyber-command-js', 'enqueued' ) ) {
        wp_localize_script( 'hs-cyber-command-js', 'hsCommandData', $payload );
    }
} );

/**
 * Robust Template Routing Engine (Zero 404 guarantee for Academy, Tools, Centers, Hubs)
 */
add_filter( 'template_include', static function ( string $template ): string {
    $request_uri = isset( $_SERVER['REQUEST_URI'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : '';
    $path = trim( (string) parse_url( $request_uri, PHP_URL_PATH ), '/' );

    $map = array(
        'academy'            => 'page-academy.php',
        'tools'              => 'archive-tools.php',
        'platform-center'    => 'page-platform-center.php',
        'app-maker'          => 'page-app-maker.php',
        'app-studio'         => 'page-app-maker.php',
        'cyber-command'      => 'page-cyber-command.php',
        'desktop'            => 'page-desktop.php',
        'dashboard'          => 'page-dashboard.php',
        'services'           => 'page-services.php',
        'verify-certificate' => 'page-verify-certificate.php',
        'disclaimer'         => 'page-disclaimer.php',
        'privacy'            => 'page-privacy.php',
        'privacy-policy'     => 'page-privacy.php',
        'terms'              => 'page-terms.php',
        'terms-of-service'   => 'page-terms.php',
        'dmca'               => 'page-dmca.php',
        'dmca-policy'        => 'page-dmca.php',
        'sitemap'            => 'page-sitemap.php',
    );

    if ( isset( $map[ $path ] ) ) {
        $candidate = get_template_directory() . '/' . $map[ $path ];
        if ( file_exists( $candidate ) ) {
            return $candidate;
        }
    }

    if ( $path === 'tools' || strpos( $path, 'tools/' ) === 0 || is_post_type_archive( 'tools' ) ) {
        $candidate = get_template_directory() . '/archive-tools.php';
        if ( file_exists( $candidate ) ) {
            return $candidate;
        }
    }

    if ( is_post_type_archive( 'hs_course' ) ) {
        $candidate = get_template_directory() . '/archive-hs_course.php';
        if ( file_exists( $candidate ) ) {
            return $candidate;
        }
    }

    return $template;
} );

add_action( 'admin_notices', static function (): void {
    $screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
    if ( ! $screen || 'themes' !== $screen->id ) {
        return;
    }
    $screenshot_url = esc_url( get_template_directory_uri() . '/screenshot.png' );
    ?>
    <div class="notice notice-info is-dismissible" style="background:#0b1120;color:#e2e8f0;border-left:4px solid #00f5d4;padding:14px;display:flex;align-items:center;gap:16px;">
        <img src="<?php echo $screenshot_url; ?>" alt="HackersShikkhok Theme Preview" style="width:96px;height:72px;object-fit:cover;border-radius:8px;border:1px solid #00f5d4;" />
        <div>
            <strong style="color:#00f5d4;font-size:14px;">🛡️ HackersShikkhok 2040 Cyber &amp; Coding Hub Theme (v4.0.0) — Developed by HackersShikkhok</strong>
            <p style="margin:4px 0;color:#cbd5e1;font-size:12px;">Premium Cyberpunk &amp; Glassmorphism Theme featuring 28 Platform Centers, Universal Social System, Creator Studio, Device Lab, and 2,024+ Developer Tools.</p>
            <a href="https://hackersshikkhok.com" target="_blank" rel="noopener noreferrer" style="color:#00f5d4;font-weight:700;font-size:12px;">🌐 Official Website: https://hackersshikkhok.com</a>
        </div>
    </div>
    <?php
} );
