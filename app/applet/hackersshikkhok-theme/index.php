<?php
/**
 * Main Index Template - Hackers শিক্ষক
 * Theme: Hackers শিক্ষক 2040 Cyber & Coding Hub Theme
 */

declare(strict_types=1);

get_header();
?>

<main id="primary" class="site-main hs-archive-container">
    <!-- Header Banner -->
    <div style="background:linear-gradient(135deg, rgba(11,17,32,0.95), rgba(6,8,13,0.9));border:1px solid var(--hs-border);border-radius:20px;padding:40px 28px;text-align:center;margin-bottom:36px;box-shadow:0 8px 32px rgba(0,245,212,0.08);">
        <span class="hs-hero-badge">Cyber Defense &amp; Tech Knowledgebase</span>
        <h1 style="color:#ffffff;font-size:clamp(1.75rem, 3.5vw, 2.5rem);font-weight:800;margin:12px 0 8px;">
            📝 Hackers শিক্ষক আর্টিকেলে ও সাইবার রিসোর্স
        </h1>
        <p style="color:var(--hs-text-muted);max-width:680px;margin:0 auto 20px;font-size:14px;">
            ইথিক্যাল হ্যাকিং, লিনাক্স সিকিউরিটি, ওয়েব এক্সপ্লয়েটেশন, ক্রিপ্টোগ্রাফি ও ফুল-স্ট্যাক কোডিংয়ের সর্বশেষ গবেষণা ও টিউটোরিয়াল।
        </p>
        <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
            <a href="<?php echo esc_url( home_url( '/academy/' ) ); ?>" class="hs-btn-primary" style="padding:10px 22px;font-size:13px;">
                🎓 একাডেমি কোর্সসমূহ
            </a>
            <a href="<?php echo esc_url( home_url( '/tools/' ) ); ?>" class="hs-btn-secondary" style="padding:10px 22px;font-size:13px;">
                ⚡ ৫২০+ ডেভেলপার টুলস
            </a>
        </div>
    </div>

    <!-- Posts Grid -->
    <?php if ( have_posts() ) : ?>
        <div class="hs-card-grid">
            <?php while ( have_posts() ) : the_post(); ?>
                <?php get_template_part( 'template-parts/post-card' ); ?>
            <?php endwhile; ?>
        </div>

        <div style="margin-top:36px;text-align:center;">
            <?php
            the_posts_pagination( array(
                'mid_size'  => 2,
                'prev_text' => __( '&larr; পূর্ববর্তী', 'hackersshikkhok-theme' ),
                'next_text' => __( 'পরবর্তী &rarr;', 'hackersshikkhok-theme' ),
            ) );
            ?>
        </div>
    <?php else : ?>
        <div class="hs-cyber-card" style="text-align:center;padding:48px 24px;">
            <div style="font-size:48px;margin-bottom:12px;">🛡️</div>
            <h2 style="color:#ffffff;margin-bottom:8px;">শীঘ্রই নতুন আর্টিকেল প্রকাশিত হবে</h2>
            <p style="color:var(--hs-text-muted);max-width:500px;margin:0 auto 20px;">
                বর্তমানে প্ল্যাটফর্ম ডাটাবেস আপডেট হচ্ছে। সরাসরি আমাদের একাডেমি ও ডেভেলপার ল্যাব এক্সপ্লোর করুন।
            </p>
            <a href="<?php echo esc_url( home_url( '/academy/' ) ); ?>" class="hs-btn-primary">
                🎓 একাডেমি ব্রাউজ করুন
            </a>
        </div>
    <?php endif; ?>
</main>

<?php
get_footer();
