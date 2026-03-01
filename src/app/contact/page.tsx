'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ContactCTA from '@/components/sections/ContactCTA'
import type { CSSProperties } from 'react'

/* Inline animation helper — references @keyframes consulting-up-in from globals.css */
const enter = (delay: string, duration = '0.75s'): CSSProperties => ({
  animation: `consulting-up-in ${duration} cubic-bezier(0.22,1,0.36,1) both`,
  animationDelay: delay,
})

/* Contact identity mark — three parallel diagonal slashes: signal, transmission, outreach */
const ContactMark = () => (
  <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <line x1="5" y1="22" x2="14" y2="5" />
    <line x1="11" y1="22" x2="20" y2="5" />
    <line x1="17" y1="22" x2="26" y2="5" />
  </svg>
)

export default function ContactPage() {
  return (
    <main>
      <Navigation />

      {/* ── Hero — CSS grid, two columns: copy | offices ── */}
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
        {/* ── Row 1: Identity label ── */}
        <div
          className="grid border-b border-[#333] grid-cols-1 lg:grid-cols-[38%_1fr]"
          style={enter('0.08s', '0.6s')}
        >
          <div className="flex items-center gap-3 px-8 lg:px-10 py-4 lg:border-r border-[#333] text-[#555]">
            <ContactMark />
            <span className="text-[0.6rem] tracking-[0.35em] uppercase">Bad Brain</span>
          </div>
          <div className="hidden lg:flex items-center justify-end px-10 py-4">
            <span className="text-[#292929] text-[0.55rem] tracking-[0.3em] uppercase">Get In Touch</span>
          </div>
        </div>

        {/* ── Row 2: Two-column content ── */}
        <div
          className="grid min-h-0 grid-cols-1 lg:grid-cols-[38%_1fr]"
        >
          {/* Left — headline + direct email */}
          <div className="flex flex-col lg:border-r border-[#333] min-h-0">
            <div className="flex-1 flex flex-col justify-end px-8 lg:px-10 pt-10 pb-10">
              <h1
                className="font-black uppercase text-white tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)', lineHeight: 0.88 }}
              >
                <span className="block" style={enter('0.25s')}>Get</span>
                <span className="block" style={enter('0.35s')}>In</span>
                <span className="block" style={enter('0.45s')}>Touch.</span>
              </h1>
            </div>

            <div className="border-t border-[#333]" style={enter('0.52s', '0.5s')} />

            <div
              className="px-8 lg:px-10 py-8"
              style={{ paddingBottom: 'clamp(4rem, 15vw, 11rem)', ...enter('0.62s') }}
            >
              <p className="text-[#737373] text-sm leading-relaxed mb-6" style={{ maxWidth: '26rem' }}>
                Whether you&apos;re a brand looking to optimise your creator strategy, need integrated content production, or you&apos;re a creator seeking representation — we&apos;d love to hear from you.
              </p>
              <a
                href="mailto:hello@badbrain.media"
                className="inline-flex items-center gap-2 text-[#909090] text-xs tracking-[0.2em] uppercase hover:text-white transition-colors group w-fit"
              >
                <span className="border-b border-[#333] pb-0.5 group-hover:border-[#909090] transition-colors">
                  hello@badbrain.media
                </span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>
          </div>

          {/* Right — offices + response time */}
          <div className="hidden lg:flex flex-col min-h-0" style={enter('0.38s', '0.85s')}>
            <div className="flex-1 flex flex-col justify-end px-10 lg:px-16 pt-10 pb-10">
              <div className="space-y-10">
                <div>
                  <span className="text-[#444] text-[0.5rem] tracking-[0.35em] uppercase block mb-3">London</span>
                  <p className="text-[#555] text-sm leading-relaxed">
                    Bad Brain Media<br />
                    United Kingdom
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#333]" />

            <div
              className="px-10 lg:px-16 py-8"
              style={{ paddingBottom: 'clamp(8rem, 15vw, 11rem)', ...enter('0.72s') }}
            >
              <p className="text-[#444] text-xs tracking-wide">
                We typically respond within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Bleed text — CONTACT, partially cropped at section bottom */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none select-none"
          style={{ animation: 'consulting-up-in 1.2s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '0.5s' }}
        >
          <p
            className="font-black uppercase whitespace-nowrap"
            style={{
              fontSize: 'clamp(5rem, 17vw, 16rem)',
              letterSpacing: '-0.03em',
              lineHeight: 0.82,
              color: '#2a2a2a',
              transform: 'translateY(40%)',
              paddingLeft: '2rem',
            }}
          >
            CONTACT
          </p>
        </div>

      </section>

      {/* ── Who's this for? — three-column wayfinder ── */}
      <div className="border-b border-gray-200">
        <div className="grid md:grid-cols-3">
          {[
            {
              label: 'Consulting',
              question: 'Are you a brand?',
              desc: 'Need help with creator strategy and optimisation?',
              href: '/services/consulting',
            },
            {
              label: 'Studio',
              question: 'Are you producing?',
              desc: 'Looking for integrated content production?',
              href: '/services/studio',
            },
            {
              label: 'Talent',
              question: 'Are you a creator?',
              desc: 'Seeking representation and development?',
              href: '/services/talent',
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group flex flex-col gap-3 px-8 lg:px-10 py-10 border-r border-gray-200 last:border-r-0 hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="text-[0.5rem] tracking-[0.35em] uppercase text-gray-400">{item.label}</span>
              <h3
                className="font-black uppercase text-gray-900 tracking-tight leading-tight"
                style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)' }}
              >
                {item.question}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">{item.desc}</p>
              <span className="inline-flex items-center gap-2 text-[0.6rem] tracking-[0.25em] uppercase text-gray-400 group-hover:text-gray-900 transition-colors duration-200 mt-1">
                Learn more
                <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ── Form — reuses the ContactCTA component from homepage ── */}
      <ContactCTA />

      <Footer />
    </main>
  )
}
