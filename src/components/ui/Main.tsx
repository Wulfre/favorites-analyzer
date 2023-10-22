import type { FunctionComponent, ReactNode } from "react"

type MainProps = {
    children: ReactNode
}
const Main: FunctionComponent<MainProps> = ({ children, ...props }) => (
    <main className={"flex flex-col flex-grow gap-5 p-5"} {...props}>
        {children}
    </main>
)

export default Main
