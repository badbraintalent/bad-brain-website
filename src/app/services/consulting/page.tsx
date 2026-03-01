'use client'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import type { CSSProperties } from 'react'

/* Inline animation helper — references the @keyframes consulting-up-in already
   compiled into globals.css. New CSS classes aren't hot-reloaded by Turbopack
   when written by external tools, but inline styles that reference existing
   keyframes work immediately. */
const enter = (delay: string, duration = '0.75s'): CSSProperties => ({
  animation: `consulting-up-in ${duration} cubic-bezier(0.22,1,0.36,1) both`,
  animationDelay: delay,
})

/* ── Service identity mark — nested squares: focus, precision, depth ── */
const ConsultingMark = () => (
  <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="2" y="2" width="24" height="24" />
    <rect x="7" y="7" width="14" height="14" />
    <rect x="11" y="11" width="6" height="6" />
  </svg>
)

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


export default function ConsultingPage() {
  return (
    <main>
      <Navigation />

      {/* ── Hero — CSS grid, three columns: card | card | copy ── */}
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
        {/* ── Row 1: Identity label — aligned to three-column grid ── */}
        <div
          className="grid border-b border-[#333] grid-cols-1 lg:grid-cols-[23%_23%_1fr]"
          style={enter('0.08s', '0.6s')}
        >
          <div className="flex items-center gap-3 px-8 lg:px-10 py-4 lg:border-r border-[#333] text-[#555]">
            <ConsultingMark />
            <span className="text-[0.6rem] tracking-[0.35em] uppercase">Bad Brain Consulting</span>
          </div>
          <div className="hidden lg:block border-r border-[#333]" />
          <div className="hidden lg:flex items-center justify-end px-10 py-4">
            <span className="text-[#292929] text-[0.55rem] tracking-[0.3em] uppercase">Brand Consulting</span>
          </div>
        </div>

        {/* ── Row 2: Card columns + copy column ── */}
        <div
          className="grid min-h-0 overflow-hidden grid-cols-1 lg:grid-cols-[23%_23%_1fr]"
        >
          {/* Col 1 — Phone/profile card, fills column */}
          <div
            className="hidden lg:flex flex-col border-r border-[#333] overflow-hidden"
            style={enter('0.18s', '0.8s')}
          >
            <div className="flex items-center gap-2 p-3 border-b border-[#2a2a2a] flex-shrink-0">
              <div
                className="flex items-center justify-center border border-[#3a3a3a] text-[#555] text-xs flex-shrink-0"
                style={{ width: '22px', height: '22px' }}
              >
                →
              </div>
              <div className="flex-1 h-px bg-[#252525]" />
            </div>
            <div className="flex-1 flex items-center justify-center" style={{ background: '#0e0e0e' }}>
              <svg viewBox="0 0 80 130" width="72" height="117" fill="none" stroke="#363636" strokeWidth="1.2" strokeLinecap="round">
                <circle cx="40" cy="26" r="17" />
                <path d="M 2 130 C 2 83 17 69 40 65 C 63 69 78 83 78 130" />
              </svg>
            </div>
            <div className="flex items-center justify-between p-3 flex-shrink-0">
              <span className="text-[#3a3a3a] text-[0.5rem] tracking-[0.2em] uppercase">@brand_client</span>
              <div className="flex gap-1.5">
                <div className="rounded-full border border-[#2a2a2a]" style={{ width: '13px', height: '13px' }} />
                <div className="rounded-full border border-[#2a2a2a]" style={{ width: '13px', height: '13px' }} />
              </div>
            </div>
          </div>

          {/* Col 2 — Image card, offset down within column */}
          <div
            className="hidden lg:flex flex-col border-r border-[#333] overflow-hidden px-5 pt-0"
            style={enter('0.28s', '0.8s')}
          >
            <div
              className="flex items-center justify-center border border-[#2a2a2a]"
              style={{ marginTop: '18%', background: '#111', aspectRatio: '3/4' }}
            >
              <svg viewBox="0 0 80 130" width="80" height="130" fill="none" stroke="#363636" strokeWidth="1.2" strokeLinecap="round">
                <circle cx="40" cy="28" r="20" />
                <path d="M 0 130 C 0 82 18 67 40 63 C 62 67 80 82 80 130" />
              </svg>
            </div>
          </div>

          {/* Col 3 — Copy column */}
          <div className="flex flex-col min-h-0">
            {/* Upper: headline anchored to bottom */}
            <div className="flex-1 flex flex-col justify-end px-10 lg:px-16 pt-10 pb-10">
              <h1
                className="font-black uppercase text-white tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 5.2vw, 5rem)', lineHeight: 0.88 }}
              >
                <span className="block" style={enter('0.38s')}>See the</span>
                <span className="block" style={enter('0.48s')}>Bigger</span>
                <span className="block" style={enter('0.58s')}>Picture.</span>
              </h1>
            </div>

            {/* Divider */}
            <div className="border-t border-[#333]" style={enter('0.60s', '0.5s')} />

            {/* Lower: copy + CTA */}
            <div
              className="px-10 lg:px-16 py-8"
              style={{ paddingBottom: 'clamp(5rem, 17vw, 13rem)', ...enter('0.70s') }}
            >
              <p className="text-[#737373] text-sm leading-relaxed mb-6" style={{ maxWidth: '30rem' }}>
                Creator marketing spans all departments, leverages a range of payment models,
                and delivers a wide variety of outcomes.{' '}
                <strong className="text-[#a0a0a0] font-semibold">
                  Making sense of it is hard enough; running it efficiently is even harder.
                </strong>
                {' '}We help brands step back and build a programme that actually scales.
              </p>
              <a
                href="#services"
                onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="inline-flex items-center gap-2 text-[#909090] text-xs tracking-[0.2em] uppercase hover:text-white transition-colors group w-fit cursor-pointer"
              >
                <span className="border-b border-[#333] pb-0.5 group-hover:border-[#909090] transition-colors">
                  See how we work
                </span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bleed text — CONSULTING, partially cropped at section bottom */}
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
            CONSULTING
          </p>
        </div>

      </section>

      {/* ── Problem section — editorial, typographic ── */}
      <section className="bg-white py-24 overflow-clip">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Pull quote — display size, left column */}
            <div className="consulting-pull-quote">
              <p
                className="font-black tracking-tight text-[#1a1a1a] uppercase"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)', lineHeight: 0.88 }}
              >
                Creator marketing isn&apos;t just one thing
              </p>
              <div className="mt-8 h-px w-12 bg-gray-300" />
            </div>

            {/* Body copy — right column */}
            <div className="consulting-problem-copy space-y-5 text-gray-600 text-base leading-relaxed pt-2">
              <p>
                It&apos;s a mix of activity that spans all departments, leverages a range of payment models, and
                delivers a wide variety of outcomes.{' '}
                <strong className="text-gray-900 font-semibold">
                  Making sense of it is hard enough; running it efficiently is even harder.
                </strong>
              </p>
              <p>
                For <strong className="text-gray-900 font-semibold">start-ups and smaller businesses</strong>, the
                challenge is knowing where to begin: how to build and scale a programme from scratch with limited
                resources.
              </p>
              <p>
                For <strong className="text-gray-900 font-semibold">established brands</strong>, the challenge is
                scale: multiple teams, agencies, and budgets all chasing creators without a unified approach. The
                result? Fragmentation, duplication, and missed opportunities.
              </p>
              <p className="text-gray-900 font-medium pt-2">
                Bad Brain Consulting helps brands, agencies, and networks step back and see the bigger picture.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Services manifest — numbered rows ── */}
      <section id="services" className="bg-[#f5f5f5] py-24 consulting-services-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Section header */}
          <div className="consulting-services-header flex items-baseline justify-between mb-12 pb-6 border-b border-gray-300">
            <span className="text-[0.65rem] tracking-[0.35em] uppercase text-gray-500">What We Do</span>
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-gray-400">06 Services</span>
          </div>

          {/* Service rows */}
          <div className="consulting-services-list">
            {services.map((s, i) => (
              <div
                key={s.num}
                className={`consulting-service-${i + 1} grid grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_1fr_1fr] gap-x-8 gap-y-2 py-8 border-b border-gray-200 group`}
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
                Let&apos;s talk.
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
