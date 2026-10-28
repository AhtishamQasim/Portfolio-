import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NeuralCanvas from '@/components/effects/NeuralCanvas';

/** Fixed backdrop: neural network, grid, parallax orbs and a soft glow that follows the mouse. */
export default function Background({ theme }) {
  const glow = useRef(null);
  const { scrollYProgress } = useScroll();
  // Each orb drifts at its own speed as the page scrolls.
  const ya = useTransform(scrollYProgress, [0, 1], [0, -420]);
  const yb = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const yc = useTransform(scrollYProgress, [0, 1], [0, -620]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -180]);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return undefined;
    const onMove = (e) => {
      glow.current.style.left = `${e.clientX}px`;
      glow.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <>
      <div className="bg" aria-hidden="true">
        <NeuralCanvas theme={theme} />
        <motion.div className="bg-grid" style={{ y: gridY }} />
        <motion.div className="orb-layer" style={{ y: ya }}><div className="orb orb-a" /></motion.div>
        <motion.div className="orb-layer" style={{ y: yb }}><div className="orb orb-b" /></motion.div>
        <motion.div className="orb-layer" style={{ y: yc }}><div className="orb orb-c" /></motion.div>
      </div>
      <div className="cursor-glow" ref={glow} aria-hidden="true" />
    </>
  );
}
