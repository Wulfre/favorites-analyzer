"use client"

import GalleryPost from "./gallery-post"
import Loader from "~/components/loader"
import { useScoredTags } from "~/hooks/use-scored-tags"
import { useFavoritesResource } from "~/stores/favorites"
import { mapToArray } from "~/utils/map-to-array"

const Gallery = () => {
    const favoritesResource = useFavoritesResource()
    const scoredTags = useScoredTags(favoritesResource.value ?? [])

    // render loader if the favorites resource is is not finsihed loading
    if (favoritesResource.loading) {
        return <Loader />
    }

    // return early if the favorites resource is empty
    if (favoritesResource.value === undefined || favoritesResource.value.length === 0) {
        return
    }

    // render main gallery component
    return (
        <>
            {/* TODO -- remove this pre element when finished debugging */}
            <pre className="whitespace-pre-wrap bg-black p-2 max-h-66dvh overflow-auto">{JSON.stringify(mapToArray(scoredTags), undefined, 4)}</pre>
            <div data-id={"gallery"} className={"grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"}>
                {favoritesResource.value.map(post => (
                    <GalleryPost key={post.id} post={post} />
                ))}
            </div >
        </>
    )
}

export default Gallery
