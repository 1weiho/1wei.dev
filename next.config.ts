import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qpsypezomogp2dxq.public.blob.vercel-storage.com',
      },
    ],
  },
  experimental: {
    mcpServer: true,
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
