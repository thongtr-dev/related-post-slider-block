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

function related_posts_slider_render_callback($block_attributes)
{

	$wrapper_attributtes = get_block_wrapper_attributes();

	$args = array(
		'post_status' => 'publish',
		'category_name' => get_the_category(get_the_ID())[0]->name,
		'ignore_sticky_posts' => true,
		'no_found_rows' => true,
		'posts_per_page' => $block_attributes['totalPostsToShow'],
		'order' => $block_attributes['order'],
		'orderBy' => $block_attributes['orderBy']
	);

	$recent_related_posts = new WP_Query($args);

	$li_post = '';

	$post_count = 0;

	$current_post = get_the_ID();

	$exclude = array($current_post);

	if ($recent_related_posts->have_posts()) {
		while ($recent_related_posts->have_posts() && $post_count < $block_attributes['totalPostsToShow']) {
			$recent_related_posts->the_post();

			$li_post .= '<li class="relate-posts-slider-list-item"';

			$current = get_the_ID();

			if (!in_array($current, $exclude)) {
				$post_count++;
				$title = get_the_title();

				$li_post .= sprintf('<a href="%1$s">%2$s</a>', esc_url(get_the_permalink(get_the_ID())), esc_html($title ? $title : __('Untitled', 'related-posts-slider-block')));

				$li_post .= "</li>\n";
			}
		}
	}
	wp_reset_postdata();

	$ul_posts = sprintf('<div %1$s>%2$s</div>', $wrapper_attributtes, $li_post);

	return $ul_posts;
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
