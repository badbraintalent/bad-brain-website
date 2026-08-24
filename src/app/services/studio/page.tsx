'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import WindowTitleBar from '@/components/ui/WindowTitleBar'
import ServiceCTA from '@/components/sections/ServiceCTA'
import ClientQuote from '@/components/sections/ClientQuote'
import StudioParadigm from '@/components/sections/StudioParadigm'
import { useEffect, useRef, useState } from 'react'
import { enter, scanlines } from '@/lib/y2k'

// Hero "channel" clips are the only video on this page. Running order is
// Quickfire, then Conceptual, then Conversation.
//
// The rack is driven off how many channels carry a clip. The layout, the
// auto-cycle, the preload chain and the channel affordances all follow from
// that count: at three it's a rack, at two a pair, at one a single monitor with
// the switching UI gone. A channel with an empty `video` reads as off air and
// keeps its copy — set the path to bring it on air, don't delete the channel.
//
// `focus` is the vertical framing, and belongs to the clip rather than the slot:
// the monitor is ~2.4:1, so a 9:16 clip shows only 23% of its frame height and a
// centred crop lands on the chest. Lance is framed at 22% because his face sits
// between 19% and 41% of frame height throughout. Clips whose subject is already
// mid-frame take the default.
type Channel = {
  num: string
  type: string
  label: string
  desc: string
  /** Empty means the channel is off air — see the note above. */
  video?: string
  focus?: string
}

const CHANNELS: Channel[] = [
  {
    num: '01',
    type: 'Quickfire',
    label: 'Fast & Reactive Content',
    desc: 'Snappy content to grab genuine reactions - vox-pops, quick reviews, on-the-spot takes.',
    // Same footage the Connect page ships as lance-480; this is the 540×960
    // rendition, since the rack slot is ~647px wide.
    video: '/videos/creators/lance.mp4',
    focus: '22%',
  },
  {
    num: '02',
    type: 'Conceptual',
    label: 'Art-Directed & Elevated Content',
    desc: 'Fully produced pieces - editorial shoots, social series, micro-dramas, campaign work.',
    // Opaque filename is the asset's own — left as-is so it stays traceable.
    video: '/videos/643f326f-6cc3-4911-84db-07e530191a93.mp4',
  },
  {
    num: '03',
    type: 'Conversation',
    label: 'Structured & Hosted Formats',
    desc: 'Proper conversations that earn real attention - interviews, podcasts, Q&As.',
    // The only landscape clip in the rack — the other two are 9:16 phone
    // footage. It needs no `focus`: the subject sits mid-frame vertically,
    // which is the default case the note above describes.
    video: '/videos/podcast.mp4',
  },
]

const pillars = CHANNELS.filter((c): c is Channel & { video: string } => Boolean(c.video))

const CHANNEL_DWELL_MS = 5000
const pad2 = (n: number) => String(n).padStart(2, '0')

// With a single clip there is nothing to switch between, so the cycling and the
// hover-to-select affordance are both suppressed rather than left dead.
const multiChannel = pillars.length > 1

/* `channel` ties each format row to the hero channel that shows it, so the two
   lists can't drift apart — the rows carry the same clips as the rack. Note the
   running orders differ: the rack runs Quickfire, Conceptual, Conversation, and
   these read Quickfire, Conversation, Conceptual. */
const steps = [
  {
    num: '01',
    title: 'Quickfire Content',
    channel: 'Quickfire',
    desc: 'Fast and reactive. Shoot snappy content to grab genuine reactions - vox-pops, quick reviews, on-the-spot takes - shot and posted while it’s still current.',
  },
  {
    num: '02',
    title: 'Conversation Formats',
    channel: 'Conversation',
    desc: 'Structured and hosted. Produce proper conversations that earn real attention - interviews, podcasts, Q&As - cut into a full conversation plus shorter clips.',
  },
  {
    num: '03',
    title: 'Conceptual Content',
    channel: 'Conceptual',
    desc: 'Art-directed and elevated. Craft fully produced pieces - editorial-style shoots, social series, micro-dramas, campaign work - bigger in scope, made to be the thing people remember.',
  },
]

const channelFor = (type: string) => CHANNELS.find((c) => c.type === type)

export default function StudioPage() {
  /* Hero channel switcher — one "live" monitor at a time; auto-cycles until the
     user hovers the rack, resumes when they leave. Only the live channel's video
     plays, and everything pauses when the hero scrolls out of view. */
  const [active, setActive] = useState(0)
  const [ready, setReady] = useState<boolean[]>(() => pillars.map(() => false))
  const rackRef = useRef<HTMLDivElement | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const tcRef = useRef<HTMLSpanElement | null>(null)
  const activeRef = useRef(0)
  const hoveredRef = useRef(false)
  const inViewRef = useRef(true)
  // The clips repeated beside the format rows, far down the page.
  const formatVideoRefs = useRef<(HTMLVideoElement | null)[]>([])

  /* Those monitors run only while they are on screen. Hover would have been the
     cheaper trigger, but it is a desktop-only affordance and these need to move
     on a phone too — the whole point of the row is to put motion next to the
     format name. `preload="none"` means nothing is fetched until a row is
     actually reached. */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const v = entry.target as HTMLVideoElement
          if (entry.isIntersecting) void v.play().catch(() => {})
          else v.pause()
        }
      },
      { threshold: 0.35 }
    )
    formatVideoRefs.current.forEach((v) => v && io.observe(v))
    return () => io.disconnect()
  }, [])

  /* Clips load sequentially: CH 01 preloads eagerly; each channel that becomes
     playable kicks off the next one's fetch, so first paint isn't competing
     with three simultaneous video downloads. Until a clip is playable its
     monitor shows the "acquiring signal" state. */
  const markReady = (i: number) => {
    setReady((prev) => (prev[i] ? prev : prev.map((r, j) => (j === i ? true : r))))
    const next = videoRefs.current[i + 1]
    // Only kick an untouched video — load() would reset one already playing.
    if (next && next.readyState === 0 && next.paused) next.load()
  }

  useEffect(() => {
    activeRef.current = active
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === active && inViewRef.current) void v.play().catch(() => {})
      else v.pause()
    })
    // Quantised "signal acquired" flicker on the newly live monitor.
    videoRefs.current[active]?.animate(
      [{ opacity: 0.15 }, { opacity: 1 }],
      { duration: 240, easing: 'steps(4, end)' }
    )
  }, [active])

  useEffect(() => {
    // Videos already buffered (bfcache / fast refresh) never fire canplay again.
    videoRefs.current.forEach((v, i) => {
      if (v && v.readyState >= 3) markReady(i)
    })

    // The CSS reduced-motion guard can't reach JS-driven motion — gate the
    // auto-cycle here (hover still switches channels). A one-channel rack has
    // nothing to cycle to, so it doesn't run a timer at all.
    const cycle = !multiChannel || window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? null
      : setInterval(() => {
          if (!hoveredRef.current && inViewRef.current) {
            setActive((a) => (a + 1) % pillars.length)
          }
        }, CHANNEL_DWELL_MS)

    // Timecode ticks at the site's "12fps" — written straight to the DOM so the
    // page doesn't re-render 12×/s.
    const tick = setInterval(() => {
      const v = videoRefs.current[activeRef.current]
      const el = tcRef.current
      if (!v || !el) return
      const t = v.currentTime
      el.textContent = `${pad2(Math.floor(t / 60))}:${pad2(Math.floor(t % 60))}:${pad2(Math.floor((t % 1) * 12))}`
    }, 1000 / 12)

    const io = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting
      const v = videoRefs.current[activeRef.current]
      if (!v) return
      if (entry.isIntersecting) void v.play().catch(() => {})
      else v.pause()
    })
    if (rackRef.current) io.observe(rackRef.current)

    return () => {
      if (cycle) clearInterval(cycle)
      clearInterval(tick)
      io.disconnect()
    }
  }, [])

  return (
    <main>
      <Navigation />

      {/* ── Hero — production order layout: pillar cells left, copy right ── */}
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
        {/* ── Production pillar cells + copy column (fills the hero) ── */}
        {/* On mobile the rack is a horizontal band, so channel count decides how
            tall it needs to be: three monitors side by side each keep a portrait
            frame at 32%, but a lone monitor spans the full width and would be a
            hard letterbox crop of a 9:16 clip — it gets more height instead.
            Both class strings are written out in full so Tailwind can see them. */}
        <div
          className={`grid min-h-0 grid-cols-1 ${multiChannel ? 'grid-rows-[32%_1fr]' : 'grid-rows-[46%_1fr]'} lg:grid-cols-[45%_1fr] lg:grid-rows-none w-full max-w-[1800px] mx-auto`}
        >
          {/* Left — monitor rack: three channels, one live at a time. On mobile
              the rack turns on its side (top band, monitors side by side) so each
              channel keeps a portrait frame instead of a 90px letterbox. */}
          <div
            ref={rackRef}
            className="flex flex-col min-h-0 border-b lg:border-b-0 lg:border-r border-black/15 overflow-hidden bg-black relative"
            onMouseEnter={() => { hoveredRef.current = true }}
            onMouseLeave={() => { hoveredRef.current = false }}
          >
            {/* Shared OS-window chrome — every service hero device runs as an app */}
            <div className="shrink-0" style={enter('0.14s', '0.9s')}>
              <WindowTitleBar name="studio.exe" className="bg-bb-grey px-3 py-2" />
            </div>
            <div className="flex flex-row lg:flex-col flex-1 min-h-0">
            {pillars.map((p, i) => {
              const live = active === i
              return (
                <div
                  key={p.num}
                  className={`relative flex-1 min-h-0 min-w-0 overflow-hidden border-r last:border-r-0 lg:border-r-0 lg:border-b lg:last:border-b-0 border-white/15${multiChannel ? ' cursor-pointer' : ''}`}
                  style={enter(`${0.18 + i * 0.1}s`, '0.9s')}
                  onMouseEnter={multiChannel ? () => setActive(i) : undefined}
                >
                  <video
                    ref={(el) => { videoRefs.current[i] = el }}
                    src={p.video}
                    muted
                    loop
                    playsInline
                    preload={i === 0 ? 'auto' : 'none'}
                    autoPlay={i === 0}
                    onCanPlay={() => markReady(i)}
                    // A clip that fails to load must not strand its monitor on
                    // the "acquiring signal" loop (or stall the next clip's
                    // fetch) — drop the loader and move on.
                    onError={() => markReady(i)}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      objectPosition: `center ${p.focus ?? 'center'}`,
                      filter: live ? 'none' : 'grayscale(1) brightness(0.4)',
                      transition: 'filter 0.25s steps(3, end)',
                    }}
                  />
                  {/* "Acquiring signal" — covers the monitor until its clip is playable */}
                  <div
                    aria-hidden={ready[i]}
                    className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-3 pointer-events-none"
                    style={{ opacity: ready[i] ? 0 : 1, transition: 'opacity 0.3s steps(3, end)' }}
                  >
                    <span className="text-label tracking-label-wide text-white/50">
                      ACQUIRING SIGNAL
                    </span>
                    <div className="h-1 w-24 bg-white/15 overflow-hidden">
                      <div
                        className="h-full w-1/4 bg-bb-blue"
                        style={{ animation: 'load-sweep 0.9s steps(12) infinite' }}
                      />
                    </div>
                  </div>
                  {/* CRT scanlines — heavier on standby channels */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      ...scanlines(0.28, 3),
                      opacity: live ? 0.35 : 0.7,
                      transition: 'opacity 0.25s steps(3, end)',
                    }}
                  />
                  {/* Top status strip */}
                  <div
                    className="absolute top-0 inset-x-0 flex items-center justify-between gap-1 px-2 lg:px-4 pt-2.5 pb-6 text-label tracking-label text-white"
                    style={{ background: 'linear-gradient(rgba(0,0,0,0.55), transparent)' }}
                  >
                    {/* Channel type and timecode are dropped on the narrow
                        mobile monitors — only CH + REC state survive */}
                    <span>CH {p.num}<span className="hidden lg:inline"> · {p.type.toUpperCase()}</span></span>
                    {live ? (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 bg-black shrink-0"
                          style={{ animation: 'rec-blink 1s steps(1) infinite' }}
                        />
                        <span className="hidden sm:inline">REC</span>{' '}
                        <span ref={tcRef} className="hidden lg:inline">00:00:00</span>
                      </span>
                    ) : (
                      <span className="text-white/40">STBY</span>
                    )}
                  </div>
                  {/* Bottom caption */}
                  <div
                    className="absolute bottom-0 inset-x-0 px-2 lg:px-4 pb-3 pt-10"
                    style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.65))' }}
                  >
                    <p
                      className="text-label font-semibold uppercase tracking-label"
                      style={{ color: live ? '#fff' : 'rgba(255,255,255,0.45)', transition: 'color 0.25s steps(3, end)' }}
                    >
                      {p.label}
                    </p>
                  </div>
                </div>
              )
            })}
            </div>
          </div>

          {/* Right — copy column */}
          <div className="flex flex-col min-h-0 min-w-0">
            {/* Upper: headline anchored to bottom. Container-typed so the headline
                can be sized against this column rather than the viewport. */}
            <div className="relative flex-1 flex flex-col justify-end px-6 sm:px-10 lg:px-16 pt-10 pb-6 lg:pb-10 [container-type:inline-size]">
              {/* Mobile-only halftone — fills the space the hidden panels leave */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/halftones/studio_16x9_blue.png"
                alt=""
                aria-hidden="true"
                className="lg:hidden absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              />
              {/* Headline + sub-brand mark — same lockup slot on every service hero.
                  The mark stacks above the statement so the headline gets the full
                  column; cqi sizes it to the column, so the longest line ("Stopping")
                  lands flush with the right edge at every width. */}
              <div className="relative flex flex-col items-start gap-5 lg:gap-7">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/brand/marks/Studio.svg"
                  alt="Bad Brain Studio"
                  className="shrink-0 w-[8rem] lg:w-[10rem] h-auto"
                  style={enter('0.26s')}
                />
                <h1
                  className="uppercase text-black leading-hero"
                  style={{ fontSize: 'clamp(1.5rem, 12.6cqi, 7rem)' }}
                >
                  <span className="block" style={enter('0.32s')}>Worth</span>
                  <span className="block" style={enter('0.42s')}>Stopping</span>
                  <span className="block" style={enter('0.52s')}>For.</span>
                </h1>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-black/15" style={enter('0.55s', '0.5s')} />

            {/* Lower: copy + CTA */}
            <div
              className="px-6 sm:px-10 lg:px-16 py-8 pb-10 lg:pb-hero-bleed"
              style={{ ...enter('0.65s') }}
            >
              <p className="text-black/70 text-body-sm mb-6 max-w-[30rem]">
                The social feed&apos;s a{' '}
                <strong className="text-black font-semibold">TV channel now.</strong> People skip the
                ads, and keep hopping until something&apos;s worth stopping for.{' '}
                <strong className="text-black font-semibold">Studio brings you that content.</strong>
              </p>
              <a
                href="#approach"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#approach')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 text-black/70 text-label tracking-label uppercase hover:text-bb-blue transition-colors group w-fit cursor-pointer"
              >
                <span className="border-b border-black/20 pb-0.5 group-hover:border-bb-blue transition-colors">
                  See what&apos;s on
                </span>
                <span className="arrow-hop inline-block">→</span>
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* ── Problem section — white, typographic two-col ── */}
      <section className="bg-white py-14 md:py-24 overflow-clip">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">

            {/* Pull quote */}
            <div className="studio-pull-quote">
              <p
                className="font-display text-black uppercase text-display-2 leading-hero"
              >
                It&apos;s about watch time over view count.
              </p>
              <div className="mt-8 h-1.5 w-16 bg-black" />
            </div>

            {/* Body copy */}
            <div className="studio-problem-copy space-y-5 text-black/70 text-body-md pt-2">
              <p>
                <strong className="text-black font-semibold">Views are easy</strong> - ride a trend and
                you&apos;ll get a spike, but that attention was never really about your brand.{' '}
                <strong className="text-black font-semibold">Viewership is harder:</strong> people who
                come back for your own story, not someone else&apos;s moment.
              </p>
              <p>
                A sharp creator and media strategy pulls audiences into that story. Your organic content
                makes them stay.
              </p>
            </div>

          </div>

          {/* ── Strategy diagram, sat under the two-column copy ── */}
          <div className="mt-12 md:mt-20 lg:mt-24">
            <StudioParadigm />
          </div>
        </div>
      </section>

      {/* ── Approach — numbered rows over the Studio halftone ── */}
      <section id="approach" className="relative py-14 md:py-24 studio-approach-section bg-white border-t border-black/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brand/halftones/studio_16x9_gray.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          <div className="studio-approach-header">
            <div className="flex items-baseline justify-between pb-6 border-b border-black/20">
              <span className="text-label tracking-label-wide uppercase text-black/70">What Studio Makes</span>
              <span className="text-label tracking-label uppercase text-black/60">For Brands</span>
            </div>
            {/* Two columns from md up, breaking at "It lives". Same grid
                template as the format rows below: the first half runs flush
                left across the number + title columns (lining up with the
                section header and the 01/02/03 rail), the second sits over the
                description column. */}
            <div className="mt-8 mb-8 md:mb-12 grid grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_1fr_1fr] gap-x-8 gap-y-4 text-black/70 text-body-md">
              <p className="col-start-1 col-span-2">
                <strong className="text-black font-semibold">
                  Build your own content formats and media IP.
                </strong>{' '}
                Entertainment-first content produced by Bad Brain Studio.
              </p>
              <p className="col-start-1 col-span-2 md:col-start-3 md:col-span-1">
                It lives on your channel, fronted by whoever tells the story best - that could be a
                creator, a customer or one of your own team.
              </p>
            </div>
          </div>

          {/* Each format row carries its own hero clip in a fourth column from lg
              up — the same footage the rack plays, so the abstract format names
              have a picture next to them. Below lg the column would squeeze the
              copy, so the monitor drops under the row at full width instead. */}
          <div className="studio-approach-list">
            {steps.map((s, i) => {
              const channel = channelFor(s.channel)
              return (
              <div
                key={s.num}
                className={`studio-approach-${i + 1} grid grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_1fr_1fr] lg:grid-cols-[2.5rem_1fr_1fr_13rem] gap-x-8 gap-y-2 py-8 border-b border-black/10 group`}
              >
                <span className="text-black/40 text-label tabular-nums pt-[0.2em]">{s.num}</span>
                <h3 className="text-body-sm font-bold text-black uppercase tracking-label group-hover:text-black/60 transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-body-sm text-black/60 col-start-2 md:col-start-3 mt-1 md:mt-0">
                  {s.desc}
                </p>

                {/* Monitor. Cut down from the hero's — border, scanlines and the
                    channel number, but no chrome, timecode or standby state:
                    at 208px wide those would be noise, and nothing here is
                    switchable. */}
                <div className="col-start-1 col-span-2 md:col-start-3 lg:col-start-4 lg:col-span-1 mt-4 lg:mt-0 max-w-[26rem] lg:max-w-none">
                  <div className="relative aspect-[16/9] overflow-hidden bg-black border border-black/15">
                    {channel?.video ? (
                      <video
                        ref={(el) => { formatVideoRefs.current[i] = el }}
                        src={channel.video}
                        muted
                        loop
                        playsInline
                        preload="none"
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: `center ${channel.focus ?? 'center'}` }}
                      />
                    ) : (
                      /* Off-air fallback. Every channel has footage today, so
                         nothing reaches this — but it is the visible half of the
                         "empty `video` reads as off air" contract in `Channel`,
                         so it stays. The grey halftone read as a dead monitor;
                         this is the mint plate the Resonate cluster headers use,
                         legibly a brand graphic rather than a failed load. */
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src="/images/brand/halftones/studio_16x9_green.png"
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                      />
                    )}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none"
                      style={{ ...scanlines(0.28, 3), opacity: 0.45 }}
                    />
                    {/* The label sits over whatever the clip happens to be showing
                        — a bright frame swallowed it, so it gets its own scrim
                        rather than relying on the footage being dark. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-10 pointer-events-none bg-gradient-to-b from-black/65 to-transparent"
                    />
                    <span className="absolute top-2 left-2.5 text-label tracking-label text-white">
                      CH {s.num}
                    </span>
                  </div>
                </div>
              </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── Client testimonial — shared site-wide quote treatment ── */}
      <ClientQuote
        quote="Bad Brain’s understanding of the ever evolving social and content landscape is second to none, and across multiple client projects they’ve consistently elevated the work by bringing a true content creator perspective to every brief. Bad Brain are a key unlock, creating market-leading UGC that platforms crave and performance depends on."
        attribution="Guy Crozier, Founder & Director - The Warren"
        logo={{ src: '/images/clients/the-warren.png', alt: 'The Warren' }}
        accent="text-bb-mint"
      />

      {/* ── CTA — grey block moment ── */}
      <ServiceCTA
        heading="An audience that stays."
        bg="bg-bb-grey"
        hoverText="hover:text-bb-grey"
        cta="Let's Talk"
      />

      <Footer />
    </main>
  )
}
