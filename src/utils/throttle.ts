// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const throttle = <T extends (...args: any[]) => Promise<any>>(
    fn: T,
    limit: number,
    interval: number,
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
    const queue: { args: Parameters<T>; resolve: (value: ReturnType<T>) => void }[] = []
    let running = 0
    let lastCall = 0

    const processQueue = () => {
        if (queue.length === 0 || running >= limit) return

        const now = Date.now()
        if (now - lastCall < interval) {
            setTimeout(processQueue, interval - (now - lastCall))
            return
        }

        const next = queue.shift()
        if (next) {
            running++
            lastCall = now
            fn(...next.args)
                .then(next.resolve)
                .finally(() => {
                    running--
                    setTimeout(processQueue, 0)
                })
        }
    }

    return (...args: Parameters<T>) => {
        return new Promise<ReturnType<T>>((resolve) => {
            queue.push({ args, resolve })
            processQueue()
        })
    }
}
