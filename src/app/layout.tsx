import type { FunctionComponent, ReactNode } from "react"
import { Analytics } from "@vercel/analytics/react"
import "~/app/globals.css"
import { LegendStateProvider } from "~/components/LegendStateProvider"

type Props = {
    children: ReactNode
}

const RootLayout: FunctionComponent<Props> = (props) => (
    <html lang={"en"}>
        <body className={"min-h-100dvh max-w-1200px mx-auto text-5 font-sans font-500 bg-primary-950 c-primary-50"}>
            <LegendStateProvider>
                {props.children}
            </LegendStateProvider>
            <Analytics debug={false} />
        </body>
    </html>
)

export const metadata = {
    title: "Favorites Analyzer",
}

export default RootLayout
