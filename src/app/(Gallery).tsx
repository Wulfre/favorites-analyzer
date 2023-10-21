"use client"

import { computed } from "@legendapp/state"
import { Show, observer } from "@legendapp/state/react"
import { getPostsTagCount } from "~/actions/e621/client"
import Loader from "~/components/ui/Loader"
import { $favorites } from "~/stores/favorites"

const $displayFavorites = computed(() => $favorites.state.data.get().filter((post) => !post.flags.deleted))
const $tagCounts = computed(() => Array.from(getPostsTagCount($displayFavorites.get()).entries()).sort((a, b) => b[1] - a[1]))

const Gallery = () => (
    <Show
        if={!$favorites.state.loading.get()}
        else={(
            <div className={"grid place-items-center"}>
                <Loader />
                <span>
                    {`${$favorites.state.progress.current.get()} / ${$favorites.state.progress.total.get()}`}
                </span>
            </div>
        )}
    >
        <details open>
            <summary>{"Raw Data"}</summary>
            <pre className={"bg-primary-900 p-1ch b-rd-1 overflow-hidden text-3 ws-pre-wrap"}>
                {JSON.stringify($tagCounts.get(), undefined, 4)}
            </pre>
        </details>
        <div
            className={"grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-8 place-items-center"}
            data-testid={"gallery"}
        >
            {$displayFavorites.get().map((favorite) => (
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
                    <Show if={!["png", "jpg"].includes(favorite.file.ext)}>
                        <div className={"absolute inset-1 h-[min-content] w-[min-content] p-2 b-rd-50% bg-primary-950"}>
                            <div className={"i-carbon:play-filled-alt?mask c-primary-200 text-3"} />
                        </div>
                    </Show>
                </a>
            ))}
        </div>
    </Show>
)

export default observer(Gallery)
