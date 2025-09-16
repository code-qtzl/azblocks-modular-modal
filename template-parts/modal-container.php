<?php
/**
 * Template part for displaying a modal container
 *
 * @package AZBlocks_Modular_Modal
 */

// Required variables
$modal_id = isset($modal_id) ? $modal_id : 'modal';
$modal_class = isset($modal_class) ? $modal_class : 'modal';
$modal_title = isset($modal_title) ? $modal_title : esc_html__('Modal Title', 'azblocks-modular-modal');
$modal_content = isset($modal_content) ? $modal_content : '';
?>

<div id="<?php echo esc_attr($modal_id); ?>" class="<?php echo esc_attr($modal_class); ?>" style="display:none;">
	<div class="modal-dialog" aria-hidden="true" role="dialog">
		<div class="modal-content">
			<button class="modal-close" id="modal-close" aria-label="<?php esc_attr_e('Close modal', 'azblocks-modular-modal'); ?>">
				<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
					<path d="m13.06 12 6.47-6.47-1.06-1.06L12 10.94 5.53 4.47 4.47 5.53 10.94 12l-6.47 6.47 1.06 1.06L12 13.06l6.47 6.47 1.06-1.06L13.06 12Z"></path>
				</svg>
			</button>
			<h2 class="modal-title"><?php echo esc_html($modal_title); ?></h2>
			
			<?php echo $modal_content; ?>
		</div>
	</div>
</div>
