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
    category: 'For brands, agencies and networks',
    desc: (
      <>
        Get your creator and social strategy working as one. Blueprint is where
        most Bad Brain clients start — <strong>audits, workshops and programme
        design</strong> that everything else builds from.
      </>
    ),
    cta: 'Start here',
    href: '/services/blueprint',
  },
  {
    num: '02',
    name: 'Studio',
    logo: '/images/brand/marks/Studio.svg',
    category: 'For brands',
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
    num: '03',
    name: 'Connect',
    logo: '/images/brand/marks/Connect.svg',
    category: 'For brands and creators',
    desc: (
      <>
        <strong>For brands</strong> — Bring in the team who gets the creator
        economy from the inside. End-to-end delivery: sourcing, briefing,
        contracts, content rights, performance. Everything.
        <br />
        <strong>For creators</strong> — Build a career without losing control.
        Representation that flexes with you — from inbox management to full
        partnership. Three tiers, no forced exclusivity.
      </>
    ),
    cta: 'Get connected',
    href: '/services/connect',
  },
  {
    num: '04',
    name: 'Resonate',
    logo: '/images/brand/marks/Resonate.svg',
    category: 'For artists, labels and managers',
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
            // entry 0% = row off-screen below viewport; contain 35% = row in
            // lower third of screen — animation completes before reading position
            // so content is settled by the time the eye reaches it.
            return (
              <div
                key={name}
                className="relative border-b border-black/10"
                style={{
                  animationName: dir,
                  animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
                  animationFillMode: 'both',
                  animationTimeline: 'view()',
                  animationRange: 'entry 0% contain 35%',
                } as ScrollCSS}
              >
                <div className="py-8 sm:py-12 grid grid-cols-[2.75rem_1fr] sm:grid-cols-[2.75rem_1fr_auto] gap-x-6 gap-y-0 items-start">

                  {/* Row number — faint, tabular so the column stays aligned */}
                  <span className="text-black/55 pt-px text-label tabular-nums leading-[1.8rem]">
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
                    <p className="text-black/40 uppercase text-label tracking-label">
                      {category}
                    </p>

                    {/* Description */}
                    <p className="text-black/60 text-body-sm max-w-[42rem]">
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
