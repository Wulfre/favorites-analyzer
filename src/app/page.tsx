import type { FunctionComponent } from "react"
import Form from "./(Form)"
import Gallery from "./(Gallery)"

const IndexPage: FunctionComponent = () => (
    <main className={"flex flex-col gap-5 p-5"} data-testid={"index"}>
        <Form />
        <Gallery />
    </main>
)

export default IndexPage
