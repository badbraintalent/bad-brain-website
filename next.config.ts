import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* `next build` and `next dev` share .next by default, so a verification build
     run while the dev server is up overwrites the chunks it is serving — every
     /_next/static/chunks/* request then 404s and the page loads with no client
     JS at all. Set NEXT_DIST_DIR to build somewhere else and leave dev alone:
       NEXT_DIST_DIR=.next-verify npm run build                              */
  distDir: process.env.NEXT_DIST_DIR || ".next",

  /* Community Atlases are static exports in public/atlas (see
     docs/COMMUNITY-ATLAS.md), served at /atlas/<slug> without the .html. */
  async rewrites() {
    return [{ source: "/atlas/:slug", destination: "/atlas/:slug.html" }];
  },

  /* The atlases are third-party HTML running on our origin, so lock them down:
     their own inline script and styles, embedded images, our web fonts and
     nothing else — no network requests, no framing elsewhere. A full
     `sandbox` would give them a null origin and block the same-origin fonts.
     Public but unlisted: noindex keeps them out of search. */
  async headers() {
    return [
      {
        source: "/atlas/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'none'",
              "script-src 'unsafe-inline'",
              "style-src 'unsafe-inline'",
              "img-src 'self' data:",
              "font-src 'self'",
              "base-uri 'none'",
              "form-action 'none'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },

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
