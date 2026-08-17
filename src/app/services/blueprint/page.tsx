'use client'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import WindowTitleBar from '@/components/ui/WindowTitleBar'
import ServiceCTA from '@/components/sections/ServiceCTA'
import ClientQuote from '@/components/sections/ClientQuote'
import { useEffect, useRef, type CSSProperties } from 'react'
import { enter } from '@/lib/y2k'

// Scroll-driven animation properties not yet in @types/react
type ScrollCSS = CSSProperties & {
  viewTimelineName?: string
  viewTimelineAxis?: string
  animationTimeline?: string
  animationRange?: string
}

/* The FFF funnel — three descending tiers, widest at the top. Widths are
   Tailwind classes rather than inline styles so the ramp can differ by
   breakpoint (inline styles carry no breakpoints).

   Two ramps, not one. The desktop 100/78/56 taper was previously `lg:`-only,
   so below 1024px the tiers were all full-width and the funnel read as three
   flat bars. Narrow screens now get a gentler 100/88/76 — the full desktop
   taper would leave ~170px of text column at 375px, where this one leaves
   ~250px. */
const funnel = [
  {
    name: 'Faces',
    sub: 'Influencer channels',
    action: 'Bring new audiences in.',
    width: 'w-full',
  },
  {
    name: 'Formats',
    sub: 'Organic social',
    action: 'Keep them watching.',
    width: 'w-[88%] lg:w-[78%]',
  },
  {
    name: 'Function',
    sub: 'UGC × media',
    action: 'Inspire the sale.',
    width: 'w-[76%] lg:w-[56%]',
  },
]

/* What Blueprint covers, grouped by the FFF tier it sits under. */
const framework = [
  {
    label: 'Faces',
    category: 'Creator partnerships',
    intro: 'The partnerships that bring new audiences into your world.',
    items: [
      {
        lead: 'Design or rebuild your creator programme',
        detail: 'creator selection, commercial terms and measurement, built around your team.',
      },
      {
        lead: 'Get more from the creator relationships you already have',
        detail: 'reviewing outreach, usage rights, pricing and contracts so every partnership earns its place.',
      },
    ],
  },
  {
    label: 'Formats',
    category: 'Organic social',
    intro: 'The brand-owned content that keeps them watching.',
    items: [
      {
        lead: 'Define your entertainment-first content strategy',
        detail: 'what your channels should make, how to make it worth watching, and what the first campaigns look like.',
      },
    ],
  },
  {
    label: 'Function',
    category: 'Conversion content',
    intro: 'The product-focused content and paid media that converts them.',
    items: [
      {
        lead: 'Design your conversion layer',
        detail: 'the right mix of UGC, gifted content and paid media to reach audiences already in your world at the right moment.',
      },
    ],
  },
]


export default function BlueprintPage() {
  /* Hero "render scan" — two passes, both top-to-bottom: the pixel field
     rasterises itself onto blueprint graph paper, holds the finished render,
     then the paper re-exposes itself in a second downward pass back to a
     clean sheet, so the loop never hard-resets. Runs at the site's 12fps;
     pauses off-screen. */
  const panelRef = useRef<HTMLDivElement | null>(null)
  const paperRef = useRef<HTMLDivElement | null>(null)
  const scanRef = useRef<HTMLDivElement | null>(null)
  const readoutRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const RENDER_FRAMES = 54 // 4.5s render pass down…
    const HOLD_FRAMES = 30 // …2.5s admiring the finished render…
    const CLEAR_FRAMES = 54 // …4.5s as the paper re-exposes itself downwards…
    const REST_FRAMES = 12 // …and a 1s beat on the clean sheet
    const CYCLE = RENDER_FRAMES + HOLD_FRAMES + CLEAR_FRAMES + REST_FRAMES
    let inView = true
    let frame = 0

    const tick = setInterval(() => {
      if (!inView) return
      frame = (frame + 1) % CYCLE
      let clip: string
      let label: string
      let boundary = -1 // scan-line position in %; <0 hides the line
      if (frame < RENDER_FRAMES) {
        const pct = Math.round((frame / RENDER_FRAMES) * 100)
        clip = `inset(${pct}% 0 0 0)`
        label = `RENDER ${String(pct).padStart(3, '0')}%`
        boundary = pct
      } else if (frame < RENDER_FRAMES + HOLD_FRAMES) {
        clip = 'inset(100% 0 0 0)'
        label = 'RENDER OK'
      } else if (frame < RENDER_FRAMES + HOLD_FRAMES + CLEAR_FRAMES) {
        const pct = Math.round(((frame - RENDER_FRAMES - HOLD_FRAMES) / CLEAR_FRAMES) * 100)
        // Paper visible from the top down to the boundary — ends fully
        // covering, which is exactly the render pass's starting state.
        clip = `inset(0 0 ${100 - pct}% 0)`
        label = `CLEAR ${String(pct).padStart(3, '0')}%`
        boundary = pct
      } else {
        clip = 'inset(0 0 0 0)'
        label = 'STANDBY'
      }
      if (paperRef.current) paperRef.current.style.clipPath = clip
      if (scanRef.current) {
        if (boundary >= 0) scanRef.current.style.top = `${boundary}%`
        scanRef.current.style.opacity = boundary >= 0 ? '1' : '0'
      }
      if (readoutRef.current) readoutRef.current.textContent = label
    }, 1000 / 12)

    const io = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting })
    if (panelRef.current) io.observe(panelRef.current)

    return () => {
      clearInterval(tick)
      io.disconnect()
    }
  }, [])

  return (
    <main>
      <Navigation />

      {/* ── Hero — CSS grid, three columns: pixel field | logo | copy ── */}
      <section
        className="bg-white text-black relative"
        style={{
          height: 'calc(100svh - 65px)',
          minHeight: '700px',
          maxHeight: '900px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateRows: '1fr',
        }}
      >
        {/* ── Brand panels + copy column (fills the hero) ── */}
        <div
          className="grid min-h-0 overflow-hidden grid-cols-1 grid-rows-[30%_1fr] lg:grid-cols-[32%_1fr] lg:grid-rows-none w-full max-w-[1800px] mx-auto"
        >
          {/* Col 1 — pixel field rendering itself onto blueprint graph paper.
              On mobile it runs as the top band of the hero rather than a column. */}
          <div
            ref={panelRef}
            className="flex flex-col min-h-0 border-b lg:border-b-0 lg:border-r border-black/15 overflow-hidden"
            style={enter('0.18s', '0.8s')}
          >
            {/* Shared OS-window chrome — every service hero device runs as an app */}
            <WindowTitleBar name="blueprint.exe" className="shrink-0 border-b border-black/15 px-3 py-2" />
            <div className="relative flex-1 min-h-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand/fields/bg_9x16_1.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ imageRendering: 'pixelated' }}
            />
            {/* Un-rendered region — draughting paper (minor + major gridlines) below the scan line */}
            <div
              ref={paperRef}
              aria-hidden="true"
              className="absolute inset-0 bg-white pointer-events-none"
              style={{
                clipPath: 'inset(0 0 0 0)',
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(0,174,239,0.1) 0 1px, transparent 1px 8px), ' +
                  'repeating-linear-gradient(90deg, rgba(0,174,239,0.1) 0 1px, transparent 1px 8px), ' +
                  'repeating-linear-gradient(0deg, rgba(0,174,239,0.28) 0 1px, transparent 1px 32px), ' +
                  'repeating-linear-gradient(90deg, rgba(0,174,239,0.28) 0 1px, transparent 1px 32px)',
              }}
            />
            {/* Scan line at the render boundary — dashed draughting cut line */}
            <div ref={scanRef} aria-hidden="true" className="absolute inset-x-0 top-0 pointer-events-none">
              <div
                className="h-0.5"
                style={{ background: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.6) 0 10px, transparent 10px 16px)' }}
              />
              {/* Section-marker ticks at each end of the cut line */}
              <span className="absolute left-0 -top-[3px] w-2 h-2 bg-black/60" />
              <span className="absolute right-0 -top-[3px] w-2 h-2 bg-black/60" />
            </div>
            {/* Progress readout — mint, the Blueprint accent */}
            <div className="absolute bottom-3 left-3 bg-bb-mint px-2 py-1 pointer-events-none">
              <span ref={readoutRef} className="text-label tracking-label tabular-nums text-black/70">
                RENDER 000%
              </span>
            </div>
            {/* Schematic dressing — corner registration marks + figure label */}
            {['top-3 right-3', 'bottom-3 right-3'].map((pos) => (
              <span key={pos} aria-hidden="true" className={`absolute ${pos} w-3 h-3 pointer-events-none`}>
                <span className="absolute inset-x-0 top-1/2 h-px bg-black/30" />
                <span className="absolute inset-y-0 left-1/2 w-px bg-black/30" />
              </span>
            ))}
            <span className="absolute bottom-2.5 right-8 text-label tracking-label text-black/35 pointer-events-none">
              FIG. 01
            </span>
            </div>
          </div>

          {/* Col 2 — Copy column */}
          <div className="flex flex-col min-h-0 min-w-0">
            {/* Upper: headline anchored to bottom. Container-typed so the headline
                can be sized against this column rather than the viewport. */}
            <div className="relative flex-1 flex flex-col justify-end px-6 sm:px-10 lg:px-16 pt-10 pb-6 lg:pb-10 [container-type:inline-size]">
              {/* Mobile-only halftone — fills the space the hidden panels leave */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/halftones/blueprint_16x9_blue.png"
                alt=""
                aria-hidden="true"
                className="lg:hidden absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              />
              {/* Headline + sub-brand mark — same lockup slot on every service hero.
                  The mark stacks above the statement so the headline gets the full
                  column; cqi sizes it to the column, so the longest line ("following.")
                  lands flush with the right edge at every width. */}
              <div className="relative flex flex-col items-start gap-5 lg:gap-7">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/brand/marks/Blueprint.svg"
                  alt="Bad Brain Blueprint"
                  className="shrink-0 w-[8rem] lg:w-[10rem] h-auto"
                  style={enter('0.32s')}
                />
                <h1
                  className="uppercase text-black leading-hero"
                  style={{ fontSize: 'clamp(1.5rem, 10.5cqi, 7rem)' }}
                >
                  <span className="block" style={enter('0.38s')}>Build a</span>
                  <span className="block" style={enter('0.48s')}>world worth</span>
                  <span className="block" style={enter('0.58s')}>following.</span>
                </h1>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-black/15" style={enter('0.60s', '0.5s')} />

            {/* Lower: copy + CTA */}
            <div
              className="px-6 sm:px-10 lg:px-16 py-8 pb-10 lg:pb-hero-bleed"
              style={{ ...enter('0.70s') }}
            >
              {/* The measure was 30rem, which split "creator campaigns / over here"
                  mid-phrase. At 36rem the sentence's three clauses land one per line and
                  both key phrases stay whole. The nowrap spans hold them together below
                  that width too; each is ~200px, so they fit even a 320px column. */}
              <p className="text-black/70 text-body-sm mb-6 max-w-[36rem]">
                Most brands have social scattered across teams &ndash;{' '}
                <span className="whitespace-nowrap">creator campaigns over here</span>,
                organic content there, <span className="whitespace-nowrap">paid media somewhere else</span>.
                Coordinated in theory. Fragmented in practice. Blueprint connects the dots
                &ndash; and the world follows.
              </p>
              <a
                href="#framework"
                onClick={(e) => { e.preventDefault(); document.querySelector('#framework')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="inline-flex items-center gap-2 text-black/70 text-label tracking-label uppercase hover:text-bb-blue transition-colors group w-fit cursor-pointer"
              >
                <span className="border-b border-black/20 pb-0.5 group-hover:border-bb-blue transition-colors">
                  See the framework
                </span>
                <span className="arrow-hop inline-block">→</span>
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* ── Hero / page divide — the hero and the section below are both white,
             so the seam needs marking. A draughting cut line rather than a plain
             rule, echoing the hero panel's scan line, with a blue tick at the
             left to carry the accent through. ── */}
      <div aria-hidden="true" className="relative bg-white">
        <div
          className="h-px"
          style={{ background: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.28) 0 10px, transparent 10px 16px)' }}
        />
        <span className="absolute left-0 top-0 h-0.5 w-24 bg-black" />
      </div>

      {/* ── Problem section — editorial, typographic ── */}
      <section className="bg-white py-14 md:py-24 overflow-clip">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">

            {/* Pull quote — display size, left column */}
            <div className="consulting-pull-quote">
              <p
                className="font-display text-black uppercase text-display-2 leading-hero"
              >
Your audience wants a world to belong to.
              </p>
              <div className="mt-8 h-1.5 w-16 bg-black" />
            </div>

            {/* Body copy — right column */}
            <div className="consulting-problem-copy space-y-5 text-black/70 text-body-md pt-2">
              <p>
                Faces, Formats and Function is how you build one.
              </p>
              <p>
                Blueprint is social entertainment strategy, done properly. Most clients start here &ndash; some
                building from scratch, some with campaigns already in flight but nothing tying them together.
              </p>
              <p>
                Either way, the first step is an audit across Faces, Formats and Function &ndash; mapping what&apos;s
                working, finding what isn&apos;t, and setting the strategy that gets everything pulling in the same
                direction.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── FFF funnel — the framework as a schematic, echoing the draughting
             language of the hero panel ── */}
      <section id="framework" className="bg-bb-fill py-14 md:py-24 border-t border-black/10 overflow-clip">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Named timeline on the list so the tiers stagger against this block
              entering the viewport — the funnel assembles itself top-down. */}
          <ol
            className="flex flex-col items-center gap-1"
            style={{
              viewTimelineName: '--fff-funnel',
              viewTimelineAxis: 'block',
            } as ScrollCSS}
          >
            {funnel.map(({ name, sub, action, width }, i) => (
              <li
                key={name}
                className={`${width} bg-black text-white px-6 sm:px-8 py-5 flex flex-wrap items-center gap-x-6 gap-y-2`}
                style={{
                  // Rises into place rather than sweeping in from the side — a
                  // horizontal slide would fight the funnel's own left-to-right
                  // narrowing. Staggered top-down so it reads Faces → Function.
                  animationName: 'consulting-up-in',
                  animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  animationFillMode: 'both',
                  animationTimeline: '--fff-funnel',
                  animationRange: `cover ${8 + i * 7}% cover ${33 + i * 7}%`,
                } as ScrollCSS}
              >
                <span className="text-body-md font-bold uppercase tracking-label">{name}</span>
                <span aria-hidden="true" className="hidden sm:block w-px h-5 bg-white/25 shrink-0" />
                <span className="text-label tracking-label uppercase text-white/50">
                  {sub}
                </span>
                <span className="w-full sm:w-auto sm:ml-auto text-body-sm text-bb-mint sm:text-right">
                  {action}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Services manifest — numbered rows over the Blueprint halftone ── */}
      <section id="services" className="relative py-14 md:py-24 consulting-services-section bg-white border-t border-black/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brand/halftones/blueprint_16x9_gray.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          {/* Section header */}
          <div className="consulting-services-header flex items-baseline justify-between mb-8 md:mb-12 pb-6 border-b border-black/20">
            <span className="text-label tracking-label-wide uppercase text-black/70">What Blueprint Covers</span>
            <span className="text-label tracking-label uppercase text-black/60">For Brands, Agencies and Networks</span>
          </div>

          {/* Service groups — one block per FFF tier */}
          <div className="consulting-services-list">
            {framework.map(({ label, category, intro, items }, i) => {
              // Items number continuously across the three tiers, so the section
              // still reads as one manifest rather than three restarting lists.
              const offset = framework
                .slice(0, i)
                .reduce((n, g) => n + g.items.length, 0)

              return (
                <div key={label} className={`consulting-service-${i + 1} py-8`}>
                  {/* 1 — Tier header: heaviest note, echoes the funnel above.
                         Blue rule matches Connect's phase headers. */}
                  <div className="flex items-baseline gap-4 pb-2 border-b-2 border-black">
                    <h3
                      className="text-black uppercase text-display-3"
                    >
                      {label}
                    </h3>
                    <span className="text-label tracking-label uppercase text-black/60">
                      {category}
                    </span>
                  </div>

                  {/* 2 — Caption: the tier's promise, set apart in italic */}
                  <p className="text-body-md text-black/60 italic mt-5 mb-2 max-w-2xl">{intro}</p>

                  {/* 3/4 — Items: bold lead clause, lighter detail clause */}
                  {items.map(({ lead, detail }, j) => (
                    <div
                      key={lead}
                      className="grid grid-cols-[2.25rem_1fr] gap-x-4 sm:gap-x-6 py-5 border-t border-black/10"
                    >
                      <span className="text-label text-black/30 pt-[0.3em]">
                        {String(offset + j + 1).padStart(2, '0')}
                      </span>
                      <p className="text-body-md max-w-3xl">
                        <span className="text-black font-semibold">{lead}</span>
                        <span className="text-black/70"> — {detail}</span>
                      </p>
                    </div>
                  ))}
                </div>
              )
            })}

            {/* Workshops — sits across all three tiers, so it gets the inverse
                treatment: a black panel closing the manifest, mint label, with
                the copy set on the same baseline as the heading. */}
            <div className="consulting-service-4 mt-10">
              <div className="bg-black text-white p-8 sm:p-10">
                <p className="text-label tracking-label uppercase text-bb-mint">
                  Across all three
                </p>
                {/* auto track, not a fixed one — the display face is far wider
                    than its size implies and overruns a fixed column */}
                <div className="mt-1 grid gap-4 lg:grid-cols-[auto_1fr] lg:gap-10 lg:items-end">
                  {/* Larger than the tier headings — sized so the word spans the
                      full two lines of copy beside it, top and bottom */}
                  <h3 className="uppercase text-display-3">
                    Workshops
                  </h3>
                  {/* Bottom-aligned: the paragraph's last line sits on the same
                      baseline as the heading (their descender space matches to
                      within a pixel, so box-bottom alignment is enough) */}
                  <p className="text-body-sm text-white/60 max-w-2xl lg:border-l lg:border-white/15 lg:pl-10">
                    Workshops and training built around the FFF framework — so your team can think in
                    social entertainment terms, brief creators confidently and own the strategy in-house.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Client testimonial — shared site-wide quote treatment ── */}
      <ClientQuote
        quote="Bad Brain are a genuine pleasure to work with and bring a sharp understanding of every stage of the funnel — and how influencers can effectively move customers through it. They develop highly impressive plans and strategic frameworks, underpinned by thoughtful insight and genuinely creative ideas."
        attribution="Sarah Twyman, Head of Consumer — Smoking Gun"
        accent="text-bb-mint"
      />

      {/* ── CTA — mint block moment ── */}
      <ServiceCTA
        heading={<>Start with Blueprint.</>}
        cta="Tell us what you’re building"
        bg="bg-bb-mint"
        hoverText="hover:text-bb-mint"
      />

      <Footer />
    </main>
  )
}
