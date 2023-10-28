export type ManagedTimeout = {
    state: "pending" | "resolved" | "cancelled" | "paused"
    _startTime: number
    _delay: number
    _timeout: number | undefined
    timeRemaining: number
    pause: () => void
    resume: () => void
    reset: () => void
    cancel: () => void
    execute: () => void
}

export const createManagedTimeout = (callback: () => void, delay = 0): ManagedTimeout => {
    const timeout: ManagedTimeout = {
        state: "pending",
        _startTime: Date.now(),
        _delay: delay,
        _timeout: setTimeout(() => {
            timeout.execute()
        }, delay),
        get timeRemaining() {
            const elapsed = Date.now() - timeout._startTime
            return Math.max(0, timeout._delay - elapsed)
        },
        execute: () => {
            if (timeout.state === "pending" || timeout.state === "paused") {
                clearTimeout(timeout._timeout)
                timeout.state = "resolved"
                timeout._timeout = undefined
                timeout._delay = 0
                callback()
            }
        },
        pause: () => {
            if (timeout.state === "pending") {
                clearTimeout(timeout._timeout)
                timeout.state = "paused"
                timeout._timeout = undefined
                timeout._delay = timeout.timeRemaining
            }
        },
        resume: () => {
            if (timeout.state === "paused") {
                timeout._timeout = setTimeout(() => {
                    timeout.execute()
                }, timeout._delay)
                timeout.state = "pending"
                timeout._startTime = Date.now()
            }
        },
        reset: () => {
            clearTimeout(timeout._timeout)
            timeout._timeout = setTimeout(() => {
                timeout.execute()
            }, delay)
            timeout.state = "pending"
            timeout._delay = delay
            timeout._startTime = Date.now()
        },
        cancel: () => {
            if (timeout.state !== "cancelled") {
                clearTimeout(timeout._timeout)
                timeout.state = "cancelled"
                timeout._timeout = undefined
                timeout._delay = 0
                timeout._startTime = 0
            }
        },
    }

    return timeout
}
