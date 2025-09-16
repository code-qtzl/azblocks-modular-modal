/******/ (() => {
	// webpackBootstrap
	/******/ 'use strict';
	/******/ var __webpack_modules__ = {
		/***/ './src/custom-modal-block/block.json':
			/*!*******************************************!*\
  !*** ./src/custom-modal-block/block.json ***!
  \*******************************************/
			/***/ (module) => {
				module.exports = /*#__PURE__*/ JSON.parse(
					'{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"azblocks-modular-modal/custom-modal-block","version":"1.0.0","title":"Custom Modular Modal","category":"widgets","icon":"smiley","description":"A customizable button that can open a modal with a contact form or navigate to a URL.","keywords":["button","modal","form","contact"],"example":{},"attributes":{"buttonText":{"type":"string","default":"Click me"},"buttonUrl":{"type":"string","default":"#"},"showModal":{"type":"boolean","default":false},"modalTitle":{"type":"string","default":"Custom Modal Title"}},"supports":{"html":false,"background":{"color":true,"text":true},"align":["left","center","right","wide","full"],"spacing":{"padding":true,"margin":true},"custom-fields":true},"textdomain":"custom-modal-block","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js"}',
				);

				/***/
			},

		/***/ './src/custom-modal-block/edit.js':
			/*!****************************************!*\
  !*** ./src/custom-modal-block/edit.js ***!
  \****************************************/
			/***/ (
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.r(__webpack_exports__);
				/* harmony export */ __webpack_require__.d(
					__webpack_exports__,
					{
						/* harmony export */ default: () => /* binding */ Edit,
						/* harmony export */
					},
				);
				/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(/*! react */ 'react');
				/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default =
					/*#__PURE__*/ __webpack_require__.n(
						react__WEBPACK_IMPORTED_MODULE_0__,
					);
				/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						/*! @wordpress/block-editor */ '@wordpress/block-editor',
					);
				/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default =
					/*#__PURE__*/ __webpack_require__.n(
						_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__,
					);
				/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						/*! @wordpress/components */ '@wordpress/components',
					);
				/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default =
					/*#__PURE__*/ __webpack_require__.n(
						_wordpress_components__WEBPACK_IMPORTED_MODULE_2__,
					);
				/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						/*! @wordpress/i18n */ '@wordpress/i18n',
					);
				/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default =
					/*#__PURE__*/ __webpack_require__.n(
						_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__,
					);
				/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						/*! ./editor.scss */ './src/custom-modal-block/editor.scss',
					);
				/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						/*! react/jsx-runtime */ 'react/jsx-runtime',
					);
				/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default =
					/*#__PURE__*/ __webpack_require__.n(
						react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__,
					);

				function Edit({ attributes, setAttributes, isSelected }) {
					// Ensure default values to prevent undefined errors
					const {
						buttonText = 'Click me',
						buttonUrl = '#',
						showModal = false,
						modalTitle = 'Custom Modal Title',
					} = attributes;

					// State for URL input visibility (similar to core button block)
					const [isURLPickerOpen, setIsURLPickerOpen] =
						react__WEBPACK_IMPORTED_MODULE_0___default().useState(
							false,
						);
					const [isEditingURL, setIsEditingURL] =
						react__WEBPACK_IMPORTED_MODULE_0___default().useState(
							false,
						);
					const [isEditingModal, setIsEditingModal] =
						react__WEBPACK_IMPORTED_MODULE_0___default().useState(
							false,
						);

					// Fetch ACF fields for preview (if available)
					// Only runs in editor, not on frontend
					react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(() => {
						// Only fetch if not already set
						if (!buttonText || !modalTitle) {
							// Get post ID from editor context if available
							const postId = wp.data
								.select('core/editor')
								.getCurrentPostId?.();
							if (postId) {
								fetch(`/wp-json/acf/v3/posts/${postId}`)
									.then((res) => res.json())
									.then((data) => {
										if (data.acf) {
											if (
												data.acf.button_text &&
												!buttonText
											) {
												setAttributes({
													buttonText:
														data.acf.button_text,
												});
											}
											if (
												data.acf.modal_title &&
												!modalTitle
											) {
												setAttributes({
													modalTitle:
														data.acf.modal_title,
												});
											}
											if (
												data.acf.modal_link &&
												!buttonUrl
											) {
												setAttributes({
													buttonUrl:
														data.acf.modal_link,
												});
											}
											if (
												typeof data.acf.toggle ===
												'boolean'
											) {
												setAttributes({
													showModal: data.acf.toggle,
												});
											}
										}
									})
									.catch((error) => {
										// Prevent block crash on fetch error
										console.error(
											'ACF fetch error:',
											error,
										);
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
						setAttributes({
							buttonText: newText,
						});
					};

					// Handle URL change
					const handleURLChange = (newURL) => {
						setAttributes({
							buttonUrl: newURL,
						});
					};

					// Simple SVG icons as components
					const LinkIcon = () =>
						/*#__PURE__*/ (0,
						react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
							'svg',
							{
								width: '20',
								height: '20',
								viewBox: '0 0 24 24',
								fill: 'currentColor',
								children: /*#__PURE__*/ (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
									'path',
									{
										d: 'M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7.81l-.54-.54-.83-.83.83-.83.54-.54H13.25c3.04 0 5.5 2.46 5.5 5.5 0 1.85-.91 3.49-2.31 4.52l-.84-.49zM6.21 6.21l-2.42 2.42c-.39.39-.39 1.02 0 1.41l2.42 2.42c.39.39 1.02.39 1.41 0l2.42-2.42c.39-.39.39-1.02 0-1.41L7.62 6.21c-.39-.39-1.02-.39-1.41 0z',
									},
								),
							},
						);
					const LinkOffIcon = () =>
						/*#__PURE__*/ (0,
						react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
							'svg',
							{
								width: '20',
								height: '20',
								viewBox: '0 0 24 24',
								fill: 'currentColor',
								children: /*#__PURE__*/ (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
									'path',
									{
										d: 'M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.43-.98 2.63-2.31 2.96l1.46 1.46C20.88 15.61 22 13.95 22 12c0-2.76-2.24-5-5-5zm-1 4h-2.19l2 2H16zM2 4.27l3.11 3.11C3.29 8.12 2 9.91 2 12c0 2.76 2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1 0-1.59 1.21-2.9 2.76-3.07L8.73 11H8v2h2.73L13 15.27V17h1.73l4.01 4.01 1.41-1.41L3.41 2.86 2 4.27z',
									},
								),
							},
						);
					const ModalIcon = () =>
						/*#__PURE__*/ (0,
						react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
							'svg',
							{
								width: '20',
								height: '20',
								viewBox: '0 0 24 24',
								fill: 'currentColor',
								children: /*#__PURE__*/ (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
									'path',
									{
										d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
									},
								),
							},
						);
					const TitleIcon = () =>
						/*#__PURE__*/ (0,
						react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
							'svg',
							{
								width: '20',
								height: '20',
								viewBox: '0 0 24 24',
								fill: 'currentColor',
								children: /*#__PURE__*/ (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
									'path',
									{
										d: 'M5 4v3h5.5v12h3V7H19V4z',
									},
								),
							},
						);

					// Prevent navigation in the editor when modal is enabled
					const onClickButton = (e) => {
						if (showModal) {
							e.preventDefault();
							setAttributes({
								showModal: true,
							});
						}
					};
					return /*#__PURE__*/ (0,
					react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(
						react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment,
						{
							children: [
								/*#__PURE__*/ (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
									_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockControls,
									{
										children: /*#__PURE__*/ (0,
										react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(
											_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarGroup,
											{
												children: [
													/*#__PURE__*/ (0,
													react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
														_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton,
														{
															icon: buttonUrl
																? /*#__PURE__*/ (0,
																  react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
																		LinkIcon,
																		{},
																  )
																: /*#__PURE__*/ (0,
																  react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
																		LinkOffIcon,
																		{},
																  ),
															title: buttonUrl
																? (0,
																  _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
																		'Edit URL',
																  )
																: (0,
																  _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
																		'Add URL',
																  ),
															onClick:
																toggleURLPicker,
															isActive:
																isEditingURL,
														},
													),
													/*#__PURE__*/ (0,
													react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
														_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton,
														{
															icon: /*#__PURE__*/ (0,
															react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
																ModalIcon,
																{},
															),
															title: (0,
															_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
																'Edit Modal',
															),
															onClick:
																toggleModalEditor,
															isActive:
																isEditingModal,
														},
													),
												],
											},
										),
									},
								),
								/*#__PURE__*/ (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
									_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls,
									{
										children: /*#__PURE__*/ (0,
										react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(
											_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody,
											{
												title: (0,
												_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
													'Button Settings',
												),
												initialOpen: true,
												children: [
													/*#__PURE__*/ (0,
													react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
														_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl,
														{
															label: (0,
															_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
																'Modal Title',
															),
															value:
																modalTitle ||
																'',
															onChange: (val) =>
																setAttributes({
																	modalTitle:
																		val,
																}),
															placeholder:
																safeModalTitle,
															help: (0,
															_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
																'Title displayed in the modal when opened',
															),
														},
													),
													/*#__PURE__*/ (0,
													react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
														_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl,
														{
															label: (0,
															_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
																'Enable Modal',
															),
															checked:
																!!showModal,
															onChange: (val) =>
																setAttributes({
																	showModal:
																		val,
																}),
															help: showModal
																? (0,
																  _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
																		'Button will open a modal instead of navigating to URL',
																  )
																: (0,
																  _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
																		'Button will navigate to the specified URL',
																  ),
														},
													),
												],
											},
										),
									},
								),
								/*#__PURE__*/ (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(
									'div',
									{
										...(0,
										_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)(),
										children: [
											/*#__PURE__*/ (0,
											react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
												'div',
												{
													className:
														'wp-block-buttons',
													children: /*#__PURE__*/ (0,
													react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
														'div',
														{
															className:
																'wp-block-button',
															children:
																/*#__PURE__*/ (0,
																react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
																	_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText,
																	{
																		className:
																			'wp-block-button__link wp-element-button',
																		value: buttonText,
																		onChange:
																			handleButtonTextChange,
																		placeholder:
																			(0,
																			_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
																				'Add text…',
																			),
																		allowedFormats:
																			[],
																		disableLineBreaks: true,
																		style: {
																			backgroundColor:
																				'#ff6600',
																			color: '#fff',
																		},
																		__unstableOnSplitAtEnd:
																			() =>
																				null,
																	},
																),
														},
													),
												},
											),
											isEditingURL &&
												/*#__PURE__*/ (0,
												react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(
													'div',
													{
														style: {
															marginTop: '8px',
															padding: '12px',
															border: '1px solid #ddd',
															borderRadius: '4px',
															backgroundColor:
																'#fff',
														},
														children: [
															/*#__PURE__*/ (0,
															react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
																_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl,
																{
																	label: (0,
																	_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
																		'URL',
																	),
																	value: buttonUrl,
																	onChange:
																		handleURLChange,
																	placeholder:
																		(0,
																		_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
																			'Paste URL or type to search',
																		),
																	__nextHasNoMarginBottom: true,
																},
															),
															/*#__PURE__*/ (0,
															react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(
																'div',
																{
																	style: {
																		marginTop:
																			'8px',
																		display:
																			'flex',
																		gap: '8px',
																	},
																	children: [
																		/*#__PURE__*/ (0,
																		react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
																			_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button,
																			{
																				variant:
																					'primary',
																				onClick:
																					stopEditingURL,
																				size: 'small',
																				children:
																					(0,
																					_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
																						'Apply',
																					),
																			},
																		),
																		/*#__PURE__*/ (0,
																		react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
																			_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button,
																			{
																				variant:
																					'secondary',
																				onClick:
																					stopEditingURL,
																				size: 'small',
																				children:
																					(0,
																					_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
																						'Cancel',
																					),
																			},
																		),
																	],
																},
															),
														],
													},
												),
											isEditingModal &&
												/*#__PURE__*/ (0,
												react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(
													'div',
													{
														style: {
															marginTop: '8px',
															padding: '12px',
															border: '1px solid #ddd',
															borderRadius: '4px',
															backgroundColor:
																'#fff',
															maxWidth: '400px',
														},
														children: [
															/*#__PURE__*/ (0,
															react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(
																'div',
																{
																	style: {
																		marginTop:
																			'1em',
																		marginBottom:
																			'2em',
																	},
																	children: [
																		/*#__PURE__*/ (0,
																		react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
																			'h4',
																			{
																				children:
																					'Edit Modal',
																			},
																		),
																		/*#__PURE__*/ (0,
																		react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
																			_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl,
																			{
																				label: (0,
																				_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
																					'Enable Modal',
																				),
																				checked:
																					!!showModal,
																				onChange:
																					(
																						val,
																					) =>
																						setAttributes(
																							{
																								showModal:
																									val,
																							},
																						),
																				help: showModal
																					? (0,
																					  _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
																							'Button will open a modal instead of navigating to URL',
																					  )
																					: (0,
																					  _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
																							'Button will navigate to the specified URL',
																					  ),
																			},
																		),
																	],
																},
															),
															/*#__PURE__*/ (0,
															react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
																'div',
																{
																	className:
																		!showModal
																			? 'disabled'
																			: '',
																	children:
																		/*#__PURE__*/ (0,
																		react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(
																			_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl,
																			{
																				label: (0,
																				_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(
																					'Modal Title',
																				),
																				value:
																					modalTitle ||
																					'',
																				onChange:
																					(
																						val,
																					) =>
																						setAttributes(
																							{
																								modalTitle:
																									val,
																							},
																						),
																				placeholder:
																					safeModalTitle,
																				disabled:
																					!showModal,
																				__nextHasNoMarginBottom: true,
																			},
																		),
																},
															),
														],
													},
												),
										],
									},
								),
							],
						},
					);
				}

				/***/
			},

		/***/ './src/custom-modal-block/editor.scss':
			/*!********************************************!*\
  !*** ./src/custom-modal-block/editor.scss ***!
  \********************************************/
			/***/ (
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.r(__webpack_exports__);
				// extracted by mini-css-extract-plugin

				/***/
			},

		/***/ './src/custom-modal-block/index.js':
			/*!*****************************************!*\
  !*** ./src/custom-modal-block/index.js ***!
  \*****************************************/
			/***/ (
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.r(__webpack_exports__);
				/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						/*! @wordpress/blocks */ '@wordpress/blocks',
					);
				/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default =
					/*#__PURE__*/ __webpack_require__.n(
						_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__,
					);
				/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						/*! ./style.scss */ './src/custom-modal-block/style.scss',
					);
				/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						/*! ./edit */ './src/custom-modal-block/edit.js',
					);
				/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						/*! ./block.json */ './src/custom-modal-block/block.json',
					);
				/**
				 * Registers a new block provided a unique name and an object defining its behavior.
				 *
				 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
				 */

				/**
				 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
				 * All files containing `style` keyword are bundled together. The code used
				 * gets applied both to the front of your site and to the editor.
				 *
				 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
				 */

				/**
				 * Internal dependencies
				 */

				/**
				 * Every block starts by registering a new block type definition.
				 *
				 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
				 */
				(0,
				_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(
					_block_json__WEBPACK_IMPORTED_MODULE_3__.name,
					{
						/**
						 * @see ./edit.js
						 */
						edit: _edit__WEBPACK_IMPORTED_MODULE_2__['default'],
						save: () => null,
					},
				);

				/***/
			},

		/***/ './src/custom-modal-block/style.scss':
			/*!*******************************************!*\
  !*** ./src/custom-modal-block/style.scss ***!
  \*******************************************/
			/***/ (
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.r(__webpack_exports__);
				// extracted by mini-css-extract-plugin

				/***/
			},

		/***/ '@wordpress/block-editor':
			/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
			/***/ (module) => {
				module.exports = window['wp']['blockEditor'];

				/***/
			},

		/***/ '@wordpress/blocks':
			/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
			/***/ (module) => {
				module.exports = window['wp']['blocks'];

				/***/
			},

		/***/ '@wordpress/components':
			/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
			/***/ (module) => {
				module.exports = window['wp']['components'];

				/***/
			},

		/***/ '@wordpress/i18n':
			/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
			/***/ (module) => {
				module.exports = window['wp']['i18n'];

				/***/
			},

		/***/ react:
			/*!************************!*\
  !*** external "React" ***!
  \************************/
			/***/ (module) => {
				module.exports = window['React'];

				/***/
			},

		/***/ 'react/jsx-runtime':
			/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
			/***/ (module) => {
				module.exports = window['ReactJSXRuntime'];

				/***/
			},

		/******/
	};
	/************************************************************************/
	/******/ // The module cache
	/******/ var __webpack_module_cache__ = {};
	/******/
	/******/ // The require function
	/******/ function __webpack_require__(moduleId) {
		/******/ // Check if module is in cache
		/******/ var cachedModule = __webpack_module_cache__[moduleId];
		/******/ if (cachedModule !== undefined) {
			/******/ return cachedModule.exports;
			/******/
		}
		/******/ // Create a new module (and put it into the cache)
		/******/ var module = (__webpack_module_cache__[moduleId] = {
			/******/ // no module.id needed
			/******/ // no module.loaded needed
			/******/ exports: {},
			/******/
		});
		/******/
		/******/ // Execute the module function
		/******/ __webpack_modules__[moduleId](
			module,
			module.exports,
			__webpack_require__,
		);
		/******/
		/******/ // Return the exports of the module
		/******/ return module.exports;
		/******/
	}
	/******/
	/******/ // expose the modules object (__webpack_modules__)
	/******/ __webpack_require__.m = __webpack_modules__;
	/******/
	/************************************************************************/
	/******/ /* webpack/runtime/chunk loaded */
	/******/ (() => {
		/******/ var deferred = [];
		/******/ __webpack_require__.O = (result, chunkIds, fn, priority) => {
			/******/ if (chunkIds) {
				/******/ priority = priority || 0;
				/******/ for (
					var i = deferred.length;
					i > 0 && deferred[i - 1][2] > priority;
					i--
				)
					deferred[i] = deferred[i - 1];
				/******/ deferred[i] = [chunkIds, fn, priority];
				/******/ return;
				/******/
			}
			/******/ var notFulfilled = Infinity;
			/******/ for (var i = 0; i < deferred.length; i++) {
				/******/ var [chunkIds, fn, priority] = deferred[i];
				/******/ var fulfilled = true;
				/******/ for (var j = 0; j < chunkIds.length; j++) {
					/******/ if (
						(priority & (1 === 0) || notFulfilled >= priority) &&
						Object.keys(__webpack_require__.O).every((key) =>
							__webpack_require__.O[key](chunkIds[j]),
						)
					) {
						/******/ chunkIds.splice(j--, 1);
						/******/
					} else {
						/******/ fulfilled = false;
						/******/ if (priority < notFulfilled)
							notFulfilled = priority;
						/******/
					}
					/******/
				}
				/******/ if (fulfilled) {
					/******/ deferred.splice(i--, 1);
					/******/ var r = fn();
					/******/ if (r !== undefined) result = r;
					/******/
				}
				/******/
			}
			/******/ return result;
			/******/
		};
		/******/
	})();
	/******/
	/******/ /* webpack/runtime/compat get default export */
	/******/ (() => {
		/******/ // getDefaultExport function for compatibility with non-harmony modules
		/******/ __webpack_require__.n = (module) => {
			/******/ var getter =
				module && module.__esModule
					? /******/ () => module['default']
					: /******/ () => module;
			/******/ __webpack_require__.d(getter, { a: getter });
			/******/ return getter;
			/******/
		};
		/******/
	})();
	/******/
	/******/ /* webpack/runtime/define property getters */
	/******/ (() => {
		/******/ // define getter functions for harmony exports
		/******/ __webpack_require__.d = (exports, definition) => {
			/******/ for (var key in definition) {
				/******/ if (
					__webpack_require__.o(definition, key) &&
					!__webpack_require__.o(exports, key)
				) {
					/******/ Object.defineProperty(exports, key, {
						enumerable: true,
						get: definition[key],
					});
					/******/
				}
				/******/
			}
			/******/
		};
		/******/
	})();
	/******/
	/******/ /* webpack/runtime/hasOwnProperty shorthand */
	/******/ (() => {
		/******/ __webpack_require__.o = (obj, prop) =>
			Object.prototype.hasOwnProperty.call(obj, prop);
		/******/
	})();
	/******/
	/******/ /* webpack/runtime/make namespace object */
	/******/ (() => {
		/******/ // define __esModule on exports
		/******/ __webpack_require__.r = (exports) => {
			/******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
				/******/ Object.defineProperty(exports, Symbol.toStringTag, {
					value: 'Module',
				});
				/******/
			}
			/******/ Object.defineProperty(exports, '__esModule', {
				value: true,
			});
			/******/
		};
		/******/
	})();
	/******/
	/******/ /* webpack/runtime/jsonp chunk loading */
	/******/ (() => {
		/******/ // no baseURI
		/******/
		/******/ // object to store loaded and loading chunks
		/******/ // undefined = chunk not loaded, null = chunk preloaded/prefetched
		/******/ // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
		/******/ var installedChunks = {
			/******/ 'custom-modal-block/index': 0,
			/******/ 'custom-modal-block/style-index': 0,
			/******/
		};
		/******/
		/******/ // no chunk on demand loading
		/******/
		/******/ // no prefetching
		/******/
		/******/ // no preloaded
		/******/
		/******/ // no HMR
		/******/
		/******/ // no HMR manifest
		/******/
		/******/ __webpack_require__.O.j = (chunkId) =>
			installedChunks[chunkId] === 0;
		/******/
		/******/ // install a JSONP callback for chunk loading
		/******/ var webpackJsonpCallback = (
			parentChunkLoadingFunction,
			data,
		) => {
			/******/ var [chunkIds, moreModules, runtime] = data;
			/******/ // add "moreModules" to the modules object,
			/******/ // then flag all "chunkIds" as loaded and fire callback
			/******/ var moduleId,
				chunkId,
				i = 0;
			/******/ if (chunkIds.some((id) => installedChunks[id] !== 0)) {
				/******/ for (moduleId in moreModules) {
					/******/ if (__webpack_require__.o(moreModules, moduleId)) {
						/******/ __webpack_require__.m[moduleId] =
							moreModules[moduleId];
						/******/
					}
					/******/
				}
				/******/ if (runtime) var result = runtime(__webpack_require__);
				/******/
			}
			/******/ if (parentChunkLoadingFunction)
				parentChunkLoadingFunction(data);
			/******/ for (; i < chunkIds.length; i++) {
				/******/ chunkId = chunkIds[i];
				/******/ if (
					__webpack_require__.o(installedChunks, chunkId) &&
					installedChunks[chunkId]
				) {
					/******/ installedChunks[chunkId][0]();
					/******/
				}
				/******/ installedChunks[chunkId] = 0;
				/******/
			}
			/******/ return __webpack_require__.O(result);
			/******/
		};
		/******/
		/******/ var chunkLoadingGlobal = (globalThis[
			'webpackChunkcustom_modal_block'
		] = globalThis['webpackChunkcustom_modal_block'] || []);
		/******/ chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
		/******/ chunkLoadingGlobal.push = webpackJsonpCallback.bind(
			null,
			chunkLoadingGlobal.push.bind(chunkLoadingGlobal),
		);
		/******/
	})();
	/******/
	/************************************************************************/
	/******/
	/******/ // startup
	/******/ // Load entry module and return exports
	/******/ // This entry module depends on other loaded chunks and execution need to be delayed
	/******/ var __webpack_exports__ = __webpack_require__.O(
		undefined,
		['custom-modal-block/style-index'],
		() => __webpack_require__('./src/custom-modal-block/index.js'),
	);
	/******/ __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
	/******/
	/******/
})();
//# sourceMappingURL=index.js.map
