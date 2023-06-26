const mapToArray = (map: Map<unknown, unknown>): Array<unknown> => (
    Array.from(map, ([key, value]) => [key, value instanceof Map ? mapToArray(value) : value])
)

export { mapToArray }
