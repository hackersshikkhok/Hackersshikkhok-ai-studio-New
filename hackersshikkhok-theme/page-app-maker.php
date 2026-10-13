<?php
/**
 * Template Name: Website to Android App Maker
 * Description: Instant website and WordPress to Android Studio native project generator.
 * Package: HackersShikkhok Theme
 */

get_header();
?>
<main id="primary" class="hs-app-maker-page" style="background:#050811; color:#f8fafc; min-height:100vh; padding:40px 20px;">
    <div style="max-w:1200px; margin:0 auto; max-width:1200px;">
        <div style="text-align:center; margin-bottom:40px;">
            <div style="display:inline-block; padding:6px 16px; border-radius:9999px; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); color:#f59e0b; font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin-bottom:15px;">
                📱 Native Android Studio Project Generator
            </div>
            <h1 style="font-size:36px; font-weight:900; background:linear-gradient(to right, #f59e0b, #00f5d4, #7c3aed); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:15px;">
                ওয়েবসাইট ও ওয়ার্ডপ্রেস টু অ্যান্ড্রয়েড অ্যাপ মেকার
            </h1>
            <p style="font-size:15px; color:#94a3b8; max-width:750px; margin:0 auto; line-height:1.7;">
                আপনার ওয়ার্ডপ্রেস সাইট বা ওয়েবসাইটের URL লিখুন এবং ৬০ সেকেন্ডের মধ্যে প্রোডাকশন-রেডি Android Studio Java সোর্স কোড (MainActivity.java, AndroidManifest.xml, build.gradle) সম্পূর্ণ ফ্রিতে ডাউনলোড করুন।
            </p>
        </div>

        <!-- Render Hub -->
        <?php echo do_shortcode('[hs_center_hub]'); ?>
    </div>
</main>
<?php get_footer(); ?>
