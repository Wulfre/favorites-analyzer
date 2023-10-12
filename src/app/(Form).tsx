"use client"

import type { FunctionComponent } from "react"
import { observable } from "@legendapp/state"
import { $favorites } from "~/stores/favorites"
import { $user } from "~/stores/user"
import { $toaster } from "~/components/ui/Toaster/store"

const $username = observable("")

const Form: FunctionComponent = () => {
    const username = $username.use()

    return (
        <div className={"flex flex-col gap-5"} data-testid={"form"}>
            <input
                className={"c-primary-950 bg-primary-50 h-3ch px-2 b-rd-1 outline-none focus:outline-secondary-500"}
                data-testid={"form--username"}
                onInput={(event) => { $username.set(event.currentTarget.value) }}
                type={"text"}
                value={username}
            />
            <button
                className={"bg-secondary-500 c-secondary-50 b-rd-1 h-3ch"}
                disabled={$user.state.loading.use()}
                onClick={async () => {
                    await $user.actions.fetchUser(username)
                    void $favorites.actions.fetchFavorites($user.state.data.get())
                }}
            >
                {"Go"}
            </button>
            <button onClick={() => { $toaster.addToast({ title: `${$toaster.toasts.get().size + 1}`, description: "Hi." }) }}>{"Test Toast"}</button>
        </div>
    )
}

export default Form
