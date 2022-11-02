import { useState, useEffect, useRef } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import axios from "axios";

export default function useFetch(dependencies) {
	const currentPostId = useSelect((select) => {
		const { getCurrentPostId } = select("core/editor");
		return getCurrentPostId();
	});

	const currentPostsAPIEndpoint = useRef("");

	const [currentPostCatId, setCurrentPostCatId] = useState(0);

	useEffect(() => {
		currentPostsAPIEndpoint.current = window.location.origin.includes(
			"localhost"
		)
			? // if the site is hosted locally and doesn't have pretty permalink
			  (currentPostsAPIEndpoint.current = `${window.location.origin}/index.php?rest_route=/wp/v2/posts`)
			: (currentPostsAPIEndpoint.current = `${window.location.origin}/wp-json/wp/v2/posts`);
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);
			try {
				const result = await axios.get(currentPostsAPIEndpoint.current, {
					params: {
						include: currentPostId,
					},
				});
				setCurrentPostCatId(result.data[0].categories[0]);
			} catch (error) {
				console.log(error);
				setIsError(true);
			}
			setIsLoading(false);
		};
		fetchData();
	}, []);

	// const currentPostCatId = useSelect((select) => {
	// 	const { getEntityRecords } = select("core");
	// 	const { isResolving } = select("core/data");
	// 	const query = {
	// 		per_page: -1,
	// 		include: currentPostId,
	// 	};

	// 	if (isResolving("core", "getEntityRecords", ["postType", "post", query])) {
	// 		console.log("Getting current post object...");
	// 	} else {
	// 		const data = getEntityRecords("postType", "post", query);
	// 		return data[0].categories[0];
	// 	}
	// });

	const postsAPIEndpoint = useRef("");
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [totalPostsToShow, displayReverseOrder] = dependencies;
	useEffect(() => {
		postsAPIEndpoint.current = window.location.origin.includes("localhost")
			? // if the site is hosted locally and doesn't have pretty permalink
			  (postsAPIEndpoint.current = `${window.location.origin}/index.php?rest_route=/wp/v2/posts&_embed`)
			: (postsAPIEndpoint.current = `${window.location.origin}/wp-json/wp/v2/posts?_embed`);
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);
			try {
				const result = await axios.get(postsAPIEndpoint.current, {
					params: {
						per_page: totalPostsToShow,
						order: displayReverseOrder ? "asc" : "desc",
						exclude: currentPostId,
					},
				});
				setPosts([...result.data]);
			} catch (error) {
				console.log(error);
				setIsError(true);
			}
			setIsLoading(false);
		};
		fetchData();
	}, dependencies);

	return { posts, isLoading, isError, currentPostCatId };
}
