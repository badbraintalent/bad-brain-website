'use client'

import WindowTitleBar from '@/components/ui/WindowTitleBar'
import { winShadow } from '@/lib/y2k'

/* The three levels a creator relationship can sit at. */
const tiers = [
  {
    name: 'Verified',
    desc: 'The widest tier. Creators across every niche and platform, brought in and matched project by project - whatever the campaign needs, there’s a fit in this pool.',
  },
  {
    name: 'Connected',
    desc: 'The tier we manage hands-on. Every deal, every pitch, run through us - so you get creators we already know, with fewer surprises and a stronger match to the brief.',
  },
  {
    name: 'Partnered',
    desc: 'The deepest tier. We act as a genuine business partner here, not just a manager - the most accountable relationships we have, built for campaigns where the stakes are highest.',
  },
]

/**
 * tiers.exe — the Verified / Connected / Partnered roster model.
 *
 * Self-contained alongside [RosterBrowser]. Currently unmounted.
 */
export default function CreatorTiers() {
  return (
    <section className="py-14 md:py-24 bg-bb-fill border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex items-baseline justify-between mb-8 pb-6 border-b border-black/20">
          <span className="text-label tracking-label-wide uppercase text-black/70">
            How We Work With Creators
          </span>
          <span className="text-label tracking-label uppercase text-black/60">
            The Bad Brain Roster
          </span>
        </div>

        <p className="text-black/70 text-body-md mb-10 max-w-2xl">
          Every creator relationship sits at a defined level - so you always know what
          you&rsquo;re working with.
        </p>

        <div className="border border-black bg-white" style={{ boxShadow: winShadow(6, 0.14) }}>
          <WindowTitleBar name="tiers.exe" className="bg-bb-grey px-3 py-2" />

          {/* Three panes side by side — column view rather than a row list */}
          <div className="grid md:grid-cols-3 border-t border-black/15">
            {tiers.map(({ name, desc }, i) => (
              <div
                key={name}
                className="flex flex-col border-b md:border-b-0 md:border-r last:border-b-0 md:last:border-r-0 border-black/15 hover:bg-bb-mint/25 transition-colors"
              >
                {/* Pane header strip */}
                <div className="flex items-baseline gap-3 px-6 py-3 border-b border-black/15 bg-black/[0.03]">
                  <span className="text-label text-black/35">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-body-sm font-bold text-black uppercase tracking-label">
                    {name}
                  </h3>
                </div>
                <p className="text-body-sm text-black/70 px-6 py-6">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
