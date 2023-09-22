"use client"

import type { FunctionComponent } from "react"
import { observable } from "@legendapp/state"
import { $favorites } from "~/stores/favorites"
import { $user } from "~/stores/user"

const $username = observable<string>("")

const Form: FunctionComponent = () => (
    <div className={"flex flex-col gap-4"} data-testid={"form"}>
        <input
            className={"c-background bg-foreground outline-none h-4ch p-x-2 b-rd-1 focus:outline-blue"}
            data-testid={"form--username"}
            onInput={(event) => { $username.set(event.currentTarget.value) }}
            type={"text"}
            value={$username.use()} />
        <button
            className={"bg-blue c-black b-rd-1 h-4ch"}
            disabled={$user.state.loading.use()}
            onClick={async () => {
                await $user.actions.fetchUser($username.get())
                void $favorites.actions.fetchFavorites($user.state.data.id.get())
            }}
        >
            {"Go"}
        </button>
    </div>
)

export default Form
