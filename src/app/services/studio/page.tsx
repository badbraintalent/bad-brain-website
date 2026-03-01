'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import VideoShowcase from '@/components/sections/VideoShowcase'
import type { CSSProperties } from 'react'

const enter = (delay: string, duration = '0.75s'): CSSProperties => ({
  animation: `consulting-up-in ${duration} cubic-bezier(0.22,1,0.36,1) both`,
  animationDelay: delay,
})

/* ── Studio identity mark — concentric circles: lens, depth, focus ── */
const StudioMark = () => (
  <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="14" cy="14" r="12" />
    <circle cx="14" cy="14" r="7" />
    <circle cx="14" cy="14" r="3" />
  </svg>
)

const pillars = [
  {
    num: '01',
    type: 'Generative',
    label: 'AI & Rendered Assets',
    desc: 'Low cost, high scale — tone-setting product renders and motion ads at scale.',
  },
  {
    num: '02',
    type: 'Live Production',
    label: 'Human-Centred Stories',
    desc: 'Photo and video shoots under unified creative direction.',
  },
  {
    num: '03',
    type: 'Creator Activations',
    label: 'Social-Native Content',
    desc: 'Authentic creator content that expands reach and acquires customers.',
  },
]

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
  return (
    <main>
      <Navigation />

      {/* ── Hero — production order layout: pillar cells left, copy right ── */}
      <section
        className="bg-[#1a1a1a] text-white relative"
        style={{
          height: 'calc(100svh - 65px)',
          minHeight: '700px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
        }}
      >
        {/* ── Row 1: Identity label — splits at pillar/copy boundary ── */}
        <div
          className="grid border-b border-[#333] grid-cols-1 lg:grid-cols-[45%_1fr]"
          style={enter('0.08s', '0.6s')}
        >
          <div className="flex items-center gap-3 px-8 lg:px-10 py-4 lg:border-r border-[#333] text-[#555]">
            <StudioMark />
            <span className="text-[0.6rem] tracking-[0.35em] uppercase">Bad Brain Studio</span>
          </div>
          <div className="hidden lg:flex items-center justify-end px-10 py-4">
            <span className="text-[#292929] text-[0.55rem] tracking-[0.3em] uppercase">
              Creative Production
            </span>
          </div>
        </div>

        {/* ── Row 2: Production pillar cells + copy column ── */}
        <div
          className="grid min-h-0 grid-cols-1 lg:grid-cols-[45%_1fr]"
        >
          {/* Left — three stacked pillar cells */}
          <div className="hidden lg:flex flex-col min-h-0 border-r border-[#333] overflow-hidden">
            {pillars.map((p, i) => (
              <div
                key={p.num}
                className="flex flex-col justify-center px-8 py-0 border-b border-[#2a2a2a] flex-1"
                style={enter(`${0.18 + i * 0.1}s`, '0.9s')}
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[#333] text-[0.6rem] font-mono">{p.num}</span>
                  <span className="text-[#3a3a3a] text-[0.5rem] tracking-[0.3em] uppercase">{p.type}</span>
                </div>
                <p className="text-[#737373] text-xs font-semibold uppercase tracking-[0.15em] leading-tight mb-1.5">
                  {p.label}
                </p>
                <p className="text-[#3d3d3d] text-[0.7rem] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Right — copy column */}
          <div className="flex flex-col min-h-0">
            {/* Upper: headline anchored to bottom */}
            <div className="flex-1 flex flex-col justify-end px-10 lg:px-16 pt-10 pb-10">
              <h1
                className="font-black uppercase text-white tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 5.2vw, 5rem)', lineHeight: 0.88 }}
              >
                <span className="block" style={enter('0.32s')}>Make</span>
                <span className="block" style={enter('0.42s')}>The</span>
                <span className="block" style={enter('0.52s')}>Work.</span>
              </h1>
            </div>

            {/* Divider */}
            <div className="border-t border-[#333]" style={enter('0.55s', '0.5s')} />

            {/* Lower: copy + CTA */}
            <div
              className="px-10 lg:px-16 py-8"
              style={{ paddingBottom: 'clamp(5rem, 10vw, 8rem)', ...enter('0.65s') }}
            >
              <p className="text-[#737373] text-sm leading-relaxed mb-6" style={{ maxWidth: '30rem' }}>
                Generative AI is{' '}
                <strong className="text-[#a0a0a0] font-semibold">rewriting creative production</strong> —
                but the brands that win will be those who know when to use it, and when not to. We build
                all three production approaches under{' '}
                <strong className="text-[#a0a0a0] font-semibold">one clear creative strategy.</strong>
              </p>
              <a
                href="#approach"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#approach')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 text-[#909090] text-xs tracking-[0.2em] uppercase hover:text-white transition-colors group w-fit cursor-pointer"
              >
                <span className="border-b border-[#333] pb-0.5 group-hover:border-[#909090] transition-colors">
                  How we work
                </span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* STUDIO bleed text */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none select-none"
          style={{ animation: 'consulting-up-in 1.2s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '0.5s' }}
        >
          <p
            className="font-black uppercase whitespace-nowrap"
            style={{
              fontSize: 'clamp(6rem, 20vw, 18rem)',
              letterSpacing: '-0.03em',
              lineHeight: 0.82,
              color: '#2a2a2a',
              transform: 'translateY(40%)',
              paddingLeft: '45%',
            }}
          >
            STUDIO
          </p>
        </div>
      </section>

      {/* ── Problem section — white, typographic two-col ── */}
      <section className="bg-white py-24 overflow-clip">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Pull quote */}
            <div className="studio-pull-quote">
              <p
                className="font-black tracking-tight text-[#1a1a1a] uppercase"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)', lineHeight: 0.88 }}
              >
                Three ways to build.
              </p>
              <div className="mt-8 h-px w-12 bg-gray-300" />
            </div>

            {/* Body copy */}
            <div className="studio-problem-copy space-y-5 text-gray-600 text-base leading-relaxed pt-2">
              <p>
                <strong className="text-gray-900 font-semibold">Generative AI should set your backdrop</strong>{' '}
                — landing pages, product pages, motion catalog assets, and display ads at scale.
              </p>
              <p>
                <strong className="text-gray-900 font-semibold">Traditional, human-centred production</strong>{' '}
                is where your brand&apos;s deepest stories will be told — building emotional connection
                through long-form placements: TV, OOH, CTV, and experiential.
              </p>
              <p>
                <strong className="text-gray-900 font-semibold">Creators</strong> remain your social shop
                front — a face that connects audiences to your brand through familiarity, relatability, and
                aspiration. Bad Brain Studio delivers all three under one clear creative direction.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Video showcase ── */}
      <VideoShowcase />

      {/* ── Approach — light, numbered rows, slides from left (matching consulting) ── */}
      <section id="approach" className="bg-[#f5f5f5] py-24 studio-approach-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="studio-approach-header flex items-baseline justify-between mb-12 pb-6 border-b border-gray-300">
            <span className="text-[0.65rem] tracking-[0.35em] uppercase text-gray-500">How We Work</span>
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-gray-400">03 Approaches</span>
          </div>

          <div className="studio-approach-list">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className={`studio-approach-${i + 1} grid grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_1fr_1fr] gap-x-8 gap-y-2 py-8 border-b border-gray-200 group`}
              >
                <span className="text-gray-400 text-xs font-mono pt-[0.2em]">{s.num}</span>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide group-hover:text-gray-500 transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed col-start-2 md:col-start-3 mt-1 md:mt-0">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA — dark ── */}
      <section className="bg-[#1a1a1a] py-20 border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10">

            <div>
              <h2
                className="text-white font-bold leading-tight"
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
                }}
              >
                Build with us.
              </h2>
            </div>

            <a
              href="/contact"
              className="group flex items-center gap-3 border border-[#3a3a3a] text-[#a0a0a0] px-8 py-4 text-xs tracking-[0.2em] uppercase hover:border-[#c0c0c0] hover:text-white transition-colors duration-300 flex-shrink-0"
            >
              Get in touch
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
