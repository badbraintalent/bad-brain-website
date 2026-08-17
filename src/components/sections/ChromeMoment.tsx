'use client'

import React from 'react'
import { scanlines } from '@/lib/y2k'

/* Full-bleed chrome horn-hand with a scanline overlay. The ground is only
   visible while the film loads — grey rather than cyan, since cyan is
   interaction-only. The film itself is cyan-graded, so the section reads blue. */
const ChromeMoment = () => {
  return (
    <section className="relative bg-bb-grey overflow-hidden border-t border-black" style={{ height: '70vh', minHeight: '420px' }}>
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
      <span className="absolute bottom-5 right-6 text-label tracking-label-wide uppercase text-white/80">
        bad brain — est. London
      </span>
    </section>
  )
}

export default ChromeMoment
