/**
 * External dependencies
 */
import Slider from "react-slick";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";

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
			const posts = select("core").getEntityRecords("postType", "post", {
				per_page: totalPostsToShow,
				_embed: true,
			});
			return posts;
		},
		[totalPostsToShow]
	);

	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
	};

	const isLoading = useSelect((select) => {
		return select("core/data").isResolving("core", "getEntityRecords", [
			"postType",
			"post",
		]);
	});

	if (isLoading) {
		return <p>Loading</p>;
	}

	return (
		<div {...blockProps}>
			<Slider {...sliderSettings}>
				{posts &&
					posts.length > 0 &&
					posts.map((post) => (
						<div key={post.id}>
							<a href={post.link}>
								<img
									src={post._embedded["wp:featuredmedia"][0].source_url}
									width={`${100}%`}
									alt={post._embedded["wp:featuredmedia"][0].alt_text}
								/>
							</a>
							<a href={post.link}>{post.title.rendered}</a>
						</div>
					))}
			</Slider>
		</div>
	);
}
