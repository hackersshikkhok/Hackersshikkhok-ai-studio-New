<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Core;

use HackersShikkhok\Core\PostTypes\PostTypeRegistrar;
use HackersShikkhok\Core\Taxonomies\TaxonomyRegistrar;
use HackersShikkhok\Core\Centers\CenterManager;
use HackersShikkhok\Core\Code\CodeLibrary;
use HackersShikkhok\Core\Demo\LiveDemo;
use HackersShikkhok\Core\Tools\ToolsEngine;
use HackersShikkhok\Core\Tools\CssRgbLab;
use HackersShikkhok\Core\Tools\AdvancedWebToolsSuite;
use HackersShikkhok\Core\AI\UniversalAutopilotEngine;
use HackersShikkhok\Core\AI\ApiRotationManager;
use HackersShikkhok\Core\AI\BotEcosystem;
use HackersShikkhok\Core\AI\AiTutorEngine;
use HackersShikkhok\Core\SEO\SeoEngine;
use HackersShikkhok\Core\SEO\NativeSeoAndSitemapEngine;
use HackersShikkhok\Core\SEO\GlobalTechnicalSeoEngine;
use HackersShikkhok\Core\SEO\MultilingualSitemapEngine;
use HackersShikkhok\Core\SEO\InternalLinker;
use HackersShikkhok\Core\Localization\TranslationLedger;
use HackersShikkhok\Core\SecuritySaaS\SecurityIntelligenceEngine;
use HackersShikkhok\Core\Integrations\NativeGoogleAndAdsEngine;
use HackersShikkhok\Core\Email\NativeBrandedEmailEngine;
use HackersShikkhok\Core\Auth\NativeBrandedAuthEngine;
use HackersShikkhok\Core\Editor\NativeClassicEditorEngine;
use HackersShikkhok\Core\Academy\CyberAcademyLmsEngine;
use HackersShikkhok\Core\Academy\CourseContentImporter;
use HackersShikkhok\Core\LMS\Course_Manager;
use HackersShikkhok\Core\LMS\CTF_Engine;
use HackersShikkhok\Core\LMS\SVG_Annotator;
use HackersShikkhok\Core\LMS\Bulk_Course_Importer;
use HackersShikkhok\Core\LMS\Theming_Engine;
use HackersShikkhok\Core\LMS\Certificate_Engine;
use HackersShikkhok\Core\LMS\Wallet_Economy;
use HackersShikkhok\Core\LMS\Video_Stream_Shield;
use HackersShikkhok\Core\Security\Content_Protection_Lock;
use HackersShikkhok\Core\AI\Behavioral_Analytics_Engine;
use HackersShikkhok\Core\AI\Autopilot;
use HackersShikkhok\Core\Labs\HardwareAndIotEngine;
use HackersShikkhok\Core\Labs\EngineeringAndCncLab;
use HackersShikkhok\Core\Labs\EliteTriPlatformExpansionSuite;
use HackersShikkhok\Core\Labs\LabPeaksControllerStore;
use HackersShikkhok\Core\Community\GamificationAndChallenges;
use HackersShikkhok\Core\Community\BookmarksAndNotifications;
use HackersShikkhok\Core\Security\SecurityManager;
use HackersShikkhok\Core\Security\SecurityAwarenessDefenseLab;
use HackersShikkhok\Core\SecuritySaaS\SecuritySaaSEngine;
use HackersShikkhok\Core\API\RestController;
use HackersShikkhok\Core\Community\UniversalInteractionEngine;
use HackersShikkhok\Core\Earnings\PostPayCounterEngine;
use HackersShikkhok\Core\Core\UltimateHackersMasterEngine;
use HackersShikkhok\Core\Core\EliteGlobalPlatformEngine;
use HackersShikkhok\Core\Dashboard\ControlCenter;
use HackersShikkhok\Core\Dashboard\PostPayCounterAdmin;

final class Plugin {
    private static ?self $instance = null;

    public static function instance(): self {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private static function safe_boot( string $name, callable $callback ): void {
        try {
            call_user_func( $callback );
        } catch ( \Throwable $e ) {
            DiagnosticInspector::log_system_error( $name, $e );
        }
    }

    public function boot(): void {
        // Diagnostic Inspector & Error Logger must always boot first
        DiagnosticInspector::register();
        self::safe_boot( "Database", array( Database::class, "register" ) );

        self::safe_boot( "SecurityManager", array( SecurityManager::class, "register" ) );
        self::safe_boot( "SecurityAwarenessDefenseLab", array( SecurityAwarenessDefenseLab::class, "register" ) );
        self::safe_boot( "SecuritySaaSEngine", array( SecuritySaaSEngine::class, "register" ) );
        self::safe_boot( "PostTypeRegistrar", array( PostTypeRegistrar::class, "register" ) );
        self::safe_boot( "TaxonomyRegistrar", array( TaxonomyRegistrar::class, "register" ) );
        self::safe_boot( "CenterManager", array( CenterManager::class, "register" ) );
        self::safe_boot( "CodeLibrary", array( CodeLibrary::class, "register" ) );
        self::safe_boot( "LiveDemo", array( LiveDemo::class, "register" ) );
        self::safe_boot( "ToolsEngine", array( ToolsEngine::class, "register" ) );
        self::safe_boot( "CssRgbLab", array( CssRgbLab::class, "register" ) );
        self::safe_boot( "AdvancedWebToolsSuite", array( AdvancedWebToolsSuite::class, "register" ) );
        self::safe_boot( "UniversalAutopilotEngine", array( UniversalAutopilotEngine::class, "register" ) );
        self::safe_boot( "ApiRotationManager", array( ApiRotationManager::class, "register" ) );
        self::safe_boot( "BotEcosystem", array( BotEcosystem::class, "register" ) );
        self::safe_boot( "UniversalInteractionEngine", array( UniversalInteractionEngine::class, "register" ) );
        self::safe_boot( "PostPayCounterEngine", array( PostPayCounterEngine::class, "register" ) );
        self::safe_boot( "TranslationLedger", array( TranslationLedger::class, "register" ) );
        self::safe_boot( "SeoEngine", array( SeoEngine::class, "register" ) );
        self::safe_boot( "NativeSeoAndSitemapEngine", array( NativeSeoAndSitemapEngine::class, "register" ) );
        self::safe_boot( "GlobalTechnicalSeoEngine", array( GlobalTechnicalSeoEngine::class, "register" ) );
        self::safe_boot( "MultilingualSitemapEngine", array( MultilingualSitemapEngine::class, "register" ) );
        self::safe_boot( "SecurityIntelligenceEngine", array( SecurityIntelligenceEngine::class, "register" ) );
        self::safe_boot( "NativeGoogleAndAdsEngine", array( NativeGoogleAndAdsEngine::class, "register" ) );
        self::safe_boot( "NativeBrandedEmailEngine", array( NativeBrandedEmailEngine::class, "register" ) );
        self::safe_boot( "NativeBrandedAuthEngine", array( NativeBrandedAuthEngine::class, "register" ) );
        self::safe_boot( "NativeClassicEditorEngine", array( NativeClassicEditorEngine::class, "register" ) );
        self::safe_boot( "CyberAcademyLmsEngine", array( CyberAcademyLmsEngine::class, "register" ) );
        self::safe_boot( "CourseContentImporter", array( CourseContentImporter::class, "register" ) );
        self::safe_boot( "Course_Manager", array( Course_Manager::class, "register" ) );
        self::safe_boot( "CTF_Engine", array( CTF_Engine::class, "register" ) );
        self::safe_boot( "SVG_Annotator", array( SVG_Annotator::class, "register" ) );
        self::safe_boot( "Bulk_Course_Importer", array( Bulk_Course_Importer::class, "register" ) );
        self::safe_boot( "Theming_Engine", array( Theming_Engine::class, "register" ) );
        self::safe_boot( "Certificate_Engine", array( Certificate_Engine::class, "register" ) );
        self::safe_boot( "Wallet_Economy", array( Wallet_Economy::class, "register" ) );
        self::safe_boot( "Video_Stream_Shield", array( Video_Stream_Shield::class, "register" ) );
        self::safe_boot( "Content_Protection_Lock", array( Content_Protection_Lock::class, "register" ) );
        self::safe_boot( "Behavioral_Analytics_Engine", array( Behavioral_Analytics_Engine::class, "register" ) );
        self::safe_boot( "Autopilot", array( Autopilot::class, "register" ) );
        self::safe_boot( "HardwareAndIotEngine", array( HardwareAndIotEngine::class, "register" ) );
        self::safe_boot( "EngineeringAndCncLab", array( EngineeringAndCncLab::class, "register" ) );
        self::safe_boot( "EliteTriPlatformExpansionSuite", array( EliteTriPlatformExpansionSuite::class, "register" ) );
        self::safe_boot( "LabPeaksControllerStore", array( LabPeaksControllerStore::class, "register" ) );
        self::safe_boot( "GamificationAndChallenges", array( GamificationAndChallenges::class, "register" ) );
        self::safe_boot( "BookmarksAndNotifications", array( BookmarksAndNotifications::class, "register" ) );
        self::safe_boot( "AiTutorEngine", array( AiTutorEngine::class, "register" ) );
        self::safe_boot( "InternalLinker", array( InternalLinker::class, "register" ) );
        self::safe_boot( "RestController", array( RestController::class, "register" ) );
        self::safe_boot( "UltimateHackersMasterEngine", array( UltimateHackersMasterEngine::class, "register" ) );
        self::safe_boot( "EliteGlobalPlatformEngine", array( EliteGlobalPlatformEngine::class, "register" ) );
        self::safe_boot( "EcosystemControlCenter", array( EcosystemControlCenter::class, "register" ) );

        if ( is_admin() ) {
            self::safe_boot( "ControlCenter", array( ControlCenter::class, "register" ) );
            self::safe_boot( "PostPayCounterAdmin", array( PostPayCounterAdmin::class, "register" ) );
        }
    }
}