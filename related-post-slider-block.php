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
		'render_callback' => 'related_post_slider_block_render_callback'
	));
}

function related_post_slider_block_enqueue_frontend_script($block_attributes)
{
	$script_path       = 'build/frontend.js';
	$script_asset_path = 'build/frontend.asset.php';
	$script_asset      = require($script_asset_path);
	$script_url = plugins_url($script_path, __FILE__);

	[
		'postsPerSlide' => $posts_per_slide,
		'breakpoints' => $breakpoints,
	] = $block_attributes;

	function return_responsive_settings($breakpoint)
	{
		['breakpointSettings' => $breakpoint_settings] = $breakpoint;
		return $breakpoint_settings;
	}

	$slider_settings = [
		'postsPerSlide' => $posts_per_slide,
		'responsive' => array_map('return_responsive_settings', $breakpoints)
	];

	wp_enqueue_script('jquery-slick', $script_url, $script_asset['dependencies'], $script_asset['version'], true);
	wp_add_inline_script('jquery-slick', 'const sliderSettings = ' . json_encode($slider_settings), 'before');
}

function related_post_slider_block_render_callback($block_attributes, $content)
{

	if (!is_admin()) {
		related_post_slider_block_enqueue_frontend_script($block_attributes);
	}

	[
		'totalPostsToShow' => $total_posts_to_show,
		'display' => $display,
	] = $block_attributes;

	[
		'displayFeaturedImage' => $display_featured_image,
		'displayCategory' => $display_category,
		'displayMeta' => $display_meta,
		'displayExcerpt' => $display_excerpt,
		'displayReverseOrder' => $reverse_order
	] = $display;

	$related_posts = new WP_Query(
		array(
			'posts_per_page' => $total_posts_to_show,
			'post_status' => 'publish',
			'post__not_in' => array(get_the_ID()),
			'category__in' => array(get_the_category(get_the_ID())[0]->term_id),
			'order' => $reverse_order ? 'ASC' : 'DESC'
		)
	);

	$wrapper_attributes = get_block_wrapper_attributes();

	$output = '<div ' . $wrapper_attributes . '>';

	if ($related_posts->have_posts()) {
		foreach ($related_posts->posts as $post) {
			$post_id = $post->ID;
			$featured_image = $display_featured_image ? '<a href="' . esc_url(get_permalink($post_id)) . '"> ' .
				wp_get_attachment_image(get_post_thumbnail_id($post_id), 'large', false, array(
					'class' => 'attachment-large size-large featured'
				)) . '</a>' : '';

			$category = $display_category ? '<div class="term">
			<a href="' . esc_url(get_category_link(get_the_category($post_id)[0])) . '">' . esc_html(get_the_category($post_id)[0]->name) . '</a>
			</div>' : '';

			$meta = $display_meta ? '<div class="meta">
			<span class="byline">
			By: <a href="' . esc_url(get_author_posts_url(get_post_field('post_author', $post_id))) . '">' . esc_html(get_the_author_meta('display_name', get_post_field('post_author', $post_id))) . '</a>
			</span>
			&nbsp;
			<span class="posted-on">
			Published: ' . esc_html(get_the_date('Y-m-d', $post_id)) . '
			</span>
			</div>' : '';

			$excerpt = $display_excerpt ? '<div class="excerpt"><p>' . esc_html(substr(get_the_excerpt($post_id), 0, $block_attributes['excerptLength'])) . '...</p></div>' : '';

			$output .= '<div key="' . esc_html($post_id) . '" class="related-post-slider-item"> ' . $featured_image . $category . '
			<h3 class="title"><a href="' . esc_url(get_permalink($post_id)) . '">' . esc_html(get_the_title($post_id)) . '</a></h3> ' . $meta . $excerpt . '
			</div>';
		}
	}
	$output .= '</div>';

	return $output;
}

add_action('init', 'create_block_related_post_slider_block_block_init');
