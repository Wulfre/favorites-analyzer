"use client"

import { Show } from "@legendapp/state/react"
import { For } from "million/react"
import Loader from "~/components/ui/Loader"
import { $favorites } from "~/stores/favorites"

const Gallery = () => {
    const displayFavorites = $favorites.state.data.use().filter((post) => !post.flags.deleted)
    const userLoading = $favorites.state.loading.use()
    const favoritesLoading = $favorites.state.loading.use()
    const favoritesProgress = $favorites.state.progress.use()

    return (
        <Show if={!userLoading && !favoritesLoading} else={
            <div className={"grid place-items-center"}>
                <Loader />
                <span>{favoritesProgress.current}{" / "}{favoritesProgress.total}</span>
            </div>
        }>
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
                                className={"b-2 b-rd-1 b-primary-200 bg-primary-200"}
                                data-testid={`gallery-image-${favorite.id}`}
                                alt={""}
                                loading={"lazy"}
                                width={150}
                                height={150}
                                src={`https://static1.e621.net/data/preview/${favorite.file.md5.at(0)}${favorite.file.md5.at(1)}/${favorite.file.md5.at(2)}${favorite.file.md5.at(3)}/${favorite.file.md5}.jpg`}
                            />
                            <Show if={["webm", "gif"].includes(favorite.file.ext)}>
                                <div className={"absolute inset-1 h-[min-content] w-[min-content] p-2 b-rd-50% bg-primary-950"}>
                                    <div className={"i-carbon:play-filled-alt?mask c-primary-200 text-3"} />
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
