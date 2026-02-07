'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ResonatePage() {
  const services = [
    'Strategic consultancy',
    'Artist/Label social media audits',
    'Creative direction and ideation',
    'Content calendars and release planning',
    'Creator-ready production toolkits',
    'Performance reviews and optimisation',
    'Album and release campaigns',
    'Ongoing social listening',
    'Creator and UGC alignment',
    'Ecosystem partnerships and amplification',
    'Paid media strategy and scaling'
  ]

  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="py-16 mb-8">
              <Image
                src="/images/services/resonate.png"
                alt="Bad Brain Resonate"
                width={1200}
                height={360}
                className="h-40 w-auto mx-auto object-contain"
              />
            </div>
            <p className="text-2xl leading-relaxed mb-6">
              Social media, led by TikTok, has <strong>rewritten the rules of music discovery</strong>, turning content into the primary way artists are found and followed.
            </p>
            <p className="text-xl text-white/90">
              The opportunity is huge, but so is the pressure. The demand for content never stops, and it&apos;s easy for even the best artists to feel <strong>overwhelmed</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-stretch"
          >
            <div className="flex items-center">
              <p className="text-2xl text-gray-700 leading-relaxed">
                Led by <strong>experts with real industry experience</strong>, Bad Brain Resonate delivers social strategy for artists and labels alike. We help turn your <strong>personality into presence</strong>, using proven, entertainment-first content strategies to build real fans and nurture lasting communities on platforms like TikTok.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="rounded-lg overflow-hidden shadow-xl flex-1 relative min-h-[300px]">
                <Image
                  src="/images/resonate/jen-long.jpg"
                  alt="Jen Long - Resonate Co-Founder"
                  fill
                  className="object-cover object-[center_70%]"
                />
              </div>
              <p className="mt-4 text-gray-600 text-sm text-center">Jen Long; Resonate Co-Founder</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-brand-blue text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-semibold mb-12 text-center">Approach</h2>
            <div className="space-y-8 leading-relaxed">
              <p className="text-2xl">
                Bad Brain takes an <strong>&apos;inside-out / outside-in&apos;</strong> approach to audience growth. We help artists build strong, authentic content on their own channels, while using strategic insight and partnerships to drive meaningful use of your songs in the TikTok library among audiences aligned to your style.
              </p>
              <p className="text-lg">
                Our work spans everything from <strong>focused consultancy and creative direction</strong> to full, ongoing social strategy. We help artists sharpen their content, define repeatable formats, and build momentum through planned releases, partnerships and platform-native storytelling.
              </p>
              <p className="text-lg">
                By tapping into <strong>Bad Brain&apos;s wider ecosystem</strong>, including creators we represent and brand-side relationships, we extend your music beyond your own channels and into culture. The result is <strong>sustainable growth</strong>, <strong>deeper fan connection</strong>, and content that works harder without demanding everything from the artist.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience / Jen Long Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-semibold text-gray-900 mb-16 text-center">Experience</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-stretch">
              {/* Photo */}
              <div className="flex flex-col">
                <div className="rounded-lg overflow-hidden shadow-xl flex-1 relative min-h-[400px]">
                  <Image
                    src="/images/resonate/jasmine4t.jpg"
                    alt="jasmine.4.t at Paradiso Amsterdam, 2025"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-gray-600 text-sm text-center">jasmine.4.t at Paradiso Amsterdam, 2025 - Photo by Jessica Carroll</p>
              </div>
              {/* Bio */}
              <div className="space-y-6">
                <p className="text-2xl text-gray-700 leading-relaxed">
                  Resonate Co-Founder, <strong>Jen Long</strong> brings nearly two decades of frontline experience across broadcasting, platforms and artist management. She began her career at the BBC, presenting <strong>BBC Introducing on Radio 1</strong>, serving as the voice of BBC Three, and fronting festival coverage, giving her a rare, early insight into how artists break and how audiences form.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Post-BBC, Jen helped launch live music platform <strong>DICE as Music Editor</strong> before moving into artist management and consultancy. Since 2017, she has worked closely with artists and music businesses while simultaneously leading partnerships for <strong>The Line of Best Fit</strong>, bridging editorial, culture and strategy.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  In 2023, Jen founded <strong>Take Care Management</strong>, where she continues to work with a focused roster including <strong>jasmine.4.t</strong>, recently named one of <strong>BBC 6 Music&apos;s Artists of the Year</strong>. At Bad Brain Resonate, she brings this deep industry perspective to help artists turn visibility into longevity and audiences into genuine fans.
                </p>
                <div className="bg-brand-yellow p-6 rounded-lg mt-8">
                  <p className="text-gray-800">
                    Jen&apos;s work spans a globally respected roster including <strong>The Knife, Fever Ray, Big Red Machine, Austra, Hannah Georgas, Planningtorock</strong>, and more, shaping careers across genres, territories and release cycles.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-semibold mb-16 text-center">Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 p-5 rounded-lg hover:bg-white/10 transition-colors duration-300"
                >
                  <p className="text-white font-medium">{service}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
