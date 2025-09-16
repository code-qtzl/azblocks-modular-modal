<?php
/**
 * Plugin Name: AZ Custom Modular Modal
 * Plugin URI: https://github.com/code-qtzl/azblocks-modular-modal
 * Description: A custom Gutenberg block that creates a button with an optional modal window for ACF integration and customizable form content.
 * Version: 1.0.0
 * Author: Andres Zepeda
 * Author URI: https://azepeda.dev
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: azblocks-modular-modal
 * Domain Path: /languages
 * Requires at least: 6.0
 * Tested up to: 6.6
 * Requires PHP: 7.4
 *
 * @package AZBlocks_Modular_Modal
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('AZBLOCKS_MODULAR_MODAL_VERSION', '1.0.0');
define('AZBLOCKS_MODULAR_MODAL_PLUGIN_FILE', __FILE__);
define('AZBLOCKS_MODULAR_MODAL_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('AZBLOCKS_MODULAR_MODAL_PLUGIN_URL', plugin_dir_url(__FILE__));
define('AZBLOCKS_MODULAR_MODAL_BUILD_DIR', AZBLOCKS_MODULAR_MODAL_PLUGIN_DIR . 'build/');
define('AZBLOCKS_MODULAR_MODAL_BUILD_URL', AZBLOCKS_MODULAR_MODAL_PLUGIN_URL . 'build/');

/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 */
function azblocks_modular_modal_block_init() {
    /**
     * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
     * based on the registered block metadata.
     * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
     */
    if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
        wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
        return;
    }

    /**
     * Registers the block(s) metadata from the `blocks-manifest.php` file.
     * Added to WordPress 6.7 to improve the performance of block type registration.
     */
    if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
        wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
    }
    /**
     * Registers the block type(s) in the `blocks-manifest.php` file.
     */
    $manifest_data = require __DIR__ . '/build/blocks-manifest.php';
    foreach ( array_keys( $manifest_data ) as $block_type ) {
        register_block_type( __DIR__ . "/build/{$block_type}" );
    }
}
add_action( 'init', 'azblocks_modular_modal_block_init' );

/**
 * Main plugin class
 */
class AZBlocks_Modular_Modal {
    
    /**
     * Initialize the plugin
     */
    public function __construct() {
        add_action('plugins_loaded', array($this, 'load_textdomain'));
        
        // Include required files
        $this->includes();
        
        // Register activation and deactivation hooks
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    /**
     * Include required files
     */
    private function includes() {
        require_once AZBLOCKS_MODULAR_MODAL_PLUGIN_DIR . 'inc/acf-integration.php';
        require_once AZBLOCKS_MODULAR_MODAL_PLUGIN_DIR . 'inc/assets.php';
    }
    /**
     * Initialize ACF and Assets components
     */
    public function init() {
        // Initialize ACF integration and assets
        new AZBlocks_Modular_Modal_ACF();
        new AZBlocks_Modular_Modal_Assets();
    }
    
    /**
     * Load plugin textdomain for translations
     */
    public function load_textdomain() {
        load_plugin_textdomain(
            'azblocks-modular-modal',
            false,
            dirname(plugin_basename(__FILE__)) . '/languages/'
        );
    }
    
    /**
     * Plugin activation hook
     */
    public function activate() {
        // Check WordPress version
        if (version_compare(get_bloginfo('version'), '6.0', '<')) {
            deactivate_plugins(plugin_basename(__FILE__));
            wp_die(__('This plugin requires WordPress 6.0 or higher.', 'azblocks-modular-modal'));
        }
        
        // Check PHP version
        if (version_compare(PHP_VERSION, '7.4', '<')) {
            deactivate_plugins(plugin_basename(__FILE__));
            wp_die(__('This plugin requires PHP 7.4 or higher.', 'azblocks-modular-modal'));
        }
        
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Plugin deactivation hook
     */
    public function deactivate() {
        // Flush rewrite rules
        flush_rewrite_rules();
    }
}

// Initialize the plugin
new AZBlocks_Modular_Modal();
