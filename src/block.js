/**
 * External dependencies
 */
import Slider from "react-slick";

import { useSelect } from "@wordpress/data";

export default function Block(attributes) {
	const { totalPostsToShow } = attributes;
	const posts = useSelect(
		(select) => {
			return select("core").getEntityRecords("postType", "post", {
				per_page: totalPostsToShow,
			});
		},
		[totalPostsToShow]
	);

	// const isLoading = useSelect((select) => {
	// 	return select("core/data").isResolving("core", "getEntityRecords", [
	// 		"postType",
	// 		"post",
	// 	]);
	// });

	// if (isLoading) {
	// 	return <p>Loading</p>;
	// }
	return (
		// <h1>Loading</h1>
		<ul>
			{/* {!posts && <li>Loading...</li>}
			{posts && posts.length === 0 && <li>No posts</li>} */}
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
