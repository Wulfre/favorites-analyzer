"use client"

import { useFavoritesResource, useUserResource } from "~/stores/favorites"
import { useFormStore } from "~/stores/form"

const Form = () => {
    const { username, setUsername, limit, setLimit } = useFormStore()
    const posts = useFavoritesResource()
    const user = useUserResource()

    return (
        <>
            <div data-id={"form"} className={"grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6"}>
                <div className="flex flex-col">
                    <span>Username</span>
                    <input
                        className={"bg-foreground c-background p-2 b-white b-2 b-rd-2 outline-none text-center focus:outline-blue"}
                        type={"text"}
                        value={username}
                        onChange={(event) => {
                            setUsername(event.currentTarget.value)
                        }}
                    />
                </div>
                <div className="flex flex-col">
                    <span>Limit</span>
                    <input
                        className={"bg-foreground c-background p-2 b-white b-2 b-rd-2 outline-none text-center focus:outline-blue"}
                        type={"number"}
                        value={limit}
                        onChange={(event) => {
                            setLimit(Number(event.currentTarget.value))
                        }}
                    />
                </div>
            </div>
            <button className={"p-2 m-t-6 b-foreground b-2 b-rd-2"} onClick={async () => {
                await user.fetch()
                await posts.fetch()
            }}>
                Go
            </button>
        </>
    )
}

export default Form
