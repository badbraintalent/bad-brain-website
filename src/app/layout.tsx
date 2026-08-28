import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from '@vercel/analytics/react';
import BootIntro from "@/components/ui/BootIntro";
import DvdIdle from "@/components/ui/DvdIdle";
import PixelTrail from "@/components/ui/PixelTrail";
import ScrollScrub from "@/components/ui/ScrollScrub";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// ABC Gravity / ABC Walter Neue served as licensed DINAMO web fonts (woff2 —
// ~3× smaller than the OTFs).
//
// `display: "block"` rather than "swap": both faces carry the brand, and swap
// guarantees a window in which every visitor is shown the system-ui fallback
// and then reflowed. Block trades that for a brief invisible-text window and
// never paints the wrong face. Each face ships a single weight, which is why
// `font-synthesis: none` in globals.css is load-bearing — see the note there.
const gravity = localFont({
  src: "./fonts/ABCGravity-Wide.woff2",
  variable: "--font-gravity",
  display: "block",
});

const walter = localFont({
  src: "./fonts/ABCWalterNeue-Semibold.woff2",
  variable: "--font-walter",
  display: "block",
});

const TITLE = "Bad Brain | Social Entertainment Agency";
const DESCRIPTION =
  "We're a specialist agency for brands, creators and artists. Four connected services for the entertainment era of social.";

export const metadata: Metadata = {
  // metadataBase makes the file-based opengraph-image.png resolve to an
  // absolute URL — without it Next can't build the share card and warns at
  // build time. On preview builds this points at the deployment's own host.
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Bad Brain",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the inline <head> script below adds `js-anim`
    // to this element before React hydrates, so the class list React
    // rendered is legitimately not the one it finds. Scoped to this element
    // only — it does not extend to any child.
    <html
      lang="en"
      className={`${gravity.variable} ${walter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks the document as "no native scroll-driven animations, but JS is
            running", which is the only state in which it is safe to hide an
            entrance element and wait for an observer to reveal it.

            Both halves matter. Without the capability test the class would land
            in Chromium too and the JS path would race the CSS one. Without the
            class the hidden state would apply wherever the property is missing
            — including with JS broken or blocked — and the section would stay
            blank with nothing left to reveal it.

            Inline and in <head> so it resolves before first paint: as a module
            or a deferred bundle it would run after the entrance elements had
            already painted at full opacity, producing a flash-then-hide. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!CSS.supports('animation-timeline: view()'))" +
              "document.documentElement.classList.add('js-anim')}catch(e){}",
          }}
        />
      </head>
      <body className="antialiased bg-white">
        <BootIntro />
        {children}
        <DvdIdle />
        <PixelTrail />
        <ScrollScrub />
        <Analytics />
      </body>
    </html>
  );
}
