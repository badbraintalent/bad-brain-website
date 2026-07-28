'use client'

import React, { useEffect, useRef, useState } from 'react'

// Real creator reels — transcoded to web mp4 (+ poster). Cycled through the
// slot columns; each column shows a 4-up window into this set, doubled for the loop.
const creatorVideos = [
  { src: '/videos/creators/amarilla.mp4', poster: '/videos/creators/amarilla.jpg' },
  { src: '/videos/creators/lance.mp4', poster: '/videos/creators/lance.jpg' },
  { src: '/videos/creators/lapheal.mp4', poster: '/videos/creators/lapheal.jpg' },
  { src: '/videos/creators/marygrace.mp4', poster: '/videos/creators/marygrace.jpg' },
  { src: '/videos/creators/matty.mp4', poster: '/videos/creators/matty.jpg' },
  { src: '/videos/creators/sam-kojo.mp4', poster: '/videos/creators/sam-kojo.jpg' },
]

// Brand pixel frames (transparent centres, dither at the edges) — alternated
// per tile for subtle variation, per guidelines pg 31.
const slotFrames = [
  // 800px variants — tiles render ~184px wide, so the 1404×2500 originals
  // cost ~12× the decode memory for no visible gain
  '/images/brand/frames/Image_frame_9x16_1_800.png',
  '/images/brand/frames/Image_frame_9x16_2_800.png',
]

const VideoSlotColumn = ({
  direction,
  startOffset = '0%',
  startIndex = 0,
  count = 4,
  running,
}: {
  direction: 'up' | 'down'
  startOffset?: string
  startIndex?: number
  count?: number
  running: boolean
}) => {
  const animClass = direction === 'up' ? 'slot-scroll-up' : 'slot-scroll-down'

  // One window of distinct reels, then repeated so the 50% scroll loops seamlessly.
  const base = Array.from(
    { length: count },
    (_, i) => creatorVideos[(startIndex + i) % creatorVideos.length],
  )
  const items = [...base, ...base]

  return (
    <div className="slot-column">
      <div
        className={`slot-track ${animClass}`}
        style={
          {
            '--slot-start': startOffset,
            animationPlayState: running ? 'running' : 'paused',
          } as React.CSSProperties
        }
      >
        {items.map((item, i) => (
          <div key={i} className="slot-video-wrapper relative aspect-[9/16]">
            <video
              data-slot-video
              src={item.src}
              poster={item.poster}
              muted
              loop
              playsInline
              preload="none"
              className="slot-video absolute inset-0 h-full object-cover"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slotFrames[i % slotFrames.length]}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const SocialShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  // Pause the slot animations while the section is off-screen so the
  // compositor isn't animating three ~2700px layers for the whole session.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0, rootMargin: '200px 0px' },
    )
    io.observe(section)
    return () => io.disconnect()
  }, [])

  // Play each reel only while its tile is actually visible (the observer
  // clips through the slot-machine overflow, so tiles cycled out of the
  // 500px window pause too) — mirrors the connect roster pattern.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const videos = section.querySelectorAll<HTMLVideoElement>('video[data-slot-video]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target as HTMLVideoElement
          if (entry.isIntersecting) v.play().catch(() => {})
          else v.pause()
        })
      },
      { threshold: 0, rootMargin: '100px 0px' },
    )
    videos.forEach((v) => io.observe(v))
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="social-showcase-section bg-white text-black py-20 border-y border-black/10"
    >
      <div className="social-showcase-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column - CTA */}
          <div className="space-y-8">
            <h2 className="social-text-1 text-4xl sm:text-5xl lg:text-6xl">
              Hey, we&apos;re<br />Bad Brain.
            </h2>
            <p className="social-text-2 text-2xl text-black max-w-sm">
              Hey, we&apos;re Bad Brain. We&apos;re a specialist agency built for the creator economy.
            </p>

            {/* Body copy */}
            <p className="social-text-3 text-base text-black/60 max-w-sm">
              Bad Brain helps brands, agencies and creators work smarter in a space where strategy, storytelling and scale all need to align.
            </p>

            {/* Arrow CTA button */}
            {/* <div className="social-text-4">
              <div className="w-16 h-16 rounded-full border-2 border-gray-400 flex items-center justify-center">
                <svg className="w-6 h-6 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div> */}
          </div>

          {/* Right Column - Slot Machine Video Columns */}
          <div className="social-slots slot-machine">
            {/* Each column starts at a different vertical offset */}
            <VideoSlotColumn direction="up" startOffset="0%" startIndex={0} running={inView} />
            <VideoSlotColumn direction="down" startOffset="-16%" startIndex={2} running={inView} />
            <VideoSlotColumn direction="up" startOffset="-33%" startIndex={4} running={inView} />
          </div>

          {/* Original social post grid (preserved for reference)
          <div className="grid grid-cols-3 gap-3">
            <div className="row-span-2">
              <SocialPostCard height="h-full" label="[Reel]" />
            </div>
            <SocialPostCard height="h-32" label="[Post]" />
            <SocialPostCard height="h-32" label="[Post]" />
            <SocialPostCard height="h-40" label="[Post]" />
            <div className="row-span-2">
              <SocialPostCard height="h-full" label="[Reel]" />
            </div>
            <SocialPostCard height="h-36" label="[Post]" />
            <SocialPostCard height="h-36" label="[Post]" />
          </div>
          */}

        </div>
      </div>
    </section>
  )
}

export default SocialShowcase
