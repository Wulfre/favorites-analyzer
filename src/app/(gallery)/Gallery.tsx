"use client"

import { FunctionComponent } from "react"
import GalleryItem from "./_GalleryItem"
import Loader from "~/components/Loader"
import { useScoredTags } from "~/hooks/use-scored-tags"
import { useFavoritesResource } from "~/stores/favorites"
import { mapToArray } from "~/utils/map-to-array"

const Gallery: FunctionComponent = () => {
    const favoritesResource = useFavoritesResource()
    const scoredTags = useScoredTags(favoritesResource.value)

    // render loader if the favorites resource is is not finsihed loading
    if (favoritesResource.loading) {
        return <Loader />
    }

    // return early if the favorites resource is empty
    if (favoritesResource.value.length === 0) {
        return
    }

    // render main gallery component
    return (
        <>
            {/* TODO -- remove this pre element when finished debugging */}
            <pre className="whitespace-pre-wrap bg-black p-2 max-h-66dvh overflow-auto">{JSON.stringify(mapToArray(scoredTags), undefined, 4)}</pre>
            <div data-id={"gallery"} className={"grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"}>
                {favoritesResource.value.map(post => (
                    <GalleryItem key={post.id} post={post} />
                ))}
            </div >
        </>
    )
}

export default Gallery
