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
          <h2 className="font-stix text-4xl sm:text-5xl font-semibold text-gray-900 mb-8">
            <span className="text-brand-blue font-bold">Bad Brain Media</span> is a specialist agency built for the <span className="text-brand-blue font-bold">creator economy</span>.
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
              After more than a decade working at the forefront of <strong>influencer and creator marketing</strong> - from early activations to global, multi-market programmes - we&apos;ve seen the space evolve from <strong>social add-on to strategic priority</strong>.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Now, we help <strong>brands, agencies, and networks</strong> navigate this shift with solutions designed for the way the industry actually works today.
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
            <h3 className="font-stix text-2xl font-semibold text-gray-900 mb-6">
              Our <span className="text-brand-blue">Approach</span>
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Every part of the business is built with <strong className="text-brand-blue">creators in mind</strong> - and optimised for what your business or brand needs, wherever you sit in the ecosystem.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-brand-blue rounded-full mr-3 flex-shrink-0"></div>
                <p className="text-gray-700"><strong className="text-brand-blue">Strategy</strong> and <strong className="text-brand-blue">storytelling</strong> alignment</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-brand-blue rounded-full mr-3 flex-shrink-0"></div>
                <p className="text-gray-700">Scalable <strong className="text-brand-blue">content production</strong></p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-brand-blue rounded-full mr-3 flex-shrink-0"></div>
                <p className="text-gray-700"><strong className="text-brand-blue">Creator-first</strong> mindset</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection