import { motion } from 'framer-motion';
import { heroLead, heroRoles, heroStats, profile } from '@/data/profile';
import { useRotatingTypewriter } from '@/hooks/useTypewriter';
import { rich } from '@/lib/rich';
import HeroStage from '@/components/hero/HeroStage';
import Counter from '@/components/ui/Counter';
import Magnetic from '@/components/ui/Magnetic';
import Reveal, { EASE } from '@/components/ui/Reveal';
import { ArrowRightIcon, GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from '@/components/icons';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };

const socials = [
  { href: profile.linkedin, label: 'LinkedIn', Icon: LinkedInIcon, external: true },
  { href: profile.github, label: 'GitHub', Icon: GitHubIcon, external: true },
  { href: `mailto:${profile.email}`, label: 'Email', Icon: MailIcon },
  { href: profile.whatsapp, label: 'WhatsApp', Icon: WhatsAppIcon, external: true },
];

export default function Hero() {
  const role = useRotatingTypewriter(heroRoles);

  return (
    <section className="hero container" id="top">
      <motion.div className="hero-copy" variants={container} initial="hidden" animate="show">
        <motion.div className="status" variants={item}>
          <span className="pulse" />
          {profile.availability}
        </motion.div>

        <motion.h1 className="hero-title" variants={item}>
          Hi, I&apos;m <span className="grad">{profile.name}</span>
          <span className="hero-sub">
            I build <span className="typed" aria-live="polite">{role}</span>
            <span className="caret" aria-hidden="true" />
          </span>
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

        <motion.ul className="socials" aria-label="Profiles" variants={item}>
          {socials.map(({ href, label, Icon, external }) => (
            <li key={label}>
              <motion.a
                href={href}
                aria-label={label}
                {...(external ? { target: '_blank', rel: 'noopener' } : {})}
                whileHover={{ y: -4, scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
              >
                <Icon />
              </motion.a>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <div className="hero-visual">
        <HeroStage />
      </div>

      <Reveal className="stats" role="list" delay={0.2}>
        {heroStats.map((s) => (
          <div className="stat" role="listitem" key={s.label}>
            <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
            <span>{s.label}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
