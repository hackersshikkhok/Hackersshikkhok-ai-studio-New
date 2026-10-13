<?php
/**
 * Template Name: HTML Master Sitemap & Architecture Directory
 * Description: Human-friendly and AI-readable comprehensive directory of all tools, courses, centers and hubs.
 * Package: HackersShikkhok Theme
 */

get_header();
?>
<main id="primary" class="hs-sitemap-page" style="background:#050811; color:#f8fafc; min-height:100vh; padding:50px 20px;">
    <div style="max-w:1200px; margin:0 auto; max-width:1200px;">
        <div style="text-align:center; margin-bottom:50px;">
            <div style="display:inline-block; padding:6px 16px; border-radius:9999px; background:rgba(0,245,212,0.1); border:1px solid rgba(0,245,212,0.3); color:#00f5d4; font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin-bottom:15px;">
                🗺️ Full Architecture & Crawl Directory
            </div>
            <h1 style="font-size:36px; font-weight:900; background:linear-gradient(to right, #00f5d4, #7c3aed, #ff3366); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:15px;">
                ওয়েবসাইট মাস্টার সাইটম্যাপ ও ইনডেক্স ডিরেক্টরি
            </h1>
            <p style="font-size:15px; color:#94a3b8; max-width:700px; margin:0 auto;">
                গুগল সার্চ ইঞ্জিন, এআই বট এবং ভিজিটরদের জন্য ওয়েবসাইটের সমস্ত পেজ, হাব, কোর্স এবং টুলস সেন্টারের সম্পূর্ণ ম্যাপিং।
            </p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:24px;">
            <!-- Category 1 -->
            <div style="background:#0b1120; border:1px solid #1e293b; border-radius:16px; padding:24px;">
                <h3 style="font-size:18px; font-weight:800; color:#00f5d4; margin-bottom:15px; border-bottom:1px solid #1e293b; padding-bottom:10px;">
                    🎯 কোর সেন্টার ও একাডেমি
                </h3>
                <ul style="list-style:none; padding:0; margin:0; line-height:2.2; font-size:14px; color:#cbd5e1;">
                    <li><a href="<?php echo esc_url( home_url('/') ); ?>" style="color:#f8fafc; text-decoration:none;">🏠 হোমপেজ ও সাইবার ড্যাশবোর্ড</a></li>
                    <li><a href="<?php echo esc_url( home_url('/academy/') ); ?>" style="color:#00f5d4; text-decoration:none;">🎓 সাইবার ডিফেন্স একাডেমি ও সিটিএফ</a></li>
                    <li><a href="<?php echo esc_url( home_url('/cyber-command/') ); ?>" style="color:#f8fafc; text-decoration:none;">⚡ সাইবার কমান্ড সেন্টার ও থ্রেট ফিড</a></li>
                    <li><a href="<?php echo esc_url( home_url('/tools-lab/') ); ?>" style="color:#f8fafc; text-decoration:none;">🧪 ৫২০+ ডেভেলপার টুলস ল্যাব</a></li>
                    <li><a href="<?php echo esc_url( home_url('/platform-center/') ); ?>" style="color:#00f5d4; text-decoration:none;">🚀 প্ল্যাটফর্ম সেন্টার ও স্টুডিও হাব</a></li>
                    <li><a href="<?php echo esc_url( home_url('/app-maker/') ); ?>" style="color:#f8fafc; text-decoration:none;">📱 ওয়েবসাইট টু অ্যান্ড্রয়েড অ্যাপ মেকার</a></li>
                    <li><a href="<?php echo esc_url( home_url('/verify-certificate/') ); ?>" style="color:#f8fafc; text-decoration:none;">📜 সার্টিফিকেট ভেরিফিকেশন পোর্টাল</a></li>
                </ul>
            </div>

            <!-- Category 2 -->
            <div style="background:#0b1120; border:1px solid #1e293b; border-radius:16px; padding:24px;">
                <h3 style="font-size:18px; font-weight:800; color:#a78bfa; margin-bottom:15px; border-bottom:1px solid #1e293b; padding-bottom:10px;">
                    💼 সার্ভিস ও কনসালটেন্সি
                </h3>
                <ul style="list-style:none; padding:0; margin:0; line-height:2.2; font-size:14px; color:#cbd5e1;">
                    <li><a href="<?php echo esc_url( home_url('/services/') ); ?>" style="color:#a78bfa; text-decoration:none;">🛡️ প্রফেশনাল সিকিউরিটি সার্ভিসেস হাব</a></li>
                    <li><a href="<?php echo esc_url( home_url('/services/#vapt') ); ?>" style="color:#f8fafc; text-decoration:none;">🔍 VAPT ও পেনিট্রেশন টেস্টিং অডিট</a></li>
                    <li><a href="<?php echo esc_url( home_url('/services/#malware') ); ?>" style="color:#f8fafc; text-decoration:none;">🧹 ওয়ার্ডপ্রেস ম্যালওয়্যার ক্লিন সার্ভিস</a></li>
                    <li><a href="<?php echo esc_url( home_url('/services/#hardening') ); ?>" style="color:#f8fafc; text-decoration:none;">☁️ ক্লাউড সার্ভার হার্ডেনিং সলিউশন</a></li>
                    <li><a href="<?php echo esc_url( home_url('/advisory/') ); ?>" style="color:#a78bfa; text-decoration:none;">💡 বিশেষজ্ঞ পরামর্শ ও মেন্টরশিপ সেশন</a></li>
                    <li><a href="<?php echo esc_url( home_url('/advisory/#join') ); ?>" style="color:#f8fafc; text-decoration:none;">🤝 সাইবার অ্যাডভাইজর হিসেবে যোগদান</a></li>
                </ul>
            </div>

            <!-- Category 3 -->
            <div style="background:#0b1120; border:1px solid #1e293b; border-radius:16px; padding:24px;">
                <h3 style="font-size:18px; font-weight:800; color:#ff3366; margin-bottom:15px; border-bottom:1px solid #1e293b; padding-bottom:10px;">
                    ⚖️ লিগ্যাল, পলিসি ও ট্রাস্ট
                </h3>
                <ul style="list-style:none; padding:0; margin:0; line-height:2.2; font-size:14px; color:#cbd5e1;">
                    <li><a href="<?php echo esc_url( home_url('/privacy-policy/') ); ?>" style="color:#ff3366; text-decoration:none;">🔒 প্রাইভেসি পলিসি ও GDPR গ্যারান্টি</a></li>
                    <li><a href="<?php echo esc_url( home_url('/terms/') ); ?>" style="color:#f8fafc; text-decoration:none;">⚖️ ব্যবহারের শর্তাবলী ও এথিক্যাল চার্টার</a></li>
                    <li><a href="<?php echo esc_url( home_url('/disclaimer/') ); ?>" style="color:#f8fafc; text-decoration:none;">⚠️ আইনি ডিসক্লেইমার ও দায়মুক্তি</a></li>
                    <li><a href="<?php echo esc_url( home_url('/dmca/') ); ?>" style="color:#f8fafc; text-decoration:none;">🛡️ DMCA ও কপিরাইট কমপ্লায়েন্স</a></li>
                    <li><a href="<?php echo esc_url( home_url('/llms.txt') ); ?>" style="color:#00f5d4; text-decoration:none;" target="_blank">🤖 LLMs.txt AI নলেজ গ্রাফ</a></li>
                    <li><a href="<?php echo esc_url( home_url('/sitemap.xml') ); ?>" style="color:#f8fafc; text-decoration:none;" target="_blank">📄 XML সাইটম্যাপ (সার্চ ইঞ্জিন বট)</a></li>
                </ul>
            </div>
        </div>
    </div>
</main>
<?php get_footer(); ?>
