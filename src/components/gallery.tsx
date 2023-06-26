"use client"

import { useMemo } from "react"
import ImageFallback from "~/components/imagefallback"
import Loader from "~/components/loader"
import { categoryKeySchema } from "~/schemas/post"
import { useFavoritesResource } from "~/stores/favorites"

const Gallery = () => {
    const favoritesResource = useFavoritesResource()
    const filteredFavorites = useMemo(() => favoritesResource.value?.filter((post) => !post.flags.deleted) ?? [], [favoritesResource])

    const categoryCounts = useMemo(() => {
        const scoredTagsByCategory = filteredFavorites.reduce((accumulator, post, index) => {
            for (const category in post.tags) {
                const validCategory = categoryKeySchema.parse(category)
                accumulator[validCategory] = accumulator[validCategory] ?? Object.create(null)
                for (const tag of post.tags[validCategory] ?? []) {
                    accumulator[validCategory][tag] = (accumulator[validCategory][tag] ?? 0) + 1 * (1 - (index / filteredFavorites.length))
                }
            }
            return accumulator
        }, Object.create(null))

        // TODO: fix the type errors later I literally do not care right now
        return Object.fromEntries(Object.entries(scoredTagsByCategory).map(([category, tags]) => {
            return [category, Object.fromEntries(Object.entries(tags).sort(([, a], [, b]) => b - a))]
        }))

    }, [filteredFavorites])

    if (favoritesResource.loading) {
        return <Loader />
    }

    return (
        <>
            <pre className="whitespace-pre-wrap">{JSON.stringify(categoryCounts, undefined, 4)}</pre>
            <div data-id={"gallery"} className={"grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"}>
                {filteredFavorites?.map(post => (
                    <div key={post.id} className="flex flex-col justify-center">
                        <a
                            href={`https://e621.net/posts/${post.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={"b-foreground b-2 b-rd-2 overflow-hidden"}
                        >
                            <ImageFallback
                                src={post.sample.url ?? `https://static1.e621.net/data/sample/${post.file.md5.slice(0, 2)}/${post.file.md5.slice(2, 4)}/${post.file.md5}.jpg`}
                                fallbackSrc={`https://static1.e621.net/data/${post.file.md5.slice(0, 2)}/${post.file.md5.slice(2, 4)}/${post.file.md5}.${post.file.ext}`}
                                alt={post.id.toString()}
                                width={post.sample.width / (post.sample.width / 200)}
                                height={post.sample.height / (post.sample.width / 200)}
                                className="w-full"
                            />
                        </a>
                    </div>
                ))}
            </div >
        </>
    )
}

export default Gallery
