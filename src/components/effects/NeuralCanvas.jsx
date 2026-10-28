import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/lib/motion';

const LINK = 140; // px: nodes closer than this are joined
const MOUSE_LINK = 190;

function cssRgb(name) {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(name).trim().replace('#', '');
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(',');
}

/** Drifting network of nodes that link to each other and reach for the cursor. */
export default function NeuralCanvas({ theme }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    const colA = cssRgb('--a1');
    const colB = cssRgb('--a2');
    let W = 0;
    let H = 0;
    let nodes = [];
    let raf = 0;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(28, Math.min(90, Math.round((W * H) / 17000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
      }));
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
          if (d2 < LINK * LINK) {
            ctx.strokeStyle = `rgba(${colA},${0.22 * (1 - Math.sqrt(d2) / LINK)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < MOUSE_LINK) {
          ctx.strokeStyle = `rgba(${colB},${0.55 * (1 - dm / MOUSE_LINK)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(${i % 3 ? colA : colB},.85)`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      frame();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!reduce && !raf && !document.hidden) loop();
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onResize = () => {
      resize();
      if (reduce) frame();
    };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    if (reduce) frame();
    else start();
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [theme, reduce]);

  return <canvas id="neural" ref={ref} />;
}
