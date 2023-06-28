"use client"

import { useMemo } from "react"
import Loader from "~/components/loader"
import { categoryKeySchema } from "~/schemas/post"
import { useFavoritesResource } from "~/stores/favorites"
import { mapToArray } from "~/utils/map-to-array"

const Gallery = () => {
    const favoritesResource = useFavoritesResource()
    const scoredTags = useMemo(() => {
        // assign favorites value to a local variable and return early in undefined cases so typescript can infer
        const favorites = favoritesResource.value
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
    }, [favoritesResource.value])

    // render loader if the favorites resource is is not finsihed loading
    if (favoritesResource.loading) {
        return <Loader />
    }

    // render main gallery component
    return (
        <>
            {/* TODO -- remove this pre element when finished debugging */}
            <pre className="whitespace-pre-wrap">{JSON.stringify(mapToArray(scoredTags), undefined, 4)}</pre>
            <div data-id={"gallery"} className={"grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"}>
                {favoritesResource.value?.map(post => (
                    <div key={post.id} className="flex flex-col justify-center">
                        <a
                            href={`https://e621.net/posts/${post.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={"b-foreground b-2 b-rd-2 overflow-hidden"}
                        >
                            <object
                                data={post.sample.url ?? `https://static1.e621.net/data/sample/${post.file.md5.slice(0, 2)}/${post.file.md5.slice(2, 4)}/${post.file.md5}.jpg`}
                                className={"w-full"}
                            >
                                <object
                                    data={`https://static1.e621.net/data/${post.file.md5.slice(0, 2)}/${post.file.md5.slice(2, 4)}/${post.file.md5}.${post.file.ext}`}
                                    className={"w-full"}
                                >
                                    <div className={"aspect-square bg-white c-background flex justify-center items-center"}>
                                        <span className={"i-carbon:no-image text-6xl filter-brightness-300"} />
                                    </div>
                                </object>
                            </object>
                        </a>
                    </div>
                ))}
            </div >
        </>
    )
}

export default Gallery
