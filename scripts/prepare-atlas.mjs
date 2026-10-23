#!/usr/bin/env node
/* Turns a Community Atlas exported from Claude into the copy we publish at
   /atlas/<slug>. See docs/COMMUNITY-ATLAS.md.

     node scripts/prepare-atlas.mjs "<path>/Tiger Beer Community Atlas.html" [slug]

   The slug defaults to the file name minus " Community Atlas", kebab-cased.

   Every change below must match exactly once. If the export template ever
   changes shape the script stops rather than publishing a half-cleaned file —
   in particular one still carrying the desktop fonts. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const [input, slugArg] = process.argv.slice(2)
if (!input) {
  console.error('Usage: node scripts/prepare-atlas.mjs <export.html> [slug]')
  process.exit(1)
}

const slug =
  slugArg ??
  basename(input, '.html')
    .replace(/\s*Community Atlas$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// The slug becomes a file name and a URL, so nothing that could leave public/atlas.
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error(`Slug "${slug}" must be lowercase letters, numbers and single hyphens. Nothing written.`)
  process.exit(1)
}

let html = readFileSync(input, 'utf8')

function replaceOnce(label, pattern, replacement) {
  const matches = html.match(new RegExp(pattern.source, pattern.flags + 'g'))
  const count = matches ? matches.length : 0
  if (count !== 1) {
    console.error(`${label}: expected 1 match, found ${count}. Nothing written.`)
    process.exit(1)
  }
  html = html.replace(pattern, replacement)
}

/* The exports embed Dinamo's desktop OTFs as base64. Our licence covers the
   web fonts, so point at the same woff2 files the site serves (copied to
   public/fonts). The family names stay, so the page's CSS is untouched. */
replaceOnce(
  'Gravity font',
  /(@font-face\{font-family:"BB Gravity";src:)url\(data:font\/otf;base64,[A-Za-z0-9+/=]+\) format\("opentype"\)/,
  '$1url("/fonts/ABCGravity-Wide.woff2") format("woff2")',
)
replaceOnce(
  'Walter font',
  /(@font-face\{font-family:"BB Walter";src:)url\(data:font\/otf;base64,[A-Za-z0-9+/=]+\) format\("opentype"\)/,
  '$1url("/fonts/ABCWalterNeue-Semibold.woff2") format("woff2")',
)
if (html.includes('data:font/')) {
  console.error('An embedded font is still present. Nothing written.')
  process.exit(1)
}

/* The data is pasted into an inline <script> as JSON. A handle or display name
   containing "<" could close that script early and inject markup, so refuse
   any export whose data line has one. */
const dataLine = html.split('\n').find(line => line.startsWith('const D='))
if (!dataLine || dataLine.includes('<')) {
  console.error('Atlas data missing, or contains "<". Nothing written.')
  process.exit(1)
}
const D = JSON.parse(dataLine.slice('const D='.length).replace(/;\s*$/, ''))

/* The page escapes every string it renders, but writes numbers and a
   territory's colour (`pal`, a CSS variable name) into the markup as they are.
   Check those are what they claim to be, so an odd export can't inject
   attributes or script through them. */
const problems = []
const num = (v, where) => { if (typeof v !== 'number' || !Number.isFinite(v)) problems.push(where) }
for (const k of ['people', 'follows', 'accounts', 'territories', 'posts', 'likers', 'cutoff']) num(D.stats?.[k], `stats.${k}`)
D.terr?.forEach((t, j) => {
  num(t.size, `terr[${j}].size`)
  num(t.touch, `terr[${j}].touch`)
  t.top?.forEach(([, p], r) => num(p, `terr[${j}].top[${r}]`))
  if (t.pal != null && !/^--[a-z][a-z-]*$/.test(t.pal)) problems.push(`terr[${j}].pal`)
})
D.nodes?.forEach((n, r) => [0, 3, 4, 5, 6].forEach(c => num(n[c], `nodes[${r}][${c}]`)))
D.edges?.forEach((e, r) => e.forEach((v, c) => num(v, `edges[${r}][${c}]`)))
if (!Array.isArray(D.terr) || !Array.isArray(D.nodes) || !Array.isArray(D.edges)) problems.push('terr/nodes/edges missing')
if (problems.length) {
  console.error(`Unexpected values in the atlas data: ${problems.slice(0, 10).join(', ')}${problems.length > 10 ? ` (+${problems.length - 10} more)` : ''}. Nothing written.`)
  process.exit(1)
}

replaceOnce('<html> tag', /<html>/, '<html lang="en-GB">')

/* The way back to the site: the existing logo and footer wordmark become
   links, so nothing is added to the design. The footer link keeps the plain
   look and only underlines on hover.

   The pages ask for tabular-nums, which the desktop OTFs ignored but the web
   fonts honour — the stat figures came out visibly wider. Switch it off so the
   page matches what was designed.

   On phones the layout stacks to one column and the details panel lands far
   below the map, so tapping a dot looked like it did nothing. Move it up to
   sit directly under the map. */
replaceOnce(
  'Header logo',
  /(<div class="strip">)(<img src="data:image\/png;base64,[A-Za-z0-9+/=]+" alt="bad brain">)/,
  '$1<a href="/" aria-label="Bad Brain home">$2</a>',
)
replaceOnce(
  'Footer wordmark',
  /<footer><span>bad brain<\/span>/,
  '<footer><span><a href="/">bad brain</a></span>',
)
replaceOnce(
  'Link styles',
  /<\/title>/,
  '</title>\n<style>.strip a,footer a{text-decoration:none}footer a:hover{text-decoration:underline}*{font-variant-numeric:normal!important}@media (max-width:900px){aside .detail{order:-1}}</style>',
)

/* Share previews (Slack, WhatsApp, LinkedIn) don't run the page's script, so
   the text has to be in the markup. Written from the atlas's own data; the
   image is the site's standard share card. */
const attr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const title = `${D.brand} Community Atlas`
const description =
  `An interactive map of the Instagram accounts followed by ` +
  `${D.stats.people.toLocaleString('en-GB')} people who liked @${D.handle}'s posts, ` +
  `grouped into ${D.stats.territories} territories. By Bad Brain.`
replaceOnce(
  'Share meta',
  /<\/title>/,
  `</title>\n<meta name="description" content="${attr(description)}">` +
    `\n<meta property="og:type" content="website">` +
    `\n<meta property="og:site_name" content="Bad Brain">` +
    `\n<meta property="og:title" content="${attr(title)}">` +
    `\n<meta property="og:description" content="${attr(description)}">` +
    `\n<meta property="og:url" content="https://badbrain.media/atlas/${slug}">` +
    `\n<meta property="og:image" content="https://badbrain.media/opengraph-image.png">` +
    `\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">` +
    `\n<meta name="twitter:card" content="summary_large_image">`,
)

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'atlas')
mkdirSync(outDir, { recursive: true })
const out = join(outDir, `${slug}.html`)
writeFileSync(out, html)
console.log(`${basename(input)} → public/atlas/${slug}.html (${Math.round(html.length / 1024)}KB) → /atlas/${slug}`)
