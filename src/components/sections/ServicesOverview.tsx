'use client'

import React from 'react'
import Link from 'next/link'
import PixelDitherFrame from '@/components/ui/PixelDitherFrame'

// Extended type to allow CSS scroll-driven animation properties not yet in @types/react
type ScrollCSS = React.CSSProperties & {
  viewTimelineName?: string
  viewTimelineAxis?: string
  animationTimeline?: string
  animationRange?: string
}

/* ── Official sub-brand logomarks (interconnected-dot system) ── */
const services = [
  {
    num: '01',
    name: 'Blueprint',
    logo: '/images/brand/marks/Blueprint.svg',
    desc: (
      <>
        We help <strong>brands, agencies, and networks</strong> design and implement{' '}
        <strong>cross-functional creator strategies</strong> that reduce duplication,
        improve efficiency and deliver outcomes.
      </>
    ),
    href: '/services/blueprint',
  },
  {
    num: '02',
    name: 'Studio',
    logo: '/images/brand/marks/Studio.svg',
    desc: (
      <>
        Translates your <strong>core creative strategy</strong> into a{' '}
        <strong>fully integrated suite of content</strong> — built for a video
        and social-first world.
      </>
    ),
    href: '/services/studio',
  },
  {
    num: '03',
    name: 'Connect',
    logo: '/images/brand/marks/Connect.svg',
    desc: (
      <>
        <strong>Representation and development services</strong> for up and coming
        content creators. We help identify <strong>brand partners</strong> and
        secure <strong>paid opportunities</strong>.
      </>
    ),
    href: '/services/connect',
  },
  {
    num: '04',
    name: 'Resonate',
    logo: '/images/brand/marks/Resonate.svg',
    desc: (
      <>
        <strong>Social strategy tailor-made for musicians and labels.</strong> We
        use industry insight to help artists engage, nurture and grow audiences in
        a video-first, discovery-driven landscape.
      </>
    ),
    href: '/services/resonate',
  },
]

// Shared easing matches the rest of the site
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

const ServicesOverview = () => {
  return (
    <section id="services" className="services-scroll-section bg-white border-t border-black/10">
      {/*
        Inner wrapper carries the named view-timeline so all children
        animate relative to this block entering the viewport —
        same pattern as .services-scroll-grid and .social-showcase-grid.
      */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          viewTimelineName: '--services-overview',
          viewTimelineAxis: 'block',
        } as ScrollCSS}
      >

        {/* ── Editorial header ── */}
        <div className="pt-20 pb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-black/10">

          {/* Large heading — slides in from left as section enters */}
          <h2
            className="text-black leading-none"
            style={{
              fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)',
              animationName: 'slide-from-left',
              animationTimingFunction: EASE,
              animationFillMode: 'both',
              animationTimeline: '--services-overview',
              animationRange: 'entry 0% cover 25%',
            } as ScrollCSS}
          >
            Integrated<br />services.
          </h2>

          {/* Caption — slides in from right, slightly offset */}
          <p
            className="text-black/40 sm:text-right leading-snug"
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              maxWidth: '16rem',
              animationName: 'slide-from-right',
              animationTimingFunction: EASE,
              animationFillMode: 'both',
              animationTimeline: '--services-overview',
              animationRange: 'entry 5% cover 28%',
            } as ScrollCSS}
          >
            Across strategy,<br />production &amp; creator development
          </p>
        </div>

        {/* ── Numbered service rows — staggered slide-in keyed to section timeline ── */}
        <div className="pb-6">
          {services.map(({ num, name, logo, desc, href }, i) => {
            // Alternate slide direction per row
            const dir = i % 2 === 0 ? 'slide-from-left' : 'slide-from-right'
            // Each row uses its own view() timeline so it tracks independently.
            // entry 0% = row off-screen below viewport; contain 35% = row in
            // lower third of screen — animation completes before reading position
            // so content is settled by the time the eye reaches it.
            return (
              <div
                key={name}
                className="relative group border-b border-black/10"
                style={{
                  animationName: dir,
                  animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
                  animationFillMode: 'both',
                  animationTimeline: 'view()',
                  animationRange: 'entry 0% contain 35%',
                } as ScrollCSS}
              >
                {/* Animated pixel frame — pixels fade in staggered on hover */}
                <PixelDitherFrame cols={140} rows={14} seed={i + 11} />
                <div className="py-10 sm:py-12 grid grid-cols-[2.75rem_1fr] sm:grid-cols-[2.75rem_1fr_auto] gap-x-6 gap-y-0 items-start">

                  {/* Row number — mono, faint */}
                  <span
                    className="text-black/55 pt-px"
                    style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.68rem', lineHeight: '1.8rem' }}
                  >
                    {num}
                  </span>

                  {/* Main content block */}
                  <div className="flex flex-col gap-4">
                    {/* Service name + official sub-brand logomark */}
                    <div className="flex items-center gap-5">
                      <h3
                        className="text-black leading-none"
                        style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
                      >
                        {name}
                      </h3>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logo}
                        alt={`Bad Brain ${name} logo`}
                        className="h-12 md:h-16 w-auto flex-shrink-0"
                      />
                    </div>

                    {/* Description */}
                    <p className="text-black/60 leading-relaxed" style={{ fontSize: '0.875rem', maxWidth: '42rem' }}>
                      {desc}
                    </p>

                    {/* CTA — mobile only. after:inset-0 stretches the hit area
                        over the whole row (it already hover-reacts as one). */}
                    <Link
                      href={href}
                      className="text-bb-blue underline underline-offset-4 sm:hidden after:absolute after:inset-0"
                      style={{ fontSize: '0.8rem' }}
                    >
                      Learn More →
                    </Link>
                  </div>

                  {/* CTA — desktop right column; after:inset-0 makes the whole
                      row the click target (one stretched link per breakpoint) */}
                  <Link
                    href={href}
                    className="hidden sm:block text-bb-blue underline underline-offset-4 whitespace-nowrap pt-1 after:absolute after:inset-0"
                    style={{ fontSize: '0.8rem' }}
                  >
                    Learn More →
                  </Link>

                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default ServicesOverview
