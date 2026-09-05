"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/* Three renditions, each with its own poster so the painted first frame matches
   the file that follows it.

   The full reel is ~7MB — far too heavy for phones on cellular (it dominated
   the mobile Lighthouse LCP), so narrow viewports get a lighter rendition.

   Portrait viewports get the 9:16 master instead of a downscaled 16:9. The
   video is `object-fit: cover`, so a 16:9 source on a phone is shown as a
   centre strip blown up ~4x — most of the frame is thrown away and what
   survives is soft. The 9:16 cut fills the same screen close to 1:1. It is a
   longer edit than the 16:9 (51s vs 13s) and so a bigger file, but it streams
   progressively: the up-front cost is the first seconds, not the whole thing.

   Landscape phones and tablets keep the 960px 16:9 file — the 9:16 would crop
   to a sliver there, which is the same fault in the other axis. */
const MAIN_VIDEO = "/videos/brand/hero-main.mp4";
const MOBILE_VIDEO = "/videos/brand/hero-main-960.mp4";
const PORTRAIT_VIDEO = "/videos/brand/hero-main-916.mp4";
const POSTER = "/videos/brand/hero-main-poster.jpg";
const PORTRAIT_POSTER = "/videos/brand/hero-main-916-poster.jpg";

// Full horizontal logo (mark + wordmark), all-white knockout art.
const HERO_LOGO = "/images/brand/logo/BB_Horizontal.svg";

/* The signature lockup, centred and shown whole. It used to run oversized and
   bottom-anchored (135vw, translateY(41%)), which cropped the mark.

   Sized by width with a max-height ceiling: on a replaced element with
   height:auto, max-height scales the width down proportionally, so the lockup
   fits both a wide desktop and a short landscape phone without cropping.

   Hidden at load — the film carries its own Bad Brain branding, so the lockup
   only prints in on scroll (stepped bottom-up clip wipe driven by the same
   scroll handler as the pixel-field fade; see the effect below).

   Plain <img> on purpose: the source is an SVG, which next/image passes through
   untouched (and only with dangerouslyAllowSVG), so it would buy no bytes while
   adding a wrapper element inside the clip below. */
function HeroLogo({ clipRef }: { clipRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={clipRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 4, clipPath: "inset(100% 0 0 0)" }}
    >
      <div className="hidden md:flex absolute inset-0 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_LOGO}
          alt="Bad Brain"
          draggable={false}
          style={{ width: "min(72vw, 1000px)", height: "auto", maxHeight: "60vh", display: "block" }}
        />
      </div>
      <div className="flex md:hidden absolute inset-0 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_LOGO}
          alt="Bad Brain"
          draggable={false}
          style={{ width: "min(86vw, 30rem)", height: "auto", maxHeight: "50vh", display: "block" }}
        />
      </div>
    </div>
  );
}

const ParallaxHero = () => {
  const fillRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  // src is chosen client-side so SSR can't bake the wrong rendition into the
  // HTML; until then the poster holds the frame.
  const [rendition, setRendition] = useState<{ src?: string; poster: string }>({
    poster: POSTER,
  });

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 1024px)");
    const portrait = window.matchMedia("(max-width: 1024px) and (orientation: portrait)");
    const pick = () => {
      if (portrait.matches) return { src: PORTRAIT_VIDEO, poster: PORTRAIT_POSTER };
      if (narrow.matches) return { src: MOBILE_VIDEO, poster: POSTER };
      return { src: MAIN_VIDEO, poster: POSTER };
    };
    // Re-picked on rotation: a phone turned landscape would otherwise hold the
    // 9:16 file and show a cropped sliver of it. The swap restarts playback,
    // which is the cheaper of the two faults.
    const apply = () => setRendition((prev) => {
      const next = pick();
      return next.src === prev.src ? prev : next;
    });
    apply();
    narrow.addEventListener("change", apply);
    portrait.addEventListener("change", apply);
    return () => {
      narrow.removeEventListener("change", apply);
      portrait.removeEventListener("change", apply);
    };
  }, []);

  // Scroll-driven pixel-field fade + logo print-in
  useEffect(() => {
    const fill = fillRef.current;
    const section = fill?.closest(".parallax-hero") as HTMLElement | null;
    if (!fill || !section) return;
    // Cache layout reads (refreshed on resize) and coalesce scroll events to
    // one rAF write; skip the write entirely when the clamped value hasn't
    // changed so scrolling below the hero doesn't invalidate this layer.
    let scrollable = 0;
    let lastOpacity = -1;
    let lastClip = -1;
    let raf = 0;
    const measure = () => {
      scrollable = section.offsetHeight - window.innerHeight;
    };
    const update = () => {
      raf = 0;
      // Nearly the whole pinned distance: starting late read as "scrolling
      // does nothing", and finishing early left a long static period while
      // the hero was still pinned.
      const start = 0;
      const end = scrollable * 0.9;
      const linear = Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)));
      // Ease-out: linear opacity is imperceptible below ~0.1, which made the
      // first wheel-turns feel dead — front-load the visible change instead.
      const progress = 1 - Math.pow(1 - linear, 1.8);
      // Logo prints in bottom-up over the same window, quantised to 12 steps
      // so the wipe reads as frames rather than a soft fade.
      const clip = Math.round(progress * 12) / 12;
      if (clip !== lastClip) {
        lastClip = clip;
        const logo = logoRef.current;
        if (logo) logo.style.clipPath = `inset(${(1 - clip) * 100}% 0 0 0)`;
      }
      if (progress === lastOpacity) return;
      lastOpacity = progress;
      fill.style.opacity = String(progress);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="parallax-hero">
      <div className="parallax-hero-sticky">
        <video
          className="parallax-hero-video"
          src={rendition.src}
          poster={rendition.poster}
          muted
          loop
          autoPlay
          playsInline
        />
        <div className="parallax-hero-bg-fill" ref={fillRef} />
        <HeroLogo clipRef={logoRef} />
      </div>
    </section>
  );
};

export default ParallaxHero;
