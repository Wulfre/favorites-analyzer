import { next as million } from "million/compiler"

/** @type {import("next").NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    reactStrictMode: true,
}

const millionConfig = {
    auto: {
        rsc: true,
        // skip: [],
        // threshold: 0.1,
    },
}

export default million(nextConfig, millionConfig)
