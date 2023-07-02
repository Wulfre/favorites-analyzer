"use client"

import { FunctionComponent } from "react"
import InputField from "./_InputField"
import { useFavoritesResource, useUserResource } from "~/stores/favorites"
import { useFormStore } from "~/stores/form"

const Form: FunctionComponent = () => {
    const { username, limit } = useFormStore()
    const user = useUserResource()
    const posts = useFavoritesResource()

    const handleSubmit = async () => {
        await user.fetch()
        await posts.fetch()
    }

    return (
        <>
            <div data-id={"form"} className={"grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6"}>
                <InputField
                    label="Username"
                    value={username}
                    onChange={(event) => useFormStore.setState({ username: event.target.value })}
                />
                <InputField
                    label="Limit"
                    value={limit}
                    onChange={(event) => useFormStore.setState({ limit: Number.parseInt(event.target.value) })}
                />
            </div>
            <button className={"p-2 b-foreground b-2 b-rd-2"} onClick={handleSubmit}>
                Go
            </button>
        </>
    )
}

export default Form
