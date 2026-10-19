<?php
/**
 * Post Card Component Template
 * Brand: HackersShikkhok (https://hackersshikkhok.com)
 */
declare(strict_types=1);

$post_id    = get_the_ID();
$categories = get_the_category( $post_id );
$primary_cat = ! empty( $categories ) ? $categories[0]->name : 'Cyber Security';
$read_time  = max( 3, (int) ceil( str_word_count( wp_strip_all_tags( get_the_content() ) ) / 200 ) );
?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'hs-post-card hs-cyber-card' ); ?>>
    <?php if ( has_post_thumbnail() ) : ?>
        <div class="hs-card-thumb-wrap">
            <a href="<?php the_permalink(); ?>" aria-label="<?php the_title_attribute(); ?>">
                <?php the_post_thumbnail( 'medium_large', array( 'class' => 'hs-card-thumb-img', 'loading' => 'lazy' ) ); ?>
            </a>
            <span class="hs-card-cat-badge"><?php echo esc_html( $primary_cat ); ?></span>
        </div>
    <?php else : ?>
        <div class="hs-card-thumb-placeholder">
            <span class="hs-placeholder-icon">🛡️</span>
            <span class="hs-card-cat-badge"><?php echo esc_html( $primary_cat ); ?></span>
        </div>
    <?php endif; ?>

    <div class="hs-card-body">
        <div class="hs-card-meta-top">
            <span class="hs-card-date"><?php echo esc_html( get_the_date( 'M j, Y' ) ); ?></span>
            <span class="hs-meta-dot">·</span>
            <span class="hs-card-reading-time">⏱️ <?php echo esc_html( (string) $read_time ); ?> min read</span>
        </div>

        <h2 class="hs-card-title">
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h2>

        <p class="hs-card-excerpt">
            <?php echo esc_html( wp_trim_words( get_the_excerpt(), 20, '...' ) ); ?>
        </p>

        <div class="hs-card-footer">
            <div class="hs-author-mini">
                <span class="hs-author-avatar">👨‍💻</span>
                <span class="hs-author-name"><?php the_author(); ?></span>
            </div>
            <a href="<?php the_permalink(); ?>" class="hs-read-more-btn">
                Read Tutorial &rarr;
            </a>
        </div>
    </div>
</article>
