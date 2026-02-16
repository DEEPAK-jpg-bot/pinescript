/** @type {import('next').NextConfig} */
const nextConfig = {
    // Basic config for Vercel deployment - no localhost rewrites needed in production
    // The vercel.json handles routing /api/* to the Python backend
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost:3000', 'pinescript.vercel.app'],
        },
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'daredevil.lemonsqueezy.com' },
        ],
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
