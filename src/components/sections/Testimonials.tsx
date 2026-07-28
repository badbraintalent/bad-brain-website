'use client'

import React, { useEffect, useRef, useState } from 'react'

/* ── Generic but realistic SVG logo marks ── */

const NovaLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M14 3L25 22H3L14 3Z" />
    <path d="M14 25L3 6H25L14 25Z" />
  </svg>
)

const MeridianLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M4 7H24M4 14H24M4 21H24" />
    <path d="M7 7L14 14L21 7" />
  </svg>
)

const FluxLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="14" cy="14" r="11" />
    <circle cx="14" cy="14" r="6" />
    <circle cx="14" cy="14" r="1.5" fill="currentColor" />
  </svg>
)

const KineticLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M8 4V24M8 14L20 4M8 14L20 24" />
  </svg>
)

/* ── Data ── */

const heroTestimonial = {
  quote: "Working with Bad Brain completely changed how we approach creator partnerships. The results weren\u2019t incremental\u2009\u2014\u2009they were transformative.",
  name: 'Sarah Chen',
  role: 'VP Marketing',
  company: 'NOVA',
  Logo: NovaLogo,
}

const gridTestimonials = [
  {
    quote: "They understand the intersection of culture and commerce better than anyone we\u2019ve worked with. A genuine strategic partner.",
    name: 'Marcus Webb',
    role: 'CEO',
    company: 'MERIDIAN',
    Logo: MeridianLogo,
  },
  {
    quote: "Fast, strategic, and genuinely creative. A rare combination in this space. They delivered on every brief.",
    name: 'Priya Patel',
    role: 'Director of Brand',
    company: 'FLUX',
    Logo: FluxLogo,
  },
  {
    quote: "The team\u2019s deep knowledge of the creator economy is unmatched. They\u2019ve become an extension of our own team.",
    name: 'Jamie Torres',
    role: 'CMO',
    company: 'KINETIC',
    Logo: KineticLogo,
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
      <div className="testimonials-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">

        {/* ── Heading — sticker title over the flat blue block ── */}
        <div className="testimonial-heading mb-20 md:mb-28">
          <h2
            className="title-outline text-right"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              lineHeight: 1.2,
            }}
          >
            What they<br />say.
          </h2>
        </div>

        {/* ── Hero testimonial ── */}
        <div className="testimonial-hero relative mb-20 md:mb-28 border-t border-black/30 pt-12 md:pt-16">
          {/* Giant decorative quotation mark */}
          <span
            className="absolute select-none pointer-events-none text-black/10"
            style={{
              fontFamily: 'var(--font-gravity), system-ui, sans-serif',
              fontSize: 'clamp(8rem, 18vw, 14rem)',
              lineHeight: 0.8,
              top: '-0.1em',
              left: '-0.03em',
            }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote className="relative">
            <p
              className="text-black max-w-4xl"
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
              }}
            >
              {heroTestimonial.quote}
            </p>
            <footer className="mt-8 md:mt-10 flex items-center gap-3 justify-end text-black/60">
              <heroTestimonial.Logo />
              <div className="text-sm">
                <span className="text-black font-medium">{heroTestimonial.name}</span>
                <span className="mx-2">/</span>
                <span>{heroTestimonial.role}, {heroTestimonial.company}</span>
              </div>
            </footer>
          </blockquote>
        </div>

        {/* ── Three-column grid ── */}
        <div className="grid md:grid-cols-3 gap-0 border-t border-black/30">
          {gridTestimonials.map((t, i) => (
            <div
              key={i}
              className={`testimonial-col-${i + 1} py-10 md:py-12 px-0 md:px-8 ${
                i === 0 ? '' : 'border-t md:border-t-0 md:border-l'
              } border-black/30`}
            >
              <blockquote className="h-full flex flex-col justify-between">
                <p className="text-black/80 text-base leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-3 text-black/60">
                  <t.Logo />
                  <div className="text-xs">
                    <span className="text-black font-medium block">{t.name}</span>
                    <span>{t.role}, {t.company}</span>
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>

        {/* ── Logo marquee ── */}
        <div
          className="testimonial-marquee-wrapper mt-20 md:mt-28 border-t border-black/30 pt-10 overflow-hidden"
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
