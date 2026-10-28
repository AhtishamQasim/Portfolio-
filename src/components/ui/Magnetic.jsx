import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/lib/motion';

/** Pulls its child a few pixels towards the cursor, like a magnet. */
export default function Magnetic({ children, strength = 0.25 }) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span className="magnetic" style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  );
}
