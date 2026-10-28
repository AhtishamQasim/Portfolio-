import { marquee } from '@/data/profile';

export default function Marquee() {
  // The list is rendered twice so the CSS loop (translateX -50%) is seamless.
  const reversed = [...marquee].reverse();
  return (
    <div className="marquee" aria-label="Technologies I work with">
      <div className="marquee-track">
        {[...marquee, ...marquee].map((t, i) => <span key={i} aria-hidden={i >= marquee.length}>{t}</span>)}
      </div>
      <div className="marquee-track rev" aria-hidden="true">
        {[...reversed, ...reversed].map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}
