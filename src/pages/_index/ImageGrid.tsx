import { computed } from "@preact/signals"
import { $user } from "~/stores/user"
import Loader from "~/components/Loader"

const $displayFavorites = computed(() => $user.state.favorites.value.filter((post) => !post.flags.deleted))

export default () => (
    $user.state.loading.value
        ? <Loader />
        : (
            <div
                className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] place-items-center gap-8"
                data-testid="gallery"
            >
                {$displayFavorites.value.map((favorite) => (
                    <a
                        key={favorite.id}
                        href={`https://e621.net/posts/${favorite.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative"
                    >
                        <img
                            className="b-primary-200 bg-primary-200 b-2 b-rd-1"
                            data-testid={`gallery-image-${favorite.id}`}
                            alt=""
                            loading="lazy"
                            width={150}
                            height={150}
                            src={`https://static1.e621.net/data/preview/${favorite.file.md5.at(0)}${favorite.file.md5.at(1)}/${favorite.file.md5.at(2)}${favorite.file.md5.at(3)}/${favorite.file.md5}.jpg`}
                        />
                        { !["png", "jpg"].includes(favorite.file.ext)
                    && (
                        <div className="absolute inset--0.5ch h-[min-content] w-[min-content] b-rd-50% bg-paper-muted p-0.5ch">
                            <div className="i-carbon:play-filled-alt text-3" />
                        </div>
                    )}
                    </a>
                ))}
            </div>
        )
)