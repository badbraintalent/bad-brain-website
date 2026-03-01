'use client'

import React from 'react'

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

const AurexLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
    <polygon points="14,2 25.4,8.5 25.4,19.5 14,26 2.6,19.5 2.6,8.5" />
    <line x1="14" y1="2" x2="14" y2="26" />
    <line x1="2.6" y1="8.5" x2="25.4" y2="19.5" />
    <line x1="25.4" y1="8.5" x2="2.6" y2="19.5" />
  </svg>
)

const KineticLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M8 4V24M8 14L20 4M8 14L20 24" />
  </svg>
)

const PrismLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="5" y="5" width="13" height="13" transform="rotate(45 11.5 11.5)" />
    <rect x="10" y="10" width="13" height="13" transform="rotate(45 16.5 16.5)" />
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

const allClients = [
  { company: 'NOVA', Logo: NovaLogo },
  { company: 'MERIDIAN', Logo: MeridianLogo },
  { company: 'FLUX', Logo: FluxLogo },
  { company: 'AUREX', Logo: AurexLogo },
  { company: 'KINETIC', Logo: KineticLogo },
  { company: 'PRISM', Logo: PrismLogo },
]

/* ── Component ── */

const Testimonials = () => {
  return (
    <section className="testimonials-section bg-[#1a1a1a] text-white border-t border-[#333]">
      <div className="testimonials-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">

        {/* ── Heading ── */}
        <div className="testimonial-heading mb-20 md:mb-28">
          <h2
            className="text-right text-[#c0c0c0]"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            What they<br />say.
          </h2>
        </div>

        {/* ── Hero testimonial ── */}
        <div className="testimonial-hero relative mb-20 md:mb-28 border-t border-[#333] pt-12 md:pt-16">
          {/* Giant decorative quotation mark */}
          <span
            className="absolute select-none pointer-events-none text-[#282828]"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
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
              className="text-[#e5e5e5] max-w-4xl"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
                lineHeight: 1.3,
                fontWeight: 400,
                letterSpacing: '-0.01em',
              }}
            >
              {heroTestimonial.quote}
            </p>
            <footer className="mt-8 md:mt-10 flex items-center gap-3 justify-end text-[#737373]">
              <heroTestimonial.Logo />
              <div className="text-sm">
                <span className="text-[#a3a3a3] font-medium">{heroTestimonial.name}</span>
                <span className="mx-2">/</span>
                <span>{heroTestimonial.role}, {heroTestimonial.company}</span>
              </div>
            </footer>
          </blockquote>
        </div>

        {/* ── Three-column grid ── */}
        <div className="grid md:grid-cols-3 gap-0 border-t border-[#333]">
          {gridTestimonials.map((t, i) => (
            <div
              key={i}
              className={`testimonial-col-${i + 1} py-10 md:py-12 px-0 md:px-8 ${
                i === 0 ? '' : 'border-t md:border-t-0 md:border-l'
              } border-[#333]`}
            >
              <blockquote className="h-full flex flex-col justify-between">
                <p className="text-[#a3a3a3] text-base leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-3 text-[#737373]">
                  <t.Logo />
                  <div className="text-xs">
                    <span className="text-[#a3a3a3] font-medium block">{t.name}</span>
                    <span>{t.role}, {t.company}</span>
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>

        {/* ── Logo marquee ── */}
        <div className="testimonial-marquee-wrapper mt-20 md:mt-28 border-t border-[#333] pt-10 overflow-hidden">
          <div className="testimonial-marquee-track flex items-center gap-16 whitespace-nowrap">
            {/* Doubled for seamless loop */}
            {[...allClients, ...allClients].map((client, i) => (
              <div key={i} className="flex items-center gap-3 text-[#555] flex-shrink-0">
                <client.Logo />
                <span className="text-sm tracking-widest font-medium">{client.company}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Testimonials
