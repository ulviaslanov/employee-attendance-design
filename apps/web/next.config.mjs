import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  transpilePackages: ['@attendance/ui', '@attendance/i18n', '@attendance/domain'],
  turbopack: {
    root: path.resolve(__dirname, '../..'),
  },
}

export default nextConfig
