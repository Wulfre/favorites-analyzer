"use client"

import type { FunctionComponent, ReactNode } from "react"
import { enableReactUse } from "@legendapp/state/config/enableReactUse"

enableReactUse() // enables `use()` method on observables in client components

type Props = {
    children: ReactNode
}

export const LegendStateProvider: FunctionComponent<Props> = (props) => props.children
