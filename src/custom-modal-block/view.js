/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

document.addEventListener("DOMContentLoaded", function () {
	var trigger = document.getElementById("azblocks-custom-modal-block-trigger");
	var modal = document.getElementById("modal");
	var closeBtn = document.getElementById("modal-close");

	// Only add modal functionality if both trigger and modal exist
	// This means the modal is enabled
	if (trigger && modal) {
		// Only add click listener if it's a button (modal mode)
		// Don't interfere with links (normal mode)
		if (trigger.tagName.toLowerCase() === "button") {
			trigger.addEventListener("click", function () {
				modal.style.display = "block";
			});
		}
	}

	// Modal close functionality (only if modal exists)
	if (closeBtn && modal) {
		closeBtn.addEventListener("click", function () {
			modal.style.display = "none";
		});
	}

	// Click outside to close modal (only if modal exists)
	if (modal) {
		document.addEventListener("click", function (event) {
			if (event.target === modal) {
				modal.style.display = "none";
			}
		});
	}

	// Form submission handling (only if form and modal exist)
	var form = document.getElementById("modal-form");
	if (form && modal) {
		form.addEventListener("submit", function (e) {
			e.preventDefault();
			alert("Form submitted!");
			modal.style.display = "none";
		});
	}
});
