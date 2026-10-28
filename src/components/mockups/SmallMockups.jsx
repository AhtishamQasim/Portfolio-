import { WindowBar } from './parts';

const tickets = [
  { id: '#4821', text: 'No internet since morning', status: 'Open', cls: 't-open' },
  { id: '#4817', text: 'New connection request', status: 'In progress', cls: 't-prog' },
  { id: '#4790', text: 'Invoice correction', status: 'Resolved', cls: 't-done' },
];

export function TicketsMock() {
  return (
    <div className="mock mock-tickets" aria-hidden="true">
      <WindowBar title="portal · my tickets" />
      {tickets.map((t) => (
        <div key={t.id} className="ticket"><b>{t.id}</b><span>{t.text}</span><em className={t.cls}>{t.status}</em></div>
      ))}
    </div>
  );
}

export function SiteMock() {
  return (
    <div className="mock mock-site" aria-hidden="true">
      <WindowBar title="brand · home" />
      <div className="site-hero"><span /><span /><em /></div>
      <div className="site-gallery">{Array.from({ length: 6 }, (_, i) => <i key={i} />)}</div>
    </div>
  );
}

const services = [
  { name: 'api.billing', note: '200 · 42ms' },
  { name: 'crm.portal', note: '200 · 57ms' },
  { name: 'db.backup', note: 'nightly ✓' },
];

export function OpsMock() {
  return (
    <div className="mock mock-ops" aria-hidden="true">
      <WindowBar title="ops · health" />
      {services.map((s) => (
        <div key={s.name} className="ops-line"><span className="ok" />{s.name} <em>{s.note}</em></div>
      ))}
      <div className="ops-spark">
        <svg viewBox="0 0 200 40" preserveAspectRatio="none">
          <path className="draw" d="M0 30 L20 26 L40 28 L60 18 L80 22 L100 12 L120 16 L140 8 L160 14 L180 6 L200 10" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}
