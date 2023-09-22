import type { FunctionComponent } from "react"
import Form from "./(Form)"
import Gallery from "./(Gallery)"

const IndexPage: FunctionComponent = () => (
    <main className={"p-y-4 flex flex-col gap-4"} data-testid={"index"}>
        <Form />
        <Gallery />
    </main>
)

export default IndexPage
