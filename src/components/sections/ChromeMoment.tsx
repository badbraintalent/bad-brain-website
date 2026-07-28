'use client'

import React from 'react'
import { scanlines } from '@/lib/y2k'

/* Deck page 12 as a section: full-bleed chrome horn-hand on CRT blue,
   with a scanline overlay. The one pure-blue full-bleed beat on the site. */
const ChromeMoment = () => {
  return (
    <section className="relative bg-bb-blue overflow-hidden border-t border-black" style={{ height: '70vh', minHeight: '420px' }}>
      <video
        src="/videos/brand/spin-full-land.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* CRT scanlines */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={scanlines(0.18)} />
      {/* Corner caption */}
      <span className="absolute bottom-5 right-6 font-mono text-[0.55rem] tracking-[0.3em] uppercase text-white/80">
        bad brain — est. London
      </span>
    </section>
  )
}

export default ChromeMoment
