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
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <Image
                src="/images/services/consulting.svg"
                alt="Bad Brain Consulting"
                width={1200}
                height={360}
                className="h-80 w-auto filter brightness-0 invert mx-auto"
              />
            </div>
            <p className="text-2xl leading-relaxed mb-6">
              <strong>Bad Brain Consulting</strong> helps <strong>brands, agencies, and networks</strong> navigate the <strong>creator economy</strong>.
            </p>
            <p className="text-xl text-white/90">
              We help organisations answer the <strong>big strategic questions</strong>, like how do we <strong>scale with creators</strong>? How do we <strong>reduce duplication and wasted spend</strong>? How do we <strong>unlock greater ROI</strong>?
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            <p>
              <strong>Creator marketing isn&apos;t just one thing</strong> - it&apos;s a mix of activity that spans all departments, leverages a range of payment models, and delivers a wide variety of outcomes. <strong>Making sense of it is hard enough; running it efficiently is even harder.</strong>
            </p>

            <p>
              For <strong>start-ups and smaller businesses</strong>, the challenge is knowing where to begin: how to build and scale a programme from scratch with limited resources. For <strong>established brands</strong>, the challenge is <strong>scale</strong>: multiple teams, agencies, and budgets all chasing creators without a unified approach. The result? Fragmentation, duplication, and missed opportunities.
            </p>

            {/* Final section with integrated graphic */}
            <div className="grid md:grid-cols-2 gap-20 items-center mt-16">
              <div className="relative">
                <Image
                  src="/images/graphic-5.svg"
                  alt="Creator strategy framework illustration"
                  width={500}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div>
                <p className="text-xl font-medium text-gray-900 mb-6">
                  <strong>Bad Brain Consulting</strong> helps brands, agencies, and networks step back and see the <strong>bigger picture</strong>.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We design <strong>cross-functional creator strategies</strong> that cut through complexity, improve efficiency, and deliver clearer results. Whether you&apos;re starting small or managing a global programme, we provide the frameworks and insights to make creator marketing work harder for your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-brand-yellow">
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