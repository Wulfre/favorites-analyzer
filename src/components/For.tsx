import type { JSX, ComponentChild } from "preact"

type Props<T> = {
    each: T[]
    children: (item: T) => ComponentChild
}

export default <T extends unknown>({ each, children }: Props<T>): JSX.Element => (
    <>{each.map((item) => children(item))}</>
)
