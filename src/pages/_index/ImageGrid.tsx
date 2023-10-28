import { computed } from "@preact/signals"
import type { JSX } from "preact"
import { $user } from "~/stores/user"
import Loader from "~/components/ui/Loader"
import Show from "~/components/wrappers/Show"
import For from "~/components/wrappers/For"

const $displayFavorites = computed(() => $user.state.favorites.posts.value.filter((post) => !post.flags.deleted))

export default (): JSX.Element => (
    <Show
        if={!$user.state.status.loading.value}
        else={(
            <div class="flex flex-col items-center gap-3">
                <Loader />
                <span>{`${$user.state.status.favorites.currentPage.value} / ${$user.state.status.favorites.totalPages.value}`}</span>
            </div>
        )}
    >
        <pre class="h-80dvh overflow-auto rounded bg-white p-1 text-3 font-mono shadow shadow-paper-muted">
            {JSON.stringify($user.state.favorites.tagScores.value, undefined, 4)}
        </pre>
        <div
            className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] place-items-center gap-8"
            data-testid="gallery"
        >
            <For each={$displayFavorites.value}>
                {(favorite) => (
                    <a
                        key={favorite.id}
                        href={`https://e621.net/posts/${favorite.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative rounded bg-white p-1 shadow shadow-paper-muted"
                    >
                        <img
                            className="rounded"
                            data-testid="gallery-image"
                            alt={favorite.description}
                            loading="lazy"
                            width={150}
                            height={150}
                            src={`https://static1.e621.net/data/preview/${favorite.file.md5.at(0)}${favorite.file.md5.at(1)}/${favorite.file.md5.at(2)}${favorite.file.md5.at(3)}/${favorite.file.md5}.jpg`}
                        />
                        <Show if={!["png", "jpg"].includes(favorite.file.ext)}>
                            <div className="absolute inset--0.5ch h-[min-content] w-[min-content] b-rd-50% bg-white p-0.5ch shadow shadow-paper-muted">
                                <div className="i-carbon:play-filled-alt text-3" />
                            </div>
                        </Show>
                    </a>
                )}
            </For>
        </div>
    </Show>
)
