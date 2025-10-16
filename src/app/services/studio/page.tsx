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
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <Image
                src="/images/services/studio.svg"
                alt="Bad Brain Studio"
                width={1200}
                height={360}
                className="h-80 w-auto mx-auto"
              />
            </div>
            <p className="text-2xl text-gray-900 leading-relaxed mb-6">
              Generative AI is transforming creative production at an incredible pace; for brands, the challenge isn&apos;t whether to use it - it&apos;s knowing when to use it. When to embrace low-cost, high-scale content generation, and when to invest in traditional production that captures a human centric story.
            </p>
            <p className="text-xl text-gray-700">
              We believe generative, traditional, and creator-led production will all coexist - but to work, these styles need to feel cohesive, and <strong>aligned to a single clear creative strategy.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <p className="text-xl text-gray-700 leading-relaxed">
              Generative AI (or synthetic content) should be considered as your backdrop [landing pages, product pages, motion catalog assets, and display ads]
            </p>

            <p className="text-xl text-gray-700 leading-relaxed">
              <strong>Traditional, human-centred production is where your brand&apos;s deepest stories will be told</strong> - building emotional connection through long-form placements [TV, OOH, CTV, and experiential]
            </p>

            <p className="text-xl text-gray-700 leading-relaxed">
              <strong>Creators</strong> will remain your social shop front - a face that connects audiences to your brand through familiarity, relatability and aspiration.
            </p>
          </div>
        </div>
      </section>

      <VideoShowcase />

      {/* The Approach */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">Bad Brain Studio is a solution designed to deliver all three:</h2>
          </div>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex items-center">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center text-xl font-semibold mr-8">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Generative AI and Digitally Rendered Assets</h3>
                <p className="text-lg text-gray-700">
                  Low cost, high scale ad units that establish tone and style with sleek product renders and high quality motion ads at scale.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center text-xl font-semibold mr-8">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Live Production</h3>
                <p className="text-lg text-gray-700">
                  Providing a much-needed human element with photo and video shoots conducted under the same creative direction.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center text-xl font-semibold mr-8">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Creator Activations</h3>
                <p className="text-lg text-gray-700">
                  Translating this creative brief into authentic, socially native content that expands your reach and acquires customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      <Footer />
    </main>
  )
}