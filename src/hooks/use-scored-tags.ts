import { useMemo } from "react"
import { Post , categoryKeySchema } from "~/schemas/post"

const normalizeScores = (scoresMap: Map<string, Map<string, number>>): Map<string, Map<string, number>> => {
    for (const [category, tags] of scoresMap) {
        const scores = [...tags.values()]
        const maxScore = Math.max(...scores)
        const minScore = Math.min(...scores)
        const epsilon = 1e-10

        const sortedTags = [...tags.entries()]
            .map(([tag, score]): [string, number] => [tag, epsilon + (1 - epsilon) * ((score - minScore) / (maxScore - minScore))])
            .sort(([, a], [, b]) => b - a)

        scoresMap.set(category, new Map(sortedTags))
    }

    return scoresMap
}

const useScoredTags = (favorites: Post[]): Map<string, Map<string, number>> => {
    return useMemo(() => {
        if (!favorites || favorites.length === 0) {
            return new Map<string, Map<string, number>>()
        }

        const scoredTags = favorites.reduce((accumulator, post, index) => {
            for (const category in post.tags) {
                const validCategory = categoryKeySchema.parse(category)

                // initialize a new sub-map if the current category hastn't been seen yet
                const currentCategory = accumulator.get(validCategory)
                    ?? accumulator.set(validCategory, new Map<string, number>()).get(validCategory)

                for (const tag of post.tags[validCategory] ?? []) {
                    // calculate score based on position in favorites list (recency) and frequency
                    const currentScore = currentCategory?.get(tag) ?? 0
                    currentCategory?.set(tag, currentScore + 1 - (index / favorites.length))
                }
            }
            return accumulator
        }, new Map<string, Map<string, number>>())

        return normalizeScores(scoredTags)
    }, [favorites])
}

export { useScoredTags }
