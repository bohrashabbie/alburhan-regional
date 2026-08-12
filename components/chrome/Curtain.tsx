'use client';

import * as React from 'react';

/**
 * The first-load curtain.
 *
 * Two panels in the page's own canvas colour cover the viewport. A crimson
 * hairline draws across the seam between them, a frame is ruled into the
 * margin, the wordmark rises out of a clip mask, a counter runs to 100, and
 * then the seam blooms into a filament as the panels part — the page behind
 * settling from a 3% overscale.
 *
 * Design constraints that keep it from reading cheap:
 *  · nothing spins, bounces or pulses; every move is a single expo ease
 *  · the panels are canvas-coloured, so it reads as the page opening rather
 *    than as a black splash screen being removed
 *  · it is over in 2.9 s and never runs twice in a session
 *  · the counter is tied to the real timeline, so it never sits at 99%
 *
 * All animation is CSS (see `#curtain` in globals.css) on transform/opacity
 * only. This component just owns the class flips, the counter, and teardown.
 */

const START_DELAY = 400;   // counter starts after the seam is under way
const COUNT_MS = 1_150;    // 0 → 100
const LIFT_AT = 1_750;     // matches --ct-out in globals.css
const TEARDOWN = 2_950;    // panels are fully off-screen by here

export function Curtain() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const numRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const html = document.documentElement;

    // The boot script in app/layout.tsx already decided whether we play.
    if (html.getAttribute('data-intro') === 'off') {
      html.classList.remove('ct-active');
      return;
    }

    sessionStorage.setItem('ab_intro', '1');

    const el = rootRef.current;
    if (!el) return;

    // Lock scrolling for the duration — a curtain you can scroll behind is a
    // curtain that has already failed.
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    el.classList.add('ct-run');

    const timers: ReturnType<typeof setTimeout>[] = [];
    let raf = 0;

    // Counter, driven off the same clock as the CSS so the two stay in step.
    const t0 = performance.now() + START_DELAY;
    const tick = (now: number) => {
      const p = Math.min(Math.max((now - t0) / COUNT_MS, 0), 1);
      const eased = 1 - Math.pow(1 - p, 2.2);
      if (numRef.current) {
        numRef.current.textContent = String(Math.round(eased * 100));
      }
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    timers.push(
      setTimeout(() => {
        html.classList.remove('ct-active');
        html.classList.add('ct-lifting');
      }, LIFT_AT),
    );

    timers.push(
      setTimeout(() => {
        html.style.overflow = prevOverflow;
        html.classList.remove('ct-lifting');
        html.setAttribute('data-intro', 'off');
        el.setAttribute('data-done', 'true');
      }, TEARDOWN),
    );

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      html.style.overflow = prevOverflow;
      html.classList.remove('ct-active', 'ct-lifting');
    };
  }, []);

  return (
    <div id="curtain" ref={rootRef} aria-hidden="true">
      <i className="ct-panel ct-panel-t" />
      <i className="ct-panel ct-panel-b" />

      <div className="ct-veil">
        <div className="ct-frame">
          <i /><i /><i /><i />
        </div>

        <div className="ct-word">
          <span className="ct-mask">
            <span>Al-Burhan</span>
          </span>
          <span className="ct-mask">
            <span>
              Regional <em>Lighting</em>
            </span>
          </span>
        </div>

        <div className="ct-meta ct-tl">Est. 2004 · Kuwait</div>
        <div className="ct-meta ct-tr">Catalogue 2025</div>
        <div className="ct-meta ct-bl">Kuwait · UAE · China · Egypt</div>
        <div className="ct-meta ct-br">
          <span>Loading</span>
          <b>
            {/* Rendered as 0 on the server; the rAF loop takes over on mount. */}
            <span ref={numRef} suppressHydrationWarning>0</span>
            <em>%</em>
          </b>
        </div>
      </div>

      <i className="ct-seam" />
    </div>
  );
}

export default Curtain;
