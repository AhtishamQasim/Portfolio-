import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { heroLead, heroRoles, heroStats, profile } from '@/data/profile';
import { useRotatingTypewriter } from '@/hooks/useTypewriter';
import { EASE, INTRO_DELAY } from '@/lib/motion';
import { rich } from '@/lib/rich';
import HeroStage from '@/components/hero/HeroStage';
import Counter from '@/components/ui/Counter';
import Magnetic from '@/components/ui/Magnetic';
import { ArrowRightIcon, GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from '@/components/icons';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: INTRO_DELAY } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const title = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const letter = {
  hidden: { opacity: 0, y: '0.6em', rotateX: -90 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 260, damping: 18 } },
};
const nameWord = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0, x: -20 },
  show: { clipPath: 'inset(0 0% 0 0)', opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
};
const socialsList = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const socialItem = { hidden: { opacity: 0, scale: 0, rotate: -45 }, show: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 16 } } };
const statList = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const statItem = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };

const socials = [
  { href: profile.linkedin, label: 'LinkedIn', Icon: LinkedInIcon, external: true },
  { href: profile.github, label: 'GitHub', Icon: GitHubIcon, external: true },
  { href: `mailto:${profile.email}`, label: 'Email', Icon: MailIcon },
  { href: profile.whatsapp, label: 'WhatsApp', Icon: WhatsAppIcon, external: true },
];

export default function Hero() {
  const role = useRotatingTypewriter(heroRoles);
  const ref = useRef(null);
  // As the hero scrolls away, the code stage tilts back and fades; the copy drifts up.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const stageRotate = useTransform(scrollYProgress, [0, 1], [0, 22]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section className="hero container" id="top" ref={ref}>
      <motion.div className="hero-copy" variants={container} initial="hidden" animate="show" style={{ y: copyY }}>
        <motion.div className="status" variants={item}>
          <span className="pulse" />
          {profile.availability}
        </motion.div>

        <motion.h1 className="hero-title" variants={title} aria-label={`Hi, I'm ${profile.name}`}>
          <span aria-hidden="true" className="hero-hi">
            {[..."Hi, I'm"].map((ch, i) => (
              <motion.span key={i} className="letter" variants={letter}>{ch === ' ' ? ' ' : ch}</motion.span>
            ))}
          </span>{' '}
          {profile.name.split(' ').map((w) => (
            <motion.span key={w} className="name-word grad" variants={nameWord} aria-hidden="true">{w}</motion.span>
          ))}
          <motion.span className="hero-sub" variants={item}>
            I build <span className="typed" aria-live="polite">{role}</span>
            <span className="caret" aria-hidden="true" />
          </motion.span>
        </motion.h1>

        <motion.p className="hero-lead" variants={item}>{rich(heroLead)}</motion.p>

        <motion.div className="hero-ctas" variants={item}>
          <Magnetic>
            <a href="#projects" className="btn btn-primary btn-lg">View my work <ArrowRightIcon /></a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="btn btn-ghost btn-lg">Let&apos;s talk</a>
          </Magnetic>
        </motion.div>

        <motion.ul className="socials" aria-label="Profiles" variants={socialsList}>
          {socials.map(({ href, label, Icon, external }) => (
            <motion.li key={label} variants={socialItem}>
              <motion.a
                href={href}
                aria-label={label}
                {...(external ? { target: '_blank', rel: 'noopener' } : {})}
                whileHover={{ y: -5, scale: 1.1, rotate: -6 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon />
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        className="hero-visual"
        style={{ y: stageY, rotateX: stageRotate, scale: stageScale, opacity: stageOpacity, transformPerspective: 1200 }}
      >
        <HeroStage />
      </motion.div>

      <motion.div className="stats" role="list" variants={statList} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {heroStats.map((s) => (
          <motion.div className="stat" role="listitem" key={s.label} variants={statItem}>
            <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
            <span>{s.label}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.a
        href="#about"
        className="scroll-cue"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: INTRO_DELAY + 1.4 }}
      >
        <span className="mouse"><span className="wheel" /></span>
        <span>Scroll</span>
      </motion.a>
    </section>
  );
}

