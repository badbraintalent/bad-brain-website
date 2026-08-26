'use client'

import React, { useEffect, useRef, useState } from 'react'

/* Tiles render ~112px wide on a phone (the grid collapses to one column, so
   three slot columns share the full width) and ~184px at lg. Neither width
   justifies the 540x960 masters: the phone tile is 5x oversized, the desktop
   tile still 1.5x oversized at 2x DPR. Both tiers are purpose-cut, and both
   are capped at 30fps — two of the masters run at 50/60, which is decode cost
   nobody can see on a tile this size and with up to a dozen playing at once.

   270x480 below lg (~1.9MB across the six reels), 384x682 at lg and up
   (~5.1MB, down from ~9.4MB). Mirrors the hero's -960 split. */
const rendition = (src: string, narrow: boolean) =>
  src.replace(/\.mp4$/, narrow ? '-480.mp4' : '-384.mp4')

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

/* Tiles carry no dither overlay — the frames fought the footage, and dropping
   them also retired a Safari compositing workaround for keeping an overlay above
   a playing <video>. */

const VideoSlotColumn = ({
  direction,
  startOffset = '0%',
  startIndex = 0,
  count = 4,
  running,
  narrow,
}: {
  direction: 'up' | 'down'
  startOffset?: string
  startIndex?: number
  count?: number
  running: boolean
  /** null until measured client-side, so SSR can't bake in the wrong rendition. */
  narrow: boolean | null
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
              src={narrow === null ? undefined : rendition(item.src, narrow)}
              poster={item.poster}
              muted
              loop
              playsInline
              preload="none"
              className="slot-video absolute inset-0 z-0 h-full object-cover"
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
  // null until measured, so the server can't commit to a rendition; the
  // poster holds each tile in the meantime.
  const [narrow, setNarrow] = useState<boolean | null>(null)

  useEffect(() => {
    setNarrow(window.matchMedia('(max-width: 1024px)').matches)
  }, [])

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
  // Re-run once the rendition is known: on the first pass the tiles have no
  // src at all, so play() would be a no-op and any tile already on screen
  // would sit on its poster forever.
  useEffect(() => {
    const section = sectionRef.current
    if (!section || narrow === null) return
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
  }, [narrow])

  return (
    <section
      ref={sectionRef}
      className="social-showcase-section bg-white text-black py-12 md:py-20 border-y border-black/10"
    >
      <div className="social-showcase-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Column - CTA */}
          <div className="space-y-8">
            {/* Three lines, so the longest is "Entertainment". Setting
                "Social Entertainment" as one line is the same headline at
                roughly two thirds the size: in Gravity Wide that string
                measures 16.35x its own font-size, so it only clears a 576px
                column at ~34px, against the 48px this holds.

                "Entertainment" is 13 characters — at the stock display-2
                ceiling (60px) it measures 684px against that 576px column, so
                it ran into the reel grid. Below lg the column is full-width and
                display-2 fits, so only lg+ is re-scaled: the column is
                narrowest at exactly 1024px (448px, where the two-up grid
                starts) and widens to 576px, hence the vw-tracking clamp rather
                than a flat size. */}
            <h2 className="social-text-1 text-display-2 lg:text-[clamp(2.25rem,calc(4.2vw_-_9px),3rem)]">
              For the age of<br />Social<br />Entertainment
            </h2>
            <p className="social-text-2 text-body-lg text-black max-w-sm">
              We&apos;re a specialist agency for brands, creators and artists.
              <br />
              Four connected services for the entertainment era of social.
            </p>

            {/* Arrow CTA button */}
            {/* <div className="social-text-4">
              <div className="w-16 h-16 rounded-full border-2 border-bb-grey flex items-center justify-center">
                <svg className="w-6 h-6 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div> */}
          </div>

          {/* Right Column - Slot Machine Video Columns */}
          <div className="social-slots slot-machine">
            {/* Each column starts at a different vertical offset */}
            <VideoSlotColumn direction="up" startOffset="0%" startIndex={0} running={inView} narrow={narrow} />
            <VideoSlotColumn direction="down" startOffset="-16%" startIndex={2} running={inView} narrow={narrow} />
            <VideoSlotColumn direction="up" startOffset="-33%" startIndex={4} running={inView} narrow={narrow} />
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
