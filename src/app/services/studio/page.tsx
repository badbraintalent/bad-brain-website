'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import VideoShowcase from '@/components/sections/VideoShowcase'
import WindowTitleBar from '@/components/ui/WindowTitleBar'
import ServiceCTA from '@/components/sections/ServiceCTA'
import { useEffect, useRef, useState } from 'react'
import { enter, scanlines } from '@/lib/y2k'

// Hero "channel" clips are the client placeholder reels (same set as VideoShowcase).
const pillars = [
  {
    num: '01',
    type: 'Generative',
    label: 'AI & Rendered Assets',
    desc: 'Low cost, high scale — tone-setting product renders and motion ads at scale.',
    video: '/videos/643f326f-6cc3-4911-84db-07e530191a93.mp4',
  },
  {
    num: '02',
    type: 'Live Production',
    label: 'Human-Centred Stories',
    desc: 'Photo and video shoots under unified creative direction.',
    video: '/videos/1c23b88f-b7be-4ccc-a43b-3b7a0b6cf8b3.mp4',
  },
  {
    num: '03',
    type: 'Creator Activations',
    label: 'Social-Native Content',
    desc: 'Authentic creator content that expands reach and acquires customers.',
    video: '/videos/ee1173e5-69c8-4dd1-b1e4-ee9b5bbd0b0a.mp4',
  },
]

const CHANNEL_DWELL_MS = 5000
const pad2 = (n: number) => String(n).padStart(2, '0')

const steps = [
  {
    num: '01',
    title: 'Generative AI & Digitally Rendered Assets',
    desc: 'Low cost, high scale ad units that establish tone and style with sleek product renders and high quality motion ads at scale.',
  },
  {
    num: '02',
    title: 'Live Production',
    desc: 'Providing a much-needed human element with photo and video shoots conducted under the same creative direction.',
  },
  {
    num: '03',
    title: 'Creator Activations',
    desc: 'Translating your creative brief into authentic, socially native content that expands your reach and acquires customers.',
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
          overflow: 'hidden',
          display: 'grid',
          gridTemplateRows: '1fr',
        }}
      >
        {/* ── Production pillar cells + copy column (fills the hero) ── */}
        <div
          className="grid min-h-0 grid-cols-1 lg:grid-cols-[45%_1fr]"
        >
          {/* Left — monitor rack: three channels, one live at a time */}
          <div
            ref={rackRef}
            className="hidden lg:flex flex-col min-h-0 border-r border-black/15 overflow-hidden bg-black relative"
            onMouseEnter={() => { hoveredRef.current = true }}
            onMouseLeave={() => { hoveredRef.current = false }}
          >
            {/* Shared OS-window chrome — every service hero device runs as an app */}
            <div style={enter('0.14s', '0.9s')}>
              <WindowTitleBar name="studio.exe" className="bg-bb-grey px-3 py-2" />
            </div>
            {pillars.map((p, i) => {
              const live = active === i
              return (
                <div
                  key={p.num}
                  className="relative flex-1 min-h-0 overflow-hidden border-b border-white/15 last:border-b-0 cursor-pointer"
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
                    <span className="font-mono text-[0.6rem] tracking-[0.3em] text-white/50">
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
                    className="absolute top-0 inset-x-0 flex items-center justify-between px-4 pt-2.5 pb-6 font-mono text-[0.6rem] tracking-[0.15em] text-white"
                    style={{ background: 'linear-gradient(rgba(0,0,0,0.55), transparent)' }}
                  >
                    <span>CH {p.num} · {p.type.toUpperCase()}</span>
                    {live ? (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 bg-[#ff2d2d]"
                          style={{ animation: 'rec-blink 1s steps(1) infinite' }}
                        />
                        REC <span ref={tcRef}>00:00:00</span>
                      </span>
                    ) : (
                      <span className="text-white/40">STBY</span>
                    )}
                  </div>
                  {/* Bottom caption */}
                  <div
                    className="absolute bottom-0 inset-x-0 px-4 pb-3 pt-10"
                    style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.65))' }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.15em]"
                      style={{ color: live ? '#fff' : 'rgba(255,255,255,0.45)', transition: 'color 0.25s steps(3, end)' }}
                    >
                      {p.label}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right — copy column */}
          <div className="flex flex-col min-h-0">
            {/* Upper: headline anchored to bottom */}
            <div className="relative flex-1 flex flex-col justify-end px-10 lg:px-16 pt-10 pb-10">
              {/* Mobile-only halftone — fills the space the hidden panels leave */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/halftones/studio_16x9_blue.png"
                alt=""
                aria-hidden="true"
                className="lg:hidden absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              />
              {/* Headline + sub-brand mark — same lockup slot on every service hero */}
              <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
                <h1
                  className="uppercase text-black"
                  style={{ fontSize: 'clamp(2.8rem, 5.2vw, 8rem)', lineHeight: 0.88 }}
                >
                  <span className="block" style={enter('0.32s')}>Make</span>
                  <span className="block" style={enter('0.42s')}>The</span>
                  <span className="block" style={enter('0.52s')}>Work.</span>
                </h1>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/brand/marks/Studio.svg"
                  alt="Bad Brain Studio"
                  className="order-first sm:order-last shrink-0 w-[10.8rem] lg:w-[16.8rem] h-auto sm:mb-2"
                  style={enter('0.5s')}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-black/15" style={enter('0.55s', '0.5s')} />

            {/* Lower: copy + CTA */}
            <div
              className="px-10 lg:px-16 py-8"
              style={{ paddingBottom: 'clamp(5rem, 10vw, 8rem)', ...enter('0.65s') }}
            >
              <p className="text-black/60 text-sm leading-relaxed mb-6" style={{ maxWidth: '30rem' }}>
                Generative AI is{' '}
                <strong className="text-black font-semibold">rewriting creative production</strong> —
                but the brands that win will be those who know when to use it, and when not to. We build
                all three production approaches under{' '}
                <strong className="text-black font-semibold">one clear creative strategy.</strong>
              </p>
              <a
                href="#approach"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#approach')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 text-black/60 text-xs tracking-[0.2em] uppercase hover:text-bb-blue transition-colors group w-fit cursor-pointer"
              >
                <span className="border-b border-black/20 pb-0.5 group-hover:border-bb-blue transition-colors">
                  How we work
                </span>
                <span className="arrow-hop inline-block">→</span>
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* ── Problem section — white, typographic two-col ── */}
      <section className="bg-white py-24 overflow-clip">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Pull quote */}
            <div className="studio-pull-quote">
              <p
                className="font-display text-black uppercase"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)', lineHeight: 0.88, letterSpacing: '-0.04em' }}
              >
                Three ways to build.
              </p>
              <div className="mt-8 h-1.5 w-16 bg-bb-blue" />
            </div>

            {/* Body copy */}
            <div className="studio-problem-copy space-y-5 text-black/60 text-base leading-relaxed pt-2">
              <p>
                <strong className="text-black font-semibold">Generative AI should set your backdrop</strong>{' '}
                — landing pages, product pages, motion catalog assets, and display ads at scale.
              </p>
              <p>
                <strong className="text-black font-semibold">Traditional, human-centred production</strong>{' '}
                is where your brand&apos;s deepest stories will be told — building emotional connection
                through long-form placements: TV, OOH, CTV, and experiential.
              </p>
              <p>
                <strong className="text-black font-semibold">Creators</strong> remain your social shop
                front — a face that connects audiences to your brand through familiarity, relatability, and
                aspiration. Bad Brain Studio delivers all three under one clear creative direction.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Video showcase ── */}
      <VideoShowcase />

      {/* ── Approach — numbered rows over the Studio halftone ── */}
      <section id="approach" className="relative py-24 studio-approach-section bg-white border-t border-black/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brand/halftones/studio_16x9_gray.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          <div className="studio-approach-header flex items-baseline justify-between mb-12 pb-6 border-b border-black/20">
            <span className="text-[0.65rem] tracking-[0.35em] uppercase text-black/60">How We Work</span>
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-black/40">03 Approaches</span>
          </div>

          <div className="studio-approach-list">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className={`studio-approach-${i + 1} grid grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_1fr_1fr] gap-x-8 gap-y-2 py-8 border-b border-black/10 group`}
              >
                <span className="text-black/40 text-xs font-mono pt-[0.2em]">{s.num}</span>
                <h3 className="text-sm font-bold text-black uppercase tracking-wide group-hover:text-black/50 transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-sm text-black/50 leading-relaxed col-start-2 md:col-start-3 mt-1 md:mt-0">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA — blue block moment ── */}
      <ServiceCTA heading="Build with us." bg="bg-bb-blue" hoverText="hover:text-bb-blue" />

      <Footer />
    </main>
  )
}
