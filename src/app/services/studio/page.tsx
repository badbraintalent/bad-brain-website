import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import VideoShowcase from '@/components/sections/VideoShowcase'
import Image from 'next/image'

export default function StudioPage() {
  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-brand-yellow py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8 flex justify-center md:justify-start">
                <Image
                  src="/images/services/studio.svg"
                  alt="Bad Brain Studio"
                  width={1200}
                  height={360}
                  className="h-60 w-auto"
                />
              </div>
              <p className="text-2xl text-gray-900 leading-relaxed text-center">
                <strong>Bad Brain Studio</strong> translates your brand&apos;s <strong>core creative strategy</strong> into a <strong>fully integrated suite of content</strong> to meet the demands of modern digital marketing.
              </p>
              <p className="text-xl mt-6 text-gray-700 text-center">
                Our studio offering combines <strong>creator, digital, and traditional production capabilities</strong> to deliver <strong>true creative diversity</strong>.
              </p>
            </div>
            <div className="relative">
              <div className="bg-white p-8 rounded-lg shadow-xs">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">The Challenge</h3>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Every brand has a core creative strategy.</strong> The challenge is turning that strategy into a consistent set of assets that can fuel social, product pages, web, and email while still engaging customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-8">The Problem</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              <strong>Too often, content is produced in silos</strong>: creative delivers high-end visuals, design generates product shots, and PR activates creators - resulting in work that can feel disjointed.
            </p>
          </div>

          <div className="bg-brand-blue text-white p-12 rounded-lg text-center">
            <h3 className="text-3xl font-semibold mb-6"><strong>Bad Brain Studio closes the gap.</strong></h3>
            <p className="text-xl">
              We translate your <strong>core strategy</strong> into an <strong>integrated suite of assets</strong>, built by one team from start to finish.
            </p>
          </div>
        </div>
      </section>

      <VideoShowcase />

      {/* The Approach */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-8">The Approach</h2>
          </div>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center text-xl font-semibold mr-8">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4"><strong>3D & VFX design</strong></h3>
                <p className="text-lg text-gray-700">
                  establishes tone and style with sleek product renders and high quality motion ads at scale.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center text-xl font-semibold mr-8">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4"><strong>Live production teams</strong></h3>
                <p className="text-lg text-gray-700">
                  give that style a <strong>much-needed human element</strong> with real photo and video shoots conducted under the same creative direction.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center text-xl font-semibold mr-8">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4"><strong>Creator activation</strong></h3>
                <p className="text-lg text-gray-700">
                  translates this <strong>high-end creative</strong> into <strong>authentic, socially native content</strong> expanding your reach and acquiring customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Result */}
      <section className="py-20 bg-brand-yellow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-4xl font-semibold text-gray-900">The Result</h2>
          </div>
          <p className="text-2xl text-gray-900 font-medium max-w-4xl mx-auto">
            <strong>The Result:</strong> an <strong>integrated content suite</strong> of multi-format assets built for social, e-commerce, and paid media under <strong>one cohesive vision</strong>.
          </p>
        </div>
      </section>

      {/* Process Details */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            <strong>Guided by one creative vision</strong>, we use <strong>AI and 3D design</strong> to establish a style with <strong>product visuals and motion ads at scale</strong>.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            <strong>That same vision extends into real-world production</strong>, adding another layer of brand-led content for deeper consumption, while providing the <strong>crucial human element</strong>.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            <strong>The same team directs the creator campaign</strong> that brings your product to market, ensuring <strong>every output connects and feels part of the whole</strong>.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            This approach enables <strong>creative diversity within a single, coherent story</strong>, running seamlessly across every channel.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}