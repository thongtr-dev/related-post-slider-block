/**
 * Internal dependencies
 */
import useFetch from "./components/useFetch";
import RelatedPostSlider from "./components/RelatedPostSlider";

export default function Block(attributes) {
	const { totalPostsToShow } = attributes;
	const { isLoading, isError, posts } = useFetch([totalPostsToShow]);

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
		<RelatedPostSlider sliderSettings={sliderSettings} posts={posts} />
	);
}
