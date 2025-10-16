'use client'

import React from 'react'
import { motion } from 'framer-motion'

const AboutSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-stix text-4xl sm:text-5xl text-gray-900 mb-8">
            Bad Brain Media is a specialist agency built for the creator economy.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              After more than a decade working at the forefront of <strong>influencer and creator marketing</strong> - from local, small-scale activations to global, multi-market programmes - we&apos;ve seen the industry evolve from an after-thought of social media into an <strong>essential go-to-market strategy</strong>.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Despite the changes that creator marketing have brought to the industry, challenges remain:
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Countless approaches to campaign activation <strong>leave marketing teams conflicted and start-ups unsure where to begin</strong>…
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Creators themselves are <strong>weighed down by relentless production schedules</strong>, leaving little room to grow their business…
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              …and all of this while both <strong>brands and creators debate how to harness Generative AI</strong> without eroding creativity or authenticity.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>That&apos;s where Bad Brain comes in…</strong>
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Whether you need to build a creator strategy from the ground up, optimise your existing approach, build a cohesive suite of content, or you are a creator yourself and looking for representation: <strong>Bad Brain offers integrated services</strong> across <strong>consulting, production, and talent development</strong>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-brand-yellow p-8 rounded-lg shadow-xs"
          >
            <h3 className="font-stix text-2xl font-normal text-gray-900 mb-6">
              Our <strong>Approach</strong>
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Every part of the business is built with <strong>creators in mind</strong> - and optimised for what your business or brand needs, wherever you sit in the ecosystem.
            </p>
            <ul className="space-y-3 list-none">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-brand-blue rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-base text-gray-700 text-lg"><strong>Strategy</strong> and <strong>storytelling</strong> alignment</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-brand-blue rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-base text-gray-700 text-lg">Scalable <strong>content production</strong></span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-brand-blue rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-base text-gray-700 text-lg"><strong>Creator-first</strong> mindset</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection