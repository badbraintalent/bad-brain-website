'use client'

import Image from 'next/image'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import WindowTitleBar from '@/components/ui/WindowTitleBar'
import ServiceCTA from '@/components/sections/ServiceCTA'
import { Fragment, useEffect, useRef, useState } from 'react'
import { enter } from '@/lib/y2k'

const EQ_BARS = 16

/* Coverage-grid cell height. Taller than the old 220px service labels — these
   items are full sentences, not two-word tags. */
const CELL_H = '250px'

/* ── Halftone wash, one crop of the brand artwork behind each coverage cell ────
   The waveform in resonate_16x9_gray.png sits in the right-hand two-thirds of a
   1920×1080 frame and in its lower half; everything outside that is blank paper.
   Crops picked by eye off the whole frame kept landing on the paper, which is
   what read as white patches in the grid — so these eight are pinned instead.
   Each is measured a twelfth of a window at a time rather than as an average: a
   crop can carry plenty of dots overall and still hang a bare column down one
   edge, which reads as the same fault at cell size.

   Sized off the cell's HEIGHT, not its width: the cell is a fixed 250px tall at
   every breakpoint but its width is not, and a width-relative zoom would let the
   window grow tall enough on a phone to reach the blank half of the frame. The
   zoom is a multiple of the artwork's height everywhere, and only the window's
   width narrows on the 2-column grid — which stays inside the inked region.

   `zoom` varies per cell as well, which is what stops the grid reading as one
   picture stamped eight times: the dot matrix comes out coarser or finer, so two
   cells differ in texture and not just in which peak they caught. `flip` mirrors
   the crop, which reverses the direction the waveform climbs — the cheapest way
   to make two windows over the same busy stretch of artwork look unrelated.

   x/y are background-position values, i.e. percentages of the image overhang
   rather than of the image, so they read higher than the crop's actual position
   in the frame. Both breakpoints' windows were checked at every entry. */
const WAVE_CROPS = [
  { zoom: 460, x: 0.58, y: 0.70, flip: false },
  { zoom: 400, x: 0.80, y: 0.80, flip: false },
  { zoom: 350, x: 0.70, y: 1.00, flip: false },
  { zoom: 300, x: 0.60, y: 0.84, flip: false },
  { zoom: 350, x: 0.84, y: 0.92, flip: true },
  { zoom: 460, x: 0.58, y: 0.72, flip: true },
  { zoom: 400, x: 0.80, y: 0.80, flip: true },
  { zoom: 300, x: 0.74, y: 0.98, flip: true },
]

function waveStyle(i: number) {
  const { zoom, x, y, flip } = WAVE_CROPS[i % WAVE_CROPS.length]
  return {
    backgroundImage: "url('/images/brand/halftones/resonate_16x9_gray.png')",
    backgroundSize: `auto ${zoom}%`,
    backgroundPosition: `${x * 100}% ${y * 100}%`,
    transform: flip ? 'scaleX(-1)' : undefined,
  }
}

/* Three marks, mapped onto Make / Move / Grow. Drawn edge-to-edge in a 40×40
   box. */
const iconProps = {
  'aria-hidden': true,
  viewBox: '0 0 40 40',
  width: 40,
  height: 40,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
} as const

/* Parts converging into one node — assembling a vision from pieces */
const MakeIcon = () => (
  <svg {...iconProps}>
    <path d="M6 11L20 24M34 11L20 24M20 24v5" strokeLinecap="round" />
    <rect x="0.6" y="0.6" width="10" height="10" rx="1" />
    <rect x="29.4" y="0.6" width="10" height="10" rx="1" />
    <rect x="15" y="28.8" width="10" height="10" rx="1" />
  </svg>
)

/* Signal radiating outward — a track travelling beyond your own channels */
const MoveIcon = () => (
  <svg {...iconProps}>
    <path d="M20 39V17" strokeLinecap="round" />
    <path d="M20 17l-5-6" strokeLinecap="round" />
    <path d="M11 20a12.7 12.7 0 0 1 18 0" strokeLinecap="round" />
    <path d="M1 14a27 27 0 0 1 38 0" strokeLinecap="round" />
  </svg>
)

/* Rising bars breaking out of the frame */
const GrowIcon = () => (
  <svg {...iconProps}>
    <path d="M0.6 39.4h38.8" strokeLinecap="round" />
    <rect x="1" y="28" width="8" height="11.4" />
    <rect x="16" y="20" width="8" height="19.4" />
    <rect x="31" y="12" width="8" height="27.4" />
    <path d="M28 1h8v8M36 1L24 13" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* "What Resonate covers" — three clusters, eight items. The
   grid below is 4×3: each row opens with the cluster's black header cell, so the
   groups stay legible while every item keeps its brand-animation hover cell. */
const coverage = [
  {
    name: 'Make',
    Icon: MakeIcon,
    items: [
      'Build a creative vision that looks and sounds like you - across every channel.',
      'Get content calendars and format ideas planned around your music.',
      'Walk away with creator toolkits - formats, templates and rollout guides - to make social less of a grind.',
    ],
  },
  {
    name: 'Move',
    Icon: MoveIcon,
    items: [
      'Get your tracks moving through TikTok - fans, creators, everyday users.',
      'Open doors through the Bad Brain ecosystem - platforms, partnerships and industry connections.',
      'Have social listening working in the background - so you know what’s moving before it trends.',
    ],
  },
  {
    name: 'Grow',
    Icon: GrowIcon,
    items: [
      'Get rollout plans built around your release - pre-release, launch and beyond.',
      'Use paid media to push what’s already landing to more of the right people.',
    ],
  },
]

/* Flat item list — the video refs and the attract-mode spotlight both index off
   this, so cluster grouping stays a presentation concern only. */
const items = coverage.flatMap((g) => g.items)
const itemOffsets = coverage.map((_, gi) =>
  coverage.slice(0, gi).reduce((n, g) => n + g.items.length, 0)
)

// Official brand animations (compressed).
const videoSrcs = [
  '/videos/brand/spin-land.mp4',
  '/videos/brand/dvd-land.mp4',
  '/videos/brand/spin-full-land.mp4',
  '/videos/brand/dvd-port.mp4',
  '/videos/brand/spin-port.mp4',
  '/videos/brand/spin-full-port.mp4',
]

export default function ResonatePage() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  /* Services grid "attract mode" — while nobody hovers, a random cell lights
     up with its brand animation for a few seconds, then hands off to another.
     Real hovers take priority (cycling pauses, spotlight clears); pauses
     off-screen; skipped under reduced motion. */
  const [spotlight, setSpotlight] = useState<number | null>(null)
  const servicesRef = useRef<HTMLDivElement | null>(null)
  const gridHoverRef = useRef(false)
  const gridInViewRef = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let current = -1
    const cycle = setInterval(() => {
      if (gridHoverRef.current || !gridInViewRef.current) return
      // random next cell, never the same one twice in a row; only the lit
      // cell's video plays — the outgoing one pauses on handoff
      const prev = current
      current = (current + 1 + Math.floor(Math.random() * (items.length - 1))) % items.length
      if (prev >= 0) videoRefs.current[prev]?.pause()
      void videoRefs.current[current]?.play().catch(() => {})
      setSpotlight(current)
    }, 3500)

    const io = new IntersectionObserver(([entry]) => {
      gridInViewRef.current = entry.isIntersecting
      if (entry.isIntersecting) {
        /* The cells cycle through six brand animations totalling ~11MB. They
           need to be buffered before a hover or the attract cycle reaches them,
           but fetching that at page load starved the hero and made scrolling
           down to here stutter. Upgrade from preload="none" on first entry
           instead, which is early enough to be warm by the first hover. */
        videoRefs.current.forEach((v) => {
          if (v && v.preload !== 'auto') {
            v.preload = 'auto'
            v.load()
          }
        })
      } else {
        setSpotlight(null)
        // Off-screen cells must actually stop decoding, not just fade out
        videoRefs.current.forEach((v) => v?.pause())
      }
    })
    if (servicesRef.current) io.observe(servicesRef.current)

    return () => {
      clearInterval(cycle)
      io.disconnect()
    }
  }, [])

  /* Hero "now playing" — the track-progress device: the waveform field's played
     portion shows in green, the unplayed remainder in gray (the two colourways
     of the same halftone, the gray clipped away as the playhead advances —
     SoundCloud-style). The copy card's EQ bars bounce and its elapsed counter
     tracks the sweep, all at the site's 12fps. WAAPI drives the sweep (no new
     CSS keyframes — Turbopack doesn't hot-reload externally-added globals).
     Pauses off-screen. */
  const SWEEP_MS = 16000
  const heroRef = useRef<HTMLElement | null>(null)
  const playheadRef = useRef<HTMLDivElement | null>(null)
  const unplayedRef = useRef<HTMLImageElement | null>(null)
  const eqRefs = useRef<(HTMLSpanElement | null)[]>([])
  const elapsedRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timing = { duration: SWEEP_MS, easing: 'steps(128, end)', iterations: Infinity } as const
    const sweep = playheadRef.current?.animate([{ left: '0%' }, { left: '100%' }], timing)
    const wipe = unplayedRef.current?.animate(
      [{ clipPath: 'inset(0 0 0 0%)' }, { clipPath: 'inset(0 0 0 100%)' }],
      timing
    )

    let inView = true
    let frame = 0
    const tick = setInterval(() => {
      if (!inView) return
      frame++
      eqRefs.current.forEach((bar, i) => {
        if (!bar) return
        const h = 0.2 + 0.8 * Math.abs(Math.sin(frame * 0.55 + i * 1.31) * Math.sin(frame * 0.19 + i * 0.7))
        bar.style.transform = `scaleY(${h.toFixed(2)})`
      })
      if (elapsedRef.current) {
        const s = Math.floor(((Number(sweep?.currentTime) || 0) % SWEEP_MS) / 1000)
        elapsedRef.current.textContent =
          `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
      }
    }, 1000 / 12)

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      for (const a of [sweep, wipe]) {
        if (entry.isIntersecting) a?.play()
        else a?.pause()
      }
    })
    if (heroRef.current) io.observe(heroRef.current)

    return () => {
      sweep?.cancel()
      wipe?.cancel()
      clearInterval(tick)
      io.disconnect()
    }
  }, [])

  return (
    <main>
      <Navigation />

      {/* ── Hero — full-bleed waveform halftone field, sticker headline ── */}
      <section
        ref={heroRef}
        className="bg-white text-black relative"
        style={{
          height: 'calc(100svh - 65px)',
          minHeight: '700px',
          maxHeight: '900px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Full-bleed Resonate waveform halftone — THE STRATEGY treatment */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brand/halftones/resonate_16x9_green.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={enter('0.05s', '1.2s')}
        />

        {/* Unplayed portion — the gray colourway, clipped away as the track plays */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={unplayedRef}
          src="/images/brand/halftones/resonate_16x9_gray.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ clipPath: 'inset(0 0 0 0%)', ...enter('0.05s', '1.2s') }}
        />

        {/* Playhead at the wipe boundary */}
        <div
          ref={playheadRef}
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-0.5 bg-black/40 pointer-events-none"
        />

        {/* Main content — flex-1, headline fills, copy bottom-right.
            Gutter is px-6 lg:px-8 to match the nav container (and every other
            section on this page); it was px-8 lg:px-12 and sat visibly inboard
            of the wordmark above it. */}
        <div
          className="relative flex-1 flex flex-col min-h-0 max-w-7xl mx-auto w-full px-6 lg:px-8"
          style={{ paddingBottom: 'clamp(3rem, 10vw, 9rem)' }}
        >
          {/* Mark + headline — the other three service heroes' lockup (mark
              above, left-aligned, gap-5 lg:gap-7), but scaled 1.5x off their
              w-[8rem] lg:w-[10rem]: this hero carries no left panel and no
              pillar cells, so the mark holds more of the frame here. Unlike
              those pages there is no panel to sit in, so the column is
              bottom-anchored with justify-end over the waveform. */}
          <div className="flex-1 flex flex-col justify-end items-start gap-5 lg:gap-7 pt-8 sm:pt-0 pb-10 min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand/marks/Resonate.svg"
              alt="Bad Brain Resonate"
              className="shrink-0 w-[12rem] lg:w-[15rem] h-auto"
              style={enter('0.28s')}
            />
            {/* Solid, not outlined. Outline type is reserved for CTA and quote
                moments (ServiceCTA, the testimonials pull quote); page H1s are
                solid — see the Blueprint/Connect/Studio heroes. */}
            <h1 className="uppercase text-display-2 text-black">
              <span className="block" style={enter('0.38s')}>Find your</span>
              <span className="block" style={enter('0.48s')}>people.</span>
            </h1>
          </div>

          <div
            className="flex flex-col lg:flex-row lg:items-start gap-6"
            style={enter('0.62s')}
          >
            <div className="bg-white border border-black/15 max-w-[28rem]">
              <WindowTitleBar name="resonate.exe" className="border-b border-black/15 px-3 py-2" />
              <div className="p-6">
                <p className="text-black/70 text-body-sm mb-6">
                  Build your audience with{' '}
                  <strong className="text-black">as much care as you make your music</strong>.
                  We value connection over likes, fans over followers. Resonate helps you create strategies
                  that stay true to you.
                </p>
                <a
                  href="#now"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#now')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-flex items-center gap-2 text-black/70 text-label tracking-label uppercase hover:text-bb-blue transition-colors group w-fit cursor-pointer"
                >
                  <span className="border-b border-black/20 pb-0.5 group-hover:border-bb-blue transition-colors">
                    Learn more
                  </span>
                  <span className="arrow-hop inline-block">→</span>
                </a>
              </div>
              {/* Player strip — live EQ + elapsed counter */}
              <div className="flex items-center gap-3 border-t border-black/15 px-3 py-2">
                <span aria-hidden="true" className="text-black/70 text-label leading-none">▶</span>
                <span aria-hidden="true" className="flex items-end gap-[3px] h-3 flex-1">
                  {Array.from({ length: EQ_BARS }, (_, i) => (
                    <span
                      key={i}
                      ref={(el) => { eqRefs.current[i] = el }}
                      className="w-1 h-full bg-bb-mint origin-bottom"
                      style={{ transform: 'scaleY(0.2)' }}
                    />
                  ))}
                </span>
                <span className="text-label tracking-label text-black/60">
                  <span ref={elapsedRef}>00:00</span> / 00:16
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Right now — the discovery stat, carried by the staggered
             typographic split that used to read "Personality / into presence".
             border-t: the hero above is also white, so without a rule the two
             panels ran together. Matches the nav's border-black/15. ── */}
      <section id="now" className="bg-white overflow-clip border-t border-black/15">

        {/* Band 1: "80% of TikTok users" — the figure reads more balanced carrying
            the subject with it than stranded alone at display size. */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 md:pt-20">
          <div>
            <div className="resonate-pull-quote overflow-hidden">
              <p
                className="font-display uppercase text-black text-display-2 leading-hero"
              >
                80% of TikTok users
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-black/10 mt-5" />

        {/* Band 2 — right-aligned, right edge on the container gutter, with the
            attribution hung beneath it */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="text-right">
            <p
              className="font-display uppercase text-black inline-block text-display-2 leading-hero"
            >
              discover new music<br className="hidden sm:inline" /> via the platform.
            </p>
            <p className="text-label tracking-label-wide uppercase text-black/60 mt-5">
              Source: TikTok
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-black/10" />

        {/* Body copy — two columns, under a "Right now" overline */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 md:py-16">
          <div>
            <span className="text-label tracking-label-wide uppercase text-black/60 block mb-8">
              Right now
            </span>
            <div className="resonate-problem-copy grid lg:grid-cols-2 gap-8 lg:gap-20 text-black/70 text-body-md">
              <div>
                <p>
                  <strong className="text-black">Discovery has never been more open.</strong>{' '}
                  Anyone online today could be hearing your music for the first time, whether
                  you&apos;re a signed artist or not.
                </p>
              </div>
              <div>
                <p>
                  The part nobody tells you:{' '}
                  <strong className="text-black">not everybody is a potential fan</strong>.
                  Being discovered by the right audience takes a plan, not just a phone and good
                  intentions. We build it with you - starting with your story, your sound, and your goals.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── Experience — magazine sidebar layout ──
             overflow-clip (not hidden — hidden breaks view-timeline lookup) because
             .resonate-bio enters from translateX(80vw), which was pushing 312px of
             horizontal scroll onto the page at 390px wide. */}
      <section className="bg-white overflow-clip">

        {/* Section label */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="resonate-experience-header flex items-baseline justify-between gap-4 py-6 border-b border-black/10">
            <span className="text-label tracking-label-wide uppercase text-black/60">Experience</span>
            <span className="text-label tracking-label uppercase text-black/60 text-right">
              Jen Long, Resonate Co-Founder
            </span>
          </div>
        </div>

        {/* Photo left, quote right — the mockup's `jen-top-b` layout (quote, then
            name, then role beneath it). No inner gutter padding on the text
            column: the tinted sidebar it replaced added px-6 lg:px-8 on top of
            the container's own, so "Jen Long" sat visibly inboard of every other
            line on the page. */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 md:py-16">
          <div className="resonate-photo grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">

            {/* Left: portrait */}
            <div
              className="relative overflow-hidden bg-black order-first"
              style={{ aspectRatio: '4 / 3' }}
            >
              <Image
                src="/images/resonate/jen-long.jpg"
                alt="Jen Long, Resonate Co-Founder"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
                style={{ objectPosition: 'center 52%' }}
              />
            </div>

            {/* Right: quote → name → role, one rhythm throughout */}
            <div>
              <blockquote
                className="text-black text-body-lg"
              >
                <span aria-hidden="true" className="text-bb-grey">&ldquo;</span>There&apos;s nothing
                better than watching an artist you believed in early start to connect with lots of
                people who get it. That feeling never gets old.
                <span aria-hidden="true" className="text-bb-grey">&rdquo;</span>
              </blockquote>
              <div className="h-px w-10 bg-black mt-8 mb-6" />
              <p className="font-display text-black text-display-4">
                Jen Long
              </p>
              <p className="text-label tracking-label uppercase text-black/60 mt-2">
                Resonate Co-Founder
              </p>
            </div>

          </div>
        </div>

        {/* Career strands — the mockup's three columns */}
        <div className="resonate-bio max-w-7xl mx-auto px-6 lg:px-8 py-10 md:py-16 border-t border-black/10">
          <p className="text-label tracking-label uppercase text-black/60 mb-8">
            Jen&rsquo;s track record
          </p>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            {[
              ['Broadcasting', <>
                Presented <strong className="text-black">BBC Introducing on Radio 1</strong>,
                helping break new artists at a national level. Glastonbury festival coverage for BBC Three.
              </>],
              ['Industry', <>
                <strong className="text-black">Music Editor at DICE</strong>, helping launch
                the platform. Contributing Editor and Partnerships at{' '}
                <strong className="text-black">The Line of Best Fit</strong> since 2009.
              </>],
              ['Management', <>
                Founder, <strong className="text-black">Take Care Management</strong>. Current
                roster includes <strong className="text-black">jasmine.4.t</strong> - BBC 6
                Music Artist of the Year 2025, first UK signee to Saddest Factory Records.
              </>],
            ].map(([label, body], i) => (
              <div key={label as string}>
                <div className="h-px w-10 bg-black mb-6" />
                <span className="text-label tracking-label-wide uppercase text-black block mb-4">
                  {String(i + 1).padStart(2, '0')} / {label}
                </span>
                <p className="text-black/70 text-body-md">{body}</p>
              </div>
            ))}
          </div>

          {/* Previous clients — kept in the roster.txt window it already had */}
          <div className="border border-black/20 mt-10 md:mt-14">
            <WindowTitleBar name="roster.txt" className="border-b border-black/15 px-3 py-2" />
            <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8">
              {/* items-baseline already puts this on the names' exact baseline
                  (measured delta 0). The -2px is an optical correction: 8.8px caps
                  next to 14px text share a baseline but not a cap-height, so the
                  label reads as sitting low until its cap block is re-centred. */}
              <span
                className="text-label tracking-label-wide uppercase text-black/60 shrink-0"
                style={{ transform: 'translateY(-2px)' }}
              >
                Previous clients
              </span>
              <p className="text-black text-body-sm">
                The Knife <span className="text-black/25 px-1">·</span> Fever Ray{' '}
                <span className="text-black/25 px-1">·</span> Big Red Machine{' '}
                <span className="text-black/25 px-1">·</span> Austra{' '}
                <span className="text-black/25 px-1">·</span> Hannah Georgas{' '}
                <span className="text-black/25 px-1">·</span> Planningtorock
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* ── What Resonate covers — Make/Move/Grow clusters, each row opening
             with a black header cell, items keeping the brand-animation hover ── */}
      <section className="relative bg-white resonate-services-section border-t border-black/10">

        {/* Contained to the same gutter as every other section — the grid was
            full-bleed, which made it the one element on the page not lining up
            with the nav wordmark. */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-14 md:pt-24 md:pb-24">
          <div className="resonate-services-header flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-6">
            <h2
              className="font-display uppercase text-black text-display-3"
            >
              What Resonate covers
            </h2>
            <span className="text-label tracking-label uppercase text-black/60">
              For artists, labels and managers
            </span>
          </div>

        {/* 4×3 grid — one row per cluster. Spotlight (attract mode) lights one
            item cell while nobody hovers; real hovers pause the cycle and take
            over. */}
        <div
          ref={servicesRef}
          className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-black/15"
          onMouseEnter={() => { gridHoverRef.current = true; setSpotlight(null) }}
          onMouseLeave={() => { gridHoverRef.current = false }}
        >
          {coverage.map(({ name, Icon, items: clusterItems }, gi) => (
            <Fragment key={name}>

              {/* Cluster header cell — black, carrying the icon migrated from
                  the retired approach block */}
              <div
                className="relative flex flex-col justify-between bg-black overflow-hidden border-r border-b border-black/15 p-6"
                style={{ height: CELL_H }}
              >
                {/* Same mint waveform grain the retired approach block used */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/brand/halftones/resonate_16x9_green.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
                />
                {/* No cluster numeral — it would sit inches from the item cells'
                    own 01/02/03 and read as duplicate numbering */}
                <div className="relative">
                  <div className="h-px w-10 bg-bb-mint" />
                </div>
                <div className="relative text-bb-mint">
                  <Icon />
                  <p
                    className="font-display uppercase text-white mt-3 text-display-3"
                  >
                    {name}
                  </p>
                </div>
              </div>

              {/* Item cells */}
              {clusterItems.map((item, li) => {
                const i = itemOffsets[gi] + li
                const lit = spotlight === i
                return (
                  <div
                    key={item}
                    className="relative group overflow-hidden border-r border-b border-black/15"
                    style={{ height: CELL_H }}
                    onMouseEnter={() => void videoRefs.current[i]?.play().catch(() => {})}
                    onMouseLeave={() => videoRefs.current[i]?.pause()}
                  >
                    {/* Waveform wash — a different crop of the brand halftone
                        fills each cell, so the grid reads as a run of one
                        artwork. Held at 45% so the copy sits on top of it
                        rather than in it. */}
                    <div
                      aria-hidden="true"
                      className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${lit ? 'opacity-0' : 'opacity-45 group-hover:opacity-0'}`}
                      style={waveStyle(i)}
                    />
                    {/* Brand animation — hidden until hover/spotlight, and only
                        plays then too: no autoPlay, or every clip decodes
                        continuously for the whole session even while off-screen.
                        preload is upgraded to "auto" when the grid scrolls into
                        view (see the observer above), not at page load. */}
                    <video
                      ref={(el) => { videoRefs.current[i] = el }}
                      src={videoSrcs[i % videoSrcs.length]}
                      loop
                      muted
                      playsInline
                      preload="none"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${lit ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    />
                    {/* Scrim — keeps the label legible over the bright animation */}
                    <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${lit ? 'opacity-35' : 'opacity-0 group-hover:opacity-35'}`} />
                    {/* Content — top-aligned: these are sentences, not labels, so
                        a shared top edge across the row beats optical centring */}
                    <div className="absolute inset-0 flex flex-col p-6">
                      <span className={`text-label tracking-label mb-4 transition-colors duration-500 ${lit ? 'text-white/70' : 'text-bb-blue group-hover:text-white/70'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className={`text-body-sm transition-colors duration-500 ${lit ? 'text-white' : 'text-black/70 group-hover:text-white'}`}>
                        {item}
                      </p>
                    </div>
                  </div>
                )
              })}

            </Fragment>
          ))}

          {/* Grow has one fewer item than the other two clusters, so the last
              slot of the 4×3 goes unfilled. Nothing is drawn there — no cell, no
              border — so the grid just stops short of the corner. */}
        </div>
        </div>

      </section>

      {/* ── CTA — mint block moment ── */}
      <ServiceCTA
        heading="Get discovered."
        bg="bg-bb-mint"
        hoverText="hover:text-bb-mint"
        cta="Let's Talk"
      />

      <Footer />
    </main>
  )
}
