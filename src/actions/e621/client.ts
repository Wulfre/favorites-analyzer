import type { Post } from "~/schemas/post"

export const getPostsTagScores = (posts: Post[]): Map<string, number> => {
    const tagScores = new Map<string, number>()

    for (const post of posts) {
        for (const tags of Object.values(post.tags)) {
            for (const tag of tags) {
                const count = tagScores.get(tag) ?? 0
                tagScores.set(tag, count + 1)
            }
        }
    }

    return tagScores
}
