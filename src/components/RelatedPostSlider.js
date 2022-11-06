import Slider from "react-slick";
import postsData from "./postsData";

export default function RelatedPostSlider({
	display,
	sliderSettings,
	posts,
	currentPostCatId,
}) {
	const { displayFeaturedImage, displayCategory, displayMeta, displayExcerpt } =
		display;
	return (
		<Slider {...sliderSettings}>
			{!posts && <p>Loading...</p>}
			{posts && posts.length === 0 && <p>No posts</p>}
			{posts &&
				posts.length > 0 &&
				postsData(posts, currentPostCatId).map(
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
	);
}
