/**
 * External dependencies
 */
import Slider from "react-slick";
import axios from "axios";

import { useState, useEffect, useRef } from "@wordpress/element";

export default function Block(attributes) {
	const postsAPIEndpoint = useRef("");
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const { totalPostsToShow } = attributes;
	useEffect(() => {
		postsAPIEndpoint.current = window.location.origin.includes("localhost")
			? (postsAPIEndpoint.current = `${window.location.origin}/index.php?rest_route=/wp/v2/posts&_embed`)
			: (postsAPIEndpoint.current = `${window.location.origin}/wp-json/wp/v2/posts&_embed`);
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);
			try {
				const result = await axios.get(postsAPIEndpoint.current, {
					params: {
						per_page: totalPostsToShow,
					},
				});
				setPosts([...posts, ...result.data]);
			} catch (error) {
				console.log(error);
				setIsError(true);
			}
			setIsLoading(false);
		};
		fetchData();
	}, [totalPostsToShow]);

	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
	};

	const postsData = posts.map((post) => ({
		postID: post.id,
		featuredImageSrc:
			post._embedded["wp:featuredmedia"][0].media_details.sizes.medium
				.source_url,
		featuredImageAlt: post._embedded["wp:featuredmedia"][0].alt_text,
		category: post._embedded["wp:term"]["0"]["0"].name,
		categoryLink: post._embedded["wp:term"]["0"]["0"].link,
		postLink: post.link,
		postTitle: post.title.rendered,
		postExcerpt: post.excerpt.rendered,
		author: post._embedded.author["0"].name,
		authorLink: post._embedded.author["0"].link,
		publishedDate: post.date,
	}));

	return isError ? (
		<p>Something went wrong...</p>
	) : isLoading ? (
		<p>Loading...</p>
	) : (
		<Slider {...sliderSettings}>
			{posts && posts.length === 0 && <p>No posts</p>}
			{posts &&
				posts.length > 0 &&
				postsData.map((data) => (
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
