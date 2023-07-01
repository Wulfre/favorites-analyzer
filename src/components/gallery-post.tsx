import { memo } from "react"
import { Img } from "react-image"
import { type Post } from "~/schemas/post"

const GalleryPost = ({post}: {post: Post}) => {
    return (
        <div data-id={"gallery-post"} className="flex flex-col justify-center">
            <a
                href={`https://e621.net/posts/${post.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={"b-foreground b-2 b-rd-2 overflow-hidden"}
            >
                <Img
                    src={[
                        `https://static1.e621.net/data/sample/${post.file.md5.slice(0, 2)}/${post.file.md5.slice(2, 4)}/${post.file.md5}.jpg`,
                        `https://static1.e621.net/data/${post.file.md5.slice(0, 2)}/${post.file.md5.slice(2, 4)}/${post.file.md5}.${post.file.ext}`
                    ]}
                    unloader={
                        <div className={"aspect-square bg-white c-background flex justify-center items-center"}>
                            <span className={"i-carbon:no-image text-6xl filter-brightness-300"} />
                        </div>
                    }
                />
            </a>
        </div>
    )
}

export default memo(GalleryPost)
