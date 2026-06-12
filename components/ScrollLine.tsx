'use client';

import { useEffect, useId, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* A decorative gold line that draws itself as you scroll, weaving down the
   page behind the content. Place inside a `position: relative` container —
   it fills the container and scrubs from its top to its bottom.

   The path lives in a 0–100 viewBox stretched to the container
   (preserveAspectRatio="none"); strokes stay crisp via
   vector-effect: non-scaling-stroke. */

const DEFAULT_PATH =
  'M 50 0 ' +
  'C 50 3.5, 86 4.5, 86 9 ' +
  'C 86 14.5, 12 15, 12 21 ' +
  'C 12 27.5, 88 27, 88 34 ' +
  'C 88 41.5, 14 41, 14 48 ' +
  'C 14 55.5, 86 55, 86 62 ' +
  'C 86 69.5, 12 69, 12 76 ' +
  'C 12 83.5, 50 84, 50 90 ' +
  'L 50 100';

type ScrollLineProps = {
  d?: string;
  className?: string;
};

export default function ScrollLine({ d = DEFAULT_PATH, className }: ScrollLineProps) {
  const id = useId().replace(/[:]/g, '');
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const line = lineRef.current;
    const glow = glowRef.current;
    if (!wrap || !line || !glow) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const len = line.getTotalLength();

    for (const p of [line, glow]) {
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = reduced ? '0' : `${len}`;
    }
    if (reduced) return;

    const tween = gsap.to([line, glow], {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: wrap.parentElement ?? wrap,
        start: 'top 65%',
        end: 'bottom bottom',
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [d]);

  return (
    <div ref={wrapRef} className={`scroll-line-wrap ${className ?? ''}`} aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id={`goldline-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4E3BC" />
            <stop offset="40%" stopColor="#F0BA30" />
            <stop offset="75%" stopColor="#D4A017" />
            <stop offset="100%" stopColor="#E8962A" />
          </linearGradient>
        </defs>
        {/* faint guide of the full route */}
        <path
          d={d}
          stroke="rgba(212, 160, 23, 0.10)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        {/* soft glow under the drawn line */}
        <path
          ref={glowRef}
          d={d}
          stroke={`url(#goldline-${id})`}
          strokeWidth={6}
          strokeLinecap="round"
          opacity={0.22}
          vectorEffect="non-scaling-stroke"
        />
        {/* the drawn line itself */}
        <path
          ref={lineRef}
          d={d}
          stroke={`url(#goldline-${id})`}
          strokeWidth={1.7}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
