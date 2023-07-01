import { Analytics } from "@vercel/analytics/react"
import React from "react"
import { z } from "zod"
import "~/app/globals.css"

const metadata = {
    title: "Favorites Analyzer",
}

const rootLayoutPropsSchema = z.object({
    children: z.custom<React.ReactNode>((value) => React.isValidElement(value)).optional()
})
type RootLayoutProps = z.infer<typeof rootLayoutPropsSchema>

const RootLayout = (props: RootLayoutProps) => {
    return (
        <html lang="en">
            <body className="font-sans bg-background c-foreground grid justify-center min-h-100dvh">
                {props.children}
                <Analytics />
            </body>
        </html>
    )
}

export default RootLayout
export { metadata }
