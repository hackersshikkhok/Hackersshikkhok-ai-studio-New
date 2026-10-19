<?php
/**
 * Template Name: User Control Dashboard & Student Portal
 * Template Post Type: page
 * Package: HackersShikkhok Theme
 * Brand: HackersShikkhok (https://hackersshikkhok.com)
 */

declare(strict_types=1);

get_header();

$current_user_id = get_current_user_id();
$is_logged_in    = is_user_logged_in();
$user            = wp_get_current_user();

$wallet = class_exists( '\HackersShikkhok\Core\LMS\Wallet_Economy' )
    ? \HackersShikkhok\Core\LMS\Wallet_Economy::get_wallet( $current_user_id )
    : array(
        'balance_bdt' => 50.00,
        'xp_points'   => 200,
        'level'       => 1,
        'rank_title'  => 'Guest Security Auditor',
        'power_level' => 'low',
    );

$user_name = $is_logged_in ? ($user->display_name ?: $user->user_login) : 'Guest Security Auditor';
$user_email = $is_logged_in ? $user->user_email : 'guest@hackersshikkhok.com';
$xp = (int) ( $wallet['xp_points'] ?? 200 );
$level = (int) ( $wallet['level'] ?? 1 );
$rank = (string) ( $wallet['rank_title'] ?? 'Cyber Cadet' );
$balance = (float) ( $wallet['balance_bdt'] ?? 50.00 );
$xp_next_level = $level * 500;
$xp_progress = min( 100, max( 5, (int) round( ( $xp / max( 1, $xp_next_level ) ) * 100 ) ) );
?>

<main id="primary" class="hs-dashboard-page" style="background:#06080d; color:#f8fafc; min-height:100vh; padding:40px 16px;">
    <div style="max-width:1280px; margin:0 auto;">

        <!-- Dashboard Header / Welcome Profile Banner -->
        <section style="background:linear-gradient(135deg, rgba(11,17,32,0.95) 0%, rgba(15,23,42,0.85) 100%); border:1px solid rgba(0,245,212,0.25); border-radius:20px; padding:28px; margin-bottom:28px; position:relative; overflow:hidden; box-shadow:0 12px 36px rgba(0,0,0,0.5);">
            <div style="position:absolute; top:-40px; right:-40px; width:180px; height:180px; background:radial-gradient(circle, rgba(0,245,212,0.15), transparent 70%); border-radius:50%; pointer-events:none;"></div>
            
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:20px; position:relative; z-index:2;">
                <!-- User Identity -->
                <div style="display:flex; align-items:center; gap:18px;">
                    <div style="width:68px; height:68px; border-radius:50%; background:linear-gradient(135deg, #00f5d4 0%, #7b2cbf 100%); display:flex; align-items:center; justify-content:center; font-size:32px; border:2px solid #00f5d4; box-shadow:0 0 20px rgba(0,245,212,0.4); flex-shrink:0;">
                        <?php echo $is_logged_in ? '👨‍💻' : '🛡️'; ?>
                    </div>
                    <div>
                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; flex-wrap:wrap;">
                            <h1 style="font-size:1.5rem; font-weight:800; color:#ffffff; margin:0;"><?php echo esc_html( $user_name ); ?></h1>
                            <span style="background:rgba(0,245,212,0.15); border:1px solid #00f5d4; color:#00f5d4; font-size:11px; font-weight:800; padding:2px 10px; border-radius:999px;">
                                Level <?php echo esc_html( (string) $level ); ?> · <?php echo esc_html( $rank ); ?>
                            </span>
                        </div>
                        <p style="color:#94a3b8; font-size:13px; margin:0; font-family:var(--font-mono);">
                            ID: <?php echo esc_html( $is_logged_in ? 'HS-USER-' . $current_user_id : 'HS-GUEST-OPERATIVE' ); ?> &nbsp;|&nbsp; <?php echo esc_html( $user_email ); ?>
                        </p>
                    </div>
                </div>

                <!-- Auth State Action Buttons -->
                <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                    <?php if ( ! $is_logged_in ) : ?>
                        <a href="<?php echo esc_url( wp_login_url( home_url( '/dashboard/' ) ) ); ?>" style="padding:10px 20px; background:#00f5d4; color:#06080d; font-weight:800; font-size:13px; border-radius:10px; text-decoration:none; box-shadow:0 0 16px rgba(0,245,212,0.35);">
                            🔑 Sign In
                        </a>
                        <a href="<?php echo esc_url( wp_registration_url() ); ?>" style="padding:10px 18px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); color:#fff; font-weight:600; font-size:13px; border-radius:10px; text-decoration:none;">
                            Register Account
                        </a>
                    <?php else : ?>
                        <a href="<?php echo esc_url( admin_url( 'profile.php' ) ); ?>" style="padding:10px 18px; background:rgba(0,245,212,0.12); border:1px solid rgba(0,245,212,0.3); color:#00f5d4; font-weight:700; font-size:13px; border-radius:10px; text-decoration:none;">
                            ⚙️ Edit Profile
                        </a>
                        <a href="<?php echo esc_url( wp_logout_url( home_url( '/' ) ) ); ?>" style="padding:10px 16px; background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.4); color:#ef4444; font-weight:700; font-size:13px; border-radius:10px; text-decoration:none;">
                            Sign Out
                        </a>
                    <?php endif; ?>
                </div>
            </div>

            <!-- XP Level Progress Bar -->
            <div style="margin-top:24px; padding-top:20px; border-top:1px solid rgba(255,255,255,0.08);">
                <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:6px;">
                    <span style="color:#00f5d4; font-weight:700;">XP Progress: <?php echo esc_html( (string) $xp ); ?> / <?php echo esc_html( (string) $xp_next_level ); ?> XP</span>
                    <span style="color:#94a3b8;">Next Level: <?php echo esc_html( (string) ($level + 1) ); ?></span>
                </div>
                <div style="width:100%; height:8px; background:rgba(255,255,255,0.08); border-radius:999px; overflow:hidden;">
                    <div style="width:<?php echo esc_attr( (string) $xp_progress ); ?>%; height:100%; background:linear-gradient(90deg, #00f5d4 0%, #7b2cbf 100%); box-shadow:0 0 10px #00f5d4; border-radius:999px;"></div>
                </div>
            </div>
        </section>

        <!-- 4-Stat Metric Cards -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:18px; margin-bottom:28px;">
            <div style="background:#0b1120; border:1px solid rgba(0,245,212,0.25); border-radius:16px; padding:22px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <span style="font-size:12px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Wallet Balance</span>
                    <span style="font-size:22px;">💳</span>
                </div>
                <div style="font-size:1.8rem; font-weight:900; color:#00f5d4; font-family:var(--font-mono);">
                    BDT <?php echo number_format( $balance, 2 ); ?>
                </div>
                <div style="font-size:11px; color:#10b981; margin-top:4px;">● Verified Cyber Wallet Ledger</div>
            </div>

            <div style="background:#0b1120; border:1px solid rgba(123,44,191,0.3); border-radius:16px; padding:22px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <span style="font-size:12px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Scholar XP Points</span>
                    <span style="font-size:22px;">⚡</span>
                </div>
                <div style="font-size:1.8rem; font-weight:900; color:#a78bfa; font-family:var(--font-mono);">
                    <?php echo number_format( (float) $xp ); ?> XP
                </div>
                <div style="font-size:11px; color:#94a3b8; margin-top:4px;">Rank: <?php echo esc_html( $rank ); ?></div>
            </div>

            <div style="background:#0b1120; border:1px solid rgba(239,68,68,0.25); border-radius:16px; padding:22px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <span style="font-size:12px; font-weight:700; color:#94a3b8; text-transform:uppercase;">CTF Labs Solved</span>
                    <span style="font-size:22px;">🚩</span>
                </div>
                <div style="font-size:1.8rem; font-weight:900; color:#f87171; font-family:var(--font-mono);">
                    3 / 12 Labs
                </div>
                <div style="font-size:11px; color:#10b981; margin-top:4px;">+150 XP per valid flag</div>
            </div>

            <div style="background:#0b1120; border:1px solid rgba(245,158,11,0.25); border-radius:16px; padding:22px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <span style="font-size:12px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Certificates</span>
                    <span style="font-size:22px;">📜</span>
                </div>
                <div style="font-size:1.8rem; font-weight:900; color:#fbbf24; font-family:var(--font-mono);">
                    1 Active
                </div>
                <div style="font-size:11px; color:#94a3b8; margin-top:4px;">
                    <a href="<?php echo esc_url( home_url( '/verify-certificate/' ) ); ?>" style="color:#fbbf24; text-decoration:none;">Verify Certificate ➔</a>
                </div>
            </div>
        </div>

        <!-- Quick Access Ecosystem Grid -->
        <h2 style="font-size:1.3rem; font-weight:800; color:#fff; margin-bottom:16px;">🚀 Quick Access Portals</h2>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:18px; margin-bottom:32px;">
            <a href="<?php echo esc_url( home_url( '/academy/' ) ); ?>" style="background:#0b1120; border:1px solid rgba(0,245,212,0.2); border-radius:14px; padding:20px; text-decoration:none; display:flex; align-items:center; gap:16px; transition:border-color 0.2s;">
                <span style="font-size:28px;">🎓</span>
                <div>
                    <h3 style="color:#fff; font-size:1rem; font-weight:700; margin:0 0 4px 0;">Cyber Academy</h3>
                    <p style="color:#94a3b8; font-size:12px; margin:0;">8 Engineering faculties &amp; CTF challenges.</p>
                </div>
            </a>

            <a href="<?php echo esc_url( home_url( '/tools/' ) ); ?>" style="background:#0b1120; border:1px solid rgba(0,245,212,0.2); border-radius:14px; padding:20px; text-decoration:none; display:flex; align-items:center; gap:16px; transition:border-color 0.2s;">
                <span style="font-size:28px;">⚡</span>
                <div>
                    <h3 style="color:#00f5d4; font-size:1rem; font-weight:700; margin:0 0 4px 0;">2,024+ Developer Tools</h3>
                    <p style="color:#94a3b8; font-size:12px; margin:0;">100% client-side privacy-preserving utilities.</p>
                </div>
            </a>

            <a href="<?php echo esc_url( home_url( '/cyber-command/' ) ); ?>" style="background:#0b1120; border:1px solid rgba(239,68,68,0.2); border-radius:14px; padding:20px; text-decoration:none; display:flex; align-items:center; gap:16px; transition:border-color 0.2s;">
                <span style="font-size:28px;">💻</span>
                <div>
                    <h3 style="color:#f87171; font-size:1rem; font-weight:700; margin:0 0 4px 0;">Cyber Command Matrix</h3>
                    <p style="color:#94a3b8; font-size:12px; margin:0;">Automated web auditor &amp; threat radar.</p>
                </div>
            </a>

            <a href="<?php echo esc_url( home_url( '/platform-center/' ) ); ?>" style="background:#0b1120; border:1px solid rgba(123,44,191,0.2); border-radius:14px; padding:20px; text-decoration:none; display:flex; align-items:center; gap:16px; transition:border-color 0.2s;">
                <span style="font-size:28px;">🚀</span>
                <div>
                    <h3 style="color:#a78bfa; font-size:1rem; font-weight:700; margin:0 0 4px 0;">Platform Center</h3>
                    <p style="color:#94a3b8; font-size:12px; margin:0;">Web-to-app, PWA, 3D gift &amp; card makers.</p>
                </div>
            </a>
        </div>

        <!-- Enrolled Course Progress Card -->
        <section style="background:#0b1120; border:1px solid rgba(255,255,255,0.08); border-radius:18px; padding:24px; margin-bottom:28px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; flex-wrap:wrap; gap:12px;">
                <div>
                    <span style="background:rgba(0,245,212,0.1); color:#00f5d4; font-size:11px; font-weight:800; padding:2px 8px; border-radius:6px; border:1px solid rgba(0,245,212,0.3);">ACTIVE COURSE</span>
                    <h3 style="color:#fff; font-size:1.2rem; font-weight:800; margin:6px 0 2px 0;">Cybersecurity Fundamentals &amp; Defensive Principles</h3>
                    <p style="color:#94a3b8; font-size:13px; margin:0;">Faculty of Cybersecurity &amp; Ethical Hacking · Level 1</p>
                </div>
                <a href="<?php echo esc_url( home_url( '/academy/' ) ); ?>" style="padding:10px 20px; background:#00f5d4; color:#06080d; font-weight:800; font-size:13px; border-radius:10px; text-decoration:none;">
                    Resume Learning ➔
                </a>
            </div>
            
            <div style="background:#06080d; border-radius:12px; padding:16px; border:1px solid rgba(255,255,255,0.06);">
                <div style="display:flex; justify-content:space-between; font-size:12px; color:#94a3b8; margin-bottom:8px;">
                    <span>Course Progress: <strong>4 of 12 Lessons Completed</strong></span>
                    <span style="color:#00f5d4; font-weight:700;">33% Complete</span>
                </div>
                <div style="width:100%; height:6px; background:rgba(255,255,255,0.06); border-radius:999px; overflow:hidden;">
                    <div style="width:33%; height:100%; background:#00f5d4; border-radius:999px;"></div>
                </div>
            </div>
        </section>

    </div>
</main>

<?php
get_footer();
