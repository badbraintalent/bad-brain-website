'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/* Scroll-driven entrances for engines that don't have them natively.
 *
 * Firefox has not shipped scroll-driven animations — MDN's compat data has
 * every Firefox entry for `animation-timeline` and `animation-range` at
 * "preview", i.e. Nightly behind `layout.css.scroll-driven-animations.enabled`
 * — and neither has Safari. On those engines `animation-timeline` is dropped
 * at parse time, the animation keeps its name and `fill: both`, and duration
 * falls back to `0s`, so every entrance resolves to its 100% keyframe at once:
 * correct content, no motion. This restores the motion by driving the same
 * animations from scroll position.
 *
 * Why one component rather than an effect per section: there are 39 animated
 * elements across five pages, in CSS rules and in inline styles. A registry of
 * selectors would be a second list to keep in step with the first, so the
 * marker lives on the rule instead — any rule that sets `animation-timeline`
 * also sets `--scrub: 1`, and this finds them. Custom properties survive in
 * engines that drop the timeline, which is what makes them usable as the mark.
 *
 * Nothing here redefines any motion. Keyframes, easing and the hidden state
 * all stay in the rule that declares them; this only decides where on its own
 * timeline each animation currently sits.
 */

// Where an element's entrance starts and finishes, as a fraction of viewport
// height measured to the element's top edge. 1.0 is the fold. The default ends
// at 0.62 because `entry`-anchored CSS ranges finish the moment an element is
// fully on screen — at the bottom edge, where the motion is over before it can
// be seen. Overridable per rule with `--scrub-from` / `--scrub-to`.
const DEFAULT_FROM = 1.0
const DEFAULT_TO = 0.62

// Nominal scrub length. Never played through — `currentTime` is written
// directly — so the value only sets the resolution of the scrub.
const SCRUB_MS = 1000

type Tracked = { el: Element; anim: Animation; from: number; to: number }

const ScrollScrub = () => {
  /* Keyed on the route, not on mount. This renders in the root layout, which
     survives every in-app `next/link` navigation, so an effect bound to mount
     would only ever see the first page loaded and every page reached through
     the nav would keep its unscrubbed 0s animations — content on its end state,
     no motion. Re-keying also drops the outgoing page's tracked elements, which
     would otherwise accumulate across a session as detached nodes. */
  const pathname = usePathname()

  useEffect(() => {
    if (!document.documentElement.classList.contains('js-anim')) return

    // Set on teardown so a callback already queued against the outgoing route
    // can't measure or drive elements that have been unmounted since.
    let live = true

    const num = (cs: CSSStyleDeclaration, prop: string, fallback: number) => {
      const v = parseFloat(cs.getPropertyValue(prop))
      return Number.isFinite(v) ? v : fallback
    }

    const tracked: Tracked[] = []
    const claimed = new WeakSet<Element>()
    let nodeCount = -1

    /* Repeatable, because one pass at commit time is not enough. A route whose
       payload isn't in the router cache commits the new pathname before the new
       markup arrives, so the effect above can re-run against the outgoing
       page's DOM and find nothing — reliably the first navigation of a session,
       whichever route it goes to. Later passes pick up whatever has since
       mounted; `claimed` keeps each element from being re-timed once it has
       been. The node count is the cheap guard that keeps the full walk off the
       reflow path, since scans that can't find anything new are the common
       case. */
    const scan = () => {
      const all = document.getElementsByTagName('*')
      if (all.length === nodeCount) return
      nodeCount = all.length

      for (const el of Array.from(all)) {
        if (claimed.has(el)) continue
        const cs = getComputedStyle(el)
        // `--scrub` is registered non-inheriting with an initial value of 0, so
        // every element resolves it — only the marked ones resolve it to 1.
        if (parseFloat(cs.getPropertyValue('--scrub')) !== 1) continue
        // Absent under `prefers-reduced-motion`, whose global `animation: none`
        // removes the animation outright. That is also what leaves the element
        // visible, so there is nothing to do and nothing to undo.
        if (cs.animationName === 'none') continue

        const anim = el.getAnimations().find((a) => a.effect)
        if (!anim) continue

        // Give the animation a duration and stop it, in that order: with the
        // stock `0s` it is already sitting on its 100% keyframe, and pausing
        // first would pin it there. Writing duration first moves it back onto a
        // real timeline that `currentTime` can address.
        //
        // Driven through the animation object rather than the element's inline
        // style. Next hydrates the page segment separately from the layout that
        // renders this component, so this can run while the segment's markup is
        // still server HTML — an inline `animation-duration` written here is an
        // attribute React did not render, and hydration reports it as a
        // mismatch. Timing set on the effect never touches an attribute.
        anim.effect!.updateTiming({ duration: SCRUB_MS })
        anim.pause()
        claimed.add(el)
        tracked.push({
          el,
          anim,
          from: num(cs, '--scrub-from', DEFAULT_FROM),
          to: num(cs, '--scrub-to', DEFAULT_TO),
        })
      }
    }

    /* Document offsets, cached. `getBoundingClientRect()` per element per frame
       is a layout read inside the scroll handler — with 13 tracked elements on
       the homepage that is a forced layout flush on every frame of every
       scroll, which is the expensive half of this component. Position relative
       to the document only changes on reflow, so it is measured here and the
       viewport-relative top is derived as `docTop - scrollY`: arithmetic, no
       layout.

       An element's own transform must not feed back into its measurement, so
       these are read while every animation is parked at 0 — the transform is
       accounted for by reading `offsetTop` up the offset chain rather than the
       rect, which is untransformed by definition. */
    let vh = window.innerHeight
    const offsets = new Map<Element, number>()
    const measure = () => {
      vh = window.innerHeight
      for (const { el } of tracked) {
        let top = 0
        let node = el as HTMLElement | null
        while (node) {
          top += node.offsetTop
          node = node.offsetParent as HTMLElement | null
        }
        offsets.set(el, top)
      }
    }

    let raf = 0
    // Last value written per animation. Writing `currentTime` invalidates that
    // element's style even when the value is identical, so a page where most
    // entrances are already finished would still pay for all of them on every
    // frame. Skipping unchanged writes means only the two or three elements
    // actually mid-entrance cost anything.
    const last = new Map<Animation, number>()
    const update = () => {
      raf = 0
      const y = window.scrollY
      for (const { el, anim, from, to } of tracked) {
        const top = (offsets.get(el) ?? 0) - y
        const p = Math.max(0, Math.min(1, (from * vh - top) / ((from - to) * vh)))
        const t = p * SCRUB_MS
        if (last.get(anim) === t) continue
        last.set(anim, t)
        anim.currentTime = t
      }
    }
    // One write per frame. A raw scroll handler fires far more often than the
    // compositor can use, and this touches every tracked animation on the page.
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update)
    }
    const onReflow = () => {
      if (!live) return
      scan()
      measure()
      onScroll()
    }

    scan()
    measure()
    update()
    // Fonts land after first paint and reflow everything below them, so the
    // offsets taken above would be stale for the rest of the session.
    document.fonts?.ready.then(onReflow).catch(() => {})
    // So does every poster, video and image that arrives without reserved
    // height — the media-heavy pages push whole sections down long after the
    // first measurement, and an element measured before the shift is scrubbed
    // against a position it no longer occupies. Watching the document's own box
    // catches those reflows, and catches late-arriving markup for `scan`;
    // `resize` alone does neither, since the viewport never changed. Only reads
    // here, and `currentTime` writes transforms, which don't feed back into
    // layout — so this can't drive itself.
    const ro = new ResizeObserver(onReflow)
    ro.observe(document.documentElement)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onReflow)
    return () => {
      live = false
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onReflow)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [pathname])

  return null
}

export default ScrollScrub
