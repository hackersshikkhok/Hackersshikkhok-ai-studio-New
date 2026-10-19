<?php
/**
 * Master Single Post / Tutorial / Guide Template - HackersShikkhok
 * Brand: HackersShikkhok (https://hackersshikkhok.com)
 * AdSense CLS-Safe, SEO-Optimized, 2-Column Layout with Sticky Sidebar
 */
declare(strict_types=1);

get_header();

while ( have_posts() ) : the_post();
    $post_id    = get_the_ID();
    $categories = get_the_category( $post_id );
    $primary_cat = ! empty( $categories ) ? $categories[0]->name : 'Tutorial';
    $cat_link   = ! empty( $categories ) ? get_category_link( $categories[0]->term_id ) : home_url( '/' );
    $read_time  = max( 3, (int) ceil( str_word_count( wp_strip_all_tags( get_the_content() ) ) / 200 ) );
    ?>
    <main id="primary" class="site-main hs-single-page-wrap">

        <!-- Single Post Header Banner -->
        <header class="hs-single-hero">
            <div class="hs-single-hero-inner">
                <!-- Breadcrumbs -->
                <nav class="hs-breadcrumbs" aria-label="Breadcrumb">
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
                    <span class="hs-breadcrumb-sep">/</span>
                    <a href="<?php echo esc_url( $cat_link ); ?>"><?php echo esc_html( $primary_cat ); ?></a>
                    <span class="hs-breadcrumb-sep">/</span>
                    <span class="hs-breadcrumb-current"><?php the_title(); ?></span>
                </nav>

                <div class="hs-single-cat-badge"><?php echo esc_html( $primary_cat ); ?></div>

                <h1 class="hs-single-title"><?php the_title(); ?></h1>

                <div class="hs-single-meta">
                    <span class="hs-meta-item">👨‍💻 <strong><?php the_author(); ?></strong></span>
                    <span class="hs-meta-sep">·</span>
                    <span class="hs-meta-item">📅 <?php echo esc_html( get_the_date( 'F j, Y' ) ); ?></span>
                    <span class="hs-meta-sep">·</span>
                    <span class="hs-meta-item">⏱️ <?php echo esc_html( (string) $read_time ); ?> min read</span>
                    <span class="hs-meta-sep">·</span>
                    <span class="hs-meta-item">🛡️ Verified by HackersShikkhok Defense Lab</span>
                </div>
            </div>
        </header>

        <!-- Main 2-Column Body (Content + Cyber Sidebar) -->
        <div class="hs-layout-container hs-2col-layout">
            
            <!-- Left Main Content Column -->
            <article class="hs-main-content-col">

                <!-- AdSlot Top -->
                <div class="hs-ad-slot-container" style="margin-top:0;">
                    <span class="hs-ad-label">Advertisement</span>
                    <div class="hs-ad-banner-mock">
                        <?php do_action( 'hs_render_ad_slot', 'single_top' ); ?>
                    </div>
                </div>

                <?php if ( has_post_thumbnail() ) : ?>
                    <div class="hs-single-featured-image-wrap">
                        <?php the_post_thumbnail( 'large', array( 'class' => 'hs-single-featured-img' ) ); ?>
                    </div>
                <?php endif; ?>

                <!-- The Actual Content -->
                <div class="hs-article-body entry-content">
                    <?php the_content(); ?>
                </div>

                <!-- AdSlot Bottom -->
                <div class="hs-ad-slot-container">
                    <span class="hs-ad-label">Advertisement</span>
                    <div class="hs-ad-banner-mock">
                        <?php do_action( 'hs_render_ad_slot', 'single_bottom' ); ?>
                    </div>
                </div>

                <!-- Author Bio Box -->
                <div class="hs-author-box hs-cyber-card">
                    <div class="hs-author-avatar-lg">🛡️</div>
                    <div class="hs-author-info">
                        <h4 class="hs-author-name-lg"><?php the_author(); ?></h4>
                        <p class="hs-author-bio">
                            Senior Cybersecurity Researcher &amp; Engineering Faculty at <strong>HackersShikkhok</strong>. Focused on defensive architecture, secure coding, and ethical security systems.
                        </p>
                        <a href="https://hackersshikkhok.com" class="hs-author-link">Official Portal: https://hackersshikkhok.com &rarr;</a>
                    </div>
                </div>

                <!-- Prev / Next Post Navigation -->
                <nav class="hs-post-nav" aria-label="Post Navigation">
                    <div class="hs-nav-prev">
                        <?php previous_post_link( '%link', '&larr; Previous: %title' ); ?>
                    </div>
                    <div class="hs-nav-next">
                        <?php next_post_link( '%link', 'Next: %title &rarr;' ); ?>
                    </div>
                </nav>

                <!-- Comments -->
                <?php
                if ( comments_open() || get_comments_number() ) :
                    comments_template();
                endif;
                ?>

            </article>

            <!-- Right Sticky Sidebar -->
            <?php get_sidebar(); ?>

        </div>

    </main>
    <?php
endwhile;

get_footer();
