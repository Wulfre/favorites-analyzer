"use client"

import type { FunctionComponent, HTMLAttributes } from "react"
import Slot from "../wrappers/Slot"
import type { AsChildProps } from "../wrappers/Slot"
import { cn } from "~/utils/style"

const variants = {
    primary: "bg-primary-500 hover:bg-primary-600 active:bg-primary-700",
    secondary: "bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700",
    ghost: "bg-[transparent] hover:bg-primary-600 active:bg-primary-700",
} as const

type Props = AsChildProps<HTMLAttributes<HTMLButtonElement>> & {
    variant?: keyof typeof variants
}

const Button: FunctionComponent<Props> = ({ asChild, variant = "primary", ...props }) => {
    const Component = asChild ? Slot : "button"
    return <Component className={cn("py-3 px-5 b-rd-1 transition-100", variants[variant])} {...props} />
}

export default Button
