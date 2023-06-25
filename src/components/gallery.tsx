"use client"

import { useMemo } from "react"
import Loader from "~/components/loader"
import { useFavoritesResource } from "~/stores/favorites"

const Gallery = () => {
    const posts = useFavoritesResource()
    const filteredPosts = useMemo(() => posts.value?.filter((post) => !post.flags.deleted), [posts])

    const categoryTypes = useMemo(() => new Set(["general", "species", "character", "artist", "invalid", "lore", "meta"] as const), [])
    const categoryCounts = useMemo(() => {
        return (filteredPosts ?? []).reduce((counts, post) => {
            for (const categoryType of categoryTypes) {
                const categories = post.tags[categoryType]
                for (const category of categories) {
                    counts[categoryType] = counts[categoryType] || {}
                    counts[categoryType][category] = (counts[categoryType][category] || 0) + 1
                }
            }
            return counts
        }, Object.create(null))
    }, [filteredPosts, categoryTypes])



    if (posts.loading) {
        return <Loader />
    }

    return (
        <>
            <pre className="whitespace-pre-wrap">{JSON.stringify(categoryCounts, undefined, 4)}</pre>
            <div data-id={"gallery"} className={"grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"}>
                {filteredPosts?.map(post => (
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
                            <p className={"bg-foreground c-background p-1 text-center font-500"}>{post.file.ext}</p>
                        </a>
                    </div>
                ))}
            </div >
        </>
    )
}

export default Gallery
