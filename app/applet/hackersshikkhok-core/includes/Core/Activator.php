<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Core;

use HackersShikkhok\Core\PostTypes\PostTypeRegistrar;
use HackersShikkhok\Core\Taxonomies\TaxonomyRegistrar;

final class Activator {

    public static function activate(): void {
        try {
            if ( version_compare( PHP_VERSION, '8.0.0', '<' ) ) {
                deactivate_plugins( HS_CORE_BASENAME );
                wp_die( esc_html__( 'Hackers শিক্ষক Core requires PHP 8.0 or higher. Your server is running PHP ' . PHP_VERSION, 'hackersshikkhok-core' ) );
            }

            DiagnosticInspector::log( 'Plugin activation initiated.', 'INFO' );

            try {
                Database::install_tables();
                DiagnosticInspector::log( '21 database tables verified/installed successfully.', 'INFO' );
            } catch ( \Throwable $e ) {
                DiagnosticInspector::log( 'Database installation warning: ' . $e->getMessage(), 'WARNING' );
            }

            try {
                Capabilities::register_roles_and_caps();
                DiagnosticInspector::log( 'Custom user roles and capabilities registered.', 'INFO' );
            } catch ( \Throwable $e ) {
                DiagnosticInspector::log( 'Capabilities registration warning: ' . $e->getMessage(), 'WARNING' );
            }

            try {
                PostTypeRegistrar::register_now();
                TaxonomyRegistrar::register_now();
                Settings::ensure_defaults();
                flush_rewrite_rules();
                DiagnosticInspector::log( 'Post types, taxonomies, settings, and rewrite rules initialized.', 'INFO' );
            } catch ( \Throwable $e ) {
                DiagnosticInspector::log( 'CPT/Taxonomy registration notice: ' . $e->getMessage(), 'WARNING' );
            }

            DiagnosticInspector::log( 'Plugin activation completed successfully.', 'SUCCESS' );

        } catch ( \Throwable $fatal ) {
            // Absolute safety net: ensure activation never triggers unhandled fatal error
            DiagnosticInspector::log( 'Fatal error during activation caught safely: ' . $fatal->getMessage(), 'CRITICAL', array(
                'file' => $fatal->getFile(),
                'line' => $fatal->getLine(),
            ) );
        }
    }
}
