export default function postsData(posts) {
	return posts.map((post) => ({
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
}
