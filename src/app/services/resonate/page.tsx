'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import WindowTitleBar from '@/components/ui/WindowTitleBar'
import ServiceCTA from '@/components/sections/ServiceCTA'
import { useEffect, useRef, useState } from 'react'
import { enter } from '@/lib/y2k'

const EQ_BARS = 16

const services = [
  'Strategic consultancy',
  'Artist & label social media audits',
  'Creative direction and ideation',
  'Content calendars and release planning',
  'Creator-ready production toolkits',
  'Performance reviews and optimisation',
  'Album and release campaigns',
  'Ongoing social listening',
  'Creator and UGC alignment',
  'Ecosystem partnerships and amplification',
  'Paid media strategy and scaling',
  'Community management',
]

// Official brand animations (compressed) — the only place these replace
// client placeholder videos, per client direction.
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
      current = (current + 1 + Math.floor(Math.random() * (services.length - 1))) % services.length
      if (prev >= 0) videoRefs.current[prev]?.pause()
      void videoRefs.current[current]?.play().catch(() => {})
      setSpotlight(current)
    }, 3500)

    const io = new IntersectionObserver(([entry]) => {
      gridInViewRef.current = entry.isIntersecting
      if (!entry.isIntersecting) {
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

        {/* Main content — flex-1, headline fills, copy bottom-right */}
        <div
          className="relative flex-1 flex flex-col min-h-0 max-w-7xl mx-auto w-full px-8 lg:px-12"
          style={{ paddingBottom: 'clamp(6rem, 10vw, 9rem)' }}
        >
          {/* Headline + mark — one lockup, bottom-anchored together so the pair
              stays coupled at any viewport size (mark was previously pinned
              top-right and drifted away from the headline on big screens) */}
          <div className="flex-1 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 pt-8 sm:pt-0 pb-10 min-h-0">
            <h1
              className="title-outline uppercase"
              style={{
                fontSize: 'clamp(2.4rem, 5.2vw, 5.2rem)',
                /* 30% outside-stroke per guideline pg 14. The stroke is doubled
                   (centred webkit stroke = 0.6em), so a 2-line stack needs ~1.55
                   leading or the puffy outlines of adjacent lines merge into a blob. */
                lineHeight: 1.55,
                ['--title-stroke' as never]: '0.3em',
              }}
            >
              <span className="block" style={enter('0.28s')}>Rewrite</span>
              <span className="block" style={enter('0.38s')}>the Rules.</span>
            </h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand/marks/Resonate.svg"
              alt="Bad Brain Resonate"
              className="order-first sm:order-last shrink-0 w-[10.8rem] lg:w-[16.8rem] h-auto sm:mb-6"
              style={enter('0.5s')}
            />
          </div>

          {/* Bottom row: copy in a clean white inset card (right-aligned on large) */}
          <div
            className="flex flex-col lg:flex-row lg:items-start lg:justify-end gap-6"
            style={enter('0.62s')}
          >
            <div className="bg-white border border-black/15" style={{ maxWidth: '28rem' }}>
              <WindowTitleBar name="resonate.exe" className="border-b border-black/15 px-3 py-2" />
              <div className="p-6">
                <p className="text-black/60 text-sm leading-relaxed mb-6">
                  Social media has{' '}
                  <strong className="text-black font-semibold">rewritten the rules of music discovery</strong>{' '}
                  — turning content into the primary way artists are found and followed. The opportunity is
                  huge, but only for artists with a strategy that actually works.
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
                    Our approach
                  </span>
                  <span className="arrow-hop inline-block">→</span>
                </a>
              </div>
              {/* Player strip — live EQ + elapsed counter */}
              <div className="flex items-center gap-3 border-t border-black/15 px-3 py-2">
                <span aria-hidden="true" className="text-black/60 text-[0.55rem] leading-none">▶</span>
                <span aria-hidden="true" className="flex items-end gap-[3px] h-3 flex-1">
                  {Array.from({ length: EQ_BARS }, (_, i) => (
                    <span
                      key={i}
                      ref={(el) => { eqRefs.current[i] = el }}
                      className="w-1 h-full bg-bb-blue origin-bottom"
                      style={{ transform: 'scaleY(0.2)' }}
                    />
                  ))}
                </span>
                <span className="font-mono text-[0.55rem] tracking-[0.15em] text-black/40">
                  <span ref={elapsedRef}>00:00</span> / 00:16
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Do — staggered typographic split ── */}
      <section className="bg-white overflow-clip">

        {/* "PERSONALITY" — large, left-aligned, bleeds to the right edge */}
        <div className="pt-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="resonate-pull-quote overflow-hidden">
              <p
                className="font-display uppercase text-black whitespace-nowrap"
                style={{ fontSize: 'clamp(2rem, 8vw, 7rem)', lineHeight: 0.88, letterSpacing: '-0.04em' }}
              >
                Personality
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-black/10 mt-5" />

        {/* "into presence." — right-aligned, right edge on the container gutter */}
        <div className="px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto text-right">
            <p
              className="font-display uppercase text-black inline-block"
              style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4.5rem)', lineHeight: 0.88, letterSpacing: '-0.04em' }}
            >
              into presence.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-black/10" />

        {/* Body copy — two columns */}
        <div className="px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="resonate-problem-copy grid lg:grid-cols-2 gap-8 lg:gap-20 text-black/60 text-base leading-relaxed">
              <div className="space-y-5">
                <p>
                  Led by{' '}
                  <strong className="text-black font-semibold">experts with real industry experience</strong>,
                  Bad Brain Resonate delivers social strategy for artists and labels alike — turning
                  your personality into presence.
                </p>
                <p>
                  We use proven,{' '}
                  <strong className="text-black font-semibold">entertainment-first content strategies</strong>{' '}
                  to build real fans and nurture lasting communities on platforms like TikTok.
                </p>
              </div>
              <div>
                <p>
                  By tapping into{' '}
                  <strong className="text-black font-semibold">Bad Brain&apos;s wider ecosystem</strong>{' '}
                  — creators we represent and brand-side relationships — we extend your music beyond your
                  own channels and into culture.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── Approach — black block moment, three-column process grid ── */}
      <section id="approach" className="bg-black border-t border-black relative overflow-hidden">
        {/* Faint mint waveform — Y2K grain over the flat black (echoes the hero) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brand/halftones/resonate_16x9_green.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        />
        {/* CRT scanlines — subtle retro-monitor texture over the waveform */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 4px)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          {/* Header row: label left, heading right */}
          <div className="resonate-approach-header flex items-baseline justify-between py-6 border-b border-white/20">
            <span className="text-[0.65rem] tracking-[0.35em] uppercase text-white/50">Approach</span>
            <p
              className="font-display uppercase text-white"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 2rem)', letterSpacing: '-0.04em' }}
            >
              Inside&#8209;out. Outside&#8209;in.
            </p>
          </div>

          {/* Three-column process pillars */}
          <div className="resonate-approach-left grid lg:grid-cols-3">

            <div className="resonate-approach-copy relative py-12 lg:pr-10 border-b lg:border-b-0 lg:border-r border-white/15">
              <div className="h-px w-10 bg-bb-mint mb-6" />
              {/* Drawn edge-to-edge in a 40×40 box so the icon column matches
                  the w-10 rule above and left-aligns with the label below */}
              <svg
                aria-hidden="true"
                viewBox="0 0 40 40"
                width="40"
                height="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-bb-mint mb-4"
              >
                <path d="M20 39V17" strokeLinecap="round" />
                <path d="M20 17l-5-6" strokeLinecap="round" />
                <path d="M11 20a12.7 12.7 0 0 1 18 0" strokeLinecap="round" />
                <path d="M1 14a27 27 0 0 1 38 0" strokeLinecap="round" />
              </svg>
              <span className="text-[0.55rem] tracking-[0.3em] uppercase text-bb-mint font-mono block mb-6">
                01 / Channel
              </span>
              <p className="text-white/60 text-base leading-relaxed">
                We help artists build strong, authentic content on their own channels, while using
                strategic insight and partnerships to drive meaningful use of your songs in the
                TikTok library among audiences aligned to your style.
              </p>
            </div>

            <div className="resonate-approach-copy relative py-12 lg:px-10 border-b lg:border-b-0 lg:border-r border-white/15">
              <div className="h-px w-10 bg-bb-mint mb-6" />
              <svg
                aria-hidden="true"
                viewBox="0 0 40 40"
                width="40"
                height="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-bb-mint mb-4"
              >
                <path d="M6 11L20 24M34 11L20 24M20 24v5" strokeLinecap="round" />
                <rect x="0.6" y="0.6" width="10" height="10" rx="1" />
                <rect x="29.4" y="0.6" width="10" height="10" rx="1" />
                <rect x="15" y="28.8" width="10" height="10" rx="1" />
              </svg>
              <span className="text-[0.55rem] tracking-[0.3em] uppercase text-bb-mint font-mono block mb-6">
                02 / Strategy
              </span>
              <p className="text-white/60 text-base leading-relaxed">
                Our work spans everything from{' '}
                <strong className="text-white font-semibold">focused consultancy and creative direction</strong>{' '}
                to full, ongoing social strategy — sharpening content, defining repeatable formats,
                and building momentum through planned releases, partnerships, and platform-native storytelling.
              </p>
            </div>

            <div className="resonate-approach-copy relative py-12 lg:pl-10">
              <div className="h-px w-10 bg-bb-mint mb-6" />
              <svg
                aria-hidden="true"
                viewBox="0 0 40 40"
                width="40"
                height="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-bb-mint mb-4"
              >
                <path d="M0.6 39.4h38.8" strokeLinecap="round" />
                <rect x="1" y="28" width="8" height="11.4" />
                <rect x="16" y="20" width="8" height="19.4" />
                <rect x="31" y="12" width="8" height="27.4" />
                <path d="M28 1h8v8M36 1L24 13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[0.55rem] tracking-[0.3em] uppercase text-bb-mint font-mono block mb-6">
                03 / Results
              </span>
              <p className="text-white/60 text-base leading-relaxed">
                The result:{' '}
                <strong className="text-white font-semibold">sustainable growth</strong>,
                deeper fan connection, and content that works harder without demanding everything from the artist.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Experience — magazine sidebar layout ── */}
      <section className="bg-white">

        {/* Section label */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="resonate-experience-header flex items-baseline justify-between py-6 border-b border-black/10">
            <span className="text-[0.65rem] tracking-[0.35em] uppercase text-black/40">Experience</span>
          </div>
        </div>

        {/* Sidebar + photo — contained to the same gutter as the bio below */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="resonate-photo grid lg:grid-cols-[280px_1fr]" style={{ minHeight: '520px' }}>

            {/* Left: name + career timeline */}
            <div className="border-r border-black/10 px-6 lg:px-8 py-10 flex flex-col bg-black/[0.03]">
              <p className="font-display text-black mb-1 pt-4"
                 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)' }}>
                Jen Long
              </p>
              <p className="text-[0.6rem] tracking-[0.25em] uppercase text-black/40 mb-14">
                Resonate Co-Founder
              </p>
              <div className="flex-1">
                {[
                  ['BBC Introducing', 'Radio 1 Presenter'],
                  ['BBC Three', 'Lead Voice'],
                  ['DICE', 'Music Editor'],
                  ['The Line of Best Fit', 'Head of Partnerships'],
                  ['Take Care Management', 'Founder — 2023'],
                ].map(([org, role], i) => (
                  <div key={org} className="group flex items-start gap-3 border-t border-black/10 py-5 hover:bg-bb-mint/10 transition-colors -mx-2 px-2">
                    <span className="font-mono text-[0.6rem] tracking-[0.15em] text-bb-blue mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-black">{org}</p>
                      <p className="text-[0.65rem] text-black/40 tracking-wide mt-0.5">{role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: full-height photo */}
            <div className="relative overflow-hidden bg-[#1a1a1a]" style={{ minHeight: '480px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/resonate/jen-long.jpg"
                alt="Jen Long, Resonate Co-Founder"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: 'center 52%' }}
              />
            </div>

          </div>
        </div>

        {/* Bio — two columns below */}
        <div className="resonate-bio max-w-7xl mx-auto px-6 lg:px-8 py-16 border-t border-black/10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 text-black/60 text-base leading-relaxed">
            <div className="space-y-5">
              <p>
                Resonate Co-Founder{' '}
                <strong className="text-black font-semibold">Jen Long</strong> brings nearly two
                decades of frontline experience across broadcasting, platforms, and artist management.
                She began her career at the BBC, presenting{' '}
                <strong className="text-black font-semibold">BBC Introducing on Radio 1</strong> and
                serving as the voice of BBC Three — giving her early insight into how artists break and
                how audiences form.
              </p>
              <p>
                Post-BBC, Jen helped launch live music platform{' '}
                <strong className="text-black font-semibold">DICE as Music Editor</strong> before moving
                into artist management. Since 2017, she has worked closely with artists while simultaneously
                leading partnerships for{' '}
                <strong className="text-black font-semibold">The Line of Best Fit</strong>.
              </p>
            </div>
            <div className="space-y-5">
              <p>
                In 2023, Jen founded{' '}
                <strong className="text-black font-semibold">Take Care Management</strong>, where she
                continues to work with a focused roster including{' '}
                <strong className="text-black font-semibold">jasmine.4.t</strong>, recently named one of
                BBC 6 Music&apos;s Artists of the Year.
              </p>
              <div className="border border-black/20">
                {/* OS-window title bar */}
                <WindowTitleBar name="roster.txt" className="border-b border-black/15 px-3 py-2" />
                <div className="p-6">
                  <p className="text-black/60 text-sm">
                    Jen&apos;s work spans a globally respected roster including{' '}
                    <strong className="text-black">The Knife, Fever Ray, Big Red Machine, Austra,
                    Hannah Georgas, Planningtorock</strong>, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── Services — full-width brand-animation hover grid ── */}
      <section className="bg-white resonate-services-section border-t border-black/10">

        {/* Header — contained */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-0">
          <div className="resonate-services-header flex items-baseline justify-between pb-6">
            <span className="text-[0.65rem] tracking-[0.35em] uppercase text-black/60">Services</span>
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-black/40">12 Offerings</span>
          </div>
        </div>

        {/* Full-width 4×3 grid — spotlight (attract mode) lights one cell while
            nobody hovers; real hovers pause the cycle and take over */}
        <div
          ref={servicesRef}
          className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-black/15"
          onMouseEnter={() => { gridHoverRef.current = true; setSpotlight(null) }}
          onMouseLeave={() => { gridHoverRef.current = false }}
        >
          {services.map((service, i) => {
            const lit = spotlight === i
            return (
            <div
              key={service}
              className="relative group overflow-hidden border-r border-b border-black/15"
              style={{ height: '220px' }}
              onMouseEnter={() => void videoRefs.current[i]?.play().catch(() => {})}
              onMouseLeave={() => videoRefs.current[i]?.pause()}
            >
              {/* Faint waveform strip — echoes the hero halftone; each cell shows
                  a different slice so the row reads like a track sequence */}
              <div
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 pointer-events-none transition-opacity duration-700 ${lit ? 'opacity-0' : 'opacity-70 group-hover:opacity-0'}`}
                style={{
                  backgroundImage: "url('/images/brand/halftones/resonate_16x9_gray.png')",
                  /* zoom, strip height and slice vary per cell so the grid reads
                     as twelve different waveform crops; y stays in the 40–60%
                     band where the art actually lives, so no slice is blank */
                  height: `${36 + (i * 17) % 32}px`,
                  backgroundSize: `${240 + (i % 3) * 90}% auto`,
                  backgroundPosition: `${(29 + i * 37) % 100}% ${44 + (i * 7) % 16}%`,
                }}
              />
              {/* Brand animation — hidden until hover/spotlight, and only plays
                  then too: no autoPlay, or all twelve clips decode continuously
                  for the whole session even while invisible/off-screen */}
              <video
                ref={(el) => { videoRefs.current[i] = el }}
                src={videoSrcs[i % videoSrcs.length]}
                loop
                muted
                playsInline
                preload="auto"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${lit ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              />
              {/* Scrim — keeps the label legible over the bright animation */}
              <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${lit ? 'opacity-35' : 'opacity-0 group-hover:opacity-35'}`} />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className={`text-[0.6rem] font-mono tracking-[0.2em] mb-3 transition-colors duration-500 ${lit ? 'text-white/70' : 'text-bb-blue group-hover:text-white/70'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className={`text-base font-medium transition-colors duration-500 leading-snug ${lit ? 'text-white' : 'text-black/70 group-hover:text-white'}`}>
                  {service}
                </p>
              </div>
            </div>
            )
          })}
        </div>

      </section>

      {/* ── CTA — mint block moment ── */}
      <ServiceCTA heading="Let the music work." bg="bg-bb-mint" hoverText="hover:text-bb-mint" />

      <Footer />
    </main>
  )
}
