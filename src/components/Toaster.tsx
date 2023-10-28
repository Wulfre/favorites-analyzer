import { signal, computed } from "@preact/signals"
import { createManagedTimeout } from "~/utils/timeout"
import type { ManagedTimeout } from "~/utils/timeout"
import { cn } from "~/utils/style"
import type { JSX } from "preact"

const positionStyles = {
    "top-left": "top-0 left-0",
    "top-center": "top-0 left-50% transform-translate-x--50%",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-center": "bottom-0 left-50% transform-translate-x--50%",
    "bottom-right": "bottom-0 right-0",
}

const typeStyles = {
    info: "bg-primary-400 c-primary-900",
    success: "bg-success-400 c-success-900",
    warning: "bg-warning-400 c-warning-900",
    error: "bg-error-400 c-error-900",
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

            $toaster.state.toasts.value = new Map([
                ...$toaster.state.toasts.value,
                [key, {
                    header: toast.header,
                    message: toast.message,
                    type: toast.type ?? "info",
                    timeout: createManagedTimeout(() => {
                        $toaster.state.toasts.value.delete(key)
                    }, 5000),
                }],
            ])
        },
    },
}

const Toast = ({ header, message, timeout, type = "info" }: ToastProps): JSX.Element => (
    <div
        data-testid={"toast"}
        className={cn("relative bg-primary-900 flex flex-col p-5 b-rd-1 w-30ch ", typeStyles[type])}
    >
        <button className={"i-carbon:close?mask absolute right-1ch top-1ch"} onClick={() => { timeout.execute() }} />
        <header className={"text-8"}>{header}</header>
        <span>{message}</span>
    </div>
)

type ToasterProps = JSX.HTMLAttributes<HTMLDivElement> & {
    position?: keyof typeof positionStyles
}

export default ({ position = "bottom-center", className }: ToasterProps): JSX.Element => (
    <div
        data-testid={"toaster"}
        className={cn("fixed flex flex-col gap-5 p-5", positionStyles[position], className)}
    >
        {[...$toaster.state.toasts.value.entries()].map(([key, toast]) => (
            <Toast key={key} {...toast} />
        ))}
    </div>
)
