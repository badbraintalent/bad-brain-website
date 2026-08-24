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
  /** Button label — defaults to "Get in touch" where no copy is supplied */
  cta?: string
}) => (
  <section className={`${bg} py-12 md:py-20 border-t border-black`}>
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      {/* sm+: the button's bottom edge sits on the heading's last baseline.
          `items-end` aligns the two boxes, then the margin lifts the button by
          the space between that box bottom and the baseline.

          That space is half-leading + descent. `.title-outline` sets its own
          line-height of 1.55 — the stroke needs the room — which overrides
          display-2's 0.95, so for Gravity Wide (ascent 0.9333em, descent
          0.3667em):
            (1.55 − 0.9333 − 0.3667) / 2 + 0.3667 = 0.4917em
          It is a constant fraction of font-size, so multiplying the heading's
          own size token carries it across the whole clamp — including the
          mobile floor — with no second breakpoint.

          Baseline alignment can't do this job: a flex item containing text
          always contributes its own text baseline, so `align-items: baseline`
          would sit the button's LABEL on the heading's baseline, not its edge.

          Re-derive the 0.4917 if the display face or `.title-outline`'s
          line-height changes; measure with a zero-size inline-block probe, which sits
          exactly on the baseline. */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10">
        <div>
          {/* Outline type — reserved for CTA and quote moments (this block and
              the homepage "We didn't write these"); page H1s stay solid. */}
          <h2 className="title-outline text-display-2">
            {heading}
          </h2>
        </div>

        <a
          href="/contact"
          className={`btn-phys group flex items-center gap-3 border border-black bg-transparent text-black px-8 py-4 text-label tracking-label uppercase hover:bg-black ${hoverText} transition-colors duration-300 flex-shrink-0 sm:mb-[calc(var(--text-display-2)*0.4917)]`}
        >
          {cta}
          <span className="arrow-hop inline-block">→</span>
        </a>
      </div>
    </div>
  </section>
)

export default ServiceCTA
