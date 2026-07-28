/* Thin pixel-field strips along the top and bottom viewport edges — the
   framing device shared by the boot screen and the 404 crash screen. Parent
   must be positioned. */
const PixelFieldStrips = ({ opacity = 1 }: { opacity?: number }) => (
  <>
    <div
      aria-hidden="true"
      className="absolute top-0 inset-x-0 h-4"
      style={{
        backgroundImage: 'url(/images/brand/fields/bg_16x9_1.png)',
        backgroundSize: 'auto 600%',
        imageRendering: 'pixelated',
        opacity,
      }}
    />
    <div
      aria-hidden="true"
      className="absolute bottom-0 inset-x-0 h-4"
      style={{
        backgroundImage: 'url(/images/brand/fields/bg_16x9_1.png)',
        backgroundSize: 'auto 600%',
        backgroundPosition: 'bottom',
        imageRendering: 'pixelated',
        opacity,
      }}
    />
  </>
)

export default PixelFieldStrips
