import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* `next build` and `next dev` share .next by default, so a verification build
     run while the dev server is up overwrites the chunks it is serving — every
     /_next/static/chunks/* request then 404s and the page loads with no client
     JS at all. Set NEXT_DIST_DIR to build somewhere else and leave dev alone:
       NEXT_DIST_DIR=.next-verify npm run build                              */
  distDir: process.env.NEXT_DIST_DIR || ".next",

  async redirects() {
    return [
      {
        source: "/services/consulting",
        destination: "/services/blueprint",
        permanent: true,
      },
      {
        source: "/services/talent",
        destination: "/services/connect",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
