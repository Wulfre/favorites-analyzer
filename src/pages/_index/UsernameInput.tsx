import { signal } from "@preact/signals"
import Button from "~/components/Button"
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
        <Button
            disabled={$user.state.loading.value}
            onClick={() => { void $user.actions.fetch($username.value) }}
        >
            Go
        </Button>
    </div>
)