"use client"
import type { FunctionComponent, HTMLAttributes } from "react"
import { computed, observable } from "@legendapp/state"
import { observer } from "@legendapp/state/react"
import { createManagedTimeout } from "~/utils/timeout"
import type { ManagedTimeout } from "~/utils/timeout"
import { cn } from "~/utils/style"

type ToastProps = {
    header: string
    message: string
    type?: "info" | "success" | "warning" | "error"
    timeout: ManagedTimeout
}

export const $toaster = observable({
    toasts: new Map<string, ToastProps>(),
    maxVisible: 3,
    visibleToastKeys: computed(
        (): string[] => [...$toaster.toasts]
            .reverse()
            .filter((_, index) => index < $toaster.maxVisible.get())
            .map(([key]) => key),
    ),
    createToast: (toast: Omit<ToastProps, "timeout">) => {
        const key = crypto.randomUUID()

        $toaster.toasts.set(key, {
            header: toast.header,
            message: toast.message,
            type: toast.type ?? "info",
            timeout: createManagedTimeout(() => {
                $toaster.toasts.delete(key)
            }, 5000),
        })
    },
})

const positionStyles = {
    "top-left": "top-0 left-0",
    "top-center": "top-0 left-50% transform-translate-x--50%",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-center": "bottom-0 left-50% transform-translate-x--50%",
    "bottom-right": "bottom-0 right-0",
}

const typeStyles = {
    info: "bg-primary-700 c-primary-200",
    success: "bg-success-700 c-success-200",
    warning: "bg-warning-700 c-warning-200",
    error: "bg-error-700 c-error-200",
}

type Props = HTMLAttributes<HTMLDivElement> & {
    position?: keyof typeof positionStyles
}

const Toast: FunctionComponent<ToastProps> = ({ header, message, timeout, type = "info" }) => (
    <div
        data-testid={"toast"}
        className={cn("relative bg-primary-900 flex flex-col p-5 b-rd-1 w-30ch ", typeStyles[type])}
    >
        <button className={"i-carbon:close?mask absolute right-1ch top-1ch"} onClick={() => { timeout.execute() }} />
        <header className={"text-8"}>{header}</header>
        <span>{message}</span>
    </div>
)

const Toaster: FunctionComponent<Props> = ({ position = "bottom-center", className }) => (
    <div
        data-testid={"toaster"}
        className={cn("fixed flex flex-col gap-5 p-5", positionStyles[position], className)}
        onMouseEnter={() => { $toaster.toasts.forEach((toast) => { toast.timeout.pause() }) }}
        onMouseLeave={() => { $toaster.toasts.forEach((toast) => { toast.timeout.resume() }) }}
    >
        {[...$toaster.toasts.get().entries()].map(([key, toast]) => (
            <Toast key={key} {...toast} />
        ))}
    </div>
)

export default observer(Toaster)
