'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ContactCTA from '@/components/sections/ContactCTA'
import WindowTitleBar from '@/components/ui/WindowTitleBar'
import { useEffect, useRef, useState } from 'react'
import { enter } from '@/lib/y2k'

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

      {/* ── Hero — CSS grid, two columns: copy | brand panel ── */}
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
          {/* Left — headline + intro copy */}
          <div className="flex flex-col lg:border-r border-black/15 min-h-0">
            <div className="relative flex-1 flex flex-col justify-end px-6 sm:px-8 lg:px-10 pt-10 pb-10">
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
                  className="uppercase text-black text-display-1 leading-hero"
                >
                  <span className="block" style={enter('0.25s')}>Come</span>
                  <span className="block" style={enter('0.35s')}>and say</span>
                  <span className="block" style={enter('0.45s')}>hello.</span>
                </h1>
              </div>
            </div>

            <div className="border-t border-black/15" style={enter('0.52s', '0.5s')} />

            <div
              className="px-6 sm:px-8 lg:px-10 py-8"
              style={{ paddingBottom: 'clamp(2.5rem, 15vw, 11rem)', ...enter('0.62s') }}
            >
              <p className="text-black/60 text-body-sm max-w-[30rem]">
                Good to have you here. Wherever you&apos;re up to — a rough idea or a firm brief — we&apos;d love to hear about it.
              </p>
            </div>
          </div>

          {/* Right — contact.exe device panel: BB halftone field + mark */}
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
            </div>
          </div>
        </div>

      </section>

      {/* ── Who's this for? — one panel per service, audience-led ── */}
      <div className="border-b border-black/10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 max-w-[100rem] mx-auto border-x border-black/10">
          {[
            {
              label: 'Blueprint',
              question: 'Are you a brand?',
              desc: 'Get your creator and social strategy working as one — audits, workshops and programme design. Most clients start here.',
              href: '/services/blueprint',
              accent: 'border-t-bb-mint',
            },
            {
              label: 'Studio',
              // Two lines at lg, like its neighbours — "Are you making content?"
              // wrapped to three and knocked the descriptions out of alignment
              question: 'Do you need content?',
              desc: 'Turn your social strategy into content that holds attention rather than chases it. Watch time over view count.',
              href: '/services/studio',
              accent: 'border-t-bb-blue',
            },
            {
              label: 'Connect',
              question: 'Are you a creator?',
              desc: 'Build a career without losing control. Representation that flexes with you — three tiers, no forced exclusivity.',
              href: '/services/connect',
              accent: 'border-t-bb-grey',
            },
            {
              label: 'Resonate',
              question: 'Are you an artist?',
              desc: 'Get discovered on your own terms. Fans who’ll follow you off the app and into the room.',
              href: '/services/resonate',
              accent: 'border-t-black',
            },
          ].map((item, i) => (
            /* The card is a div with a stretched link on the heading (not one
               big <a>) so the title bar's minimise <button> isn't nested
               inside an anchor — invalid HTML and a confusing tab stop. */
            <div
              key={item.label}
              /* Column rules only between cards — cleared on the last card of
                 each row so they don't double up on the container's border-x */
              className={`group relative flex flex-col gap-3 px-8 lg:px-10 py-8 border-black/10 border-r-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:border-r lg:[&:nth-child(4n)]:border-r-0 border-t-[3px] ${item.accent} hover:bg-bb-mint/30 transition-colors duration-200 ${
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
                  className="uppercase text-black text-body-lg"
                >
                  <a href={item.href} className="after:absolute after:inset-0">
                    {item.question}
                  </a>
                </h3>
                <p className="text-body-sm text-black/50 flex-1">{item.desc}</p>
                <span className="inline-flex items-center gap-2 text-label tracking-label uppercase text-black/40 group-hover:text-bb-blue transition-colors duration-200 mt-1">
                  Learn more
                  <span className="arrow-hop inline-block">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Form — reuses the ContactCTA component from homepage, minus its
             "Come and say hello." heading (this page's hero already says it) ── */}
      <ContactCTA showHeading={false} />

      <Footer />
    </main>
  )
}
