import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

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
    <html lang="en">
      <body className="font-stix antialiased bg-brand-yellow">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
