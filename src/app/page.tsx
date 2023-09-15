"use client"

import type { FunctionComponent } from "react"
import { useUserStore } from "~/stores/user"

const IndexPage: FunctionComponent = () => {
    const $user = useUserStore()

    return (
        <main className={"p-y-4"} data-testid={"index"}>
            <input type="text" value={$user.state.name} onInput={(event) => {
                $user.actions.setName(event.currentTarget.value)
            }}
            />
            <p>{$user.state.name}</p>
        </main>
    )
}

export default IndexPage
