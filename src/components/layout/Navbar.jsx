import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { navLinks, profile } from '@/data/profile';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cx } from '@/lib/rich';
import { INTRO_DELAY } from '@/lib/motion';
import { DownloadIcon, MoonIcon, SendIcon, SunIcon } from '@/components/icons';

const sectionIds = navLinks.map((l) => l.id);

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth > 900 && setOpen(false);
    onScroll(); // the page may load already scrolled (anchor link, refresh)
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <motion.header
      className={cx('nav', scrolled && 'scrolled')}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: INTRO_DELAY, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="nav-inner container">
        <a href="#top" className="brand" aria-label={`${profile.name} — home`}>
          <span className="brand-mark">{profile.initials}</span>
          <span className="brand-text">{profile.firstName}<span className="dot">.</span></span>
        </a>

        <nav className={cx('nav-links', open && 'open')} id="navLinks" aria-label="Primary" onClick={(e) => e.target.closest('a') && setOpen(false)}>
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={cx(active === l.id && 'active')}>
              {l.label}
              {active === l.id && <motion.span layoutId="nav-dot" className="nav-dot" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
            </a>
          ))}
          {profile.resume && (
            <a href={profile.resume} className="btn btn-sm btn-primary nav-cta-mobile" download>Download CV</a>
          )}
        </nav>

        <div className="nav-actions">
          <motion.button
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label="Switch colour theme"
            whileTap={{ scale: 0.85, rotate: -30 }}
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </motion.button>
          {profile.resume ? (
            <a href={profile.resume} className="btn btn-sm btn-primary nav-cta" download>
              <DownloadIcon /> Résumé
            </a>
          ) : (
            <a href="#contact" className="btn btn-sm btn-primary nav-cta">
              Hire me <SendIcon width={15} height={15} />
            </a>
          )}
          <button
            className="icon-btn burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="navLinks"
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
