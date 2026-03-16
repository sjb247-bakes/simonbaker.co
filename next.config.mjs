import fs from "node:fs"
import path from "node:path"

const redirectsFilePath = path.join(process.cwd(), "scripts", "redirects.json")
const redirectsFromFile = fs.existsSync(redirectsFilePath)
  ? JSON.parse(fs.readFileSync(redirectsFilePath, "utf-8")).redirects || []
  : []

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  async redirects() {
    return redirectsFromFile
  },
}

export default nextConfig
