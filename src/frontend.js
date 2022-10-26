import { render, Suspense } from "@wordpress/element";
import Block from "./block";

window.addEventListener("DOMContentLoaded", () => {
	const relatedPostSliderBlockWrapper = document.querySelector(
		".wp-block-create-block-related-post-slider-block"
	);
	if (relatedPostSliderBlockWrapper) {
		const attributes = { ...relatedPostSliderBlockWrapper.dataset };
		render(
			<Suspense fallback={<div className="wp-block-placeholder" />}>
				<Block {...attributes} />
			</Suspense>,
			relatedPostSliderBlockWrapper
		);
	}
});
