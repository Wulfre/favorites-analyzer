"use client"

import type { FunctionComponent, ReactNode } from "react"
import { enableReactUse } from "@legendapp/state/config/enableReactUse"

enableReactUse() // enables `use()` method on observables in client components

type Props = {
    children: ReactNode
}

const LegendStateConfig: FunctionComponent<Props> = ({ children }) => children

export default LegendStateConfig
