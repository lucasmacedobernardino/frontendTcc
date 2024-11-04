/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imagenstcclucas.s3.us-east-2.amazonaws.com',
                pathname: '/assets/**',
            },
        ],
    },
}

module.exports = nextConfig
