<?php
/**
 * Hackers শিক্ষক — B2B Security Subscription & Billing Manager
 *
 * Enforces asset target quotas, continuous scanning frequency,
 * and BDT wallet billing entitlements.
 *
 * @package HackersShikkhok\Core\SecuritySaaS
 */

declare(strict_types=1);

namespace HackersShikkhok\Core\SecuritySaaS;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;
use HackersShikkhok\Core\LMS\Wallet_Economy;

final class SubscriptionAndBillingManager {

    public const PLANS = array(
        'starter' => array(
            'title'       => 'Starter Security Tier',
            'title_bn'    => 'স্টার্টার ওয়েবসাইট সিকিউরিটি',
            'price_bdt'   => 1500.00,
            'max_targets' => 3,
            'scan_freq'   => 'weekly',
            'redteam_cred'=> 0,
            'features'    => array( '৩টি ডোমেন বা অ্যাপ স্কোপ', 'সাপ্তাহিক অটো-স্ক্যান', 'SSL & হেডার অডিট', 'পিডিএফ রিপোর্ট ডাউনলোড' ),
        ),
        'business' => array(
            'title'       => 'Business Continuous Defense',
            'title_bn'    => 'বিজনেস কন্টিনিউয়াস ডিফেন্স',
            'price_bdt'   => 4500.00,
            'max_targets' => 10,
            'scan_freq'   => 'daily',
            'redteam_cred'=> 1,
            'features'    => array( '১০টি ডোমেন ও এপিআই স্কোপ', 'দৈনিক অটো-স্ক্যান', 'CVE ও সংবেদনশীল ফাইল ডিটেকশন', 'AI কোড প্যাচিং গাইড', '১টি কোয়ার্টারলি রেড টিম অডিট' ),
        ),
        'enterprise' => array(
            'title'       => 'Enterprise Managed Red Team',
            'title_bn'    => 'এন্টারপ্রাইজ ম্যানেজড রেড টিম',
            'price_bdt'   => 15000.00,
            'max_targets' => 999,
            'scan_freq'   => 'continuous',
            'redteam_cred'=> 5,
            'features'    => array( 'আনলিমিটেড টার্গেট ও সাবডোমেন', 'রিয়েল-টাইম কন্টিনিউয়াস মনিটরিং', 'ডেডিকেটেড ম্যানুয়াল পেনিট্রেশন টেস্টিং', 'SLA গ্যারান্টি ও এক্সিকিউটিভ ওয়ার্কশপ', 'সরাসরি বিশেষজ্ঞ সাপোর্ট' ),
        ),
    );

    public static function rest_get_subscription( WP_REST_Request $request ): WP_REST_Response {
        $user_id = get_current_user_id();
        global $wpdb;
        $table = $wpdb->prefix . 'hs_security_subscriptions';
        $sub   = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM {$table} WHERE user_id = %d", $user_id ), ARRAY_A );

        $current_plan = $sub['plan_tier'] ?? 'starter';
        $wallet = Wallet_Economy::get_wallet( $user_id );

        return new WP_REST_Response( array(
            'success'        => true,
            'subscription'   => $sub,
            'current_plan'   => $current_plan,
            'wallet_balance' => $wallet['balance_bdt'] ?? 0.0,
            'all_plans'      => self::PLANS,
        ), 200 );
    }

    public static function upgrade_plan( int $user_id, string $plan_key ): array {
        if ( ! isset( self::PLANS[$plan_key] ) ) {
            return array( 'success' => false, 'message' => 'অবৈধ প্ল্যান নির্বাচন।' );
        }

        $plan = self::PLANS[$plan_key];
        $wallet = Wallet_Economy::get_wallet( $user_id );

        if ( (float) $wallet['balance_bdt'] < $plan['price_bdt'] ) {
            return array(
                'success' => false,
                'message' => "অপর্যাপ্ত ওয়ালেট ব্যালেন্স। প্ল্যান অ্যাক্টিভ করতে ৳{$plan['price_bdt']} ব্যালেন্স প্রয়োজন।",
            );
        }

        // Deduct from wallet
        Wallet_Economy::debit( $user_id, $plan['price_bdt'], 0, "B2B Security Subscription: {$plan['title']}" );

        global $wpdb;
        $table = $wpdb->prefix . 'hs_security_subscriptions';
        $expires = gmdate( 'Y-m-d H:i:s', strtotime( '+30 days' ) );

        $wpdb->replace(
            $table,
            array(
                'user_id'             => $user_id,
                'plan_tier'           => $plan_key,
                'max_targets'         => $plan['max_targets'],
                'scan_frequency'      => $plan['scan_freq'],
                'automated_retesting' => 1,
                'redteam_credits'     => $plan['redteam_cred'],
                'price_bdt'           => $plan['price_bdt'],
                'expires_at'          => $expires,
                'status'              => 'active',
                'created_at'          => current_time( 'mysql', true ),
            ),
            array( '%d', '%s', '%d', '%s', '%d', '%d', '%f', '%s', '%s', '%s' )
        );

        return array(
            'success' => true,
            'message' => "অভিনন্দন! আপনার {$plan['title_bn']} সফলভাবে সক্রিয় হয়েছে। মেয়াদ: ৩০ দিন।",
        );
    }
}
