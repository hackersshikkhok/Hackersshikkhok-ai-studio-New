<?php
/**
 * Platform Hub Engine - Multi-Studio App Generator & Interactive Creator Center
 *
 * @package HackersShikkhok\Core\Centers
 */

namespace HackersShikkhok\Core\Centers;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class PlatformHubEngine {

    public static function register(): void {
        add_action( 'init', array( self::class, 'register_post_types_and_taxonomies' ) );
        add_action( 'rest_api_init', array( self::class, 'register_rest_routes' ) );
        add_shortcode( 'hs_platform_center_hub', array( self::class, 'render_platform_hub' ) );
        add_shortcode( 'hs_center_hub', array( self::class, 'render_platform_hub' ) );
    }

    public static function register_post_types_and_taxonomies(): void {
        // CPT: Platform Center
        register_post_type( 'hs_platform_center', array(
            'labels' => array(
                'name'          => __( 'প্ল্যাটফর্ম সেন্টারসমূহ', 'hackersshikkhok' ),
                'singular_name' => __( 'প্ল্যাটফর্ম সেন্টার', 'hackersshikkhok' ),
            ),
            'public'       => true,
            'has_archive'  => true,
            'rewrite'      => array( 'slug' => 'platform-center' ),
            'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
            'show_in_rest' => true,
            'menu_icon'    => 'dashicons-superhero',
        ) );

        // CPT: Generated Apps & Projects
        register_post_type( 'hs_generated_app', array(
            'labels' => array(
                'name'          => __( 'জেনারেটেড অ্যাপস ও টুলস', 'hackersshikkhok' ),
                'singular_name' => __( 'জেনারেটেড অ্যাপ', 'hackersshikkhok' ),
            ),
            'public'       => true,
            'has_archive'  => true,
            'rewrite'      => array( 'slug' => 'app-project' ),
            'supports'     => array( 'title', 'editor', 'custom-fields', 'author' ),
            'show_in_rest' => true,
            'menu_icon'    => 'dashicons-smartphone',
        ) );

        // Taxonomy: Platform Category
        register_taxonomy( 'platform_category', array( 'hs_platform_center', 'hs_generated_app' ), array(
            'labels' => array(
                'name'          => __( 'প্ল্যাটফর্ম ক্যাটাগরি', 'hackersshikkhok' ),
                'singular_name' => __( 'ক্যাটাগরি', 'hackersshikkhok' ),
            ),
            'hierarchical' => true,
            'rewrite'      => array( 'slug' => 'platform-category' ),
            'show_in_rest' => true,
        ) );
    }

    public static function register_rest_routes(): void {
        register_rest_route( 'hackersshikkhok/v1', '/platform-hub/create-app', array(
            'methods'             => 'POST',
            'callback'            => array( self::class, 'handle_create_app' ),
            'permission_callback' => '__return_true',
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/platform-hub/list', array(
            'methods'             => 'GET',
            'callback'            => array( self::class, 'handle_list_studios' ),
            'permission_callback' => '__return_true',
        ) );
    }

    public static function handle_create_app( \WP_REST_Request $request ): \WP_REST_Response {
        $nonce = $request->get_header( 'X-WP-Nonce' );
        if ( ! empty( $nonce ) && ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
            return new \WP_REST_Response( array( 'error' => 'Invalid security token' ), 403 );
        }

        $app_name    = sanitize_text_field( $request->get_param( 'app_name' ) ?? 'Hackers Web App' );
        $app_url     = esc_url_raw( $request->get_param( 'app_url' ) ?? 'https://hackersshikkhok.com' );
        $package_id  = sanitize_text_field( $request->get_param( 'package_id' ) ?? 'com.hackersshikkhok.app' );
        $studio_type = sanitize_text_field( $request->get_param( 'studio_type' ) ?? 'web-to-app' );

        $post_id = wp_insert_post( array(
            'post_title'   => $app_name,
            'post_content' => wp_kses_post( "Generated via HackersShikkhok Platform Hub: {$studio_type} for {$app_url}" ),
            'post_status'  => 'publish',
            'post_type'    => 'hs_generated_app',
        ) );

        if ( is_wp_error( $post_id ) ) {
            return new \WP_REST_Response( array( 'error' => $post_id->get_error_message() ), 500 );
        }

        update_post_meta( $post_id, '_hs_target_url', $app_url );
        update_post_meta( $post_id, '_hs_package_id', $package_id );
        update_post_meta( $post_id, '_hs_studio_type', $studio_type );

        return new \WP_REST_Response( array(
            'success'     => true,
            'post_id'     => $post_id,
            'app_name'    => $app_name,
            'package_id'  => $package_id,
            'download_url'=> home_url( "/app-maker/?export={$post_id}" ),
            'message'     => 'অ্যাপ্লিকেশন মেটাডাটা ও কনফিগারেশন সফলভাবে প্রস্তুত হয়েছে!',
        ), 200 );
    }

    public static function handle_list_studios( \WP_REST_Request $request ): \WP_REST_Response {
        $studios = array(
            array(
                'slug'        => 'web-to-app',
                'title'       => 'ওয়েবসাইট টু অ্যান্ড্রয়েড অ্যাপ মেকার',
                'description' => 'যেকোনো ওয়েবসাইট বা ওয়ার্ডপ্রেস সাইটের URL থেকে সরাসরি প্রোডাকশন-রেডি Java/XML সোর্স কোড ডাউনলোড।',
                'badge'       => 'HOT',
                'color'       => '#00f5d4',
            ),
            array(
                'slug'        => 'link-to-app',
                'title'       => 'লিঙ্ক টু পিডব্লিউএ (PWA) মেকার',
                'description' => 'যেকোনো লিঙ্কের জন্য অফলাইন সার্ভিস ওয়ার্কার এবং ওয়েব ম্যানিফেস্ট জেনারেটর।',
                'badge'       => 'PWA',
                'color'       => '#7c3aed',
            ),
            array(
                'slug'        => 'card-maker',
                'title'       => 'সাইবার কার্ড মেকার',
                'description' => 'ডিজিটাল আইডি ও ভিজিটিং কার্ড লাইভ এসভিজি এডিটর ও ইনস্ট্যান্ট এক্সপোর্ট।',
                'badge'       => 'DESIGN',
                'color'       => '#ff3366',
            ),
            array(
                'slug'        => 'gift-maker',
                'title'       => 'গিফট ও সারপ্রাইজ বক্স মেকার',
                'description' => '৩ডি ইন্টারেক্টিভ আনবক্সিং সারপ্রাইজ গিফট জেনারেটর।',
                'badge'       => 'FUN',
                'color'       => '#f59e0b',
            ),
            array(
                'slug'        => 'game-maker',
                'title'       => 'মিনি গেম স্টুডিও',
                'description' => 'এইচটিএমএল৫ ক্যানভাস সাইবার ডিফেন্ডার মিনি-গেম বিল্ডার।',
                'badge'       => 'GAME',
                'color'       => '#10b981',
            ),
        );

        return new \WP_REST_Response( array(
            'success' => true,
            'studios' => $studios,
        ), 200 );
    }

    public static function render_platform_hub(): string {
        ob_start();
        ?>
        <div id="hackers-platform-hub-root" class="hs-platform-hub-container" style="background:#080e1e; border:1px solid rgba(0,245,212,0.3); border-radius:20px; padding:30px; margin:20px 0;">
            <div style="text-align:center; margin-bottom:25px;">
                <h2 style="font-size:26px; font-weight:900; color:#00f5d4; margin-bottom:8px;">🚀 প্ল্যাটফর্ম ক্রিয়েটর হাব ও ৫-ইন-১ স্টুডিও</h2>
                <p style="color:#94a3b8; font-size:14px;">নিচের স্টুডিও অপশনগুলো থেকে আপনার প্রয়োজনীয় টুলটি নির্বাচন করুন:</p>
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:18px;">
                <div style="background:#0b1120; border:1px solid rgba(0,245,212,0.3); border-radius:14px; padding:20px;">
                    <div style="font-size:26px; margin-bottom:8px;">📱</div>
                    <h4 style="color:#00f5d4; margin-bottom:6px; font-size:16px;">ওয়েবসাইট টু অ্যান্ড্রয়েড অ্যাপ মেকার</h4>
                    <p style="color:#64748b; font-size:12px; margin-bottom:12px;">ওয়েবসাইট URL থেকে সরাসরি অ্যান্ড্রয়েড স্টুডিও জাভা প্রজেক্ট তৈরি করুন।</p>
                    <a href="<?php echo esc_url( home_url('/app-maker/') ); ?>" style="display:inline-block; padding:8px 16px; background:#00f5d4; color:#050811; font-weight:800; border-radius:8px; font-size:12px; text-decoration:none;">অ্যাপ তৈরি করুন</a>
                </div>
                <div style="background:#0b1120; border:1px solid rgba(124,58,237,0.3); border-radius:14px; padding:20px;">
                    <div style="font-size:26px; margin-bottom:8px;">🌐</div>
                    <h4 style="color:#a78bfa; margin-bottom:6px; font-size:16px;">লিঙ্ক টু পিডব্লিউএ (PWA) মেকার</h4>
                    <p style="color:#64748b; font-size:12px; margin-bottom:12px;">সার্ভিস ওয়ার্কার ও অফলাইন ওয়েব অ্যাপ ম্যানিফেস্ট জেনারেটর।</p>
                    <a href="<?php echo esc_url( home_url('/platform-center/?tab=link-to-app') ); ?>" style="display:inline-block; padding:8px 16px; background:#7c3aed; color:#ffffff; font-weight:800; border-radius:8px; font-size:12px; text-decoration:none;">PWA বিল্ড করুন</a>
                </div>
                <div style="background:#0b1120; border:1px solid rgba(255,51,102,0.3); border-radius:14px; padding:20px;">
                    <div style="font-size:26px; margin-bottom:8px;">🎴</div>
                    <h4 style="color:#ff3366; margin-bottom:6px; font-size:16px;">সাইবার কার্ড মেকার</h4>
                    <p style="color:#64748b; font-size:12px; margin-bottom:12px;">ডিজিটাল আইডি ও সাইবার ভিজিটিং কার্ডের লাইভ এসভিজি জেনারেটর।</p>
                    <a href="<?php echo esc_url( home_url('/platform-center/?tab=card-maker') ); ?>" style="display:inline-block; padding:8px 16px; background:#ff3366; color:#ffffff; font-weight:800; border-radius:8px; font-size:12px; text-decoration:none;">কার্ড তৈরি করুন</a>
                </div>
                <div style="background:#0b1120; border:1px solid rgba(245,158,11,0.3); border-radius:14px; padding:20px;">
                    <div style="font-size:26px; margin-bottom:8px;">🎁</div>
                    <h4 style="color:#f59e0b; margin-bottom:6px; font-size:16px;">গিফট ও সারপ্রাইজ বক্স মেকার</h4>
                    <p style="color:#64748b; font-size:12px; margin-bottom:12px;">৩ডি ইন্টারেক্টিভ ভার্চুয়াল সারপ্রাইজ আনবক্সিং গিফট তৈরি করুন।</p>
                    <a href="<?php echo esc_url( home_url('/platform-center/?tab=gift-maker') ); ?>" style="display:inline-block; padding:8px 16px; background:#f59e0b; color:#050811; font-weight:800; border-radius:8px; font-size:12px; text-decoration:none;">গিফট বক্স বানান</a>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}
