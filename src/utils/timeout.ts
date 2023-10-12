type TimeoutState = {
    timeout: number | NodeJS.Timeout
    startTime: number
    duration: number
}

export type PauseableTimeout = {
    state: "paused" | "running" | "cleared"
    getTimeRemaining: () => number
    pause: () => void
    resume: () => void
    clear: () => void
    complete: () => void
}

export const createPauseableTimeout = (callback: () => void, delay: number): PauseableTimeout => {
    const timeout: TimeoutState = {
        timeout: setTimeout(callback, delay),
        startTime: Date.now(),
        duration: delay,
    }

    const pauseableTimeout: PauseableTimeout = {
        state: "running",
        getTimeRemaining: () => timeout.duration - (Date.now() - timeout.startTime),
        pause: () => {
            if (pauseableTimeout.state === "running") {
                clearTimeout(timeout.timeout)
                timeout.duration = pauseableTimeout.getTimeRemaining()
                pauseableTimeout.state = "paused"
            }
        },
        resume: () => {
            if (pauseableTimeout.state === "paused") {
                timeout.startTime = Date.now()
                timeout.timeout = setTimeout(callback, timeout.duration)
                pauseableTimeout.state = "running"
            }
        },
        clear: () => {
            if (pauseableTimeout.state !== "cleared") {
                clearTimeout(timeout.timeout)
                pauseableTimeout.state = "cleared"
            }
        },
        complete: () => {
            if (pauseableTimeout.state !== "cleared") {
                callback()
                pauseableTimeout.clear()
            }
        },
    }

    return pauseableTimeout
}
