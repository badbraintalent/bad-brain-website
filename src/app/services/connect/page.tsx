'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import PixelDitherFrame from '@/components/ui/PixelDitherFrame'
import WindowTitleBar from '@/components/ui/WindowTitleBar'
import ServiceCTA from '@/components/sections/ServiceCTA'
import ClientQuote from '@/components/sections/ClientQuote'
import { useEffect, useRef, useState } from 'react'
import { enter, winShadow } from '@/lib/y2k'


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
      { platform: 'Newsletter Readers', count: '2,500' },
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
      { platform: 'Spotify Listeners', count: '350,000' },
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

/* The brand-side offer — four campaign phases, per client copy v1.3. */
const delivers = [
  {
    phase: 'Plan',
    when: 'Before the brief goes out',
    items: [
      {
        lead: 'Strategy',
        desc: 'Set the creator mix, activation structure and creative ideation before a single message goes out. Creators are matched to category authority and audience fit, not just follower count.',
      },
    ],
  },
  {
    phase: 'Source & Secure',
    when: 'Creator and contract',
    items: [
      {
        lead: 'Talent sourcing',
        desc: 'Access the right creators for the brief — matched on culture, values, content and demographics.',
      },
      {
        lead: 'Negotiating',
        desc: 'Secure terms that work for the brand and the creator — rates, usage, exclusivity and timelines handled so the partnership starts on solid ground.',
      },
      {
        lead: 'Contracting',
        desc: 'Get every partnership locked down properly — licensing, deliverables and rights agreed before anything goes live.',
      },
    ],
  },
  {
    phase: 'Deliver',
    when: 'On the ground',
    items: [
      {
        lead: 'Briefing',
        desc: 'Equip every creator with the rules, message and visual cue — then let them add their own creative sauce.',
      },
      {
        lead: 'Management',
        desc: 'Run the whole campaign through one point of contact — deadlines, comms and logistics all handled, so you’re never juggling five relationships at once.',
      },
      {
        lead: 'Content approvals',
        desc: 'Keep the brand safe and the creator moving — every piece signed off before it goes live, no bottlenecks.',
      },
    ],
  },
  {
    phase: 'Close',
    when: 'Wrapped and reported',
    items: [
      {
        lead: 'Reporting',
        desc: 'See the real numbers — watch time, engagement, and how the campaign fares against the creator’s own organic average.',
      },
      {
        lead: 'Payment',
        desc: 'Send the money once — we split it, pay every creator, and keep the paperwork off your desk.',
      },
    ],
  },
]

/* The three levels a creator relationship can sit at, per client copy v1.3. */
const tiers = [
  {
    name: 'Verified',
    desc: 'The widest tier. Creators across every niche and platform, brought in and matched project by project — whatever the campaign needs, there’s a fit in this pool.',
  },
  {
    name: 'Connected',
    desc: 'The tier we manage hands-on. Every deal, every pitch, run through us — so you get creators we already know, with fewer surprises and a stronger match to the brief.',
  },
  {
    name: 'Partnered',
    desc: 'The deepest tier. We act as a genuine business partner here, not just a manager — the most accountable relationships we have, built for campaigns where the stakes are highest.',
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
          maxHeight: '900px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateRows: '1fr',
        }}
      >
        {/* ── Video panel + copy column (fills the hero) ── */}
        <div
          className="grid min-h-0 overflow-hidden grid-cols-1 grid-rows-[32%_1fr] lg:grid-cols-[38%_1fr] lg:grid-rows-none w-full max-w-[1800px] mx-auto"
        >
          {/* Left — connect.exe contact sheet: the whole roster as a static
              "icon view" (the roster.exe browser below is the detail view,
              and owns the only slideshow on the page). On mobile it becomes the
              top band of the hero — 6×2 instead of 3×4 so the cells stay
              portrait enough to hold a face. */}
          <div
            className="flex flex-col min-h-0 overflow-hidden border-b lg:border-b-0 lg:border-r border-black/15"
            style={enter('0.18s', '0.9s')}
            onMouseLeave={() => setSheetHover(null)}
          >
            {/* Shared OS-window chrome — every service hero device runs as an app */}
            <WindowTitleBar name="connect.exe" className="shrink-0 bg-bb-grey px-3 py-2" />

            {/* Headshot grid — 6×2 on mobile, 3×4 from lg */}
            <div className="grid grid-cols-6 grid-rows-2 lg:grid-cols-3 lg:grid-rows-4 flex-1 min-h-0 gap-px bg-black/15 border-b border-black/15">
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
            <div className="shrink-0 px-4 py-2 lg:py-3 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="text-label font-semibold text-black truncate">
                  {sheetHover !== null ? creators[sheetHover].name : '12 creators'}
                </p>
                <p className="text-label tracking-label text-black/50 uppercase mt-0.5 truncate">
                  {sheetHover !== null ? creators[sheetHover].niche : 'On roster · London'}
                </p>
              </div>
              <p className="text-label tracking-label tabular-nums text-black/40 shrink-0">
                {sheetHover !== null ? `${creators[sheetHover].num}/12` : '12/12'}
              </p>
            </div>
          </div>

          {/* Right — copy column, split into headline + body */}
          <div className="flex flex-col min-h-0 min-w-0">

            {/* Upper cell: headline, anchored to bottom. Container-typed so the
                headline can be sized against this column rather than the viewport. */}
            <div className="relative flex-1 flex flex-col justify-end px-6 sm:px-10 lg:px-16 pt-10 pb-6 lg:pb-10 [container-type:inline-size]">
              {/* Mobile-only halftone — fills the space the hidden panels leave */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/halftones/connect_16x9_gray.png"
                alt=""
                aria-hidden="true"
                className="lg:hidden absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              />
              {/* Headline + sub-brand mark — same lockup slot on every service hero.
                  The mark stacks above the statement so the headline gets the full
                  column; cqi sizes it to the column, so the longest line ("creators.")
                  lands flush with the right edge at every width. */}
              <div className="relative flex flex-col items-start gap-5 lg:gap-7">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/brand/marks/Connect.svg"
                  alt="Bad Brain Connect"
                  className="shrink-0 w-[8rem] lg:w-[10rem] h-auto"
                  style={enter('0.26s')}
                />
                <h1
                  className="uppercase text-black leading-hero"
                  style={{ fontSize: 'clamp(1.5rem, 11.4cqi, 7rem)' }}
                >
                  <span className="block" style={enter('0.32s')}>We know</span>
                  <span className="block" style={enter('0.44s')}>creators.</span>
                </h1>
              </div>
            </div>

            {/* Divider — horizontal line across the copy column */}
            <div className="border-t border-black/15" style={enter('0.55s', '0.5s')} />

            {/* Lower cell: copy + CTA */}
            <div
              className="px-6 sm:px-10 lg:px-16 py-8 pb-10 lg:pb-hero-bleed"
              style={{ ...enter('0.65s') }}
            >
              <p className="text-black/60 text-body-sm mb-6 max-w-[30rem]">
                Over a decade in this industry has shown us the same thing again and again: the
                numbers are always best when the campaign lands the brand brief and still protects
                the creator&rsquo;s own style. That&rsquo;s a fine line to walk, but we know the
                channel well enough to get it right.
              </p>
              <a
                href="#delivers"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#delivers')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 text-black/60 text-label tracking-label uppercase hover:text-bb-blue transition-colors group w-fit cursor-pointer"
              >
                <span className="border-b border-black/20 pb-0.5 group-hover:border-bb-blue transition-colors">
                  See the breakdown
                </span>
                <span className="arrow-hop inline-block">→</span>
              </a>
            </div>

          </div>
        </div>

      </section>


      {/* ── What Connect delivers — the brand-side offer, grouped by campaign
             phase (client copy v1.3) ── */}
      <section id="delivers" className="relative py-14 md:py-24 bg-bb-fill border-t border-black/10">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          <div className="flex items-baseline justify-between mb-8 md:mb-12 pb-6 border-b border-black/20">
            <span className="text-label tracking-label-wide uppercase text-black/60">
              What Connect Delivers
            </span>
            <span className="text-label tracking-label uppercase text-black/40">For Brands</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-10 md:gap-y-16">
            {delivers.map(({ phase, when, items }, phaseIdx) => (
              <div key={phase} className="relative">

                {/* Phase header — heavy rule in brand blue */}
                <div className="relative flex items-baseline gap-4 pb-2 border-b-2 border-bb-blue">
                  <h3 className="text-body-sm font-bold text-black uppercase tracking-label">{phase}</h3>
                  <span className="text-label tracking-label uppercase text-black/40">{when}</span>

                  {/* Ghost phase number — sits on the rule, rising into the empty
                      space above it. lg+ only: below that the header row is too
                      narrow and the phase labels run into it. */}
                  <span
                    aria-hidden="true"
                    className="hidden lg:block pointer-events-none select-none absolute right-0 bottom-[3px] font-display text-black/[0.08] text-display-2 leading-bleed tabular-nums"
                  >
                    {String(phaseIdx + 1).padStart(2, '0')}
                  </span>
                </div>

                {items.map(({ lead, desc }) => (
                  <div
                    key={lead}
                    className="group/row py-4 border-b border-black/10 transition-colors duration-150"
                  >
                    <p className="text-body-sm text-black/60 border-l-2 border-transparent pl-0 group-hover/row:border-bb-blue group-hover/row:pl-4 transition-all duration-200">
                      <strong className="text-black font-semibold">{lead}:</strong> {desc}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Creator roster — "roster.exe", a photo-based talent browser:
             index list on the left, sticky dossier viewer on the right ── */}
      <section id="roster" className="bg-black py-14 md:py-24 talent-roster-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="talent-roster-header flex items-baseline justify-between mb-8 md:mb-10 pb-6 border-b border-white/20">
            <span className="text-label tracking-label-wide uppercase text-white/60">Our Creators</span>
            <span className="text-label tracking-label uppercase text-white/40">
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
                      className={`hidden lg:block text-label tabular-nums transition-colors duration-200 ${
                        active === i ? 'text-bb-mint' : 'text-white/40'
                      }`}
                    >
                      {creator.num}
                    </span>

                    <div className="min-w-0">
                      <h3
                        className={`font-display uppercase lg:truncate text-display-4 transition-colors duration-200 ${
                          active === i ? 'lg:text-bb-mint text-white' : 'text-white'
                        }`}
                      >
                        {creator.name}
                      </h3>
                      <p className="text-label tracking-label uppercase text-white/40 mt-1.5 truncate">
                        {creator.niche}
                      </p>
                      {/* Inline stats — mobile only (the viewer shows them on lg) */}
                      <p className="lg:hidden text-label tracking-label uppercase text-white/60 mt-1.5">
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
                  <div className="relative aspect-square overflow-hidden bg-black">
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
                    <p className="text-label tracking-label uppercase text-white/40">
                      {creators[active].niche}
                    </p>
                    <p className="text-label tabular-nums text-bb-mint shrink-0">
                      {creators[active].num}<span className="text-white/30">/12</span>
                    </p>
                  </div>
                  <div className="mt-3 border-t border-white/15">
                    {creators[active].stats.map((s) => (
                      <div
                        key={s.platform}
                        className="flex items-baseline justify-between gap-4 py-2.5 border-b border-white/10"
                      >
                        <span className="text-label tracking-label uppercase text-white/50">
                          {s.platform}
                        </span>
                        <span className="text-body-sm tabular-nums text-white">{s.count}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Roster sign-up — the only creator-facing CTA on the page */}
          <div className="mt-10 pt-8 border-t border-white/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <p className="text-white/60 text-body-sm">
              Are you a creator? Ready to join the roster?
            </p>
            <a
              href="/contact"
              className="btn-phys border border-white/40 px-7 py-3 text-label uppercase tracking-label text-white hover:bg-bb-mint hover:text-black hover:border-bb-mint transition-colors w-fit"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </section>



      {/* ── Tiers — the roster model, run as an OS window so it reads as a
             sibling of roster.exe above rather than a plain card grid ── */}
      <section className="py-14 md:py-24 bg-bb-fill border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="flex items-baseline justify-between mb-8 pb-6 border-b border-black/20">
            <span className="text-label tracking-label-wide uppercase text-black/60">
              How We Work With Creators
            </span>
            <span className="text-label tracking-label uppercase text-black/40">
              The Bad Brain Roster
            </span>
          </div>

          <p className="text-black/60 text-body-md mb-10 max-w-2xl">
            Every creator relationship sits at a defined level — so you always know what
            you&rsquo;re working with.
          </p>

          <div className="border border-black bg-white" style={{ boxShadow: winShadow(6, 0.14) }}>
            <WindowTitleBar name="tiers.exe" className="bg-bb-grey px-3 py-2" />

            {/* Three panes side by side — column view rather than a row list */}
            <div className="grid md:grid-cols-3 border-t border-black/15">
              {tiers.map(({ name, desc }, i) => (
                <div
                  key={name}
                  className="flex flex-col border-b md:border-b-0 md:border-r last:border-b-0 md:last:border-r-0 border-black/15 hover:bg-bb-mint/25 transition-colors"
                >
                  {/* Pane header strip */}
                  <div className="flex items-baseline gap-3 px-6 py-3 border-b border-black/15 bg-black/[0.03]">
                    <span className="text-label text-black/35">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-body-sm font-bold text-black uppercase tracking-label">
                      {name}
                    </h3>
                  </div>
                  <p className="text-body-sm text-black/60 px-6 py-6">{desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Client testimonial — shared site-wide quote treatment ── */}
      <ClientQuote
        quote="Bad Brain were a pleasure to work with from start to finish. They immediately grasped what our brand was all about, as well as our strengths, weaknesses and untapped opportunities… They were also able to source an extensive and diverse range of creators in our very niche field and onboard them seamlessly."
        attribution="Jake Massey, Head of Socials — BLD BRO"
        accent="text-bb-grey"
      />

      {/* ── CTA — cool-grey block moment ── */}
      <ServiceCTA
        heading="Bring us the brief."
        cta="Let's talk"
        bg="bg-bb-grey"
        hoverText="hover:text-bb-grey"
      />

      <Footer />
    </main>
  )
}
