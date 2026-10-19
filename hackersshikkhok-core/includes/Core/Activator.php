<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Core;

use HackersShikkhok\Core\PostTypes\PostTypeRegistrar;
use HackersShikkhok\Core\Taxonomies\TaxonomyRegistrar;

final class Activator {

    public static function activate(): void {
        if ( version_compare( PHP_VERSION, '8.0.0', '<' ) ) {
            deactivate_plugins( HS_CORE_BASENAME );
            wp_die( esc_html__( 'HackersShikkhok Core requires PHP 8.0 or higher. Your server is running PHP ' . PHP_VERSION, 'hackersshikkhok-core' ) );
        }

        try {
            Database::install_tables();
        } catch ( \Throwable $e ) {
            error_log( 'HackersShikkhok DB Install Notice: ' . $e->getMessage() );
        }

        try {
            Capabilities::register_roles_and_caps();
        } catch ( \Throwable $e ) {
            error_log( 'HackersShikkhok Capabilities Notice: ' . $e->getMessage() );
        }

        try {
            PostTypeRegistrar::register_now();
            TaxonomyRegistrar::register_now();
            Settings::ensure_defaults();
            flush_rewrite_rules();
        } catch ( \Throwable $e ) {
            error_log( 'HackersShikkhok Activation Notice: ' . $e->getMessage() );
        }
    }
}