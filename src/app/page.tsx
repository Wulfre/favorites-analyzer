import Form from "~/app/(components)/form"
import Gallery from "~/app/(components)/gallery"

const IndexPage = async () => {
    return (
        <main data-id={"index"} className={"flex flex-col gap-6 p-6 max-w-1200px w-100dvw"}>
            <Form />
            <Gallery />
        </main>
    )
}

export default IndexPage
