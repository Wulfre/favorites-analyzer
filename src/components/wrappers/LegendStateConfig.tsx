"use client"

import type { FunctionComponent, ReactNode } from "react"
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking"

enableReactTracking({
    auto: true,
})

type Props = {
    children: ReactNode
}

const LegendStateConfig: FunctionComponent<Props> = ({ children }) => children

export default LegendStateConfig
