'use client'

import React from 'react'
import Link from 'next/link'

// Extended type to allow CSS scroll-driven animation properties not yet in @types/react
type ScrollCSS = React.CSSProperties & {
  viewTimelineName?: string
  viewTimelineAxis?: string
  animationTimeline?: string
  animationRange?: string
}

/* ── Identity marks — match the service page heroes ── */
const ConsultingMark = () => (
  <svg width="18" height="18" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="2" y="2" width="24" height="24" />
    <rect x="7" y="7" width="14" height="14" />
    <rect x="11" y="11" width="6" height="6" />
  </svg>
)

const StudioMark = () => (
  <svg width="18" height="18" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="14" cy="14" r="12" />
    <circle cx="14" cy="14" r="7" />
    <circle cx="14" cy="14" r="3" />
  </svg>
)

const TalentMark = () => (
  <svg width="18" height="18" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="4" y="4" width="20" height="20" transform="rotate(45 14 14)" />
    <rect x="7.5" y="7.5" width="13" height="13" transform="rotate(45 14 14)" />
    <rect x="11" y="11" width="6" height="6" transform="rotate(45 14 14)" />
  </svg>
)

const ResonateMark = () => (
  <svg width="18" height="13" viewBox="0 0 28 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <line x1="1" y1="3" x2="27" y2="3" />
    <line x1="4" y1="10" x2="24" y2="10" />
    <line x1="8" y1="17" x2="20" y2="17" />
  </svg>
)

const services = [
  {
    num: '01',
    name: 'Consulting',
    Mark: ConsultingMark,
    desc: (
      <>
        We help <strong>brands, agencies, and networks</strong> design and implement{' '}
        <strong>cross-functional creator strategies</strong> that reduce duplication,
        improve efficiency and deliver outcomes.
      </>
    ),
    href: '/services/consulting',
  },
  {
    num: '02',
    name: 'Studio',
    Mark: StudioMark,
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
    name: 'Talent',
    Mark: TalentMark,
    desc: (
      <>
        <strong>Representation and development services</strong> for up and coming
        content creators. We help identify <strong>brand partners</strong> and
        secure <strong>paid opportunities</strong>.
      </>
    ),
    href: '/services/talent',
  },
  {
    num: '04',
    name: 'Resonate',
    Mark: ResonateMark,
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
    <section id="services" className="services-scroll-section bg-white border-t border-gray-200">
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
        <div className="pt-20 pb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-gray-200">

          {/* Large heading — slides in from left as section enters */}
          <h2
            className="text-gray-900 font-black leading-none tracking-tight"
            style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
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
            className="text-gray-400 sm:text-right leading-snug"
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
            Across consulting,<br />production &amp; talent development
          </p>
        </div>

        {/* ── Numbered service rows — staggered slide-in keyed to section timeline ── */}
        <div className="pb-6">
          {services.map(({ num, name, Mark, desc, href }, i) => {
            // Alternate slide direction per row
            const dir = i % 2 === 0 ? 'slide-from-left' : 'slide-from-right'
            // Each row uses its own view() timeline so it tracks independently.
            // entry 0% = row off-screen below viewport; contain 35% = row in
            // lower third of screen — animation completes before reading position
            // so content is settled by the time the eye reaches it.
            return (
              <div
                key={name}
                className="border-b border-gray-200"
                style={{
                  animationName: dir,
                  animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
                  animationFillMode: 'both',
                  animationTimeline: 'view()',
                  animationRange: 'entry 0% contain 35%',
                } as ScrollCSS}
              >
                <div className="py-10 sm:py-12 grid grid-cols-[2.75rem_1fr] sm:grid-cols-[2.75rem_1fr_auto] gap-x-6 gap-y-0 items-start">

                  {/* Row number — mono, faint */}
                  <span
                    className="text-gray-300 pt-px"
                    style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.68rem', lineHeight: '1.8rem' }}
                  >
                    {num}
                  </span>

                  {/* Main content block */}
                  <div className="flex flex-col gap-4">
                    {/* Service name + mark inline */}
                    <div className="flex items-center gap-3">
                      <h3
                        className="text-gray-900 font-bold tracking-tight leading-none"
                        style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
                      >
                        {name}
                      </h3>
                      <span className="text-gray-300 flex-shrink-0" style={{ marginTop: '2px' }}>
                        <Mark />
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 leading-relaxed" style={{ fontSize: '0.875rem', maxWidth: '42rem' }}>
                      {desc}
                    </p>

                    {/* CTA — mobile only */}
                    <Link
                      href={href}
                      className="text-gray-900 underline underline-offset-4 sm:hidden"
                      style={{ fontSize: '0.8rem' }}
                    >
                      Learn More →
                    </Link>
                  </div>

                  {/* CTA — desktop right column */}
                  <Link
                    href={href}
                    className="hidden sm:block text-gray-900 underline underline-offset-4 whitespace-nowrap pt-1"
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
