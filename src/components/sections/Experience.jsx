import { motion } from 'framer-motion';
import { experience } from '@/data/experience';
import { rich } from '@/lib/rich';
import { spotlight } from '@/lib/spotlight';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import Tags from '@/components/ui/Tags';

export default function Experience() {
  return (
    <section className="section container" id="experience">
      <SectionHeading index="04" eyebrow="Experience" title="Where I've" highlight="made an impact" />
      <ol className="timeline">
        <motion.span
          className="timeline-line"
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
        />
        {experience.map((job, i) => (
          <Reveal as="li" className="tl-item" key={job.role} delay={i * 0.08}>
            <motion.div
              className="tl-dot"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
            />
            <div className="tl-card" onPointerMove={spotlight}>
              <div className="tl-head">
                <div>
                  <h3>{job.role}</h3>
                  <p className="tl-org">{job.org}</p>
                </div>
                <span className="tl-date">{job.current && <span className="pulse" />}{job.period}</span>
              </div>
              <ul className="tl-points">{job.points.map((p, j) => <li key={j}>{rich(p)}</li>)}</ul>
              <Tags items={job.tags} small />
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
