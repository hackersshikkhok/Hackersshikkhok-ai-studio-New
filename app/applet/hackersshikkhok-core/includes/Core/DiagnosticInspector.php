<?php
/**
 * Diagnostic Inspector & Error Log CPanel Engine for HackersShikkhok Core.
 * Automatically catches and logs all system errors, plugin/theme exceptions, and warnings,
 * and displays them in WordPress Admin -> Tools -> HackersShikkhok Debug Logs.
 * 
 * @package HackersShikkhok\Core
 * @since 4.0.0
 */

declare(strict_types=1);

namespace HackersShikkhok\Core;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class DiagnosticInspector {

    private static string $log_option_key = 'hs_system_error_logs';
    private static int $max_logs = 100;

    public static function register(): void {
        // Register error handler and exception handler
        set_error_handler( array( self::class, 'handle_php_error' ) );
        set_exception_handler( array( self::class, 'handle_exception' ) );

        // Register Admin Menu
        if ( is_admin() ) {
            add_action( 'admin_menu', array( self::class, 'register_debug_menu' ) );
            add_action( 'admin_init', array( self::class, 'handle_actions' ) );
        }
    }

    public static function log_system_error( string $context, \Throwable $e ): void {
        $message = sprintf(
            '[%s] Fatal Exception in [%s]: %s in %s:%d',
            current_time( 'mysql' ),
            $context,
            $e->getMessage(),
            $e->getFile(),
            $e->getLine()
        );

        self::write_log_entry( 'ERROR', $message, array(
            'context' => $context,
            'file'    => $e->getFile(),
            'line'    => $e->getLine(),
            'trace'   => $e->getTraceAsString(),
        ) );
    }

    public static function log_message( string $level, string $message, array $meta = array() ): void {
        self::write_log_entry( strtoupper( $level ), $message, $meta );
    }

    private static function write_log_entry( string $level, string $message, array $meta = array() ): void {
        $entry = array(
            'time'    => current_time( 'mysql' ),
            'level'   => $level,
            'message' => $message,
            'meta'    => $meta,
        );

        // 1. Save to WP Option Logs
        $logs = get_option( self::$log_option_key, array() );
        if ( ! is_array( $logs ) ) {
            $logs = array();
        }
        array_unshift( $logs, $entry );
        if ( count( $logs ) > self::$max_logs ) {
            $logs = array_slice( $logs, 0, self::$max_logs );
        }
        update_option( self::$log_option_key, $logs, false );

        // 2. Save to Uploads Debug Log File
        $upload_dir = wp_upload_dir();
        $log_file   = trailingslashit( $upload_dir['basedir'] ) . 'hackersshikkhok-debug.log';
        $log_line   = sprintf( "[%s] [%s] %s %s\n", $entry['time'], $level, $message, ! empty( $meta ) ? json_encode( $meta ) : '' );
        @file_put_contents( $log_file, $log_line, FILE_APPEND );
    }

    public static function handle_php_error( int $errno, string $errstr, string $errfile, int $errline ): bool {
        if ( ! ( error_reporting() & $errno ) ) {
            return false;
        }
        $level_map = array(
            E_ERROR         => 'ERROR',
            E_WARNING       => 'WARNING',
            E_PARSE         => 'PARSE',
            E_NOTICE        => 'NOTICE',
            E_CORE_ERROR    => 'CORE_ERROR',
            E_CORE_WARNING  => 'CORE_WARNING',
            E_COMPILE_ERROR => 'COMPILE_ERROR',
            E_USER_ERROR    => 'USER_ERROR',
            E_USER_WARNING  => 'USER_WARNING',
            E_USER_NOTICE   => 'USER_NOTICE',
            E_STRICT        => 'STRICT',
            E_RECOVERABLE_ERROR => 'RECOVERABLE',
            E_DEPRECATED    => 'DEPRECATED',
        );
        $level = $level_map[$errno] ?? 'UNKNOWN';
        $message = sprintf( '%s in %s on line %d', $errstr, $errfile, $errline );
        self::write_log_entry( $level, $message, array( 'file' => $errfile, 'line' => $errline ) );
        return false; // Let PHP standard handler run as well
    }

    public static function handle_exception( \Throwable $e ): void {
        self::log_system_error( 'UncaughtException', $e );
    }

    public static function register_debug_menu(): void {
        add_submenu_page(
            'tools.php',
            'HackersShikkhok Debug Logs',
            '🛡️ HS Debug & CPanel',
            'manage_options',
            'hs-debug-inspector',
            array( self::class, 'render_admin_page' )
        );
    }

    public static function handle_actions(): void {
        if ( ! isset( $_POST['hs_debug_action'] ) || ! current_user_can( 'manage_options' ) ) {
            return;
        }
        check_admin_referer( 'hs_debug_nonce', 'hs_debug_nonce_field' );

        $action = sanitize_text_field( wp_unslash( $_POST['hs_debug_action'] ) );
        if ( 'clear_logs' === $action ) {
            delete_option( self::$log_option_key );
            $upload_dir = wp_upload_dir();
            $log_file   = trailingslashit( $upload_dir['basedir'] ) . 'hackersshikkhok-debug.log';
            @file_put_contents( $log_file, '' );
            wp_safe_redirect( admin_url( 'tools.php?page=hs-debug-inspector&cleared=1' ) );
            exit;
        }
    }

    public static function render_admin_page(): void {
        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }
        $logs = get_option( self::$log_option_key, array() );
        $upload_dir = wp_upload_dir();
        $log_file   = trailingslashit( $upload_dir['basedir'] ) . 'hackersshikkhok-debug.log';
        $log_content = file_exists( $log_file ) ? file_get_contents( $log_file ) : 'No log file generated yet.';
        ?>
        <div class="wrap" style="color:#e2e8f0;font-family:system-ui,-apple-system,sans-serif;">
            <div style="background:#0b1120;padding:24px;border-radius:12px;border:1px solid rgba(0,245,212,0.3);margin-bottom:24px;">
                <h1 style="color:#fff;margin:0 0 8px;font-size:24px;">🛡️ HackersShikkhok Debug &amp; Error Log Inspector (CPanel)</h1>
                <p style="color:#94a3b8;margin:0;font-size:14px;">
                       ,  एक्    -  ।         ।
                </p>
            </div>

            <?php if ( isset( $_GET['cleared'] ) ) : ?>
                <div class="notice notice-success is-dismissible" style="background:#065f46;color:#fff;padding:12px;border-radius:6px;margin-bottom:20px;">
                    <p style="margin:0;">✅       ।</p>
                </div>
            <?php endif; ?>

            <!-- System Diagnostic Stats -->
            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:16px;margin-bottom:24px;">
                <div style="background:#0b1120;border:1px solid #1e293b;padding:16px;border-radius:10px;">
                    <span style="font-size:12px;color:#94a3b8;display:block;">PHP Version</span>
                    <strong style="font-size:18px;color:#00f5d4;"><?php echo esc_html( PHP_VERSION ); ?></strong>
                </div>
                <div style="background:#0b1120;border:1px solid #1e293b;padding:16px;border-radius:10px;">
                    <span style="font-size:12px;color:#94a3b8;display:block;">WordPress Version</span>
                    <strong style="font-size:18px;color:#10b981;"><?php echo esc_html( get_bloginfo( 'version' ) ); ?></strong>
                </div>
                <div style="background:#0b1120;border:1px solid #1e293b;padding:16px;border-radius:10px;">
                    <span style="font-size:12px;color:#94a3b8;display:block;">Memory Limit</span>
                    <strong style="font-size:18px;color:#f59e0b;"><?php echo esc_html( ini_get( 'memory_limit' ) ); ?></strong>
                </div>
                <div style="background:#0b1120;border:1px solid #1e293b;padding:16px;border-radius:10px;">
                    <span style="font-size:12px;color:#94a3b8;display:block;">Logged Errors Count</span>
                    <strong style="font-size:18px;color:#f43f5e;"><?php echo count( is_array( $logs ) ? $logs : array() ); ?></strong>
                </div>
            </div>

            <!-- Actions Bar -->
            <div style="background:#0b1120;border:1px solid #1e293b;padding:16px;border-radius:10px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:13px;color:#cbd5e1;">Log File Path: <code><?php echo esc_html( $log_file ); ?></code></span>
                <form method="post" style="margin:0;">
                    <?php wp_nonce_field( 'hs_debug_nonce', 'hs_debug_nonce_field' ); ?>
                    <input type="hidden" name="hs_debug_action" value="clear_logs" />
                    <button type="submit" class="button button-primary" style="background:#f43f5e;border-color:#e11d48;color:#fff;" onclick="return confirm('    ?');">
                        🗑️    
                    </button>
                </form>
            </div>

            <!-- Recent Log Entries Table -->
            <div style="background:#0b1120;border:1px solid #1e293b;border-radius:12px;overflow:hidden;margin-bottom:24px;">
                <div style="padding:16px;background:#0f172a;border-bottom:1px solid #1e293b;">
                    <strong style="color:#fff;font-size:16px;">📋     (Recent Database Log Events)</strong>
                </div>
                <?php if ( empty( $logs ) ) : ?>
                    <div style="padding:32px;text-align:center;color:#64748b;">
                        🎉     ।      !
                    </div>
                <?php else : ?>
                    <table class="wp-list-table widefat fixed striped" style="background:#0b1120;color:#e2e8f0;border:none;">
                        <thead>
                            <tr style="background:#050811;color:#00f5d4;">
                                <th style="width:160px;padding:12px;"> (Time)</th>
                                <th style="width:100px;padding:12px;"> (Level)</th>
                                <th style="padding:12px;">   (Message &amp; Meta)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ( $logs as $log ) : ?>
                                <tr style="border-bottom:1px solid #1e293b;">
                                    <td style="padding:12px;font-family:monospace;font-size:12px;color:#94a3b8;"><?php echo esc_html( $log['time'] ?? '' ); ?></td>
                                    <td style="padding:12px;">
                                        <span style="font-size:11px;font-weight:700;padding:2px 6px;border-radius:4px;background:<?php echo ( 'ERROR' === ( $log['level'] ?? '' ) ) ? 'rgba(244,63,94,0.2)' : 'rgba(245,158,11,0.2)'; ?>;color:<?php echo ( 'ERROR' === ( $log['level'] ?? '' ) ) ? '#f43f5e' : '#f59e0b'; ?>;">
                                            <?php echo esc_html( $log['level'] ?? 'INFO' ); ?>
                                        </span>
                                    </td>
                                    <td style="padding:12px;font-family:monospace;font-size:12px;color:#cbd5e1;">
                                        <?php echo esc_html( $log['message'] ?? '' ); ?>
                                        <?php if ( ! empty( $log['meta'] ) ) : ?>
                                            <details style="margin-top:6px;color:#94a3b8;cursor:pointer;">
                                                <summary>  (Stack Trace &amp; Meta)</summary>
                                                <pre style="background:#020617;color:#a78bfa;padding:8px;border-radius:4px;margin-top:4px;overflow-x:auto;"><?php echo esc_html( print_r( $log['meta'], true ) ); ?></pre>
                                            </details>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php endif; ?>
            </div>

            <!-- Raw Log File Box -->
            <div style="background:#0b1120;border:1px solid #1e293b;border-radius:12px;padding:20px;">
                <h3 style="color:#fff;margin-top:0;">📄    Raw  (`hackersshikkhok-debug.log`)</h3>
                <textarea readonly style="width:100%;height:220px;background:#050811;color:#00f5d4;border:1px solid #1e293b;border-radius:8px;font-family:monospace;font-size:12px;padding:12px;"><?php echo esc_textarea( $log_content ); ?></textarea>
            </div>
        </div>
        <?php
    }
}
