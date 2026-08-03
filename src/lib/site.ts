/** Single source of truth for the public contact address. */
export const CONTACT_EMAIL = 'hello@badbrain.media'

/** Canonical production origin. Used for sitemap entries and as the
    `metadataBase` that resolves relative OG/Twitter image URLs. On Vercel
    preview builds VERCEL_URL points at the deployment's own hostname, so
    share cards resolve against the branch being reviewed rather than
    production. */
export const SITE_URL = process.env.VERCEL_ENV === 'production'
  ? 'https://badbrain.media'
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'
