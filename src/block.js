/**
 * Internal dependencies
 */
import useFetch from "./components/useFetch";
import RelatedPostSlider from "./components/RelatedPostSlider";

export default function Block(attributes) {
	const { totalPostsToShow, display } = attributes;
	const { displayReverseOrder } = display;
	const { isLoading, isError, posts, currentPostCatId } = useFetch([
		totalPostsToShow,
		displayReverseOrder,
	]);

	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
	};

	return isError ? (
		<p>Something went wrong...</p>
	) : isLoading ? (
		<p>Loading...</p>
	) : (
		<div>
			<RelatedPostSlider
				display={display}
				sliderSettings={sliderSettings}
				posts={posts}
				currentPostCatId={currentPostCatId}
			/>
		</div>
	);
}
