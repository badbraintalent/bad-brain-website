#!/usr/bin/env node
/* Turns an atlas exported from Claude into the copy we publish at
   /atlas/<slug>. See docs/COMMUNITY-ATLAS.md.

     node scripts/prepare-atlas.mjs "<path>/Tiger Beer Community Atlas.html" [slug]

   The slug defaults to the file name minus " Community Atlas" / " Audience
   Atlas …", kebab-cased.

   Two export templates are handled, told apart by how they carry their data:
   - Community Atlas: light Bad Brain styling, data as `const D=` in the script.
   - Audience Atlas: dark full-screen "universe", data in a JSON script block.

   Every change below must match exactly once. If an export template ever
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

const name = basename(input, '.html').replace(/\s*(Community|Audience) Atlas\b.*$/i, '')
const slug =
  slugArg ??
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// The slug becomes a file name and a URL, so nothing that could leave public/atlas.
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error(`Slug "${slug}" must be lowercase letters, numbers and single hyphens. Nothing written.`)
  process.exit(1)
}

let html = readFileSync(input, 'utf8')

function fail(message) {
  console.error(`${message} Nothing written.`)
  process.exit(1)
}

function replaceOnce(label, pattern, replacement) {
  const matches = html.match(new RegExp(pattern.source, pattern.flags + 'g'))
  const count = matches ? matches.length : 0
  if (count !== 1) fail(`${label}: expected 1 match, found ${count}.`)
  html = html.replace(pattern, replacement)
}

const attr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/* The pages escape most strings they render, but write numbers and colour
   values into the markup as they are. Collect anything that isn't what it
   claims to be, so an odd export can't inject attributes or script through
   them. */
const problems = []
const num = (v, where) => { if (typeof v !== 'number' || !Number.isFinite(v)) problems.push(where) }
const str = (v, where) => { if (typeof v !== 'string') problems.push(where) }
function checkProblems() {
  if (problems.length) {
    fail(`Unexpected values in the atlas data: ${problems.slice(0, 10).join(', ')}${problems.length > 10 ? ` (+${problems.length - 10} more)` : ''}.`)
  }
}

/* A "<" anywhere in data pasted into a <script> could close it early and
   inject markup, so refuse it outright. */
function parseData(raw) {
  if (raw == null || raw.includes('<')) fail('Atlas data missing, or contains "<".')
  return JSON.parse(raw)
}

function prepareCommunityAtlas() {
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

  const dataLine = html.split('\n').find(line => line.startsWith('const D='))
  const D = parseData(dataLine?.slice('const D='.length).replace(/;\s*$/, ''))

  for (const k of ['people', 'follows', 'accounts', 'territories', 'posts', 'likers', 'cutoff']) num(D.stats?.[k], `stats.${k}`)
  D.terr?.forEach((t, j) => {
    num(t.size, `terr[${j}].size`)
    num(t.touch, `terr[${j}].touch`)
    t.top?.forEach(([, p], r) => num(p, `terr[${j}].top[${r}]`))
    // `pal` is a CSS variable name written into a style attribute
    if (t.pal != null && !/^--[a-z][a-z-]*$/.test(t.pal)) problems.push(`terr[${j}].pal`)
  })
  D.nodes?.forEach((n, r) => [0, 3, 4, 5, 6].forEach(c => num(n[c], `nodes[${r}][${c}]`)))
  D.edges?.forEach((e, r) => e.forEach((v, c) => num(v, `edges[${r}][${c}]`)))
  if (!Array.isArray(D.terr) || !Array.isArray(D.nodes) || !Array.isArray(D.edges)) problems.push('terr/nodes/edges missing')
  checkProblems()

  replaceOnce('<html> tag', /<html>/, '<html lang="en-GB">')

  /* The way back to the site: the existing logo and footer wordmark become
     links, so nothing is added to the design. The footer link keeps the plain
     look and only underlines on hover.

     The pages ask for tabular-nums, which the desktop OTFs ignored but the web
     fonts honour — the stat figures came out visibly wider. Switch it off so
     the page matches what was designed.

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

  return {
    title: `${D.brand} Community Atlas`,
    description:
      `An interactive map of the Instagram accounts followed by ` +
      `${D.stats.people.toLocaleString('en-GB')} people who liked @${D.handle}'s posts, ` +
      `grouped into ${D.stats.territories} territories. By Bad Brain.`,
  }
}

function prepareAudienceAtlas() {
  /* The exports load Space Grotesk, Manrope and JetBrains Mono from Google
     Fonts. That's a third-party request our CSP blocks, so drop the links and
     serve the same open-source (OFL) fonts from public/fonts — one variable
     Latin file per family, licences in public/fonts/licenses. */
  replaceOnce('Google Fonts preconnect', /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\n/, '')
  replaceOnce('Google Fonts preconnect', /<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\n/, '')
  replaceOnce('Google Fonts stylesheet', /<link href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]*" rel="stylesheet">\n/, '')
  replaceOnce(
    'Self-hosted fonts',
    /<\/title>/,
    '</title>\n<style>' +
      '@font-face{font-family:"Space Grotesk";font-weight:500 700;font-display:swap;src:url("/fonts/SpaceGrotesk-Latin.woff2") format("woff2")}' +
      '@font-face{font-family:"Manrope";font-weight:400 700;font-display:swap;src:url("/fonts/Manrope-Latin.woff2") format("woff2")}' +
      '@font-face{font-family:"JetBrains Mono";font-weight:400 600;font-display:swap;src:url("/fonts/JetBrainsMono-Latin.woff2") format("woff2")}' +
      '</style>',
  )

  /* The map's labels are drawn on a canvas once at start-up, and the page
     never redraws when the fonts arrive, so they stay in the fallback font —
     the original export shows its territory labels in plain sans-serif.
     Its resize handler redraws everything; fire it once the canvas's own
     fonts have loaded. `document.fonts.ready` alone is too early: it can
     resolve before anything has asked for them. */
  replaceOnce(
    'Font redraw',
    /<\/body>/,
    '<script>document.fonts&&Promise.all([\'700 13px "Space Grotesk"\',\'600 11.5px "Manrope"\',\'500 10.5px "JetBrains Mono"\'].map(function(f){return document.fonts.load(f)})).then(function(){window.dispatchEvent(new Event("resize"))})</script>\n</body>',
  )

  const match = html.match(/<script id="atlas-json" type="application\/json">([\s\S]*?)<\/script>/)
  const D = parseData(match?.[1])

  for (const k of ['n_people', 'n_nodes', 'n_edges', 'n_clusters']) num(D.meta?.[k], `meta.${k}`)
  D.nodes?.forEach((n, r) => { str(n[0], `nodes[${r}][0]`); [1, 2, 3, 4, 5].forEach(c => num(n[c], `nodes[${r}][${c}]`)) })
  D.edges?.forEach((e, r) => e.forEach((v, c) => num(v, `edges[${r}][${c}]`)))
  D.clusters?.forEach((c, j) => {
    num(c.id, `clusters[${j}].id`)
    num(c.count, `clusters[${j}].count`)
    str(c.name, `clusters[${j}].name`)
    str(c.blurb, `clusters[${j}].blurb`)
    // written into style attributes, and suffixed with alpha digits for canvas
    if (!/^#[0-9A-Fa-f]{6}$/.test(c.color)) problems.push(`clusters[${j}].color`)
  })
  D.brands?.forEach((b, j) => {
    str(b.username, `brands[${j}].username`)
    num(b.count, `brands[${j}].count`)
    num(b.pct, `brands[${j}].pct`)
    if (b.in_graph) num(b.cluster_id, `brands[${j}].cluster_id`)
  })
  for (const k of ['nodes', 'edges', 'clusters', 'brands']) if (!Array.isArray(D[k])) problems.push(`${k} missing`)
  checkProblems()

  const title = `${name} Audience Atlas`
  replaceOnce('<html> tag', /<html lang="en">/, '<html lang="en-GB">')
  // The export's own title is the map's name ("The Universe"); the tab and
  // share previews need to say whose atlas it is.
  replaceOnce('Title', /<title>[^<]*<\/title>/, `<title>${attr(title)}</title>`)
  // The way back to the site: the logo becomes a link, nothing added to the design.
  replaceOnce(
    'Header logo',
    /<img id="brand-logo" alt="Bad Brain" src="">/,
    '<a href="/" aria-label="Bad Brain home"><img id="brand-logo" alt="Bad Brain" src=""></a>',
  )

  return {
    title,
    description:
      `An interactive map of the ${D.meta.n_nodes.toLocaleString('en-GB')} Instagram accounts most followed by ` +
      `${D.meta.n_people.toLocaleString('en-GB')} people, grouped into ${D.meta.n_clusters} territories. By Bad Brain.`,
  }
}

const { title, description } = html.includes('<script id="atlas-json" type="application/json">')
  ? prepareAudienceAtlas()
  : prepareCommunityAtlas()

if (html.includes('data:font/')) fail('An embedded font is still present.')
// Instagram links are the only outside address a published atlas may contain.
const external = [...new Set(html.match(/https?:\/\/[a-z0-9.-]+/gi) ?? [])].filter(u => !/^https:\/\/www\.instagram\.com$/i.test(u))
if (external.length) fail(`Unexpected outside addresses: ${external.join(', ')}.`)

/* Share previews (Slack, WhatsApp, LinkedIn) don't run the page's script, so
   the text has to be in the markup. Written from the atlas's own data; the
   image is the site's standard share card. */
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
