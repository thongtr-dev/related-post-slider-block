import Slider from "react-slick";
import postsData from "./postsData";

export default function RelatedPostSlider({ sliderSettings, posts }) {
	return (
		<Slider {...sliderSettings}>
			{posts && posts.length === 0 && <p>No posts</p>}
			{posts &&
				posts.length > 0 &&
				postsData(posts).map((data) => (
					<div key={data.postID} className="related-post-slider-item">
						<a href={data.postLink}>
							<img
								className="featured"
								src={data.featuredImageSrc}
								alt={data.featuredImageAlt}
							/>
						</a>
						<div className="term">
							<a href={data.categoryLink}>{data.category}</a>
						</div>
						<h3 className="title">
							<a href={data.postLink}>{data.postTitle}</a>
						</h3>
						<div className="meta">
							<span className="byline">
								By: <a href={data.authorLink}>{data.author}</a>
							</span>
							&nbsp;
							<span className="posted-on">
								Published: {data.publishedDate.slice(0, 10)}
							</span>
						</div>
						<div
							className="excerpt"
							dangerouslySetInnerHTML={{
								__html: data.postExcerpt.slice(0, 125).concat("..."),
							}}
						/>
					</div>
				))}
		</Slider>
	);
}
