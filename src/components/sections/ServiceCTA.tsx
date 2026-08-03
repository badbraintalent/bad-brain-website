import type { ReactNode } from 'react'

/* End-of-page colour-block CTA shared by all four service pages — each page
   differs only in block colour and heading copy. */
const ServiceCTA = ({
  heading,
  bg,
  hoverText,
  cta = 'Get in touch',
}: {
  heading: ReactNode
  /** Block colour utility, e.g. "bg-bb-mint" */
  bg: string
  /** Button hover text colour utility matching the block, e.g. "hover:text-bb-mint" */
  hoverText: string
  /** Button label — defaults to "Get in touch" where the client supplied none */
  cta?: string
}) => (
  <section className={`${bg} py-12 md:py-20 border-t border-black`}>
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      {/* sm+: the button's bottom edge sits on the heading's baseline — items-end
          aligns the boxes, then the margin lifts the button by the heading's
          descender space (~0.34 × its font size, tracking the same clamp). */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10">
        <div>
          <h2 className="text-black text-display-2">
            {heading}
          </h2>
        </div>

        <a
          href="/contact"
          className={`btn-phys group flex items-center gap-3 border border-black bg-transparent text-black px-8 py-4 text-label tracking-label uppercase hover:bg-black ${hoverText} transition-colors duration-300 flex-shrink-0 sm:mb-[calc(clamp(2.2rem,5vw,4.5rem)*0.34)]`}
        >
          {cta}
          <span className="arrow-hop inline-block">→</span>
        </a>
      </div>
    </div>
  </section>
)

export default ServiceCTA
