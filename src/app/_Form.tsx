"use client"

import type { FunctionComponent } from "react"
import { $user } from "~/stores/user"

const Form: FunctionComponent = () => (
    <div>
        <input
            onInput={(event) => { $user.name.set(event.currentTarget.value) }}
            type="text"
            value={$user.name.get()}
        />
        <p>{$user.name.use()}</p>
    </div>
)

export default Form
