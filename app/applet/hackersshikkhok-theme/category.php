<?php
/**
 * Category Archive Template - Hackers শিক্ষক
 */

declare(strict_types=1);

get_header();
?>

<main id="primary" class="site-main hs-archive-container">
    <div style="background:linear-gradient(135deg, rgba(11,17,32,0.95), rgba(6,8,13,0.9));border:1px solid var(--hs-border);border-radius:16px;padding:32px 24px;margin-bottom:32px;">
        <span class="hs-card-badge">ক্যাটাগরি আর্কাইভ</span>
        <h1 style="color:#ffffff;font-size:1.75rem;font-weight:800;margin:10px 0 6px;">
            <?php single_cat_title(); ?>
        </h1>
        <?php if ( category_description() ) : ?>
            <div style="color:var(--hs-text-muted);font-size:13px;line-height:1.6;">
                <?php echo category_description(); ?>
            </div>
        <?php endif; ?>
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
                'prev_text' => __( '&larr; পূর্ববর্তী', 'hackersshikkhok-theme' ),
                'next_text' => __( 'পরবর্তী &rarr;', 'hackersshikkhok-theme' ),
            ) );
            ?>
        </div>
    <?php else : ?>
        <div class="hs-cyber-card" style="text-align:center;padding:48px 24px;">
            <p style="color:var(--hs-text-muted);">এই ক্যাটাগরিতে এখনো কোনো পোস্ট নেই।</p>
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hs-btn-primary">হোমপেজে ফিরে যান</a>
        </div>
    <?php endif; ?>
</main>

<?php
get_footer();
