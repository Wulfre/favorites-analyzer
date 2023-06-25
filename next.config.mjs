/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [{
            protocol: "https",
            hostname: "static1.e621.net",
            port: "",
            path: "/data/**",
        }]
    },
    experimental: {
        serverActions: true,
    },
}

export default nextConfig
