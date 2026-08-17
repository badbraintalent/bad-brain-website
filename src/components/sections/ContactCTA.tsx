import ContactForm from '@/components/ui/ContactForm'

/* The homepage's closing contact band: a massive heading over a halftone
   logomark field, with the capture form beneath it.

   The form itself lives in ContactForm — the contact page's hero renders its
   own compact copy above the fold, so the two can't share a section.
   The `showHeading` prop this component used to carry went with that change:
   the contact page no longer renders this section at all, and the homepage
   always wants the heading. */
const ContactCTA = () => (
  <section className="bg-white border-t border-black/10">
    {/* Top area — massive heading over a halftone logomark field */}
    <div className="relative overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/brand/halftones/bb_blue_1600.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute -right-8 top-1/2 -translate-y-1/2 h-[140%] w-auto pointer-events-none"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-24 pb-10 md:pb-16">
        <h2
          // One line from sm up; below that it wraps to two lines so the
          // type can stay large rather than shrinking to fit.
          className="text-black sm:whitespace-nowrap text-display-2 leading-hero"
        >
          Come and say hello.
        </h2>
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-black/10" />

    <ContactForm className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16" />

    {/* Bottom border */}
    <div className="border-t border-black/10" />

    {/* Subtle sign-off line */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
      <span className="text-label text-black/70 uppercase tracking-label-wide">
        Bad Brain Media
      </span>
      <span className="text-label text-black/70">London</span>
    </div>
  </section>
)

export default ContactCTA
