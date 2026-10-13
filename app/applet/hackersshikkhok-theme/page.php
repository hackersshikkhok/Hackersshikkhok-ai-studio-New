<?php
/**
 * Generic Page Template - Hackers শিক্ষক
 * Theme: Hackers শিক্ষক 2040 Cyber & Coding Hub Theme
 */

declare(strict_types=1);

get_header();
?>

<main id="primary" class="site-main hs-page-container">
    <?php while ( have_posts() ) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class( 'hs-page-card' ); ?>>
            <header class="hs-article-header" style="margin-bottom:24px;">
                <h1 style="color:#ffffff;font-size:clamp(1.75rem, 3.5vw, 2.5rem);font-weight:800;margin:0 0 10px;">
                    <?php the_title(); ?>
                </h1>
                <div style="width:60px;height:3px;background:var(--hs-primary);border-radius:2px;"></div>
            </header>

            <div class="entry-content" style="color:#e2e8f0;font-size:16px;line-height:1.8;">
                <?php
                the_content();

                wp_link_pages( array(
                    'before' => '<div class="page-links" style="margin-top:24px;">' . esc_html__( 'Pages:', 'hackersshikkhok-theme' ),
                    'after'  => '</div>',
                ) );
                ?>
            </div>
        </article>
    <?php endwhile; ?>
</main>

<?php
get_footer();
