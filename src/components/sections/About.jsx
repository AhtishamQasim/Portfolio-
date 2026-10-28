import { motion } from 'framer-motion';
import { aboutMeta, aboutParagraphs, values } from '@/data/about';
import { rich } from '@/lib/rich';
import { spotlight } from '@/lib/spotlight';
import Portrait from '@/components/about/Portrait';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { valueIcons } from '@/components/icons';

export default function About() {
  return (
    <section className="section container" id="about">
      <SectionHeading index="01" eyebrow="About" title="An engineer who owns the" highlight="whole lifecycle" />
      <div className="about-grid">
        <Portrait />

        <Reveal className="about-text" delay={0.15}>
          {aboutParagraphs.map((p, i) => <p key={i}>{rich(p)}</p>)}
          <div className="about-meta">
            {aboutMeta.map((m) => (
              <div key={m.label}><span>{m.label}</span><b>{m.value}</b><em>{m.note}</em></div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="values">
        {values.map((v, i) => {
          const Icon = valueIcons[v.icon];
          return (
            <Reveal as="article" className="value" key={v.title} delay={i * 0.1} onPointerMove={spotlight} whileHover={{ y: -4 }}>
              <motion.div className="value-ico" whileHover={{ rotate: -8, scale: 1.1 }}>
                <Icon width={22} height={22} />
              </motion.div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
