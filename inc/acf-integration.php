<?php
/**
 * ACF Integration Functions
 *
 * @package AZBlocks_Modular_Modal
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class for handling ACF integration
 */
class AZBlocks_Modular_Modal_ACF {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_filter('acf/settings/save_json', array($this, 'acf_json_save_point'));
        add_filter('acf/settings/load_json', array($this, 'acf_json_load_point'));
    }
    
    /**
     * Set custom ACF JSON save point
     */
    public function acf_json_save_point($path) {
        return AZBLOCKS_MODULAR_MODAL_PLUGIN_DIR . 'acf-json';
    }
    
    /**
     * Set custom ACF JSON load point
     */
    public function acf_json_load_point($paths) {
        // Add plugin path to load ACF fields
        $paths[] = AZBLOCKS_MODULAR_MODAL_PLUGIN_DIR . 'acf-json';
        
        return $paths;
    }
}

/**
 * Helper function to get ACF field with fallback
 */
function azblocks_get_field_with_fallback($field_name, $fallback = '', $post_id = null) {
    if (function_exists('get_field')) {
        $value = get_field($field_name, $post_id);
        return $value ? $value : $fallback;
    }
    return $fallback;
}

/**
 * Helper function to get button text with priority fallbacks
 */
function azblocks_get_button_text($attributes = array()) {
    // Priority 1: Block attribute
    if (isset($attributes['buttonText']) && !empty($attributes['buttonText'])) {
        return $attributes['buttonText'];
    }
    
    // Priority 2: ACF field
    $acf_value = azblocks_get_field_with_fallback('button_text');
    if (!empty($acf_value)) {
        return $acf_value;
    }
    
    // Priority 3: Default fallback
    return esc_html__('Click me', 'azblocks-modular-modal');
}

/**
 * Helper function to get modal title with priority fallbacks
 */
function azblocks_get_modal_title($attributes = array()) {
    // Priority 1: Block attribute
    if (isset($attributes['modalTitle']) && !empty($attributes['modalTitle'])) {
        return $attributes['modalTitle'];
    }
    
    // Priority 2: ACF field
    $acf_value = azblocks_get_field_with_fallback('modal_title');
    if (!empty($acf_value)) {
        return $acf_value;
    }
    
    // Priority 3: Default fallback
    return esc_html__('Request a demo', 'azblocks-modular-modal');
}

/**
 * Helper function to get button URL with priority fallbacks
 */
function azblocks_get_button_url($attributes = array()) {
    // Priority 1: Block attribute
    if (isset($attributes['buttonUrl']) && !empty($attributes['buttonUrl'])) {
        return $attributes['buttonUrl'];
    }
    
    // Priority 2: ACF field
    $acf_value = azblocks_get_field_with_fallback('modal_link');
    if (!empty($acf_value)) {
        return $acf_value;
    }
    
    // Priority 3: Default fallback
    return '#';
}

/**
 * Helper function to check if modal should be shown
 */
function azblocks_should_show_modal($attributes = array()) {
    // Priority 1: Block attribute
    if (isset($attributes['showModal'])) {
        return $attributes['showModal'];
    }
    
    // Priority 2: ACF field
    $acf_value = azblocks_get_field_with_fallback('toggle');
    if ($acf_value !== null) {
        return (bool) $acf_value;
    }
    
    // Priority 3: Default fallback
    return false;
}
