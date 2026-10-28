import { motion } from 'framer-motion';
import { cx } from '@/lib/rich';

const list = { hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } } };
const tag = {
  hidden: { opacity: 0, scale: 0.6, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 420, damping: 22 } },
};

/** Tag chips that pop in one after another when the list scrolls into view. */
export default function Tags({ items, small = false }) {
  return (
    <motion.ul
      className={cx('tags', small && 'tags-sm')}
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -5% 0px' }}
    >
      {items.map((t) => (
        <motion.li key={t} variants={tag} whileHover={{ y: -3, scale: 1.06 }}>{t}</motion.li>
      ))}
    </motion.ul>
  );
}
