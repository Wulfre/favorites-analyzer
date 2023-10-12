import type { FunctionComponent } from "react"
import type { PauseableTimeout } from "~/utils/timeout"
import { cn } from "~/utils/style"

export type ToastProps = {
    title: string
    description: string
    isVisible?: boolean
    timeout: PauseableTimeout
}

const Toast: FunctionComponent<ToastProps> = ({ title, description, isVisible, timeout }) => (
    <div
        className={cn("relative w-34ch px-5 py-3 b-rd-1 bg-primary-50 c-primary-950", !isVisible && "hidden")}
        data-testid={"toast"}
    >
        <button
            className="i-carbon:close?mask absolute right-2 top-2"
            onClick={() => { timeout.complete() }}
        />
        <header>{title}</header>
        <p className="text-4">{description}</p>
    </div>
)

export default Toast
