import type { JSX } from "preact"

type Props = {
    children: string
}

export default ({ children, ...props }: Props): JSX.Element => (
    <pre className={"bg-primary-900 p-1ch b-rd-1 overflow-hidden text-3 ws-pre-wrap"} {...props}>
        {children}
    </pre>
)
