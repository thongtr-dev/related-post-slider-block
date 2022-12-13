import Slider from "react-slick";
import postsData from "./postsData";
import { Spinner } from "@wordpress/components";

export default function RelatedPostSlider({
	display,
	sliderSettings,
	posts,
	hasResolvedPosts,
	itemPadding,
	itemMargin,
	linkSlideItemBorder,
	flatSlideItemBorder,
	splittedSlideItemBorder,
	slideItemBorderRadius,
}) {
	const { displayFeaturedImage, displayCategory, displayMeta, displayExcerpt } =
		display;

	const {
		top: slideItemBorderTop,
		right: slideItemBorderRight,
		bottom: slideItemBorderBottom,
		left: slideItemBorderLeft,
	} = splittedSlideItemBorder;

	const slideItemBorderProperty = () => {
		return linkSlideItemBorder
			? {
					border: flatSlideItemBorder
						? `${flatSlideItemBorder.color ?? "transparent"} ${
								flatSlideItemBorder.style ?? "none"
						  } ${flatSlideItemBorder.width ?? "0"}`
						: "transparent none 0",
			  }
			: {
					borderTop: slideItemBorderTop
						? `${slideItemBorderTop.color ?? "transparent"} ${
								slideItemBorderTop.style ?? "none"
						  } ${slideItemBorderTop.width ?? "0"}`
						: "transparent none 0",
					borderRight: slideItemBorderRight
						? `${slideItemBorderRight.color ?? "transparent"} ${
								slideItemBorderRight.style ?? "none"
						  } ${slideItemBorderRight.width ?? "0"}`
						: "transparent none 0",
					borderBottom: slideItemBorderBottom
						? `${slideItemBorderBottom.color ?? "transparent"} ${
								slideItemBorderBottom.style ?? "none"
						  } ${slideItemBorderBottom.width ?? "0"}`
						: "transparent none 0",
					borderLeft: slideItemBorderLeft
						? `${slideItemBorderLeft.color ?? "transparent"} ${
								slideItemBorderLeft.style ?? "none"
						  } ${slideItemBorderLeft.width ?? "0"}`
						: "transparent none 0",
			  };
	};

	const slideItemBorderRadiusProperty = () => ({
		borderRadius: `${slideItemBorderRadius.top ?? "0"} ${
			slideItemBorderRadius.right ?? "0"
		} ${slideItemBorderRadius.bottom ?? "0"} ${
			slideItemBorderRadius.left ?? "0"
		}`,
	});

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
								<div
									className="related-post-slider-item-content-wrapper"
									style={{
										padding: `${itemPadding.top ?? "0"} ${
											itemPadding.right ?? "0"
										} ${itemPadding.bottom ?? "0"} ${itemPadding.left ?? "0"}`,
										margin: `${itemMargin.top ?? "0"} ${
											itemMargin.right ?? "0"
										} ${itemMargin.bottom ?? "0"} ${itemMargin.left ?? "0"}`,
										...slideItemBorderProperty(),
										...slideItemBorderRadiusProperty(),
									}}
								>
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
							</div>
						)
					)}
				</Slider>
			)}
		</div>
	);
}
