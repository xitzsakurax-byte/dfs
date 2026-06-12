'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const WORDS = ['Wortschatz', 'Grammatik', 'Schreiben', 'Hörverstehen', 'Prüfung'];

/* Landing preloader: counts 0→100 while cycling German skill words,
   then wipes upward. Calls onDone when finished. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      doneRef.current();
      return;
    }

    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => doneRef.current(),
    });

    tl.to(counter, {
      v: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(counter.v);
        setCount(v);
        setWordIdx(Math.min(WORDS.length - 1, Math.floor((v / 100) * WORDS.length)));
      },
    });

    tl.to(rootRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: 'power3.inOut',
      delay: 0.1,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="preloader">
      <div className="text-center px-6">
        <div className="preloader-word" aria-hidden>
          {WORDS[wordIdx]}
        </div>
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="h-px w-16" style={{ background: 'var(--line-2)' }}>
            <div className="h-px" style={{ width: `${count}%`, background: 'var(--gold)', transition: 'width 0.1s linear' }} />
          </div>
          <span className="preloader-count text-sm">{count}%</span>
        </div>
        <span className="sr-only">Loading GermanForge</span>
      </div>
    </div>
  );
}
