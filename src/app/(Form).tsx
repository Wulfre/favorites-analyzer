"use client"

import type { FunctionComponent } from "react"
import { observable } from "@legendapp/state"
import { observer } from "@legendapp/state/react"
import { $favorites } from "~/stores/favorites"
import { $user } from "~/stores/user"
import Button from "~/components/ui/Button"

const $username = observable("")

const Form: FunctionComponent = () => (
    <div className={"flex flex-col gap-5"} data-testid={"form"}>
        <input
            className={"c-primary-950 bg-primary-50 h-3ch px-2 b-rd-1 outline-none focus:outline-primary-500"}
            data-testid={"form--username"}
            onInput={(event) => { $username.set(event.currentTarget.value) }}
            type={"text"}
            value={$username.get()}
        />
        <Button
            onClick={async () => {
                if ($user.state.loading.get()) { return } // simulate disabled
                await $user.actions.fetch($username.get())
                void $favorites.actions.fetch($user.state.data.get())
            }}
        >
            {"Go"}
        </Button>
    </div>
)

export default observer(Form)
