import type { FunctionComponent } from "react"
import { memo } from "react"
import type { Post } from "~/schemas/post"
import FallbackImage from "./_FallbackImage"

type GalleryItemProps = {
    post: Post,
}

const GalleryItem: FunctionComponent<GalleryItemProps> = ({ post }) => (
    <div data-id={"gallery-post"} className="flex flex-col justify-center">
        <a
            href={`https://e621.net/posts/${post.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={"b-foreground b-2 b-rd-2 overflow-hidden"}
        >
            <FallbackImage
                srcList={[
                    `https://static1.e621.net/data/sample/${post.file.md5.slice(0, 2)}/${post.file.md5.slice(2, 4)}/${post.file.md5}.jpg`,
                    `https://static1.e621.net/data/${post.file.md5.slice(0, 2)}/${post.file.md5.slice(2, 4)}/${post.file.md5}.${post.file.ext}`,
                ]}
                fallback={
                    <div className={"aspect-square bg-white c-background flex justify-center items-center"}>
                        <span className={"i-carbon:no-image text-6xl filter-brightness-300"} />
                    </div>
                }
                alt={`Post #${post.id}`}
                loading="lazy"
            />
        </a>
    </div>
)

export default memo(GalleryItem)
