"use client"

import type { FunctionComponent } from "react"
import { Show } from "@legendapp/state/react"
import { $user } from "~/stores/user"

const Form: FunctionComponent = () => (
    <div className={"flex flex-col gap-4"} data-testid="form">
        <input
            className="c-background bg-foreground outline-none h-4ch p-x-2 b-rd-1 focus:outline-blue"
            data-testid="form--username"
            onInput={(event) => { $user.username.set(event.currentTarget.value) }}
            type="text"
            value={$user.username.get()}
        />
        <Show if={$user.user.error.get()}><span className={"c-red"}>{$user.user.error.use()}</span></Show>
        <button
            className="bg-blue b-rd-1 h-4ch"
            disabled={$user.user.loading.get()}
            onClick={() => { void $user.fetchUser() }}
        >
            Go
        </button>
        <p>{$user.username.use()}</p>
        <Show if={$user.user.data.get()}>
            <pre className="ws-pre-wrap">{JSON.stringify($user.user.use(), undefined, 4)}</pre>
        </Show>
    </div >
)

export default Form
