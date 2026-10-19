<?php
/**
 * Plugin Name:       HackersShikkhok Core Engine
 * Plugin URI:        https://hackersshikkhok.com
 * Description:       Official Master Core Engine for HackersShikkhok.com (v4.0.0). Powers 28 Platform Centers, Universal Social & Notification Engine (Follow, Like, Favorite/Save, Share, Deep-linked Comments, Private Messaging, Block, Report, Deduplicated Notifications),  Points/Level/Badges  Monetary Wallet Ledger,  - AI -,   , Global Emergency Kill Switch,  Custom Post Types,  Custom Taxonomies,    ,  CSS/RGB/Neon , + //PDF/ ,  ,     । Developed by HackersShikkhok — Official Website & Download: https://hackersshikkhok.com
 * Version:           4.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.0
 * Author:            Developed by HackersShikkhok
 * Author URI:        https://hackersshikkhok.com
 * Update URI:        https://hackersshikkhok.com
 * Text Domain:       hackersshikkhok-core
 * Domain Path:       /languages
 * License:           GPL v2 or later
 * License URI:       https://hackersshikkhok.com
 */

declare(strict_types=1);

namespace HackersShikkhok\Core;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'HS_CORE_VERSION', '4.0.0' );
define( 'HS_CORE_PATH', plugin_dir_path( __FILE__ ) );
define( 'HS_CORE_URL', plugin_dir_url( __FILE__ ) );
define( 'HS_CORE_BASENAME', plugin_basename( __FILE__ ) );
define( 'HS_OFFICIAL_SITE_URL', 'https://hackersshikkhok.com' );
define( 'HS_OFFICIAL_BRAND', 'HackersShikkhok' );

spl_autoload_register( static function ( string $class ): void {
    $prefix = 'HackersShikkhok\\Core\\';
    if ( strncmp( $prefix, $class, strlen( $prefix ) ) !== 0 ) {
        return;
    }
    $relative_class = substr( $class, strlen( $prefix ) );
    $relative_path  = str_replace( '\\', '/', $relative_class ) . '.php';
    $candidates = array(
        HS_CORE_PATH . 'includes/' . $relative_path,
        HS_CORE_PATH . 'admin/' . $relative_path,
    );
    foreach ( $candidates as $file ) {
        if ( file_exists( $file ) ) {
            require_once $file;
            return;
        }
    }
} );

register_activation_hook( __FILE__, array( Core\Activator::class, 'activate' ) );
register_deactivation_hook( __FILE__, array( Core\Deactivator::class, 'deactivate' ) );

add_action( 'plugins_loaded', static function (): void {
    Core\Plugin::instance()->boot();
} );

/**
 * Display rich visual icon, banner card, developer attribution, and official download link
 * directly inside WordPress Admin -> Plugins (plugins.php) and Plugin Details modal.
 */
add_filter( 'plugin_action_links_' . HS_CORE_BASENAME, static function ( array $links ): array {
    $custom = array(
        '<a href="' . esc_url( admin_url( 'admin.php?page=hs-control-center' ) ) . '" style="color:#00a389;font-weight:700;">⚙️ Control Center</a>',
        '<a href="' . esc_url( HS_OFFICIAL_SITE_URL ) . '" target="_blank" rel="noopener noreferrer" style="color:#6d28d9;font-weight:700;">📥 Official Download</a>',
    );
    return array_merge( $custom, $links );
} );

add_filter( 'plugin_row_meta', static function ( array $meta, string $plugin_file ): array {
    if ( HS_CORE_BASENAME !== $plugin_file ) {
        return $meta;
    }
    $icon_url = esc_url( HS_CORE_URL . 'assets/images/icon-256x256.png' );
    $preview_card = '<div style="margin-top:10px;padding:12px;background:#0b1120;color:#e2e8f0;border:1px solid rgba(0,245,212,0.35);border-radius:10px;display:flex;align-items:center;gap:14px;max-width:760px;">'
        . '<img src="' . $icon_url . '" alt="HackersShikkhok Core Engine" style="width:64px;height:64px;border-radius:10px;border:1px solid #00f5d4;object-fit:cover;flex-shrink:0;" onerror="this.style.display=\'none\'" />'
        . '<div style="font-size:12px;line-height:1.5;">'
        . '<div style="color:#00f5d4;font-weight:700;font-size:13px;">🛡️ HackersShikkhok Core Engine v' . esc_html( HS_CORE_VERSION ) . ' — Developed by HackersShikkhok</div>'
        . '<div style="color:#94a3b8;margin-top:2px;">28 Platform Centers · Universal Social/Notification/Messaging Engine · 18 AI Autopilots · 11 Universal Factories · 1,500+ Ultra-Pro Universal Tools Suite (Developer, VAPT, Cryptography, CSS &amp; SEO) · Creator Studio · Device Lab · Games Center</div>'
        . '<div style="margin-top:6px;"><a href="' . esc_url( HS_OFFICIAL_SITE_URL ) . '" target="_blank" rel="noopener" style="color:#00f5d4;text-decoration:none;font-weight:600;">🌐 Website &amp; Download: https://hackersshikkhok.com</a> &nbsp;|&nbsp; <a href="https://youtube.com/@HackersShikkhok" target="_blank" rel="noopener" style="color:#a78bfa;text-decoration:none;font-weight:600;">▶️ YouTube: @HackersShikkhok</a></div>'
        . '</div></div>';

    $meta[] = '<strong>Developed by HackersShikkhok</strong>';
    $meta[] = '<a href="' . esc_url( HS_OFFICIAL_SITE_URL ) . '" target="_blank" rel="noopener noreferrer">🌐 Download &amp; Updates (hackersshikkhok.com)</a>';
    $meta[] = $preview_card;
    return $meta;
}, 10, 2 );

add_filter( 'plugins_api', static function ( $result, string $action, object $args ) {
    if ( 'plugin_information' !== $action || empty( $args->slug ) || 'hackersshikkhok-core' !== $args->slug ) {
        return $result;
    }
    return (object) array(
        'name'          => 'HackersShikkhok Core Engine (v4.0 Complete Ecosystem)',
        'slug'          => 'hackersshikkhok-core',
        'version'       => HS_CORE_VERSION,
        'author'        => '<a href="https://hackersshikkhok.com">Developed by HackersShikkhok</a>',
        'homepage'      => HS_OFFICIAL_SITE_URL,
        'download_link' => HS_OFFICIAL_SITE_URL,
        'requires'      => '6.4',
        'tested'        => '6.7',
        'requires_php'  => '8.0',
        'banners'       => array(
            'low'  => HS_CORE_URL . 'assets/images/banner-772x250.png',
            'high' => HS_CORE_URL . 'assets/images/banner-772x250.png',
        ),
        'icons'         => array(
            '1x'  => HS_CORE_URL . 'assets/images/icon-256x256.png',
            '2x'  => HS_CORE_URL . 'assets/images/icon-256x256.png',
            'svg' => HS_CORE_URL . 'assets/images/icon.svg',
        ),
        'sections'      => array(
            'description'  => '<h3>HackersShikkhok (HackersShikkhok.com) —     (v4.0.0)</h3><p>  ,  ,  ,   ,  ,  ,    + /       ।</p><ul><li><strong>Developed by:</strong> HackersShikkhok</li><li><strong>Official Website &amp; Download Link:</strong> <a href="https://hackersshikkhok.com">https://hackersshikkhok.com</a></li></ul>',
            'installation' => '<ol><li><code>hackersshikkhok-core.zip</code>  WordPress Admin → Plugins → Add New → Upload Plugin     ।</li><li> <code>hackersshikkhok-theme.zip</code>  Appearance → Themes     ।</li></ol>',
            'changelog'    => '<h4>Version 4.0.0</h4><ul><li>Added Universal Interaction Engine (Follow, Like, Favorite, Share, Deep-linked Comments, Private Messaging, Block, Report, Deduplicated Notifications), Creator Studio, Device Lab, Games Center, 11 Universal Factories, Global Emergency Kill Switch, and Passkey/Geo Privacy systems.</li></ul>',
        ),
    );
}, 10, 3 );
