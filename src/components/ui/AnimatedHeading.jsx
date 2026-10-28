import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

const parent = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const word = {
  hidden: { y: '110%', rotate: 6, opacity: 0 },
  show: { y: '0%', rotate: 0, opacity: 1, transition: { duration: 0.75, ease: EASE } },
};

const Words = ({ text, className }) =>
  text.split(' ').filter(Boolean).map((w, i) => (
    <span className="word" key={`${w}-${i}`}>
      <motion.span className={className ? `word-in ${className}` : 'word-in'} variants={word}>{w}</motion.span>
    </span>
  ));

/** Heading whose words rise out of a mask one after another; `highlight` words get the gradient. */
export default function AnimatedHeading({ title, highlight, as = 'h2' }) {
  const Tag = motion[as];
  return (
    <Tag variants={parent} initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -10% 0px' }} aria-label={`${title} ${highlight}`}>
      <span aria-hidden="true">
        <Words text={title} />
        <Words text={highlight} className="grad" />
      </span>
    </Tag>
  );
}
