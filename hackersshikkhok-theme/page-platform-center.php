<?php
/**
 * Template Name: Platform Center & Studio Hub
 * Description: 3-Column Cyberpunk LMS Stage and Studio Hub for App Maker, Card Maker, Gift Maker, Game Maker.
 * Package: HackersShikkhok Theme
 */

get_header();
?>
<main id="primary" class="hs-platform-center-page" style="background:#050811; color:#f8fafc; min-height:100vh; padding:40px 20px;">
    <div style="max-w:1200px; margin:0 auto; max-width:1200px;">
        <div style="text-align:center; margin-bottom:40px;">
            <div style="display:inline-block; padding:6px 16px; border-radius:9999px; background:rgba(0,245,212,0.1); border:1px solid rgba(0,245,212,0.3); color:#00f5d4; font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin-bottom:15px;">
                🚀 Multi-Studio Platform Center Hub
            </div>
            <h1 style="font-size:36px; font-weight:900; background:linear-gradient(to right, #00f5d4, #7c3aed, #ff3366); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:15px;">
                প্ল্যাটফর্ম সেন্টার ও ক্রিয়েটর স্টুডিও হাব
            </h1>
            <p style="font-size:15px; color:#94a3b8; max-width:750px; margin:0 auto;">
                আপনার ওয়েবসাইটকে অ্যান্ড্রোয়েড অ্যাপ্লিকেশনে রূপান্তর করুন, ডিজিটাল কার্ড, থ্রিডি গিফট বক্স, এইচটিএমএল৫ মিনি-গেম তৈরি করুন ব্রাউজারেই সরাসরি।
            </p>
        </div>

        <!-- Shortcode for interactive platform center -->
        <?php echo do_shortcode('[hs_center_hub]'); ?>
    </div>
</main>
<?php get_footer(); ?>
