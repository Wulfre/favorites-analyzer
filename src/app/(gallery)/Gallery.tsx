"use client"

import type { FunctionComponent } from "react"
import { match } from "ts-pattern"
import Loader from "~/components/Loader"
import { useScoredTags } from "~/hooks/use-scored-tags"
import { useFavoritesResource } from "~/stores/favorites"
import { mapToArray } from "~/utils/map-to-array"
import GalleryItem from "./_GalleryItem"

const Gallery: FunctionComponent = () => {
    const favoritesResource = useFavoritesResource()
    const scoredTags = useScoredTags(favoritesResource.value ?? [])

    return match(favoritesResource)
        .with({ loading: true }, () => <Loader />)
        .with({ loading: false }, () => (
            <>
                {/* TODO -- remove this pre element when finished debugging */}
                <pre className="whitespace-pre-wrap bg-black p-2 max-h-66dvh overflow-auto">{JSON.stringify(mapToArray(scoredTags), undefined, 4)}</pre>
                <div data-id={"gallery"} className={"grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"}>
                    {favoritesResource.value?.map((post) => (
                        <GalleryItem key={post.id} post={post} />
                    ))}
                </div >
            </>
        ))
        .exhaustive()
}

export default Gallery
