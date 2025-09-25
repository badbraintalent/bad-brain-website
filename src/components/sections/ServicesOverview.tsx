'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { track } from '@vercel/analytics'

const ServicesOverview = () => {
return (
<section id="services" className="py-20 bg-gray-50 relative overflow-hidden">

{/* Marquee Text */}
{/* <div className="mb-16">
<MarqueeText
text="✦ CREATOR ECONOMY ✦ STRATEGY ✦ CONTENT PRODUCTION ✦ TALENT DEVELOPMENT"
className=" text-sm font-medium text-brand-blue/40 py-4"
speed={30}
/>
</div> */}

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

{/* Header */}
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
viewport={{ once: true }}
className="text-center mb-20"
>
<h2 className="font-stix text-4xl sm:text-5xl font-normal text-gray-900 mb-8">
<span className="font-bold">Integrated services</span> across{' '}
<span className="font-bold">consulting</span>,{' '}
<span className="font-bold">production</span>, and{' '}
<span className="font-bold">talent development</span>
</h2>
</motion.div>

{/* Equal Services Grid Layout */}
<div className="grid lg:grid-cols-3 gap-8">

{/* Consulting */}
<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
viewport={{ once: true }}
className="group"
>
<div className="bg-brand-blue p-8 rounded-lg shadow-xs relative overflow-hidden h-full">
<div className="relative z-10">
<div className="mb-6 flex justify-center">
<Image
src="/images/services/consulting.svg"
alt="Bad Brain Consulting"
width={800}
height={240}
className="h-40 w-auto filter brightness-0 invert"
/>
</div>
<p className=" text-lg text-white/90 leading-relaxed mb-8">
We help <strong>brands, agencies, and networks</strong> design and implement <strong>cross-functional creator strategies</strong> that reduce duplication, improve efficiency and deliver outcomes.
</p>
<Link
href="/services/consulting"
className="inline-flex items-centerfont-medium text-white hover:text-white/80 transition-all duration-300 group"
onClick={() => track('Service Link Click', { service: 'Consulting' })}
>
Learn More
<ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
</Link>
</div>
</div>
</motion.div>

{/* Studio */}
<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay: 0.1 }}
viewport={{ once: true }}
className="group"
>
<div className="bg-white p-8 rounded-lg shadow-xs relative h-full border border-gray-100">
<div className="mb-6 flex justify-center">
<Image
src="/images/services/studio.svg"
alt="Bad Brain Studio"
width={800}
height={240}
className="h-40 w-auto"
/>
</div>
<p className=" text-lg text-gray-700 leading-relaxed mb-8">
Translates your <strong>core creative strategy</strong> into a <strong>fully integrated suite of content</strong> - built for a video and social-first world.
</p>
<Link
href="/services/studio"
className="inline-flex items-centerfont-medium text-brand-blue hover:text-brand-blue/80 transition-all duration-300 group"
onClick={() => track('Service Link Click', { service: 'Studio' })}
>
Learn More
<ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
</Link>
</div>
</motion.div>

{/* Talent */}
<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay: 0.2 }}
viewport={{ once: true }}
className="group"
>
<div className="bg-brand-yellow p-8 rounded-lg shadow-xs relative h-full">
<div className="mb-6 flex justify-center">
<Image
src="/images/services/talent.svg"
alt="Bad Brain Talent"
width={800}
height={240}
className="h-40 w-auto"
/>
</div>
<p className=" text-lg text-gray-700 leading-relaxed mb-8">
<strong>Representation and development services</strong> for up and coming content creators. We help identify <strong>brand partners</strong> and secure <strong>paid opportunities</strong>.
</p>
<Link
href="/services/talent"
className="inline-flex items-centerfont-medium text-brand-blue hover:text-brand-blue/80 transition-all duration-300 group"
onClick={() => track('Service Link Click', { service: 'Talent' })}
>
Learn More
<ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
</Link>
</div>
</motion.div>

</div>
</div>
</section>
)
}

export default ServicesOverview