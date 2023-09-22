"use client"

import { $favorites } from "~/stores/favorites"

const Gallery = () => (
    <div className={"grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 items-center"} data-testid={"gallery"}>
        {$favorites.state.data.use().map((favorite) => {
            const imageSrc = favorite.sample.url ?? undefined
            return (
                <img alt={""} className={"b-2 b-rd-2 b-white"} key={favorite.id} src={imageSrc} />
            )
        })}

    </div>
)

export default Gallery
