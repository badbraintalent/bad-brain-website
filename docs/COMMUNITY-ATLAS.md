# Community Atlases

Interactive audience maps, made in Claude and published as static pages at
`/atlas/<slug>`, e.g. `/atlas/tiger-beer`. Public but unlisted: not linked from
the site, not in the sitemap, and served with `noindex`.

Two export templates exist, and the script tells them apart itself:

- **Community Atlas**: light Bad Brain styling, set in Gravity and Walter.
  File names like `Tiger Beer Community Atlas.html`.
- **Audience Atlas**: dark, full-screen "universe" with Space Grotesk, Manrope
  and JetBrains Mono. File names like
  `Emirates Audience Atlas - Interactive rebuild 2026-10-22.html`.

## Adding one

1. Get the exported HTML file. Keep it out of the repo: Community Atlas exports
   embed the desktop font files.
2. `node scripts/prepare-atlas.mjs "<path>/Airwallex Community Atlas.html"`
   writes `public/atlas/airwallex.html`. The slug comes from the file name up
   to "Community Atlas" / "Audience Atlas"; pass a second argument to choose
   it yourself.
3. Open `localhost:3000/atlas/<slug>` on desktop and mobile. Check that the
   headings are in the right font, the map draws, and the logo links home.
4. Commit and deploy, then send the client the link.

If the script stops with "expected 1 match", the export template has changed
shape. Look at what moved before you adjust the pattern, and never publish a
file that still contains `data:font/`. If it stops with "Unexpected values in
the atlas data", a number or colour isn't what the page expects, and
"Unexpected outside addresses" means the page would load something from
another site. Don't loosen a check to get past it; find out why the export
differs.

## What the script changes

Both templates:

- Links the header logo to the homepage (Community Atlas: the footer wordmark
  too).
- Adds a description and share-preview tags (Open Graph and Twitter Card),
  written from the atlas's data, with the site's standard share image.
- Sets `lang="en-GB"`.
- Refuses data containing `<`, numbers that aren't numbers, colour values that
  aren't colours, and any outside address other than Instagram links.

Community Atlas only:

- Swaps the embedded Dinamo desktop OTFs for the site's licensed woff2 files in
  `public/fonts/`.
- Switches off `tabular-nums`: the web fonts honour it and the desktop ones
  didn't, so without this the stat figures render wider than designed.
- On screens 900px and narrower, moves the details panel up to sit directly
  under the map. Otherwise tapping a dot updated a panel a screen or more
  below it.

Audience Atlas only:

- Replaces the Google Fonts links with self-hosted copies in `public/fonts/`
  (`*-Latin.woff2`, open-source OFL fonts; licences in `public/fonts/licenses/`).
  Loading from Google would be a third-party request, which the CSP blocks.
- Redraws the map once its fonts have loaded. The export draws its canvas
  labels once at start-up, so they otherwise stay in the fallback font (the
  original export shows them in plain sans-serif).
- Replaces the page title ("The Universe") with "<Brand> Audience Atlas" for
  the browser tab and share previews. The on-page heading is unchanged.

Headers for `/atlas/*` live in `next.config.ts`: a strict Content-Security-Policy
(inline script and styles, our fonts, no network requests, no framing) and
`X-Robots-Tag: noindex`.

## Published

- **Community Atlas** (Oct 2026): Airwallex, Alpine Hearing Protection, Buldak,
  Decathlon, Food For Skin, Tiger Beer. Buldak and Decathlon use a slightly
  older version of the template; they are published as supplied.
- **Audience Atlas** (Oct 2026): Emirates. Labelled "Emirates Pilot"; its
  Brand watch panel names rival airlines, so confirm it's cleared for public
  release before sharing the link.
