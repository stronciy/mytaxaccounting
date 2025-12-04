import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://v39-consultancy.com'

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/pricing',
    '/how-it-works',
    '/case-studies',
    '/contact',
    '/security',
    '/faq',
    '/privacy',
    '/terms',
    '/login',
    '/signup',
  ]

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route === '/pricing' ? 0.9 : 0.8,
  }))

  return staticRoutes
}
