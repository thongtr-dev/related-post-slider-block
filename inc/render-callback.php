<?php

/**
 * Render the front-end content using render callback function
 * 
 * @link https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/
 */

if (!function_exists('related_posts_slider_render_callback')) {
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

        $li = '';

        $post_count = 0;

        $current_post = get_the_ID();

        $exclude = array($current_post);

        if ($recent_related_posts->have_posts()) {
            while ($recent_related_posts->have_posts() && $post_count < $block_attributes['totalPostsToShow']) {
                $recent_related_posts->the_post();

                $li .= '<li class="relate-posts-slider-list-item">';

                $current = get_the_ID();

                if (!in_array($current, $exclude)) {
                    $post_count++;

                    $post_title = get_the_title();

                    $post_url = esc_url(get_the_permalink(get_the_ID()));

                    $post_thumbnail = related_posts_slider_post_thumbnail();

                    $post_summary = has_excerpt() ? get_the_excerpt() : wp_trim_words(get_the_content(), 20);

                    $post_byline = '<span class="byline">' . related_posts_slider_posted_by_author() . related_posts_slider_posted_by_author_avatar() . '</span>';

                    $posted_on = related_posts_slider_posted_on();

                    $post_categories = get_the_category();
                    $post_category = null;
                    if (!empty($post_categories)) {
                        $post_category = get_the_category()[0]->name;
                    }
                    $post_category_url = esc_url(get_category_link(get_the_category(get_the_ID())[0]));

                    // Thumbnail
                    $li .= sprintf('<a class="post-thumbnail" href="%1$s" aria-hidden="true" tabindex="-1">%2$s</a>', get_the_permalink(), $post_thumbnail);

                    // Title
                    $li .= sprintf('<a href="%1$s">%2$s</a>', $post_url, esc_html($post_title ? $post_title : __('Untitled', 'related-posts-slider-block')));

                    // Category
                    $li .= sprintf('<a href="%1$s">%2$s</a>', $post_category_url, $post_category);

                    // Summary
                    $li .= sprintf('<p>%s</p>', $post_summary);

                    // Posted on
                    $li .= sprintf('<span class="posted-on">%s</span>', $posted_on);

                    // Byline
                    $li .= $post_byline;

                    $li .= "</li>\n";
                }
            }
        }
        wp_reset_postdata();

        $ul_posts = sprintf('<div %1$s>%2$s</div>', $wrapper_attributtes, $li);

        return $ul_posts;
    }
}

include 'helper-functions.php';
