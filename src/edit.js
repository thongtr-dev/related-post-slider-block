/**
 * External dependencies
 */
import Slider from "react-slick";

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

import { useSelect } from "@wordpress/data";

import Block from "./block";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();

	const { totalPostsToShow } = attributes;

	const posts = useSelect(
		(select) => {
			return select("core").getEntityRecords("postType", "post", {
				per_page: totalPostsToShow,
			});
		},
		[totalPostsToShow]
	);

	return (
		<div {...blockProps}>
			<ul>
				{!posts && <li>Loading...</li>}
				{posts && posts.length === 0 && <li>No posts</li>}
				{posts &&
					posts.length > 0 &&
					posts.map((post) => (
						<li key={post.id}>
							<a href={post.link}>{post.title.rendered}</a>
						</li>
					))}
			</ul>
		</div>
	);
}
