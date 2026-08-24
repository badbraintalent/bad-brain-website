/* Studio's "organic social strategy paradigm" — the brand diagram
   (8_Diagrams/Diagram_1.svg) with its four axis labels set live rather than
   baked into the flat mockup PNG, so they stay crisp and selectable.

   The frame is the brand asset used twice: a black base <img>, plus a bb-blue
   copy laid over it as a mask that wipes in left→right while the diagram is
   hovered and back out when it isn't (see `.paradigm-sweep` in globals.css). */

const AXES = ['Entertainment-First', 'Repeatable', 'Bingeable', 'Socially Native']

const FRAME = '/images/brand/diagrams/paradigm-frame.svg'

const maskStyle = {
  WebkitMaskImage: `url(${FRAME})`,
  maskImage: `url(${FRAME})`,
  WebkitMaskSize: '100% 100%',
  maskSize: '100% 100%',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
} as const

const labelClass =
  'absolute uppercase text-label tracking-label text-black/70 whitespace-nowrap'

/* The side labels turn upright below `sm` rather than dropping out.
   They can't move inside the frame — the diamond's left and right vertices sit
   *on* the frame's edges, so there is no interior void to put them in — and
   keeping them horizontal outside costs ~81px of gutter a side, which would
   shrink the diagram to 172×91 inside a 375px screen's 327px column. Upright
   they cost ~16px a side instead, so the diagram stays ~287px wide and all four
   vertices keep a label attached to them.

   `vertical-rl` + `rotate-180` is the y-axis idiom: both sides then read
   bottom-to-top, so the reader only ever tilts their head one way. */
const sideLabelClass = `${labelClass} top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] rotate-180 sm:[writing-mode:horizontal-tb] sm:rotate-0`

const StudioParadigm = () => (
  <div className="studio-paradigm mx-auto w-full max-w-[56rem] px-5 sm:px-[clamp(6rem,10vw,9rem)]">
    {/* The frame is painted as two masked fills stacked in the same box rather
        than an <img> plus an overlay — identical mask geometry, so the blue
        covers the black exactly with no stray edge showing through. */}
    <div
      className="relative w-full aspect-[495/261]"
      role="img"
      aria-label="Bad Brain's organic social strategy paradigm: entertainment-first, repeatable, bingeable and socially native."
    >
      <div className="absolute inset-0 bg-black pointer-events-none" style={maskStyle} />
      {/* Blue signal pass over the same geometry */}
      <div
        className="paradigm-sweep absolute inset-0 bg-bb-blue pointer-events-none"
        style={maskStyle}
      />

      {/* Bad Brain lockup sits inside the diamond, as the source artwork has it.
          The stacked (square) lockup rather than the mockup's horizontal one —
          in the horizontal lockup the wordmark crosses the hand mark, which
          reads as a collision at this size, and a squarer shape sits better in
          a diamond. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/brand/logo/BB_Square.svg"
        alt=""
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[26%] h-auto pointer-events-none"
      />

      {/* Axis labels — pinned to the four vertices at every width */}
      <span className={`${labelClass} left-1/2 -translate-x-1/2 bottom-full mb-3 sm:mb-4`}>
        {AXES[0]}
      </span>
      <span className={`${sideLabelClass} right-full mr-1.5 sm:mr-5`}>
        {AXES[1]}
      </span>
      <span className={`${sideLabelClass} left-full ml-1.5 sm:ml-5`}>
        {AXES[2]}
      </span>
      <span className={`${labelClass} left-1/2 -translate-x-1/2 top-full mt-3 sm:mt-4`}>
        {AXES[3]}
      </span>
    </div>
  </div>
)

export default StudioParadigm
