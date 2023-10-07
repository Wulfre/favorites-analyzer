export const isNode = () => typeof process !== "undefined"
export const isWeb = () => typeof self !== "undefined" // eslint-disable-line no-restricted-globals -- web worker global
export const isBrowser = () => typeof window !== "undefined"
export const isWorker = () => typeof self !== "undefined" && self instanceof WorkerGlobalScope // eslint-disable-line no-restricted-globals -- web worker global
