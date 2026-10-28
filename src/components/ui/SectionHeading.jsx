import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import AnimatedHeading from './AnimatedHeading';
import Reveal from './Reveal';
import ScrambleText from './ScrambleText';

/** "01 — About" eyebrow that decodes itself, a word-by-word heading, a line that draws in, and an optional lead. */
export default function SectionHeading({ index, eyebrow, title, highlight, lead }) {
  return (
    <header className="sec-head">
      <ScrambleText className="eyebrow" text={`${index} — ${eyebrow}`} />
      <AnimatedHeading title={title} highlight={highlight} />
      <motion.span
        className="sec-line"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
      />
      {lead && <Reveal as="p" className="sec-lead" delay={0.25}>{lead}</Reveal>}
    </header>
  );
}
