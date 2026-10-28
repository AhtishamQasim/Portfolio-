import { WindowBar } from './parts';

/* ---------- Customer & complaint portal ---------- */
const ticketStats = [
  { label: 'Open', value: 3, cls: 'ts-open' },
  { label: 'In progress', value: 5, cls: 'ts-prog' },
  { label: 'Resolved', value: 128, cls: 'ts-done' },
];
const tickets = [
  { id: '#4821', initials: 'ZA', tone: 1, text: 'No internet since morning', meta: 'Fiber 50 · 12 min ago', priority: 'High', pcls: 'pr-high', status: 'Open', cls: 't-open' },
  { id: '#4817', initials: 'MK', tone: 2, text: 'New connection request', meta: 'Home 25 · 1 h ago', priority: 'Normal', pcls: 'pr-norm', status: 'In progress', cls: 't-prog' },
  { id: '#4790', initials: 'RS', tone: 3, text: 'Invoice correction', meta: 'Fiber 100 · yesterday', priority: 'Low', pcls: 'pr-low', status: 'Resolved', cls: 't-done' },
];

export function TicketsMock() {
  return (
    <div className="mock mock-tickets" aria-hidden="true">
      <WindowBar title="portal · my tickets" />
      <div className="ticket-stats">
        {ticketStats.map((s) => (
          <div key={s.label} className={`ts ${s.cls}`}><b>{s.value}</b><small>{s.label}</small></div>
        ))}
      </div>
      <div className="ticket-list">
        {tickets.map((t) => (
          <div key={t.id} className="ticket">
            <span className={`av av${t.tone}`}>{t.initials}</span>
            <span className="ticket-main">
              <span className="ticket-top"><b>{t.id}</b>{t.text}</span>
              <small>{t.meta}</small>
            </span>
            <em className={`prio ${t.pcls}`}>{t.priority}</em>
            <em className={t.cls}>{t.status}</em>
          </div>
        ))}
      </div>
      <div className="ticket-new"><span>+</span> Raise a new ticket</div>
    </div>
  );
}

/* ---------- Brand website ---------- */
// Photos: Unsplash (Unsplash License), resized into public/projects.
const fabrics = [
  { name: 'Bridal Wear', tag: 'New', img: '/projects/site-bridal.webp' },
  { name: 'Formal Collection', tag: 'Trending', img: '/projects/site-formal.webp' },
  { name: 'Casual Pret', tag: '', img: '/projects/site-casual.webp' },
  { name: "Men's Shawls", tag: 'Winter', img: '/projects/site-shawls.webp' },
];

export function SiteMock() {
  return (
    <div className="mock mock-site" aria-hidden="true">
      <div className="mock-bar"><i /><i /><i /><span className="url">client-site · preview</span></div>
      <div className="site-nav">
        <b>Textile<span>&amp;Co</span></b>
        <span className="site-links"><i>Collections</i><i>Gallery</i><i>Visit us</i></span>
        <span className="site-wa">WhatsApp</span>
      </div>
      <div className="site-hero" style={{ backgroundImage: 'url(/projects/site-banner.webp)' }}>
        <div className="site-hero-copy">
          <small>Season 2026</small>
          <h4>New Season Arrivals</h4>
          <span className="site-btn">Enquire on WhatsApp →</span>
        </div>
      </div>
      <div className="site-gallery">
        {fabrics.map((f) => (
          <div key={f.name} className="fabric">
            <div className="fabric-img">
              <img src={f.img} alt="" loading="lazy" width="300" height="400" />
              {f.tag && <em>{f.tag}</em>}
            </div>
            <b>{f.name}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Production ops ---------- */
const opsStats = [
  { label: 'Services up', value: '6 / 6' },
  { label: 'Avg response', value: '48 ms' },
  { label: 'Last backup', value: '02:00 ✓' },
];
const services = [
  { name: 'api.billing', ms: 42, load: 62 },
  { name: 'crm.portal', ms: 57, load: 48 },
  { name: 'db.oracle', ms: 12, load: 71 },
  { name: 'db.postgres', ms: 9, load: 35 },
];
const logs = [
  { time: '02:00', tone: 't-ok', text: '✓ nightly backup completed (4.2 GB)' },
  { time: '11:42', tone: 't-hi', text: '→ deploy billing v2.8.1 · zero downtime' },
  { time: '11:43', tone: 't-ok', text: '✓ health checks passing on all nodes' },
];

export function OpsMock() {
  return (
    <div className="mock mock-ops" aria-hidden="true">
      <WindowBar title="ops · health" />
      <div className="ops-stats">
        {opsStats.map((s) => <div key={s.label}><small>{s.label}</small><b>{s.value}</b></div>)}
      </div>
      <div className="ops-services">
        {services.map((s) => (
          <div key={s.name} className="ops-line">
            <span className="ok" />
            <span className="ops-name">{s.name}</span>
            <span className="ops-load"><i style={{ '--w': `${s.load}%` }} /></span>
            <em>{s.ms} ms</em>
          </div>
        ))}
      </div>
      <div className="ops-chart">
        <div className="bc-head"><b>Server load</b><small><i className="lg lg-cpu" />CPU <i className="lg lg-mem" />Memory</small></div>
        <svg viewBox="0 0 200 50" preserveAspectRatio="none">
          <path className="draw" d="M0 34 L20 30 L40 32 L60 22 L80 26 L100 16 L120 20 L140 12 L160 18 L180 10 L200 14" fill="none" stroke="var(--a2)" strokeWidth="2" />
          <path d="M0 40 L20 38 L40 36 L60 37 L80 33 L100 34 L120 30 L140 31 L160 28 L180 29 L200 26" fill="none" stroke="var(--a1)" strokeWidth="2" strokeDasharray="4 3" />
        </svg>
      </div>
      <div className="ops-log">
        {logs.map((l) => (
          <div key={l.time + l.text}><span className="t-dim">{l.time}</span> <span className={l.tone}>{l.text}</span></div>
        ))}
      </div>
    </div>
  );
}
