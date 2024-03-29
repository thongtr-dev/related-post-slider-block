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
	Button,
	PanelBody,
	PanelRow,
	ToggleControl,
	SelectControl,
	TextControl,
	RangeControl,
	ColorPicker,
	__experimentalBorderControl as BorderControl,
	__experimentalBoxControl as BoxControl,
} from "@wordpress/components";

import { Icon, desktop, tablet, mobile, link, linkOff } from "@wordpress/icons";

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

	const {
		display,
		postsPerSlide,
		totalPostsToShow,
		breakpoints,
		carouselPadding,
		carouselMargin,
		itemPadding,
		itemMargin,
		linkSlideItemBorder,
		flatSlideItemBorder,
		splittedSlideItemBorder,
		slideItemBorderRadius,
		slideItemShadow,
	} = attributes;
	const {
		displayFeaturedImage,
		displayCategory,
		displayMeta,
		displayExcerpt,
		displayReverseOrder,
	} = display;
	const { offsetX, offsetY, blurRadius, spreadRadius, shadowColor } =
		slideItemShadow;

	useEffect(() => {
		if (totalPostsToShow > 0 && totalPostsToShow < postsPerSlide) {
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
								breakpoint: value ? parseInt(value) : 0,
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
		<div
			{...blockProps}
			style={{
				...blockProps.style,
				padding: `${carouselPadding.top ?? "0"} ${
					carouselPadding.right ?? "0"
				} ${carouselPadding.bottom ?? "0"} ${carouselPadding.left ?? "0"}`,
				margin: `${carouselMargin.top ?? "0"} auto ${
					carouselMargin.bottom ?? "0"
				}`,
			}}
		>
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
							setAttributes({
								totalPostsToShow: newValue ? parseInt(newValue) : 0,
							});
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

				<PanelBody title={__("Dimensions", "related-post-slider-block")}>
					<BoxControl
						label={__("Carousel padding", "related-post-slider-block")}
						values={carouselPadding}
						onChange={(newValues) => {
							setAttributes({ carouselPadding: newValues });
						}}
					/>
					<BoxControl
						label={__("Carousel margin", "related-post-slider-block")}
						sides={["top", "bottom"]}
						values={carouselMargin}
						onChange={(newValues) => {
							setAttributes({ carouselMargin: newValues });
						}}
					/>
					<BoxControl
						label={__("Slide item padding", "related-post-slider-block")}
						values={itemPadding}
						onChange={(newValues) => {
							setAttributes({ itemPadding: newValues });
						}}
					/>
					<BoxControl
						label={__("Slide item margin", "related-post-slider-block")}
						values={itemMargin}
						onChange={(newValues) => {
							setAttributes({ itemMargin: newValues });
						}}
					/>
				</PanelBody>

				<PanelBody title={__("Styles", "related-post-slider-block")}>
					<PanelRow>
						{__("Slide item border", "related-post-slider-block")}
						<Button
							icon={linkSlideItemBorder ? link : linkOff}
							label={__(
								linkSlideItemBorder ? "Unlink borders" : "Link borders",
								"related-post-slider-block"
							)}
							onClick={() => {
								setAttributes({ linkSlideItemBorder: !linkSlideItemBorder });
							}}
						/>
					</PanelRow>
					{linkSlideItemBorder ? (
						<BorderControl
							label={__("Border", "related-post-slider-block")}
							withSlider={true}
							value={flatSlideItemBorder}
							onChange={(newSlideItemBorder) => {
								setAttributes({ flatSlideItemBorder: newSlideItemBorder });
							}}
						/>
					) : (
						<>
							<BorderControl
								label={__("Border top", "related-post-slider-block")}
								withSlider={true}
								value={splittedSlideItemBorder.top}
								onChange={(newBorderTop) => {
									setAttributes({
										splittedSlideItemBorder: {
											...splittedSlideItemBorder,
											top: newBorderTop,
										},
									});
								}}
							/>
							<BorderControl
								style={{ marginTop: "10px" }}
								label={__("Border right", "related-post-slider-block")}
								withSlider={true}
								value={splittedSlideItemBorder.right}
								onChange={(newBorderRight) => {
									setAttributes({
										splittedSlideItemBorder: {
											...splittedSlideItemBorder,
											right: newBorderRight,
										},
									});
								}}
							/>
							<BorderControl
								style={{ marginTop: "10px" }}
								label={__("Border bottom", "related-post-slider-block")}
								withSlider={true}
								value={splittedSlideItemBorder.bottom}
								onChange={(newBorderBottom) => {
									setAttributes({
										splittedSlideItemBorder: {
											...splittedSlideItemBorder,
											bottom: newBorderBottom,
										},
									});
								}}
							/>
							<BorderControl
								style={{ marginTop: "10px" }}
								label={__("Border left", "related-post-slider-block")}
								withSlider={true}
								value={splittedSlideItemBorder.left}
								onChange={(newBorderLeft) => {
									setAttributes({
										splittedSlideItemBorder: {
											...splittedSlideItemBorder,
											left: newBorderLeft,
										},
									});
								}}
							/>
						</>
					)}
					<br />
					<BoxControl
						label={__("Border radius", "related-post-slider-block")}
						values={slideItemBorderRadius}
						onChange={(newValues) => {
							setAttributes({
								slideItemBorderRadius: newValues,
							});
						}}
					/>
					<PanelRow>
						{__("Slide item shadow", "related-post-slider-block")}
					</PanelRow>
					<RangeControl
						__nextHasNoMarginBottom
						label={__("Offset X", "related-post-slider-block")}
						max={100}
						min={-100}
						allowReset={true}
						resetFallbackValue={0}
						value={offsetX}
						onChange={(newOffsetX) => {
							setAttributes({
								slideItemShadow: {
									...slideItemShadow,
									offsetX: newOffsetX,
								},
							});
						}}
					/>
					<RangeControl
						__nextHasNoMarginBottom
						label={__("Offset Y", "related-post-slider-block")}
						max={100}
						min={-100}
						allowReset={true}
						resetFallbackValue={0}
						value={offsetY}
						onChange={(newOffsetY) => {
							setAttributes({
								slideItemShadow: {
									...slideItemShadow,
									offsetY: newOffsetY,
								},
							});
						}}
					/>
					<RangeControl
						__nextHasNoMarginBottom
						label={__("Blur radius", "related-post-slider-block")}
						max={100}
						min={0}
						allowReset={true}
						resetFallbackValue={0}
						value={blurRadius}
						onChange={(newBlurRadius) => {
							setAttributes({
								slideItemShadow: {
									...slideItemShadow,
									blurRadius: newBlurRadius,
								},
							});
						}}
					/>
					<RangeControl
						__nextHasNoMarginBottom
						label={__("Spread radius", "related-post-slider-block")}
						max={100}
						min={-100}
						allowReset={true}
						resetFallbackValue={0}
						value={spreadRadius}
						onChange={(newSpreadRadius) => {
							setAttributes({
								slideItemShadow: {
									...slideItemShadow,
									spreadRadius: newSpreadRadius,
								},
							});
						}}
					/>
					<PanelRow>{__("Shadow color", "related-post-slider-block")}</PanelRow>
					<ColorPicker
						enableAlpha={true}
						defaultValue={shadowColor}
						onChange={(newShadowColor) => {
							setAttributes({
								slideItemShadow: {
									...slideItemShadow,
									shadowColor: newShadowColor,
								},
							});
						}}
					/>
				</PanelBody>
			</InspectorControls>

			<Block {...attributes} />
		</div>
	);
}
