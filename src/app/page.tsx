import Form from '~/components/form'
import Gallery from '~/components/gallery'

const IndexPage = async () => {
    return (
        <main className={'flex flex-col items-center gap-6 p-6 max-w-1200px'}>
            <Form />
            <Gallery />
        </main>
    )
}

export default IndexPage
