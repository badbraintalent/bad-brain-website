'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import WindowTitleBar from '@/components/ui/WindowTitleBar'
import ServiceCTA from '@/components/sections/ServiceCTA'
import ClientQuote from '@/components/sections/ClientQuote'
import StudioParadigm from '@/components/sections/StudioParadigm'
import { useEffect, useRef, useState } from 'react'
import { enter, scanlines } from '@/lib/y2k'

// Hero "channel" clips are the client placeholder reels — the only video on this
// page. Pending client sign-off on whether these three are the clips he wants
// (see docs/CLIENT-QUESTIONS.md).
const pillars = [
  {
    num: '01',
    type: 'Quickfire',
    label: 'Fast & Reactive Content',
    desc: 'Snappy content to grab genuine reactions — vox-pops, quick reviews, on-the-spot takes.',
    video: '/videos/643f326f-6cc3-4911-84db-07e530191a93.mp4',
  },
  {
    num: '02',
    type: 'Conversation',
    label: 'Structured & Hosted Formats',
    desc: 'Proper conversations that earn real attention — interviews, podcasts, Q&As.',
    video: '/videos/1c23b88f-b7be-4ccc-a43b-3b7a0b6cf8b3.mp4',
  },
  {
    num: '03',
    type: 'Conceptual',
    label: 'Art-Directed & Elevated Content',
    desc: 'Fully produced pieces — editorial shoots, social series, micro-dramas, campaign work.',
    video: '/videos/ee1173e5-69c8-4dd1-b1e4-ee9b5bbd0b0a.mp4',
  },
]

const CHANNEL_DWELL_MS = 5000
const pad2 = (n: number) => String(n).padStart(2, '0')

const steps = [
  {
    num: '01',
    title: 'Quickfire Content',
    desc: 'Fast and reactive. Shoot snappy content to grab genuine reactions — vox-pops, quick reviews, on-the-spot takes — shot and posted while it’s still current.',
  },
  {
    num: '02',
    title: 'Conversation Formats',
    desc: 'Structured and hosted. Produce proper conversations that earn real attention — interviews, podcasts, Q&As — cut into a full conversation plus shorter clips.',
  },
  {
    num: '03',
    title: 'Conceptual Content',
    desc: 'Art-directed and elevated. Craft fully produced pieces — editorial-style shoots, social series, micro-dramas, campaign work — bigger in scope, made to be the thing people remember.',
  },
]

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
    // auto-cycle here (hover still switches channels).
    const cycle = window.matchMedia('(prefers-reduced-motion: reduce)').matches
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
        <div
          className="grid min-h-0 grid-cols-1 grid-rows-[32%_1fr] lg:grid-cols-[45%_1fr] lg:grid-rows-none w-full max-w-[1800px] mx-auto"
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
                  className="relative flex-1 min-h-0 min-w-0 overflow-hidden border-r last:border-r-0 lg:border-r-0 lg:border-b lg:last:border-b-0 border-white/15 cursor-pointer"
                  style={enter(`${0.18 + i * 0.1}s`, '0.9s')}
                  onMouseEnter={() => setActive(i)}
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
                          className="w-2 h-2 bg-bb-blue shrink-0"
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
              <p className="text-black/60 text-body-sm mb-6 max-w-[30rem]">
                The feed&apos;s a{' '}
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
                className="inline-flex items-center gap-2 text-black/60 text-label tracking-label uppercase hover:text-bb-blue transition-colors group w-fit cursor-pointer"
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
              <div className="mt-8 h-1.5 w-16 bg-bb-blue" />
            </div>

            {/* Body copy */}
            <div className="studio-problem-copy space-y-5 text-black/60 text-body-md pt-2">
              <p>
                <strong className="text-black font-semibold">Views are easy</strong> — ride a trend and
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

          {/* ── The supplied strategy diagram, sat under the two-column copy ── */}
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
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          <div className="studio-approach-header">
            <div className="flex items-baseline justify-between pb-6 border-b border-black/20">
              <span className="text-label tracking-label-wide uppercase text-black/60">What Studio Makes</span>
              <span className="text-label tracking-label uppercase text-black/40">For Brands</span>
            </div>
            {/* Two columns from md up, breaking at "It lives". Same grid
                template as the format rows below: the first half runs flush
                left across the number + title columns (lining up with the
                section header and the 01/02/03 rail), the second sits over the
                description column. */}
            <div className="mt-8 mb-8 md:mb-12 grid grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_1fr_1fr] gap-x-8 gap-y-4 text-black/60 text-body-md">
              <p className="col-start-1 col-span-2">
                <strong className="text-black font-semibold">
                  Build your own content formats and media IP.
                </strong>{' '}
                Entertainment-first content produced by Bad Brain Studio.
              </p>
              <p className="col-start-1 col-span-2 md:col-start-3 md:col-span-1">
                It lives on your channel, fronted by whoever tells the story best — that could be a
                creator, a customer or one of your own team.
              </p>
            </div>
          </div>

          <div className="studio-approach-list">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className={`studio-approach-${i + 1} grid grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_1fr_1fr] gap-x-8 gap-y-2 py-8 border-b border-black/10 group`}
              >
                <span className="text-black/40 text-label tabular-nums pt-[0.2em]">{s.num}</span>
                <h3 className="text-body-sm font-bold text-black uppercase tracking-label group-hover:text-black/50 transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-body-sm text-black/50 col-start-2 md:col-start-3 mt-1 md:mt-0">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Client testimonial — shared site-wide quote treatment ── */}
      <ClientQuote
        quote="Bad Brain’s understanding of the ever evolving social and content landscape is second to none, and across multiple client projects they’ve consistently elevated the work by bringing a true content creator perspective to every brief. Bad Brain are a key unlock, creating market-leading UGC that platforms crave and performance depends on."
        attribution="Guy Crozier, Founder & Director — Crozier Consulting"
        accent="text-bb-blue"
      />

      {/* ── CTA — blue block moment ── */}
      <ServiceCTA
        heading="An audience that stays."
        bg="bg-bb-blue"
        hoverText="hover:text-bb-blue"
        cta="Make it with us"
      />

      <Footer />
    </main>
  )
}
