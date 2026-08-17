/* Shared client-testimonial block — one visual language for every quote on the
   site outside the homepage `Testimonials` grid: black band, oversized display
   quotation mark in the accent colour, centred quote, hairline rule, attribution
   in mono caps. Pages differ only in copy and accent colour. */
const ClientQuote = ({
  quote,
  attribution,
  /** Accent colour utility for the quote mark + rule, e.g. "text-bb-mint" */
  accent = 'text-bb-mint',
}: {
  quote: string
  /** e.g. "Sarah Twyman, Head of Consumer — Smoking Gun" */
  attribution: string
  accent?: string
}) => (
  <section className="bg-black py-14 md:py-24 border-t border-black overflow-clip">
    <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
      <span
        aria-hidden="true"
        className={`block select-none opacity-60 font-display text-display-1 leading-[0.6] ${accent}`}
      >
        &ldquo;
      </span>
      <blockquote className="mt-6">
        <p
          className="text-white/80 text-body-lg"
        >
          {quote}
        </p>
        <div className={`mx-auto mt-8 mb-6 h-0.5 w-10 bg-current ${accent}`} />
        <footer className="text-label tracking-label uppercase text-white/40">
          {attribution}
        </footer>
      </blockquote>
    </div>
  </section>
)

export default ClientQuote
