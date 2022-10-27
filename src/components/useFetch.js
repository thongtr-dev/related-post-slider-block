import { useState, useEffect, useRef } from "@wordpress/element";
import axios from "axios";

export default function useFetch(dependencies) {
	const postsAPIEndpoint = useRef("");
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [totalPostsToShow] = dependencies;
	useEffect(() => {
		postsAPIEndpoint.current = window.location.origin.includes("localhost")
			? // if the site is hosted locally and doesn't have pretty permalink
			  (postsAPIEndpoint.current = `${window.location.origin}/index.php?rest_route=/wp/v2/posts&_embed`)
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
	}, [...dependencies]);

	return { posts, isLoading, isError };
}
