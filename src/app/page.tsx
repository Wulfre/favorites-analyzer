import type { FunctionComponent } from "react"
import Form from "./(form)/Form"
import Gallery from "./(gallery)/Gallery"

const IndexPage: FunctionComponent = () => (
    <main data-id={"index"} className={"flex flex-col gap-6 p-6 max-w-1200px w-100dvw"}>
        <Form />
        <Gallery/>
    </main>
)

export default IndexPage
