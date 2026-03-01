'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import type { CSSProperties } from 'react'

/* Inline animation helper — references @keyframes consulting-up-in in globals.css */
const enter = (delay: string, duration = '0.75s'): CSSProperties => ({
  animation: `consulting-up-in ${duration} cubic-bezier(0.22,1,0.36,1) both`,
  animationDelay: delay,
})

/* ── Talent identity mark — three concentric diamonds: sharp, kinetic ── */
const TalentMark = () => (
  <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="4" y="4" width="20" height="20" transform="rotate(45 14 14)" />
    <rect x="7.5" y="7.5" width="13" height="13" transform="rotate(45 14 14)" />
    <rect x="11" y="11" width="6" height="6" transform="rotate(45 14 14)" />
  </svg>
)


const CreatorPhotoPlaceholder = () => (
  <svg
    viewBox="0 0 120 160"
    width="100%"
    style={{ maxHeight: '110px', display: 'block' }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Frame */}
    <rect x="0.5" y="0.5" width="119" height="159" stroke="#2e2e2e" strokeWidth="1" />
    {/* Corner ticks */}
    <line x1="0" y1="8" x2="0" y2="0" stroke="#3a3a3a" strokeWidth="1" />
    <line x1="0" y1="0" x2="8" y2="0" stroke="#3a3a3a" strokeWidth="1" />
    <line x1="112" y1="0" x2="120" y2="0" stroke="#3a3a3a" strokeWidth="1" />
    <line x1="120" y1="0" x2="120" y2="8" stroke="#3a3a3a" strokeWidth="1" />
    <line x1="120" y1="152" x2="120" y2="160" stroke="#3a3a3a" strokeWidth="1" />
    <line x1="120" y1="160" x2="112" y2="160" stroke="#3a3a3a" strokeWidth="1" />
    <line x1="8" y1="160" x2="0" y2="160" stroke="#3a3a3a" strokeWidth="1" />
    <line x1="0" y1="160" x2="0" y2="152" stroke="#3a3a3a" strokeWidth="1" />
    {/* Head */}
    <circle cx="60" cy="58" r="18" stroke="#2e2e2e" strokeWidth="1" />
    {/* Shoulders / body arc */}
    <path d="M 8 148 Q 8 104 60 104 Q 112 104 112 148" stroke="#2e2e2e" strokeWidth="1" />
  </svg>
)

const creators = [
  {
    num: '01',
    handle: '@CarriePatsalis',
    category: 'Travel & Adventure',
    platform: 'YouTube',
    url: 'https://www.youtube.com/@carriepatsalis',
  },
  {
    num: '02',
    handle: '@TimeDrops',
    category: 'Horology & Lifestyle',
    platform: 'YouTube',
    url: 'https://www.youtube.com/@TimeDrops_',
  },
  {
    num: '03',
    handle: '@Thibodyo',
    category: 'VFX & Creative',
    platform: 'Instagram',
    url: 'https://www.instagram.com/thibodyo/',
  },
  {
    num: '04',
    handle: '@Sam_Kojo',
    category: 'Gymnast & Coach',
    platform: 'Instagram',
    url: 'https://instagram.com/sam_kojo',
  },
  {
    num: '05',
    handle: '@LuciaVerde',
    category: 'Fashion & Style',
    platform: 'TikTok',
    url: '#',
  },
  {
    num: '06',
    handle: '@MilesReach',
    category: 'Fitness & Wellness',
    platform: 'YouTube',
    url: '#',
  },
  {
    num: '07',
    handle: '@NovaTells',
    category: 'Comedy & Storytelling',
    platform: 'TikTok',
    url: '#',
  },
  {
    num: '08',
    handle: '@EzraFrames',
    category: 'Photography & Film',
    platform: 'Instagram',
    url: '#',
  },
]

const services = [
  {
    num: '01',
    title: 'Representation',
    desc: 'Brand partnership negotiation, licensing deals, and collaboration management — handled with creator interests first.',
  },
  {
    num: '02',
    title: 'Business Development & Strategy',
    desc: 'Dedicated strategy hours, revenue diversification, and long-term career roadmapping to build businesses that last.',
  },
  {
    num: '03',
    title: 'Content Planning & Creative Development',
    desc: 'Structured planning and creative development support to keep output consistent, fresh, and audience-first.',
  },
  {
    num: '04',
    title: 'Brand Access',
    desc: 'Direct access to brands and campaigns running through the Bad Brain network — opportunities your audience actually cares about.',
  },
]

export default function TalentPage() {
  return (
    <main>
      <Navigation />

      {/* ── Hero — CSS grid, thin border lines, full-viewport ── */}
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
        {/* ── Row 1: Identity label — splits at video/copy boundary ── */}
        <div
          className="grid border-b border-[#333] grid-cols-1 lg:grid-cols-[38%_1fr]"
          style={enter('0.08s', '0.6s')}
        >
          <div className="flex items-center gap-3 px-8 lg:px-10 py-4 lg:border-r border-[#333] text-[#555]">
            <TalentMark />
            <span className="text-[0.6rem] tracking-[0.35em] uppercase">Bad Brain Talent</span>
          </div>
          <div className="hidden lg:flex items-center justify-end px-10 py-4">
            <span className="text-[#292929] text-[0.55rem] tracking-[0.3em] uppercase">
              Talent Management
            </span>
          </div>
        </div>

        {/* ── Row 2: Video panel + copy column ── */}
        <div
          className="grid min-h-0 overflow-hidden grid-cols-1 lg:grid-cols-[38%_1fr]"
        >
          {/* Left — full-height video panel */}
          <div
            className="hidden lg:block relative overflow-hidden border-r border-[#333]"
            style={enter('0.18s', '0.9s')}
          >
            <video
              src="/videos/ee1173e5-69c8-4dd1-b1e4-ee9b5bbd0b0a.mp4"
              autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: '#1a1a1a', opacity: 0.4 }} />
          </div>

          {/* Right — copy column, split into headline + body */}
          <div className="flex flex-col min-h-0">

            {/* Upper cell: headline, anchored to bottom */}
            <div className="flex-1 flex flex-col justify-end px-10 lg:px-16 pt-10 pb-10">
              <h1
                className="font-black uppercase text-white tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 5.2vw, 5rem)', lineHeight: 0.88 }}
              >
                <span className="block" style={enter('0.32s')}>Create</span>
                <span className="block" style={enter('0.42s')}>Your Own</span>
                <span className="block" style={enter('0.52s')}>Terms.</span>
              </h1>
            </div>

            {/* Divider — horizontal line across the copy column */}
            <div className="border-t border-[#333]" style={enter('0.55s', '0.5s')} />

            {/* Lower cell: copy + CTA */}
            <div
              className="px-10 lg:px-16 py-8"
              style={{ paddingBottom: 'clamp(5rem, 17vw, 13rem)', ...enter('0.65s') }}
            >
              <p className="text-[#737373] text-sm leading-relaxed mb-6" style={{ maxWidth: '30rem' }}>
                Bad Brain Talent supports, develops and represents{' '}
                <strong className="text-[#a0a0a0] font-semibold">
                  up-and-coming original content creators
                </strong>
                . We handle the brand deals, the admin, and the business development — so you can put
                your time and energy into{' '}
                <strong className="text-[#a0a0a0] font-semibold">
                  your content and your audience.
                </strong>
              </p>
              <a
                href="#roster"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#roster')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 text-[#909090] text-xs tracking-[0.2em] uppercase hover:text-white transition-colors group w-fit cursor-pointer"
              >
                <span className="border-b border-[#333] pb-0.5 group-hover:border-[#909090] transition-colors">
                  Meet the roster
                </span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>

          </div>
        </div>

        {/* TALENT bleed text — crops at section bottom, shared services theme */}
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
              paddingLeft: '2rem',
            }}
          >
            TALENT
          </p>
        </div>
      </section>

      {/* ── Problem section — white, typographic two-col ── */}
      <section className="bg-white py-24 overflow-clip">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Pull quote */}
            <div className="talent-pull-quote">
              <p
                className="font-black tracking-tight text-[#1a1a1a] uppercase"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)', lineHeight: 0.88 }}
              >
                The demand never slows.
              </p>
              <div className="mt-8 h-px w-12 bg-gray-300" />
            </div>

            {/* Body copy */}
            <div className="talent-problem-copy space-y-5 text-gray-600 text-base leading-relaxed pt-2">
              <p>
                <strong className="text-gray-900 font-semibold">Audiences expect more</strong> — more
                formats, more frequency, more from the people they follow. Keeping up with content leaves
                little room for managing brand deals, career development, and long-term growth.
              </p>
              <p>
                The need for representation is clear. But too often,{' '}
                <strong className="text-gray-900 font-semibold">
                  traditional management means losing control
                </strong>
                : forced deals, overexposure, and strategies built to serve the agency — not the creator.
              </p>
              <p>
                Our{' '}
                <strong className="text-gray-900 font-semibold">tiered model gives creators control</strong>
                , with support that flexes to fit their needs — from inbox management to full-scale
                representation. We handle the business. You focus on the work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Creator roster — dark, 4 vertical column panels ── */}
      <section id="roster" className="bg-[#1a1a1a] pt-24 pb-0 talent-roster-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="talent-roster-header flex items-baseline justify-between mb-12 pb-6 border-b border-[#333]">
            <span className="text-[0.65rem] tracking-[0.35em] uppercase text-[#737373]">Our Creators</span>
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#555]">08 Represented</span>
          </div>
        </div>

        {/* Full-width column grid — bleeds to edges */}
        <div className="talent-roster-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#333]">
          {creators.map((creator, i) => (
            <a
              key={creator.handle}
              href={creator.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`talent-roster-${i + 1} group flex flex-col px-8 py-10 border-b border-r border-[#333] hover:bg-[#111] transition-colors duration-300 cursor-pointer`}
              style={{ minHeight: '300px', textDecoration: 'none' }}
            >
              {/* Number — top */}
              <span className="text-[#555] text-xs font-mono">{creator.num}</span>

              {/* Photo placeholder */}
              <div className="mt-6 mb-2">
                <CreatorPhotoPlaceholder />
              </div>

              {/* Handle — middle, large */}
              <h3
                className="font-bold text-[#909090] group-hover:text-white transition-colors duration-400 leading-tight mt-auto mb-6"
                style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.25rem)' }}
              >
                {creator.handle}
              </h3>

              {/* Category + platform + arrow — bottom */}
              <div className="space-y-3">
                <span className="block text-[#555] text-[0.5rem] tracking-[0.22em] uppercase group-hover:text-[#909090] transition-colors duration-300">
                  {creator.category}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-[#555] text-[0.5rem] tracking-[0.25em] uppercase border border-[#444] px-2 py-0.5 group-hover:border-[#777] group-hover:text-[#777] transition-colors duration-300">
                    {creator.platform}
                  </span>
                  <span className="text-[#555] text-sm group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300">
                    →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Services — light, numbered rows, slides from right ── */}
      <section className="bg-[#f5f5f5] py-24 talent-services-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="talent-services-header flex items-baseline justify-between mb-12 pb-6 border-b border-gray-300">
            <span className="text-[0.65rem] tracking-[0.35em] uppercase text-gray-500">What We Offer</span>
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-gray-400">04 Services</span>
          </div>

          <div className="talent-services-list">
            {services.map((s, i) => (
              <div
                key={s.num}
                className={`talent-service-${i + 1} grid grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_1fr_1fr] gap-x-8 gap-y-2 py-8 border-b border-gray-200 group`}
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
                Work with us.
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
