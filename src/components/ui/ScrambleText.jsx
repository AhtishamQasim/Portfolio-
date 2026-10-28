import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/lib/motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/\\[]{}';

/** "Decodes" text from random glyphs, left to right, the first time it is seen (or on mount). */
export default function ScrambleText({ text, className, duration = 900, delay = 0, onMount = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const [out, setOut] = useState(text);
  const start = onMount || inView;

  useEffect(() => {
    if (!start || reduce) return undefined;
    let raf = 0;
    let t0 = 0;
    const timer = setTimeout(() => {
      const step = (now) => {
        t0 ||= now;
        const settled = Math.floor(((now - t0) / duration) * text.length);
        setOut(
          [...text]
            .map((ch, i) => (i < settled || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
            .join(''),
        );
        if (settled < text.length) raf = requestAnimationFrame(step);
        else setOut(text);
      };
      raf = requestAnimationFrame(step);
    }, delay * 1000);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [start, reduce, text, duration, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}
