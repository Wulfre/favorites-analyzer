"use client"

import type { FunctionComponent } from "react"
import { For } from "@legendapp/state/react"
import { $toaster } from "./store"
import Toast from "./Toast"
import { cn } from "~/utils/style"

const positions = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "top-center": "top-0 left-50% translate-x--50%",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-center": "bottom-0 left-50% translate-x--50%",
}

type ToasterProps = {
    position?: keyof typeof positions
    maxVisible?: number
}

const Toaster: FunctionComponent<ToasterProps> = (
    { position = "bottom-right", maxVisible },
) => {
    if (maxVisible) {
        $toaster.setMaxVisible(maxVisible)
    }

    return (
        <section
            data-testid={"toaster"}
            className={cn("fixed flex flex-col gap-3 p-5", positions[position])}
            onMouseOver={() => {
                $toaster.visibleToastKeys.get().forEach((id) => { $toaster.toasts.get().get(id)?.timeout.pause() })
            }}
            onMouseOut={() => {
                $toaster.visibleToastKeys.get().forEach((id) => { $toaster.toasts.get().get(id)?.timeout.resume() })
            }}
        >
            <For each={$toaster.toasts}>
                {(toast) => (
                    <Toast {...toast} isVisible={$toaster.visibleToastKeys.peek().includes(key)} />
                )}
            </For>
        </section>
    )
}

export default Toaster
