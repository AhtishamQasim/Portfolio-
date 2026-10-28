import { OrderRow, WindowBar } from './parts';

const kpis = [
  { label: 'Total', value: '1,284', trend: '▲ 4.2%', up: true },
  { label: 'Paid', value: '1,032', trend: '▲ 9.8%', up: true },
  { label: 'Pending', value: '196', trend: '▼ 3.1%' },
  { label: 'Overdue', value: '56', trend: '▼ 11%' },
];
const months = [42, 55, 48, 63, 58, 71, 66, 78, 74, 86, 81, 94];
const invoices = [
  { initials: 'AR', tone: 1, name: 'Ali Raza', meta: 'Fiber 50 Mbps · INV-2291', amount: 'Rs 4,500', status: 'Paid', pill: 'ok' },
  { initials: 'FN', tone: 3, name: 'Fatima Noor', meta: 'Fiber 100 Mbps · INV-2290', amount: 'Rs 6,800', status: 'Pending', pill: 'warn' },
  { initials: 'UB', tone: 2, name: 'Usman Butt', meta: 'Home 25 Mbps · INV-2287', amount: 'Rs 3,200', status: 'Overdue', pill: 'bad' },
];

export default function BillingDashboard() {
  return (
    <div className="mock mock-billing" aria-hidden="true">
      <WindowBar title="billing · invoices" />
      <div className="bill-kpis">
        {kpis.map((k, i) => (
          <div key={k.label} className={`k k${i + 1}`}>
            <small>{k.label}</small><b>{k.value}</b><span className={k.up ? 'up' : 'dn'}>{k.trend}</span>
          </div>
        ))}
      </div>
      <div className="bill-mid">
        <div className="bill-chart">
          <div className="bc-head"><b>Collections</b><small>last 12 months</small></div>
          <div className="mini-bars">
            {months.map((h, i) => <i key={i} style={{ '--h': `${h}%` }} />)}
          </div>
        </div>
        <div className="bill-donut">
          <div className="donut" style={{ '--p': '80%' }}><span><b>80%</b><small>collected</small></span></div>
        </div>
      </div>
      <div className="m-rows bill-list">{invoices.map((r) => <OrderRow key={r.name} {...r} />)}</div>
    </div>
  );
}
