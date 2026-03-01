'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { useRef } from 'react'
import type { CSSProperties } from 'react'

const enter = (delay: string, duration = '0.75s'): CSSProperties => ({
  animation: `consulting-up-in ${duration} cubic-bezier(0.22,1,0.36,1) both`,
  animationDelay: delay,
})

/* ── Resonate identity mark — three horizontal rules: waveform, sound, rhythm ── */
const ResonateMark = () => (
  <svg width="22" height="16" viewBox="0 0 28 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <line x1="1" y1="3" x2="27" y2="3" />
    <line x1="4" y1="10" x2="24" y2="10" />
    <line x1="8" y1="17" x2="20" y2="17" />
  </svg>
)

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

const videoSrcs = [
  '/videos/ee1173e5-69c8-4dd1-b1e4-ee9b5bbd0b0a.mp4',
  '/videos/1c23b88f-b7be-4ccc-a43b-3b7a0b6cf8b3.mp4',
  '/videos/643f326f-6cc3-4911-84db-07e530191a93.mp4',
]

export default function ResonatePage() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  return (
    <main>
      <Navigation />

      {/* ── Hero — full typographic: oversized headline, no panels ── */}
      <section
        className="bg-[#1a1a1a] text-white relative"
        style={{
          height: 'calc(100svh - 65px)',
          minHeight: '700px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Identity label — full-width, not split */}
        <div
          className="flex items-center justify-between border-b border-[#333] px-8 lg:px-12 py-4 text-[#555] flex-shrink-0"
          style={enter('0.08s', '0.6s')}
        >
          <div className="flex items-center gap-3">
            <ResonateMark />
            <span className="text-[0.6rem] tracking-[0.35em] uppercase">Bad Brain Resonate</span>
          </div>
          <span className="hidden lg:block text-[#292929] text-[0.55rem] tracking-[0.3em] uppercase">
            Music &amp; Artist Strategy
          </span>
        </div>

        {/* Main content — flex-1, headline fills, copy bottom-right */}
        <div
          className="flex-1 flex flex-col min-h-0 max-w-7xl mx-auto w-full px-8 lg:px-12"
          style={{ paddingBottom: 'clamp(10rem, 17vw, 13rem)' }}
        >
          {/* Headline — anchored to bottom of upper flex space */}
          <div className="flex-1 flex flex-col justify-end pb-10">
            <h1
              className="font-black uppercase text-white tracking-tight"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 8.5rem)', lineHeight: 0.88 }}
            >
              <span className="block" style={enter('0.28s')}>Rewrite</span>
              <span className="block" style={enter('0.38s')}>the</span>
              <span className="block" style={enter('0.48s')}>Rules.</span>
            </h1>
          </div>

          {/* Bottom row: rule + copy (right-aligned on large) */}
          <div className="border-t border-[#333]" style={enter('0.52s', '0.5s')} />
          <div
            className="pt-8 flex flex-col lg:flex-row lg:items-start lg:justify-end gap-6"
            style={enter('0.62s')}
          >
            <div style={{ maxWidth: '28rem' }}>
              <p className="text-[#737373] text-sm leading-relaxed mb-6">
                Social media has{' '}
                <strong className="text-[#a0a0a0] font-semibold">rewritten the rules of music discovery</strong>{' '}
                — turning content into the primary way artists are found and followed. The opportunity is
                huge, but only for artists with a strategy that actually works.
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
                  Our approach
                </span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* RESONATE bleed text */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none select-none"
          style={{ animation: 'consulting-up-in 1.2s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '0.5s' }}
        >
          <p
            className="font-black uppercase whitespace-nowrap"
            style={{
              fontSize: 'clamp(4rem, 14vw, 14rem)',
              letterSpacing: '-0.03em',
              lineHeight: 0.82,
              color: '#222222',
              transform: 'translateY(22%)',
              paddingLeft: '2rem',
            }}
          >
            RESONATE
          </p>
        </div>
      </section>

      {/* ── What We Do — staggered typographic split ── */}
      <section className="bg-white overflow-clip">

        {/* "PERSONALITY" — large, left-aligned, bleeds to the right edge */}
        <div className="pt-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="resonate-pull-quote overflow-hidden">
              <p
                className="font-black uppercase text-[#1a1a1a] whitespace-nowrap"
                style={{ fontSize: 'clamp(4.5rem, 13vw, 13rem)', lineHeight: 0.88, letterSpacing: '-0.03em' }}
              >
                Personality
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-5" />

        {/* "into presence." — right-aligned, smaller weight */}
        <div className="px-6 lg:px-8 py-8 text-right">
          <p
            className="font-black uppercase text-[#1a1a1a] tracking-tight inline-block"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4.5rem)', lineHeight: 0.88, letterSpacing: '-0.02em' }}
          >
            into presence.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Body copy — two columns */}
        <div className="px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="resonate-problem-copy grid lg:grid-cols-2 gap-8 lg:gap-20 text-gray-600 text-base leading-relaxed">
              <div className="space-y-5">
                <p>
                  Led by{' '}
                  <strong className="text-gray-900 font-semibold">experts with real industry experience</strong>,
                  Bad Brain Resonate delivers social strategy for artists and labels alike — turning
                  your personality into presence.
                </p>
                <p>
                  We use proven,{' '}
                  <strong className="text-gray-900 font-semibold">entertainment-first content strategies</strong>{' '}
                  to build real fans and nurture lasting communities on platforms like TikTok.
                </p>
              </div>
              <div>
                <p>
                  By tapping into{' '}
                  <strong className="text-gray-900 font-semibold">Bad Brain&apos;s wider ecosystem</strong>{' '}
                  — creators we represent and brand-side relationships — we extend your music beyond your
                  own channels and into culture.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── Approach — dark, three-column process grid ── */}
      <section id="approach" className="bg-[#111] border-t border-[#222]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Header row: label left, heading right */}
          <div className="resonate-approach-header flex items-baseline justify-between py-6 border-b border-[#2a2a2a]">
            <span className="text-[0.65rem] tracking-[0.35em] uppercase text-[#737373]">Approach</span>
            <p
              className="font-black uppercase tracking-tight text-white"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 2rem)', letterSpacing: '-0.02em' }}
            >
              Inside&#8209;out. Outside&#8209;in.
            </p>
          </div>

          {/* Three-column process pillars */}
          <div className="resonate-approach-left grid lg:grid-cols-3">

            <div className="resonate-approach-copy py-12 lg:pr-10 border-b lg:border-b-0 lg:border-r border-[#2a2a2a]">
              <span className="text-[0.55rem] tracking-[0.3em] uppercase text-[#444] font-mono block mb-6">
                01 / Channel
              </span>
              <p className="text-[#737373] text-base leading-relaxed">
                We help artists build strong, authentic content on their own channels, while using
                strategic insight and partnerships to drive meaningful use of your songs in the
                TikTok library among audiences aligned to your style.
              </p>
            </div>

            <div className="resonate-approach-copy py-12 lg:px-10 border-b lg:border-b-0 lg:border-r border-[#2a2a2a]">
              <span className="text-[0.55rem] tracking-[0.3em] uppercase text-[#444] font-mono block mb-6">
                02 / Strategy
              </span>
              <p className="text-[#737373] text-base leading-relaxed">
                Our work spans everything from{' '}
                <strong className="text-[#a0a0a0] font-semibold">focused consultancy and creative direction</strong>{' '}
                to full, ongoing social strategy — sharpening content, defining repeatable formats,
                and building momentum through planned releases, partnerships, and platform-native storytelling.
              </p>
            </div>

            <div className="resonate-approach-copy py-12 lg:pl-10">
              <span className="text-[0.55rem] tracking-[0.3em] uppercase text-[#444] font-mono block mb-6">
                03 / Results
              </span>
              <p className="text-[#737373] text-base leading-relaxed">
                The result:{' '}
                <strong className="text-[#a0a0a0] font-semibold">sustainable growth</strong>,
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
          <div className="resonate-experience-header flex items-baseline justify-between py-6 border-b border-gray-200">
            <span className="text-[0.65rem] tracking-[0.35em] uppercase text-gray-400">Experience</span>
          </div>
        </div>

        {/* Sidebar + photo — full-bleed grid */}
        <div className="resonate-photo grid lg:grid-cols-[280px_1fr]" style={{ minHeight: '520px' }}>

          {/* Left: name + career timeline */}
          <div className="border-r border-gray-200 px-6 lg:px-8 py-10 flex flex-col bg-white">
            <p className="font-black text-[#1a1a1a] tracking-tight mb-0.5"
               style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)' }}>
              Jen Long
            </p>
            <p className="text-[0.6rem] tracking-[0.25em] uppercase text-gray-400 mb-8">
              Resonate Co-Founder
            </p>
            <div className="flex-1">
              {[
                ['BBC Introducing', 'Radio 1 Presenter'],
                ['BBC Three', 'Lead Voice'],
                ['DICE', 'Music Editor'],
                ['The Line of Best Fit', 'Head of Partnerships'],
                ['Take Care Management', 'Founder — 2023'],
              ].map(([org, role]) => (
                <div key={org} className="border-t border-gray-100 py-3">
                  <p className="text-xs font-semibold text-gray-900">{org}</p>
                  <p className="text-[0.65rem] text-gray-400 tracking-wide mt-0.5">{role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: full-height photo */}
          <div className="wireframe-placeholder" style={{ minHeight: '480px' }}>
            <span>[Photo: Jen Long]</span>
          </div>

        </div>

        {/* Bio — two columns below */}
        <div className="resonate-bio max-w-7xl mx-auto px-6 lg:px-8 py-16 border-t border-gray-200">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 text-gray-600 text-base leading-relaxed">
            <div className="space-y-5">
              <p>
                Resonate Co-Founder{' '}
                <strong className="text-gray-900 font-semibold">Jen Long</strong> brings nearly two
                decades of frontline experience across broadcasting, platforms, and artist management.
                She began her career at the BBC, presenting{' '}
                <strong className="text-gray-900 font-semibold">BBC Introducing on Radio 1</strong> and
                serving as the voice of BBC Three — giving her early insight into how artists break and
                how audiences form.
              </p>
              <p>
                Post-BBC, Jen helped launch live music platform{' '}
                <strong className="text-gray-900 font-semibold">DICE as Music Editor</strong> before moving
                into artist management. Since 2017, she has worked closely with artists while simultaneously
                leading partnerships for{' '}
                <strong className="text-gray-900 font-semibold">The Line of Best Fit</strong>.
              </p>
            </div>
            <div className="space-y-5">
              <p>
                In 2023, Jen founded{' '}
                <strong className="text-gray-900 font-semibold">Take Care Management</strong>, where she
                continues to work with a focused roster including{' '}
                <strong className="text-gray-900 font-semibold">jasmine.4.t</strong>, recently named one of
                BBC 6 Music&apos;s Artists of the Year.
              </p>
              <div className="border border-gray-200 p-6">
                <p className="text-gray-600 text-sm">
                  Jen&apos;s work spans a globally respected roster including{' '}
                  <strong className="text-gray-900">The Knife, Fever Ray, Big Red Machine, Austra,
                  Hannah Georgas, Planningtorock</strong>, and more.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── Services — full-width video hover grid ── */}
      <section className="bg-[#f5f5f5] resonate-services-section">

        {/* Header — contained */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-0">
          <div className="resonate-services-header flex items-baseline justify-between pb-6 border-b border-gray-300">
            <span className="text-[0.65rem] tracking-[0.35em] uppercase text-gray-500">Services</span>
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-gray-400">12 Offerings</span>
          </div>
        </div>

        {/* Full-width 4×3 grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-[#d4d4d4]">
          {services.map((service, i) => (
            <div
              key={service}
              className="relative group overflow-hidden border-r border-b border-[#d4d4d4]"
              style={{ height: '220px' }}
              onMouseEnter={() => videoRefs.current[i]?.play()}
            >
              {/* Video — hidden until hover; play() called on hover to handle browser autoplay throttling of off-screen videos */}
              <video
                ref={(el) => { videoRefs.current[i] = el }}
                src={videoSrcs[i % videoSrcs.length]}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
              {/* Dark overlay — contrast for text on hover */}
              <div className="absolute inset-0 bg-[#0a0a0a] opacity-0 group-hover:opacity-55 transition-opacity duration-700" />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-[#ccc] text-[0.45rem] font-mono mb-3 group-hover:text-[#888] transition-colors duration-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm font-medium text-gray-700 group-hover:text-white transition-colors duration-500 leading-snug">
                  {service}
                </p>
              </div>
            </div>
          ))}
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
                Let the music work.
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
