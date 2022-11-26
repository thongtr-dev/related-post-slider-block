import Slider from "react-slick";
import postsData from "./postsData";
import { Spinner } from "@wordpress/components";

export default function RelatedPostSlider({
	display,
	sliderSettings,
	posts,
	hasResolvedPosts,
}) {
	const { displayFeaturedImage, displayCategory, displayMeta, displayExcerpt } =
		display;
	return (
		<div>
			{!hasResolvedPosts && <Spinner />}
			{hasResolvedPosts && !posts?.length && <div>No related posts</div>}
			{posts?.length && (
				<Slider {...sliderSettings}>
					{postsData(posts).map(
						({
							postID,
							postLink,
							postTitle,
							featuredImageSrc,
							featuredImageAlt,
							category,
							categoryLink,
							author,
							authorLink,
							postExcerpt,
							publishedDate,
						}) => (
							<div key={postID} className="related-post-slider-item">
								{displayFeaturedImage && featuredImageSrc && (
									<a href={postLink}>
										<img
											className="featured"
											src={featuredImageSrc}
											alt={featuredImageAlt}
										/>
									</a>
								)}
								{displayCategory && (
									<div className="term">
										<a href={categoryLink}>{category}</a>
									</div>
								)}
								<h3 className="title">
									<a href={postLink}>{postTitle}</a>
								</h3>
								{displayMeta && (
									<div className="meta">
										<span className="byline">
											By: <a href={authorLink}>{author}</a>
										</span>
										&nbsp;
										<span className="posted-on">
											Published: {publishedDate.slice(0, 10)}
										</span>
									</div>
								)}
								{displayExcerpt && (
									<div
										className="excerpt"
										dangerouslySetInnerHTML={{
											__html: postExcerpt.slice(0, 125).concat("..."),
										}}
									/>
								)}
							</div>
						)
					)}
				</Slider>
			)}
		</div>
	);
}
