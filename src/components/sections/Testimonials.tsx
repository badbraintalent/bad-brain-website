'use client'

import React, { useEffect, useRef, useState } from 'react'

/* ── Data ─ real quotes ── */

/* The featured quote is the one with a named person, a role and a logo; the
   grid quotes below are text-only. The featured companies and the logo crawl
   are kept as disjoint sets. */
const heroTestimonial = {
  quote: "Bad Brain thinks differently. Sharp creative, sharp strategy, with an expert’s read on the creator economy that shows in everything they make. Their focus on Social Entertainment is exactly the kind of thinking we want in the room.",
  name: 'Aaron Brooks',
  role: 'CEO',
  company: 'Vamp',
  logo: '/images/clients/vamp.svg',
}

/* `logo` puts the mark alongside the name on a grid quote. Omit it and the
   footer falls back to the name alone. */
const gridTestimonials: { quote: string; company: string; logo?: string }[] = [
  {
    quote: "In the space of three months, Bad Brain helped us build a bespoke UGC platform on the other side of the world, launching a new brand to 15 international markets - and doing so to the highest possible standard. The type of feat I only thought possible through a large agency!",
    company: 'The Warren',
    logo: '/images/clients/the-warren.png',
  },
  {
    quote: "Bad Brain combines creator-side experience and creative strategy with a strong grasp of data, attribution, and commercial value. That blend of creativity and sharp commercial thinking is rare and really stood out.",
    company: 'Awin',
    logo: '/images/clients/awin.png',
  },
  {
    quote: "Bad Brain immediately grasped what our brand was all about, as well as our strengths, weaknesses and untapped opportunities. Communication was open and honest from the get-go, which was a refreshing change from working with other agencies.",
    company: 'Canadian Bureau for International Education',
    logo: '/images/clients/learn-canadian.png',
  },
]

/* Grid-quote marks. Smaller than the marquee's box because these sit in a
   footer line beside the company name rather than carrying a band on their
   own, but the same contain-fit reasoning: Awin is 2.2:1 and The Warren 4.3:1,
   so a shared height would make one of them twice the other's mass. */
const GRID_LOGO_MAX_W = 92
const GRID_LOGO_MAX_H = 34

/* Real client logos, rendered monochrome black to sit quietly on the blue
   band (Smoking Gun's red would otherwise fight it); hover flips to white.

   Sized by contain-fitting one shared box, not to a common height. These
   wordmarks run from 0.7:1 (BLDBRO, 168x240) to 7.9:1 (Smoking Gun, 410x52),
   so matching their heights was the wrong axis: it put Smoking Gun at 205px
   wide against BLDBRO's 36px. A max-width/max-height pair with both
   dimensions auto caps the wide marks on width and the tall ones on height,
   so no single logo dominates the crawl. */
const LOGO_MAX_W = 150
const LOGO_MAX_H = 68

const clients = [
  { company: 'Smoking Gun', src: '/images/clients/smoking-gun.png' },
  { company: 'BLDBRO', src: '/images/clients/bldbro.png' },
  { company: 'Learn Canadian', src: '/images/clients/learn-canadian.png' },
]

// Repeated so the track is wide enough; the render doubles it again into
// two identical halves for the seamless -50% loop.
const allClients = [...clients, ...clients]

/* ── Component ── */

const Testimonials = () => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null)
  const [marqueeInView, setMarqueeInView] = useState(false)

  // Run the marquee only while it's on-screen — an infinite compositor
  // animation otherwise ticks for the whole session.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const io = new IntersectionObserver(
      ([entry]) => setMarqueeInView(entry.isIntersecting),
      { threshold: 0 },
    )
    io.observe(track)
    return () => io.disconnect()
  }, [])

  // Slow the logo marquee to half speed on hover. Driven via WAAPI so the speed
  // changes seamlessly — playbackRate preserves the current position, whereas
  // swapping animation-duration would snap the scroll to a new offset.
  const setMarqueeRate = (rate: number) => {
    trackRef.current?.getAnimations().forEach((a) => {
      a.playbackRate = rate
    })
  }

  return (
    <section className="testimonials-section bg-bb-grey text-black border-t border-black">
      <div className="testimonials-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-32">

        {/* ── Heading — sticker title over the flat grey block ── */}
        <div className="testimonial-heading mb-10 md:mb-28">
          <h2
            className="title-outline text-right text-display-2"
          >
We didn&rsquo;t<br />write these.
          </h2>
        </div>

        {/* ── Hero testimonial ── */}
        <div className="testimonial-hero relative mb-10 md:mb-28 border-t border-black/30 pt-8 md:pt-16">
          {/* Giant decorative quotation mark */}
          <span
            className="absolute select-none pointer-events-none text-black/10 font-display text-hero leading-bleed"
            style={{ top: '-0.1em', left: '-0.03em' }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote className="relative">
            <p
              className="text-black max-w-4xl text-display-3 leading-[1.3]"
            >
              {heroTestimonial.quote}
            </p>
            {/* Logo carries the company name, so it isn't repeated in type —
                the attribution beside it is the person, which is what the
                supplied text adds. */}
            <footer className="mt-8 md:mt-10 flex items-center gap-4 md:gap-5 justify-end text-black/70">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroTestimonial.logo}
                alt={heroTestimonial.company}
                draggable={false}
                className="h-8 md:h-10 w-auto shrink-0"
              />
              <span aria-hidden="true" className="w-px h-8 md:h-10 bg-black/25 shrink-0" />
              <div className="text-body-sm">
                <span className="text-black font-medium block">{heroTestimonial.name}</span>
                <span className="text-black/60">{heroTestimonial.role}</span>
              </div>
            </footer>
          </blockquote>
        </div>

        {/* ── Three-column grid ── */}
        <div className="grid md:grid-cols-3 gap-0 border-t border-black/30">
          {gridTestimonials.map((t, i) => (
            <div
              key={i}
              className={`testimonial-col-${i + 1} py-8 md:py-12 px-0 md:px-8 ${
                i === 0 ? '' : 'border-t md:border-t-0 md:border-l'
              } border-black/30`}
            >
              <blockquote className="h-full flex flex-col justify-between">
                <p className="text-black/80 text-body-md mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                {/* min-height matches the logo box so a quote with no mark
                    keeps its name on the same baseline as the ones that have
                    one — otherwise the odd column sits a few px low. */}
                <footer
                  className="flex items-center gap-3 text-black/70"
                  style={{ minHeight: GRID_LOGO_MAX_H }}
                >
                  {t.logo && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={t.logo}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="shrink-0"
                        style={{
                          maxWidth: GRID_LOGO_MAX_W,
                          maxHeight: GRID_LOGO_MAX_H,
                          width: 'auto',
                          height: 'auto',
                          // Flattened to black for the same reason as the
                          // marquee: these marks arrive in their own inks and
                          // the blue band can only take one of them.
                          filter: 'brightness(0)',
                          opacity: 0.8,
                        }}
                      />
                      <span aria-hidden="true" className="w-px self-stretch bg-black/20" />
                    </>
                  )}
                  <div className="text-label">
                    <span className="text-black font-medium block">{t.company}</span>
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>

        {/* ── Logo marquee ── */}
        <div
          className="testimonial-marquee-wrapper mt-10 md:mt-28 border-t border-black/30 pt-8 md:pt-10 overflow-hidden"
          onMouseEnter={() => setMarqueeRate(0.5)}
          onMouseLeave={() => setMarqueeRate(1)}
        >
          <div
            ref={trackRef}
            className="testimonial-marquee-track flex items-center gap-16 whitespace-nowrap"
            style={{ animationPlayState: marqueeInView ? 'running' : 'paused' }}
          >
            {/* Doubled for seamless loop */}
            {[...allClients, ...allClients].map((client, i) => (
              <div
                key={i}
                className="flex items-center flex-shrink-0"
                onMouseEnter={() => setHoveredLogo(i)}
                onMouseLeave={() => setHoveredLogo(null)}
              >
                {/* Plain <img>: the marquee contain-fits logos to a box with
                    both dimensions auto, which next/image can't express without
                    the width={0} sizes escape hatch. Sources are pre-sized to
                    2x or better at these rendered sizes instead. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.src}
                  alt={client.company}
                  draggable={false}
                  style={{
                    maxWidth: LOGO_MAX_W,
                    maxHeight: LOGO_MAX_H,
                    width: 'auto',
                    height: 'auto',
                    filter: hoveredLogo === i ? 'brightness(0) invert(1)' : 'brightness(0)',
                    opacity: hoveredLogo === i ? 1 : 0.75,
                    transform: hoveredLogo === i ? 'scale(1.12)' : 'scale(1)',
                    transition: 'transform 160ms steps(3), filter 140ms steps(2), opacity 140ms steps(2)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Testimonials
