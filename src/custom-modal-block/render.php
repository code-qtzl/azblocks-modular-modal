<?php
/**
 * Render template for custom-modal-block block
 *
 * @package AZBlocks_Modular_Modal
 */

// Modal configuration
$show_modal = isset($attributes['showModal']) ? $attributes['showModal'] : false;
$modal_id = 'modal';
$modal_class = 'modal';

// Get values using helper functions from ACF integration
$modal_title = azblocks_get_modal_title($attributes);
$button_text = azblocks_get_button_text($attributes);
$modal_link = azblocks_get_button_url($attributes);
$toggle = azblocks_should_show_modal($attributes);
?>
<div class="custom-modal-block-container" <?php echo get_block_wrapper_attributes(); ?>>
	<div class="wp-block-buttons">
		<div class="wp-block-button">
			<?php if ($toggle) : ?>
				<!-- Modal trigger button -->
				<button 
					id="azblocks-custom-modal-block-trigger" 
					class="wp-block-button__link wp-element-button"
					style="background-color: #ff6600; color: #fff;"
					type="button"
				>
					<?php echo esc_html($button_text); ?>
				</button>
			<?php else : ?>
				<!-- Regular link button -->
				<a 
					href="<?php echo esc_url($modal_link); ?>" 
					class="wp-block-button__link wp-element-button"
					style="background-color: #ff6600; color: #fff;"
				>
					<?php echo esc_html($button_text); ?>
				</a>
			<?php endif; ?>
		</div>
	</div>
</div>

<?php if ($toggle) : ?>
	<?php
		// Prepare modal content using template part
		ob_start();
		include AZBLOCKS_MODULAR_MODAL_PLUGIN_DIR . 'template-parts/modal-form.php';
		$modal_content = ob_get_clean();
		
		// Set variables for modal container
		$modal_id = 'modal';
		$modal_class = 'modal';
		$modal_title = $modal_title;
		$modal_content = $modal_content;
		
		// Include modal container template
		include AZBLOCKS_MODULAR_MODAL_PLUGIN_DIR . 'template-parts/modal-container.php';
	?>
<?php endif; ?>
