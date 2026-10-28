import { education } from '@/data/experience';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import Tags from '@/components/ui/Tags';
import { CapIcon } from '@/components/icons';

export default function Education() {
  const share = education.gpa / education.gpaMax;
  return (
    <section className="section container" id="education">
      <SectionHeading index="07" eyebrow="Education" title="Academic" highlight="foundation" />
      <Reveal className="edu">
        <div className="edu-main">
          <div className="edu-ico"><CapIcon width={30} height={30} /></div>
          <div>
            <h3>{education.degree}</h3>
            <p className="tl-org">{education.school}</p>
            <p className="edu-conc">Concentration: <strong>{education.concentration}</strong></p>
          </div>
          <div className="gpa">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="52" className="gpa-track" />
              <circle cx="60" cy="60" r="52" className="gpa-fill" style={{ '--p': share }} />
            </svg>
            <div className="gpa-val"><b>{education.gpa.toFixed(2)}</b><span>/ {education.gpaMax.toFixed(2)} CGPA</span></div>
          </div>
        </div>
        <div className="edu-course">
          <span className="edu-label">Relevant coursework</span>
          <Tags items={education.coursework} />
        </div>
      </Reveal>
    </section>
  );
}
