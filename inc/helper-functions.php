<?php

/**
 * Related Posts Slider Block helper functions
 */

if (!function_exists('related_posts_slider_post_thumbnail')) {
    /**
     * Displays a post thumbnail.
     *
     * Wraps the post thumbnail in an anchor element.
     */

    function related_posts_slider_post_thumbnail()
    {
        if (post_password_required() || is_attachment() || !has_post_thumbnail()) {
            return;
        }
        return get_the_post_thumbnail(get_the_ID(), 'medium', array(
            'alt' => the_title_attribute(array(
                'echo' => false
            ))
        ));
    }
}

if (!function_exists('related_posts_slider_posted_on')) {
    /**
     * Prints HTML with meta information for the current post-date/time.
     */
    function related_posts_slider_posted_on()
    {
        $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time>';

        $time_string = sprintf($time_string, esc_attr(get_the_date(DATE_W3C)), esc_html(get_the_date()));

        $posted_on = sprintf(esc_html_x('%s', 'post date', 'related-posts-slider-block'), '<a href="' . esc_url(get_permalink()) .  '" rel="bookmark">' . $time_string . '</a>');

        return $posted_on;

        echo '<span class="posted-on">' . $posted_on . '</span>';
    }
}

if (!function_exists('related_posts_slider_posted_by_author')) {
    /**
     * Prints HTML with meta information for the current author.
     */
    function related_posts_slider_posted_by_author()
    {
        $byline = sprintf(
            esc_html_x('%s', 'post author', 'related-posts-slider-block'),
            '<span class="author vcard"><a class="url fn n" href="' . related_posts_slider_get_author_url() . '">' . esc_html(get_the_author()) . '</a></span>'
        );

        // echo '<span class="byline"> ' . $byline . '</span>';
        return $byline;
    }
}

if (!function_exists('related_posts_slider_posted_by_author_avatar')) {
    /**
     * Display author avatar
     */
    function related_posts_slider_posted_by_author_avatar()
    {
        $author_avatar_img = get_avatar(get_the_author_meta('ID'), 35, '', __('post author avatar', 'related-posts-slider-block'), array(
            'class' => 'related-posts-slider-block-author-avatar'
        ));

        $author_avatar = sprintf(esc_html_x('%s', 'post author avatar', 'related-posts-slider-block'), '<span class="author-avatar"><a href="' . related_posts_slider_get_author_url() . '">' . $author_avatar_img . '</a></span>');

        return $author_avatar;
    }
}

if (!function_exists('related_posts_slider_get_author_url')) {
    function related_posts_slider_get_author_url()
    {
        return esc_url(get_author_posts_url(get_the_author_meta('ID')));
    }
}
