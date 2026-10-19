<?php
/**
 * Main Index Template - HackersShikkhok
 * Theme: HackersShikkhok 2040 Cyber & Coding Hub Theme
 */

declare(strict_types=1);

get_header();
?>

<main id="primary" class="site-main hs-archive-container">
    <!-- Header Banner -->
    <div style="background:linear-gradient(135deg, rgba(11,17,32,0.95), rgba(6,8,13,0.9));border:1px solid var(--hs-border);border-radius:20px;padding:40px 28px;text-align:center;margin-bottom:36px;box-shadow:0 8px 32px rgba(0,245,212,0.08);">
        <span class="hs-hero-badge">Cyber Defense &amp; Tech Knowledgebase</span>
        <h1 style="color:#ffffff;font-size:clamp(1.75rem, 3.5vw, 2.5rem);font-weight:800;margin:12px 0 8px;">
            📝 HackersShikkhok    
        </h1>
        <p style="color:var(--hs-text-muted);max-width:680px;margin:0 auto 20px;font-size:14px;">
             ,  ,  ,   -     ।
        </p>
        <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
            <a href="<?php echo esc_url( home_url( '/academy/' ) ); ?>" class="hs-btn-primary" style="padding:10px 22px;font-size:13px;">
                🎓  
            </a>
            <a href="<?php echo esc_url( home_url( '/tools/' ) ); ?>" class="hs-btn-secondary" style="padding:10px 22px;font-size:13px;">
                ⚡ +  
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
                'prev_text' => __( '&larr; ', 'hackersshikkhok-theme' ),
                'next_text' => __( ' &rarr;', 'hackersshikkhok-theme' ),
            ) );
            ?>
        </div>
    <?php else : ?>
        <div class="hs-cyber-card" style="text-align:center;padding:48px 24px;">
            <div style="font-size:48px;margin-bottom:12px;">🛡️</div>
            <h2 style="color:#ffffff;margin-bottom:8px;">    </h2>
            <p style="color:var(--hs-text-muted);max-width:500px;margin:0 auto 20px;">
                    ।        ।
            </p>
            <a href="<?php echo esc_url( home_url( '/academy/' ) ); ?>" class="hs-btn-primary">
                🎓   
            </a>
        </div>
    <?php endif; ?>
</main>

<?php
get_footer();
