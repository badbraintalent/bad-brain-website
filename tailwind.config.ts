import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-yellow': '#F8F5D7',
        'brand-blue': '#507989',
        brand: {
          yellow: '#F8F5D7',
          blue: '#507989',
        },
      },
      fontFamily: {
        'stix': ['STIX Two Text', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
        'serif': ['STIX Two Text', 'serif'], // Ensure serif uses STIX
        // Utility classes for easy reverting
        'body-inter': ['Inter', 'sans-serif'], // Use this to revert body text
        'body-stix': ['STIX Two Text', 'serif'], // Explicit STIX for body
      },
    },
  },
  plugins: [],
}
export default config