import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { profile } from '@/data/profile';
import { EASE } from '@/lib/motion';
import Tilt from '@/components/ui/Tilt';

const badges = [
  { cls: 'pb-a', icon: '⚡', text: '2+ yrs shipping to production' },
  { cls: 'pb-b', icon: '●', text: 'Open to work', live: true },
  { cls: 'pb-c', icon: '📍', text: 'Lahore · Remote-ready' },
];

/**
 * Animated profile photo: wipes up from the bottom while the image zooms out of a blur,
 * inside a rotating glow ring with HUD corners, a scan line and floating badges.
 */
export default function Portrait() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });

  return (
    <div className="portrait-wrap" ref={ref}>
      <Tilt className="portrait-tilt" max={10}>
        <div className="portrait">
          <span className="portrait-ring" aria-hidden="true" />
          <motion.div
            className="portrait-frame"
            initial={{ clipPath: 'inset(100% 0 0 0 round 28px)' }}
            animate={inView ? { clipPath: 'inset(0% 0 0 0 round 28px)' } : undefined}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.picture
              initial={{ scale: 1.35, filter: 'blur(12px) saturate(0.4)' }}
              animate={inView ? { scale: 1, filter: 'blur(0px) saturate(1)' } : undefined}
              transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
            >
              <source srcSet="/ahtisham-qasim.webp" type="image/webp" />
              <img src="/ahtisham-qasim.jpg" alt={`Portrait of ${profile.name}`} width="800" height="1000" loading="lazy" />
            </motion.picture>
            <span className="portrait-tint" aria-hidden="true" />
            <span className="portrait-scan" aria-hidden="true" />
          </motion.div>
          <span className="hud hud-tl" aria-hidden="true" /><span className="hud hud-tr" aria-hidden="true" />
          <span className="hud hud-bl" aria-hidden="true" /><span className="hud hud-br" aria-hidden="true" />
        </div>
      </Tilt>

      {badges.map((b, i) => (
        <motion.div
          key={b.cls}
          className={`portrait-badge ${b.cls}`}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1 + i * 0.18 }}
        >
          <span className={b.live ? 'pulse' : 'pb-ico'}>{b.live ? '' : b.icon}</span>
          {b.text}
        </motion.div>
      ))}
    </div>
  );
}
