'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import { track } from '@vercel/analytics'

export default function TalentPage() {
  const services = [
    '<strong>Representation</strong> to help negotiate and manage brand partnerships, collaborations, and licensing deals.',
    '<strong>Business development and strategy hours</strong> to help grow and diversify creator revenue streams.',
    '<strong>Content planning and creative development hours</strong>.',
    '<strong>Brand access</strong> through campaigns and partnerships managed under the Bad Brain network.'
  ]

  const creators = [
    { name: '@CarriePatsalis', category: 'Travel & Adventure', image: 'Carrie.png', url: 'https://www.youtube.com/@carriepatsalis', platform: 'youtube' },
    { name: '@TimeDrops', category: 'Horology & Lifestyle', image: 'Time Drops.PNG', url: 'https://www.youtube.com/@TimeDrops_', platform: 'youtube' },
    { name: '@Thibodyo', category: 'VFX & Creative', image: 'Thibault.png', url: 'https://www.instagram.com/thibodyo/', platform: 'instagram' },
    { name: '@Sam_Kojo', category: 'Gymnast & Coach', image: 'Sam.png', url: 'https://instagram.com/sam_kojo', platform: 'instagram' }
  ]

  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-brand-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <Image
                  src="/images/services/talent.svg"
                  alt="Bad Brain Talent"
                  width={1200}
                  height={360}
                  className="h-60 w-auto filter brightness-0 invert"
                />
              </div>
              <p className="text-xl leading-relaxed">
                <strong>Bad Brain Talent</strong> supports, develops and represents <strong>up and coming original content creators</strong>. We help identify <strong>brand partners</strong>, secure <strong>paid opportunities</strong>, and handle the admin that comes with running a growing business.
              </p>
              <p className="text-lg mt-6 text-white/90">
                We enable creators to put more time, energy and focus on what matters most - <strong>their content and their audience</strong>.
              </p>
            </div>
            <div className="relative">
              <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-semibold mb-6">The Challenge</h3>
                <p className="text-white/90 leading-relaxed">
                  <strong>The demand for creator content never slows.</strong> Audiences expect more - more formats, more frequency, more from the people they follow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-8">The Reality</h2>
              <p className="text-lg text-gray-700 mb-6">
                <strong>With that growing pressure</strong>, keeping up with content can leave little room for managing brand deals, career development, and long-term growth.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                <strong>The need for representation is clear</strong> - but too often, <strong>traditional management means losing control</strong>. Forced deals, overexposure, and strategies that serve the agency, not the creator.
              </p>
            </div>
            <div className="bg-brand-yellow p-8 rounded-lg shadow-xs">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6"><strong>Bad Brain Talent does things differently.</strong></h3>
              <p className="text-lg text-gray-700 mb-6">
                Our <strong>tiered model gives creators control</strong>, with support that flexes to fit their needs - from <strong>inbox management to full-scale representation</strong>.
              </p>
              <p className="text-lg text-gray-700">
                We handle <strong>deal negotiation, brand outreach, and business development</strong>, helping creators diversify their income and build <strong>sustainable businesses</strong> for the long term.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="bg-white p-8 rounded-lg shadow-xs">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">For Brands</h3>
              <p className="text-lg text-gray-700">
                Access to <strong>trusted talent</strong> with the <strong>right structures in place</strong>.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xs">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">For Creators</h3>
              <p className="text-lg text-gray-700">
                The <strong>freedom to focus</strong> on what they do best: <strong>creating</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Creators */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-semibold text-gray-900 mb-16 text-center">Our Creators</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {creators.map((creator, index) => (
              <a
                key={index}
                href={creator.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center block group hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => track('Creator Link Click', { creator: creator.name, platform: creator.platform })}
              >
                <div className="mb-4 relative overflow-hidden rounded-lg">
                  <Image
                    src={`/images/talent/${creator.image}`}
                    alt={creator.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover group-hover:shadow-lg transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {creator.platform === 'instagram' ? (
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      ) : (
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-brand-blue mb-2 group-hover:text-brand-blue/80 transition-colors duration-300">{creator.name}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{creator.category}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-brand-yellow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-semibold text-gray-900 mb-16 text-center">Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-xs border border-gray-100">
                {/* <div className="flex items-start"> */}
                  {/* <Image
                    src="/images/logo/logo.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="w-6 h-6 mt-1 mr-4 flex-shrink-0"
                  /> */}
                  <p className="text-lg text-gray-700" dangerouslySetInnerHTML={{ __html: service }}></p>
                {/* </div> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}