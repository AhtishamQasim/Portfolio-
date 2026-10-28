import { processSteps } from '@/data/experience';
import { spotlight } from '@/lib/spotlight';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Process() {
  return (
    <section className="section container" id="process">
      <SectionHeading index="06" eyebrow="How I work" title="From idea to" highlight="production" />
      <div className="process">
        {processSteps.map((s, i) => (
          <Reveal key={s.n} className="step" delay={i * 0.1} onPointerMove={spotlight} whileHover={{ y: -6 }}>
            <span className="step-n">{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
