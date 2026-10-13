<?php
/**
 * Template part for displaying posts in a futuristic cyber card grid
 * Theme: Hackers শিক্ষক 2040 Cyber & Coding Hub Theme
 */

declare(strict_types=1);

$categories = get_the_category();
$cat_name = ! empty( $categories ) ? $categories[0]->name : 'টিউটোরিয়াল';
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'hs-cyber-card hs-post-card' ); ?>>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <span class="hs-card-badge"><?php echo esc_html( $cat_name ); ?></span>
        <span style="font-size:11px;color:var(--hs-text-muted);font-family:var(--hs-font-mono);">
            <?php echo esc_html( get_the_date( 'd M Y' ) ); ?>
        </span>
    </div>

    <?php if ( has_post_thumbnail() ) : ?>
        <div style="margin-bottom:14px;border-radius:10px;overflow:hidden;border:1px solid var(--hs-border);max-height:180px;">
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail( 'medium_large', array( 'style' => 'width:100%;height:100%;object-fit:cover;display:block;' ) ); ?>
            </a>
        </div>
    <?php endif; ?>

    <h2 class="hs-card-title" style="font-size:1.2rem;line-height:1.4;">
        <a href="<?php the_permalink(); ?>" style="color:#ffffff;text-decoration:none;">
            <?php the_title(); ?>
        </a>
    </h2>

    <div class="hs-card-desc" style="font-size:0.9rem;line-height:1.6;color:#94a3b8;">
        <?php echo esc_html( wp_trim_words( get_the_excerpt(), 22, '...' ) ); ?>
    </div>

    <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:center;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);">
        <span style="font-size:12px;color:#cbd5e1;">
            লেখক: <strong><?php echo esc_html( get_the_author() ); ?></strong>
        </span>
        <a href="<?php the_permalink(); ?>" class="hs-btn-secondary" style="padding:6px 14px;font-size:12px;border-radius:6px;">
            পড়ুন &rarr;
        </a>
    </div>
</article>
