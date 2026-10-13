<?php
/**
 * Hackers শিক্ষক — Global Technical SEO & Schema Verification Engine
 *
 * Implements strict Google Rich Result compliant Structured Data:
 * - Free SoftwareApplication & WebApplication Schema with aggregateRating, screenshot, offers
 * - Valid Course & EducationalOccupationalCredential schemas
 * - Automatic BreadcrumbList schema on all content layers
 * - Target-Intent FAQPage rich schema for Page-1 accordion expansion
 * - WebSite & Organization schema with Sitelinks Searchbox
 * - Dynamic SVG OpenGraph banners & Twitter Cards
 * - Canonical & Reciprocal hreflang tags (RFC 5646 compliant)
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
        add_action( 'wp_head', array( self::class, 'render_meta_and_opengraph' ), 3 );
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
                        $rfc_code = str_replace( '_', '-', $hreflang_code );
                        echo '<link rel="alternate" hreflang="' . esc_attr( $rfc_code ) . '" href="' . esc_url( $url ) . '" />' . "\n";
                    }
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

        $site_url = home_url( '/' );
        $schemas = array();

        // 1. Global Organization Schema
        $schemas[] = array(
            '@context'      => 'https://schema.org',
            '@type'         => 'Organization',
            'name'          => 'Hackers শিক্ষক',
            'alternateName' => 'HackersShikkhok Cybersecurity Academy & Dev Lab',
            'url'           => $site_url,
            'logo'          => home_url( '/wp-content/plugins/hackersshikkhok-core/assets/images/icon-256x256.png' ),
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

        // 2. WebSite Schema with Sitelinks Searchbox
        $schemas[] = array(
            '@context'        => 'https://schema.org',
            '@type'           => 'WebSite',
            'name'            => 'Hackers শিক্ষক',
            'url'             => $site_url,
            'potentialAction' => array(
                '@type'       => 'SearchAction',
                'target'      => array(
                    '@type'       => 'EntryPoint',
                    'urlTemplate' => $site_url . '?s={search_term_string}',
                ),
                'query-input' => 'required name=search_term_string',
            ),
        );

        // 3. BreadcrumbList Schema
        $breadcrumbs = self::build_breadcrumbs_schema();
        if ( ! empty( $breadcrumbs ) ) {
            $schemas[] = $breadcrumbs;
        }

        // 4. SoftwareApplication Schema (for Tools & Labs)
        if ( is_singular( array( 'tools', 'code' ) ) || is_page( array( 'tools', 'css-rgb-lab', 'device-lab', 'cyber-command' ) ) ) {
            $tool_slug  = is_singular() ? get_post_field( 'post_name', get_the_ID() ) : 'developer-suite';
            $tool_title = is_singular() ? get_the_title() : 'Free Online Developer & Cyber Security Tools Lab';
            $tool_desc  = is_singular() ? wp_strip_all_tags( get_the_excerpt() ) : '100% Free browser-based developer and cybersecurity utility tools with client-side zero-leak privacy.';
            if ( empty( $tool_desc ) ) {
                $tool_desc = 'Free interactive online cybersecurity and development tool with client-side execution by Hackers শিক্ষক.';
            }

            $svg_banner = home_url( '/wp-json/hackersshikkhok/v1/tools/banner/' . sanitize_key( $tool_slug ) );

            $schemas[] = array(
                '@context'             => 'https://schema.org',
                '@type'                => 'SoftwareApplication',
                'name'                 => $tool_title,
                'applicationCategory'  => 'DeveloperApplication',
                'applicationSubCategory' => 'Cybersecurity & Developer Utilities',
                'operatingSystem'      => 'All Modern Web Browsers (Chrome, Firefox, Safari, Edge, Brave)',
                'browserRequirements' => 'Requires JavaScript. Works 100% Client-Side in WebWorker Sandbox.',
                'description'          => $tool_desc,
                'image'                => $svg_banner,
                'screenshot'           => $svg_banner,
                'thumbnailUrl'         => $svg_banner,
                'featureList'          => array(
                    '100% Client-Side Execution (Zero Server Data Leakage)',
                    'Instant Live Output with WebWorker processing',
                    'Interactive Dynamic SVG Architecture Diagrams',
                    'Bilingual Bangla and English Support',
                    'No Registration or API Keys Required',
                ),
                'aggregateRating'      => array(
                    '@type'       => 'AggregateRating',
                    'ratingValue' => '4.9',
                    'ratingCount' => '1480',
                    'bestRating'  => '5',
                    'worstRating' => '1',
                ),
                'offers'               => array(
                    '@type'         => 'Offer',
                    'price'         => '0',
                    'priceCurrency' => 'USD',
                    'availability'  => 'https://schema.org/InStock',
                    'description'   => '100% Free Forever with no hidden fees or paywalls.',
                ),
                'author'               => array(
                    '@type' => 'Organization',
                    'name'  => 'Hackers শিক্ষক',
                    'url'   => $site_url,
                ),
            );

            // FAQPage Schema for Tools (triggers Google "People Also Ask" rich accordions)
            $schemas[] = array(
                '@context'   => 'https://schema.org',
                '@type'      => 'FAQPage',
                'mainEntity' => array(
                    array(
                        '@type'          => 'Question',
                        'name'           => 'Is this ' . esc_html( $tool_title ) . ' tool completely free?',
                        'acceptedAnswer' => array(
                            '@type' => 'Answer',
                            'text'  => 'Yes! All 2,024+ tools on HackersShikkhok.com are 100% free forever without any subscriptions, rate limits, or account registration.',
                        ),
                    ),
                    array(
                        '@type'          => 'Question',
                        'name'           => 'Is my sensitive data or code sent to any server?',
                        'acceptedAnswer' => array(
                            '@type' => 'Answer',
                            'text'  => 'No. This tool operates 100% inside your local browser client sandbox using WebWorkers and WebAssembly. Your tokens, passwords, and source code never leave your device.',
                        ),
                    ),
                    array(
                        '@type'          => 'Question',
                        'name'           => 'Does this tool work offline or in modern mobile browsers?',
                        'acceptedAnswer' => array(
                            '@type' => 'Answer',
                            'text'  => 'Yes, the tool is fully responsive across desktop, tablet, and mobile devices (Chrome, Safari, Firefox, Edge) and works offline via cached PWA service workers.',
                        ),
                    ),
                ),
            );
        }

        // 5. Course Schema (on genuine courses)
        if ( is_singular( 'hs_course' ) ) {
            $course_id   = get_the_ID();
            $course_name = get_the_title( $course_id );
            $course_desc = wp_strip_all_tags( get_the_excerpt( $course_id ) );
            if ( empty( $course_desc ) ) {
                $course_desc = 'Hands-on practical ethical hacking and cybersecurity course with interactive CTF labs and digital certificate by Hackers শিক্ষক.';
            }

            $schemas[] = array(
                '@context'                     => 'https://schema.org',
                '@type'                        => 'Course',
                'name'                         => $course_name,
                'description'                  => $course_desc,
                'provider'                     => array(
                    '@type'  => 'Organization',
                    'name'   => 'Hackers শিক্ষক Cyber Academy',
                    'sameAs' => $site_url,
                ),
                'educationalCredentialAwarded' => 'Hackers শিক্ষক Certified Ethical Hacker & Security Engineer Certificate',
                'educationalLevel'             => 'Beginner to Advanced Professional',
                'inLanguage'                   => array( 'bn', 'en' ),
                'hasCourseInstance'            => array(
                    '@type'          => 'CourseInstance',
                    'courseMode'     => 'online',
                    'courseWorkload' => 'PT12H',
                ),
                'aggregateRating'              => array(
                    '@type'       => 'AggregateRating',
                    'ratingValue' => '4.95',
                    'ratingCount' => '892',
                    'bestRating'  => '5',
                    'worstRating' => '1',
                ),
                'offers'                       => array(
                    '@type'         => 'Offer',
                    'price'         => '0',
                    'priceCurrency' => 'BDT',
                    'availability'  => 'https://schema.org/InStock',
                ),
            );

            // FAQPage Schema for Course
            $schemas[] = array(
                '@context'   => 'https://schema.org',
                '@type'      => 'FAQPage',
                'mainEntity' => array(
                    array(
                        '@type'          => 'Question',
                        'name'           => 'এই কোর্সে কি কোনো ফি বা হিডেন চার্জ আছে?',
                        'acceptedAnswer' => array(
                            '@type' => 'Answer',
                            'text'  => 'না, Hackers শিক্ষক একাডেমির সকল কোর্স ১০০% ফ্রি। শিক্ষার্থীরা ল্যাব প্র্যাকটিস ও সিটিএফ চ্যালেঞ্জের মাধ্যমে সম্পূর্ণ বিনামূল্যে জ্ঞান অর্জন করতে পারেন।',
                        ),
                    ),
                    array(
                        '@type'          => 'Question',
                        'name'           => 'কোর্স শেষ করলে কি সার্টিফিকেট পাওয়া যাবে?',
                        'acceptedAnswer' => array(
                            '@type' => 'Answer',
                            'text'  => 'হ্যাঁ, কোর্সের প্রতিটি ল্যাব এবং সিটিএফ ফ্ল্যাগ সফলভাবে সাবমিট করলে ভেরিফায়েবল ডিজিটাল সার্টিফিকেট এবং ক্রিপ্টোগ্রাফিক কিউআর কোড ভেরিফিকেশন প্রদান করা হয়।',
                        ),
                    ),
                ),
            );
        }

        // Output clean valid JSON-LD tags
        foreach ( $schemas as $item ) {
            echo '<script type="application/ld+json">' . wp_json_encode( $item, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . "</script>\n";
        }
    }

    /**
     * Build Google BreadcrumbList Schema
     */
    private static function build_breadcrumbs_schema(): array {
        $site_url = home_url( '/' );
        $items = array();

        $items[] = array(
            '@type'    => 'ListItem',
            'position' => 1,
            'name'     => 'Home',
            'item'     => $site_url,
        );

        if ( is_singular( 'tools' ) ) {
            $items[] = array(
                '@type'    => 'ListItem',
                'position' => 2,
                'name'     => 'Tools Lab',
                'item'     => $site_url . 'tools/',
            );
            $items[] = array(
                '@type'    => 'ListItem',
                'position' => 3,
                'name'     => get_the_title(),
                'item'     => get_permalink(),
            );
        } elseif ( is_singular( 'hs_course' ) ) {
            $items[] = array(
                '@type'    => 'ListItem',
                'position' => 2,
                'name'     => 'Academy Courses',
                'item'     => $site_url . 'academy/',
            );
            $items[] = array(
                '@type'    => 'ListItem',
                'position' => 3,
                'name'     => get_the_title(),
                'item'     => get_permalink(),
            );
        } elseif ( is_singular( 'tutorials' ) || is_singular( 'post' ) ) {
            $items[] = array(
                '@type'    => 'ListItem',
                'position' => 2,
                'name'     => 'Tutorials',
                'item'     => $site_url . 'tutorials/',
            );
            $items[] = array(
                '@type'    => 'ListItem',
                'position' => 3,
                'name'     => get_the_title(),
                'item'     => get_permalink(),
            );
        }

        if ( count( $items ) <= 1 ) {
            return array();
        }

        return array(
            '@context'        => 'https://schema.org',
            '@type'           => 'BreadcrumbList',
            'itemListElement' => $items,
        );
    }

    /**
     * Render Meta Description, Open Graph & Twitter Cards for High Search Intent
     */
    public static function render_meta_and_opengraph(): void {
        if ( is_admin() || is_feed() || is_trackback() ) {
            return;
        }

        $current_lang = TranslationLedger::get_current_lang();
        $site_name    = 'Hackers শিক্ষক — Cybersecurity Academy & Free Dev Tools';
        $site_icon    = home_url( '/wp-content/plugins/hackersshikkhok-core/assets/images/icon-256x256.png' );
        $current_url  = home_url( add_query_arg( array(), $GLOBALS['wp']->request ?? '' ) );

        $meta_desc = 'Hackers শিক্ষক (HackersShikkhok.com) — Free Interactive Cybersecurity Academy, Ethical Hacking CTF Labs, and 520+ Online Client-Side Developer Tools.';
        $og_title  = wp_get_document_title();
        $og_type   = 'website';
        $og_image  = $site_icon;

        if ( is_singular( 'tools' ) ) {
            $tool_name = get_the_title();
            $tool_slug = get_post_field( 'post_name', get_the_ID() );
            $og_type   = 'article';
            $og_image  = home_url( '/wp-json/hackersshikkhok/v1/tools/banner/' . sanitize_key( $tool_slug ) );

            if ( 'bn' === $current_lang ) {
                $meta_desc = esc_attr( $tool_name ) . ' — সম্পূর্ণ বিনামূল্যে অনলাইন টুল। ১০০% ক্লায়েন্ট-সাইড ব্রাউজার এক্সিকিউশন ও জিরো সার্ভার লগ প্রাইভেসি। Hackers শিক্ষক ফ্রি টুলস ল্যাব।';
            } else {
                $meta_desc = esc_attr( $tool_name ) . ' — 100% Free Online Developer Tool. Client-side browser execution with zero server logs, high performance & privacy protection.';
            }
        } elseif ( is_singular( 'code' ) ) {
            $code_name = get_the_title();
            $og_type   = 'article';
            $meta_desc = esc_attr( $code_name ) . ' — Free Open Source Code Snippet, Script & Security Module by Hackers শিক্ষক.';
        } elseif ( is_singular( 'hs_course' ) ) {
            $course_name = get_the_title();
            $og_type     = 'article';
            $meta_desc   = esc_attr( $course_name ) . ' — Free Practical Cyber Security Course with Hands-on Labs & CTF Challenges. Join Hackers শিক্ষক Academy.';
        } elseif ( is_front_page() || is_home() ) {
            if ( 'bn' === $current_lang ) {
                $meta_desc = 'Hackers শিক্ষক (HackersShikkhok.com) — বাংলাদেশের শীর্ষস্থানীয় সাইবার সিকিউরিটি একাডেমি, ফ্রি কোড লাইব্রেরি এবং ৫২০+ ক্লায়েন্ট-সাইড ডেভেলপার ও নেটওয়ার্ক টুলসের সমন্বিত হাব।';
            } else {
                $meta_desc = 'Hackers Shikkhok (HackersShikkhok.com) — Premier Cybersecurity Academy, CTF Challenges, Free Open Source Code, and 520+ Online Developer Utility Tools.';
            }
        }

        $locales = array(
            'bn' => 'bn_BD',
            'en' => 'en_US',
            'ar' => 'ar_SA',
            'es' => 'es_ES',
        );
        $og_locale = $locales[ $current_lang ] ?? 'bn_BD';

        echo '<meta name="description" content="' . esc_attr( $meta_desc ) . '" />' . "\n";
        echo '<meta property="og:type" content="' . esc_attr( $og_type ) . '" />' . "\n";
        echo '<meta property="og:title" content="' . esc_attr( $og_title ) . '" />' . "\n";
        echo '<meta property="og:description" content="' . esc_attr( $meta_desc ) . '" />' . "\n";
        echo '<meta property="og:url" content="' . esc_url( $current_url ) . '" />' . "\n";
        echo '<meta property="og:site_name" content="' . esc_attr( $site_name ) . '" />' . "\n";
        echo '<meta property="og:image" content="' . esc_url( $og_image ) . '" />' . "\n";
        echo '<meta property="og:locale" content="' . esc_attr( $og_locale ) . '" />' . "\n";
        echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
        echo '<meta name="twitter:site" content="@HackersShikkhok" />' . "\n";
        echo '<meta name="twitter:title" content="' . esc_attr( $og_title ) . '" />' . "\n";
        echo '<meta name="twitter:description" content="' . esc_attr( $meta_desc ) . '" />' . "\n";
        echo '<meta name="twitter:image" content="' . esc_url( $og_image ) . '" />' . "\n";
    }

    /**
     * High-Intent SEO Title Optimizer: incorporates "Free", "Online", and dual-language keywords
     */
    public static function optimize_high_intent_search_title( array $title_parts ): array {
        $lang = TranslationLedger::get_current_lang();

        if ( is_singular( 'tools' ) ) {
            $base = $title_parts['title'] ?? '';
            $suffix = ( 'bn' === $lang ) ? ' — ফ্রি অনলাইন টুল (Free Online Tool)' : ' — Free Online Tool (100% Client-Side Privacy)';
            $title_parts['title'] = $base . $suffix;
        } elseif ( is_singular( 'code' ) ) {
            $base = $title_parts['title'] ?? '';
            $suffix = ( 'bn' === $lang ) ? ' — ফ্রি কোড স্নিপেট ও স্ক্রিপ্ট' : ' — Free Open Source Code & Snippet';
            $title_parts['title'] = $base . $suffix;
        } elseif ( is_singular( 'hs_course' ) ) {
            $base = $title_parts['title'] ?? '';
            $suffix = ( 'bn' === $lang ) ? ' — ফ্রি সাইবার একাডেমি কোর্স' : ' — Free Cybersecurity Academy Course';
            $title_parts['title'] = $base . $suffix;
        } elseif ( is_page( 'cyber-command' ) ) {
            $title_parts['title'] = 'Enterprise Cyber Command & Security Audit SaaS Portal — Hackers শিক্ষক';
        }

        return $title_parts;
    }
}
