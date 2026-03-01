'use client'

import React from 'react'

const video = '/videos/643f326f-6cc3-4911-84db-07e530191a93.mp4'

const VideoSlotColumn = ({
  direction,
  startOffset = '0%',
  count = 4,
}: {
  direction: 'up' | 'down'
  startOffset?: string
  count?: number
}) => {
  const animClass = direction === 'up' ? 'slot-scroll-up' : 'slot-scroll-down'

  // Double for seamless loop
  const items = Array.from({ length: count * 2 })

  return (
    <div className="slot-column">
      <div
        className={`slot-track ${animClass}`}
        style={{ '--slot-start': startOffset } as React.CSSProperties}
      >
        {items.map((_, i) => (
          <div key={i} className="slot-video-wrapper">
            <video
              src={video}
              muted
              loop
              autoPlay
              playsInline
              className="slot-video"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const SocialShowcase = () => {
  return (
    <section className="social-showcase-section bg-[#1a1a1a] text-white py-20 border-y border-[#333]">
      <div className="social-showcase-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column - CTA */}
          <div className="space-y-8">
            <h2 className="social-text-1 text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-tight">
              Hey, we&apos;re<br />Bad Brain.
            </h2>
            <p className="social-text-2 text-2xl text-gray-400 max-w-sm">
              Hey, we&apos;re Bad Brain. We&apos;re a specialist agency built for the creator economy.
            </p>

            {/* Body copy */}
            <p className="social-text-3 text-base text-gray-400 max-w-sm">
              Bad Brain helps brands, agencies and creators work smarter in a space where strategy, storytelling and scale all need to align.
            </p>

            {/* Arrow CTA button */}
            {/* <div className="social-text-4">
              <div className="w-16 h-16 rounded-full border-2 border-gray-400 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div> */}
          </div>

          {/* Right Column - Slot Machine Video Columns */}
          <div className="social-slots slot-machine">
            {/* Each column starts at a different vertical offset */}
            <VideoSlotColumn direction="up" startOffset="0%" />
            <VideoSlotColumn direction="down" startOffset="-16%" />
            <VideoSlotColumn direction="up" startOffset="-33%" />
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
