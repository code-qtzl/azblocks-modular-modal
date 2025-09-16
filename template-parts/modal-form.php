<?php
/**
 * Template part for displaying the modal form
 *
 * @package AZBlocks_Modular_Modal
 */

// Default values
$modal_id = isset($modal_id) ? $modal_id : 'modal';
$modal_class = isset($modal_class) ? $modal_class : 'modal';
$modal_title = isset($modal_title) ? $modal_title : esc_html__('Request a demo', 'azblocks-modular-modal');
?>

<form id="modal-form">
	<div class="form-group first-name">
		<label for="first_name"><?php esc_html_e('First Name', 'azblocks-modular-modal'); ?></label>
		<input type="text" name="first_name" id="first_name" required />
	</div>

	<div class="form-group last-name">
		<label for="last_name"><?php esc_html_e('Last Name', 'azblocks-modular-modal'); ?></label>
		<input type="text" name="last_name" id="last_name" required />
	</div>

	<div class="form-group organization-type">
		<label for="organization_type"><?php esc_html_e('Organization Type', 'azblocks-modular-modal'); ?></label>
		<select name="organization_type" id="organization_type" required>
			<option value=""><?php esc_html_e('Select...', 'azblocks-modular-modal'); ?></option>
			<option value="business"><?php esc_html_e('Business', 'azblocks-modular-modal'); ?></option>
			<option value="nonprofit"><?php esc_html_e('Nonprofit', 'azblocks-modular-modal'); ?></option>
			<option value="education"><?php esc_html_e('Education', 'azblocks-modular-modal'); ?></option>
			<option value="other"><?php esc_html_e('Other', 'azblocks-modular-modal'); ?></option>
		</select>
	</div>

	<div class="form-group how-hear">
		<label for="how_did_you_hear_about_us"><?php esc_html_e('How did you hear about us?', 'azblocks-modular-modal'); ?></label>
		<input type="text" name="how_did_you_hear_about_us" id="how_did_you_hear_about_us" required />
	</div>

	<div class="form-group tailor-demo">
		<label for="help_us_tailor_the_demo_to_your_needs"><?php esc_html_e('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pellentesque justo vel turpis fringilla ullamcorper. Etiam auctor felis lorem.', 'azblocks-modular-modal'); ?></label>
		<textarea name="help_us_tailor_the_demo_to_your_needs" id="help_us_tailor_the_demo_to_your_needs"></textarea>
	</div>

	<div class="privacy">
		<input type="checkbox" name="privacy_policy" id="privacy" />
		<label for="privacy">
			<?php esc_html_e('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pellentesque justo vel turpis fringilla ullamcorper. Etiam auctor felis lorem, in ultricies felis rutrum non.', 'azblocks-modular-modal'); ?>
			<a href="#" rel="noopener noreferrer"><?php esc_html_e('Lorem ipsum', 'azblocks-modular-modal'); ?></a>.
		</label>
	</div>

	<div class="button-group submit-btn">
		<button type="submit" id="request-demo-btn"><?php esc_html_e('Request demo', 'azblocks-modular-modal'); ?></button>
	</div>
</form>
