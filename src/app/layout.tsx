import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from '@vercel/analytics/react';
import BootIntro from "@/components/ui/BootIntro";
import DvdIdle from "@/components/ui/DvdIdle";
import PixelTrail from "@/components/ui/PixelTrail";
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

export const metadata: Metadata = {
  title: "Bad Brain Media | Creator Economy Specialists",
  description: "We're a specialist agency built for the creator economy. We consult. We produce content. We develop talent.",
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
