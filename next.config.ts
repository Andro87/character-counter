import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    turbopack: {
        rules: {
            "*.svg": {
                loaders: ["@svgr/webpack"], // Use the installed loader
                as: "*.js" // Prevents conflicts with Next.js image optimization
            }
        }
    }
};

export default nextConfig;
