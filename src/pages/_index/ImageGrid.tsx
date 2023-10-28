import Show from "~/components/Show"
import { $user } from "~/stores/user"

export default () => (

    <div
        className={"grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-8 place-items-center"}
        data-testid={"gallery"}
    >
        {$user.state.favorites.value.map((favorite) => (
            <a
                key={favorite.id}
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
)
