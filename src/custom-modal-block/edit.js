import React from 'react';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	RichText,
} from '@wordpress/block-editor';
import {
	TextControl,
	ToggleControl,
	ToolbarGroup,
	ToolbarButton,
	PanelBody,
	Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes, isSelected }) {
	// Ensure default values to prevent undefined errors
	const {
		buttonText = 'Click me',
		buttonUrl = '#',
		showModal = false,
		modalTitle = 'Custom Modal Title',
	} = attributes;

	// State for URL input visibility (similar to core button block)
	const [isURLPickerOpen, setIsURLPickerOpen] = React.useState(false);
	const [isEditingURL, setIsEditingURL] = React.useState(false);
	const [isEditingModal, setIsEditingModal] = React.useState(false);

	// Fetch ACF fields for preview (if available)
	// Only runs in editor, not on frontend
	React.useEffect(() => {
		// Only fetch if not already set
		if (!buttonText || !modalTitle) {
			// Get post ID from editor context if available
			const postId = wp.data.select('core/editor').getCurrentPostId?.();
			if (postId) {
				fetch(`/wp-json/acf/v3/posts/${postId}`)
					.then((res) => res.json())
					.then((data) => {
						if (data.acf) {
							if (data.acf.button_text && !buttonText) {
								setAttributes({
									buttonText: data.acf.button_text,
								});
							}
							if (data.acf.modal_title && !modalTitle) {
								setAttributes({
									modalTitle: data.acf.modal_title,
								});
							}
							if (data.acf.modal_link && !buttonUrl) {
								setAttributes({
									buttonUrl: data.acf.modal_link,
								});
							}
							if (typeof data.acf.toggle === 'boolean') {
								setAttributes({ showModal: data.acf.toggle });
							}
						}
					})
					.catch((error) => {
						// Prevent block crash on fetch error
						console.error('ACF fetch error:', error);
					});
			}
		}
	}, []);
	const safeModalTitle =
		typeof modalTitle === 'string' && modalTitle.length > 0
			? modalTitle
			: 'Custom Modal Title';

	// Handle URL input
	const startEditingURL = () => setIsEditingURL(true);
	const stopEditingURL = () => {
		setIsEditingURL(false);
		setIsURLPickerOpen(false);
	};

	// Toggle URL picker
	const toggleURLPicker = () => {
		setIsURLPickerOpen(!isURLPickerOpen);
		setIsEditingURL(!isURLPickerOpen);
	};

	// Toggle modal editor
	const toggleModalEditor = () => {
		setIsEditingModal(!isEditingModal);
	};

	// Handle button text change
	const handleButtonTextChange = (newText) => {
		setAttributes({ buttonText: newText });
	};

	// Handle URL change
	const handleURLChange = (newURL) => {
		setAttributes({ buttonUrl: newURL });
	};

	// Simple SVG icons as components
	const LinkIcon = () => (
		<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7.81l-.54-.54-.83-.83.83-.83.54-.54H13.25c3.04 0 5.5 2.46 5.5 5.5 0 1.85-.91 3.49-2.31 4.52l-.84-.49zM6.21 6.21l-2.42 2.42c-.39.39-.39 1.02 0 1.41l2.42 2.42c.39.39 1.02.39 1.41 0l2.42-2.42c.39-.39.39-1.02 0-1.41L7.62 6.21c-.39-.39-1.02-.39-1.41 0z' />
		</svg>
	);

	const LinkOffIcon = () => (
		<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.43-.98 2.63-2.31 2.96l1.46 1.46C20.88 15.61 22 13.95 22 12c0-2.76-2.24-5-5-5zm-1 4h-2.19l2 2H16zM2 4.27l3.11 3.11C3.29 8.12 2 9.91 2 12c0 2.76 2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1 0-1.59 1.21-2.9 2.76-3.07L8.73 11H8v2h2.73L13 15.27V17h1.73l4.01 4.01 1.41-1.41L3.41 2.86 2 4.27z' />
		</svg>
	);

	const ModalIcon = () => (
		<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' />
		</svg>
	);

	const TitleIcon = () => (
		<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M5 4v3h5.5v12h3V7H19V4z' />
		</svg>
	);

	// Prevent navigation in the editor when modal is enabled
	const onClickButton = (e) => {
		if (showModal) {
			e.preventDefault();
			setAttributes({ showModal: true });
		}
	};

	return (
		<>
			{/* Block Controls (Toolbar) */}
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={buttonUrl ? <LinkIcon /> : <LinkOffIcon />}
						title={buttonUrl ? __('Edit URL') : __('Add URL')}
						onClick={toggleURLPicker}
						isActive={isEditingURL}
					/>
					<ToolbarButton
						icon={<ModalIcon />}
						title={__('Edit Modal')}
						onClick={toggleModalEditor}
						isActive={isEditingModal}
					/>
				</ToolbarGroup>
			</BlockControls>

			{/* Inspector Controls (Sidebar Panel) */}
			<InspectorControls>
				<PanelBody title={__('Button Settings')} initialOpen={true}>
					<TextControl
						label={__('Modal Title')}
						value={modalTitle || ''}
						onChange={(val) => setAttributes({ modalTitle: val })}
						placeholder={safeModalTitle}
						help={__('Title displayed in the modal when opened')}
					/>
					<ToggleControl
						label={__('Enable Modal')}
						checked={!!showModal}
						onChange={(val) => setAttributes({ showModal: val })}
						help={
							showModal
								? __(
										'Button will open a modal instead of navigating to URL',
								  )
								: __(
										'Button will navigate to the specified URL',
								  )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				{/* Button trigger */}
				<div className='wp-block-buttons'>
					<div className='wp-block-button'>
						<RichText
							className='wp-block-button__link wp-element-button'
							value={buttonText}
							onChange={handleButtonTextChange}
							placeholder={__('Add text…')}
							allowedFormats={[]}
							disableLineBreaks
							style={{
								backgroundColor: '#ff6600',
								color: '#fff',
							}}
							__unstableOnSplitAtEnd={() => null}
						/>
					</div>
				</div>

				{/* URL Input (when editing) */}
				{isEditingURL && (
					<div
						style={{
							marginTop: '8px',
							padding: '12px',
							border: '1px solid #ddd',
							borderRadius: '4px',
							backgroundColor: '#fff',
						}}
					>
						<TextControl
							label={__('URL')}
							value={buttonUrl}
							onChange={handleURLChange}
							placeholder={__('Paste URL or type to search')}
							__nextHasNoMarginBottom
						/>
						<div
							style={{
								marginTop: '8px',
								display: 'flex',
								gap: '8px',
							}}
						>
							<Button
								variant='primary'
								onClick={stopEditingURL}
								size='small'
							>
								{__('Apply')}
							</Button>
							<Button
								variant='secondary'
								onClick={stopEditingURL}
								size='small'
							>
								{__('Cancel')}
							</Button>
						</div>
					</div>
				)}

				{/* Modal Title Input (when editing) */}
				{isEditingModal && (
					<div
						style={{
							marginTop: '8px',
							padding: '12px',
							border: '1px solid #ddd',
							borderRadius: '4px',
							backgroundColor: '#fff',
							maxWidth: '400px',
						}}
					>
						<div style={{ marginTop: '1em', marginBottom: '2em' }}>
							<h4>Edit Modal</h4>
							<ToggleControl
								label={__('Enable Modal')}
								checked={!!showModal}
								onChange={(val) =>
									setAttributes({ showModal: val })
								}
								help={
									showModal
										? __(
												'Button will open a modal instead of navigating to URL',
										  )
										: __(
												'Button will navigate to the specified URL',
										  )
								}
							/>
						</div>
						<div className={!showModal ? 'disabled' : ''}>
							<TextControl
								label={__('Modal Title')}
								value={modalTitle || ''}
								onChange={(val) =>
									setAttributes({ modalTitle: val })
								}
								placeholder={safeModalTitle}
								disabled={!showModal}
								__nextHasNoMarginBottom
							/>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
