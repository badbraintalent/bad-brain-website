import type { Metadata } from 'next'

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

/** Site-wide title and description. Shared by the root metadata and the web
    app manifest so the name a visitor sees in a search result, a share card
    and under a home-screen icon can't drift apart.

    The description is the one description with no on-page counterpart — the
    hero it was written for is video and logo only — which is why it lives
    here rather than being read off a component. */
export const TITLE = 'Bad Brain | Social Entertainment Agency'
/** The site-wide share card, as a stable route rather than a hashed asset. */
const OG_IMAGE = '/opengraph-image.png'

export const DESCRIPTION =
  "We're a specialist agency for brands, creators and artists. Four connected services for the entertainment era of social."

/** Per-route metadata.

    Every page under `src/app` is a client component, and a client component
    cannot export `metadata` — so each route carries a server `layout.tsx`
    whose only job is to call this. It fills in the parts that have to be
    restated per page but never actually vary in shape: the canonical URL, and
    the OpenGraph/Twitter title and description, which do not inherit from the
    document title.

    `title` is the bare page name — the root layout's template appends the
    site suffix.

    The share image has to be named explicitly. The file-based
    `src/app/opengraph-image.png` only attaches to the segment it sits in, and
    a route that declares its own `openGraph` replaces the parent's rather
    than merging with it — so without this line every page but the homepage
    ships a card with no image at all, which is how they were previously.
    Referenced by its unhashed route so it survives a rebuild. Give a route
    its own `opengraph-image.png` and that wins over this default. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, images: [OG_IMAGE] },
    twitter: { title, description, images: [OG_IMAGE] },
  }
}
