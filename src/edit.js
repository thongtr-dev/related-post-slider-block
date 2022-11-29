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
	PanelRow,
	ToggleControl,
	SelectControl,
	TextControl,
} from "@wordpress/components";

import { Icon, desktop, tablet, mobile } from "@wordpress/icons";

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
	const { display, postsPerSlide, totalPostsToShow, breakpoints } = attributes;
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

	const desktopBreakpointSettings = breakpoints.filter(
		(breakpoint) => breakpoint.device === "desktop"
	)[0].breakpointSettings;

	const { breakpoint: desktopBreakPoint, settings: desktopResponsiveSettings } =
		desktopBreakpointSettings;

	const tabletBreakpointSettings = breakpoints.filter(
		(breakpoint) => breakpoint.device === "tablet"
	)[0].breakpointSettings;

	const { breakpoint: tabletBreakPoint, settings: tabletResponsiveSettings } =
		tabletBreakpointSettings;

	const mobileBreakpointSettings = breakpoints.filter(
		(breakpoint) => breakpoint.device === "mobile"
	)[0].breakpointSettings;

	const { breakpoint: mobileBreakPoint, settings: mobileResponsiveSettings } =
		mobileBreakpointSettings;

	const slidesToShowSelectOpts = [
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
	];

	const setBreakpointOrSlidesToShowAttr = (
		device,
		breakpointSettings = {},
		responsiveSettings = {},
		property,
		value
	) => {
		switch (property) {
			case "breakpoint":
				return setAttributes({
					breakpoints: [
						...breakpoints.filter((breakpoint) => breakpoint.device !== device),
						{
							device: device,
							breakpointSettings: {
								...breakpointSettings,
								breakpoint: parseInt(value),
							},
						},
					],
				});
			case "slidesToShow":
				return setAttributes({
					breakpoints: [
						...breakpoints.filter((breakpoint) => breakpoint.device !== device),
						{
							device: device,
							breakpointSettings: {
								...breakpointSettings,
								settings: {
									...responsiveSettings,
									slidesToShow: parseInt(value),
								},
							},
						},
					],
				});
			default:
				return setAttributes({ breakpoints: [...breakpoints] });
		}
	};

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
					<TextControl
						label={__("Total posts", "related-post-slider-block")}
						value={totalPostsToShow}
						onChange={(newValue) => {
							setAttributes({ totalPostsToShow: parseInt(newValue) });
						}}
					/>
					<SelectControl
						label={__("Posts per slide", "related-post-slider-block")}
						labelPosition={"side"}
						value={postsPerSlide}
						options={slidesToShowSelectOpts}
						onChange={(newValue) => {
							setAttributes({ postsPerSlide: parseInt(newValue) });
						}}
						__nextHasNorMarginBottom
					/>
				</PanelBody>

				<PanelBody title={__("Responsive", "related-post-slider-block")}>
					<PanelRow className="responsive-breakpoint">
						<Icon icon={desktop} />
						<span style={{ marginLeft: "5px" }}>
							{__("Desktop", "related-post-slider-block")}
						</span>
					</PanelRow>
					<TextControl
						className="responsive-breakpoint__input"
						label={__("Breakpoint", "related-post-slider-block")}
						value={desktopBreakPoint}
						onChange={(newValue) => {
							setBreakpointOrSlidesToShowAttr(
								"desktop",
								desktopBreakpointSettings,
								undefined,
								"breakpoint",
								newValue
							);
						}}
					/>
					<SelectControl
						label={__("Posts per slide", "related-post-slider-block")}
						labelPosition={"side"}
						value={postsPerSlide}
						options={slidesToShowSelectOpts}
						onChange={(newValue) => {
							setBreakpointOrSlidesToShowAttr(
								"desktop",
								desktopBreakpointSettings,
								desktopResponsiveSettings,
								"slidesToShow",
								newValue
							);

							setAttributes({ postsPerSlide: parseInt(newValue) });
						}}
						__nextHasNorMarginBottom
					/>
					<PanelRow className="responsive-breakpoint">
						<Icon icon={tablet} />
						<span style={{ marginLeft: "5px" }}>
							{__("Tablet", "related-post-slider-block")}
						</span>
					</PanelRow>
					<TextControl
						className="responsive-breakpoint__input"
						label={__("Breakpoint", "related-post-slider-block")}
						value={tabletBreakPoint}
						onChange={(newValue) => {
							setBreakpointOrSlidesToShowAttr(
								"tablet",
								tabletBreakpointSettings,
								undefined,
								"breakpoint",
								newValue
							);
						}}
					/>
					<SelectControl
						label={__("Posts per slide", "related-post-slider-block")}
						labelPosition={"side"}
						value={tabletResponsiveSettings.slidesToShow}
						options={slidesToShowSelectOpts}
						onChange={(newValue) => {
							setBreakpointOrSlidesToShowAttr(
								"tablet",
								tabletBreakpointSettings,
								tabletResponsiveSettings,
								"slidesToShow",
								newValue
							);
						}}
						__nextHasNorMarginBottom
					/>
					<PanelRow className="responsive-breakpoint">
						<Icon icon={mobile} />
						<span style={{ marginLeft: "5px" }}>
							{__("Mobile", "related-post-slider-block")}
						</span>
					</PanelRow>
					<TextControl
						className="responsive-breakpoint__input"
						label={__("Breakpoint", "related-post-slider-block")}
						value={mobileBreakPoint}
						onChange={(newValue) => {
							setBreakpointOrSlidesToShowAttr(
								"mobile",
								mobileBreakpointSettings,
								undefined,
								"breakpoint",
								newValue
							);
						}}
					/>
					<SelectControl
						label={__("Posts per slide", "related-post-slider-block")}
						labelPosition={"side"}
						value={mobileResponsiveSettings.slidesToShow}
						options={slidesToShowSelectOpts}
						onChange={(newValue) => {
							setBreakpointOrSlidesToShowAttr(
								"mobile",
								mobileBreakpointSettings,
								mobileResponsiveSettings,
								"slidesToShow",
								newValue
							);
						}}
						__nextHasNorMarginBottom
					/>
				</PanelBody>
			</InspectorControls>

			<Block {...attributes} />
		</div>
	);
}
