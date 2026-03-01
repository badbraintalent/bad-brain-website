'use client'

import React from 'react'

const VideoShowcase = () => {
  const videos = [
    { src: '/videos/ee1173e5-69c8-4dd1-b1e4-ee9b5bbd0b0a.mp4', title: 'Creator Content' },
    { src: '/videos/643f326f-6cc3-4911-84db-07e530191a93.mp4', title: 'Brand Collaboration' },
    { src: '/videos/1c23b88f-b7be-4ccc-a43b-3b7a0b6cf8b3.mp4', title: 'Studio Production' }
  ]

  return (
    <section className="video-showcase-section py-20 bg-white border-t border-gray-200">
      <div className="video-showcase-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left column — videos, slide in from left one after another */}
          <div className="flex flex-col gap-8">
            {videos.map((video, index) => (
              <div key={index} className={`video-card-${index + 1}`}>
                <div className="border border-gray-300">
                  <video
                    src={video.src}
                    className="w-full aspect-video"
                    controls
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">{video.title}</p>
              </div>
            ))}
          </div>

          {/* Right column — text content, slides in from right staggered */}
          <div className="flex flex-col gap-6 md:sticky md:top-24">
            <p className="video-text-1 text-base text-gray-500">
              After more than a decade working at the forefront of <strong className="text-gray-900">influencer and creator marketing</strong> - from local, small-scale activations to global, multi-market programmes - we&apos;ve seen the industry evolve from an after-thought of social media into an <strong className="text-gray-900">essential go-to-market strategy</strong>.
            </p>
            <p className="video-text-2 text-base text-gray-500">
              Despite the benefits creators have brought to the marketing industry, challenges remain for brands looking to go further:
            </p>
            <ul className="video-text-3 text-base text-gray-500 space-y-3 list-none">
              <li>Countless approaches to campaign activation <strong className="text-gray-900">leave marketing teams conflicted and start-ups unsure where to begin</strong>&hellip;</li>
              <li>Creators and artists are <strong className="text-gray-900">weighed down by relentless production schedules</strong>, leaving little room to grow their business or fan base&hellip;</li>
              <li>&hellip;and all of this while the <strong className="text-gray-900">social media that brands and creators once knew</strong>, evolves into an <strong className="text-gray-900">entertainment-first media channel</strong> that prioritises content over connection.</li>
            </ul>
            <p className="video-text-4 text-base text-gray-900 font-medium">
              That&apos;s where Bad Brain comes in&hellip;
            </p>
            <p className="text-base text-gray-500">
              Whether you need to build a creator strategy from the ground up, optimise your existing approach, build a cohesive suite of content, or you are a creator yourself and looking for representation: <strong className="text-gray-900">Bad Brain offers integrated services</strong> across <strong className="text-gray-900">consulting, production, and talent development</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoShowcase
