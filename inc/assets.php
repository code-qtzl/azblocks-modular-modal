<?php
/**
 * Assets Management
 *
 * @package AZBlocks_Modular_Modal
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class for handling asset enqueuing
 */
class AZBlocks_Modular_Modal_Assets {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
    }
    
    /**
     * Enqueue frontend styles and scripts
     */
    public function enqueue_frontend_assets() {
        // Only enqueue if the block is being used on the current page
        if (!$this->should_enqueue_assets()) {
            return;
        }
        
        // Enqueue block styles
        $style_file = AZBLOCKS_MODULAR_MODAL_BUILD_DIR . 'style-index.css';
        if (file_exists($style_file)) {
            wp_enqueue_style(
                'azblocks-modular-modal-style',
                AZBLOCKS_MODULAR_MODAL_BUILD_URL . 'style-index.css',
                array(),
                AZBLOCKS_MODULAR_MODAL_VERSION
            );
        }
        
        // Enqueue block frontend script
        $script_asset_file = AZBLOCKS_MODULAR_MODAL_BUILD_DIR . 'view.asset.php';
        $script_file = AZBLOCKS_MODULAR_MODAL_BUILD_DIR . 'view.js';
        
        if (file_exists($script_file)) {
            $asset = file_exists($script_asset_file) ? require $script_asset_file : array(
                'dependencies' => array(),
                'version' => AZBLOCKS_MODULAR_MODAL_VERSION
            );
            
            wp_enqueue_script(
                'azblocks-modular-modal-view',
                AZBLOCKS_MODULAR_MODAL_BUILD_URL . 'view.js',
                $asset['dependencies'],
                $asset['version'],
                true
            );
        }
    }
    
    /**
     * Enqueue admin assets
     */
    public function enqueue_admin_assets($hook) {
        // Only enqueue on post editor pages
        if (!in_array($hook, array('post.php', 'post-new.php'))) {
            return;
        }
        
        // Admin styles if needed
        $admin_style_file = AZBLOCKS_MODULAR_MODAL_PLUGIN_DIR . 'assets/admin.css';
        if (file_exists($admin_style_file)) {
            wp_enqueue_style(
                'azblocks-modular-modal-admin',
                AZBLOCKS_MODULAR_MODAL_PLUGIN_URL . 'assets/admin.css',
                array(),
                AZBLOCKS_MODULAR_MODAL_VERSION
            );
        }
    }
    
    /**
     * Check if assets should be enqueued
     */
    private function should_enqueue_assets() {
        // Always enqueue for now - could be optimized to check if block exists on page
        return true;
        
        // Future optimization: check if the block is actually used on the current page
        // global $post;
        // if (has_block('azblocks-modular-modal/custom-modal-block', $post)) {
        //     return true;
        // }
        // return false;
    }
}
