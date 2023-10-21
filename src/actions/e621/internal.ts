import type { Post } from "~/schemas/post"

export const getPostsTagCount = (posts: Post[]): Map<string, number> => {
    const tagCounts = new Map<string, number>()

    posts.forEach((post) => {
        Object.entries(post.tags).forEach(([_category, tags]) => {
            tags.forEach((tag) => {
                const count = tagCounts.get(tag) ?? 0
                tagCounts.set(tag, count + 1)
            })
        })
    })

    return tagCounts
}
