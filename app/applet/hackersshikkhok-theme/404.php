<?php
/**
 * 404 Error Page Template - HackersShikkhok
 */

declare(strict_types=1);

get_header();
?>

<main id="primary" class="site-main hs-page-container" style="text-align:center;padding:60px 24px;">
    <div class="hs-cyber-card" style="max-width:760px;margin:0 auto;padding:48px 32px;">
        <span class="hs-card-badge" style="background:rgba(239,68,68,0.2);color:#ef4444;border-color:rgba(239,68,68,0.4);margin:0 auto 16px;">
            ERR_404_PAGE_NOT_FOUND
        </span>
        <h1 style="color:#ffffff;font-size:clamp(2.5rem, 6vw, 4.5rem);font-weight:900;margin:0;letter-spacing:-1px;text-shadow:0 0 20px rgba(239,68,68,0.6);">
            404
        </h1>
        <h2 style="color:#f8fafc;font-size:1.5rem;font-weight:700;margin:12px 0 8px;">
                
        </h2>
        <p style="color:var(--hs-text-muted);font-size:14px;max-width:540px;margin:0 auto 28px;line-height:1.6;">
                 । HackersShikkhok ,        ।
        </p>

        <div style="margin-bottom:32px;">
            <?php get_search_form(); ?>
        </div>

        <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hs-btn-primary">
                🏠   
            </a>
            <a href="<?php echo esc_url( home_url( '/academy/' ) ); ?>" class="hs-btn-secondary">
                🎓  
            </a>
            <a href="<?php echo esc_url( home_url( '/tools/' ) ); ?>" class="hs-btn-secondary">
                ⚡ + 
            </a>
        </div>
    </div>
</main>

<?php
get_footer();
