import type { JSX } from "preact"
import { cn } from "~/utils/style"

const variants = {
    primary: "bg-highlighter-blue-bg c-highlighter-blue hover:c-highlighter-blue-muted",
    secondary: "bg-highlighter-teal-bg c-highlighter-teal hover:c-highlighter-teal-muted",
    destructive: "bg-highlighter-purple-bg c-highlighter-purple hover:c-highlighter-purple-muted",
}

type Props = JSX.HTMLAttributes<HTMLButtonElement> & {
    children: JSX.Element | string
    variant?: keyof typeof variants
}

export default ({ variant = "primary", className, children, ...props }: Props): JSX.Element => (
    <button class={cn("p-x-5 p-y-1 transition", variants[variant], className)} {...props}>
        {children}
    </button>
)
