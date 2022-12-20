=== Related Post Slider Block ===
Contributors:      thongtruong
Tags:              block, carousel, slider, related post slider, related post carousel slider, related post slider block, related post carousel slider block, dynamic related post slider block, dynamic related post carousel slider block
Requires at least: 5.9
Requires PHP:      7.0
Tested up to:      6.1.1
Stable tag:        1.0.2
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A truly WYSIWYG, responsive and dynamic related post carousel slider Gutenberg block.

== Description ==

Upon activating this plugin, you will not see any new menu page inside WP admin dashboard. Instead, this plugin adds a dynamic block straight to the block editor. You can then use the block settings sidebar to customize and edit everything related to the block.

This block picks the posts that have the same category/categories of the current post and display them in a carousel slider.

To insert and use the block, inside the post editor, underneath the main post content (or any position you wish), type '/related', you should see the block called 'Related Post Slider Block'. Choose and insert it to the post editor.

Here are the controls that you can customize and edit:
✅ Display controls:
    - Toggle on/off featured image for each slide.
    - Toggle on/off category badge for each slide.
    - Toggle on/off meta info(author, published date) for each slide.
    - Toggle on/off excerpt for each slide.
    - Display slide items in ASC/DESC order.
    - Number of total posts to display.
    - Number of posts per slide.
✅ Responsive controls (desktop, tablet, mobile).
✅ Dimension controls:
    - Carousel padding/margin
    - Slide item padding/margin
✅ Style controls:
    - Slide item border control
    - Slide item border radius control
    - Slide item box shadow control

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/related-post-slider-block` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Edit a post and type '/related' to choose the Related Post Slider Block and begin editting.

== Frequently Asked Questions ==

= What are the slide items to be displayed? =

The slide items are related posts which are in the same category/categories of the current post.

= Can I hide the featured image for all slide items? =

Yes

= What can I hide/display for each slide item? =

You can hide/display everything inside the slide item, except the post title.

= What if I forgot to set featured image for a post? =

The featured image will not be displayed for that specific slide item without any error.

= Can I display the slide items in reverse order? =

Yes, you can display the slide items in default DESC or ASC order with the toggle control 'Reverse order' in 'Display' control panel.

= What are the maximum and minimum number of posts can be displayed each slide? =

The mininum is 1 post and the maximum is 4 posts each slide.

= Can I have different number of posts per slide for each device(desktop, tablet, mobile)?  =

Yes, you can define the number of posts per slide (min is 1 and max is 4) for up to 3 device breakpoints, which are desktop, tablet and mobile.

= Can I edit the breakpoints? =

Yes, you can edit the breakpoints by putting a desired width number for 3 breakpoints inside 'Responsive' panel control.

= How many breakpoints are there by default? =

There are 3 breakpoints for desktop, tablet and mobile by default.

= Is there an option to add more breakpoints? =

Currently you can't add new breakpoints.

= What if the post has more than one category? =

The slide item will display all categories assigned to the post. Each category is separated by the symbol "|".

= Can I have custom styling for the dot and arrow indicators? =

This featured is in development.

= When I create a new post and insert the slider, an error appears which said "This block has encountered an error and cannot be previewed.". How to fix this? =

No, this is not a bug and is a known behavior. When you create a new post, please follow these steps if you encounter the error again:
    1. Assign categories for the post
    2. Click Publish/Update/Save draft when you finish editing the post
    3. Delete the slider block you've inserted before
    4. Reinsert the slider block
The slider should now be functional as normal.

= The slider doesn't display on frontend althought works normally in the post editor? =

If the slider in the post editor appears and is functional but not on the frontend, please make sure jQuery is enabled for your WordPress site.

== Screenshots ==

1. Display control panel
2. Responsive control panel
3. Dimension(padding, margin) control panel
4. Slide item border control and border radius control in Style control panel
5. Slide item box shadow control in Style control panel
6. The Related Post Slider Block in the editor
7. The Related Post Slider Block on frontend

/assets/screenshot-1.png
/assets/screenshot-2.png
/assets/screenshot-3.png
/assets/screenshot-4.png
/assets/screenshot-5.png
/assets/screenshot-6.png
/assets/screenshot-7.png

== Changelog ==

= 1.0.2 =
* Add 1 faq

= 1.0.1 =
* Update plugin short description

= 1.0.0 =
* Initial release

