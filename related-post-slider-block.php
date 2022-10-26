<?php

/**
 * Plugin Name:       Related Post Slider Block
 * Description:       Add related post slider block.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Thong Truong
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       related-post-slider-block
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function create_block_related_post_slider_block_block_init()
{
	register_block_type(__DIR__ . '/build', array(
		'render_callback' => 'related_post_slider_block_render_block_with_attributes'
	));
}

// Copied from @wordpress/dependency-extraction-webpack-plugin docs.
function related_post_slider_block_enqueue_frontend_script()
{
	$style_path       = 'build/index.css';
	$style_url = plugins_url($style_path, __FILE__);
	$script_path = 'build/frontend.js';
	$script_asset_path = 'build/frontend.asset.php';
	$script_asset = require($script_asset_path);
	$script_url = plugins_url($script_path, __FILE__);
	wp_enqueue_style('related-post-slider-block-script-style', $style_url, NULL,  $script_asset['version']);
	wp_enqueue_script('related-post-slider-block-script', $script_url, $script_asset['dependencies'], $script_asset['version']);
}

// Copied from WooCommerce Blocks.
function related_post_slider_block_add_attributes_to_block($attributes = [], $content = '')
{
	$escaped_data_attributes = [];
	foreach ($attributes as $key => $value) {
		if (is_bool($value)) {
			$value = $value ? 'true' : 'false';
		}
		if (!is_scalar($value)) {
			$value = wp_json_encode($value);
		}
		$escaped_data_attributes[] = 'data-' . esc_attr(strtolower(preg_replace('/(?<!\ )[A-Z]/', '-$0', $key))) . '="' . esc_attr($value) . '"';
	}
	return preg_replace('/^<div /', '<div ' . implode(' ', $escaped_data_attributes) . ' ', trim($content));
}

function related_post_slider_block_render_block_with_attributes($attributes = [], $content = '')
{
	if (!is_admin()) {
		related_post_slider_block_enqueue_frontend_script();
	}
	return related_post_slider_block_add_attributes_to_block($attributes, $content);
}

add_action('init', 'create_block_related_post_slider_block_block_init');
