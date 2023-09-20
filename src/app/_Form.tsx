"use client"

import type { FunctionComponent } from "react"
import { observable } from "@legendapp/state"
import { Show } from "@legendapp/state/react"
import { $user } from "~/stores/user"

const $username = observable<string>("")

const Form: FunctionComponent = () => (
    <div className={"flex flex-col gap-4"} data-testid="form">
        <input
            className="c-background bg-foreground outline-none h-4ch p-x-2 b-rd-1 focus:outline-blue"
            data-testid="form--username"
            onInput={(event) => { $username.set(event.currentTarget.value) }}
            type="text"
            value={$username.use()} />
        <button
            className="bg-blue c-black b-rd-1 h-4ch"
            disabled={$user.state.loading.use()}
            onClick={() => { void $user.actions.fetchUser($username.get()) }}
        >
            Go
        </button>
        <Show if={$user.state.error.use()}><span className={"c-red"}>{$user.state.error.use()}</span></Show>
        <Show if={$user.state.data.use()}>
            <pre className="ws-pre-wrap">{JSON.stringify($user.state.use(), undefined, 4)}</pre>
        </Show>
    </div>
)

export default Form
