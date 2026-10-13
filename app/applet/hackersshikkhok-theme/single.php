<?php
/**
 * Single Post Template - Hackers শিক্ষক
 * Theme: Hackers শিক্ষক 2040 Cyber & Coding Hub Theme
 */

declare(strict_types=1);

get_header();
?>

<main id="primary" class="site-main hs-page-container">
    <?php while ( have_posts() ) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class( 'hs-page-card' ); ?>>
            
            <!-- Breadcrumb Navigation -->
            <div style="font-size:12px;color:var(--hs-text-muted);margin-bottom:18px;display:flex;align-items:center;gap:6px;">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" style="color:var(--hs-text-muted);">হোম</a>
                <span>&rsaquo;</span>
                <a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" style="color:var(--hs-text-muted);">ব্লগ</a>
                <span>&rsaquo;</span>
                <span style="color:var(--hs-primary);"><?php the_title(); ?></span>
            </div>

            <!-- Article Header -->
            <header class="hs-article-header">
                <?php
                $categories = get_the_category();
                if ( ! empty( $categories ) ) :
                ?>
                    <span class="hs-card-badge"><?php echo esc_html( $categories[0]->name ); ?></span>
                <?php endif; ?>

                <h1 style="color:#ffffff;font-size:clamp(1.75rem, 4vw, 2.75rem);font-weight:800;line-height:1.25;margin:12px 0 16px;">
                    <?php the_title(); ?>
                </h1>

                <div class="hs-article-meta">
                    <span>👤 লেখক: <strong style="color:#f8fafc;"><?php echo esc_html( get_the_author() ); ?></strong></span>
                    <span>•</span>
                    <span>📅 তারিখ: <?php echo esc_html( get_the_date( 'd F Y' ) ); ?></span>
                    <span>•</span>
                    <span>⏱️ রিডিং টাইম: <?php echo esc_html( max( 1, (int) round( str_word_count( wp_strip_all_tags( get_the_content() ) ) / 200 ) ) ); ?> মিনিট</span>
                </div>
            </header>

            <!-- Featured Thumbnail -->
            <?php if ( has_post_thumbnail() ) : ?>
                <div style="margin-bottom:28px;border-radius:14px;overflow:hidden;border:1px solid var(--hs-border);box-shadow:0 8px 30px rgba(0,0,0,0.5);">
                    <?php the_post_thumbnail( 'large', array( 'style' => 'width:100%;height:auto;display:block;' ) ); ?>
                </div>
            <?php endif; ?>

            <!-- Article Content -->
            <div class="entry-content" style="color:#e2e8f0;font-size:16px;line-height:1.8;">
                <?php
                the_content();

                wp_link_pages( array(
                    'before' => '<div class="page-links" style="margin-top:24px;">' . esc_html__( 'Pages:', 'hackersshikkhok-theme' ),
                    'after'  => '</div>',
                ) );
                ?>
            </div>

            <!-- Tags -->
            <?php
            $tags = get_the_tags();
            if ( ! empty( $tags ) ) :
            ?>
                <div style="margin-top:32px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
                    <span style="font-size:12px;color:var(--hs-text-muted);">🏷️ ট্যাগসমূহ:</span>
                    <?php foreach ( $tags as $tag ) : ?>
                        <a href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>" style="font-size:12px;background:rgba(255,255,255,0.05);color:#cbd5e1;padding:3px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.1);">
                            #<?php echo esc_html( $tag->name ); ?>
                        </a>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>

            <!-- Author Box -->
            <div style="margin-top:36px;padding:24px;background:#050811;border:1px solid var(--hs-border);border-radius:12px;display:flex;gap:18px;align-items:center;">
                <div style="width:56px;height:56px;border-radius:50%;background:#00f5d4;color:#050811;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;flex-shrink:0;">
                    <?php echo esc_html( mb_substr( get_the_author(), 0, 1 ) ); ?>
                </div>
                <div>
                    <div style="color:#00f5d4;font-weight:700;font-size:14px;">লেখক: <?php echo esc_html( get_the_author() ); ?></div>
                    <div style="color:#94a3b8;font-size:12px;margin-top:4px;">
                        Hackers শিক্ষক সাইবার সিকিউরিটি ও ডেভেলপার রিসোর্স সেন্টারের নিয়মিত কন্ট্রিবিউটর।
                    </div>
                </div>
            </div>

            <!-- Comments Area -->
            <?php
            if ( comments_open() || get_comments_number() ) :
                comments_template();
            endif;
            ?>
        </article>
    <?php endwhile; ?>
</main>

<?php
get_footer();
