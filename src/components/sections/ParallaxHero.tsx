"use client";

import { useEffect, useRef } from "react";

// Desktop: single line "BAD BRAIN", right-aligned, 90% viewport width
const desktopTextStyle: React.CSSProperties = {
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: "max(3rem, 17.55vw)",
  fontWeight: 900,
  lineHeight: 0.88,
  color: "white",
  userSelect: "none",
  display: "block",
  letterSpacing: "-0.03em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};

// Mobile: two lines "BAD" / "BRAIN", left-aligned, ~35vw each
// "BAD" ≈ 60% viewport width, "BRAIN" ≈ 100% viewport width
const mobileTextStyle: React.CSSProperties = {
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: "max(3rem, 35vw)",
  fontWeight: 900,
  lineHeight: 0.88,
  color: "white",
  userSelect: "none",
  display: "block",
  letterSpacing: "-0.03em",
  textTransform: "uppercase",
};

const ParallaxHero = () => {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    const section = fill?.closest(".parallax-hero") as HTMLElement | null;
    if (!fill || !section) return;

    const update = () => {
      const scrollY = window.scrollY;
      const scrollable = section.offsetHeight - window.innerHeight;
      // Fade in between 33%–66% of the hero's scroll range
      const start = scrollable * 0.33;
      const end = scrollable * 0.66;
      const progress = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));
      fill.style.opacity = String(progress);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section className="parallax-hero">
      <div className="parallax-hero-sticky">
        <video
          className="parallax-hero-video"
          src="/videos/ee1173e5-69c8-4dd1-b1e4-ee9b5bbd0b0a.mp4"
          muted loop autoPlay playsInline
        />
        <div className="parallax-hero-bg-fill" ref={fillRef} />
        {/* mix-blend-mode: difference inverts whatever is behind the white text.
            Over video: inverted video colors. Over the grey fill: near-black text.
            Supported everywhere since ~2014, no SVG masks needed. */}

        {/* Desktop: single line, right-aligned.
            clamp(min, target, max):
              min  = 4.63vw → always cuts off ≥30% of text height
              val  = 15.44vw - 20vh → targets text-top at 80vh
              max  = 6.18vw → never cuts off >40% (text always ≥60% visible) */}
        <div
          className="hidden md:flex absolute inset-0 flex-col items-end justify-end pointer-events-none mix-blend-difference"
          style={{
            zIndex: 4,
            paddingRight: "2.5vw",
            transform: "translateY(clamp(4.63vw, calc(15.44vw - 20vh), 6.18vw))",
          }}
        >
          <span style={desktopTextStyle}>Bad Brain</span>
        </div>

        {/* Mobile: two lines stacked, left-aligned.
            clamp(min, target, max):
              min  = 6.16vw → always cuts off ≥20% of last line
              val  = 61.6vw - 20vh → targets text-top at 80vh
              max  = 7vw → Bad always 100% visible, Brain always ≥77% visible */}
        <div
          className="flex md:hidden absolute inset-0 flex-col items-start justify-end pointer-events-none mix-blend-difference"
          style={{
            zIndex: 4,
            paddingLeft: "2.5vw",
            transform: "translateY(clamp(6.16vw, calc(61.6vw - 20vh), 7vw))",
          }}
        >
          <span style={mobileTextStyle}>Bad</span>
          <span style={mobileTextStyle}>Brain</span>
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;
