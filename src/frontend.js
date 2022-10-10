import { render, Suspense } from "@wordpress/element";
import Block from "./block";

window.addEventListener("DOMContentLoaded", () => {
	const relatedPostsSliderBlockWrapper = document.querySelector(
		".wp-block-create-block-related-posts-slider-block"
	);
	if (relatedPostsSliderBlockWrapper) {
		const attributes = { ...relatedPostsSliderBlockWrapper.dataset };
		render(
			<Suspense fallback={<div className="wp-block-placeholder" />}>
				<Block {...attributes} />
			</Suspense>,
			relatedPostsSliderBlockWrapper
		);
	}
});
