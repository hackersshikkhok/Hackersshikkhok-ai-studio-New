<?php
/**
 * Hackers শিক্ষক — Multilingual XML Sitemap Index & Child Engine
 *
 * Implements Google Search Console compliant sitemap structure:
 * - /sitemap_index.xml (Master index)
 * - /sitemap-bn.xml (Bengali articles, courses & tools)
 * - /sitemap-en.xml (English articles, courses & tools)
 * - /sitemap-tools.xml (Dedicated free developer & security tools)
 * - /sitemap-cve.xml (Curated security advisories & CVE analyses)
 *
 * Excludes drafts, private posts, and non-canonical duplicates.
 *
 * @package HackersShikkhok\Core\SEO
 */

declare(strict_types=1);

namespace HackersShikkhok\Core\SEO;

use HackersShikkhok\Core\Localization\TranslationLedger;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class MultilingualSitemapEngine {

    public static function register(): void {
        add_action( 'init', array( self::class, 'register_sitemap_rewrites' ) );
        add_filter( 'query_vars', array( self::class, 'register_query_vars' ) );
        add_action( 'template_redirect', array( self::class, 'dispatch_sitemap_request' ) );
    }

    public static function register_sitemap_rewrites(): void {
        add_rewrite_rule( '^sitemap_index\.xml$', 'index.php?hs_sitemap=index', 'top' );
        add_rewrite_rule( '^sitemap-([a-z0-9_-]+)\.xml$', 'index.php?hs_sitemap=$matches[1]', 'top' );
    }

    public static function register_query_vars( array $vars ): array {
        $vars[] = 'hs_sitemap';
        return $vars;
    }

    public static function dispatch_sitemap_request(): void {
        $type = get_query_var( 'hs_sitemap' );
        if ( empty( $type ) ) {
            return;
        }

        header( 'Content-Type: application/xml; charset=utf-8' );
        header( 'X-Robots-Tag: noindex, follow' );

        if ( 'index' === $type ) {
            self::render_sitemap_index();
        } elseif ( 'bn' === $type || 'en' === $type ) {
            self::render_language_sitemap( $type );
        } elseif ( 'tools' === $type ) {
            self::render_tools_sitemap();
        } elseif ( 'cve' === $type ) {
            self::render_cve_sitemap();
        } else {
            self::render_generic_sitemap( $type );
        }
        exit;
    }

    private static function render_sitemap_index(): void {
        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        echo '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        
        $sitemaps = array(
            'bn'    => current_time( 'c' ),
            'en'    => current_time( 'c' ),
            'tools' => current_time( 'c' ),
            'cve'   => current_time( 'c' ),
        );

        foreach ( $sitemaps as $slug => $lastmod ) {
            echo "  <sitemap>\n";
            echo '    <loc>' . esc_url( home_url( "/sitemap-{$slug}.xml" ) ) . "</loc>\n";
            echo '    <lastmod>' . esc_html( $lastmod ) . "</lastmod>\n";
            echo "  </sitemap>\n";
        }

        echo '</sitemapindex>';
    }

    private static function render_language_sitemap( string $lang ): void {
        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' . "\n";

        // Query only published, publicly queryable posts
        $args = array(
            'post_type'      => array( 'post', 'tutorials', 'code', 'hs_course', 'cyber' ),
            'post_status'    => 'publish',
            'posts_per_page' => 100,
            'orderby'        => 'modified',
            'order'          => 'DESC',
            'no_found_rows'  => true,
        );

        $query = new \WP_Query( $args );
        if ( $query->have_posts() ) {
            while ( $query->have_posts() ) {
                $query->the_post();
                $post_id   = get_the_ID();
                $permalink = get_permalink();
                $lastmod   = get_the_modified_date( 'c' );

                // Prefix English URLs with /en/ if language is en
                if ( 'en' === $lang ) {
                    $permalink = str_replace( home_url( '/' ), home_url( '/en/' ), $permalink );
                }

                echo "  <url>\n";
                echo '    <loc>' . esc_url( $permalink ) . "</loc>\n";
                echo '    <lastmod>' . esc_html( $lastmod ) . "</lastmod>\n";
                echo "    <changefreq>weekly</changefreq>\n";
                echo "    <priority>0.8</priority>\n";
                echo "  </url>\n";
            }
            wp_reset_postdata();
        }

        echo '</urlset>';
    }

    private static function render_tools_sitemap(): void {
        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        $args = array(
            'post_type'      => 'tools',
            'post_status'    => 'publish',
            'posts_per_page' => 200,
            'orderby'        => 'title',
            'order'          => 'ASC',
            'no_found_rows'  => true,
        );

        $query = new \WP_Query( $args );
        if ( $query->have_posts() ) {
            while ( $query->have_posts() ) {
                $query->the_post();
                echo "  <url>\n";
                echo '    <loc>' . esc_url( get_permalink() ) . "</loc>\n";
                echo '    <lastmod>' . esc_html( get_the_modified_date( 'c' ) ) . "</lastmod>\n";
                echo "    <changefreq>daily</changefreq>\n";
                echo "    <priority>0.9</priority>\n";
                echo "  </url>\n";
            }
            wp_reset_postdata();
        }

        echo '</urlset>';
    }

    private static function render_cve_sitemap(): void {
        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        global $wpdb;
        $table = $wpdb->prefix . 'hs_security_intelligence';
        if ( $wpdb->get_var( "SHOW TABLES LIKE '{$table}'" ) === $table ) {
            $records = $wpdb->get_results(
                "SELECT cve_id, updated_at FROM {$table} WHERE publish_status = 'published' ORDER BY updated_at DESC LIMIT 200",
                ARRAY_A
            );

            foreach ( $records as $row ) {
                echo "  <url>\n";
                echo '    <loc>' . esc_url( home_url( '/cve/' . sanitize_key( $row['cve_id'] ) . '/' ) ) . "</loc>\n";
                echo '    <lastmod>' . esc_html( gmdate( 'c', strtotime( $row['updated_at'] ) ) ) . "</lastmod>\n";
                echo "    <changefreq>weekly</changefreq>\n";
                echo "    <priority>0.7</priority>\n";
                echo "  </url>\n";
            }
        }

        echo '</urlset>';
    }

    private static function render_generic_sitemap( string $slug ): void {
        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        echo "  <url>\n";
        echo '    <loc>' . esc_url( home_url( '/' ) ) . "</loc>\n";
        echo '    <lastmod>' . esc_html( current_time( 'c' ) ) . "</lastmod>\n";
        echo "  </url>\n";
        echo '</urlset>';
    }
}
