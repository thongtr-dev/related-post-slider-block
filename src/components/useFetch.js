import { useSelect } from "@wordpress/data";
import { useRef } from "@wordpress/element";

export default function useFetch(dependencies) {
	const currentPostId = useRef(null);
	const currentPostCatId = useRef(null);

	const [totalPostsToShow, displayReverseOrder] = dependencies;

	useSelect((select) => {
		const { getCurrentPostId } = select("core/editor");
		currentPostId.current = getCurrentPostId();
	});

	useSelect((select) => {
		const { getEntityRecords } = select("core");
		const { isResolving } = select("core/data");
		const query = {
			per_page: -1,
			include: currentPostId.current,
		};

		if (isResolving("core", "getEntityRecords", ["postType", "post", query])) {
			console.log("Getting current post...");
		} else {
			currentPostCatId.current = getEntityRecords(
				"postType",
				"post",
				query
			)[0].categories[0];
		}
	});

	const posts = useSelect((select) => {
		const { getEntityRecords } = select("core");
		const { isResolving } = select("core/data");

		const query = {
			per_page: totalPostsToShow,
			_embed: true,
			order: displayReverseOrder ? "asc" : "desc",
			categories: currentPostCatId.current,
			exclude: currentPostId.current,
		};

		if (isResolving("core", "getEntityRecords", ["postType", "post", query])) {
			console.log("Getting posts...");
		} else {
			return getEntityRecords("postType", "post", query);
		}
	}, dependencies);

	return { posts, currentPostCatId };
}
