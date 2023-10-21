import type { FunctionComponent } from "react"

const Loader: FunctionComponent = () => (
    <div className={"flex justify-center"} data-testid={"loader"}>
        <span className={"i-carbon:circle-dash?mask text-15 animate-spin animate-duration-3s"} />
    </div>
)

export default Loader
