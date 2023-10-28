import type { JSX } from "preact"

type Props = {
    children: JSX.Element | JSX.Element[] | string
    if: boolean
    else?: JSX.Element | JSX.Element[] | string
}

export default ({ children, ...props }: Props): JSX.Element => (
    <>{props.if ? children : props.else}</>
)
