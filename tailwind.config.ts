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
        'brand-yellow': '#f5f5f5',
        'brand-blue': '#737373',
        brand: {
          yellow: '#f5f5f5',
          blue: '#737373',
        },
      },
      fontFamily: {
        'stix': ['system-ui', '-apple-system', 'sans-serif'],
        'inter': ['system-ui', '-apple-system', 'sans-serif'],
        'sans': ['system-ui', '-apple-system', 'sans-serif'],
        'serif': ['system-ui', '-apple-system', 'sans-serif'],
        'body-inter': ['system-ui', '-apple-system', 'sans-serif'],
        'body-stix': ['system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
