"use client"

import type { FunctionComponent } from "react"
import { observable } from "@legendapp/state"
import { $favorites } from "~/stores/favorites"
import { $user } from "~/stores/user"

const $username = observable("")

const Form: FunctionComponent = () => {
    const username = $username.use()

    return (
        <div className={"flex flex-col gap-4"} data-testid={"form"}>
            <input
                className={"c-background bg-foreground h-4ch p-x-2 b-rd-1 outline-none focus:outline-blue"}
                data-testid={"form--username"}
                onInput={(event) => { $username.set(event.currentTarget.value) }}
                type={"text"}
                value={username}
            />
            <button
                className={"bg-blue c-black b-rd-1 h-4ch"}
                disabled={$user.state.loading.use()}
                onClick={async () => {
                    await $user.actions.fetchUser(username)
                    void $favorites.actions.fetchFavorites($user.state.data.get())
                }}
            >
                {"Go"}
            </button>
        </div>
    )
}

export default Form
