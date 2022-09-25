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

function render_callback($block_attributes, $content)
{
	$recent_posts = wp_get_recent_posts(array(
		'numberposts' => 3,
		'post_status' => 'publish',
	));

	if (count($recent_posts) === 0) {
		return 'No posts';
	}
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
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'create_block_related_posts_slider_block_init');
