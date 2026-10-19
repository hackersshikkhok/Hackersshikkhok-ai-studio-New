<?php
/**
 * HackersShikkhok Theme — Diagnostics, Error Handler & Core Dependency Monitor
 *
 * Ensures the theme NEVER produces a blank screen or unexplained critical error,
 * and provides clear visual on-screen feedback if dependencies or assets are missing.
 *
 * @package HackersShikkhok\Theme
 */

declare(strict_types=1);

namespace HackersShikkhok\Theme;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class ThemeDiagnostics {

    public static function register(): void {
        add_action( 'admin_notices', array( self::class, 'render_core_dependency_notice' ) );
        
        // Register shutdown error trap for crystal-clear error reporting
        register_shutdown_function( array( self::class, 'capture_and_explain_fatal_errors' ) );
    }

    /**
     * Warn admin if the Core Plugin is not yet active
     */
    public static function render_core_dependency_notice(): void {
        if ( defined( 'HS_CORE_VERSION' ) ) {
            return; // Core plugin is active, everything is great
        }

        if ( ! current_user_can( 'activate_plugins' ) ) {
            return;
        }

        $plugins_url = esc_url( admin_url( 'plugins.php' ) );
        ?>
        <div class="notice notice-warning is-dismissible" style="background:#0b1120; border-left:4px solid #f59e0b; color:#e2e8f0; padding:14px 18px; margin:15px 0; border-radius:8px;">
            <div style="display:flex; align-items:center; gap:12px;">
                <span style="font-size:24px;">⚠️</span>
                <div>
                    <strong style="color:#f59e0b; font-size:14px;">HackersShikkhok   </strong>
                    <p style="margin:4px 0; color:#cbd5e1; font-size:12px;">
                        HackersShikkhok    ।     (LMS), CTF , ,           <strong>HackersShikkhok Core Engine</strong>   ।
                    </p>
                    <a href="<?php echo $plugins_url; ?>" class="button button-primary" style="background:#00f5d4; color:#050811; border:none; font-weight:bold; margin-top:4px;">
                        🔌      
                    </a>
                </div>
            </div>
        </div>
        <?php
    }

    /**
     * Shutdown function to intercept any unhandled PHP fatal error and display readable diagnosis
     */
    public static function capture_and_explain_fatal_errors(): void {
        $error = error_get_last();
        if ( ! $error ) {
            return;
        }

        $fatal_types = array( E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR, E_USER_ERROR );
        if ( ! in_array( $error['type'], $fatal_types, true ) ) {
            return;
        }

        // Only display if headers not sent or in HTML context
        if ( defined( 'DOING_AJAX' ) || defined( 'REST_REQUEST' ) ) {
            return;
        }

        $file = $error['file'] ?? 'Unknown';
        $line = $error['line'] ?? 0;
        $msg  = $error['message'] ?? 'Unknown Error';

        // Filter: only capture if from HackersShikkhok
        if ( false === strpos( $file, 'hackersshikkhok' ) && ! current_user_can( 'manage_options' ) ) {
            return;
        }

        ?>
        <div style="position:fixed; z-index:999999; top:20px; left:20px; right:20px; background:#070d18; border:2px solid #ff3366; color:#f8fafc; padding:24px; border-radius:12px; font-family:ui-monospace,monospace; box-shadow:0 10px 40px rgba(0,0,0,0.8);">
            <div style="display:flex; align-items:center; gap:12px; border-bottom:1px solid #1e293b; padding-bottom:12px; margin-bottom:14px;">
                <span style="font-size:28px;">🛡️</span>
                <div>
                    <h3 style="margin:0; color:#ff3366; font-size:16px;">HackersShikkhok    (Error Intercepted)</h3>
                    <small style="color:#94a3b8;">     ।       :</small>
                </div>
            </div>
            <div style="background:#020617; padding:12px; border-radius:6px; font-size:13px; color:#cbd5e1; border:1px solid #1e293b; overflow-x:auto;">
                <strong>:</strong> <?php echo esc_html( $msg ); ?><br/>
                <strong>:</strong> <?php echo esc_html( $file ); ?><br/>
                <strong> :</strong> <?php echo (int) $line; ?>
            </div>
            <div style="margin-top:14px; font-size:12px; color:#38bdf8;">
                💡 <strong>:</strong>     ,  -      ।               ।
            </div>
        </div>
        <?php
    }
}
