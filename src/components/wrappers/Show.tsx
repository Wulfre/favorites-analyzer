import type { JSX, ComponentChild } from "preact"

type Props = {
    children: ComponentChild
    else?: ComponentChild
    if: boolean
}

export default ({ children, ...props }: Props): JSX.Element => (
    props.if ? <>{children}</> : <>{props.else}</>
)
