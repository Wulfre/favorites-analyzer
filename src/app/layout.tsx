import "~/app/globals.css"
import { Analytics } from "@vercel/analytics/react"
import type { FunctionComponent, ReactNode } from "react"

type RootLayoutProps = {
    children: ReactNode,
}

const metadata = {
    title: "Favorites Analyzer",
}

const RootLayout: FunctionComponent<RootLayoutProps> = ({ children }) => (
    <html lang="en">
        <body className="font-sans bg-background c-foreground grid justify-center min-h-100dvh">
            {children}
            <Analytics />
        </body>
    </html>
)

export default RootLayout
export { metadata }
