import { signal } from "@preact/signals"
import { $user } from "~/stores/user"

const $username = signal("")

export default () => (
    <div class="flex flex-col gap-3">
        <input
            class="rounded p-x-2 p-y-1 shadow shadow-paper-muted outline-none"
            type="text"
            value={$username.value}
            onInput={(event) => { $username.value = event.currentTarget.value }}
        />
        <button onClick={() => { void $user.actions.fetch($username.value) }}>Go</button>
        <span>{JSON.stringify($user.signal.value, undefined, 4)}</span>
    </div>
)
