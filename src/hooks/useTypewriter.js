import { useEffect, useState } from 'react';
import { INTRO_DELAY, useReducedMotion } from '@/lib/motion';

/** Types and deletes each phrase in turn: "I build <phrase>". */
export function useRotatingTypewriter(phrases, { typeMs = 62, deleteMs = 32, holdMs = 2200 } = {}) {
  const reduce = useReducedMotion();
  const [text, setText] = useState(phrases[0]);

  useEffect(() => {
    if (reduce) return undefined;
    let index = 0;
    let chars = phrases[0].length;
    let deleting = true;
    let timer;
    const tick = () => {
      const word = phrases[index];
      chars += deleting ? -1 : 1;
      setText(word.slice(0, chars));
      let delay = deleting ? deleteMs : typeMs;
      if (!deleting && chars === word.length) {
        deleting = true;
        delay = holdMs;
      } else if (deleting && chars === 0) {
        deleting = false;
        index = (index + 1) % phrases.length;
        delay = 380;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, holdMs);
    return () => clearTimeout(timer);
  }, [phrases, reduce, typeMs, deleteMs, holdMs]);

  return text;
}

/** Types `source` once, waits, then starts again. Returns how many characters are visible. */
export function useLoopingTyping(source, { restartMs = 7000 } = {}) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? source.length : 0);

  useEffect(() => {
    if (reduce) {
      setCount(source.length);
      return undefined;
    }
    let n = 0;
    let timer;
    const tick = () => {
      n += 1;
      setCount(n);
      if (n < source.length) {
        timer = setTimeout(tick, source.charAt(n - 1) === '\n' ? 180 : 24 + Math.random() * 30);
      } else {
        timer = setTimeout(() => {
          n = 0;
          tick();
        }, restartMs);
      }
    };
    timer = setTimeout(tick, (INTRO_DELAY + 1) * 1000);
    return () => clearTimeout(timer);
  }, [source, reduce, restartMs]);

  return count;
}
