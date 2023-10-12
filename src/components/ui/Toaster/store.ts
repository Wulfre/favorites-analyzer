import { computed, observable } from "@legendapp/state"
import type { ToastProps } from "./Toast"
import { createPauseableTimeout } from "~/utils/timeout"

export const $toaster = observable({
    maxVisible: 3,
    toasts: new Map<string, ToastProps>(),
    visibleToastKeys: computed((): string[] => [...$toaster.toasts].reverse().filter((_, index) => index < $toaster.maxVisible.get()).map(([key]) => key)),
    setMaxVisible: (newMax: number) => { $toaster.maxVisible.set(newMax) },
    addToast: (toast: Omit<ToastProps, "timeout">, duration = 5000) => {
        const key = crypto.randomUUID()
        const timeout = createPauseableTimeout(() => { $toaster.toasts.delete(key) }, duration)
        $toaster.toasts.set(key, { ...toast, timeout })
    },
})

$toaster.onChange(() => {
    [...$toaster.toasts.get()].reverse().forEach(([key, toast]) => {
        $toaster.visibleToastKeys.get().includes(key) ? toast.timeout.resume() : toast.timeout.pause()
    })
})
