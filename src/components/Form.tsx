import { signal } from "@preact/signals"
import { $user } from "~/stores/user"

const $username = signal("")

export default () => (
    <div class="flex flex-col items-center gap-3">
        <input
            class="w-20ch rounded p-x-2 p-y-1 shadow shadow-paper-muted outline-none"
            type="text"
            value={$username.value}
            onInput={(event) => { $username.value = event.currentTarget.value }}
        />
        <button
            class="bg-highlighter-blue-bg p-x-2 p-y-1 c-highlighter-blue transition hover:c-highlighter-blue-muted"
            disabled={$user.state.loading.value}
            onClick={() => { void $user.actions.fetch($username.value) }}
        >
            Go
        </button>
        <span>{JSON.stringify($user.state.user.value, undefined, 4)}</span>
    </div>
)
