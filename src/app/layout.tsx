import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from '@vercel/analytics/react';
import BootIntro from "@/components/ui/BootIntro";
import DvdIdle from "@/components/ui/DvdIdle";
import PixelTrail from "@/components/ui/PixelTrail";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// NOTE: ABC Gravity / ABC Walter Neue served as DINAMO web fonts (woff2 — ~3×
// smaller than the OTFs). A DINAMO webfont licence is still required before public launch.
const gravity = localFont({
  src: "./fonts/ABCGravity-Wide.woff2",
  variable: "--font-gravity",
  display: "swap",
});

const walter = localFont({
  src: "./fonts/ABCWalterNeue-Semibold.woff2",
  variable: "--font-walter",
  display: "swap",
});

const TITLE = "Bad Brain | Creator Economy Specialists";
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
    <html lang="en" className={`${gravity.variable} ${walter.variable}`}>
      <body className="antialiased bg-white">
        <BootIntro />
        {children}
        <DvdIdle />
        <PixelTrail />
        <Analytics />
      </body>
    </html>
  );
}
