<?php
// This file is generated. Do not modify it manually.
return array(
	'custom-modal-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'azblocks-modular-modal/custom-modal-block',
		'version' => '1.0.0',
		'title' => 'Custom Modular Modal',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'A customizable button that can open a modal with a contact form or navigate to a URL.',
		'keywords' => array(
			'button',
			'modal',
			'form',
			'contact'
		),
		'example' => array(
			
		),
		'attributes' => array(
			'buttonText' => array(
				'type' => 'string',
				'default' => 'Click me'
			),
			'buttonUrl' => array(
				'type' => 'string',
				'default' => '#'
			),
			'showModal' => array(
				'type' => 'boolean',
				'default' => false
			),
			'modalTitle' => array(
				'type' => 'string',
				'default' => 'Custom Modal Title'
			)
		),
		'supports' => array(
			'html' => false,
			'background' => array(
				'color' => true,
				'text' => true
			),
			'align' => array(
				'left',
				'center',
				'right',
				'wide',
				'full'
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'custom-fields' => true
		),
		'textdomain' => 'custom-modal-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	)
);
