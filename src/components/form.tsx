'use client'

import { useFormStore } from '~/stores/form'
import { usePostsStore } from '~/stores/posts'

const Form = () => {
    const { username, setUsername } = useFormStore()
    const { fetchPosts, postsLoading } = usePostsStore()

    return (
        <div data-id={'form-user'} className={'flex flex-col gap-6 w-32ch'}>
            <div className='flex flex-col'>
                <input
                    className={'bg-foreground c-background p-2 b-transparent b-2 b-rd-2 outline-none text-center focus:b-blue placeholder:c-background placeholder:opacity-50'}
                    type={'text'}
                    placeholder={'username'}
                    value={username}
                    onInput={(event) => {
                        setUsername(event.currentTarget.value)
                    }} />
            </div>
            <button className={'p-2 b-foreground b-2 b-rd-2'} disabled={postsLoading} onClick={() => {
                fetchPosts()
            }}>Go</button>
        </div>
    )
}

export default Form
