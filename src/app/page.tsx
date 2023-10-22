import type { FunctionComponent } from "react"
import Form from "./(Form)"
import Gallery from "./(Gallery)"
import Main from "~/components/ui/Main"

const IndexPage: FunctionComponent = () => (
    <Main data-testid={"index"}>
        <Form />
        <Gallery />
    </Main>
)

export default IndexPage
