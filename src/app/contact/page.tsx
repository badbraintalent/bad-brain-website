'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/ui/ContactForm'
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

      {/* ── Hero — CSS grid, two columns: copy | live contact.exe form ──
             Getting in touch has to be possible before any scrolling. A modal
             would do it, but it costs focus trapping, a dismissal affordance
             and mobile-keyboard handling, and reads as spam. The form simply
             *is* the hero's right-hand pane, so it is live on arrival with
             nothing to open or close. */}
      <section
        className="bg-white text-black relative border-b border-black/10"
        style={{
          // `min-height`, not `height` — the pane holds a real form now, so on
          // a short viewport the hero has to be allowed to grow rather than
          // clip its own inputs. Capped at 62.5rem so it still can't balloon on
          // a tall screen, which is what the old max-height was guarding.
          minHeight: 'min(calc(100svh - 65px), 62.5rem)',
          overflow: 'clip',
          display: 'grid',
          gridTemplateRows: '1fr',
        }}
      >
        {/* ── Two-column content (fills the hero, width-capped on big screens) ── */}
        {/* 44%, not 38%: at 38% the headline's longest line ("hello.") needs
            379px against a 307px column at 1024px and overflowed the divider
            into the next pane — tolerable when that pane was a decorative
            halftone, not when it holds a form. */}
        <div className="grid grid-cols-1 lg:grid-cols-[44%_1fr] w-full max-w-[100rem] mx-auto border-x border-black/10">
          {/* Left — headline + intro copy */}
          <div className="flex flex-col lg:border-r border-black/15">
            {/* Padding, mark and gap are all tighter below lg. The two columns
                stack there, so every pixel spent above the headline is a pixel
                that pushes the form down the screen, and the form has to stay
                reachable without scrolling. */}
            <div className="relative flex-1 flex flex-col justify-end px-6 sm:px-8 lg:px-10 pt-6 pb-6 lg:pt-10 lg:pb-10">
              {/* The brand field moved here from the right-hand panel when the
                  form took that pane — it now runs at every width, so desktop
                  keeps a halftone instead of losing it with the panel. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/halftones/bb_16x9_blue.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              />
              <div className="relative flex flex-col gap-5 lg:gap-8 [container-type:inline-size]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/brand/logo/BB_Logo.svg"
                  alt="Bad Brain"
                  className="w-[6.5rem] lg:w-[11rem] h-auto"
                  style={enter('0.5s')}
                />
                <h1
                  /* At lg+ the headline is sized off its own column rather than
                     the viewport: `text-display-1` is 7.2vw, but the column is
                     44% of the canvas *minus* 82px of padding, so a vw-based
                     size can't track it and overruns at the narrow end. 18.6cqw
                     is measured — "hello." runs 5.14× its font size, and the
                     column is the container. Capped at display-1's own 6.5rem
                     ceiling so it never outgrows the rest of the type scale. */
                  className="uppercase text-black text-display-1 lg:text-[min(18.6cqw,6.5rem)] leading-hero"
                >
                  <span className="block" style={enter('0.25s')}>Come</span>
                  <span className="block" style={enter('0.35s')}>and say</span>
                  <span className="block" style={enter('0.45s')}>hello.</span>
                </h1>
              </div>
            </div>

            <div className="border-t border-black/15" style={enter('0.52s', '0.5s')} />

            <div
              className="px-6 sm:px-8 lg:px-10 py-6 lg:py-8"
              style={{ paddingBottom: 'clamp(1.5rem, 6vw, 4rem)', ...enter('0.62s') }}
            >
              <p className="text-black/70 text-body-sm max-w-[30rem]">
                Good to have you here. Wherever you&apos;re up to - a rough idea or a firm brief - we&apos;d love to hear about it.
              </p>
            </div>
          </div>

          {/* Right — contact.exe, with the capture live inside it */}
          <div
            className="flex flex-col border-t lg:border-t-0 border-black/15"
            style={enter('0.38s', '0.85s')}
          >
            {/* Shared OS-window chrome — same grammar as the service hero devices */}
            <WindowTitleBar name="contact.exe" className="border-b border-black/15 px-3 py-2" />
            {/* Centred in the pane so the form reads as the window's contents
                rather than sinking to the bottom of a tall column. The 36rem
                cap matters: the pane is 62% of a 1600px canvas, and a
                single-column form left to fill that stretches each field to
                ~890px, which puts Send a screen-width away from the input it
                submits. */}
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-10">
              <ContactForm layout="compact" className="w-full max-w-[36rem] mx-auto" />
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
              desc: 'Get your creator and social strategy working as one - audits, workshops and programme design. Most clients start here.',
              href: '/services/blueprint',
              accent: 'border-t-bb-mint',
            },
            /* Connect before Studio, matching the homepage order. Accents are
               bound to position so the mint/black/grey/black rhythm across the
               row survives the swap. */
            {
              label: 'Connect',
              question: 'Are you a creator?',
              desc: 'Build a career without losing control. Representation that flexes with you - three tiers, no forced exclusivity.',
              href: '/services/connect',
              accent: 'border-t-black',
            },
            {
              label: 'Studio',
              // Two lines at lg, like its neighbours — "Are you making content?"
              // wrapped to three and knocked the descriptions out of alignment
              question: 'Do you need content?',
              desc: 'Turn your social strategy into content that holds attention rather than chases it. Watch time over view count.',
              href: '/services/studio',
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
                <p className="text-body-sm text-black/60 flex-1">{item.desc}</p>
                <span className="inline-flex items-center gap-2 text-label tracking-label uppercase text-black/60 group-hover:text-bb-blue transition-colors duration-200 mt-1">
                  Learn more
                  <span className="arrow-hop inline-block">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No second form down here — the capture moved into the hero, and
          repeating it below the wayfinder would just be the same three fields
          twice on one short page. */}

      <Footer />
    </main>
  )
}
