import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cx } from '@/lib/rich';

export const EASE = [0.2, 0.8, 0.2, 1];

/**
 * Fades and lifts its content in the first time it scrolls into view.
 * Also adds the `in` class, which CSS uses for chart, bar and ring animations.
 */
export default function Reveal({ as = 'div', className, delay = 0, y = 26, children, ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
  const Component = motion[as];
  return (
    <Component
      ref={ref}
      className={cx(className, inView && 'in')}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}
