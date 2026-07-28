'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ContactCTA from '@/components/sections/ContactCTA'
import CopyEmail from '@/components/ui/CopyEmail'
import WindowTitleBar from '@/components/ui/WindowTitleBar'
import { useEffect, useRef, useState } from 'react'
import { enter } from '@/lib/y2k'
import { CONTACT_EMAIL } from '@/lib/site'

export default function ContactPage() {
  const [minimized, setMinimized] = useState<number | null>(null)
  // One restore timer at a time — minimising a second card cancels the first
  // card's pending restore so it can't cut the new animation short.
  const restoreTimerRef = useRef<number | null>(null)

  const minimize = (i: number) => {
    if (restoreTimerRef.current !== null) window.clearTimeout(restoreTimerRef.current)
    setMinimized(i)
    restoreTimerRef.current = window.setTimeout(() => {
      setMinimized(null)
      restoreTimerRef.current = null
    }, 1300)
  }

  useEffect(() => {
    return () => {
      if (restoreTimerRef.current !== null) window.clearTimeout(restoreTimerRef.current)
    }
  }, [])

  return (
    <main>
      <Navigation />

      {/* ── Hero — CSS grid, two columns: copy | offices ── */}
      <section
        className="bg-white text-black relative border-b border-black/10"
        style={{
          height: 'calc(100svh - 65px)',
          minHeight: '700px',
          // Cap the canvas on big/tall screens — otherwise the bottom-anchored
          // headline leaves a huge dead column and the field balloons.
          maxHeight: '62.5rem',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateRows: '1fr',
        }}
      >
        {/* ── Two-column content (fills the hero, width-capped on big screens) ── */}
        <div
          className="grid min-h-0 grid-cols-1 lg:grid-cols-[38%_1fr] w-full max-w-[100rem] mx-auto border-x border-black/10"
        >
          {/* Left — headline + direct email */}
          <div className="flex flex-col lg:border-r border-black/15 min-h-0">
            <div className="relative flex-1 flex flex-col justify-end px-8 lg:px-10 pt-10 pb-10">
              {/* Mobile-only halftone — fills the space the hidden offices column leaves */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/halftones/bb_16x9_blue.png"
                alt=""
                aria-hidden="true"
                className="lg:hidden absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              />
              <div className="relative flex flex-col gap-8">
                {/* Mobile-only BB mark above the headline — desktop carries it on
                    the contact.exe panel instead (this column is too narrow) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/brand/logo/BB_Logo.svg"
                  alt="Bad Brain"
                  className="lg:hidden w-[10.8rem] h-auto"
                  style={enter('0.5s')}
                />
                <h1
                  className="uppercase text-black"
                  // 5.5rem cap = where 5.5vw lands at the container's 100rem
                  // width cap; any larger and TOUCH. overflows the 38% column.
                  style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)', lineHeight: 0.88 }}
                >
                  <span className="block" style={enter('0.25s')}>Get</span>
                  <span className="block" style={enter('0.35s')}>In</span>
                  <span className="block" style={enter('0.45s')}>Touch.</span>
                </h1>
              </div>
            </div>

            <div className="border-t border-black/15" style={enter('0.52s', '0.5s')} />

            <div
              className="px-8 lg:px-10 py-8"
              style={{ paddingBottom: 'clamp(4rem, 15vw, 11rem)', ...enter('0.62s') }}
            >
              <p className="text-black/60 text-sm leading-relaxed mb-6" style={{ maxWidth: '26rem' }}>
                Whether you&apos;re a brand looking to optimise your creator strategy, need integrated content production, or you&apos;re a creator seeking representation — we&apos;d love to hear from you.
              </p>
              {/* Primary action — mint sticker button so the eye lands here
                  after the headline (was a small grey text link) */}
              <CopyEmail className="group btn-phys inline-flex items-center gap-2 border border-black bg-bb-mint hover:bg-bb-blue px-6 py-3 text-black text-xs tracking-[0.2em] uppercase w-fit">
                {CONTACT_EMAIL}
                <span className="arrow-hop inline-block">→</span>
              </CopyEmail>
            </div>
          </div>

          {/* Right — contact.exe device panel: BB halftone field + mark + offices */}
          <div className="hidden lg:flex flex-col min-h-0" style={enter('0.38s', '0.85s')}>
            {/* Shared OS-window chrome — same grammar as the service hero devices */}
            <WindowTitleBar name="contact.exe" className="border-b border-black/15 px-3 py-2" />
            <div className="relative flex-1 min-h-0 flex flex-col">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/halftones/bb_16x9_blue.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              {/* Master brand mark — the parent brand's take on the service heroes' slot */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/logo/BB_Logo.svg"
                alt="Bad Brain"
                className="absolute top-8 right-10 lg:right-16 w-[10.8rem] lg:w-[16.8rem] h-auto"
                style={enter('0.5s')}
              />
              <div className="relative flex-1 flex flex-col justify-end px-10 lg:px-16 pt-10 pb-10">
                <div className="space-y-10">
                  <div className="bg-white/85 border border-black/10 w-fit">
                    <div className="p-5">
                      <span className="text-black/40 text-[0.5rem] tracking-[0.35em] uppercase block mb-3">London</span>
                      <p className="text-black/70 text-sm leading-relaxed">
                        Bad Brain Media<br />
                        United Kingdom
                      </p>
                    </div>
                    <div className="h-1 bg-bb-blue" aria-hidden="true" />
                  </div>
                </div>
              </div>

              <div className="relative border-t border-black/15 bg-white/85" />

              <div
                className="relative px-10 lg:px-16 py-8"
                style={{ paddingBottom: 'clamp(8rem, 15vw, 11rem)', ...enter('0.72s') }}
              >
                <p className="text-black/50 text-xs tracking-wide bg-white/85 border border-black/10 p-3 w-fit">
                  We typically respond within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── Who's this for? — three-column wayfinder ── */}
      <div className="border-b border-black/10">
        <div className="grid md:grid-cols-3 max-w-[100rem] mx-auto border-x border-black/10">
          {[
            {
              label: 'Blueprint',
              question: 'Are you a brand?',
              desc: 'Need help with creator strategy and optimisation?',
              href: '/services/blueprint',
              accent: 'border-t-bb-mint',
            },
            {
              label: 'Studio',
              question: 'Are you producing?',
              desc: 'Looking for integrated content production?',
              href: '/services/studio',
              accent: 'border-t-bb-blue',
            },
            {
              label: 'Connect',
              question: 'Are you a creator?',
              desc: 'Seeking representation and development?',
              href: '/services/connect',
              accent: 'border-t-bb-grey',
            },
          ].map((item, i) => (
            /* The card is a div with a stretched link on the heading (not one
               big <a>) so the title bar's minimise <button> isn't nested
               inside an anchor — invalid HTML and a confusing tab stop. */
            <div
              key={item.label}
              className={`group relative flex flex-col gap-3 px-8 lg:px-10 py-8 border-r border-black/10 last:border-r-0 border-t-[3px] ${item.accent} hover:bg-bb-mint/30 transition-colors duration-200 ${
                minimized === i ? 'win-minimized' : ''
              }`}
            >
              {/* OS-window title bar — close button "minimises" the card, then it
                  returns. z-10 keeps it clickable above the stretched link. */}
              <WindowTitleBar
                name={`${item.label.toLowerCase()}.exe`}
                closeLabel={`Minimise ${item.label} card (it comes back)`}
                onClose={() => minimize(i)}
                className="relative z-10 border-b border-black/15 pb-2 mb-1"
              />
              <div className="win-content flex flex-col gap-3 flex-1">
                <h3
                  className="uppercase text-black leading-tight"
                  style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)' }}
                >
                  <a href={item.href} className="after:absolute after:inset-0">
                    {item.question}
                  </a>
                </h3>
                <p className="text-sm text-black/50 leading-relaxed flex-1">{item.desc}</p>
                <span className="inline-flex items-center gap-2 text-[0.6rem] tracking-[0.25em] uppercase text-black/40 group-hover:text-bb-blue transition-colors duration-200 mt-1">
                  Learn more
                  <span className="arrow-hop inline-block">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Form — reuses the ContactCTA component from homepage ── */}
      <ContactCTA />

      <Footer />
    </main>
  )
}
