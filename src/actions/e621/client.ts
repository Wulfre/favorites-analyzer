import type { Post } from "~/schemas/post"

export const getPostsTagCount = (posts: Post[]): Map<string, number> => {
    const tagCounts = new Map<string, number>()

    for (const post of posts) {
        for (const tags of Object.values(post.tags)) {
            for (const tag of tags) {
                const count = tagCounts.get(tag) ?? 0
                tagCounts.set(tag, count + 1)
            }
        }
    }

    return tagCounts
}
