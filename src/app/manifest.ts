import type { MetadataRoute } from 'next'
import { DESCRIPTION, TITLE } from '@/lib/site'

/* Web app manifest — what Android and iOS 16.4+ read when the site is saved to
   a home screen.

   Without one the launcher has no name to use and falls back to the document
   title, so the icon is captioned with a truncated "Bad Brain | Social Ent…".
   `short_name` is what actually appears under the icon; `name` is used in the
   install prompt and app switcher.

   The icons are referenced by their unhashed routes. Next serves the
   file-based `src/app/icon.png` at `/icon.png` and appends a content hash as a
   query string only in the <link> tags it generates — the bare path is a real
   route, so it stays valid across builds while the hashed form would not.

   No `purpose: 'maskable'` entry. A maskable icon has to keep its artwork
   inside a circle 80% of the icon's width, and the logo's ink already spans
   ~74% corner to corner — a mask would clip the hand. Declaring it anyway is
   worse than omitting it: Android would prefer the maskable entry and crop,
   where with none it letterboxes the icon it has. A dedicated icon with a
   wider margin is the fix if a circular launcher icon is ever wanted.

   `display: 'standalone'` drops the browser chrome. That normally costs the
   back button, but every page renders the same persistent Navigation, so
   there is no state a visitor can reach with no way out of it. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: TITLE,
    short_name: 'Bad Brain',
    description: DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    // Matches the body background, so the splash and status bar carry the
    // page's own white rather than framing it in a colour the site never uses.
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
