'use client'

import PixelDitherFrame from '@/components/ui/PixelDitherFrame'
import WindowTitleBar from '@/components/ui/WindowTitleBar'
import { creators } from '@/lib/creators'
import { useEffect, useRef, useState } from 'react'

/**
 * roster.exe — the photo-based talent browser: index list on the left, sticky
 * dossier viewer on the right. Self-contained: it owns its selection state and
 * auto-rotation, so mounting it on any page is a one-line job.
 */
export default function RosterBrowser() {
  // Which creator the dossier viewer shows. Auto-rotates; hovering the
  // roster.exe window pauses rotation and hover/focus on a row overrides it.
  const [active, setActive] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    // JS-driven motion — the CSS reduced-motion guard can't reach it, so gate
    // here (hover/focus still drive the dossier).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (!paused.current) setActive((i) => (i + 1) % creators.length)
    }, 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="roster" className="bg-black py-14 md:py-24 talent-roster-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="talent-roster-header flex items-baseline justify-between mb-8 md:mb-10 pb-6 border-b border-white/20">
          <span className="text-label tracking-label-wide uppercase text-white/60">Our Creators</span>
          <span className="text-label tracking-label uppercase text-white/40">
            Represented · 5.2M+ Combined Audience
          </span>
        </div>

        {/* OS window wrapper — pointer presence pauses the auto-rotation */}
        <div
          className="roster-window-in border border-white/15"
          onMouseEnter={() => { paused.current = true }}
          onMouseLeave={() => { paused.current = false }}
        >
          <WindowTitleBar name="roster.exe" className="bg-bb-grey px-3 py-2" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_42%]">

            {/* Index list — hover/focus a row to load it in the viewer.
                Below lg each row carries its own photo + stats instead. */}
            <div role="list">
              {creators.map((creator, i) => (
                <div
                  role="listitem"
                  key={creator.num}
                  tabIndex={0}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`group grid grid-cols-[4.5rem_1fr] lg:grid-cols-[3rem_1fr] items-center gap-x-4 lg:gap-x-6 px-4 sm:px-6 py-4 lg:py-5 border-b border-white/10 last:border-b-0 outline-none transition-colors duration-200 ${
                    active === i ? 'lg:bg-white/[0.06]' : ''
                  }`}
                >
                  {/* Thumb — the list IS the roster below lg */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={creator.photo}
                    alt={creator.name}
                    loading="lazy"
                    decoding="async"
                    className="lg:hidden w-[4.5rem] h-[4.5rem] object-cover row-span-2"
                  />
                  {/* Index number (lg+) */}
                  <span
                    className={`hidden lg:block text-label tabular-nums transition-colors duration-200 ${
                      active === i ? 'text-bb-mint' : 'text-white/40'
                    }`}
                  >
                    {creator.num}
                  </span>

                  <div className="min-w-0">
                    <h3
                      className={`font-display uppercase lg:truncate text-display-4 transition-colors duration-200 ${
                        active === i ? 'lg:text-bb-mint text-white' : 'text-white'
                      }`}
                    >
                      {creator.name}
                    </h3>
                    {creator.niche && (
                      <p className="text-label tracking-label uppercase text-white/40 mt-1.5 truncate">
                        {creator.niche}
                      </p>
                    )}
                    {/* Inline stats — mobile only (the viewer shows them on lg) */}
                    {creator.stats?.length ? (
                      <p className="lg:hidden text-label tracking-label uppercase text-white/60 mt-1.5">
                        {creator.stats.map((s) => `${s.count} ${s.platform}`).join(' · ')}
                      </p>
                    ) : null}
                  </div>

                </div>
              ))}
            </div>

            {/* Dossier viewer — sticky, lg+ only */}
            <div className="hidden lg:block border-l border-white/15">
              <div className="sticky top-20 p-6">

                {/* Photo stack — active creator faded in, dither pattern re-seeds per creator */}
                <div className="relative aspect-square overflow-hidden bg-black">
                  {creators.map((c, i) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={c.num}
                      src={c.photo}
                      alt={i === active ? c.name : ''}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                      style={{ opacity: i === active ? 1 : 0 }}
                    />
                  ))}
                  <PixelDitherFrame cols={40} rows={40} seed={active + 1} visible />
                </div>

                {/* Properties readout */}
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <p className="text-label tracking-label uppercase text-white/40">
                    {creators[active].niche ?? ''}
                  </p>
                  <p className="text-label tabular-nums text-bb-mint shrink-0">
                    {creators[active].num}
                  </p>
                </div>
                <div className="mt-3 border-t border-white/15">
                  {(creators[active].stats ?? []).map((s) => (
                    <div
                      key={s.platform}
                      className="flex items-baseline justify-between gap-4 py-2.5 border-b border-white/10"
                    >
                      <span className="text-label tracking-label uppercase text-white/50">
                        {s.platform}
                      </span>
                      <span className="text-body-sm tabular-nums text-white">{s.count}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Roster sign-up — the only creator-facing CTA we had */}
        <div className="mt-10 pt-8 border-t border-white/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <p className="text-white/60 text-body-sm">
            Are you a creator? Ready to join the roster?
          </p>
          <a
            href="/contact"
            className="btn-phys border border-white/40 px-7 py-3 text-label uppercase tracking-label text-white hover:bg-bb-mint hover:text-black hover:border-bb-mint transition-colors w-fit"
          >
            Get in touch →
          </a>
        </div>
      </div>
    </section>
  )
}
