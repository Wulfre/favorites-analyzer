import { signal, computed, effect } from "@preact/signals"
import type { JSX } from "preact"
import { createManagedTimeout } from "~/utils/timeout"
import type { ManagedTimeout } from "~/utils/timeout"
import { cn } from "~/utils/style"

const positionStyles = {
    "top-left": "top-0 left-0",
    "top-center": "top-0 left-50% transform-translate-x--50%",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-center": "bottom-0 left-50% transform-translate-x--50%",
    "bottom-right": "bottom-0 right-0",
}

const typeStyles = {
    info: "bg-highlighter-teal-bg c-highlighter-teal shadow-highlighter-teal-muted",
    success: "bg-highlighter-green-bg c-highlighter-green shadow-highlighter-green-muted",
    warning: "bg-highlighter-orange-bg c-highlighter-orange shadow-highlighter-orange-muted",
    error: "bg-highlighter-purple-bg c-highlighter-purple shadow-highlighter-purple-muted",
}

type ToastProps = {
    header: string
    message: string
    type?: "info" | "success" | "warning" | "error"
    timeout: ManagedTimeout
}

export const $toaster = {
    state: {
        toasts: signal(new Map<string, ToastProps>()),
        maxVisible: signal(3),
        visibleToastKeys: computed(
            (): string[] => [...$toaster.state.toasts.value]
                .reverse()
                .filter((_, index) => index < $toaster.state.maxVisible.value)
                .map(([key]) => key),
        ),
    },
    actions: {
        addToast: (toast: Omit<ToastProps, "timeout">) => {
            const key = crypto.randomUUID()
            const newMap = new Map($toaster.state.toasts.value)

            newMap.set(key, {
                header: toast.header,
                message: toast.message,
                type: toast.type ?? "info",
                timeout: createManagedTimeout(() => {
                    const newMap = new Map($toaster.state.toasts.value)
                    newMap.delete(key)
                    $toaster.state.toasts.value = newMap
                }, 5000),
            })

            $toaster.state.toasts.value = newMap
        },
    },
}

effect(() => {
    $toaster.state.toasts.value.forEach((toast, key) => {
        $toaster.state.visibleToastKeys.peek().includes(key)
            ? toast.timeout.resume()
            : toast.timeout.pause()
    })
})

const Toast = ({ header, message, timeout, type = "info" }: ToastProps): JSX.Element => (
    <div
        data-testid="toast"
        class={cn("relative bg-paper-bg flex flex-col p-5 rounded shadow w-30ch", typeStyles[type])}
    >
        <button class="i-carbon:close-large absolute right-1ch top-1ch" onClick={() => { timeout.execute() }} />
        <header class="text-8">{header}</header>
        <span>{message}</span>
    </div>
)

type ToasterProps = JSX.HTMLAttributes<HTMLDivElement> & {
    position?: keyof typeof positionStyles
}

export default ({ position = "bottom-center", className }: ToasterProps): JSX.Element => (
    <div
        data-testid="toaster"
        className={cn("fixed flex flex-col gap-5 p-5", positionStyles[position], className)}
        onMouseEnter={() => {
            $toaster.state.toasts.value.forEach((toast) => {
                toast.timeout.pause()
            })
        }}
        onMouseLeave={() => {
            $toaster.state.toasts.value.forEach((toast) => {
                toast.timeout.resume()
            })
        }}
    >
        {[...$toaster.state.toasts.value.entries()]
            .filter(([key]) => $toaster.state.visibleToastKeys.value.includes(key))
            .map(([key, toast]) => (
                <Toast key={key} {...toast} />
            ))}
    </div>
)
