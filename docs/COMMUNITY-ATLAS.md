# Community Atlases

Interactive audience maps, made in Claude and published as static pages at
`/atlas/<slug>`, e.g. `/atlas/tiger-beer`. Public but unlisted: not linked from
the site, not in the sitemap, and served with `noindex`.

## Adding one

1. Get the exported HTML file (e.g. `Airwallex Community Atlas.html`). Keep it
   out of the repo — it embeds the desktop font files.
2. `node scripts/prepare-atlas.mjs "<path>/Airwallex Community Atlas.html"`
   writes `public/atlas/airwallex.html`. Pass a second argument to choose the
   slug.
3. Open `localhost:3000/atlas/<slug>` on desktop and mobile. Check that the
   headline is in Gravity, the map draws, and the logo links home.
4. Commit and deploy, then send the client the link.

If the script stops with "expected 1 match", the export template has changed
shape. Look at what moved before you adjust the pattern, and never publish a
file that still contains `data:font/`. If it stops with "Unexpected values in
the atlas data", a number or colour isn't what the page expects. Don't
loosen the check to get past it; find out why the export differs.

## What the script changes

- Swaps the embedded Dinamo desktop OTFs for the site's licensed woff2 files in
  `public/fonts/`.
- Switches off `tabular-nums`: the web fonts honour it and the desktop ones
  didn't, so without this the stat figures render wider than designed.
- Links the header logo and footer wordmark to the homepage.
- On screens 900px and narrower, moves the details panel up to sit directly
  under the map. Otherwise tapping a dot updated a panel a screen or more
  below it.
- Adds a description and share-preview tags (Open Graph and Twitter Card),
  written from the atlas's data, with the site's standard share image.
- Adds `lang="en-GB"`.

Headers for `/atlas/*` live in `next.config.ts`: a strict Content-Security-Policy
(inline script and styles, our fonts, no network requests, no framing) and
`X-Robots-Tag: noindex`.

## Published

Airwallex, Alpine Hearing Protection, Buldak, Decathlon, Food For Skin, Tiger
Beer (Oct 2026). Buldak and Decathlon use a slightly older export template;
they are published as supplied.
