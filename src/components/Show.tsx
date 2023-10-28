import type { JSX, ComponentChild } from "preact"

type Props = {
    children: ComponentChild
    fallback?: ComponentChild
    when: boolean
}

export default ({ children, fallback, when }: Props): JSX.Element => (
    when ? <>{children}</> : <>{fallback}</>
)
