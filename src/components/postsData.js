export default function postsData(posts, currentPostCatId) {
	const postsData = posts.map((post) => ({
		postID: post.id,
		featuredImageSrc:
			post._embedded["wp:featuredmedia"][0].media_details.sizes.medium
				.source_url,
		featuredImageAlt: post._embedded["wp:featuredmedia"][0].alt_text,
		category: post._embedded["wp:term"]["0"]["0"].name,
		categoryId: post.categories[0],
		categoryLink: post._embedded["wp:term"]["0"]["0"].link,
		postLink: post.link,
		postTitle: post.title.rendered,
		postExcerpt: post.excerpt.rendered,
		author: post._embedded.author["0"].name,
		authorLink: post._embedded.author["0"].link,
		publishedDate: post.date,
	}));

	return postsData.filter((post) => post.categoryId === currentPostCatId);
	// .map(
	// 	({
	// 		postID,
	// 		postLink,
	// 		postTitle,
	// 		featuredImageSrc,
	// 		featuredImageAlt,
	// 		category,
	// 		categoryLink,
	// 		author,
	// 		authorLink,
	// 		postExcerpt,
	// 		publishedDate,
	// 	}) => (
	// 		<div key={postID} className="related-post-slider-item">
	// 			{displayFeaturedImage && featuredImageSrc && (
	// 				<a href={postLink}>
	// 					<img
	// 						className="featured"
	// 						src={featuredImageSrc}
	// 						alt={featuredImageAlt}
	// 					/>
	// 				</a>
	// 			)}
	// 			{displayCategory && (
	// 				<div className="term">
	// 					<a href={categoryLink}>{category}</a>
	// 				</div>
	// 			)}
	// 			<h3 className="title">
	// 				<a href={postLink}>{postTitle}</a>
	// 			</h3>
	// 			{displayMeta && (
	// 				<div className="meta">
	// 					<span className="byline">
	// 						By: <a href={authorLink}>{author}</a>
	// 					</span>
	// 					&nbsp;
	// 					<span className="posted-on">
	// 						Published: {publishedDate.slice(0, 10)}
	// 					</span>
	// 				</div>
	// 			)}
	// 			{displayExcerpt && (
	// 				<div
	// 					className="excerpt"
	// 					dangerouslySetInnerHTML={{
	// 						__html: postExcerpt.slice(0, 125).concat("..."),
	// 					}}
	// 				/>
	// 			)}
	// 		</div>
	// 	)
	// );

	// postsData(posts, currentPostCatId).map(
	// 	({
	// 		postID,
	// 		postLink,
	// 		postTitle,
	// 		featuredImageSrc,
	// 		featuredImageAlt,
	// 		category,
	// 		categoryLink,
	// 		author,
	// 		authorLink,
	// 		postExcerpt,
	// 		publishedDate,
	// 	}) => (
	// 		<div key={postID} className="related-post-slider-item">
	// 			{displayFeaturedImage && featuredImageSrc && (
	// 				<a href={postLink}>
	// 					<img
	// 						className="featured"
	// 						src={featuredImageSrc}
	// 						alt={featuredImageAlt}
	// 					/>
	// 				</a>
	// 			)}
	// 			{displayCategory && (
	// 				<div className="term">
	// 					<a href={categoryLink}>{category}</a>
	// 				</div>
	// 			)}
	// 			<h3 className="title">
	// 				<a href={postLink}>{postTitle}</a>
	// 			</h3>
	// 			{displayMeta && (
	// 				<div className="meta">
	// 					<span className="byline">
	// 						By: <a href={authorLink}>{author}</a>
	// 					</span>
	// 					&nbsp;
	// 					<span className="posted-on">
	// 						Published: {publishedDate.slice(0, 10)}
	// 					</span>
	// 				</div>
	// 			)}
	// 			{displayExcerpt && (
	// 				<div
	// 					className="excerpt"
	// 					dangerouslySetInnerHTML={{
	// 						__html: postExcerpt.slice(0, 125).concat("..."),
	// 					}}
	// 				/>
	// 			)}
	// 		</div>
	// 	)
	// );
	// const postsWithoutCurrentPost = postsWithCurrentPost
	// 	.filter((post) => post.category === postsWithCurrentPost[0].category)
	// 	.slice(1);

	// return reverseOrder
	// 	? [...postsWithoutCurrentPost].reverse()
	// 	: postsWithoutCurrentPost;
}
