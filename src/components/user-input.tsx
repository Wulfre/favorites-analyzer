import { actions } from "astro:actions"
import { useSignal } from "@preact/signals"
import { useRef } from "preact/hooks"

export default function UserInput() {
    const usernameInput = useRef<HTMLInputElement>(null)
    const results = useSignal<Awaited<ReturnType<typeof actions.e621.getSuggestions>>["data"]>()

    return (
        <div>
            <input class="border-1" ref={usernameInput} type="text" />
            <button
                type="button"
                onClick={async () => {
                    const suggestions = await actions.e621.getSuggestions(
                        usernameInput.current?.value ?? "",
                    )
                    results.value = suggestions.data ?? []
                }}
            >
                Submit
            </button>
            <pre>{JSON.stringify(results, undefined, 4)}</pre>
        </div>
    )
}
