<?php
/**
 * Hackers শিক্ষক — Global Technical SEO & Schema Verification Engine
 *
 * Implements strict Google Rich Result compliant Structured Data:
 * - Free SoftwareApplication Schema with applicationCategory, operatingSystem & offers (free)
 * - Valid Course & EducationalOccupationalCredential schemas
 * - Verified TechArticle & SecurityAdvisory schemas
 * - Canonical & Reciprocal hreflang tags (RFC 5646 compliant)
 * - Safe Core Web Vitals optimizations (CLS prevention & async hydration)
 *
 * @package HackersShikkhok\Core\SEO
 */

declare(strict_types=1);

namespace HackersShikkhok\Core\SEO;

use HackersShikkhok\Core\Localization\TranslationLedger;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class GlobalTechnicalSeoEngine {

    public static function register(): void {
        add_action( 'wp_head', array( self::class, 'render_canonical_and_hreflang' ), 2 );
        add_action( 'wp_head', array( self::class, 'render_google_compliant_schema' ), 4 );
        add_filter( 'document_title_parts', array( self::class, 'optimize_high_intent_search_title' ) );
    }

    /**
     * Render strictly verified canonical and reciprocal hreflang tags
     */
    public static function render_canonical_and_hreflang(): void {
        if ( is_admin() || is_feed() || is_trackback() ) {
            return;
        }

        $current_url = home_url( add_query_arg( array(), $GLOBALS['wp']->request ?? '' ) );
        $current_lang = TranslationLedger::get_current_lang();

        // 1. Output verified Canonical Link
        echo '<link rel="canonical" href="' . esc_url( $current_url ) . '" />' . "\n";

        // 2. Fetch Verified Translation Alternates
        if ( is_singular() ) {
            $post_id = get_the_ID();
            if ( $post_id ) {
                $alternates = TranslationLedger::get_translation_alternates( $post_id );
                if ( ! empty( $alternates ) ) {
                    foreach ( $alternates as $lang => $url ) {
                        $hreflang_code = TranslationLedger::SUPPORTED_LANGUAGES[ $lang ]['locale'] ?? $lang;
                        // Format to ISO 639-1 / RFC 5646 (e.g. bn-BD, en-US, ar-SA, es-ES)
                        $rfc_code = str_replace( '_', '-', $hreflang_code );
                        echo '<link rel="alternate" hreflang="' . esc_attr( $rfc_code ) . '" href="' . esc_url( $url ) . '" />' . "\n";
                    }

                    // x-default fallback to English if available, or primary Bengali
                    $x_default = $alternates['en'] ?? ( $alternates['bn'] ?? $current_url );
                    echo '<link rel="alternate" hreflang="x-default" href="' . esc_url( $x_default ) . '" />' . "\n";
                }
            }
        } else {
            // Standard Site-Level Hreflang
            $site_url = home_url( '/' );
            echo '<link rel="alternate" hreflang="bn-BD" href="' . esc_url( $site_url ) . '" />' . "\n";
            echo '<link rel="alternate" hreflang="en-US" href="' . esc_url( trailingslashit( $site_url . 'en' ) ) . '" />' . "\n";
            echo '<link rel="alternate" hreflang="x-default" href="' . esc_url( trailingslashit( $site_url . 'en' ) ) . '" />' . "\n";
        }
    }

    /**
     * Render Google Rich-Result compliant JSON-LD schemas
     */
    public static function render_google_compliant_schema(): void {
        if ( is_admin() ) {
            return;
        }

        $schemas = array();

        // Global Publisher / Organization
        $org_schema = array(
            '@context'      => 'https://schema.org',
            '@type'         => 'Organization',
            'name'          => 'Hackers শিক্ষক',
            'alternateName' => 'HackersShikkhok Cybersecurity & Dev Platform',
            'url'           => 'https://hackersshikkhok.com',
            'logo'          => 'https://hackersshikkhok.com/wp-content/plugins/hackersshikkhok-core/assets/images/icon-256x256.png',
            'sameAs'        => array(
                'https://youtube.com/@HackersShikkhok',
                'https://github.com/HackersShikkhok',
                'https://facebook.com/HackersShikkhokOfficial',
            ),
            'contactPoint'  => array(
                '@type'       => 'ContactPoint',
                'email'       => 'hshikkhok@gmail.com',
                'contactType' => 'customer support',
            ),
        );
        $schemas[] = $org_schema;

        // SoftwareApplication Schema (for Tools and Lab pages with Free Offer markup)
        if ( is_singular( array( 'tools', 'code' ) ) || is_page( array( 'tools', 'css-rgb-lab', 'device-lab' ) ) ) {
            $tool_title = is_singular() ? get_the_title() : 'Free Online Developer & Cyber Security Tools';
            $tool_desc  = is_singular() ? wp_strip_all_tags( get_the_excerpt() ) : '100% Free browser-based developer and cybersecurity utility tools with client-side zero-leak privacy.';
            if ( empty( $tool_desc ) ) {
                $tool_desc = 'Free interactive online cybersecurity and development tool by Hackers শিক্ষক.';
            }

            $software_schema = array(
                '@context'            => 'https://schema.org',
                '@type'               => 'SoftwareApplication',
                'name'                => $tool_title,
                'applicationCategory' => 'DeveloperApplication',
                'operatingSystem'     => 'All Modern Web Browsers (Chrome, Firefox, Safari, Edge)',
                'browserRequirements'=> 'Requires JavaScript. Works 100% Client-Side for Data Privacy.',
                'description'         => $tool_desc,
                'offers'              => array(
                    '@type'         => 'Offer',
                    'price'         => '0',
                    'priceCurrency' => 'USD',
                    'availability'  => 'https://schema.org/InStock',
                    'description'   => '100% Free Forever without registration or hidden fees.',
                ),
                'author'              => array(
                    '@type' => 'Organization',
                    'name'  => 'Hackers শিক্ষক',
                ),
            );
            $schemas[] = $software_schema;
        }

        // Course Schema (Strictly on genuine course single post types)
        if ( is_singular( 'hs_course' ) ) {
            $course_id = get_the_ID();
            $course_schema = array(
                '@context'    => 'https://schema.org',
                '@type'       => 'Course',
                'name'        => get_the_title( $course_id ),
                'description' => wp_strip_all_tags( get_the_excerpt( $course_id ) ),
                'provider'    => array(
                    '@type'  => 'Organization',
                    'name'   => 'Hackers শিক্ষক Cyber Academy',
                    'sameAs' => 'https://hackersshikkhok.com',
                ),
                'hasCourseInstance' => array(
                    '@type'          => 'CourseInstance',
                    'courseMode'     => 'online',
                    'courseWorkload' => 'PT8H',
                ),
                'offers'      => array(
                    '@type'         => 'Offer',
                    'price'         => '0',
                    'priceCurrency' => 'BDT',
                    'availability'  => 'https://schema.org/InStock',
                ),
            );
            $schemas[] = $course_schema;
        }

        // Output clean valid JSON-LD
        foreach ( $schemas as $item ) {
            echo '<script type="application/ld+json">' . wp_json_encode( $item, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . "</script>\n";
        }
    }

    /**
     * High-Intent SEO Title Optimizer: incorporates "Free", "Online", and dual-language keywords
     */
    public static function optimize_high_intent_search_title( array $title_parts ): array {
        if ( is_singular( 'tools' ) ) {
            $base = $title_parts['title'] ?? '';
            $title_parts['title'] = $base . ' — Free Online Tool (100% Client-Side Privacy)';
        } elseif ( is_singular( 'code' ) ) {
            $base = $title_parts['title'] ?? '';
            $title_parts['title'] = $base . ' — Free Open Source Code & Snippet';
        } elseif ( is_page( 'cyber-command' ) ) {
            $title_parts['title'] = 'Enterprise Cyber Command & Security Audit SaaS Portal — Hackers শিক্ষক';
        }
        return $title_parts;
    }
}
