import { useState } from 'react';
import { motion } from 'framer-motion';
import { proficiency, skillFilters, skillGroups } from '@/data/skills';
import { cx } from '@/lib/rich';
import { spotlight } from '@/lib/spotlight';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import Tags from '@/components/ui/Tags';

export default function Skills() {
  const [filter, setFilter] = useState('all');

  return (
    <section className="section container" id="skills">
      <SectionHeading
        index="02"
        eyebrow="Skills"
        title="A full-stack toolkit,"
        highlight="proven in production"
        lead="Everything below is something I have used to ship working software, not just studied."
      />

      <Reveal className="skill-tabs" role="tablist" aria-label="Skill categories">
        {skillFilters.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={filter === f.id}
            className={cx('tab', filter === f.id && 'is-active')}
            onClick={() => setFilter(f.id)}
          >
            {filter === f.id && <motion.span layoutId="skill-tab" className="tab-bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span className="tab-label">{f.label}</span>
          </button>
        ))}
      </Reveal>

      <div className="skills-grid">
        {skillGroups.map((g, i) => {
          const dim = filter !== 'all' && !g.cats.includes(filter);
          return (
            <Reveal as="article" key={g.title} className="skill-card" delay={(i % 3) * 0.08} onPointerMove={spotlight} whileHover={{ y: -4 }}>
              <motion.div
                animate={{ opacity: dim ? 0.25 : 1, scale: dim ? 0.97 : 1, filter: dim ? 'grayscale(1)' : 'grayscale(0)' }}
                transition={{ duration: 0.35 }}
              >
                <div className="skill-top"><span className="skill-ico">{g.icon}</span><h3>{g.title}</h3></div>
                <p>{g.text}</p>
                <Tags items={g.tags} />
              </motion.div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="proficiency">
        <h3 className="prof-title">Where I spend most of my time</h3>
        <div className="bars">
          {proficiency.map((p, i) => (
            <div className="bar" key={p.label}>
              <div className="bar-label"><span>{p.label}</span><span>{p.level}</span></div>
              <div className="bar-track">
                <motion.i
                  initial={{ width: 0 }}
                  whileInView={{ width: `${p.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
