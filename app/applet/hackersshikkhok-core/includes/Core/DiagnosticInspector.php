<?php
/**
 * Hackers শিক্ষক — Master Diagnostic Inspector & System Error Logger Engine
 * Developed by Hackers শিক্ষক (https://hackersshikkhok.com)
 *
 * Provides real-time cPanel / wp-content / WP-Admin diagnostics:
 * - Real-time error logger to wp-content/hackersshikkhok-debug.log
 * - Server environment health audit (PHP 8.0+, MySQL, Memory, Extensions)
 * - 21-Table Custom Database Verifier & One-Click Auto-Repair
 * - Theme & Frontend Asset Enqueue Validator
 * - Interactive WP-Admin Diagnostic Console
 */

declare(strict_types=1);

namespace HackersShikkhok\Core\Core;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class DiagnosticInspector {

    private static string $log_file = '';
    private static array $boot_issues = array();

    public static function register(): void {
        self::$log_file = WP_CONTENT_DIR . '/hackersshikkhok-debug.log';

        // Register custom shutdown error capturer
        register_shutdown_function( array( self::class, 'handle_shutdown_errors' ) );

        // Admin hooks
        if ( is_admin() ) {
            add_action( 'admin_menu', array( self::class, 'register_admin_menu' ), 20 );
            add_action( 'admin_notices', array( self::class, 'render_boot_notices' ) );
            add_action( 'wp_ajax_hs_repair_database', array( self::class, 'ajax_repair_database' ) );
            add_action( 'wp_ajax_hs_clear_debug_log', array( self::class, 'ajax_clear_debug_log' ) );
            add_action( 'wp_ajax_hs_run_system_self_test', array( self::class, 'ajax_run_system_self_test' ) );
            add_action( 'admin_post_hs_download_debug_log', array( self::class, 'download_debug_log' ) );
        }
    }

    public static function register_admin_menu(): void {
        add_submenu_page(
            'hs-control-center',
            __( '🩺 সিস্টেম ডায়াগনস্টিক ও এরর লগ', 'hackersshikkhok-core' ),
            __( '🩺 ডায়াগনস্টিক ও এরর লগ', 'hackersshikkhok-core' ),
            'manage_options',
            'hs-diagnostics',
            array( self::class, 'render_admin_page' )
        );
    }

    public static function get_log_path(): string {
        if ( empty( self::$log_file ) ) {
            self::$log_file = WP_CONTENT_DIR . '/hackersshikkhok-debug.log';
        }
        return self::$log_file;
    }

    /**
     * Log a diagnostic message with severity to wp-content/hackersshikkhok-debug.log
     */
    public static function log( string $message, string $level = 'INFO', array $context = array() ): void {
        $file = self::get_log_path();
        $date = gmdate( 'Y-m-d H:i:s \U\T\C' );
        $ip   = sanitize_text_field( $_SERVER['REMOTE_ADDR'] ?? 'CLI' );
        $uri  = sanitize_text_field( $_SERVER['REQUEST_URI'] ?? '' );

        $extra = ! empty( $context ) ? ' | Context: ' . wp_json_encode( $context, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) : '';
        $entry = sprintf( "[%s] [%s] [IP: %s] [URI: %s] %s%s\n", $date, strtoupper( $level ), $ip, $uri, $message, $extra );

        // Prevent uncontrolled file growth: rotate if > 5MB
        if ( file_exists( $file ) && filesize( $file ) > 5 * 1024 * 1024 ) {
            @rename( $file, $file . '.' . gmdate( 'Ymd_His' ) . '.old' );
        }

        @file_put_contents( $file, $entry, FILE_APPEND | LOCK_EX );
        if ( defined( 'WP_DEBUG' ) && WP_DEBUG && defined( 'WP_DEBUG_LOG' ) && WP_DEBUG_LOG ) {
            error_log( '[HackersShikkhok] ' . $entry );
        }
    }

    /**
     * Safely log an engine boot error without halting execution
     */
    public static function log_system_error( string $component, \Throwable $e ): void {
        $message = sprintf(
            'Engine Boot Warning in [%s]: %s in %s:%d',
            $component,
            $e->getMessage(),
            $e->getFile(),
            $e->getLine()
        );

        self::$boot_issues[] = array(
            'component' => $component,
            'message'   => $e->getMessage(),
            'file'      => $e->getFile(),
            'line'      => $e->getLine(),
        );

        self::log( $message, 'CRITICAL', array(
            'trace' => array_slice( explode( "\n", $e->getTraceAsString() ), 0, 5 ),
        ) );
    }

    /**
     * Catch fatal shutdown errors and write clean diagnostic info to debug log
     */
    public static function handle_shutdown_errors(): void {
        $error = error_get_last();
        if ( $error && in_array( $error['type'], array( E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR ), true ) ) {
            if ( str_contains( $error['file'], 'hackersshikkhok' ) ) {
                self::log(
                    sprintf( 'FATAL SHUTDOWN CAUGHT: %s in %s:%d', $error['message'], $error['file'], $error['line'] ),
                    'FATAL'
                );
            }
        }
    }

    public static function render_boot_notices(): void {
        if ( empty( self::$boot_issues ) || ! current_user_can( 'manage_options' ) ) {
            return;
        }
        ?>
        <div class="notice notice-warning is-dismissible" style="background:#0f172a;border-left:4px solid #f59e0b;color:#f8fafc;padding:12px 16px;">
            <div style="font-weight:700;color:#f59e0b;margin-bottom:6px;">
                ⚠️ Hackers শিক্ষক Self-Healing Notification
            </div>
            <p style="margin:0 0 6px;font-size:13px;color:#cbd5e1;">
                প্লাগইন নিরাপদভাবে চালু হয়েছে, তবে কিছু মডিউলে ছোট সতর্কবার্তা পাওয়া গেছে (সাইট সম্পূর্ণ সচল রয়েছে):
            </p>
            <ul style="margin:4px 0 8px 18px;list-style:disc;font-size:12px;color:#94a3b8;">
                <?php foreach ( self::$boot_issues as $issue ) : ?>
                    <li><strong><?php echo esc_html( $issue['component'] ); ?>:</strong> <?php echo esc_html( $issue['message'] ); ?></li>
                <?php endforeach; ?>
            </ul>
            <a href="<?php echo esc_url( admin_url( 'admin.php?page=hs-diagnostics' ) ); ?>" class="button button-small" style="background:#00f5d4;color:#050811;font-weight:700;border:none;">
                🩺 সম্পূর্ণ ডায়াগনস্টিক রিপোর্ট দেখুন
            </a>
        </div>
        <?php
    }

    /**
     * Collect full system diagnostic status
     */
    public static function get_system_audit(): array {
        global $wpdb;

        // Required extensions
        $exts = array( 'pdo', 'mysqli', 'curl', 'mbstring', 'openssl', 'gd', 'json', 'zip', 'fileinfo' );
        $ext_status = array();
        foreach ( $exts as $ext ) {
            $ext_status[ $ext ] = extension_loaded( $ext );
        }

        // Database tables check (21 core tables)
        $p = $wpdb->prefix . 'hs_';
        $core_tables = array(
            $p . 'migrations',
            $p . 'ai_jobs',
            $p . 'ai_logs',
            $p . 'ai_token_ledgers',
            $p . 'user_wallets',
            $p . 'wallet_ledgers',
            $p . 'withdrawals',
            $p . 'ctf_challenges',
            $p . 'ctf_submissions',
            $p . 'course_enrollments',
            $p . 'lesson_progress',
            $p . 'certificates',
            $p . 'api_key_vault',
            $p . 'analytics_events',
            $p . 'security_targets',
            $p . 'security_scans',
            $p . 'security_findings',
            $p . 'redteam_engagements',
            $p . 'security_subscriptions',
            $p . 'translation_ledger',
            $p . 'security_intelligence',
        );

        $tables_status = array();
        foreach ( $core_tables as $tbl ) {
            $exists = $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $tbl ) ) === $tbl;
            $count  = $exists ? (int) $wpdb->get_var( "SELECT COUNT(*) FROM `{$tbl}`" ) : 0;
            $tables_status[ $tbl ] = array(
                'exists' => $exists,
                'count'  => $count,
            );
        }

        // Theme check
        $theme = wp_get_theme();
        $is_hs_theme = str_contains( strtolower( $theme->get( 'Name' ) ), 'hackers' );
        $theme_dir = get_template_directory();

        $theme_files = array(
            'style.css'                   => file_exists( $theme_dir . '/style.css' ),
            'assets/css/theme.css'        => file_exists( $theme_dir . '/assets/css/theme.css' ),
            'assets/css/cyber-lms.css'    => file_exists( $theme_dir . '/assets/css/cyber-lms.css' ),
            'front-page.php'              => file_exists( $theme_dir . '/front-page.php' ),
            'index.php'                   => file_exists( $theme_dir . '/index.php' ),
            'page-academy.php'            => file_exists( $theme_dir . '/page-academy.php' ),
            'template-parts/post-card.php'=> file_exists( $theme_dir . '/template-parts/post-card.php' ),
        );

        return array(
            'server' => array(
                'php_version'        => PHP_VERSION,
                'php_ok'             => version_compare( PHP_VERSION, '8.0.0', '>=' ),
                'mysql_version'      => $wpdb->db_version(),
                'web_server'         => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
                'memory_limit'       => ini_get( 'memory_limit' ),
                'max_execution_time' => ini_get( 'max_execution_time' ) . 's',
                'post_max_size'      => ini_get( 'post_max_size' ),
                'upload_max_filesize'=> ini_get( 'upload_max_filesize' ),
                'extensions'         => $ext_status,
            ),
            'wordpress' => array(
                'version'        => get_bloginfo( 'version' ),
                'site_url'       => get_site_url(),
                'home_url'       => get_home_url(),
                'debug'          => defined( 'WP_DEBUG' ) && WP_DEBUG,
                'debug_log'      => defined( 'WP_DEBUG_LOG' ) && WP_DEBUG_LOG,
                'log_file_path'  => self::get_log_path(),
                'log_file_size'  => file_exists( self::get_log_path() ) ? size_format( filesize( self::get_log_path() ) ) : '0 KB',
            ),
            'tables' => $tables_status,
            'theme'  => array(
                'name'      => $theme->get( 'Name' ),
                'version'   => $theme->get( 'Version' ),
                'is_active' => $is_hs_theme,
                'files'     => $theme_files,
            ),
        );
    }

    /**
     * AJAX action to repair/reinstall database tables
     */
    public static function ajax_repair_database(): void {
        check_ajax_referer( 'hs_diagnostics_nonce', 'nonce' );
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( array( 'message' => 'Unauthorized' ), 403 );
        }

        try {
            Database::install_tables();
            Capabilities::register_roles_and_caps();
            flush_rewrite_rules();
            self::log( 'Manual Database Table Auto-Repair successfully completed by Administrator.', 'SUCCESS' );
            wp_send_json_success( array(
                'message' => '২১টি ডাটাবেস টেবিল এবং পারমিশন স্কিমা সফলভাবে আপডেট ও মেরামত করা হয়েছে!',
            ) );
        } catch ( \Throwable $e ) {
            self::log( 'Database repair error: ' . $e->getMessage(), 'ERROR' );
            wp_send_json_error( array( 'message' => $e->getMessage() ), 500 );
        }
    }

    /**
     * AJAX action to clear debug log
     */
    public static function ajax_clear_debug_log(): void {
        check_ajax_referer( 'hs_diagnostics_nonce', 'nonce' );
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( array( 'message' => 'Unauthorized' ), 403 );
        }

        $file = self::get_log_path();
        if ( file_exists( $file ) ) {
            @file_put_contents( $file, '' );
        }
        self::log( 'Debug log cleared by admin.', 'INFO' );
        wp_send_json_success( array( 'message' => 'ডিবাগ লগ সফলভাবে মুছে ফেলা হয়েছে।' ) );
    }

    /**
     * AJAX action to run system self-test
     */
    public static function ajax_run_system_self_test(): void {
        global $wpdb;
        check_ajax_referer( 'hs_diagnostics_nonce', 'nonce' );
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( array( 'message' => 'Unauthorized' ), 403 );
        }

        $results = array();

        // 1. DB Write/Read test
        try {
            $test_val = 'test_' . time();
            $opt_name = 'hs_test_diagnostic_key';
            update_option( $opt_name, $test_val );
            $read_val = get_option( $opt_name );
            delete_option( $opt_name );
            $results['database'] = ( $read_val === $test_val ) ? 'PASS' : 'FAIL';
        } catch ( \Throwable $e ) {
            $results['database'] = 'FAIL: ' . $e->getMessage();
        }

        // 2. Uploads folder writable
        $upload_dir = wp_upload_dir();
        $results['upload_writable'] = wp_is_writable( $upload_dir['basedir'] ) ? 'PASS' : 'FAIL (Read-Only)';

        // 3. Log file writable
        $log_dir = WP_CONTENT_DIR;
        $results['log_writable'] = wp_is_writable( $log_dir ) ? 'PASS' : 'FAIL (wp-content not writable)';

        // 4. REST API status
        $rest_url = get_rest_url( null, 'hackersshikkhok/v1/tools' );
        $results['rest_endpoint'] = ! empty( $rest_url ) ? 'PASS (' . esc_url( $rest_url ) . ')' : 'FAIL';

        // 5. Post Types check
        $cpts = array( 'tutorials', 'code', 'tools', 'projects', 'cyber_guides', 'troubleshooting' );
        $registered_cpts = get_post_types();
        $missing_cpts = array();
        foreach ( $cpts as $cpt ) {
            if ( ! isset( $registered_cpts[ $cpt ] ) ) {
                $missing_cpts[] = $cpt;
            }
        }
        $results['post_types'] = empty( $missing_cpts ) ? 'PASS (সকল CPT নিবন্ধিত)' : 'WARNING (অপেক্ষমান: ' . implode( ', ', $missing_cpts ) . ')';

        self::log( 'System Self-Test Executed: ' . wp_json_encode( $results ), 'INFO' );
        wp_send_json_success( array(
            'message' => 'সেলফ-টেস্ট সফলভাবে সম্পন্ন হয়েছে!',
            'results' => $results,
        ) );
    }

    /**
     * Download log file action
     */
    public static function download_debug_log(): void {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( 'Unauthorized' );
        }
        check_admin_referer( 'hs_download_debug_log' );

        $file = self::get_log_path();
        if ( ! file_exists( $file ) ) {
            wp_die( 'লগ ফাইল পাওয়া যায়নি।' );
        }

        header( 'Content-Description: File Transfer' );
        header( 'Content-Type: text/plain; charset=utf-8' );
        header( 'Content-Disposition: attachment; filename="hackersshikkhok-debug-' . gmdate( 'Y-m-d' ) . '.log"' );
        header( 'Expires: 0' );
        header( 'Cache-Control: must-revalidate' );
        header( 'Pragma: public' );
        header( 'Content-Length: ' . filesize( $file ) );
        readfile( $file );
        exit;
    }

    /**
     * Render the Master Diagnostics & Error Log Admin Page
     */
    public static function render_admin_page(): void {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( esc_html__( 'Unauthorized access.', 'hackersshikkhok-core' ) );
        }

        $audit = self::get_system_audit();
        $nonce = wp_create_nonce( 'hs_diagnostics_nonce' );
        $log_file = self::get_log_path();
        $log_lines = array();

        if ( file_exists( $log_file ) && is_readable( $log_file ) ) {
            $content = file_get_contents( $log_file );
            if ( false !== $content ) {
                $all_lines = array_filter( explode( "\n", trim( $content ) ) );
                $log_lines = array_slice( $all_lines, -200 ); // last 200 lines
                $log_lines = array_reverse( $log_lines );
            }
        }

        $download_url = wp_nonce_url( admin_url( 'admin-post.php?action=hs_download_debug_log' ), 'hs_download_debug_log' );
        ?>
        <div class="wrap hs-diagnostics-wrap" style="max-width:1280px;margin-top:20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
            
            <!-- Header Banner -->
            <div style="background:linear-gradient(135deg, #0b1120 0%, #030712 100%);color:#f8fafc;padding:28px;border-radius:16px;border:1px solid #00f5d4;box-shadow:0 12px 36px rgba(0,245,212,0.12);margin-bottom:24px;">
                <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;">
                    <div>
                        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(0,245,212,0.1);color:#00f5d4;border:1px solid rgba(0,245,212,0.3);padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;margin-bottom:8px;">
                            <span style="display:inline-block;width:8px;height:8px;background:#00f5d4;border-radius:50%;box-shadow:0 0 8px #00f5d4;"></span>
                            সিস্টেম ডায়াগনস্টিক, সেলফ-হিলিং ও রিয়েল-টাইম এরর লগ
                        </div>
                        <h1 style="color:#ffffff;font-size:24px;font-weight:800;margin:0 0 6px;">🩺 Hackers শিক্ষক সিস্টেম অডিট ও হেলথ সেন্টার</h1>
                        <p style="color:#94a3b8;font-size:13px;margin:0;">
                            cPanel হোস্টিং, সার্ভার কনফিগারেশন, ২১টি ডাটাবেস টেবিল ও থিম অ্যাসেট ভেরিফায়ার।
                        </p>
                    </div>
                    <div style="display:flex;gap:10px;flex-wrap:wrap;">
                        <button type="button" id="hs-btn-repair-db" class="button" style="background:#00f5d4;color:#050811;font-weight:700;border:none;padding:8px 16px;height:auto;border-radius:8px;box-shadow:0 0 16px rgba(0,245,212,0.4);cursor:pointer;">
                            🛠️ ডাটাবেস টেবিল মেরামত ও রি-ইন্সটল
                        </button>
                        <button type="button" id="hs-btn-self-test" class="button" style="background:#3b82f6;color:#ffffff;font-weight:700;border:none;padding:8px 16px;height:auto;border-radius:8px;cursor:pointer;">
                            ⚡ সেলফ-টেস্ট রান করুন
                        </button>
                        <a href="<?php echo esc_url( $download_url ); ?>" class="button" style="background:#1e293b;color:#f8fafc;font-weight:600;border:1px solid #475569;padding:8px 16px;height:auto;border-radius:8px;text-decoration:none;">
                            📥 লগ ডাউনলোড
                        </a>
                        <button type="button" id="hs-btn-clear-log" class="button" style="background:#ef4444;color:#ffffff;font-weight:600;border:none;padding:8px 16px;height:auto;border-radius:8px;cursor:pointer;">
                            🧹 লগ ক্লিয়ার
                        </button>
                    </div>
                </div>
                <div id="hs-action-status" style="margin-top:16px;display:none;padding:12px;border-radius:8px;font-size:13px;font-weight:600;"></div>
            </div>

            <!-- 4-Column Quick Stat Grid -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;margin-bottom:24px;">
                
                <!-- Card 1: PHP & Server -->
                <div style="background:#0b1120;border:1px solid #1e293b;border-radius:12px;padding:18px;">
                    <div style="color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;">সার্ভার ও পিএইচপি</div>
                    <div style="font-size:20px;font-weight:800;color:<?php echo $audit['server']['php_ok'] ? '#10b981' : '#ef4444'; ?>;margin:6px 0;">
                        PHP <?php echo esc_html( $audit['server']['php_version'] ); ?>
                        <span style="font-size:12px;padding:2px 8px;border-radius:4px;background:rgba(16,185,129,0.1);color:#10b981;font-weight:700;"><?php echo $audit['server']['php_ok'] ? 'অনুকূল' : 'অপ্রতুল'; ?></span>
                    </div>
                    <div style="color:#cbd5e1;font-size:12px;line-height:1.6;">
                        মেমোরি: <strong><?php echo esc_html( $audit['server']['memory_limit'] ); ?></strong><br>
                        ম্যাক্স এক্সিকিউশন: <strong><?php echo esc_html( $audit['server']['max_execution_time'] ); ?></strong><br>
                        আপলোড লিমিট: <strong><?php echo esc_html( $audit['server']['upload_max_filesize'] ); ?></strong>
                    </div>
                </div>

                <!-- Card 2: Database 21 Tables -->
                <?php
                $tables_installed = count( array_filter( $audit['tables'], static fn( $t ) => $t['exists'] ) );
                $tables_total     = count( $audit['tables'] );
                $all_tables_ok    = ( $tables_installed === $tables_total );
                ?>
                <div style="background:#0b1120;border:1px solid #1e293b;border-radius:12px;padding:18px;">
                    <div style="color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;">ডাটাবেস টেবিল স্কিমা</div>
                    <div style="font-size:20px;font-weight:800;color:<?php echo $all_tables_ok ? '#10b981' : '#f59e0b'; ?>;margin:6px 0;">
                        <?php echo esc_html( $tables_installed . ' / ' . $tables_total ); ?> টেবিল
                        <span style="font-size:12px;padding:2px 8px;border-radius:4px;background:<?php echo $all_tables_ok ? 'rgba(16,185,129,0.1);color:#10b981' : 'rgba(245,158,11,0.1);color:#f59e0b'; ?>;font-weight:700;">
                            <?php echo $all_tables_ok ? 'সম্পূর্ণ সক্রিয়' : 'মেরামত প্রয়োজন'; ?>
                        </span>
                    </div>
                    <div style="color:#cbd5e1;font-size:12px;line-height:1.6;">
                        MySQL ভার্সন: <strong><?php echo esc_html( $audit['server']['mysql_version'] ); ?></strong><br>
                        কাস্টম প্রিফিক্স: <code><?php echo esc_html( $GLOBALS['wpdb']->prefix . 'hs_' ); ?></code><br>
                        অ্যাক্টিভেশন স্ট্যাটাস: <strong><?php echo $all_tables_ok ? 'সব টেবিল প্রস্তুত' : 'ক্লিক করুন মেরামত বাটনে'; ?></strong>
                    </div>
                </div>

                <!-- Card 3: Theme Status -->
                <div style="background:#0b1120;border:1px solid #1e293b;border-radius:12px;padding:18px;">
                    <div style="color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;">থিম ও অ্যাসেট স্ট্যাটাস</div>
                    <div style="font-size:20px;font-weight:800;color:#00f5d4;margin:6px 0;">
                        <?php echo esc_html( $audit['theme']['name'] ); ?>
                    </div>
                    <div style="color:#cbd5e1;font-size:12px;line-height:1.6;">
                        থিম ভার্সন: <strong><?php echo esc_html( $audit['theme']['version'] ); ?></strong><br>
                        অ্যাক্টিভ: <strong><?php echo $audit['theme']['is_active'] ? '✅ হ্যাঁ' : '⚠️ অন্য থিম'; ?></strong><br>
                        Front Page ফাইল: <strong><?php echo $audit['theme']['files']['front-page.php'] ? '✅ প্রস্তুত' : '❌ অনুপস্থিত'; ?></strong>
                    </div>
                </div>

                <!-- Card 4: Error Log Status -->
                <div style="background:#0b1120;border:1px solid #1e293b;border-radius:12px;padding:18px;">
                    <div style="color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;">cPanel ডিবাগ ফাইল</div>
                    <div style="font-size:20px;font-weight:800;color:#38bdf8;margin:6px 0;">
                        <?php echo esc_html( $audit['wordpress']['log_file_size'] ); ?>
                    </div>
                    <div style="color:#cbd5e1;font-size:12px;line-height:1.6;">
                        ফাইল পাথ: <code style="font-size:11px;word-break:break-all;">wp-content/hackersshikkhok-debug.log</code><br>
                        মোট রেকর্ড লাইন: <strong><?php echo count( $log_lines ); ?></strong><br>
                        রাইট পারমিশন: <strong><?php echo is_writable( WP_CONTENT_DIR ) ? '✅ অনুমোদিত' : '❌ পারমিশন এরর'; ?></strong>
                    </div>
                </div>
            </div>

            <!-- Detailed Tables & Extensions Split View -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px;">
                
                <!-- 21 Database Tables Health List -->
                <div style="background:#0b1120;border:1px solid #1e293b;border-radius:12px;padding:20px;">
                    <h2 style="color:#ffffff;font-size:16px;font-weight:700;margin:0 0 14px;display:flex;align-items:center;gap:8px;">
                        🗄️ ২১টি কাস্টম ডাটাবেস টেবিল স্কিমা
                    </h2>
                    <div style="max-height:280px;overflow-y:auto;padding-right:8px;">
                        <table style="width:100%;border-collapse:collapse;font-size:12px;color:#cbd5e1;">
                            <thead>
                                <tr style="border-bottom:1px solid #1e293b;color:#94a3b8;text-align:left;">
                                    <th style="padding:6px 0;">টেবিল নাম</th>
                                    <th style="padding:6px 0;text-align:center;">রেকর্ড সংখ্যা</th>
                                    <th style="padding:6px 0;text-align:right;">স্ট্যাটাস</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ( $audit['tables'] as $tbl_name => $tbl_info ) : ?>
                                    <tr style="border-bottom:1px solid rgba(30,41,59,0.5);">
                                        <td style="padding:6px 0;font-family:monospace;color:#f8fafc;"><?php echo esc_html( str_replace( $GLOBALS['wpdb']->prefix, '', $tbl_name ) ); ?></td>
                                        <td style="padding:6px 0;text-align:center;color:#00f5d4;"><?php echo esc_html( number_format( $tbl_info['count'] ) ); ?></td>
                                        <td style="padding:6px 0;text-align:right;">
                                            <?php if ( $tbl_info['exists'] ) : ?>
                                                <span style="color:#10b981;font-weight:700;">● OK</span>
                                            <?php else : ?>
                                                <span style="color:#ef4444;font-weight:700;">● অনুপস্থিত</span>
                                            <?php endif; ?>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- PHP Extensions & Theme File Validator -->
                <div style="background:#0b1120;border:1px solid #1e293b;border-radius:12px;padding:20px;">
                    <h2 style="color:#ffffff;font-size:16px;font-weight:700;margin:0 0 14px;display:flex;align-items:center;gap:8px;">
                        ⚙️ পিএইচপি এক্সটেনশন ও থিম ফাইল অডিট
                    </h2>
                    <div style="margin-bottom:16px;">
                        <div style="color:#94a3b8;font-size:12px;margin-bottom:8px;font-weight:600;">প্রয়োজনীয় PHP এক্সটেনশন:</div>
                        <div style="display:flex;flex-wrap:wrap;gap:8px;">
                            <?php foreach ( $audit['server']['extensions'] as $ext_name => $ext_ok ) : ?>
                                <span style="font-size:11px;font-family:monospace;padding:3px 8px;border-radius:6px;background:<?php echo $ext_ok ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'; ?>;color:<?php echo $ext_ok ? '#10b981' : '#ef4444'; ?>;border:1px solid <?php echo $ext_ok ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'; ?>;">
                                    <?php echo $ext_ok ? '✓' : '✗'; ?> <?php echo esc_html( $ext_name ); ?>
                                </span>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <div>
                        <div style="color:#94a3b8;font-size:12px;margin-bottom:8px;font-weight:600;">থিম কোর ফাইল অডিট:</div>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:12px;">
                            <?php foreach ( $audit['theme']['files'] as $fname => $fok ) : ?>
                                <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(15,23,42,0.6);padding:6px 10px;border-radius:6px;border:1px solid #1e293b;">
                                    <code style="color:#e2e8f0;font-size:11px;"><?php echo esc_html( $fname ); ?></code>
                                    <span style="color:<?php echo $fok ? '#10b981' : '#ef4444'; ?>;font-weight:700;"><?php echo $fok ? '✓' : '✗'; ?></span>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Live Debug & Error Log Console -->
            <div style="background:#050811;border:1px solid #1e293b;border-radius:14px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.5);">
                <div style="background:#0b1120;padding:14px 20px;border-bottom:1px solid #1e293b;display:flex;align-items:center;justify-content:space-between;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <span style="display:inline-block;width:12px;height:12px;background:#ef4444;border-radius:50%;"></span>
                        <span style="display:inline-block;width:12px;height:12px;background:#f59e0b;border-radius:50%;"></span>
                        <span style="display:inline-block;width:12px;height:12px;background:#10b981;border-radius:50%;"></span>
                        <span style="color:#f8fafc;font-weight:700;font-size:14px;margin-left:8px;">📜 লাইভ ডিবাগ ও এরর লগ কনসোল (সর্বশেষ ২০০ লাইন)</span>
                    </div>
                    <span style="color:#94a3b8;font-size:12px;font-family:monospace;">wp-content/hackersshikkhok-debug.log</span>
                </div>
                <div id="hs-log-viewer" style="padding:16px;max-height:420px;overflow-y:auto;background:#030712;font-family:'JetBrains Mono','Fira Code',Consolas,monospace;font-size:12px;line-height:1.7;color:#e2e8f0;">
                    <?php if ( empty( $log_lines ) ) : ?>
                        <div style="color:#64748b;text-align:center;padding:32px 0;">
                            ✨ কোনো ত্রুটি বা এরর লগ রেকর্ড হয়নি! আপনার সিস্টেম ১০০% সুস্থ ও সক্রিয় রয়েছে।
                        </div>
                    <?php else : ?>
                        <?php foreach ( $log_lines as $line ) :
                            $color = '#cbd5e1';
                            if ( str_contains( $line, '[CRITICAL]' ) || str_contains( $line, '[FATAL]' ) || str_contains( $line, '[ERROR]' ) ) {
                                $color = '#ef4444';
                            } elseif ( str_contains( $line, '[WARNING]' ) ) {
                                $color = '#f59e0b';
                            } elseif ( str_contains( $line, '[SUCCESS]' ) ) {
                                $color = '#10b981';
                            }
                        ?>
                            <div style="color:<?php echo esc_attr( $color ); ?>;border-bottom:1px solid rgba(30,41,59,0.3);padding:3px 0;word-break:break-all;">
                                <?php echo esc_html( $line ); ?>
                            </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <script>
        (function() {
            var nonce = '<?php echo esc_js( $nonce ); ?>';
            var ajaxUrl = '<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>';

            function showStatus(msg, isSuccess) {
                var el = document.getElementById('hs-action-status');
                el.style.display = 'block';
                el.style.background = isSuccess ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)';
                el.style.color = isSuccess ? '#10b981' : '#ef4444';
                el.style.border = isSuccess ? '1px solid #10b981' : '1px solid #ef4444';
                el.innerHTML = msg;
            }

            // Repair Database
            document.getElementById('hs-btn-repair-db').addEventListener('click', function() {
                var btn = this;
                btn.disabled = true;
                btn.innerHTML = '⏳ মেরামত হচ্ছে...';
                var fd = new FormData();
                fd.append('action', 'hs_repair_database');
                fd.append('nonce', nonce);

                fetch(ajaxUrl, { method: 'POST', body: fd })
                    .then(function(r) { return r.json(); })
                    .then(function(data) {
                        btn.disabled = false;
                        btn.innerHTML = '🛠️ ডাটাবেস টেবিল মেরামত ও রি-ইন্সটল';
                        if (data.success) {
                            showStatus('✅ ' + data.data.message, true);
                            setTimeout(function() { window.location.reload(); }, 1200);
                        } else {
                            showStatus('❌ ত্রুটি: ' + (data.data.message || 'ব্যর্থ হয়েছে'), false);
                        }
                    })
                    .catch(function(err) {
                        btn.disabled = false;
                        btn.innerHTML = '🛠️ ডাটাবেস টেবিল মেরামত ও রি-ইন্সটল';
                        showStatus('❌ নেটওয়ার্ক ত্রুটি: ' + err.message, false);
                    });
            });

            // Self-Test
            document.getElementById('hs-btn-self-test').addEventListener('click', function() {
                var btn = this;
                btn.disabled = true;
                btn.innerHTML = '⏳ টেস্ট রান হচ্ছে...';
                var fd = new FormData();
                fd.append('action', 'hs_run_system_self_test');
                fd.append('nonce', nonce);

                fetch(ajaxUrl, { method: 'POST', body: fd })
                    .then(function(r) { return r.json(); })
                    .then(function(data) {
                        btn.disabled = false;
                        btn.innerHTML = '⚡ সেলফ-টেস্ট রান করুন';
                        if (data.success) {
                            var r = data.data.results;
                            var report = '✅ <strong>সেলফ-টেস্ট ফলাফল:</strong><br>' +
                                '• ডাটাবেস Read/Write: ' + r.database + '<br>' +
                                '• আপলোড ফোল্ডার: ' + r.upload_writable + '<br>' +
                                '• ডিবাগ লগ রাইটিং: ' + r.log_writable + '<br>' +
                                '• REST API এন্ডপয়েন্ট: ' + r.rest_endpoint + '<br>' +
                                '• কাস্টম পোস্ট টাইপস: ' + r.post_types;
                            showStatus(report, true);
                        } else {
                            showStatus('❌ সেলফ-টেস্টে সমস্যা ধরা পড়েছে।', false);
                        }
                    });
            });

            // Clear Log
            document.getElementById('hs-btn-clear-log').addEventListener('click', function() {
                if (!confirm('আপনি কি নিশ্চিত যে সমস্ত ডিবাগ লগ মুছে ফেলতে চান?')) return;
                var fd = new FormData();
                fd.append('action', 'hs_clear_debug_log');
                fd.append('nonce', nonce);

                fetch(ajaxUrl, { method: 'POST', body: fd })
                    .then(function(r) { return r.json(); })
                    .then(function(data) {
                        if (data.success) {
                            document.getElementById('hs-log-viewer').innerHTML = '<div style="color:#64748b;text-align:center;padding:32px 0;">✨ লগ সফলভাবে খালি করা হয়েছে।</div>';
                            showStatus('✅ ' + data.data.message, true);
                        }
                    });
            });
        })();
        </script>
        <?php
    }
}
