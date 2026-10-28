import { useEffect, useRef } from 'react';
import NeuralCanvas from '@/components/effects/NeuralCanvas';

/** Fixed backdrop: neural network, grid, glowing orbs and a soft glow that follows the mouse. */
export default function Background({ theme }) {
  const glow = useRef(null);

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
        <div className="bg-grid" />
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
      </div>
      <div className="cursor-glow" ref={glow} aria-hidden="true" />
    </>
  );
}
