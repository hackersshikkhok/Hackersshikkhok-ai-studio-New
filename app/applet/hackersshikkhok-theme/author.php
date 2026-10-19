<?php
/**
 * Author Archive Template - HackersShikkhok
 */

declare(strict_types=1);

get_header();
?>

<main id="primary" class="site-main hs-archive-container">
    <div style="background:linear-gradient(135deg, rgba(11,17,32,0.95), rgba(6,8,13,0.9));border:1px solid var(--hs-border);border-radius:16px;padding:32px 24px;margin-bottom:32px;display:flex;align-items:center;gap:20px;">
        <div style="width:64px;height:64px;border-radius:50%;background:#00f5d4;color:#050811;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;flex-shrink:0;">
            <?php echo esc_html( mb_substr( get_the_author(), 0, 1 ) ); ?>
        </div>
        <div>
            <span class="hs-card-badge"> </span>
            <h1 style="color:#ffffff;font-size:1.75rem;font-weight:800;margin:6px 0 4px;">
                <?php the_author(); ?>
            </h1>
            <?php if ( get_the_author_meta( 'description' ) ) : ?>
                <div style="color:var(--hs-text-muted);font-size:13px;line-height:1.6;">
                    <?php the_author_meta( 'description' ); ?>
                </div>
            <?php endif; ?>
        </div>
    </div>

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
            <p style="color:var(--hs-text-muted);">     ।</p>
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hs-btn-primary">  </a>
        </div>
    <?php endif; ?>
</main>

<?php
get_footer();
