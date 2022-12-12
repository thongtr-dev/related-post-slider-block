/**
 * Internal dependencies
 */
import useFetch from "./components/useFetch";
import RelatedPostSlider from "./components/RelatedPostSlider";

export default function Block(attributes) {
	const {
		display,
		postsPerSlide,
		totalPostsToShow,
		breakpoints,
		itemPadding,
		itemMargin,
		linkSlideItemBorder,
		flatSlideItemBorder,
		splittedSlideItemBorder,
		slideItemBorderRadius,
	} = attributes;
	const { displayReverseOrder } = display;
	const { posts, hasResolvedPosts } = useFetch([
		totalPostsToShow,
		displayReverseOrder,
	]);

	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: postsPerSlide,
		slidesToScroll: 1,
		rows: 1,
		responsive: breakpoints.map((breakpoint) => breakpoint.breakpointSettings),
	};

	return (
		<RelatedPostSlider
			display={display}
			sliderSettings={sliderSettings}
			posts={posts}
			hasResolvedPosts={hasResolvedPosts}
			itemPadding={itemPadding}
			itemMargin={itemMargin}
			linkSlideItemBorder={linkSlideItemBorder}
			flatSlideItemBorder={flatSlideItemBorder}
			splittedSlideItemBorder={splittedSlideItemBorder}
			slideItemBorderRadius={slideItemBorderRadius}
		/>
	);
}
