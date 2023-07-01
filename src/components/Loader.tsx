import { FunctionComponent } from "react"

const Loader: FunctionComponent = () => {
    return (
        <div data-id={"loader"} className="flex justify-center">
            <span className="i-carbon:circle-dash text-6xl animate-spin animate-duration-3s" />
        </div>
    )
}

export default Loader
