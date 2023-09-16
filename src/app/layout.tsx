import type { FunctionComponent, ReactNode } from "react"
import { Analytics } from "@vercel/analytics/react"
import "~/app/globals.css"

type Props = {
    children: ReactNode
}

const RootLayout: FunctionComponent<Props> = ({ children }) => (
    <html lang="en">
        <body className="font-sans bg-background c-foreground min-h-100dvh max-w-1200px m-auto">
            {children}
            <Analytics />
        </body>
    </html>
)

export const metadata = {
    title: "Favorites Analyzer",
}

export default RootLayout
