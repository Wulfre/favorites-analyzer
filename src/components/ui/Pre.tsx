import type { FunctionComponent } from "react"

type PreProps = {
    children: string
}

const Pre: FunctionComponent<PreProps> = ({ children, ...props }) => (
    <pre className={"bg-primary-900 p-1ch b-rd-1 overflow-hidden text-3 ws-pre-wrap"} {...props}>
        {children}
    </pre>
)

export default Pre
