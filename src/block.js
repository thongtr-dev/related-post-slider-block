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
		postsAPIEndpoint.current = `${window.location.origin}/wp-json/wp/v2/posts`;
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

	return isError ? (
		<p>Something went wrong...</p>
	) : isLoading ? (
		<p>Loading...</p>
	) : (
		<ul>
			{posts && posts.length === 0 && <li>No posts</li>}
			{posts &&
				posts.length > 0 &&
				posts.map((post) => (
					<li key={post.id}>
						<a href={post.link}>{post.title.rendered}</a>
					</li>
				))}
		</ul>
	);
}
