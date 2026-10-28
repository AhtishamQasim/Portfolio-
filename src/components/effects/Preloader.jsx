import { useEffect, useState } from 'react';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { INTRO_DURATION } from '@/lib/motion';
import ScrambleText from '@/components/ui/ScrambleText';

/** Full-screen intro: spinning rings, the AQ mark, a decoding status line and a 0–100% counter. */
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add('is-loading');
    const counter = animate(0, 100, { duration: INTRO_DURATION - 0.25, ease: [0.4, 0, 0.2, 1], onUpdate: (v) => setPct(Math.round(v)) });
    const timer = setTimeout(() => setVisible(false), INTRO_DURATION * 1000);
    return () => {
      counter.stop();
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={() => document.documentElement.classList.remove('is-loading')}>
      {visible && (
        <motion.div
          className="loader"
          aria-hidden="true"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader-core">
            <span className="ring r1" /><span className="ring r2" /><span className="ring r3" />
            <motion.span
              className="loader-mark"
              initial={{ scale: 0, rotate: -120 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            >
              {profile.initials}
            </motion.span>
          </div>
          <ScrambleText className="loader-text" text="INITIALIZING PORTFOLIO" duration={1000} onMount />
          <div className="loader-bar"><span style={{ transform: `scaleX(${pct / 100})` }} /></div>
          <span className="loader-pct">{String(pct).padStart(3, '0')}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
