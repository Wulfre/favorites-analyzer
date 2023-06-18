'use client'

import Image from 'next/image'
import Loader from '~/components/loader'
import { usePostsStore } from "~/stores/posts"

const Gallery = () => {
    const { posts, postsLoading } = usePostsStore()

    if (postsLoading) {
        return <Loader />
    }

    const filteredPosts = posts.filter((post) => !post.flags.deleted)

    return (
        <div className={'grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6'}>
            {filteredPosts.map(post => (
                <div key={post.id} className="flex flex-col justify-center">
                    <a
                        href={`https://e621.net/posts/${post.id}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={'b-foreground b-2 b-rd-2 overflow-hidden'}
                    >
                        <object
                            data={post.sample.url ?? `https://static1.e621.net/data/sample/${post.file.md5.slice(0, 2)}/${post.file.md5.slice(2, 4)}/${post.file.md5}.jpg`}
                            className={'w-full'}
                        >
                            <object
                                data={`https://static1.e621.net/data/${post.file.md5.slice(0, 2)}/${post.file.md5.slice(2, 4)}/${post.file.md5}.${post.file.ext}`}
                                className={'w-full'}
                            >
                                <div className={'aspect-square bg-white c-background flex justify-center items-center'}>
                                    <span className={'i-carbon:no-image text-6xl filter-brightness-300'} />
                                </div>
                            </object>
                        </object>
                        <p className={'bg-foreground c-background p-1 text-center font-500'}>{post.file.ext}</p>
                    </a>
                </div>
            ))}
        </div >
    )
}

export default Gallery
