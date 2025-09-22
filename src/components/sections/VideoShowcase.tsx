'use client'

import React from 'react'
import { motion } from 'framer-motion'
import VideoPlayer from '@/components/ui/VideoPlayer'

const VideoShowcase = () => {
  const videos = [
    { src: '/videos/ee1173e5-69c8-4dd1-b1e4-ee9b5bbd0b0a.mp4', title: 'Creator Content' },
    { src: '/videos/643f326f-6cc3-4911-84db-07e530191a93.mp4', title: 'Brand Collaboration' },
    { src: '/videos/1c23b88f-b7be-4ccc-a43b-3b7a0b6cf8b3.mp4', title: 'Studio Production' }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-8">
              See Our Work in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From creator-led content to studio production, explore how we bring brands and creators together
            </p>
          </motion.div> */}

        <div className="grid md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="rounded-lg shadow-xs hover:shadow-xl transition-shadow duration-300">
                <VideoPlayer
                  src={video.src}
                  className="aspect-video mb-4"
                  autoPlay={false}
                  muted={true}
                  loop={true}
                />
                {/* <h3 className="text-lg font-semibold text-gray-900 text-center">
                  {video.title}
                </h3> */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/work"
            className="inline-flex items-center px-8 py-4 bg-brand-blue text-white rounded-md text-lg font-semibold hover:bg-brand-blue/90 transition-all duration-300"
          >
            View All Work
          </a>
        </motion.div> */}
      </div>
    </section>
  )
}

export default VideoShowcase