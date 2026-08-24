'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import WindowTitleBar from '@/components/ui/WindowTitleBar'
import ServiceCTA from '@/components/sections/ServiceCTA'
import ClientQuote from '@/components/sections/ClientQuote'
import { creators } from '@/lib/creators'
import { useEffect, useRef, useState } from 'react'
import { enter, winShadow } from '@/lib/y2k'


/* The brand-side offer — four campaign phases. */
const delivers = [
  {
    phase: 'Plan',
    items: [
      {
        lead: 'Strategy',
        desc: 'Set the creator mix, activation structure and creative ideation before a single message goes out. Creators are matched to category authority and audience fit, not just follower count.',
      },
    ],
  },
  {
    phase: 'Source & Secure',
    items: [
      {
        lead: 'Talent sourcing',
        desc: 'Access the right creators for the brief - matched on culture, values, content and demographics.',
      },
      {
        lead: 'Negotiating',
        desc: 'Secure terms that work for the brand and the creator - rates, usage, exclusivity and timelines handled so the partnership starts on solid ground.',
      },
      {
        lead: 'Contracting',
        desc: 'Get every partnership locked down properly - licensing, deliverables and rights agreed before anything goes live.',
      },
    ],
  },
  {
    phase: 'Deliver',
    items: [
      {
        lead: 'Briefing',
        desc: 'Equip every creator with the rules, message and visual cue - then let them add their own creative sauce.',
      },
      {
        lead: 'Management',
        desc: 'Run the whole campaign through one point of contact - deadlines, comms and logistics all handled, so you’re never juggling five relationships at once.',
      },
      {
        lead: 'Content approvals',
        desc: 'Keep the brand safe and the creator moving - every piece signed off before it goes live, no bottlenecks.',
      },
    ],
  },
  {
    phase: 'Close',
    items: [
      {
        lead: 'Reporting',
        desc: 'See the real numbers - watch time, engagement, and how the campaign fares against the creator’s own organic average.',
      },
      {
        lead: 'Payment',
        desc: 'Send the money once - we split it, pay every creator, and keep the paperwork off your desk.',
      },
    ],
  },
]

/* Every `desc` above hangs a clause off a spaced dash, and with the lines now
   balanced the break lands next to that dash often enough to matter. Binding it
   to the word before it with a non-breaking space stops a line ever opening on
   a dash; the ordinary space after it still takes the break. Presentation only
   — the copy is untouched. */
const bindDashes = (s: string) => s.replace(/ - /g, '\u00a0- ')

/* Media for the sticky panel beside the phases — one clip per phase, drawn
   from the creator reels already shipped for the homepage showcase. The 480px
   renditions are deliberate: the panel is ~390px wide at 1440 and four clips
   would otherwise be four full-size downloads for what is scene-setting.

   `handle` credits the creator whose reel is playing, so the panel footer names
   them rather than restating the phase. Required, not optional: every clip has
   one, and a reel running uncredited is the state this is here to prevent.
  */
const phaseMedia: { src: string; poster: string; handle: string }[] = [
  { src: '/videos/creators/marygrace-480.mp4', poster: '/videos/creators/marygrace.jpg', handle: '@marygracetropeano' },
  { src: '/videos/creators/lance-480.mp4', poster: '/videos/creators/lance.jpg', handle: '@lancelauren_' },
  { src: '/videos/creators/matty-480.mp4', poster: '/videos/creators/matty.jpg', handle: '@thickcutchipz' },
  { src: '/videos/creators/amarilla-480.mp4', poster: '/videos/creators/amarilla.jpg', handle: '@amarillasterling' },
]

export default function ConnectPage() {
  /* Hero contact sheet. The sheet is greyscale, and exactly one face is
     in colour at a time:
       · pointer devices — whichever thumbnail is hovered;
       · touch devices — a slow spotlight that rotates on its own.
     The rotation also feeds the readout, which names the lit creator rather
     than carrying a head count — the roster's size moves too often to state. */
  const [sheetHover, setSheetHover] = useState<number | null>(null)
  const [spotlight, setSpotlight] = useState(0)
  // Hover is a desktop affordance only — on touch, onMouseEnter fires on tap and
  // then sticks, which would strand the spotlight. Resolved after mount so SSR
  // and the first client render agree.
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches)

    // JS-driven motion — the CSS reduced-motion guard can't reach it, so gate
    // here. Without it the spotlight simply rests on the first creator.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setSpotlight((i) => (i + 1) % creators.length), 3200)
    return () => clearInterval(id)
  }, [])

  // Who the readout describes, and which face carries colour.
  const lit = sheetHover ?? spotlight

  /* Sticky media panel — the phase whose block is crossing the middle of
     the viewport is the one the panel shows. The rootMargin collapses the
     viewport to a thin band at its centre, so exactly one phase qualifies at a
     time and the panel never flickers between two. */
  const [activePhase, setActivePhase] = useState(0)
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([])
  const mediaRefs = useRef<(HTMLVideoElement | null)[]>([])
  const mobileMediaRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const i = phaseRefs.current.indexOf(entry.target as HTMLDivElement)
          if (i !== -1) setActivePhase(i)
        }
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    phaseRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  /* Only the visible clip plays — four looping videos behind an opacity fade
     would otherwise all decode at once for no visual gain.

     Both sets are in the DOM at every width: the sticky desktop panel and the
     inline mobile clips are each hidden by a breakpoint utility, not unmounted.
     A display:none <video> will still play if asked, so `offsetParent` decides
     which of the two copies of the same clip is the one actually on screen. */
  useEffect(() => {
    for (const refs of [mediaRefs, mobileMediaRefs]) {
      refs.current.forEach((v, i) => {
        if (!v) return
        if (i === activePhase && v.offsetParent !== null) void v.play().catch(() => {})
        else v.pause()
      })
    }
  }, [activePhase])

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
          {/* Left — connect.exe contact sheet: the whole roster as an "icon
              view". Greyscale with a single face in colour, which gives the grid
              a focal point instead of twelve competing ones. On mobile it becomes the top band of the hero —
              6×2 instead of 3×4 so the cells stay portrait enough to hold a face. */}
          <div
            className="flex flex-col min-h-0 overflow-hidden border-b lg:border-b-0 lg:border-r border-black/15"
            style={enter('0.18s', '0.9s')}
            onMouseLeave={canHover ? () => setSheetHover(null) : undefined}
          >
            {/* Shared OS-window chrome — every service hero device runs as an app */}
            <WindowTitleBar name="connect.exe" className="shrink-0 bg-bb-grey px-3 py-2" />

            {/* Headshot grid — 6×2 on mobile, 3×4 from lg */}
            <div className="grid grid-cols-6 grid-rows-2 lg:grid-cols-3 lg:grid-rows-4 flex-1 min-h-0 gap-px bg-black/15 border-b border-black/15">
              {creators.map((c, i) => (
                <div
                  key={c.num}
                  onMouseEnter={canHover ? () => setSheetHover(i) : undefined}
                  className="relative overflow-hidden bg-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.photo}
                    alt={`${c.name} - Bad Brain Connect creator`}
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      // Greyscale alone carries the state — the sheet used to
                      // dim unselected cells too, but stacked on top of B&W that
                      // just washes the photographs out.
                      filter: lit === i ? 'grayscale(0)' : 'grayscale(1)',
                      transition: 'filter 0.3s ease',
                    }}
                  />
                  {lit === i && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 border-2 border-bb-mint pointer-events-none"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Readout — names whichever face is lit. No head count here: the
                number moves constantly, and people sit in various states of
                representation. */}
            <div className="shrink-0 px-4 py-2 lg:py-3 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="text-label font-semibold text-black truncate">
                  {creators[lit].name}
                </p>
                {/* Non-breaking space, not a collapsed line: the headshot grid
                    above is the flex child that absorbs any height change here,
                    so a creator with no niche yet would resize the whole sheet
                    as the spotlight rotates onto them. */}
                <p className="text-label tracking-label text-black/60 uppercase mt-0.5 truncate">
                  {creators[lit].niche || '\u00A0'}
                </p>
              </div>
              <p className="text-label tracking-label uppercase text-black/60 shrink-0">
                On roster · London
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
              <p className="text-black/70 text-body-sm mb-6 max-w-[30rem]">
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
                className="inline-flex items-center gap-2 text-black/70 text-label tracking-label uppercase hover:text-bb-blue transition-colors group w-fit cursor-pointer"
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
             phase ── */}
      <section id="delivers" className="relative py-14 md:py-24 bg-bb-grey border-t border-black/10">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          <div className="flex items-baseline justify-between mb-8 md:mb-12 pb-6 border-b border-black/20">
            <span className="text-label tracking-label-wide uppercase text-black/70">
              What Connect Delivers
            </span>
            <span className="text-label tracking-label uppercase text-black/60">For Brands</span>
          </div>

          {/* A two-column grid didn't flow here: Plan carries one item against
              the others' three, and the phase numbers were right-aligned ghosts.
              Stacking the phases into a single column removes the ragged pairing
              entirely — an uneven phase just reads as a shorter row. The numbers
              move to the left edge where they scan as a sequence, and the media
              sits in a sticky panel that follows the phase you're reading. */}
          <div className="grid lg:grid-cols-[1fr_32%] lg:gap-x-16">

            {/* Phases, stacked */}
            <div>
              {delivers.map(({ phase, items }, phaseIdx) => (
                <div
                  key={phase}
                  ref={(el) => { phaseRefs.current[phaseIdx] = el }}
                  /* Stable hook for the review screenshot script, which needs to
                     frame a single phase on the mobile shot. It used to select
                     the stagger utility class, which vanished with the indent. */
                  data-phase={phaseIdx}
                  /* Flush left, all four. The phases were previously indented a
                     step further right each — a descending staircase — which
                     read as decorative once the copy inside was balanced: two
                     ragged edges arguing with each other. The separation the
                     staircase was carrying is done by the `pb-12 md:pb-20`
                     below, which is why that stays.

                     No entrance animation, deliberately. One was built here and
                     removed: the section already has motion in the sticky panel,
                     which swaps clip as you move between phases, and a second
                     moving thing next to it was doing nothing the panel wasn't
                     already doing better. Static copy beside a changing video
                     reads as intentional; both moving reads as busy. */
                  className="pb-12 md:pb-20 last:pb-0"
                >
                  {/* Media inline above each phase below lg, where there is no
                      room for a side panel. These were stills; they now run, on
                      the same rule as the desktop panel — the phase crossing the
                      middle of the viewport is the one that plays, so a phone is
                      never decoding more than one clip. `preload="none"` keeps
                      that promise on the network too: the poster carries the
                      panel until its phase is reached. */}
                  <div className="lg:hidden mb-6 border border-black/15 bg-black">
                    <WindowTitleBar
                      name={`${phase.toLowerCase().replace(/[^a-z]+/g, '-')}.mov`}
                      className="bg-bb-grey px-3 py-2"
                    />
                    <video
                      ref={(el) => { mobileMediaRefs.current[phaseIdx] = el }}
                      src={phaseMedia[phaseIdx].src}
                      poster={phaseMedia[phaseIdx].poster}
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-hidden="true"
                      className="w-full aspect-[16/10] object-cover object-[50%_30%]"
                    />
                    {/* Creator credit, same as the desktop panel's footer */}
                    <p className="px-3 py-2 bg-white border-t border-black/15 text-label tracking-label text-black/70 truncate">
                      {phaseMedia[phaseIdx].handle}
                    </p>
                  </div>

                  {/* Phase header — numeral leads, so the four phases read as a
                      sequence down the left edge */}
                  <div className="flex items-baseline gap-4 pb-2 border-b-2 border-black">
                    <span
                      aria-hidden="true"
                      className="font-display text-black/25 text-body-md tabular-nums leading-none shrink-0"
                    >
                      {String(phaseIdx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-body-sm font-bold text-black uppercase tracking-label">{phase}</h3>
                  </div>

                  {items.map(({ lead, desc }) => (
                    <div
                      key={lead}
                      className="py-4 border-b border-black/10"
                    >
                      {/* leading-[1.42] against the body-sm token's 1.6: at this
                          measure most of these run to two lines, and the looser
                          default left the second line reading as an orphan rather
                          than as part of the same block.

                          `text-balance` is the second half of that fix, and the
                          one doing the real work: the measure alone can't stop a
                          short last line, because where the break falls depends
                          on the sentence. Balancing squeezes
                          each item to its own width so both lines come out level
                          — measured across 375/768/1024/1440, every item's last
                          line went from as little as 6% of the block to 85-100%,
                          and none of the nine gained a line. `max-w-40rem` is now
                          only a ceiling for the longest item; below it balance
                          sets the width.

                          No hover treatment. Each row used to grow a blue left
                          rule and shift its text 1rem right on hover, which
                          moved the copy out from under the cursor — and once the
                          text is balanced that is worse than a slide, because a
                          width change re-breaks every line, so the whole block
                          reflowed. The rows aren't interactive, so nothing is
                          lost with it gone; the motion lives on the phase
                          block's scroll entrance now. */}
                      <p className="text-body-sm leading-[1.42] text-balance text-black/70 max-w-[40rem]">
                        <strong className="text-black font-semibold">{lead}:</strong> {bindDashes(desc)}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Sticky media panel — lg+ only. The clips are creator reels and
                don't literally depict "Contracting", so the panel earns its place
                by titling itself with the phase: it reads as a stage indicator
                that happens to carry footage, not as illustration. Only the
                on-screen clip plays. */}
            <div className="hidden lg:block [container-type:inline-size]">
              <div className="sticky top-24">
                {/* w-fit + ml-auto: the window shrinks to the clip's own width and
                    sits flush with the section's right gutter. Its width is
                    therefore driven by the media box's height below, which is what
                    keeps a 9:16 panel from running off a short viewport. */}
                <div className="border border-black/15 bg-black w-fit ml-auto" style={{ boxShadow: winShadow(6, 0.14) }}>
                  <WindowTitleBar
                    name={`${delivers[activePhase].phase.toLowerCase().replace(/[^a-z]+/g, '-')}.mov`}
                    className="bg-bb-grey px-3 py-2"
                  />
                  {/* All four clips are exactly 270×480, so a 9:16 window is an
                      exact match — no pillarbox and no crop. Sized by HEIGHT, not
                      width: aspect-ratio then derives the width, so the panel can
                      never be taller than the viewport it has to stay sticky in.
                      (A width-driven 9:16 box at this column's ~390px would stand
                      693px tall and overflow a laptop viewport.)
                      The three terms bound it from every direction: 62vh keeps it
                      inside a short viewport, 34rem stops it ballooning on a tall
                      one, and 175cqw — the column's own width expressed as the
                      height that would produce it — stops the derived width
                      outgrowing the column at the 1024px breakpoint. */}
                  <div className="relative aspect-[9/16] h-[min(62vh,34rem,175cqw)] overflow-hidden">
                    {phaseMedia.map((m, i) => (
                      <video
                        key={m.src}
                        ref={(el) => { mediaRefs.current[i] = el }}
                        src={m.src}
                        poster={m.poster}
                        muted
                        loop
                        playsInline
                        preload={i === 0 ? 'metadata' : 'none'}
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                        style={{ opacity: i === activePhase ? 1 : 0 }}
                      />
                    ))}
                  </div>
                  {/* Footer — credits the creator whose reel is playing */}
                  <div className="flex items-baseline justify-between gap-4 px-4 py-2.5 bg-white border-t border-black/15">
                    <span className="text-label tracking-label truncate text-black/70">
                      {phaseMedia[activePhase].handle}
                    </span>
                    <span className="text-label tabular-nums text-black/40 shrink-0">
                      {String(activePhase + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── Client testimonial — shared site-wide quote treatment ── */}
      <ClientQuote
        quote="Bad Brain were a pleasure to work with from start to finish. They immediately grasped what our brand was all about, as well as our strengths, weaknesses and untapped opportunities… They were also able to source an extensive and diverse range of creators in our very niche field and onboard them seamlessly."
        attribution="Jake Massey, Head of Socials - BLD BRO"
        logo={{ src: '/images/clients/bldbro.png', alt: 'BLD BRO' }}
        accent="text-bb-grey"
      />

      {/* ── CTA — cool-grey block moment ── */}
      <ServiceCTA
        heading="Bring us the brief."
        cta="Let's Talk"
        bg="bg-bb-grey"
        hoverText="hover:text-bb-grey"
      />

      <Footer />
    </main>
  )
}
