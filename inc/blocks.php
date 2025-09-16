<?php
/**
 * Block Registration and Management
 *
 * @package AZBlocks_Modular_Modal
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class for handling block registration
 */
class AZBlocks_Modular_Modal_Blocks {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_action('init', array($this, 'register_blocks'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_block_editor_assets'));
    }
    
    /**
     * Register custom blocks
     */
    public function register_blocks() {
        // Check if WordPress supports block registration
        if (!function_exists('register_block_type')) {
            return;
        }

        // Modern WordPress block registration
        if (function_exists('wp_register_block_types_from_metadata_collection')) {
            wp_register_block_types_from_metadata_collection(
                AZBLOCKS_MODULAR_MODAL_BUILD_DIR,
                AZBLOCKS_MODULAR_MODAL_BUILD_DIR . 'blocks-manifest.php'
            );
            return;
        }

        // Fallback for older WordPress versions
        if (function_exists('wp_register_block_metadata_collection')) {
            wp_register_block_metadata_collection(
                AZBLOCKS_MODULAR_MODAL_BUILD_DIR,
                AZBLOCKS_MODULAR_MODAL_BUILD_DIR . 'blocks-manifest.php'
            );
        }

        // Manual registration as final fallback
        $manifest_file = AZBLOCKS_MODULAR_MODAL_BUILD_DIR . 'blocks-manifest.php';
        if (file_exists($manifest_file)) {
            $manifest_data = require $manifest_file;
            foreach (array_keys($manifest_data) as $block_type) {
                register_block_type(AZBLOCKS_MODULAR_MODAL_BUILD_DIR . $block_type);
            }
        }
    }
    
    /**
     * Enqueue block editor assets
     */
    public function enqueue_block_editor_assets() {
        $asset_file = AZBLOCKS_MODULAR_MODAL_BUILD_DIR . 'index.asset.php';
        
        // Get asset dependencies
        $asset = file_exists($asset_file) ? require $asset_file : array(
            'dependencies' => array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'),
            'version' => AZBLOCKS_MODULAR_MODAL_VERSION
        );
        
        wp_enqueue_script(
            'azblocks-modular-modal-editor-script',
            AZBLOCKS_MODULAR_MODAL_BUILD_URL . 'index.js',
            $asset['dependencies'],
            $asset['version'],
            true
        );
        
        // Enqueue editor styles if they exist
        if (file_exists(AZBLOCKS_MODULAR_MODAL_BUILD_DIR . 'index.css')) {
            wp_enqueue_style(
                'azblocks-modular-modal-editor-style',
                AZBLOCKS_MODULAR_MODAL_BUILD_URL . 'index.css',
                array(),
                $asset['version']
            );
        }
    }
}
