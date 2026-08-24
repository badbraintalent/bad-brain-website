'use client'

import React, { useEffect, useRef } from 'react'
import { scanlines } from '@/lib/y2k'

/* Full-bleed chrome horn-hand with a scanline overlay. The ground is only
   visible while the film loads — grey rather than cyan, since cyan is
   interaction-only. The film itself is cyan-graded, so the section reads blue. */
const ChromeMoment = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  /* This section sits at the foot of the page. With `autoPlay` + the default
     preload the film fetched and decoded from first paint, competing with
     everything above it for bandwidth and for decoder time while the visitor
     is still scrolling the hero. Fetch and play only once it is nearly in
     view, and stop decoding again on the way out. */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0, rootMargin: '300px 0px' },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <section className="relative bg-bb-grey overflow-hidden border-t border-black" style={{ height: '70vh', minHeight: '420px' }}>
      <video
        ref={videoRef}
        src="/videos/brand/spin-full-land.mp4"
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* CRT scanlines */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={scanlines(0.18)} />
      {/* Corner caption */}
      <span className="absolute bottom-5 right-6 text-label tracking-label-wide uppercase text-white/80">
        bad brain - est. London
      </span>
    </section>
  )
}

export default ChromeMoment
