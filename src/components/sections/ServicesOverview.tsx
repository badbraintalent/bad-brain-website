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

/* ── Official sub-brand logomarks (interconnected-dot system) ── */
const services = [
  {
    num: '01',
    name: 'Blueprint',
    logo: '/images/brand/marks/Blueprint.svg',
    category: 'Strategic Consultancy',
    desc: (
      <>
        Get your creator and social strategy working as one. Blueprint is where
        most Bad Brain clients start - <strong>audits, workshops and programme
        design</strong> that everything else builds from.
      </>
    ),
    cta: 'Start here',
    href: '/services/blueprint',
  },
  {
    num: '02',
    name: 'Connect',
    logo: '/images/brand/marks/Connect.svg',
    category: 'Creator Marketing Services',
    desc: (
      <>
        <strong>For brands</strong> - Bring in the team who gets the creator
        economy from the inside. End-to-end delivery: sourcing, briefing,
        contracts, content rights, performance. Everything.
        <br />
        <strong>For creators</strong> - Build a career without losing control.
        Representation that flexes with you - from inbox management to full
        partnership. Three tiers, no forced exclusivity.
      </>
    ),
    cta: 'Get connected',
    href: '/services/connect',
  },
  {
    num: '03',
    name: 'Studio',
    logo: '/images/brand/marks/Studio.svg',
    category: 'Content Production',
    desc: (
      <>
        Turn your organic social strategy into content that holds attention
        rather than chases it. <strong>Creator content. Live production.
        Watch Time over View Count.</strong>
      </>
    ),
    cta: 'Make it with us',
    href: '/services/studio',
  },
  {
    num: '04',
    name: 'Resonate',
    logo: '/images/brand/marks/Resonate.svg',
    category: 'Band / Artist Socials',
    desc: (
      <>
        Get discovered on your own terms. Co-founded by music insider{' '}
        <strong>Jen Long</strong> (Radio 1, NME, DICE), Resonate builds fans
        who&apos;ll follow you off the app and into the room.
      </>
    ),
    cta: 'Find your people',
    href: '/services/resonate',
  },
]

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

        {/* Header copy removed — the section now opens straight on the service rows */}
        <div className="pt-12 md:pt-20 border-b border-black/10" />

        {/* ── Numbered service rows — staggered slide-in keyed to section timeline ── */}
        <div className="pb-6">
          {services.map(({ num, name, logo, category, desc, cta, href }, i) => {
            // Alternate slide direction per row
            const dir = i % 2 === 0 ? 'slide-from-left' : 'slide-from-right'
            // Each row uses its own view() timeline so it tracks independently.
            // The range runs entry 0% → entry 100%: the row finishes sliding in
            // the moment it is fully on screen. It previously ran to
            // `contain 35%`, which requires the row to be wholly in view *plus*
            // 35% of the containment window further — so row 04 was still
            // settling after row 01 had scrolled off, and the tiles never
            // locked into a line until you were past them.
            return (
              <div
                key={name}
                className="relative border-b border-black/10"
                style={{
                  animationName: dir,
                  animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
                  animationFillMode: 'both',
                  animationTimeline: 'view()',
                  animationRange: 'entry 0% entry 100%',
                } as ScrollCSS}
              >
                {/* The number's gutter is narrow on mobile — 44px of column plus a
                    24px gap took a sixth of a 375px screen away from the copy. */}
                <div className="py-8 sm:py-12 grid grid-cols-[1.5rem_1fr] gap-x-3 sm:grid-cols-[2.75rem_1fr_auto] sm:gap-x-6 gap-y-0 items-start">

                  {/* Row number — faint, tabular so the column stays aligned.
                      `.service-row-num` sits its cap top on the wordmark's; see
                      globals.css for the derivation. */}
                  <span className="service-row-num text-black/70 text-label tabular-nums">
                    {num}
                  </span>

                  {/* Main content block */}
                  <div className="flex flex-col gap-4">
                    {/* Service name + official sub-brand logomark */}
                    <div className="flex items-center gap-5">
                      <h3
                        className="text-black text-display-3"
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

                    {/* Category */}
                    <p className="text-black/60 uppercase text-label tracking-label">
                      {category}
                    </p>

                    {/* Description */}
                    <p className="text-black/70 text-body-sm max-w-[42rem]">
                      {desc}
                    </p>

                    {/* CTA — mobile only. after:inset-0 stretches the hit area
                        over the whole row (it already hover-reacts as one). */}
                    <Link
                      href={href}
                      className="text-bb-blue underline underline-offset-4 sm:hidden after:absolute after:inset-0 text-body-sm"
                    >
                      {cta} →
                    </Link>
                  </div>

                  {/* CTA — desktop right column; after:inset-0 makes the whole
                      row the click target (one stretched link per breakpoint) */}
                  <Link
                    href={href}
                    className="hidden sm:block text-bb-blue underline underline-offset-4 whitespace-nowrap pt-1 after:absolute after:inset-0 text-body-sm"
                  >
                    {cta} →
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
