<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Dashboard;

use HackersShikkhok\Core\Core\Settings;
use HackersShikkhok\Core\Core\SystemHealth;
use HackersShikkhok\Core\AI\BotEcosystem;
use HackersShikkhok\Core\AI\ApiRotationManager;
use HackersShikkhok\Core\AI\AutopilotRegistry;

final class ControlCenter {
    public static function register(): void {
        add_action( 'admin_menu', array( self::class, 'register_menus' ), 5 );
    }

    public static function register_menus(): void {
        add_menu_page(
            __( 'Hackers শিক্ষক Control Center', 'hackersshikkhok-core' ),
            __( 'Hackers শিক্ষক', 'hackersshikkhok-core' ),
            'manage_options',
            'hs-control-center',
            array( self::class, 'render_dashboard' ),
            'dashicons-shield-alt',
            3
        );

        add_submenu_page(
            'hs-control-center',
            __( 'অটো পাইলট ও ৮টি অটোনমাস বট সেন্টার', 'hackersshikkhok-core' ),
            __( '🤖 অটো পাইলট ও বট সেন্টার', 'hackersshikkhok-core' ),
            'manage_options',
            'hs-autopilot-bots',
            array( self::class, 'render_autopilot_bots_screen' )
        );

        add_submenu_page(
            'hs-control-center',
            __( 'AI API Key রোটেশন ও মডেল ফেইলওভার', 'hackersshikkhok-core' ),
            __( '🔑 API রোটেশন ও কোটা গার্ড', 'hackersshikkhok-core' ),
            'manage_options',
            'hs-api-rotator',
            array( self::class, 'render_api_rotator_screen' )
        );
    }

    public static function render_dashboard(): void {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( esc_html__( 'Unauthorized access.', 'hackersshikkhok-core' ) );
        }
        $switches   = Settings::get_master_switches();
        $banner_url = esc_url( HS_CORE_URL . 'assets/images/banner-772x250.png' );
        ?>
        <div class="wrap hs-admin-wrap" style="max-width:1200px;">
            <div style="background:#0b1120;color:#e2e8f0;padding:24px;border-radius:14px;border:1px solid #00f5d4;margin-bottom:20px;">
                <img src="<?php echo $banner_url; ?>" alt="Hackers শিক্ষক Banner" style="max-width:100%;height:auto;border-radius:10px;margin-bottom:14px;display:block;" onerror="this.style.display='none'" />
                <h1 style="color:#ffffff;margin:0 0 8px;"><?php echo esc_html__( 'Hackers শিক্ষক Master Control Center (v4.0.0)', 'hackersshikkhok-core' ); ?></h1>
                <p style="color:#94a3b8;margin:0 0 10px;"><?php echo esc_html__( 'Developed by Hackers শিক্ষক — Official Website & Download: https://hackersshikkhok.com', 'hackersshikkhok-core' ); ?></p>
                <p style="color:#00f5d4;margin:0;font-family:monospace;">২৮টি প্ল্যাটফর্ম সেন্টার · ২৪টি AI অটো-পাইলট · ৮টি অটোনমাস প্রো বট · API কি রোটেশন ও কোটা ফেইলওভার</p>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:16px;">
                <a href="<?php echo esc_url( admin_url( 'admin.php?page=hs-autopilot-bots' ) ); ?>" style="text-decoration:none;">
                    <div style="background:#0b1120;border:1px solid #00f5d4;border-radius:12px;padding:18px;color:#fff;transition:0.2s;">
                        <span style="font-size:24px;">🤖</span>
                        <h3 style="color:#00f5d4;margin:6px 0;">২৪টি অটো-পাইলট ও ৮টি বট</h3>
                        <p style="font-size:12px;color:#94a3b8;margin:0;">সাইবার ডিফেন্ডার, কনটেন্ট ক্রাফটার, গুগল র‍্যাঙ্কার ও অ্যাডসেন্স গার্ড বট পরিচালনা করুন।</p>
                    </div>
                </a>

                <a href="<?php echo esc_url( admin_url( 'admin.php?page=hs-api-rotator' ) ); ?>" style="text-decoration:none;">
                    <div style="background:#0b1120;border:1px solid #10b981;border-radius:12px;padding:18px;color:#fff;transition:0.2s;">
                        <span style="font-size:24px;">🔑</span>
                        <h3 style="color:#10b981;margin:6px 0;">API কি রোটেশন ও কোটা গার্ড</h3>
                        <p style="font-size:12px;color:#94a3b8;margin:0;">Gemini 2.5, Claude, GPT-4o মাল্টি-কি রোটেশন, 429 অটো-কুলডাউন ও মডেল ফেইলওভার।</p>
                    </div>
                </a>
            </div>

            <h3 style="color:#fff;margin:24px 0 12px;">মাস্টার সিস্টেম ফিচার সুইচ (Features Toggles)</h3>
            <div class="hs-admin-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:10px;">
                <?php foreach ( $switches as $key => $enabled ) : ?>
                    <div class="hs-switch-card" style="background:#0b1120;color:#fff;padding:12px 16px;border-radius:10px;border:1px solid #1e293b;display:flex;justify-content:space-between;align-items:center;">
                        <strong style="font-size:12px;"><?php echo esc_html( strtoupper( str_replace( '_', ' ', $key ) ) ); ?></strong>
                        <span style="color:<?php echo $enabled ? '#00f5d4' : '#f43f5e'; ?>;font-weight:700;font-size:12px;padding:2px 8px;border-radius:6px;background:rgba(0,245,212,0.1);"><?php echo $enabled ? 'ACTIVE' : 'OFF'; ?></span>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
    }

    /**
     * Render Autopilot and Autonomous Bots Management Screen
     */
    public static function render_autopilot_bots_screen(): void {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( esc_html__( 'Unauthorized access.', 'hackersshikkhok-core' ) );
        }
        $bots = BotEcosystem::get_all_bots();
        $autopilots = AutopilotRegistry::get_all_units();
        $logs = BotEcosystem::get_logs();
        ?>
        <div class="wrap hs-admin-wrap" style="max-width:1200px;color:#e2e8f0;">
            <div style="background:#0b1120;padding:20px;border-radius:12px;border:1px solid #00f5d4;margin-bottom:20px;">
                <h1 style="color:#fff;margin:0 0 6px;">🤖 ৮টি অটোনমাস প্রো বট ও ২৪টি AI অটো-পাইলট পাইপলাইন</h1>
                <p style="color:#94a3b8;font-size:13px;margin:0;">
                    অ্যাডমিনের কোনো শারীরিক শ্রম ছাড়াই ওয়েবসাইট সম্পূর্ণ স্বয়ংক্রিয়ভাবে চালানো, সিকিউরিটি গার্ড, গুগল র‍্যাঙ্কিং, অ্যাডসেন্স পলিসি মনিটরিং এবং কনটেন্ট জেনারেশনের স্বয়ংক্রিয় কমান্ড সেন্টার।
                </p>
            </div>

            <!-- SECTION 1: 8 AUTONOMOUS BOTS -->
            <h2 style="color:#00f5d4;margin-bottom:12px;">🛡️ ৮টি মাস্টার অটোনমাস বট (Autonomous Background Daemons)</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:16px;margin-bottom:30px;">
                <?php foreach ( $bots as $bot ) : ?>
                    <div style="background:#0b1120;border:1px solid #1e293b;border-radius:12px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;">
                        <div>
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                                <strong style="color:#00f5d4;font-size:14px;"><?php echo esc_html( $bot['nameBn'] ); ?></strong>
                                <span style="font-size:10px;padding:2px 6px;border-radius:4px;background:#10b981/20;color:#10b981;font-weight:700;">● <?php echo esc_html( $bot['status'] ); ?></span>
                            </div>
                            <span style="font-size:11px;color:#64748b;font-family:monospace;display:block;margin-bottom:6px;">⏱️ শিডিউল: <?php echo esc_html( $bot['frequency'] ); ?></span>
                            <p style="font-size:12px;color:#cbd5e1;line-height:1.5;margin:0 0 10px;"><?php echo esc_html( $bot['role'] ); ?></p>
                        </div>
                        <div style="border-top:1px solid #1e293b;padding-top:10px;display:flex;justify-content:space-between;align-items:center;font-size:11px;font-family:monospace;">
                            <span style="color:#94a3b8;">প্রসেসড: <strong style="color:#fff;"><?php echo number_format( (int) $bot['itemsProcessed'] ); ?></strong></span>
                            <span style="color:#00f5d4;">লাস্ট রান: <?php echo esc_html( $bot['lastRun'] ); ?></span>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <!-- SECTION 2: 24 AUTOPILOTS TABLE -->
            <h2 style="color:#10b981;margin-bottom:12px;">⚡ ২৪টি AI অটো-পাইলট ও কন্টেন্ট পাইপলাইন</h2>
            <div style="background:#0b1120;border:1px solid #1e293b;border-radius:12px;overflow:hidden;margin-bottom:30px;">
                <table style="width:100%;border-collapse:collapse;font-size:12px;text-align:left;">
                    <thead>
                        <tr style="background:#050811;color:#00f5d4;border-bottom:1px solid #1e293b;">
                            <th style="padding:10px 14px;">ID / নাম</th>
                            <th style="padding:10px 14px;">প্ল্যাটফর্ম সেন্টার</th>
                            <th style="padding:10px 14px;">পাবলিশিং মোড</th>
                            <th style="padding:10px 14px;">মিনিমাম স্কোর</th>
                            <th style="padding:10px 14px;">দৈনিক লিমিট</th>
                            <th style="padding:10px 14px;">কি তৈরি ও পাবলিশ করে</th>
                            <th style="padding:10px 14px;">গুগল অ্যালগরিদম সিঙ্ক</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ( $autopilots as $ap ) : ?>
                            <tr style="border-bottom:1px solid #1e293b;color:#cbd5e1;">
                                <td style="padding:10px 14px;font-weight:700;color:#fff;">
                                    <?php echo esc_html( strtoupper( $ap['id'] ) ); ?>: <?php echo esc_html( $ap['nameBn'] ); ?>
                                </td>
                                <td style="padding:10px 14px;font-family:monospace;color:#00f5d4;">
                                    /<?php echo esc_html( $ap['centerSlug'] ); ?>
                                </td>
                                <td style="padding:10px 14px;">
                                    <span style="padding:2px 6px;border-radius:4px;background:#1e293b;color:#a78bfa;font-family:monospace;"><?php echo esc_html( $ap['mode'] ); ?></span>
                                </td>
                                <td style="padding:10px 14px;font-weight:700;color:#10b981;">
                                    <?php echo esc_html( (string) $ap['minQualityScore'] ); ?>/100
                                </td>
                                <td style="padding:10px 14px;">
                                    <?php echo esc_html( (string) $ap['dailyLimit'] ); ?> / দিন
                                </td>
                                <td style="padding:10px 14px;">
                                    <?php echo esc_html( $ap['outputType'] ); ?>
                                </td>
                                <td style="padding:10px 14px;color:#94a3b8;">
                                    <?php echo esc_html( $ap['googleSync'] ); ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>

            <!-- SECTION 3: RECENT BOT ACTIVITY AUDIT LOG -->
            <h2 style="color:#f59e0b;margin-bottom:12px;">📋 বট এক্সিকিউশন ও অডিট লগ</h2>
            <div style="background:#050811;border:1px solid #1e293b;border-radius:12px;padding:14px;max-height:280px;overflow-y:auto;font-family:monospace;font-size:12px;">
                <?php if ( empty( $logs ) ) : ?>
                    <div style="color:#64748b;">বটগুলোর স্বয়ংক্রিয় ব্যাকগ্রাউন্ড অডিট লগ এখানে প্রদর্শিত হবে।</div>
                <?php else : ?>
                    <?php foreach ( $logs as $l ) : ?>
                        <div style="padding:6px 0;border-bottom:1px solid #111827;display:flex;gap:12px;">
                            <span style="color:#64748b;">[<?php echo esc_html( $l['timestamp'] ); ?>]</span>
                            <strong style="color:#00f5d4;"><?php echo esc_html( $l['bot_name'] ); ?>:</strong>
                            <span style="color:#e2e8f0;"><?php echo esc_html( $l['details'] ); ?></span>
                            <span style="color:#a78bfa;margin-left:auto;"><?php echo esc_html( (string) $l['duration_ms'] ); ?>ms</span>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }

    /**
     * Render API Key Pool, Rotation & Model Failover Screen
     */
    public static function render_api_rotator_screen(): void {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( esc_html__( 'Unauthorized access.', 'hackersshikkhok-core' ) );
        }
        $pools = ApiRotationManager::get_key_pools();
        $telemetry = ApiRotationManager::get_telemetry();
        ?>
        <div class="wrap hs-admin-wrap" style="max-width:1200px;color:#e2e8f0;">
            <div style="background:#0b1120;padding:20px;border-radius:12px;border:1px solid #10b981;margin-bottom:20px;">
                <h1 style="color:#fff;margin:0 0 6px;">🔑 AI API Key রোটেশন, কোটা গার্ড ও মডেল ফেইলওভার হাব</h1>
                <p style="color:#94a3b8;font-size:13px;margin:0;">
                    একটি কি বা মডেলের লিমিট শেষ হলে (HTTP 429) স্বয়ংক্রিয়ভাবে পরবর্তী কি বা মডেলে সুইচ করা এবং পুরো প্রোভাইডারের কোটা শেষ হলে পরবর্তী AI প্রোভাইডারে নিরবচ্ছিন্ন ফেইলওভার সিস্টেম।
                </p>
            </div>

            <!-- LIVE TELEMETRY COUNTERS -->
            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));gap:14px;margin-bottom:24px;">
                <div style="background:#0b1120;border:1px solid #1e293b;padding:14px;border-radius:10px;">
                    <span style="font-size:11px;color:#94a3b8;display:block;">মোট ডিসপ্যাচ রিকোয়েস্ট</span>
                    <strong style="font-size:22px;color:#00f5d4;"><?php echo number_format( (int) $telemetry['total_requests'] ); ?></strong>
                </div>
                <div style="background:#0b1120;border:1px solid #1e293b;padding:14px;border-radius:10px;">
                    <span style="font-size:11px;color:#94a3b8;display:block;">সফল রেসপন্স</span>
                    <strong style="font-size:22px;color:#10b981;"><?php echo number_format( (int) $telemetry['successful_requests'] ); ?></strong>
                </div>
                <div style="background:#0b1120;border:1px solid #1e293b;padding:14px;border-radius:10px;">
                    <span style="font-size:11px;color:#94a3b8;display:block;">429 রেট-লিমিট ক্যাচ ও রোটেশন</span>
                    <strong style="font-size:22px;color:#f59e0b;"><?php echo number_format( (int) $telemetry['rate_limit_hits'] ); ?></strong>
                </div>
                <div style="background:#0b1120;border:1px solid #1e293b;padding:14px;border-radius:10px;">
                    <span style="font-size:11px;color:#94a3b8;display:block;">মডেল/প্রোভাইডার ফেইলওভার</span>
                    <strong style="font-size:22px;color:#a78bfa;"><?php echo number_format( (int) $telemetry['model_failovers'] ); ?></strong>
                </div>
            </div>

            <!-- HIERARCHICAL FAILOVER DIAGRAM -->
            <div style="background:#050811;border:1px solid #1e293b;padding:16px;border-radius:12px;margin-bottom:24px;">
                <strong style="color:#00f5d4;display:block;margin-bottom:8px;">🔄 মাল্টি-টিয়ার মডেল ফেইলওভার ক্রমান্বয় (Auto-Cascading Hierarchy):</strong>
                <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-size:12px;font-family:monospace;">
                    <span style="background:#0b1120;border:1px solid #00f5d4;color:#00f5d4;padding:4px 10px;border-radius:6px;">1. Gemini 2.5 Pro (Primary)</span>
                    <span>➔</span>
                    <span style="background:#0b1120;border:1px solid #10b981;color:#10b981;padding:4px 10px;border-radius:6px;">2. Gemini 2.5 Flash</span>
                    <span>➔</span>
                    <span style="background:#0b1120;border:1px solid #3b82f6;color:#3b82f6;padding:4px 10px;border-radius:6px;">3. Gemini 2.0 Flash Lite</span>
                    <span>➔</span>
                    <span style="background:#0b1120;border:1px solid #7c3aed;color:#7c3aed;padding:4px 10px;border-radius:6px;">4. OpenAI GPT-4o / Mini</span>
                    <span>➔</span>
                    <span style="background:#0b1120;border:1px solid #f43f5e;color:#f43f5e;padding:4px 10px;border-radius:6px;">5. Claude 3.5 / 3.7</span>
                    <span>➔</span>
                    <span style="background:#0b1120;border:1px solid #eab308;color:#eab308;padding:4px 10px;border-radius:6px;">6. Groq / DeepSeek</span>
                    <span>➔</span>
                    <span style="background:#0b1120;border:1px solid #64748b;color:#e2e8f0;padding:4px 10px;border-radius:6px;">7. Local Knowledge Engine (100% Uptime)</span>
                </div>
            </div>

            <!-- KEY POOLS PER PROVIDER -->
            <h2 style="color:#fff;margin-bottom:12px;">🔑 সক্রিয় এপিআই কি পুল (Key Pools per Provider)</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));gap:16px;">
                <?php foreach ( $pools as $provider => $pool_data ) : ?>
                    <div style="background:#0b1120;border:1px solid #1e293b;border-radius:12px;padding:16px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid #1e293b;padding-bottom:8px;">
                            <strong style="color:#00f5d4;font-size:15px;text-transform:uppercase;"><?php echo esc_html( $provider ); ?> KEY POOL</strong>
                            <span style="font-size:11px;font-family:monospace;color:#94a3b8;"><?php echo count( $pool_data['keys'] ?? array() ); ?> Keys Loaded</span>
                        </div>

                        <?php if ( empty( $pool_data['keys'] ) ) : ?>
                            <p style="font-size:12px;color:#64748b;margin:0;">এই প্রোভাইডারের জন্য কোনো কি নেই। (এনভায়রনমেন্ট ভ্যারিয়েবল অথবা কনফিগারেশন যোগ করুন)</p>
                        <?php else : ?>
                            <div style="display:flex;flex-direction:column;gap:8px;">
                                <?php foreach ( $pool_data['keys'] as $k ) : ?>
                                    <div style="background:#050811;border:1px solid #1e293b;border-radius:8px;padding:8px 12px;font-size:12px;display:flex;justify-content:space-between;align-items:center;">
                                        <div>
                                            <strong style="color:#fff;display:block;"><?php echo esc_html( $k['label'] ); ?></strong>
                                            <span style="font-family:monospace;color:#64748b;font-size:11px;">
                                                ****<?php echo esc_html( substr( (string) $k['key'], -4 ) ); ?> · ব্যবহার: <?php echo esc_html( (string) ( $k['usage_count'] ?? 0 ) ); ?>
                                            </span>
                                        </div>
                                        <span style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:<?php echo ( $k['status'] === 'active' ) ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)'; ?>;color:<?php echo ( $k['status'] === 'active' ) ? '#10b981' : '#f43f5e'; ?>;">
                                            <?php echo esc_html( strtoupper( $k['status'] ) ); ?>
                                        </span>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
    }
}
