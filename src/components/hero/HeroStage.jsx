import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { INTRO_DELAY, useReducedMotion } from '@/lib/motion';
import { heroCode, terminalLines } from '@/data/codeSamples';
import { heroChips } from '@/data/profile';
import { useLoopingTyping } from '@/hooks/useTypewriter';
import CodeView from '@/components/ui/CodeView';

const HERO_LINES = heroCode.split('\n').length;
const chipPositions = ['chip-a', 'chip-b', 'chip-c', 'chip-d'];

function useTerminalFeed(lines, keep = 5) {
  const reduce = useReducedMotion();
  const [feed, setFeed] = useState(() => (reduce ? lines.slice(1).map((l, i) => ({ ...l, key: i })) : []));

  useEffect(() => {
    if (reduce) return undefined;
    let i = 0;
    let n = 0;
    let timer;
    const next = () => {
      const line = { ...lines[i], key: n++ };
      setFeed((f) => [...f, line].slice(-keep));
      i = (i + 1) % lines.length;
      timer = setTimeout(next, i === 0 ? 3200 : 1100);
    };
    timer = setTimeout(next, (INTRO_DELAY + 1) * 1000);
    return () => clearTimeout(timer);
  }, [lines, keep, reduce]);

  return feed;
}

/** The AI-style "stage": rotating rings, live-typing editor, deploy terminal and floating tech chips. */
export default function HeroStage() {
  const typed = useLoopingTyping(heroCode);
  const feed = useTerminalFeed(terminalLines);

  return (
    <div className="stage" aria-hidden="true">
      <motion.div
        className="core"
        initial={{ scale: 0.3, opacity: 0, rotate: -90 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1.4, delay: INTRO_DELAY, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <span className="ring r1" /><span className="ring r2" /><span className="ring r3" />
        <span className="core-dot" />
      </motion.div>
      <span className="hud hud-tl" /><span className="hud hud-tr" /><span className="hud hud-bl" /><span className="hud hud-br" />

      <motion.div
        className="editor"
        initial={{ opacity: 0, y: 60, scale: 0.85, rotateY: -25 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, delay: INTRO_DELAY + 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="win-bar">
          <i /><i /><i />
          <span className="win-tab is-on">engineer.ts</span>
          <span className="win-tab">api.java</span>
        </div>
        <CodeView code={heroCode.slice(0, typed)} lang="js" lines={HERO_LINES} caret />
        <div className="scan" />
      </motion.div>

      <motion.div
        className="terminal"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: INTRO_DELAY + 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="win-bar"><i /><i /><i /><span>zsh — deploy</span></div>
        <div className="term-body">
          {feed.map((l) => (
            <motion.div key={l.key} className={l.tone} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
              {l.text}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {heroChips.map((c, i) => (
        <motion.div
          key={c.label}
          className={`chip ${chipPositions[i]}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: INTRO_DELAY + 1.1 + i * 0.15, duration: 0.6 }}
        >
          <span className="chip-ico">{c.icon}</span> {c.label}
        </motion.div>
      ))}
    </div>
  );
}
