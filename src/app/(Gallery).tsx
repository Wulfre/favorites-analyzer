"use client"

import { Show } from "@legendapp/state/react"
import { For } from "million/react"
import Loader from "~/components/Loader"
import { $favorites } from "~/stores/favorites"

const Gallery = () => {
    const displayFavorites = $favorites.state.data.use().filter((post) => !post.flags.deleted)
    const userLoading = $favorites.state.loading.use()
    const favoritesLoading = $favorites.state.loading.use()

    return (
        <Show if={!userLoading && !favoritesLoading} else={<Loader />}>
            <div
                className={"grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-8 place-items-center"}
                data-testid={"gallery"}
            >
                <For each={displayFavorites} memo>
                    {(favorite) => (
                        <a
                            href={`https://e621.net/posts/${favorite.id}`}
                            target={"_blank"}
                            rel={"noopener noreferrer"}
                            className={"relative"}
                        >
                            <img
                                className={"b-2 b-rd-2 b-white"}
                                data-testid={`gallery-image-${favorite.id}`}
                                alt={""}
                                src={`https://static1.e621.net/data/preview/${favorite.file.md5.at(0)}${favorite.file.md5.at(1)}/${favorite.file.md5.at(2)}${favorite.file.md5.at(3)}/${favorite.file.md5}.jpg`}
                            />
                            <Show if={["webm", "gif"].includes(favorite.file.ext)}>
                                <div className={"absolute inset-0.5ch h-[min-content] w-[min-content] p-0.5ch b-rd-50% bg-black"}>
                                    <div className={"i-carbon:play-filled-alt?mask text-1ch"} />
                                </div>
                            </Show>
                        </a>
                    )}
                </For>
            </div>
        </Show>
    )
}

export default Gallery
