import { useSelect } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";

export default function useFetch(dependencies) {
	const [totalPostsToShow, displayReverseOrder] = dependencies;

	const currentPostId = useSelect((select) => {
		return select("core/editor").getCurrentPostId();
	}, []);

	const currentCategories = useSelect((select) => {
		return select("core/editor").getCurrentPostAttribute("categories");
	}, []);

	const { posts, hasResolvedPosts } = useSelect((select) => {
		const query = {
			per_page: totalPostsToShow,
			_embed: true,
			order: displayReverseOrder ? "asc" : "desc",
			categories: currentCategories,
			exclude: currentPostId,
		};

		const selectorArgs = ["postType", "post", query];

		return {
			posts: select(coreDataStore).getEntityRecords(...selectorArgs),
			hasResolvedPosts: select(coreDataStore).hasFinishedResolution(
				"getEntityRecords",
				selectorArgs
			),
		};
	}, dependencies);

	return { posts, hasResolvedPosts };
}
