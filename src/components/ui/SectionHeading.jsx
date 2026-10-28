import Reveal from './Reveal';

/** "01 — About" eyebrow, a heading with a gradient phrase, and an optional lead paragraph. */
export default function SectionHeading({ index, eyebrow, title, highlight, lead }) {
  return (
    <Reveal as="header" className="sec-head">
      <span className="eyebrow">{index} — {eyebrow}</span>
      <h2>
        {title} <span className="grad">{highlight}</span>
      </h2>
      {lead && <p className="sec-lead">{lead}</p>}
    </Reveal>
  );
}
