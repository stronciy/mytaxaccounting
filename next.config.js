/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/wp-json/wp/v2/posts', destination: '/api/wp/v2/posts' },
      { source: '/wp-json/blaze/v1/:path*', destination: '/api/blaze/v1/:path*' },
    ]
  },
}

module.exports = nextConfig
