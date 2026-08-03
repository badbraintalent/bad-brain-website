'use client'

import React, { useEffect, useRef, useState } from 'react'

/* ── Data ─ real client quotes, supplied 2026-07-28 ── */

const heroTestimonial = {
  quote: "The true mark of an exceptional operator is the ability to turn complexity into clarity. Creator marketing is layered, fast-moving and nuanced — yet Bad Brain makes it feel structured and actionable.",
  company: 'Vamp',
}

const gridTestimonials = [
  {
    quote: "In the space of three months, Bad Brain helped us build a bespoke UGC platform on the other side of the world, launching a new brand to 15 international markets — and doing so to the highest possible standard. The type of feat I only thought possible through a large agency!",
    company: 'Crozier Consulting',
  },
  {
    quote: "Bad Brain combines creator-side experience and creative strategy with a strong grasp of data, attribution, and commercial value. That blend of creativity and sharp commercial thinking is rare and really stood out.",
    company: 'Awin',
  },
  {
    quote: "Bad Brain immediately grasped what our brand was all about, as well as our strengths, weaknesses and untapped opportunities. Communication was open and honest from the get-go, which was a refreshing change from working with other agencies.",
    company: 'Canadian Bureau for International Education',
  },
]

/* Real client logos, rendered monochrome black to sit quietly on the blue
   band (Smoking Gun's red would otherwise fight it); hover flips to white.
   Heights are per-logo since the wordmarks have very different aspects. */
const clients = [
  { company: 'Smoking Gun', src: '/images/clients/smoking-gun.png', height: 26 },
  { company: 'BLDBRO', src: '/images/clients/bldbro.png', height: 52 },
  { company: 'Learn Canadian', src: '/images/clients/learn-canadian.png', height: 34 },
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
    <section className="testimonials-section bg-bb-blue text-black border-t border-black">
      <div className="testimonials-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-32">

        {/* ── Heading — sticker title over the flat blue block ── */}
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
            <footer className="mt-8 md:mt-10 flex items-center gap-3 justify-end text-black/60">
              <div className="text-body-sm">
                <span className="text-black font-medium">{heroTestimonial.company}</span>
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
                <footer className="flex items-center gap-3 text-black/60">
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
                {/* Plain <img>: the marquee sizes logos by height with width
                    auto, which next/image can't express without the width={0}
                    sizes escape hatch. Sources are pre-sized to 2x instead. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.src}
                  alt={client.company}
                  draggable={false}
                  style={{
                    height: client.height,
                    width: 'auto',
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
