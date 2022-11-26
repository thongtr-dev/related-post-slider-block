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
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";

import {
	PanelBody,
	ToggleControl,
	SelectControl,
	__experimentalInputControl as InputControl,
} from "@wordpress/components";

import { useEffect } from "@wordpress/element";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

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
	const { display, postsPerSlide, totalPostsToShow } = attributes;
	const {
		displayFeaturedImage,
		displayCategory,
		displayMeta,
		displayExcerpt,
		displayReverseOrder,
	} = display;

	useEffect(() => {
		if (totalPostsToShow < postsPerSlide) {
			setAttributes({ postsPerSlide: parseInt(totalPostsToShow) });
		}
	}, [postsPerSlide, totalPostsToShow]);

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__("Display", "related-post-slider-block")}>
					<ToggleControl
						label={__("Display category", "related-post-slider-block")}
						onChange={() => {
							setAttributes({
								display: { ...display, displayCategory: !displayCategory },
							});
						}}
						checked={displayCategory}
					/>

					<ToggleControl
						label={__("Display featured image", "related-post-slider-block")}
						onChange={() => {
							setAttributes({
								display: {
									...display,
									displayFeaturedImage: !displayFeaturedImage,
								},
							});
						}}
						checked={displayFeaturedImage}
					/>

					<ToggleControl
						label={__("Display meta info", "related-post-slider-block")}
						onChange={() => {
							setAttributes({
								display: {
									...display,
									displayMeta: !displayMeta,
								},
							});
						}}
						checked={displayMeta}
					/>

					<ToggleControl
						label={__("Display excerpt", "related-post-slider-block")}
						onChange={() => {
							setAttributes({
								display: {
									...display,
									displayExcerpt: !displayExcerpt,
								},
							});
						}}
						checked={displayExcerpt}
					/>
					<ToggleControl
						label={__("Reverse order", "related-post-slider-block")}
						onChange={() => {
							setAttributes({
								display: {
									...display,
									displayReverseOrder: !displayReverseOrder,
								},
							});
						}}
						checked={displayReverseOrder}
					/>
					<InputControl
						label={__("Total posts", "related-post-slider-block")}
						labelPosition={"side"}
						isPressEnterToChange={true}
						value={totalPostsToShow}
						onChange={(newValue) => {
							setAttributes({ totalPostsToShow: newValue });
						}}
					/>
					<SelectControl
						label={__("Posts per slide", "related-post-slider-block")}
						labelPosition={"side"}
						value={postsPerSlide}
						options={[
							{
								label: __("1", "related-post-slider-block"),
								value: 1,
							},
							{
								label: __("2", "related-post-slider-block"),
								value: 2,
							},
							{
								label: __("3", "related-post-slider-block"),
								value: 3,
							},
							{
								label: __("4", "related-post-slider-block"),
								value: 4,
							},
						]}
						onChange={(newValue) => {
							setAttributes({ postsPerSlide: parseInt(newValue) });
						}}
						__nextHasNorMarginBottom
					/>
				</PanelBody>

				<PanelBody
					title={__("Responsive", "related-post-slider-block")}
				></PanelBody>
			</InspectorControls>

			<Block {...attributes} />
		</div>
	);
}
