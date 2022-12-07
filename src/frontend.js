import "slick-carousel";

const { postsPerSlide, responsive } = sliderSettings;

$(".wp-block-create-block-related-post-slider-block").slick({
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: postsPerSlide,
	slidesToScroll: 1,
	rows: 1,
	responsive: responsive,
});
