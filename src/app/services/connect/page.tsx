'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import PixelDitherFrame from '@/components/ui/PixelDitherFrame'
import WindowTitleBar from '@/components/ui/WindowTitleBar'
import ServiceCTA from '@/components/sections/ServiceCTA'
import { useEffect, useRef, useState } from 'react'
import { enter } from '@/lib/y2k'


// Roster = the 12 creators from the client's "Our Roster" deck (photos, niches
// and platform stats all sourced from the PDF). No outbound profile links by
// client preference.
type Creator = {
  num: string
  name: string
  niche: string
  photo: string
  stats: { platform: string; count: string }[]
}

const creators: Creator[] = [
  {
    num: '01',
    name: 'Marygrace Tropeano',
    niche: 'Model · Beauty · Lifestyle',
    photo: '/images/creators/marygrace-tropeano.jpg',
    stats: [
      { platform: 'TikTok', count: '1,200,000' },
      { platform: 'YouTube', count: '682,000' },
      { platform: 'Instagram', count: '342,000' },
    ],
  },
  {
    num: '02',
    name: 'Carrie Patsalis',
    niche: 'Travel · Tech · Lifestyle',
    photo: '/images/creators/carrie-patsalis.jpg',
    stats: [
      { platform: 'Instagram', count: '207,000' },
      { platform: 'YouTube', count: '167,000' },
      { platform: 'TikTok', count: '75,000' },
    ],
  },
  {
    num: '03',
    name: 'Time Drops',
    niche: 'Horology · Lifestyle',
    photo: '/images/creators/time-drops.jpg',
    stats: [
      { platform: 'YouTube', count: '52,000' },
      { platform: 'Instagram', count: '2,500' },
      { platform: 'Newsletter', count: '2,500' },
    ],
  },
  {
    num: '04',
    name: 'Paul Johnston Naylor',
    niche: 'Humour · Family · Movies',
    photo: '/images/creators/paul-johnston-naylor.jpg',
    stats: [
      { platform: 'Facebook', count: '1,000,000' },
      { platform: 'TikTok', count: '417,000' },
      { platform: 'Instagram', count: '218,000' },
    ],
  },
  {
    num: '05',
    name: 'Lapheal Sterling',
    niche: 'Fashion · Lifestyle',
    photo: '/images/creators/lapheal-sterling.jpg',
    stats: [
      { platform: 'Instagram', count: '53,000' },
      { platform: 'TikTok', count: '13,000' },
    ],
  },
  {
    num: '06',
    name: 'Amiizmus',
    niche: 'Fashion · Lifestyle',
    photo: '/images/creators/amiizmus.jpg',
    stats: [
      { platform: 'Instagram', count: '20,000' },
      { platform: 'TikTok', count: '3,000' },
    ],
  },
  {
    num: '07',
    name: 'Monika Rosie Young',
    niche: 'Fashion · Beauty · Lifestyle',
    photo: '/images/creators/monika-rosie-young.jpg',
    stats: [
      { platform: 'Instagram', count: '10,700' },
      { platform: 'TikTok', count: '2,000' },
    ],
  },
  {
    num: '08',
    name: 'Sam Kojo Plummer',
    niche: 'Sport · Fitness · Tech',
    photo: '/images/creators/sam-kojo-plummer.jpg',
    stats: [
      { platform: 'Instagram @kojostricklab', count: '155,000' },
      { platform: 'Instagram', count: '117,000' },
    ],
  },
  {
    num: '09',
    name: 'Thick CutChipz',
    niche: 'Fashion · Lifestyle',
    photo: '/images/creators/thick-cutchipz.jpg',
    stats: [{ platform: 'Instagram', count: '9,000' }],
  },
  {
    num: '10',
    name: 'HiggoUK',
    niche: 'Music · Tech',
    photo: '/images/creators/higgouk.jpg',
    stats: [
      { platform: 'Spotify listeners', count: '350,000' },
      { platform: 'Instagram', count: '12,000' },
    ],
  },
  {
    num: '11',
    name: 'Strength Sweat Succeed',
    niche: 'Fitness · Tech',
    photo: '/images/creators/strength-sweat-succeed.jpg',
    stats: [{ platform: 'YouTube', count: '10,200' }],
  },
  {
    num: '12',
    name: 'Thibodyo',
    niche: 'VFX · Tech · Automotive',
    photo: '/images/creators/thibodyo.jpg',
    stats: [
      { platform: 'TikTok', count: '103,000' },
      { platform: 'Instagram', count: '10,200' },
    ],
  },
]

const services = [
  {
    num: '01',
    title: 'Representation',
    desc: 'Brand partnership negotiation, licensing deals, and collaboration management — handled with creator interests first.',
  },
  {
    num: '02',
    title: 'Business Development & Strategy',
    desc: 'Dedicated strategy hours, revenue diversification, and long-term career roadmapping to build businesses that last.',
  },
  {
    num: '03',
    title: 'Content Planning & Creative Development',
    desc: 'Structured planning and creative development support to keep output consistent, fresh, and audience-first.',
  },
  {
    num: '04',
    title: 'Brand Access',
    desc: 'Direct access to brands and campaigns running through the Bad Brain network — opportunities your audience actually cares about.',
  },
]

export default function ConnectPage() {
  // Roster browser: which creator the dossier viewer shows. Auto-rotates;
  // hovering the roster.exe window pauses rotation and hover/focus on a row
  // overrides the selection.
  const [active, setActive] = useState(0)
  const rosterPaused = useRef(false)
  // Hero contact sheet: which thumbnail the pointer is on (drives the readout).
  const [sheetHover, setSheetHover] = useState<number | null>(null)

  useEffect(() => {
    // JS-driven motion — the CSS reduced-motion guard can't reach it, so gate
    // here (hover/focus still drive the dossier).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (!rosterPaused.current) setActive((i) => (i + 1) % creators.length)
    }, 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <main>
      <Navigation />

      {/* ── Hero — CSS grid, thin border lines, full-viewport ── */}
      <section
        className="bg-white text-black relative"
        style={{
          height: 'calc(100svh - 65px)',
          minHeight: '700px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateRows: '1fr',
        }}
      >
        {/* ── Video panel + copy column (fills the hero) ── */}
        <div
          className="grid min-h-0 overflow-hidden grid-cols-1 lg:grid-cols-[38%_1fr]"
        >
          {/* Left — connect.exe contact sheet: the whole roster as a static
              "icon view" (the roster.exe browser below is the detail view,
              and owns the only slideshow on the page) */}
          <div
            className="hidden lg:flex flex-col min-h-0 overflow-hidden border-r border-black/15"
            style={enter('0.18s', '0.9s')}
            onMouseLeave={() => setSheetHover(null)}
          >
            {/* Shared OS-window chrome — every service hero device runs as an app */}
            <WindowTitleBar name="connect.exe" className="bg-bb-grey px-3 py-2" />

            {/* 3×4 headshot grid */}
            <div className="grid grid-cols-3 grid-rows-4 flex-1 min-h-0 gap-px bg-black/15 border-b border-black/15">
              {creators.map((c, i) => (
                <div
                  key={c.num}
                  onMouseEnter={() => setSheetHover(i)}
                  className="relative overflow-hidden bg-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.photo}
                    alt={`${c.name} — Bad Brain Connect creator`}
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
                    style={{ opacity: sheetHover === null || sheetHover === i ? 1 : 0.45 }}
                  />
                  {sheetHover === i && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 border-2 border-bb-mint pointer-events-none"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Readout — names the hovered face, else the roster headline */}
            <div className="px-4 py-3 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-black truncate">
                  {sheetHover !== null ? creators[sheetHover].name : '12 creators'}
                </p>
                <p className="font-mono text-[0.55rem] tracking-[0.15em] text-black/50 uppercase mt-0.5 truncate">
                  {sheetHover !== null ? creators[sheetHover].niche : 'On roster · London'}
                </p>
              </div>
              <p className="font-mono text-[0.55rem] tracking-[0.15em] text-black/40 shrink-0">
                {sheetHover !== null ? `${creators[sheetHover].num}/12` : '12/12'}
              </p>
            </div>
          </div>

          {/* Right — copy column, split into headline + body */}
          <div className="flex flex-col min-h-0">

            {/* Upper cell: headline, anchored to bottom */}
            <div className="relative flex-1 flex flex-col justify-end px-10 lg:px-16 pt-10 pb-10">
              {/* Mobile-only halftone — fills the space the hidden panels leave */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/halftones/connect_16x9_gray.png"
                alt=""
                aria-hidden="true"
                className="lg:hidden absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              />
              {/* Headline + sub-brand mark — same lockup slot on every service hero */}
              <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
                <h1
                  className="uppercase text-black"
                  style={{ fontSize: 'clamp(2.8rem, 5.2vw, 8rem)', lineHeight: 0.88 }}
                >
                  <span className="block" style={enter('0.32s')}>Create</span>
                  <span className="block" style={enter('0.42s')}>Your Own</span>
                  <span className="block" style={enter('0.52s')}>Terms.</span>
                </h1>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/brand/marks/Connect.svg"
                  alt="Bad Brain Connect"
                  className="order-first sm:order-last shrink-0 w-[10.8rem] lg:w-[16.8rem] h-auto sm:mb-2"
                  style={enter('0.5s')}
                />
              </div>
            </div>

            {/* Divider — horizontal line across the copy column */}
            <div className="border-t border-black/15" style={enter('0.55s', '0.5s')} />

            {/* Lower cell: copy + CTA */}
            <div
              className="px-10 lg:px-16 py-8"
              style={{ paddingBottom: 'clamp(5rem, 17vw, 13rem)', ...enter('0.65s') }}
            >
              <p className="text-black/60 text-sm leading-relaxed mb-6" style={{ maxWidth: '30rem' }}>
                Bad Brain Connect supports, develops and represents{' '}
                <strong className="text-black font-semibold">
                  up-and-coming original content creators
                </strong>
                . We handle the brand deals, the admin, and the business development — so you can put
                your time and energy into{' '}
                <strong className="text-black font-semibold">
                  your content and your audience.
                </strong>
              </p>
              <a
                href="#roster"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#roster')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 text-black/60 text-xs tracking-[0.2em] uppercase hover:text-bb-blue transition-colors group w-fit cursor-pointer"
              >
                <span className="border-b border-black/20 pb-0.5 group-hover:border-bb-blue transition-colors">
                  Meet the roster
                </span>
                <span className="arrow-hop inline-block">→</span>
              </a>
            </div>

          </div>
        </div>

      </section>

      {/* ── Problem section — white, typographic two-col ── */}
      <section className="bg-white py-24 overflow-clip">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Pull quote */}
            <div className="talent-pull-quote">
              <p
                className="font-display text-black uppercase"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)', lineHeight: 0.88, letterSpacing: '-0.04em' }}
              >
                The demand never slows.
              </p>
              <div className="mt-8 h-1.5 w-16 bg-bb-blue" />
            </div>

            {/* Body copy */}
            <div className="talent-problem-copy space-y-5 text-black/60 text-base leading-relaxed pt-2">
              <p>
                <strong className="text-black font-semibold">Audiences expect more</strong> — more
                formats, more frequency, more from the people they follow. Keeping up with content leaves
                little room for managing brand deals, career development, and long-term growth.
              </p>
              <p>
                The need for representation is clear. But too often,{' '}
                <strong className="text-black font-semibold">
                  traditional management means losing control
                </strong>
                : forced deals, overexposure, and strategies built to serve the agency — not the creator.
              </p>
              <p>
                Our{' '}
                <strong className="text-black font-semibold">tiered model gives creators control</strong>
                , with support that flexes to fit their needs — from inbox management to full-scale
                representation. We handle the business. You focus on the work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Creator roster — "roster.exe", a photo-based talent browser:
             index list on the left, sticky dossier viewer on the right ── */}
      <section id="roster" className="bg-black py-24 talent-roster-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="talent-roster-header flex items-baseline justify-between mb-10 pb-6 border-b border-white/20">
            <span className="text-[0.65rem] tracking-[0.35em] uppercase text-white/60">Our Creators</span>
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-white/40">
              12 Represented · 5.2M+ Combined Audience
            </span>
          </div>

          {/* OS window wrapper — pointer presence pauses the auto-rotation */}
          <div
            className="roster-window-in border border-white/15"
            onMouseEnter={() => { rosterPaused.current = true }}
            onMouseLeave={() => { rosterPaused.current = false }}
          >
            <WindowTitleBar name="roster.exe" className="bg-bb-grey px-3 py-2" />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_42%]">

              {/* Index list — hover/focus a row to load it in the viewer.
                  Below lg each row carries its own photo + stats instead. */}
              <div role="list">
                {creators.map((creator, i) => (
                  <div
                    role="listitem"
                    key={creator.num}
                    tabIndex={0}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`group grid grid-cols-[4.5rem_1fr] lg:grid-cols-[3rem_1fr] items-center gap-x-4 lg:gap-x-6 px-4 sm:px-6 py-4 lg:py-5 border-b border-white/10 last:border-b-0 outline-none transition-colors duration-200 ${
                      active === i ? 'lg:bg-white/[0.06]' : ''
                    }`}
                  >
                    {/* Thumb — the list IS the roster below lg */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={creator.photo}
                      alt={creator.name}
                      loading="lazy"
                      decoding="async"
                      className="lg:hidden w-[4.5rem] h-[4.5rem] object-cover row-span-2"
                    />
                    {/* Index number (lg+) */}
                    <span
                      className={`hidden lg:block font-mono text-xs transition-colors duration-200 ${
                        active === i ? 'text-bb-mint' : 'text-white/40'
                      }`}
                    >
                      {creator.num}
                    </span>

                    <div className="min-w-0">
                      <h3
                        className={`font-display uppercase lg:truncate transition-colors duration-200 ${
                          active === i ? 'lg:text-bb-mint text-white' : 'text-white'
                        }`}
                        style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.5rem)', lineHeight: 1 }}
                      >
                        {creator.name}
                      </h3>
                      <p className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-white/40 mt-1.5 truncate">
                        {creator.niche}
                      </p>
                      {/* Inline stats — mobile only (the viewer shows them on lg) */}
                      <p className="lg:hidden font-mono text-[0.55rem] tracking-[0.1em] uppercase text-white/60 mt-1.5 leading-relaxed">
                        {creator.stats.map((s) => `${s.count} ${s.platform}`).join(' · ')}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

              {/* Dossier viewer — sticky, lg+ only */}
              <div className="hidden lg:block border-l border-white/15">
                <div className="sticky top-20 p-6">

                  {/* Photo stack — active creator faded in, dither pattern re-seeds per creator */}
                  <div className="relative aspect-square overflow-hidden bg-[#0a0a0a]">
                    {creators.map((c, i) => (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        key={c.num}
                        src={c.photo}
                        alt={i === active ? c.name : ''}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                        style={{ opacity: i === active ? 1 : 0 }}
                      />
                    ))}
                    <PixelDitherFrame cols={40} rows={40} seed={active + 1} visible />
                  </div>

                  {/* Properties readout */}
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <p className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-white/40">
                      {creators[active].niche}
                    </p>
                    <p className="font-mono text-xs text-bb-mint shrink-0">
                      {creators[active].num}<span className="text-white/30">/12</span>
                    </p>
                  </div>
                  <div className="mt-3 border-t border-white/15">
                    {creators[active].stats.map((s) => (
                      <div
                        key={s.platform}
                        className="flex items-baseline justify-between gap-4 py-2.5 border-b border-white/10"
                      >
                        <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-white/50">
                          {s.platform}
                        </span>
                        <span className="font-mono text-sm text-white">{s.count}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Services — numbered rows over the Connect halftone ── */}
      <section className="relative py-24 talent-services-section bg-white border-t border-black/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brand/halftones/connect_16x9_gray.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          <div className="talent-services-header flex items-baseline justify-between mb-12 pb-6 border-b border-black/20">
            <span className="text-[0.65rem] tracking-[0.35em] uppercase text-black/60">What We Offer</span>
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-black/40">04 Services</span>
          </div>

          <div className="talent-services-list">
            {services.map((s, i) => (
              <div
                key={s.num}
                className={`talent-service-${i + 1} grid grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_1fr_1fr] gap-x-8 gap-y-2 py-8 border-b border-black/10 group`}
              >
                <span className="text-black/40 text-xs font-mono pt-[0.2em]">{s.num}</span>
                <h3 className="text-sm font-bold text-black uppercase tracking-wide group-hover:text-black/50 transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-sm text-black/50 leading-relaxed col-start-2 md:col-start-3 mt-1 md:mt-0">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — cool-grey block moment ── */}
      <ServiceCTA heading="Work with us." bg="bg-bb-grey" hoverText="hover:text-bb-grey" />

      <Footer />
    </main>
  )
}
