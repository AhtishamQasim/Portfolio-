import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { ChevronUpIcon } from '@/components/icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} {profile.name}. Designed &amp; built by hand with React.</p>
        <motion.a href="#top" className="to-top" aria-label="Back to top" whileHover={{ y: -4 }} whileTap={{ scale: 0.9 }}>
          <ChevronUpIcon />
        </motion.a>
      </div>
    </footer>
  );
}
