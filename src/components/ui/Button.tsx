import type { JSX, ComponentChild } from "preact"
import { cn } from "~/utils/style"

const variants = {
    primary: "bg-highlighter-blue-bg shadow-highlighter-blue-muted c-highlighter-blue hover:c-highlighter-blue-muted",
    secondary: "bg-highlighter-teal-bg shadow-highlighter-teal-muted c-highlighter-teal hover:c-highlighter-teal-muted",
    destructive: "bg-highlighter-purple-bg shadow-highlighter-purple-muted c-highlighter-purple hover:c-highlighter-purple-muted",
}

type Props = JSX.HTMLAttributes<HTMLButtonElement> & {
    children: ComponentChild
    variant?: keyof typeof variants
}

export default ({ variant = "primary", className, children, ...props }: Props): JSX.Element => (
    <button class={cn("p-x-5 p-y-1 transition rounded shadow", variants[variant], className)} {...props}>
        {children}
    </button>
)
