import type { FunctionComponent, HTMLAttributes, ReactNode } from "react"
import { cloneElement, isValidElement } from "react"
import { cn } from "~/utils/style"

export type AsChildProps<T> = (T & { asChild?: false }) | { asChild: true; children: ReactNode }

type Props = HTMLAttributes<HTMLElement> & {
    children?: ReactNode
}

const Slot: FunctionComponent<Props> = ({ children, ...props }) => {
    if (isValidElement(children)) {
        return cloneElement(children, {
            ...props,
            ...children.props,
            className: cn(
                props.className,
                children.props.className,
            ),
        })
    }

    return <slot />
}

export default Slot
