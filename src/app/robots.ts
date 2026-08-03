import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

/* Preview deployments must not be indexed. Vercel sets VERCEL_ENV to
   'preview' for branch deploys and 'production' only for the production
   domain, so anything that isn't production gets a blanket disallow. Local
   dev (VERCEL_ENV undefined) is treated as non-production too. */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === 'production'

  if (!isProduction) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
