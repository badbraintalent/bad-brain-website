'use client'

import React from 'react'

const AboutSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl text-black mb-8 font-bold">
            Bad Brain Media is a specialist agency built for the creator economy.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-base text-black/70 leading-relaxed">
              After more than a decade working at the forefront of <strong>influencer and creator marketing</strong> - from local, small-scale activations to global, multi-market programmes - we&apos;ve seen the industry evolve from an after-thought of social media into an <strong>essential go-to-market strategy</strong>.
            </p>

            <p className="text-base text-black/70 leading-relaxed">
              Despite the benefits creators have brought to the marketing industry, challenges remain for brands looking to go further:
            </p>

            <p className="text-base text-black/70 leading-relaxed">
              Countless approaches to campaign activation <strong>leave marketing teams conflicted and start-ups unsure where to begin</strong>&hellip;
            </p>

            <p className="text-base text-black/70 leading-relaxed">
              Creators and artists are <strong>weighed down by relentless production schedules</strong>, leaving little room to grow their business or fan base&hellip;
            </p>

            <p className="text-base text-black/70 leading-relaxed">
              &hellip;and all of this while the <strong>social media that brands and creators once knew</strong>, evolves into an <strong>entertainment-first media channel</strong> that prioritises content over connection.
            </p>

            <p className="text-base text-black/70 leading-relaxed">
              <strong>That&apos;s where Bad Brain comes in&hellip;</strong>
            </p>

            <p className="text-base text-black/70 leading-relaxed">
              Whether you need to build a creator strategy from the ground up, optimise your existing approach, build a cohesive suite of content, or you are a creator yourself and looking for representation: <strong>Bad Brain offers integrated services</strong> across <strong>consulting, production, and talent development</strong>.
            </p>
          </div>

          <div className="border border-black/20 p-8">
            <h3 className="text-2xl font-normal text-black mb-6">
              Our <strong>Approach</strong>
            </h3>
            <p className="text-base text-black/70 leading-relaxed mb-6">
              Every part of the business is built with <strong>creators in mind</strong> - and optimised for what your business or brand needs, wherever you sit in the ecosystem.
            </p>
            <ul className="space-y-3 list-none">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gray-900 rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-base text-black/70"><strong>Strategy</strong> and <strong>storytelling</strong> alignment</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gray-900 rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-base text-black/70">Scalable <strong>content production</strong></span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gray-900 rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-base text-black/70"><strong>Creator-first</strong> mindset</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
