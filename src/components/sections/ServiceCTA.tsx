import type { ReactNode } from 'react'

/* End-of-page colour-block CTA shared by all four service pages — each page
   differs only in block colour and heading copy. */
const ServiceCTA = ({
  heading,
  bg,
  hoverText,
}: {
  heading: ReactNode
  /** Block colour utility, e.g. "bg-bb-mint" */
  bg: string
  /** Button hover text colour utility matching the block, e.g. "hover:text-bb-mint" */
  hoverText: string
}) => (
  <section className={`${bg} py-20 border-t border-black`}>
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10">
        <div>
          <h2 className="text-black leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}>
            {heading}
          </h2>
        </div>

        <a
          href="/contact"
          className={`btn-phys group flex items-center gap-3 border border-black bg-transparent text-black px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-black ${hoverText} transition-colors duration-300 flex-shrink-0`}
        >
          Get in touch
          <span className="arrow-hop inline-block">→</span>
        </a>
      </div>
    </div>
  </section>
)

export default ServiceCTA
