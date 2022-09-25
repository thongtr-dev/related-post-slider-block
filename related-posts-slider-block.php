<?php

/**
 * Plugin Name:       Related Posts Slider Block
 * Description:       Related posts block with slider functionality.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Thong Truong
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       related-posts-slider-block
 *
 * @package           create-block
 */

function related_posts_slider_render_callback($block_attributes, $content)
{

	$wrapper_attributtes = get_block_wrapper_attributes();
	return sprintf('<div %1s>%2s</div>', $wrapper_attributtes, 'This is from PHP!');
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_related_posts_slider_block_init()
{
	register_block_type(__DIR__ . '/build', array(
		'render_callback' => 'related_posts_slider_render_callback'
	));
}
add_action('init', 'create_block_related_posts_slider_block_init');
