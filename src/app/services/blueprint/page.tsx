'use client'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import WindowTitleBar from '@/components/ui/WindowTitleBar'
import ServiceCTA from '@/components/sections/ServiceCTA'
import { useEffect, useRef } from 'react'
import { enter } from '@/lib/y2k'

const services = [
  {
    num: '01',
    title: 'Optimisation & Auditing',
    desc: 'Optimisation and auditing of your existing strategy and partnerships to unlock efficiencies and improve budget allocation.',
  },
  {
    num: '02',
    title: 'Creator Programme Design',
    desc: 'Creator programme design with implementation tailored to your brand, based on clear actionable strategies.',
  },
  {
    num: '03',
    title: 'Cross-functional Frameworks',
    desc: 'Development of cross-functional frameworks to break down departmental silos and improve ROI.',
  },
  {
    num: '04',
    title: 'Creator & Partner Relationships',
    desc: 'Strengthen creator and partner relationships by refining outreach, pricing, usage, and contract policies.',
  },
  {
    num: '05',
    title: 'Creative Ideation & Execution',
    desc: 'Creative ideation and execution, from concept to campaign delivery.',
  },
  {
    num: '06',
    title: 'Workshops & Training',
    desc: 'Workshops and training to up-skill your team and embed best practices throughout.',
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
          overflow: 'hidden',
          display: 'grid',
          gridTemplateRows: '1fr',
        }}
      >
        {/* ── Brand panels + copy column (fills the hero) ── */}
        <div
          className="grid min-h-0 overflow-hidden grid-cols-1 lg:grid-cols-[32%_1fr]"
        >
          {/* Col 1 — pixel field rendering itself onto blueprint graph paper */}
          <div
            ref={panelRef}
            className="hidden lg:flex flex-col min-h-0 border-r border-black/15 overflow-hidden"
            style={enter('0.18s', '0.8s')}
          >
            {/* Shared OS-window chrome — every service hero device runs as an app */}
            <WindowTitleBar name="blueprint.exe" className="border-b border-black/15 px-3 py-2" />
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
              <span ref={readoutRef} className="font-mono text-[0.55rem] tracking-[0.15em] text-black/70">
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
            <span className="absolute bottom-2.5 right-8 font-mono text-[0.5rem] tracking-[0.2em] text-black/35 pointer-events-none">
              FIG. 01
            </span>
            </div>
          </div>

          {/* Col 2 — Copy column */}
          <div className="flex flex-col min-h-0">
            {/* Upper: headline anchored to bottom */}
            <div className="relative flex-1 flex flex-col justify-end px-10 lg:px-16 pt-10 pb-10">
              {/* Mobile-only halftone — fills the space the hidden panels leave */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/halftones/blueprint_16x9_blue.png"
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
                  <span className="block" style={enter('0.38s')}>See the</span>
                  <span className="block" style={enter('0.48s')}>Bigger</span>
                  <span className="block" style={enter('0.58s')}>Picture.</span>
                </h1>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/brand/marks/Blueprint.svg"
                  alt="Bad Brain Blueprint"
                  className="order-first sm:order-last shrink-0 w-[10.8rem] lg:w-[16.8rem] h-auto sm:mb-2"
                  style={enter('0.5s')}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-black/15" style={enter('0.60s', '0.5s')} />

            {/* Lower: copy + CTA */}
            <div
              className="px-10 lg:px-16 py-8"
              style={{ paddingBottom: 'clamp(5rem, 17vw, 13rem)', ...enter('0.70s') }}
            >
              <p className="text-black/60 text-sm leading-relaxed mb-6" style={{ maxWidth: '30rem' }}>
                Creator marketing spans all departments, leverages a range of payment models,
                and delivers a wide variety of outcomes.{' '}
                <strong className="text-black font-semibold">
                  Making sense of it is hard enough; running it efficiently is even harder.
                </strong>
                {' '}We help brands step back and build a programme that actually scales.
              </p>
              <a
                href="#services"
                onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="inline-flex items-center gap-2 text-black/60 text-xs tracking-[0.2em] uppercase hover:text-bb-blue transition-colors group w-fit cursor-pointer"
              >
                <span className="border-b border-black/20 pb-0.5 group-hover:border-bb-blue transition-colors">
                  See how we work
                </span>
                <span className="arrow-hop inline-block">→</span>
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* ── Problem section — editorial, typographic ── */}
      <section className="bg-white py-24 overflow-clip">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Pull quote — display size, left column */}
            <div className="consulting-pull-quote">
              <p
                className="font-display text-black uppercase"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.85rem)', lineHeight: 0.88, letterSpacing: '-0.04em' }}
              >
                Creator marketing isn&apos;t just one thing
              </p>
              <div className="mt-8 h-1.5 w-16 bg-bb-blue" />
            </div>

            {/* Body copy — right column */}
            <div className="consulting-problem-copy space-y-5 text-black/60 text-base leading-relaxed pt-2">
              <p>
                It&apos;s a mix of activity that spans all departments, leverages a range of payment models, and
                delivers a wide variety of outcomes.{' '}
                <strong className="text-black font-semibold">
                  Making sense of it is hard enough; running it efficiently is even harder.
                </strong>
              </p>
              <p>
                For <strong className="text-black font-semibold">start-ups and smaller businesses</strong>, the
                challenge is knowing where to begin: how to build and scale a programme from scratch with limited
                resources.
              </p>
              <p>
                For <strong className="text-black font-semibold">established brands</strong>, the challenge is
                scale: multiple teams, agencies, and budgets all chasing creators without a unified approach. The
                result? Fragmentation, duplication, and missed opportunities.
              </p>
              <p className="text-black font-medium pt-2">
                Bad Brain Blueprint helps brands, agencies, and networks step back and see the bigger picture.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Services manifest — numbered rows over the Blueprint halftone ── */}
      <section id="services" className="relative py-24 consulting-services-section bg-white border-t border-black/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brand/halftones/blueprint_16x9_gray.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          {/* Section header */}
          <div className="consulting-services-header flex items-baseline justify-between mb-12 pb-6 border-b border-black/20">
            <span className="text-[0.65rem] tracking-[0.35em] uppercase text-black/60">What We Do</span>
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-black/40">06 Services</span>
          </div>

          {/* Service rows */}
          <div className="consulting-services-list">
            {services.map((s, i) => (
              <div
                key={s.num}
                className={`consulting-service-${i + 1} grid grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_1fr_1fr] gap-x-8 gap-y-2 py-8 border-b border-black/10 group`}
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

      {/* ── CTA — mint block moment ── */}
      <ServiceCTA heading={<>Let&apos;s talk.</>} bg="bg-bb-mint" hoverText="hover:text-bb-mint" />

      <Footer />
    </main>
  )
}
