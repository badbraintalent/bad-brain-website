/* Studio's "organic social strategy paradigm" — the supplied brand diagram
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
  'hidden sm:block absolute uppercase text-label tracking-label text-black/60 whitespace-nowrap'

const StudioParadigm = () => (
  <div className="studio-paradigm mx-auto w-full max-w-[56rem] sm:px-[clamp(6rem,10vw,9rem)]">
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

      {/* Bad Brain lockup sits inside the diamond, as per the supplied artwork.
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

      {/* Axis labels — pinned to the four vertices at sm+ */}
      <span className={`${labelClass} left-1/2 -translate-x-1/2 bottom-full mb-4`}>
        {AXES[0]}
      </span>
      <span className={`${labelClass} right-full mr-5 top-1/2 -translate-y-1/2`}>
        {AXES[1]}
      </span>
      <span className={`${labelClass} left-full ml-5 top-1/2 -translate-y-1/2`}>
        {AXES[2]}
      </span>
      <span className={`${labelClass} left-1/2 -translate-x-1/2 top-full mt-4`}>
        {AXES[3]}
      </span>
    </div>

    {/* Narrow screens: the vertices have no room, so the axes read as a list */}
    <ul className="sm:hidden mt-8 grid grid-cols-2 gap-y-2.5 gap-x-3">
      {AXES.map((axis) => (
        <li
          key={axis}
          className="flex items-center gap-2 uppercase tracking-label text-label text-black/60"
        >
          <span className="w-1.5 h-1.5 bg-bb-blue shrink-0" aria-hidden="true" />
          {axis}
        </li>
      ))}
    </ul>
  </div>
)

export default StudioParadigm
