import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'

export default function ConsultingPage() {
  const services = [
    '<strong>Optimisation and auditing</strong> of your existing strategy and partnerships to unlock efficiencies and improve budget allocation.',
    '<strong>Creator programme design</strong> with implementation tailored to your brand, based on clear actionable strategies.',
    '<strong>Development of cross-functional frameworks</strong> to break down departmental silos and improve ROI.',
    '<strong>Strengthen creator and partner relationships</strong> by refining outreach, pricing, usage, and contract policies.',
    '<strong>Creative ideation and execution</strong>, from concept to campaign delivery.',
    '<strong>Workshops and training</strong> to up-skill your team and embed best practices throughout.'
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
                  src="/images/logo/logo.svg"
                  alt="Bad Brain"
                  width={120}
                  height={40}
                  className="h-10 w-auto filter brightness-0 invert mb-4"
                />
                <h1 className="text-5xl font-semibold mb-6">CONSULTING</h1>
              </div>
              <p className="text-xl leading-relaxed">
                <strong className="text-brand-yellow">Bad Brain Consulting</strong> helps <strong className="text-brand-yellow">brands, agencies, and networks</strong> navigate the <strong className="text-brand-yellow">creator economy</strong>.
              </p>
              <p className="text-lg mt-6 text-white/90">
                We help organisations answer the <strong className="text-brand-yellow">big strategic questions</strong>, like how do we <strong className="text-brand-yellow">scale with creators</strong>? How do we <strong className="text-brand-yellow">reduce duplication and wasted spend</strong>? How do we <strong className="text-brand-yellow">unlock greater ROI</strong>?
              </p>
            </div>
            <div className="relative">
              <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-semibold mb-6">The Challenge</h3>
                <p className="text-white/90 leading-relaxed">
                  <strong className="text-brand-yellow">Creator marketing isn&apos;t just one thing</strong> - it&apos;s a mix of activity that spans all departments, leverages a range of payment models, and delivers a wide variety of outcomes.
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
                <strong className="text-brand-blue">Making sense of it is hard enough; running it efficiently is even harder.</strong>
              </p>
              <p className="text-lg text-gray-700 mb-6">
                For <strong className="text-brand-blue">start-ups and smaller businesses</strong>, the challenge is knowing where to begin: how to build and scale a programme from scratch with limited resources.
              </p>
              <p className="text-lg text-gray-700">
                For <strong className="text-brand-blue">established brands</strong>, the challenge is <strong className="text-brand-blue">scale</strong>: multiple teams, agencies, and budgets all chasing creators without a unified approach.
              </p>
            </div>
            <div className="bg-brand-yellow p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">The Result?</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-brand-blue rounded-full mr-4"></div>
                  <span className="text-lg text-gray-700">Fragmentation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-brand-blue rounded-full mr-4"></div>
                  <span className="text-lg text-gray-700">Duplication</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-brand-blue rounded-full mr-4"></div>
                  <span className="text-lg text-gray-700">Missed opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-8">Our Solution</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              <strong className="text-brand-blue">Bad Brain Consulting</strong> helps brands, agencies, and networks step back and see the <strong className="text-brand-blue">bigger picture</strong>. We design <strong className="text-brand-blue">cross-functional creator strategies</strong> that cut through complexity, improve efficiency, and deliver clearer results.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <p className="text-lg text-gray-700 text-center">
              Whether you&apos;re starting small or managing a global programme, we
              provide the frameworks and insights to make creator marketing work
              harder for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-semibold text-gray-900 mb-16 text-center">Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                {/* <div className="flex items-start">
                  <Image
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