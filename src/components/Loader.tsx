import type { FunctionComponent } from "react"

const Loader: FunctionComponent = () => (
    <div className="flex justify-center" data-id={"loader"}>
        <span className="i-carbon:circle-dash text-16 animate-spin animate-duration-3s" />
    </div>
)

export default Loader
