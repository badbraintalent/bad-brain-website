import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

const ROUTES = [
  { path: '', priority: 1 },
  { path: '/services/blueprint', priority: 0.8 },
  { path: '/services/studio', priority: 0.8 },
  { path: '/services/connect', priority: 0.8 },
  { path: '/services/resonate', priority: 0.8 },
  { path: '/contact', priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    priority,
  }))
}
