"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="bg-brand-yellow relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:pt-[100px] lg:pb-[120px] pt-8 pb-8">
        {/* Flex Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center">
          {/* Left Column - Main Content */}
          <div className="mx-auto flex-1 space-y-8 text-center lg:text-left">
            {/* Big Logo above text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12 mt-6 flex justify-center lg:justify-start"
            >
              <Image
                src="/images/logo/logo.svg"
                alt="Bad Brain"
                width={400}
                height={120}
                className="h-40 sm:h-52 lg:h-64 w-auto"
                priority
              />
            </motion.div>

            {/* Dramatic Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* <h1 className="font-stix text-5xl sm:text-6xl font-normal text-gray-900">
Hey, we&apos;re{' '}
<span className="font-stix">Bad Brain.</span>
</h1> */}

              <div className="max-w-lg mx-auto lg:mx-0">
                <h1 className="font-stix text-xl sm:text-2xl lg:text-3xl font-normal text-gray-900 mb-6">
                  Hey, we&apos;re Bad Brain. We&apos;re a specialist agency
                  built for the <span>creator economy.</span>
                </h1>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="font-normal text-xl sm:text-2xl lg:text-3xl text-gray-700 space-y-3 max-w-xl mx-auto lg:mx-0">
                <p className="font-stix">
                  We <strong>consult</strong>.
                </p>
                <p className="font-stix">
                  We produce <strong>content</strong>.
                </p>
                <p className="font-stix">
                  We develop <strong>talent</strong>.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Creative Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 100, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full lg:w-[500px] lg:flex-shrink-0"
          >
            <div className="relative w-full h-[300px] lg:h-[450px]">
              {/* Creative Image Frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/hero-new.jpg"
                  alt="Professional workspace setup"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:from-black/80 lg:via-black/20 from-black/90 via-black/30"></div>

                {/* Floating content badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                    <p className=" text-xl text-white/90 leading-relaxed mb-3">
                      Bad Brain helps brands, agencies and creators work smarter
                      in a space where{" "}
                      <strong>strategy, storytelling and scale</strong> all need
                      to align.
                    </p>

                    {/* CTA */}
                    <button
                      onClick={() => {
                        const servicesSection =
                          document.getElementById("services");
                        servicesSection?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-centerfont-medium text-brand-yellow hover:text-white transition-all duration-300 group text-xl cursor-pointer"
                    >
                      Explore Our Services
                      <svg
                        className="ml-2 w-4 h-4 transition-transform group-hover:translate-y-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;