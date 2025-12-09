/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/wp-json/wp/v2/posts', destination: '/api/wp/v2/posts' },
      { source: '/wp-json/blaze/v1/:path*', destination: '/api/blaze/v1/:path*' },
      { source: '/blaze/v1/:path*', destination: '/api/blaze/v1/:path*' },
      { source: '/wp-json', destination: '/api/wp-json' },
      { source: '/wp-json/', destination: '/api/wp-json' },
      { source: '/wp-json/wp/v2', destination: '/api/wp-json' },
    ]
  },
}

module.exports = nextConfig
