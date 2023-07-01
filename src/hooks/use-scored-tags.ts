import { useMemo } from "react"
import { categoryKeySchema } from "~/schemas/post"
import { type Post } from "~/schemas/post"

export const useScoredTags = (favorites: Post[]) => {
    return useMemo(() => {
        // assign favorites value to a local variable and return early in undefined cases so typescript can infer
        if (!favorites) return new Map<string, Map<string, number>>()

        const scoredTags = favorites.reduce((accumulator, post, index) => {
            for (const category in post.tags) {
                const validCategory = categoryKeySchema.parse(category)

                // initialize a new sub-map if the current category hastn't been seen yet
                const currentCategory = accumulator.get(validCategory)
                    ?? accumulator.set(validCategory, new Map<string, number>()).get(validCategory)

                for (const tag of post.tags[validCategory] ?? []) {
                    // calculate score based on position in favorites list (recency) and frequency
                    const currentScore = currentCategory?.get(tag) ?? 0
                    currentCategory?.set(tag, currentScore + 1 * (1 - (index / favorites.length)))
                }
            }
            return accumulator
        }, new Map<string, Map<string, number>>())

        // sort tags within each category
        for (const [category, tags] of scoredTags.entries()) {
            const sortedTags = [...tags.entries()].sort(([, a], [, b]) => b - a)
            scoredTags.set(category, new Map(sortedTags))
        }

        return scoredTags
    }, [favorites])
}
