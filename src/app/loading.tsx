/* Route-transition loading bar — a stepped indeterminate sweep pinned to the
   top of the viewport, in the same "12fps" Y2K register as BootIntro. Note:
   the site is statically generated, so this mostly shows on cold/slower loads;
   navigations between prerendered routes are near-instant. */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed top-0 inset-x-0 z-[90] h-1 bg-black/10 overflow-hidden"
    >
      <div
        className="h-full w-1/4 bg-bb-blue"
        style={{ animation: 'load-sweep 0.9s steps(12) infinite' }}
      />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
