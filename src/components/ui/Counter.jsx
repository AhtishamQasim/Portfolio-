import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { useReducedMotion } from '@/lib/motion';

const format = (v, decimals, suffix) => v.toFixed(decimals) + suffix;

/** Counts up from 0 the first time it is seen. Renders the final value until then. */
export default function Counter({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [text, setText] = useState(format(value, decimals, suffix));

  useEffect(() => {
    if (!inView || reduce) return undefined;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setText(format(v, decimals, '')),
      onComplete: () => setText(format(value, decimals, suffix)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, decimals, suffix]);

  return <b ref={ref}>{text}</b>;
}
